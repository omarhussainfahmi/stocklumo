using MarketDesk.Services;
using Sentry;

namespace MarketDesk.Tests;

public sealed class MonitoringTests
{
    [Fact]
    public void MonitoringRebuildsEventsWithoutSensitivePayloads()
    {
        const string secret = "test-only-secret-not-a-real-key";
        var source = new SentryEvent(new InvalidOperationException("wss://provider.test?token=" + secret))
        {
            Message = secret,
            ServerName = secret,
            Environment = secret
        };
        source.Request.Url = "https://example.test/private?key=" + secret;
        source.Request.QueryString = secret;
        source.Request.Headers["Authorization"] = secret;
        source.Request.Data = secret;
        source.User.Email = secret;
        source.Contexts["private"] = secret;
        source.SetExtra("private", secret);
        source.SetTag("private", secret);
        source.AddBreadcrumb(secret);

        var safe = ErrorMonitoring.SafeEvent(source, "Production");
        Assert.NotSame(source, safe);
        Assert.Null(safe.Exception);
        Assert.Equal("Stocklumo server error: System.InvalidOperationException", safe.Message?.Message);
        Assert.Equal("Production", safe.Environment);
        Assert.Null(safe.ServerName);
        Assert.Null(safe.Request.Url);
        Assert.Null(safe.Request.QueryString);
        Assert.Empty(safe.Request.Headers);
        Assert.Null(safe.Request.Data);
        Assert.Null(safe.User.Email);
        Assert.False(safe.Contexts.ContainsKey("private"));
        Assert.Empty(safe.Extra);
        Assert.Empty(safe.Breadcrumbs);
        Assert.Single(safe.Tags);
        Assert.Equal("System.InvalidOperationException", safe.Tags["error.kind"]);
    }

    [Fact]
    public void LoggingEventsDoNotForwardFormattedMessages()
    {
        var safe = ErrorMonitoring.SafeEvent(new SentryEvent { Message = "private user input" }, "Development");
        Assert.Equal("Stocklumo server error: LoggedError", safe.Message?.Message);
        Assert.Equal(SentryLevel.Error, safe.Level);
    }
}
