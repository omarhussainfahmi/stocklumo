using MarketDesk.Models;
using MarketDesk.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace MarketDesk.Controllers;

[ApiController, Route("api/research"), EnableRateLimiting("read")]
[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public sealed class ResearchController(ResearchService research, FinnhubApi api) : ControllerBase
{
    [HttpGet("stock/{symbol}")]
    public async Task<IActionResult> Stock(string symbol, CancellationToken token) =>
        !StockSymbol.IsValid(symbol) ? BadRequest(new { message = "Invalid stock symbol." }) : Ok(await research.StockAsync(symbol, token));

    [HttpGet("earnings")]
    public async Task<IActionResult> Earnings(DateOnly from, DateOnly to, string? symbol, CancellationToken token)
    {
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        if (to < from || to.DayNumber - from.DayNumber > 92 || from < today.AddYears(-1) || to > today.AddYears(1)
            || symbol is not null && !StockSymbol.IsValid(symbol))
            return BadRequest(new { message = "Use valid dates within a year of today, spanning at most 92 days, and a valid ticker." });
        return Ok(await api.GetAsync($"calendar/earnings?from={from:yyyy-MM-dd}&to={to:yyyy-MM-dd}" +
            (symbol is null ? "" : "&symbol=" + symbol), TimeSpan.FromHours(1), token));
    }

    [HttpGet("earnings/{symbol}/reported")]
    public async Task<IActionResult> Reported(string symbol, CancellationToken token) =>
        !StockSymbol.IsValid(symbol) ? BadRequest(new { message = "Invalid stock symbol." }) :
            Ok(await api.GetAsync("stock/earnings?symbol=" + symbol + "&limit=4", TimeSpan.FromHours(1), token));
}
