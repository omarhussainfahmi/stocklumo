using MarketDesk.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace MarketDesk.Controllers;

[ApiController, Route("api/universe"), EnableRateLimiting("read")]
[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public sealed class UniverseController(StockUniverse universe) : ControllerBase
{
    [HttpGet]
    public async Task<UniverseSnapshot> Get(CancellationToken token) => await universe.GetAsync(token);
}
