using System.Net;
using MarketDesk.Controllers;
using MarketDesk.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace MarketDesk.Tests;

public sealed class StreamAdmissionTests
{
    private sealed class Profiles(string ticker) : HttpMessageHandler, IHttpClientFactory
    {
        public int Calls;
        public HttpClient CreateClient(string name) => new(this, false) { BaseAddress = new("https://finnhub.io/api/v1/") };
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken token)
        {
            Calls++;
            return Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK) {
                Content = new StringContent("{\"ticker\":\"" + ticker + "\",\"name\":\"Fixture company\"}") });
        }
    }
    private static FinnhubApi Api(Profiles profiles) => new(profiles,
        new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "dummy" }).Build());

    [Fact]
    public async Task StreamValidatesNewCompanyWithoutAPreparatoryProfileRequest()
    {
        using var profiles = new Profiles("TEST"); using var api = Api(profiles); var store = new MarketStore();
        var admission = new CompanyRegistration(api, store);
        Assert.False(store.Contains("TEST"));
        Assert.Null(await admission.PrepareAsync(["TEST"], default));
        using var lease = store.Subscribe(["TEST"]);
        Assert.NotNull(lease); Assert.Contains("TEST", store.ActiveSymbols);
        Assert.Equal(1, profiles.Calls);
        Assert.Null(await admission.PrepareAsync(["TEST"], default));
        Assert.Equal(1, profiles.Calls);
    }

    [Fact]
    public async Task ReadingAValidProfileDoesNotEnrollACompany()
    {
        using var profiles = new Profiles("TEST"); using var api = Api(profiles); var store = new MarketStore();
        var controller = new DataController(api);
        await controller.Stock("TEST", "profile", null, default);
        Assert.False(store.Contains("TEST"));
        Assert.Null(await new CompanyRegistration(api, store).PrepareAsync(["TEST"], default));
        Assert.True(store.Contains("TEST"));
        Assert.Equal(1, profiles.Calls); // The explicit admission reuses the safe profile cache.
    }

    [Fact]
    public async Task UnknownCompanyIsNotReportedAsCapacityExhaustionOrPartiallySubscribed()
    {
        using var profiles = new Profiles("OTHER"); using var api = Api(profiles); var store = new MarketStore();
        var controller = new MarketController(store, new CompanyRegistration(api, store));
        var context = new DefaultHttpContext(); context.Response.Body = new MemoryStream();
        controller.ControllerContext = new() { HttpContext = context };
        await controller.Stream(default, "AAPL,TEST");
        Assert.Equal(404, context.Response.StatusCode);
        Assert.Empty(store.ActiveSymbols);
        Assert.False(store.Contains("TEST"));
    }

    [Fact]
    public async Task VerifiedCompaniesStillRespectGlobalSubscriptionCapacity()
    {
        using var profiles = new Profiles("TEST"); using var api = Api(profiles); var store = new MarketStore();
        for (var i = 0; i < 40; i++) store.Ensure("S" + i, "Fixture", "");
        using var occupied = store.Subscribe(Enumerable.Range(0, 40).Select(i => "S" + i).ToArray());
        Assert.NotNull(occupied);
        var controller = new MarketController(store, new CompanyRegistration(api, store));
        controller.ControllerContext = new() { HttpContext = new DefaultHttpContext() };
        await controller.Stream(default, "TEST");
        Assert.Equal(429, controller.Response.StatusCode);
        Assert.Equal(40, store.ActiveSymbols.Length);
    }
}
