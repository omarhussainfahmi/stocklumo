using Microsoft.AspNetCore.RateLimiting;
using MarketDesk.Services;

var builder = WebApplication.CreateBuilder(args);
// Render terminates TLS before forwarding traffic to this container.
// Use platform configuration, never client-supplied forwarded headers.
builder.Services.PostConfigure<Microsoft.AspNetCore.HostFiltering.HostFilteringOptions>(options =>
{
    if (builder.Configuration["RENDER"] != "true" || !builder.Environment.IsProduction()) return;
    var hostname = builder.Configuration["RENDER_EXTERNAL_HOSTNAME"];
    if (string.IsNullOrWhiteSpace(hostname) || Uri.CheckHostName(hostname) != UriHostNameType.Dns
        || !hostname.EndsWith(".onrender.com", StringComparison.OrdinalIgnoreCase))
        throw new InvalidOperationException("Render requires its assigned public hostname.");
    options.AllowedHosts = new[] { hostname };
});
builder.WebHost.ConfigureKestrel(o => o.AddServerHeader = false);
builder.Services.AddControllersWithViews();
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.MimeTypes = ["text/css", "text/javascript", "application/javascript", "image/svg+xml"];
});
builder.Services.AddHttpsRedirection(options => options.HttpsPort = 443);
builder.Services.AddSingleton<MarketStore>();
builder.Services.AddSingleton<FinnhubApi>();
builder.Services.AddSingleton<ResearchService>();
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddSingleton<StockUniverse>();
builder.Services.AddHttpClient("Finnhub", c =>
{
    c.BaseAddress = new Uri("https://finnhub.io/api/v1/");
    c.Timeout = TimeSpan.FromSeconds(10);
    c.MaxResponseContentBufferSize = 2 * 1024 * 1024;
}).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler { AllowAutoRedirect = false }).RemoveAllLoggers();
builder.Services.AddHostedService<FinnhubFeed>();
builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = 429;
    o.OnRejected = async (context, token) =>
    {
        if (context.Lease.TryGetMetadata(System.Threading.RateLimiting.MetadataName.RetryAfter, out var retry))
            context.HttpContext.Response.Headers.RetryAfter = Math.Max(1, Math.Ceiling(retry.TotalSeconds)).ToString(System.Globalization.CultureInfo.InvariantCulture);
        context.HttpContext.Response.Headers.CacheControl = "no-store";
        await context.HttpContext.Response.WriteAsJsonAsync(new { message = "Too many requests. Please retry shortly." }, token);
    };
    o.AddConcurrencyLimiter("stream", p => { p.PermitLimit = 100; p.QueueLimit = 0; });
    o.AddFixedWindowLimiter("read", p =>
    {
        p.PermitLimit = 300; p.Window = TimeSpan.FromMinutes(1); p.QueueLimit = 0;
    });
});
var app = builder.Build();
if (app.Configuration["RENDER"] == "true" && app.Environment.IsProduction())
{
    app.Use((context, next) =>
    {
        context.Request.Scheme = "https";
        return next(context);
    });
}
app.Use(async (context, next) =>
{
    context.Response.Headers.ContentSecurityPolicy = "default-src 'none'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self'; connect-src 'self' https://cloudflareinsights.com; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; object-src 'none'";
    context.Response.Headers.XContentTypeOptions = "nosniff";
    context.Response.Headers.XFrameOptions = "DENY";
    context.Response.Headers["Referrer-Policy"] = "no-referrer";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
    await next();
});
app.UseExceptionHandler(error => error.Run(async context =>
{
    context.Response.StatusCode = 500;
    await context.Response.WriteAsJsonAsync(new { error = "Unable to complete the request." });
}));
if (!app.Environment.IsDevelopment()) { app.UseHsts(); app.UseHttpsRedirection(); }
app.UseStatusCodePagesWithReExecute("/site-error/{0}");
// Compress public static assets only; keep streaming, API payloads and user pages out.
app.UseWhen(context => context.Request.Path.StartsWithSegments("/css") || context.Request.Path.StartsWithSegments("/js") || context.Request.Path.StartsWithSegments("/images"),
    assets => assets.UseResponseCompression());
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = context => context.Context.Response.Headers.CacheControl =
        context.Context.Request.Query.ContainsKey("v") ? "public,max-age=31536000,immutable" : "public,max-age=3600"
});
app.UseRouting();
app.UseRateLimiter();
app.MapGet("/health", () => Results.Ok(new { status = "ok" })).RequireRateLimiting("read");
app.MapControllers();
app.Run();

public partial class Program;
