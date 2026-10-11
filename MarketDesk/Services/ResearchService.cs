using System.Text.Json;

namespace MarketDesk.Services;

public sealed record ResearchStock(string Symbol, string Name, string? Currency, string? Industry,
    decimal? Price, decimal? ChangePercent, decimal? MarketCapMillions, decimal? AverageVolumeMillions,
    decimal? PeTtm, decimal? DividendYieldTtm, long? Timestamp, string State, string Message);

public sealed class ResearchService(FinnhubApi api)
{
    public async Task<ResearchStock> StockAsync(string symbol, CancellationToken token)
    {
        var profile = await api.GetAsync("stock/profile2?symbol=" + symbol, TimeSpan.FromHours(12), token);
        if (Text(profile.Data, "ticker") != symbol)
            return new(symbol, symbol, null, null, null, null, null, null, null, null, null,
                profile.State == "ok" ? "unavailable" : profile.State, profile.Message.Length > 0 ? profile.Message : "Company information unavailable.");
        var quote = await api.GetAsync("quote?symbol=" + symbol, TimeSpan.FromSeconds(60), token);
        var metrics = await api.GetAsync("stock/metric?metric=all&symbol=" + symbol, TimeSpan.FromHours(1), token);
        var metric = Field(metrics.Data, "metric");
        var timestamp = Number(quote.Data, "t");
        var price = Number(quote.Data, "c");
        if (timestamp is not > 0 or > 253402300799 || price is not > 0) price = null;
        var previous = Number(quote.Data, "pc");
        return new(symbol, Text(profile.Data, "name") ?? symbol, Text(profile.Data, "currency"),
            Text(profile.Data, "finnhubIndustry"), price, price is not null && previous > 0 ? (price - previous) / previous * 100 : null,
            Positive(Number(profile.Data, "marketCapitalization")), Positive(Number(metric, "10DayAverageTradingVolume")),
            Number(metric, "peTTM"), Number(metric, "currentDividendYieldTTM"), price is null ? null : (long?)timestamp,
            quote.State == "ok" && metrics.State == "ok" ? "ok" : "partial",
            string.Join(" ", new[] { quote.Message, metrics.Message }.Where(m => m.Length > 0)));
    }

    private static decimal? Positive(decimal? value) => value >= 0 ? value : null;
    internal static JsonElement? Field(JsonElement? value, string name) =>
        value is { ValueKind: JsonValueKind.Object } obj && obj.TryGetProperty(name, out var field) ? field : null;
    internal static string? Text(JsonElement? value, string name) => Field(value, name) is { ValueKind: JsonValueKind.String } field ? field.GetString() : null;
    internal static decimal? Number(JsonElement? value, string name) => Field(value, name) is { ValueKind: JsonValueKind.Number } field && field.TryGetDecimal(out var number) ? number : null;
}
