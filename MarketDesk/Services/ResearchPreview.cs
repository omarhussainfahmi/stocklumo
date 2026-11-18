using System.Net;
using System.Text.Json;
using MarketDesk.Models;

namespace MarketDesk.Services;

public sealed record PreviewBar(long Time, decimal Open, decimal High, decimal Low, decimal Close, decimal Volume);
public sealed record PreviewMinute(long Time, decimal Price, decimal Volume);
public sealed record PreviewQuarter(string Period, DateOnly PeriodEnd, DateOnly PublishedAt, string Currency,
    decimal? Revenue, decimal? NetIncome, decimal? OperatingIncome);
public sealed record PreviewEarning(string Symbol, DateOnly Date, DateTimeOffset EventTime, string Currency, string Hour,
    decimal? EpsEstimate, decimal? EpsActual, decimal? RevenueEstimate, decimal? RevenueActual);
public sealed class ResearchSnapshot
{
    public int Version { get; set; }
    public string Source { get; set; } = "";
    public DateTimeOffset CapturedAt { get; set; }
    public Dictionary<string, List<PreviewBar>> Histories { get; set; } = [];
    public Dictionary<string, List<PreviewBar>> Adjusted { get; set; } = [];
    public Dictionary<string, List<PreviewMinute>> Intraday { get; set; } = [];
    public Dictionary<string, List<PreviewQuarter>> Financials { get; set; } = [];
    public List<ResearchStock> Screener { get; set; } = [];
    public int ScreenerTotal { get; set; }
    public List<PreviewEarning> Earnings { get; set; } = [];
    public DateOnly CalendarFrom { get; set; }
    public DateOnly CalendarTo { get; set; }
    public List<string> CalendarSymbols { get; set; } = [];
}

// Opt-in, loopback-only development data. No credentials, network calls, public feed or published data files.
public sealed class ResearchPreview
{
    private readonly bool configured;
    private readonly Lazy<ResearchSnapshot?> snapshot;
    public ResearchPreview(IConfiguration configuration, IWebHostEnvironment environment, TimeProvider clock)
    {
        configured = environment.IsDevelopment() && configuration.GetValue<bool>("ResearchPreview:Enabled");
        snapshot = new(() =>
        {
            if (!configured) return null;
            var file = configuration["ResearchPreview:File"];
            if (string.IsNullOrWhiteSpace(file)) return null;
            try
            {
                // Configuration is server-owned; request parameters never select a file.
                if (!Path.IsPathFullyQualified(file) || new FileInfo(file).Length is <= 0 or > 2_000_000) return null;
                var data = JsonSerializer.Deserialize<ResearchSnapshot>(File.ReadAllText(file), new JsonSerializerOptions(JsonSerializerDefaults.Web));
                return data is not null && Valid(data, clock.GetUtcNow()) ? data : null;
            }
            catch (Exception e) when (e is IOException or UnauthorizedAccessException or JsonException or ArgumentException or NotSupportedException) { return null; }
        });
    }
    public bool AvailableFor(HttpContext? context) => configured && context?.Connection.RemoteIpAddress is { } address && IPAddress.IsLoopback(address) && snapshot.Value is not null;
    public string CaptureLabel => Data?.CapturedAt.ToUniversalTime().ToString("yyyy-MM-dd HH:mm 'UTC'") ?? "Unavailable";
    internal ResearchSnapshot? Data => configured ? snapshot.Value : null;
    public object? Metadata() => Data is not { } data ? null : new
    {
        source = data.Source, data.CapturedAt, localOnly = true,
        symbols = data.Histories.Keys, financialSymbols = data.Financials.Keys,
        screenerCount = data.Screener.Count, data.ScreenerTotal, data.CalendarFrom, data.CalendarTo,
        calendarSymbols = data.CalendarSymbols
    };
    public ProviderResult? Chart(string symbol, string range, bool adjusted = false)
    {
        if (Data is not { } data || !StockSymbol.IsValid(symbol) || !new[] { "1D", "5D", "1M", "6M", "1Y" }.Contains(range)) return null;
        var history = adjusted ? data.Adjusted : data.Histories;
        if (!history.TryGetValue(symbol, out var all) || all.Count < 2) return null;
        var end = DateTimeOffset.FromUnixTimeSeconds(all[^1].Time).UtcDateTime.Date;
        var start = range switch { "1M" => end.AddMonths(-1), "6M" => end.AddMonths(-6), "1Y" => end.AddYears(-1), _ => end };
        var ranges = new List<string> { "5D" };
        if (data.Intraday.TryGetValue(symbol, out var minutes) && minutes.Count > 1) ranges.Insert(0, "1D");
        foreach (var (key, from) in new[] { ("1M", end.AddMonths(-1)), ("6M", end.AddMonths(-6)), ("1Y", end.AddYears(-1)) })
            if (DateTimeOffset.FromUnixTimeSeconds(all[0].Time).UtcDateTime.Date <= from) ranges.Add(key);
        if (!ranges.Contains(range)) return new("unavailable", "The captured data does not cover this range.");
        object payload;
        if (range == "1D" && minutes is not null)
            payload = new { s = "ok", t = minutes.Select(p => p.Time), c = minutes.Select(p => p.Price), v = minutes.Select(p => p.Volume),
                source = data.Source, data.CapturedAt, resolution = "1 minute", adjustment = "Unadjusted", availableRanges = ranges, localOnly = true };
        else
        {
            var selected = (range == "5D" ? all.TakeLast(5) : all.Where(p => DateTimeOffset.FromUnixTimeSeconds(p.Time).UtcDateTime.Date >= start)).ToArray();
            if (selected.Length < 2) return new("unavailable", "Insufficient observations in this range.");
            payload = new { s = "ok", t = selected.Select(p => p.Time), c = selected.Select(p => p.Close), o = selected.Select(p => p.Open),
                h = selected.Select(p => p.High), l = selected.Select(p => p.Low), v = selected.Select(p => p.Volume),
                source = data.Source, data.CapturedAt, resolution = "Daily", adjustment = adjusted ? "Forward-adjusted" : "Unadjusted",
                availableRanges = ranges, localOnly = true };
        }
        return new("ok", "Dated local research preview; not a live feed.", JsonSerializer.SerializeToElement(payload, new JsonSerializerOptions(JsonSerializerDefaults.Web)));
    }
    internal static bool Valid(ResearchSnapshot d, DateTimeOffset now)
    {
        if (d.Version != 1 || d.Source != "Longbridge" || d.CapturedAt > now.AddMinutes(1) || d.CapturedAt.Year < 2020) return false;
        if (d.Histories is null || d.Adjusted is null || d.Intraday is null || d.Financials is null ||
            d.Screener is null || d.Earnings is null || d.CalendarSymbols is null) return false;
        if (d.Histories.Count is < 1 or > 32 || d.Adjusted.Count > 32 || d.Intraday.Count > 32 ||
            d.Financials.Count > 32 || d.Screener.Count > 100 || d.Earnings.Count > 1000) return false;
        if (d.ScreenerTotal < d.Screener.Count || d.CalendarFrom > d.CalendarTo) return false;
        var last = d.CapturedAt.ToUnixTimeSeconds();
        var captureDate = DateOnly.FromDateTime(d.CapturedAt.UtcDateTime);
        foreach (var (symbol, rows) in d.Histories.Concat(d.Adjusted))
        {
            if (!StockSymbol.IsValid(symbol) || rows is null || rows.Count is < 2 or > 1000) return false;
            long previous = 0;
            foreach (var p in rows)
            {
                if (p is null || p.Time <= previous || p.Time > last) return false;
                if (p.Open <= 0 || p.Close <= 0 || p.Low <= 0 || p.Low > Math.Min(p.Open, p.Close) ||
                    p.High < Math.Max(p.Open, p.Close) || p.Volume < 0) return false;
                previous = p.Time;
            }
        }
        foreach (var (symbol, rows) in d.Intraday)
        {
            if (!StockSymbol.IsValid(symbol) || rows is null || rows.Count is < 2 or > 1000) return false;
            long previous = 0;
            foreach (var p in rows)
            {
                if (p is null || p.Time <= previous || p.Time > last || p.Price <= 0 || p.Volume < 0) return false;
                previous = p.Time;
            }
        }
        foreach (var r in d.Screener)
            if (r is null || !StockSymbol.IsValid(r.Symbol) || r.Currency != "USD" || r.Price is not > 0 ||
                r.Name is not { Length: > 0 and <= 200 }) return false;
        foreach (var (symbol, rows) in d.Financials)
        {
            if (!StockSymbol.IsValid(symbol) || rows is null || rows.Count > 20) return false;
            foreach (var q in rows)
                if (q is null || q.Period is not { Length: > 0 and <= 40 } || q.Currency != "USD" ||
                    q.PublishedAt < q.PeriodEnd || q.PublishedAt > captureDate) return false;
        }
        if (!d.CalendarSymbols.All(StockSymbol.IsValid)) return false;
        foreach (var e in d.Earnings)
            if (e is null || !StockSymbol.IsValid(e.Symbol) || e.Currency != "USD" ||
                e.Date < d.CalendarFrom || e.Date > d.CalendarTo) return false;
        return true;
    }
}
