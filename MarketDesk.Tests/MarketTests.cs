using System.Net;
using System.Text.Json;
using MarketDesk.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MarketDesk.Tests;

public sealed class MarketTests
{
    [Fact]
    public void FinnhubTradeBatchesUpdateOnlySupportedSymbols()
    {
        var store = new MarketStore();
        FinnhubFeed.ApplyMessage(System.Text.Encoding.UTF8.GetBytes("""
            {"type":"trade","data":[{"s":"AAPL","p":123.45,"t":1700000000000,"v":50},{"s":"AAPL","p":123.50,"t":1700000001000,"v":2},{"s":"UNKNOWN","p":42,"t":1700000001000}]}
            """), store);
        Assert.Equal(123.50m, store.Snapshot().Stocks[0].Price);
        Assert.Equal(DateTimeOffset.FromUnixTimeMilliseconds(1700000001000), store.Snapshot().Stocks[0].UpdatedAt);
        FinnhubFeed.ApplyMessage("{\"type\":\"ping\"}"u8.ToArray(), store);
        Assert.Equal(123.50m, store.Snapshot().Stocks[0].Price);
    }

    [Fact]
    public void ProviderErrorsTriggerRecoveryWithoutExposingTheirMessage()
    {
        var error = Assert.Throws<InvalidDataException>(() => FinnhubFeed.ApplyMessage("{\"type\":\"error\",\"msg\":\"sensitive provider detail\"}"u8.ToArray(), new MarketStore()));
        Assert.DoesNotContain("sensitive", error.Message);
    }

    [Fact]
    public void MissingPricesAreNullRatherThanFabricated()
    {
        var snapshot = new MarketStore().Snapshot();
        Assert.Equal("setup", snapshot.Status);
        Assert.Equal(8, snapshot.Stocks.Length);
        Assert.All(snapshot.Stocks, stock => Assert.Null(stock.Price));
    }

    [Fact]
    public void LateQuotesCannotReplaceNewerTrades()
    {
        var store = new MarketStore();
        store.Trade("AAPL", 210m, 1700000005000);
        store.Quote("AAPL", 200m, 190m, 195m, 211m, 194m, 1700000000);
        var stock = store.Snapshot().Stocks.Single(s => s.Symbol == "AAPL");
        Assert.Equal(210m, stock.Price);
        Assert.Equal(20m, stock.Change);
        Assert.Equal("Trade", stock.Source);
    }

    [Fact]
    public void OutOfOrderOrInvalidTradesDoNotCorruptPrices()
    {
        var store = new MarketStore();
        store.Trade("AAPL", 210m, 1700000005000);
        store.Trade("AAPL", 190m, 1700000000000);
        store.Trade("AAPL", -1m, 1700000006000);
        store.Trade("AAPL", 500m, long.MaxValue);
        store.Trade("UNSUPPORTED", 500m, 1700000006000);
        Assert.Equal(210m, store.Snapshot().Stocks[0].Price);
        Assert.Equal(8, store.Snapshot().Stocks.Length);
    }

    [Fact]
    public void MissingPreviousCloseDoesNotDivideByZero()
    {
        var store = new MarketStore();
        store.Quote("AAPL", 100m, 0m, 99m, 101m, 98m, 1700000000);
        Assert.Null(store.Snapshot().Stocks[0].ChangePercent);
    }

    [Fact]
    public void SnapshotIsDetachedFromSubsequentUpdates()
    {
        var store = new MarketStore();
        var before = store.Snapshot();
        store.Trade("AAPL", 100m, 1700000000000);
        Assert.Null(before.Stocks[0].Price);
        Assert.Equal(100m, store.Snapshot().Stocks[0].Price);
    }

    private static WebApplicationFactory<Program> CreateApp(string environment = "Development") =>
        new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment(environment);
            builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Finnhub:ApiKey"] = "",
                ["AllowedHosts"] = "localhost;127.0.0.1;example.test"
            }));
        });

    [Fact]
    public async Task PageAndApiEnforceSecurityHeadersAndNoSecretExposure()
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        foreach (var path in new[] { "/", "/api/market", "/js/market.js", "/css/market.css" })
        {
            using var response = await client.GetAsync(path);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("nosniff", response.Headers.GetValues("X-Content-Type-Options").Single());
            Assert.Contains("frame-ancestors 'none'", response.Headers.GetValues("Content-Security-Policy").Single());
            var body = await response.Content.ReadAsStringAsync();
            Assert.DoesNotContain("ws.finnhub.io?token", body);
        }
    }

    [Fact]
    public async Task ServerSentEventsDeliverNewPricesWithoutReloading()
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(10));
        using var response = await client.GetAsync("/api/market/stream", HttpCompletionOption.ResponseHeadersRead, timeout.Token);
        Assert.Equal("text/event-stream", response.Content.Headers.ContentType?.MediaType);
        Assert.True(response.Headers.CacheControl?.NoStore);
        using var reader = new StreamReader(await response.Content.ReadAsStreamAsync(timeout.Token));
        var first = await reader.ReadLineAsync(timeout.Token);
        Assert.StartsWith("data: ", first);
        app.Services.GetRequiredService<MarketStore>().Trade("AAPL", 123.45m, 1700000000000);
        while (true)
        {
            var line = await reader.ReadLineAsync(timeout.Token);
            if (line is null || !line.StartsWith("data: ")) continue;
            using var json = JsonDocument.Parse(line[6..]);
            var value = json.RootElement.GetProperty("stocks")[0].GetProperty("price");
            if (value.ValueKind == JsonValueKind.Number) { Assert.Equal(123.45m, value.GetDecimal()); break; }
        }
    }

    [Fact]
    public async Task FullWatchlistAndSelectedStockCanShareOneBrowserStream()
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        var store = app.Services.GetRequiredService<MarketStore>();
        var symbols = Enumerable.Range(0, 28).Select(i => "TEST" + i).ToArray();
        foreach (var symbol in symbols) store.Ensure(symbol, symbol, "");
        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        using var stream = await client.GetAsync("/api/market/stream?symbols=" + string.Join(',', symbols.Take(27)), HttpCompletionOption.ResponseHeadersRead, timeout.Token);
        Assert.Equal(HttpStatusCode.OK, stream.StatusCode);
        Assert.Equal(27, store.ActiveSymbols.Length);
        using var rejected = await client.GetAsync("/api/market/stream?symbols=" + string.Join(',', symbols), timeout.Token);
        Assert.Equal(HttpStatusCode.BadRequest, rejected.StatusCode);
        await timeout.CancelAsync();
    }

    [Fact]
    public async Task ApiRejectsExcessRequests()
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        for (var i = 0; i < 300; i++)
        {
            using var response = await client.GetAsync("/api/market");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        using var rejected = await client.GetAsync("/api/market");
        Assert.Equal(HttpStatusCode.TooManyRequests, rejected.StatusCode);
    }

    [Fact]
    public async Task UnsupportedMethodsAndFilesAreUnavailable()
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        using var post = await client.PostAsync("/api/market", new StringContent("{}"));
        Assert.Equal(HttpStatusCode.MethodNotAllowed, post.StatusCode);
        using var settings = await client.GetAsync("/appsettings.json");
        Assert.Equal(HttpStatusCode.NotFound, settings.StatusCode);
    }

    [Fact]
    public async Task ProductionSendsHstsOverHttps()
    {
        await using var app = CreateApp("Production");
        using var client = app.CreateClient(new WebApplicationFactoryClientOptions { BaseAddress = new Uri("https://example.test"), AllowAutoRedirect = false });
        using var response = await client.GetAsync("/");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains("max-age=", response.Headers.GetValues("Strict-Transport-Security").Single());
        Assert.Contains("Stocklumo", await response.Content.ReadAsStringAsync());
    }

    [Fact]
    public async Task ProductionRedirectsHttpToHttps()
    {
        await using var app = CreateApp("Production");
        using var client = app.CreateClient(new WebApplicationFactoryClientOptions
        {
            BaseAddress = new Uri("http://example.test"),
            AllowAutoRedirect = false
        });
        using var response = await client.GetAsync("/");
        Assert.Equal(HttpStatusCode.TemporaryRedirect, response.StatusCode);
        Assert.Equal("https://example.test/", response.Headers.Location?.ToString());
    }

    [Fact]
    public async Task RenderTlsTerminationAvoidsRedirectLoopsAndRejectsForeignHosts()
    {
        await using var app = CreateApp("Production").WithWebHostBuilder(builder =>
            builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["RENDER"] = "true",
                ["RENDER_EXTERNAL_HOSTNAME"] = "stocklumo-test.onrender.com"
            })));
        using var client = app.CreateClient(new WebApplicationFactoryClientOptions
        {
            BaseAddress = new Uri("http://stocklumo-test.onrender.com"),
            AllowAutoRedirect = false
        });
        client.DefaultRequestHeaders.Add("X-Forwarded-Proto", "http");
        using var response = await client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(response.Headers.Contains("Strict-Transport-Security"));
        client.DefaultRequestHeaders.Host = "untrusted.example";
        using var rejected = await client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.BadRequest, rejected.StatusCode);
    }

    [Fact]
    public async Task UnrecognizedHostIsRejected()
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        client.DefaultRequestHeaders.Host = "untrusted.example";
        using var response = await client.GetAsync("/");
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Theory]
    [InlineData("/markets")]
    [InlineData("/watchlist")]
    [InlineData("/news")]
    [InlineData("/stock/AAPL")]
    public async Task ProductPagesRenderConsistentBranding(string path)
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        using var response = await client.GetAsync(path);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Contains("Stocklumo", await response.Content.ReadAsStringAsync());
    }

    [Theory]
    [InlineData("/api/data/search?q=")]
    [InlineData("/api/data/stock/AAPL/profile")]
    [InlineData("/api/data/status")]
    public async Task MissingKeyReturnsUsableStates(string path)
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        var body = await client.GetStringAsync(path);
        Assert.True(body.Contains("setup") || body.Contains("empty"));
        Assert.DoesNotContain("StackTrace", body);
    }

    [Theory]
    [InlineData("/api/data/stock/AAPL/chart?range=invalid")]
    [InlineData("/api/data/stock/%3Cscript%3E/profile")]
    [InlineData("/api/market/stream?symbols=BINANCE%3ABTCUSDT")]
    public async Task InvalidDataRequestsAreRejected(string path)
    {
        await using var app = CreateApp();
        using var client = app.CreateClient();
        using var response = await client.GetAsync(path);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}


