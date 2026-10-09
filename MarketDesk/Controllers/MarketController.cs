using System.Text.Json;
using MarketDesk.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace MarketDesk.Controllers;

public sealed class MarketController(MarketStore store) : Controller
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    [HttpGet("/")]
    public IActionResult Index() => View(store.Snapshot());

    [HttpGet("/markets")]
    [HttpGet("/watchlist")]
    [HttpGet("/news")]
    public IActionResult Section() => View("Index", store.Snapshot());

    [HttpGet("/stock/{symbol}")]
    public IActionResult Stock(string symbol)
    {
        if (!MarketDesk.Models.StockSymbol.IsValid(symbol)) return BadRequest("Invalid stock symbol.");
        ViewData["Symbol"] = symbol;
        return View("Index", store.Snapshot());
    }

    [HttpGet("/api/market")]
    [EnableRateLimiting("read")]
    [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
    public IActionResult Snapshot() => Json(store.Snapshot());

    [HttpGet("/api/market/stream")]
    [EnableRateLimiting("stream")]
    public async Task Stream(CancellationToken token, string? symbols = null)
    {
        var requested = symbols is null ? store.Symbols.Take(8).ToArray() : symbols.Split(',', StringSplitOptions.RemoveEmptyEntries).Distinct().ToArray();
        // Twenty saved stocks, the selected stock and six shared ticker symbols.
        if (requested.Length > 27 || requested.Any(s => !MarketDesk.Models.StockSymbol.IsValid(s))) { Response.StatusCode = 400; return; }
        using var subscription = store.Subscribe(requested);
        if (subscription is null) { Response.StatusCode = 429; return; }
        Response.ContentType = "text/event-stream";
        Response.Headers.CacheControl = "no-store";
        Response.Headers["X-Accel-Buffering"] = "no";
        HttpContext.Features.Get<Microsoft.AspNetCore.Http.Features.IHttpResponseBodyFeature>()?.DisableBuffering();
        try
        {
            using var timer = new PeriodicTimer(TimeSpan.FromSeconds(1));
            do
            {
                var snapshot = store.Snapshot();
                await Response.WriteAsync("data: " + JsonSerializer.Serialize(snapshot with { Stocks = snapshot.Stocks.Where(s => requested.Contains(s.Symbol)).ToArray() }, JsonOptions) + "\n\n", token);
                await Response.Body.FlushAsync(token);
            } while (await timer.WaitForNextTickAsync(token));
        }
        catch (OperationCanceledException) when (token.IsCancellationRequested) { }
    }
}
