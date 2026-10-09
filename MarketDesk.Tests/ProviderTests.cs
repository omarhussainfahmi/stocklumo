using System.Net;
using System.Text;
using MarketDesk.Models;
using MarketDesk.Services;
using Microsoft.Extensions.Configuration;

namespace MarketDesk.Tests;

public sealed class ProviderTests
{
    [Theory]
    [InlineData("{\"ticker\":123}")]
    [InlineData("[]")]
    [InlineData("null")]
    [InlineData("{\"ticker\":\"OTHER\"}")]
    public async Task InvalidCompanyPayloadsDoNotRegisterSymbols(string body)
    {
        using var handler = new FakeHandler(HttpStatusCode.OK, body);
        using var api = CreateApi(handler);
        var store = new MarketStore();
        var controller = new MarketDesk.Controllers.DataController(api, store);
        var action = Assert.IsType<Microsoft.AspNetCore.Mvc.OkObjectResult>(await controller.Stock("TEST", "profile", null, default));
        Assert.Equal("unavailable", Assert.IsType<ProviderResult>(action.Value).State);
        Assert.DoesNotContain("TEST", store.Symbols);
    }

    [Theory]
    [InlineData("AAPL", true)]
    [InlineData("BRK.B", true)]
    [InlineData("V", true)]
    [InlineData("BINANCE:BTCUSDT", false)]
    [InlineData("../secrets", false)]
    [InlineData("AAPL\r\n", false)]
    [InlineData("<script>", false)]
    [InlineData("", false)]
    [InlineData("aapl", false)]
    public void SymbolsAreRestrictedToStockIdentifiers(string symbol, bool valid) => Assert.Equal(valid, StockSymbol.IsValid(symbol));

    [Fact]
    public void ViewerLeasesDeduplicateAndReleaseSubscriptions()
    {
        var store = new MarketStore();
        using var first = store.Subscribe(["AAPL", "AAPL"]);
        var second = store.Subscribe(["AAPL", "MSFT"]);
        Assert.Equal(2, store.ActiveSymbols.Length);
        second!.Dispose();
        second.Dispose();
        Assert.Equal(["AAPL"], store.ActiveSymbols);
        first!.Dispose();
        Assert.Empty(store.ActiveSymbols);
    }

    [Fact]
    public void UnknownSubscriptionsDoNotPartiallyAcquireSymbols()
    {
        var store = new MarketStore();
        Assert.Null(store.Subscribe(["AAPL", "NOTREGISTERED"]));
        Assert.Empty(store.ActiveSymbols);
    }

    [Fact]
    public async Task ConcurrentRequestsShareCachedResponsesAndKeepKeyOutOfUrl()
    {
        using var handler = new FakeHandler(HttpStatusCode.OK, "{\"c\":123.45,\"t\":1700000000}");
        using var api = CreateApi(handler);
        var tasks = Enumerable.Range(0, 8).Select(_ => api.GetAsync("quote?symbol=AAPL", TimeSpan.FromMinutes(1), default));
        var results = await Task.WhenAll(tasks);
        Assert.All(results, result => Assert.Equal("ok", result.State));
        Assert.Equal(1, handler.Calls);
        Assert.DoesNotContain("test-private-key", handler.LastUri);
        Assert.Equal("test-private-key", handler.Token);
    }

    [Theory]
    [InlineData(401, "error")]
    [InlineData(403, "unavailable")]
    [InlineData(429, "limited")]
    [InlineData(503, "error")]
    public async Task ProviderFailuresHaveSafeMessages(int status, string expected)
    {
        using var handler = new FakeHandler((HttpStatusCode)status, "secret exception /internal/path test-private-key");
        using var api = CreateApi(handler);
        var result = await api.GetAsync("quote?symbol=AAPL", TimeSpan.FromMinutes(1), default);
        Assert.Equal(expected, result.State);
        Assert.DoesNotContain("secret", result.Message);
        Assert.Null(result.Data);
        if (status is 429 or 401)
        {
            await api.GetAsync("quote?symbol=MSFT", TimeSpan.FromMinutes(1), default);
            Assert.Equal(1, handler.Calls);
        }
    }

    [Theory]
    [InlineData("not json")]
    [InlineData("{\"error\":\"test-private-key\"}")]
    public async Task MalformedAndErrorPayloadsAreNotForwarded(string body)
    {
        using var handler = new FakeHandler(HttpStatusCode.OK, body);
        using var api = CreateApi(handler);
        var result = await api.GetAsync("quote?symbol=AAPL", TimeSpan.FromMinutes(1), default);
        Assert.NotEqual("ok", result.State);
        Assert.Null(result.Data);
        Assert.DoesNotContain("test-private-key", result.Message);
    }

    private static FinnhubApi CreateApi(FakeHandler handler) => new(new FakeFactory(handler),
        new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "test-private-key" }).Build());

    private sealed class FakeFactory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, false) { BaseAddress = new Uri("https://finnhub.io/api/v1/") };
    }

    private sealed class FakeHandler(HttpStatusCode status, string body) : HttpMessageHandler
    {
        public int Calls { get; private set; }
        public string LastUri { get; private set; } = "";
        public string Token { get; private set; } = "";
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Calls++;
            LastUri = request.RequestUri!.ToString();
            Token = request.Headers.GetValues("X-Finnhub-Token").Single();
            return Task.FromResult(new HttpResponseMessage(status) { Content = new StringContent(body, Encoding.UTF8, "application/json") });
        }
    }
}
