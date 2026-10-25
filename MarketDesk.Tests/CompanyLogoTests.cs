using System.Net;
using System.Net.Http.Headers;
using MarketDesk.Services;
using Microsoft.Extensions.Configuration;

namespace MarketDesk.Tests;

public sealed class CompanyLogoTests
{
    private static readonly byte[] Png = [137, 80, 78, 71, 13, 10, 26, 10, 0];

    [Fact]
    public async Task ExactFinnhubCdnRedirectLoadsWithoutCredentials()
    {
        using var handler = new LogoHandler(Png, "image/png", redirect: true);
        using var api = CreateApi(handler);
        Assert.NotNull(await api.LogoAsync("JPM.png", default));
        Assert.Equal(2, handler.Calls);
        Assert.Equal("https://static9.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png", handler.Url);
        Assert.False(handler.HadCredentials);
    }

    [Theory]
    [InlineData("https://evil.example/file/publicdatany/finnhubimage/stock_logo/JPM.png")]
    [InlineData("http://static9.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png")]
    [InlineData("https://user:pass@static9.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png")]
    [InlineData("https://static9.finnhub.io/file/publicdatany/finnhubimage/stock_logo/OTHER.png")]
    [InlineData("https://static9.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png?token=secret")]
    public async Task UnexpectedRedirectsAreNeverFollowed(string target)
    {
        using var handler = new LogoHandler(Png, "image/png", redirect: true, redirectTarget: target);
        using var api = CreateApi(handler);
        Assert.Null(await api.LogoAsync("JPM.png", default));
        Assert.Equal(1, handler.Calls);
    }

    [Fact]
    public async Task ImagesShareBoundedCacheAndNeverSendProviderCredentials()
    {
        using var handler = new LogoHandler(Png, "image/png");
        using var api = CreateApi(handler);
        var first = await api.LogoAsync("BRK.B.png", default);
        var second = await api.LogoAsync("BRK.B.png", default);
        Assert.NotNull(first);
        Assert.Same(first, second);
        Assert.Equal(1, handler.Calls);
        Assert.Equal("https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/BRK.B.png", handler.Url);
        Assert.False(handler.HadCredentials);
    }

    [Theory]
    [InlineData("../secret.png")]
    [InlineData("https://example.com/a.png")]
    [InlineData("JPM.png?key=secret")]
    [InlineData("JPM.svg")]
    [InlineData("JPM.png\r\n")]
    public async Task InvalidFilesCannotSelectAnotherHostOrActiveContent(string file)
    {
        using var handler = new LogoHandler(Png, "image/png");
        using var api = CreateApi(handler);
        Assert.Null(await api.LogoAsync(file, default));
        Assert.Equal(0, handler.Calls);
    }

    [Theory]
    [InlineData("text/html", false, 200)]
    [InlineData("image/png", true, 200)]
    [InlineData("image/png", false, 302)]
    [InlineData("image/png", false, 404)]
    public async Task InvalidPayloadsAndRedirectsBecomeCachedMissingImages(string type, bool oversized, int status)
    {
        var bytes = oversized ? new byte[256 * 1024 + 1] : "<html>not an image</html>"u8.ToArray();
        if (oversized) Png.CopyTo(bytes, 0);
        using var handler = new LogoHandler(bytes, type, (HttpStatusCode)status);
        using var api = CreateApi(handler);
        Assert.Null(await api.LogoAsync("JPM.png", default));
        Assert.Null(await api.LogoAsync("JPM.png", default));
        Assert.Equal(1, handler.Calls);
    }

    private static FinnhubApi CreateApi(LogoHandler handler) => new(new LogoFactory(handler),
        new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "test-private-key" }).Build());

    private sealed class LogoFactory(HttpMessageHandler handler) : IHttpClientFactory
    {
        public HttpClient CreateClient(string name) => new(handler, false)
        {
            BaseAddress = new Uri("https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/")
        };
    }

    private sealed class LogoHandler(byte[] bytes, string type, HttpStatusCode status = HttpStatusCode.OK, bool redirect = false, string? redirectTarget = null) : HttpMessageHandler
    {
        public int Calls { get; private set; }
        public string Url { get; private set; } = "";
        public bool HadCredentials { get; private set; }
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            Calls++;
            Url = request.RequestUri!.ToString();
            HadCredentials = request.Headers.Contains("X-Finnhub-Token") || request.Headers.Authorization is not null || request.Headers.Contains("Cookie");
            if (redirect && Calls == 1)
            {
                var redirectResponse = new HttpResponseMessage(HttpStatusCode.Found);
                redirectResponse.Headers.Location = new Uri(redirectTarget ?? "https://static9.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png");
                return Task.FromResult(redirectResponse);
            }
            var content = new ByteArrayContent(bytes);
            content.Headers.ContentType = new MediaTypeHeaderValue(type);
            return Task.FromResult(new HttpResponseMessage(status) { Content = content });
        }
    }
}
