using System.Net;
using MarketDesk.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;

namespace MarketDesk.Tests;

public sealed class RenderClientLimitsTests
{
    [Theory]
    [InlineData(null)]
    [InlineData("192.0.2.1, 192.0.2.2")]
    [InlineData("123")]
    [InlineData("fe80::1%3")]
    [InlineData("[::1]:80")]
    public void InvalidAddressUsesFallback(string? value) =>
        Assert.Equal(-1, RenderClientLimits.Bucket(value));

    [Fact]
    public void EdgeAddressesNormalizeBeforePartitioning()
    {
        Assert.Equal(-1, RenderClientLimits.Bucket(new StringValues(new[] { "192.0.2.1", "192.0.2.2" })));
        Assert.InRange(RenderClientLimits.Bucket("192.0.2.1"), 0, 4095);
        Assert.Equal(RenderClientLimits.Bucket("192.0.2.1"), RenderClientLimits.Bucket("::ffff:192.0.2.1"));
        Assert.InRange(RenderClientLimits.Bucket("2001:db8::1"), 0, 4095);
        Assert.Equal(RenderClientLimits.Bucket("2001:db8::1"), RenderClientLimits.Bucket("2001:db8::99"));
    }

    [Theory]
    [InlineData("Production", true, true, true)]
    [InlineData("Production", true, false, false)]
    [InlineData("Production", false, true, false)]
    [InlineData("Development", true, true, false)]
    public async Task PublicApiUsesNetworkQuotaOnlyOnOptedInProductionRender(
        string environment, bool render, bool trust, bool limited)
    {
        const string host = "stocklumo-test.onrender.com";
        await using var app = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment(environment);
            builder.ConfigureAppConfiguration((_, config) => config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["AllowedHosts"] = host, ["Finnhub:ApiKey"] = "", ["RENDER_EXTERNAL_HOSTNAME"] = host,
                ["RENDER"] = render ? "true" : "false", ["RateLimits:TrustRenderEdge"] = trust.ToString()
            }));
        });
        using var client = app.CreateClient(new() { BaseAddress = new Uri("https://" + host) });
        async Task Read(int count)
        {
            for (var i = 0; i < count; ++i)
            {
                using var response = await client.GetAsync("/api/data/search");
                Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            }
        }

        // Requests without a valid edge address share one fallback quota.
        await Read(120);
        client.DefaultRequestHeaders.Add("X-Forwarded-For", "192.0.2.1");
        using var next = await client.GetAsync("/api/data/search");
        Assert.Equal(limited ? HttpStatusCode.TooManyRequests : HttpStatusCode.OK, next.StatusCode);
        if (!limited) return;

        Assert.NotNull(next.Headers.RetryAfter?.Delta);
        Assert.True(next.Headers.CacheControl?.NoStore);
        using var health = await client.GetAsync("/health");
        Assert.Equal(HttpStatusCode.OK, health.StatusCode);
        client.DefaultRequestHeaders.Add("CF-Connecting-IP", "192.0.2.1");
        await Read(120);
        using var firstLimited = await client.GetAsync("/api/data/search");
        Assert.Equal(HttpStatusCode.TooManyRequests, firstLimited.StatusCode);

        var other = Enumerable.Range(2, 253).Select(i => $"192.0.2.{i}")
            .First(ip => RenderClientLimits.Bucket(ip) != RenderClientLimits.Bucket("192.0.2.1"));
        client.DefaultRequestHeaders.Remove("CF-Connecting-IP");
        client.DefaultRequestHeaders.Add("CF-Connecting-IP", other);
        await Read(60);
        using var sharedLimit = await client.GetAsync("/api/data/search");
        Assert.Equal(HttpStatusCode.TooManyRequests, sharedLimit.StatusCode);
    }

    [Fact]
    public void StreamQuotaRecoversWhenStreamCloses()
    {
        using var limiter = RenderClientLimits.Create();
        var context = new DefaultHttpContext();
        context.SetEndpoint(new Endpoint(null, new EndpointMetadataCollection(new EnableRateLimitingAttribute("stream")), "stream"));
        var leases = Enumerable.Range(0, 6).Select(_ => limiter.AttemptAcquire(context)).ToArray();
        try
        {
            Assert.All(leases, lease => Assert.True(lease.IsAcquired));
            using var blocked = limiter.AttemptAcquire(context);
            Assert.False(blocked.IsAcquired);
            context.Request.Headers["CF-Connecting-IP"] = "192.0.2.1";
            using var otherClient = limiter.AttemptAcquire(context);
            Assert.True(otherClient.IsAcquired);
            context.Request.Headers.Remove("CF-Connecting-IP");
            leases[0].Dispose();
            using var reopened = limiter.AttemptAcquire(context);
            Assert.True(reopened.IsAcquired);
        }
        finally
        {
            foreach (var lease in leases) lease.Dispose();
        }
    }
}
