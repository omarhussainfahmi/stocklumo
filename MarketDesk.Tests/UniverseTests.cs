using System.Net;
using System.Text.Json;
using MarketDesk.Services;
using Microsoft.Extensions.Configuration;

namespace MarketDesk.Tests;

public sealed class UniverseTests
{
    [Fact]
    public void FilterRejectsOtherInstrumentsInvalidSymbolsAndDuplicates()
    {
        using var data = JsonDocument.Parse("""
        [{"symbol":"AAA","type":"Common Stock","currency":"USD","mic":"XNYS"},
         {"symbol":"AAA","type":"Common Stock","currency":"USD","mic":"XNYS"},
         {"symbol":"BBB","type":"ETP","currency":"USD","mic":"XNAS"},
         {"symbol":"CCC","type":"Common Stock","currency":"USD","mic":"OOTC"},
         {"symbol":"DDD","type":"Common Stock","currency":"CAD","mic":"XNAS"},
         {"symbol":"../BAD","type":"Common Stock","currency":"USD","mic":"XNAS"},
         null,{}, {"symbol":123}]
        """);
        Assert.Equal("AAA", Assert.Single(StockUniverse.Filter(data.RootElement)).Symbol);
    }

    [Theory]
    [InlineData(0)] [InlineData(3)] [InlineData(10000)]
    public void SelectionIsBoundedUniqueAndStable(int size)
    {
        var pool = Enumerable.Range(0, size).Select(i => new UniverseStock("S" + i, "Company", "XNAS")).ToArray();
        var day = new DateOnly(2026, 10, 16);
        var first = StockUniverse.Select(pool, day);
        Assert.Equal(Math.Min(8, size), first.Length);
        Assert.Equal(first.Length, first.Distinct().Count());
        Assert.Equal(first, StockUniverse.Select(pool, day));
        if (size > 8) Assert.NotEqual(first, StockUniverse.Select(pool, day.AddDays(1)));
    }

    [Fact]
    public async Task SharedMetadataCacheRetainsOriginalTimestampAndMarksFailedRefreshStale()
    {
        using var handler = new Handler();
        using var api = new FinnhubApi(new Factory(handler), new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "test" }).Build());
        var clock = new Clock();
        using var service = new StockUniverse(api, clock);
        var snapshots = await Task.WhenAll(Enumerable.Range(0, 4).Select(_ => service.GetAsync(default)));
        Assert.Equal(1, handler.Calls);
        Assert.All(snapshots, s => { Assert.Equal(1, s.Count); Assert.Equal("ok", s.State); });
        var timestamp = snapshots[0].RetrievedAt;
        clock.Now = clock.Now.AddHours(25);
        handler.Fail = true;
        var stale = await service.GetAsync(default);
        Assert.Equal("stale", stale.State);
        Assert.Equal(timestamp, stale.RetrievedAt);
        Assert.Equal(1, stale.Count);
        await service.GetAsync(default);
        Assert.Equal(2, handler.Calls);
    }

    private sealed class Clock : TimeProvider
    {
        public DateTimeOffset Now = DateTimeOffset.Parse("2026-10-16T00:00:00Z");
        public override DateTimeOffset GetUtcNow() => Now;
    }

    [Theory]
    [InlineData("https://static2.finnhub.io/file/symbols.json", true)]
    [InlineData("https://example.test/symbols.json", false)]
    [InlineData("http://static2.finnhub.io/file/symbols.json", false)]
    [InlineData("https://static2.finnhub.io:8443/file/symbols.json", false)]
    public async Task MetadataRedirectNeverForwardsKeyOrTrustsOtherHosts(string target, bool allowed)
    {
        using var handler = new RedirectHandler(target);
        using var api = new FinnhubApi(new Factory(handler), new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "test" }).Build());
        var response = await api.GetAsync("stock/symbol?exchange=US", TimeSpan.Zero, default);
        Assert.Equal(allowed ? "ok" : "error", response.State);
        Assert.Equal(allowed ? 2 : 1, handler.Calls);
    }
    private sealed class RedirectHandler(string target) : HttpMessageHandler
    {
        public int Calls;
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken token)
        {
            Calls++;
            if (Calls == 1)
            {
                Assert.True(request.Headers.Contains("X-Finnhub-Token"));
                var redirect = new HttpResponseMessage(HttpStatusCode.Found);
                redirect.Headers.Location = new Uri(target);
                return Task.FromResult(redirect);
            }
            Assert.False(request.Headers.Contains("X-Finnhub-Token"));
            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent("[]") });
        }
    }
    private sealed class Factory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, false) { BaseAddress = new Uri("https://finnhub.io/api/v1/") };
    }
    private sealed class Handler : HttpMessageHandler
    {
        public int Calls;
        public bool Fail;
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken token)
        {
            Calls++;
            Assert.Equal("/api/v1/stock/symbol", request.RequestUri!.AbsolutePath);
            return Task.FromResult(new HttpResponseMessage(Fail ? HttpStatusCode.ServiceUnavailable : HttpStatusCode.OK)
            {
                Content = new StringContent("""[{"symbol":"AAA","description":"Company","type":"Common Stock","currency":"USD","mic":"XNAS"}]""")
            });
        }
    }
}
