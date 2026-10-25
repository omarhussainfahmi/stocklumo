using System.Net;
using System.Text.Json;
using Microsoft.Extensions.Caching.Memory;

namespace MarketDesk.Services;

public sealed record ProviderResult(string State, string Message, JsonElement? Data = null);
public sealed record CompanyLogo(byte[] Bytes, string ContentType);

// One bounded cache and request budget serve every browser and the background feed.
public sealed class FinnhubApi(IHttpClientFactory clients, IConfiguration configuration) : IDisposable
{
    private readonly MemoryCache cache = new(new MemoryCacheOptions { SizeLimit = 16 * 1024 * 1024 });
    private readonly SemaphoreSlim gate = new(1, 1);
    private readonly MemoryCache logoCache = new(new MemoryCacheOptions { SizeLimit = 8 * 1024 * 1024 });
    private readonly SemaphoreSlim logoGate = new(2, 2);
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
                if (path == "stock/symbol?exchange=US")
                {
                    client.MaxResponseContentBufferSize = 16 * 1024 * 1024;
                    client.Timeout = TimeSpan.FromSeconds(30);
                }
                using var request = new HttpRequestMessage(HttpMethod.Get, path);
                request.Headers.Add("X-Finnhub-Token", key);
                using var response = await client.SendAsync(request, token);
                // Finnhub's symbol endpoint redirects to its metadata CDN. Follow only
                // that exact HTTPS host for this endpoint, without forwarding the API key.
                var location = response.Headers.Location;
                var metadataRedirect = path == "stock/symbol?exchange=US" && response.StatusCode == HttpStatusCode.Found &&
                    location is { IsAbsoluteUri: true, Scheme: "https", Host: "static2.finnhub.io", Port: 443, UserInfo: "" };
                if (metadataRedirect && requests >= 45) return new("limited", "The shared data limit has been reached. Please retry in a minute.");
                if (metadataRedirect) requests++;
                using var metadataResponse = metadataRedirect ? await client.GetAsync(location, token) : null;
                var effectiveResponse = metadataResponse ?? response;
                if (effectiveResponse.StatusCode == HttpStatusCode.TooManyRequests)
                {
                    var retry = effectiveResponse.Headers.RetryAfter?.Delta ?? TimeSpan.FromMinutes(1);
                    blockedUntil = now + TimeSpan.FromSeconds(Math.Clamp(retry.TotalSeconds, 60, 300));
                    result = new("limited", "Finnhub's request limit was reached. Updates will resume automatically.");
                }
                else if (effectiveResponse.StatusCode == HttpStatusCode.Unauthorized)
                {
                    blockedUntil = now + TimeSpan.FromMinutes(1);
                    result = new("error", "Finnhub could not authorize this request. Check the server's API key.");
                }
                else if (effectiveResponse.StatusCode == HttpStatusCode.Forbidden) result = new("unavailable", "This information is unavailable under the current Finnhub access.");
                else if (!effectiveResponse.IsSuccessStatusCode) result = new("error", "The data provider is temporarily unavailable.");
                else
                {
                    using var doc = JsonDocument.Parse(await effectiveResponse.Content.ReadAsStringAsync(token));
                    result = doc.RootElement.ValueKind == JsonValueKind.Object && doc.RootElement.TryGetProperty("error", out _)
                        ? new("unavailable", "The provider could not return this information.")
                        : new("ok", "", doc.RootElement.Clone());
                }
            }
            catch (OperationCanceledException) when (token.IsCancellationRequested) { throw; }
            catch (Exception ex) when (ex is HttpRequestException or JsonException or OperationCanceledException)
            { result = new("error", "Market data could not be loaded. Please try again shortly."); }
            if (lifetime > TimeSpan.Zero || result.State != "ok")
            {
                var size = 512 + path.Length * 2 + (result.Data?.GetRawText().Length ?? result.Message.Length) * 2;
                cache.Set(path, result, new MemoryCacheEntryOptions { Size = size, AbsoluteExpirationRelativeToNow = result.State == "ok" ? lifetime : TimeSpan.FromSeconds(30) });
            }
            return result;
        }
        finally { gate.Release(); }
    }
    public async Task<CompanyLogo?> LogoAsync(string file, CancellationToken token)
    {
        if (file.Length > 120 || !System.Text.RegularExpressions.Regex.IsMatch(file, @"\A[A-Za-z0-9_-][A-Za-z0-9_.-]*\.(png|jpe?g|webp)\z", System.Text.RegularExpressions.RegexOptions.IgnoreCase)) return null;
        if (logoCache.TryGetValue(file, out CompanyLogo? cached)) return cached;
        await logoGate.WaitAsync(token);
        try
        {
            if (logoCache.TryGetValue(file, out cached)) return cached;
            CompanyLogo? result = null;
            try
            {
                // Separate client: no provider key, cookies, caller URL or redirects.
                using var client = clients.CreateClient("CompanyLogos");
                using var response = await client.GetAsync(Uri.EscapeDataString(file), token);
                // Finnhub currently redirects stock images to its static9 CDN.
                // Follow one exact-host, same-file redirect only, never arbitrary URLs.
                var location = response.Headers.Location;
                var safeRedirect = response.StatusCode is HttpStatusCode.MovedPermanently or HttpStatusCode.Found or HttpStatusCode.TemporaryRedirect or HttpStatusCode.PermanentRedirect &&
                    location is { IsAbsoluteUri: true, Scheme: "https", Host: "static9.finnhub.io", Port: 443, UserInfo: "", Query: "", Fragment: "" } &&
                    location.AbsolutePath == "/file/publicdatany/finnhubimage/stock_logo/" + file;
                using var redirected = safeRedirect ? await client.GetAsync(location, token) : null;
                var imageResponse = redirected ?? response;
                if (imageResponse.IsSuccessStatusCode)
                {
                    var bytes = await imageResponse.Content.ReadAsByteArrayAsync(token);
                    var type = imageResponse.Content.Headers.ContentType?.MediaType;
                    var png = type == "image/png" && bytes.AsSpan().StartsWith(new byte[] { 137, 80, 78, 71, 13, 10, 26, 10 });
                    var jpeg = type == "image/jpeg" && bytes.Length >= 3 && bytes[0] == 255 && bytes[1] == 216 && bytes[2] == 255;
                    var webp = type == "image/webp" && bytes.Length >= 12 && bytes.AsSpan(0, 4).SequenceEqual("RIFF"u8) && bytes.AsSpan(8, 4).SequenceEqual("WEBP"u8);
                    if (bytes.Length <= 256 * 1024 && (png || jpeg || webp)) result = new(bytes, type!);
                }
            }
            catch (OperationCanceledException) when (token.IsCancellationRequested) { throw; }
            catch (Exception ex) when (ex is HttpRequestException or OperationCanceledException) { }
            logoCache.Set(file, result, new MemoryCacheEntryOptions { Size = result?.Bytes.Length + 128 ?? 128, AbsoluteExpirationRelativeToNow = result is null ? TimeSpan.FromMinutes(5) : TimeSpan.FromHours(12) });
            return result;
        }
        finally { logoGate.Release(); }
    }
    public void Dispose() { cache.Dispose(); gate.Dispose(); logoCache.Dispose(); logoGate.Dispose(); }
}
