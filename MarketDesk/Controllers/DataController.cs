using MarketDesk.Models;
using MarketDesk.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace MarketDesk.Controllers;

[ApiController, Route("api/data"), EnableRateLimiting("read")]
[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public sealed class DataController(FinnhubApi api, MarketStore store) : ControllerBase
{
    [HttpGet("search")]
    public async Task<IActionResult> Search(string? q, CancellationToken token)
    {
        q = q?.Trim();
        if (string.IsNullOrEmpty(q)) return Ok(new ProviderResult("empty", "Enter a company name or stock symbol."));
        if (q.Length > 60 || q.Any(char.IsControl)) return BadRequest(new { message = "Use a search of 60 characters or fewer." });
        return Ok(await api.GetAsync("search?q=" + Uri.EscapeDataString(q), TimeSpan.FromMinutes(10), token));
    }

    [HttpGet("stock/{symbol}/{section}")]
    public async Task<IActionResult> Stock(string symbol, string section, string? range, CancellationToken token)
    {
        if (!StockSymbol.IsValid(symbol)) return BadRequest(new { message = "Invalid stock symbol." });
        var escaped = Uri.EscapeDataString(symbol);
        string path;
        var ttl = TimeSpan.FromMinutes(10);
        switch (section)
        {
            case "profile": path = "stock/profile2?symbol=" + escaped; ttl = TimeSpan.FromHours(12); break;
            case "quote": path = "quote?symbol=" + escaped; ttl = TimeSpan.FromSeconds(60); break;
            case "metrics": path = "stock/metric?metric=all&symbol=" + escaped; ttl = TimeSpan.FromHours(1); break;
            case "news":
                path = $"company-news?symbol={escaped}&from={DateTime.UtcNow.AddDays(-7):yyyy-MM-dd}&to={DateTime.UtcNow:yyyy-MM-dd}";
                break;
            case "chart":
                var days = range switch { "1D" => 1, "5D" => 5, "1M" => 31, "6M" => 183, "1Y" => 366, _ => 0 };
                if (days == 0) return BadRequest(new { message = "Invalid chart range." });
                var end = DateTimeOffset.UtcNow.ToUnixTimeSeconds() / 300 * 300;
                var resolution = days <= 1 ? "5" : days <= 5 ? "30" : "D";
                path = $"stock/candle?symbol={escaped}&resolution={resolution}&from={end - days * 86400L}&to={end}";
                break;
            default: return NotFound();
        }
        var result = await api.GetAsync(path, ttl, token);
        if (section == "profile" && result.State == "ok")
        {
            if (result.Data is not { ValueKind: System.Text.Json.JsonValueKind.Object } profile ||
                ReadText(profile, "ticker") != symbol)
                return Ok(new ProviderResult("unavailable", "Company information is unavailable for this symbol."));
            store.Ensure(symbol, ReadText(profile, "name") ?? symbol, ReadText(profile, "finnhubIndustry") ?? "");
        }
        return Ok(result);
    }

    private static string? ReadText(System.Text.Json.JsonElement value, string property) =>
        value.TryGetProperty(property, out var field) && field.ValueKind == System.Text.Json.JsonValueKind.String
            ? field.GetString() : null;

    [HttpGet("news")]
    public async Task<ProviderResult> News(CancellationToken token) => await api.GetAsync("news?category=general", TimeSpan.FromMinutes(10), token);

    [HttpGet("status")]
    public async Task<ProviderResult> Status(CancellationToken token) => await api.GetAsync("stock/market-status?exchange=US", TimeSpan.FromMinutes(1), token);

}
