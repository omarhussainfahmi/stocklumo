using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;

namespace MarketDesk.Services;

public sealed record ProviderResult(string State, string Message, JsonElement? Data = null);

// One bounded cache and request budget serve every browser and the background feed.
public sealed class FinnhubApi(IHttpClientFactory clients, IConfiguration configuration) : IDisposable
{
    private readonly MemoryCache cache = new(new MemoryCacheOptions { SizeLimit = 16 * 1024 * 1024 });
    private readonly SemaphoreSlim gate = new(1, 1);
    private DateTimeOffset window = DateTimeOffset.UtcNow;
    private DateTimeOffset blockedUntil;
    private int requests;
    public bool Configured => !string.IsNullOrWhiteSpace(configuration["Finnhub:ApiKey"]);

    public async Task<ProviderResult> GetAsync(string path, TimeSpan lifetime, CancellationToken token)
    {
        if (!Configured) return new("setup", "Connect a Finnhub API key on the server to load market information.");
        var key = configuration["Finnhub:ApiKey"]!;
        if (key.Length > 512 || key.Any(char.IsControl)) return new("error", "The server's Finnhub key configuration is invalid.");
        if (cache.TryGetValue(path, out ProviderResult? cached) && cached is not null) return cached;
        await gate.WaitAsync(token);
        try
        {
            if (cache.TryGetValue(path, out cached) && cached is not null) return cached;
            var now = DateTimeOffset.UtcNow;
            if (now < blockedUntil) return new("limited", "The data provider is cooling down. Please try again shortly.");
            if (now - window >= TimeSpan.FromMinutes(1)) { window = now; requests = 0; }
            if (requests >= 45) return new("limited", "The shared data limit has been reached. Please retry in a minute.");
            requests++;
            ProviderResult result;
            try
            {
                using var client = clients.CreateClient("Finnhub");
                using var request = new HttpRequestMessage(HttpMethod.Get, path);
                request.Headers.Add("X-Finnhub-Token", key);
                using var response = await client.SendAsync(request, token);
                if (response.StatusCode == HttpStatusCode.TooManyRequests)
                {
                    var retry = response.Headers.RetryAfter?.Delta ?? TimeSpan.FromMinutes(1);
                    blockedUntil = now + TimeSpan.FromSeconds(Math.Clamp(retry.TotalSeconds, 60, 300));
                    result = new("limited", "Finnhub's request limit was reached. Updates will resume automatically.");
                }
                else if (response.StatusCode == HttpStatusCode.Unauthorized)
                {
                    blockedUntil = now + TimeSpan.FromMinutes(1);
                    result = new("error", "Finnhub could not authorize this request. Check the server's API key.");
                }
                else if (response.StatusCode == HttpStatusCode.Forbidden) result = new("unavailable", "This information is unavailable under the current Finnhub access.");
                else if (!response.IsSuccessStatusCode) result = new("error", "The data provider is temporarily unavailable.");
                else
                {
                    using var doc = JsonDocument.Parse(await response.Content.ReadAsStringAsync(token));
                    result = doc.RootElement.ValueKind == JsonValueKind.Object && doc.RootElement.TryGetProperty("error", out _)
                        ? new("unavailable", "The provider could not return this information.")
                        : new("ok", "", doc.RootElement.Clone());
                }
            }
            catch (OperationCanceledException) when (token.IsCancellationRequested) { throw; }
            catch (Exception ex) when (ex is HttpRequestException or JsonException or OperationCanceledException)
            { result = new("error", "Market data could not be loaded. Please try again shortly."); }
            var size = 512 + path.Length * 2 + (result.Data?.GetRawText().Length ?? result.Message.Length) * 2;
            cache.Set(path, result, new MemoryCacheEntryOptions { Size = size, AbsoluteExpirationRelativeToNow = result.State == "ok" ? lifetime : TimeSpan.FromSeconds(30) });
            return result;
        }
        finally { gate.Release(); }
    }
    public void Dispose() { cache.Dispose(); gate.Dispose(); }
}
