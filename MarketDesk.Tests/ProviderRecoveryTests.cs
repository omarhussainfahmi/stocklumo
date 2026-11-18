using System.Net;
using MarketDesk.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MarketDesk.Tests;

public sealed class ProviderRecoveryTests
{
    private sealed class Clock : TimeProvider
    {
        public DateTimeOffset Now = new(2026, 11, 16, 0, 0, 0, TimeSpan.Zero);
        public override DateTimeOffset GetUtcNow() => Now;
        public void Advance(int seconds) => Now += TimeSpan.FromSeconds(seconds);
    }
    private sealed class Handler(Func<int, HttpResponseMessage> respond) : HttpMessageHandler
    {
        public int Calls;
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken token) =>
            Task.FromResult(respond(++Calls));
    }
    private sealed class Factory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, false) { BaseAddress = new("https://finnhub.io/api/v1/") };
    }
    private sealed class RecordingLogger : ILogger<FinnhubApi>
    {
        public List<string> Messages = [];
        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;
        public bool IsEnabled(LogLevel level) => true;
        public void Log<TState>(LogLevel level, EventId id, TState state, Exception? exception, Func<TState, Exception?, string> formatter) =>
            Messages.Add(formatter(state, exception));
    }
    private static HttpResponseMessage Ok() => new(HttpStatusCode.OK) { Content = new StringContent("{\"c\":12}") };
    private static FinnhubApi Api(Handler handler, Clock clock, RecordingLogger? log = null) => new(new Factory(handler),
        new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "dummy-private-key" }).Build(), clock, log);

    [Fact]
    public async Task SharedBudgetExhaustsAcrossPathsAndRollsOverAtOneMinute()
    {
        var clock = new Clock(); using var handler = new Handler(_ => Ok()); using var api = Api(handler, clock);
        for (var i = 0; i < 45; i++) Assert.Equal("ok", (await api.GetAsync("quote?symbol=T" + i, TimeSpan.Zero, default)).State);
        Assert.Equal("limited", (await api.GetAsync("different", TimeSpan.Zero, default)).State);
        clock.Advance(59);
        Assert.Equal("limited", (await api.GetAsync("different", TimeSpan.Zero, default)).State);
        clock.Advance(1);
        Assert.Equal("ok", (await api.GetAsync("different", TimeSpan.Zero, default)).State);
        Assert.Equal(46, handler.Calls);
    }

    [Fact]
    public async Task SuccessAndErrorCacheEntriesExpireAndRecover()
    {
        var clock = new Clock(); using var handler = new Handler(i => i == 1 ? new(HttpStatusCode.ServiceUnavailable) : Ok());
        using var api = Api(handler, clock);
        Assert.Equal("error", (await api.GetAsync("quote", TimeSpan.FromSeconds(60), default)).State);
        clock.Advance(29);
        Assert.Equal("error", (await api.GetAsync("quote", TimeSpan.FromSeconds(60), default)).State);
        Assert.Equal(1, handler.Calls);
        clock.Advance(1);
        Assert.Equal("ok", (await api.GetAsync("quote", TimeSpan.FromSeconds(60), default)).State);
        clock.Advance(59); await api.GetAsync("quote", TimeSpan.FromSeconds(60), default);
        Assert.Equal(2, handler.Calls);
        clock.Advance(1); await api.GetAsync("quote", TimeSpan.FromSeconds(60), default);
        Assert.Equal(3, handler.Calls);
    }

    [Theory]
    [InlineData(1, 60, false)]
    [InlineData(120, 120, false)]
    [InlineData(9999, 300, false)]
    [InlineData(120, 120, true)]
    public async Task RetryAfterIsBoundedAndRecoveryResumes(int supplied, int expected, bool date)
    {
        var clock = new Clock();
        using var handler = new Handler(i => {
            if (i > 1) return Ok();
            var response = new HttpResponseMessage(HttpStatusCode.TooManyRequests);
            response.Headers.RetryAfter = date ? new(clock.Now.AddSeconds(supplied)) : new(TimeSpan.FromSeconds(supplied));
            return response;
        });
        using var api = Api(handler, clock);
        Assert.Equal("limited", (await api.GetAsync("first", TimeSpan.Zero, default)).State);
        clock.Advance(expected - 1);
        Assert.Equal("limited", (await api.GetAsync("second", TimeSpan.Zero, default)).State);
        Assert.Equal(1, handler.Calls);
        clock.Advance(1);
        Assert.Equal("ok", (await api.GetAsync("second", TimeSpan.Zero, default)).State);
        Assert.Equal(2, handler.Calls);
    }

    [Fact]
    public async Task ResponseLatencyDoesNotShortenProviderCooldown()
    {
        var clock = new Clock();
        using var handler = new Handler(i => {
            if (i > 1) return Ok();
            clock.Advance(20);
            var response = new HttpResponseMessage(HttpStatusCode.TooManyRequests);
            response.Headers.RetryAfter = new(TimeSpan.FromSeconds(60));
            return response;
        });
        using var api = Api(handler, clock);
        await api.GetAsync("first", TimeSpan.Zero, default);
        clock.Advance(59);
        Assert.Equal("limited", (await api.GetAsync("second", TimeSpan.Zero, default)).State);
        Assert.Equal(1, handler.Calls);
        clock.Advance(1);
        Assert.Equal("ok", (await api.GetAsync("second", TimeSpan.Zero, default)).State);
    }

    [Fact]
    public async Task UnauthorizedCooldownExpires()
    {
        var clock = new Clock(); using var handler = new Handler(i => i == 1 ? new(HttpStatusCode.Unauthorized) : Ok());
        using var api = Api(handler, clock);
        Assert.Equal("error", (await api.GetAsync("first", TimeSpan.Zero, default)).State);
        clock.Advance(59);
        Assert.Equal("limited", (await api.GetAsync("second", TimeSpan.Zero, default)).State);
        clock.Advance(1);
        Assert.Equal("ok", (await api.GetAsync("second", TimeSpan.Zero, default)).State);
    }

    [Fact]
    public async Task DiagnosticCategoriesNeverIncludeExceptionTextOrRequestPaths()
    {
        var clock = new Clock(); var log = new RecordingLogger();
        using var handler = new Handler(_ => throw new HttpRequestException("dummy-private-key https://private.invalid/sensitive"));
        using var api = Api(handler, clock, log);
        await api.GetAsync("quote?symbol=PRIVATE", TimeSpan.Zero, default);
        Assert.Null(await api.LogoAsync("TEST.png", default));
        Assert.Equal(2, log.Messages.Count);
        Assert.Contains("market-data", log.Messages[0]); Assert.Contains("company-logo", log.Messages[1]);
        Assert.All(log.Messages, message => {
            Assert.Contains("HttpRequestException", message);
            Assert.DoesNotContain("dummy-private-key", message); Assert.DoesNotContain("https:", message);
            Assert.DoesNotContain("PRIVATE", message); Assert.DoesNotContain("TEST.png", message);
        });
    }
}
