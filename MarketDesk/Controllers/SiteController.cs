using System.Xml.Linq;
using MarketDesk.Models;
using Microsoft.AspNetCore.Mvc;

namespace MarketDesk.Controllers;

[ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
public sealed class SiteController : Controller
{
    [HttpGet("/privacy")]
    public IActionResult Privacy() => View();
    [HttpGet("/terms")]
    public IActionResult Terms() => View();
    [HttpGet("/settings")]
    public IActionResult Settings() => View();

    [HttpGet("/sitemap.xml")]
    public IActionResult Sitemap()
    {
        XNamespace ns = "http://www.sitemaps.org/schemas/sitemap/0.9";
        var xml = new XDocument(new XElement(ns + "urlset", SitePage.PublicPaths.Select(path =>
            new XElement(ns + "url", new XElement(ns + "loc", SitePage.Origin + path)))));
        return Content(xml.ToString(), "application/xml", System.Text.Encoding.UTF8);
    }

    [HttpGet("/robots.txt")]
    public IActionResult Robots() => Content($"User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /health\nDisallow: /settings\nDisallow: /portfolio\nDisallow: /watchlist\nSitemap: {SitePage.Origin}/sitemap.xml\n", "text/plain");

    // Preserve real HTTP status codes. JSON clients never receive an HTML error page.
    [Route("/site-error/{code:int}")]
    public IActionResult Error(int code)
    {
        Response.StatusCode = code is >= 400 and <= 599 ? code : 404;
        var originalPath = HttpContext.Features.Get<Microsoft.AspNetCore.Diagnostics.IStatusCodeReExecuteFeature>()?.OriginalPath ?? Request.Path.Value ?? "";
        if (originalPath.StartsWith("/api/", StringComparison.OrdinalIgnoreCase) || Request.Headers.Accept.Any(v => v?.Contains("application/json", StringComparison.OrdinalIgnoreCase) == true))
            return new JsonResult(new { error = Response.StatusCode == 404 ? "Not found." : "Unable to complete the request." }) { StatusCode = Response.StatusCode };
        return View("Error", Response.StatusCode);
    }
}
