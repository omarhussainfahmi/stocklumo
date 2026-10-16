using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using MarketDesk.Models;

namespace MarketDesk.Services;

public sealed record UniverseStock(string Symbol, string Name, string Mic);
public sealed record UniverseSnapshot(string State, string Message, int? Count, int? Exchanges,
    DateTimeOffset? RetrievedAt, string SelectionDate, UniverseStock[] Selection);

// Metadata is not quote coverage or a guarantee of real-time entitlement.
public sealed class StockUniverse(FinnhubApi api, TimeProvider clock) : IDisposable
{
    private readonly SemaphoreSlim gate = new(1, 1);
    private UniverseStock[]? stocks;
    private DateTimeOffset? retrievedAt;
    private DateTimeOffset retryAt;
    private string failure = "Stock universe unavailable.";

    public async Task<UniverseSnapshot> GetAsync(CancellationToken token)
    {
        await gate.WaitAsync(token);
        try
        {
            var now = clock.GetUtcNow();
            if ((retrievedAt is null || now - retrievedAt >= TimeSpan.FromHours(24)) && now >= retryAt)
            {
                // Only the compact, filtered metadata is retained by this service.
                var response = await api.GetAsync("stock/symbol?exchange=US", TimeSpan.Zero, token);
                if (response.State == "ok" && response.Data is { ValueKind: JsonValueKind.Array } data)
                {
                    stocks = Filter(data);
                    retrievedAt = clock.GetUtcNow();
                }
                else failure = response.Message.Length > 0 ? response.Message : "Invalid stock-universe response.";
                retryAt = clock.GetUtcNow().AddMinutes(5);
            }
            var day = DateOnly.FromDateTime(now.UtcDateTime);
            var stale = retrievedAt is not null && now - retrievedAt >= TimeSpan.FromHours(24);
            return new(stocks is null ? "unavailable" : stale ? "stale" : "ok",
                stocks is null || stale ? failure : "", stocks?.Length,
                stocks?.Select(s => s.Mic).Distinct().Count(), retrievedAt, day.ToString("yyyy-MM-dd"),
                stocks is null ? [] : Select(stocks, day));
        }
        finally { gate.Release(); }
    }

    internal static UniverseStock[] Filter(JsonElement data) => data.EnumerateArray()
        .Where(r => r.ValueKind == JsonValueKind.Object && Text(r, "type") == "Common Stock" &&
            Text(r, "currency") == "USD" && Text(r, "mic") is "XNAS" or "XNYS" or "XASE" &&
            StockSymbol.IsValid(Text(r, "symbol")))
        .Select(r => new UniverseStock(Text(r, "symbol"), Text(r, "description"), Text(r, "mic")))
        .DistinctBy(r => r.Symbol).OrderBy(r => r.Symbol, StringComparer.Ordinal).ToArray();

    // Shared by visitors and deterministic across restarts. Daily buckets rotate without
    // individual users opening different sets of upstream subscriptions.
    internal static UniverseStock[] Select(UniverseStock[] pool, DateOnly day) => pool
        .OrderBy(s => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes($"{day:yyyy-MM-dd}:{s.Symbol}"))), StringComparer.Ordinal)
        .Take(8).ToArray();

    private static string Text(JsonElement row, string name) =>
        row.TryGetProperty(name, out var value) && value.ValueKind == JsonValueKind.String ? value.GetString()! : "";
    public void Dispose() => gate.Dispose();
}
