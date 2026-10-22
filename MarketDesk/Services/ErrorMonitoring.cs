using Sentry;

namespace MarketDesk.Services;

internal static class ErrorMonitoring
{
    // Rebuild from allowlisted fields: provider URLs, exception messages, request
    // data, breadcrumbs and arbitrary context can all contain private values.
    internal static SentryEvent SafeEvent(SentryEvent source, string environment)
    {
        var kind = source.Exception?.GetType().FullName ?? "LoggedError";
        var safe = new SentryEvent
        {
            Message = "Stocklumo server error: " + kind,
            Level = SentryLevel.Error,
            Environment = environment,
            Release = "stocklumo@" + typeof(ErrorMonitoring).Assembly.GetName().Version
        };
        safe.SetTag("error.kind", kind);
        return safe;
    }
}
