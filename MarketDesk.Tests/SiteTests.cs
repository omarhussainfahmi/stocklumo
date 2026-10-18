using System.Net;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;

namespace MarketDesk.Tests;

public sealed class SiteTests
{
    private static WebApplicationFactory<Program> CreateApp() => new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
        { ["Finnhub:ApiKey"] = "", ["AllowedHosts"] = "localhost;example.test" })));

    [Theory]
    [InlineData("/", "Stock dashboard")]
    [InlineData("/markets", "Markets")]
    [InlineData("/news", "Market news")]
    [InlineData("/screener", "Stock screener")]
    [InlineData("/compare", "Compare stocks")]
    [InlineData("/earnings", "Earnings calendar")]
    [InlineData("/stock/AAPL", "AAPL stock price")]
    [InlineData("/privacy", "Privacy policy")]
    [InlineData("/terms", "Terms of use")]
    public async Task PublicPagesHaveSpecificMetadataAndSharedAccessibleNavigation(string path, string title)
    {
        await using var app = CreateApp(); using var client = app.CreateClient();
        var html = await client.GetStringAsync(path + "?private-query=not-a-canonical");
        Assert.Contains("<title>" + title, html);
        Assert.Contains("name=\"description\"", html);
        Assert.Contains("rel=\"canonical\" href=\"https://stocklumo.onrender.com" + path + "\"", html);
        Assert.Contains("property=\"og:image\"", html);
        Assert.Contains("name=\"twitter:card\" content=\"summary_large_image\"", html);
        Assert.DoesNotContain("not-a-canonical", html);
        Assert.Contains("/privacy", html); Assert.Contains("/settings", html);
        Assert.Contains("id=\"privacy-reject\"", html);
        Assert.DoesNotContain("<script src=\"https://static.cloudflareinsights.com", html);
    }

    [Theory]
    [InlineData("/portfolio")]
    [InlineData("/watchlist")]
    [InlineData("/settings")]
    public async Task BrowserSpecificPagesAreNotIndexed(string path)
    {
        await using var app = CreateApp(); using var client = app.CreateClient();
        var html = await client.GetStringAsync(path);
        Assert.Contains("name=\"robots\" content=\"noindex, follow\"", html);
        Assert.DoesNotContain("rel=\"canonical\"", html);
    }

    [Theory]
    [InlineData("/missing-page", "text/html")]
    [InlineData("/technical", "text/html")]
    [InlineData("/api/not-a-route", "application/json")]
    public async Task MissingPagesPreserve404AndCorrectContentType(string path, string type)
    {
        await using var app = CreateApp(); using var client = app.CreateClient();
        using var response = await client.GetAsync(path);
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal(type, response.Content.Headers.ContentType?.MediaType);
        var body = await response.Content.ReadAsStringAsync();
        if (type == "text/html") { Assert.Contains("This page wasn&#x27;t found.", body); Assert.Contains("noindex", body); }
        else { Assert.DoesNotContain("<html", body); Assert.Contains("Not found", body); }
    }

    [Fact]
    public async Task SitemapHasOnlyExistingPublicRoutesAndRobotsIsExplicit()
    {
        await using var app = CreateApp(); using var client = app.CreateClient();
        var xml = XDocument.Parse(await client.GetStringAsync("/sitemap.xml"));
        XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
        foreach (var element in xml.Descendants(ns + "loc"))
        {
            var uri = new Uri(element.Value);
            Assert.Equal("stocklumo.onrender.com", uri.Host);
            Assert.DoesNotContain(uri.AbsolutePath, new[] { "/portfolio", "/watchlist", "/technical", "/settings" });
            using var response = await client.GetAsync(uri.AbsolutePath);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
        var robots = await client.GetStringAsync("/robots.txt");
        Assert.Contains("Disallow: /api/", robots);
        Assert.Contains("https://stocklumo.onrender.com/sitemap.xml", robots);
    }

    [Theory]
    [InlineData("/images/stocklumo-share.png", "image/png")]
    [InlineData("/images/apple-touch-icon.png", "image/png")]
    [InlineData("/images/favicon-32.png", "image/png")]
    public async Task BrandRasterAssetsExist(string path, string type)
    {
        await using var app = CreateApp(); using var client = app.CreateClient();
        using var response = await client.GetAsync(path);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal(type, response.Content.Headers.ContentType?.MediaType);
        Assert.InRange((await response.Content.ReadAsByteArrayAsync()).Length, 100, 150000);
    }

    [Fact]
    public async Task VersionedStaticAssetsAreCompressedAndCachedButMarketDataIsNot()
    {
        await using var app = CreateApp(); using var client = app.CreateClient();
        client.DefaultRequestHeaders.AcceptEncoding.ParseAdd("gzip");
        using var asset = await client.GetAsync("/css/market.css?v=test-version");
        Assert.Contains("gzip", asset.Content.Headers.ContentEncoding);
        Assert.Contains("immutable", asset.Headers.CacheControl?.ToString());
        using var data = await client.GetAsync("/api/market");
        Assert.Empty(data.Content.Headers.ContentEncoding);
        Assert.True(data.Headers.CacheControl?.NoStore);
    }
}
