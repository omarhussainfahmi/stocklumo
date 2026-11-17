using MarketDesk.Models;
using MarketDesk.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace MarketDesk.Controllers;

[ApiController, Route("api/research-preview"), EnableRateLimiting("read")]
[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public sealed class ResearchPreviewController(ResearchPreview preview) : ControllerBase
{
    [HttpGet("status")]
    public IActionResult Status() => !preview.AvailableFor(HttpContext) ? NotFound() : Ok(preview.Metadata());

    [HttpGet("screener")]
    public IActionResult Screener() => !preview.AvailableFor(HttpContext) ? NotFound() : Ok(new
    { rows = preview.Data!.Screener, total = preview.Data.ScreenerTotal, preview.Data.CapturedAt, source = "Longbridge", localOnly = true });

    [HttpGet("financials/{symbol}")]
    public IActionResult Financials(string symbol) => !preview.AvailableFor(HttpContext) || !StockSymbol.IsValid(symbol) || !preview.Data!.Financials.TryGetValue(symbol, out var rows)
        ? NotFound() : Ok(new { rows, preview.Data.CapturedAt, source = "Longbridge", localOnly = true });

    [HttpGet("chart/{symbol}")]
    public IActionResult Chart(string symbol, string range = "1Y", bool adjusted = true) => !preview.AvailableFor(HttpContext) || !StockSymbol.IsValid(symbol)
        ? NotFound() : Ok(preview.Chart(symbol, range, adjusted) ?? new ProviderResult("unavailable", "No captured history for this company."));

    [HttpGet("earnings")]
    public IActionResult Earnings(DateOnly from, DateOnly to, string? symbol = null)
    {
        if (!preview.AvailableFor(HttpContext)) return NotFound();
        if (to < from || to.DayNumber - from.DayNumber > 92 || symbol is not null && !StockSymbol.IsValid(symbol)) return BadRequest();
        var data = preview.Data!;
        if (from < data.CalendarFrom || to > data.CalendarTo) return Ok(new ProviderResult("unavailable", "Choose dates within the captured calendar window."));
        return Ok(new { state = "ok", source = data.Source, data.CapturedAt, localOnly = true, coverage = data.CalendarSymbols,
            data = new { earningsCalendar = data.Earnings.Where(e => e.Date >= from && e.Date <= to && (symbol is null || e.Symbol == symbol)) } });
    }
}
