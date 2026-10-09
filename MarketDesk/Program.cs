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
builder.Services.AddHttpsRedirection(options => options.HttpsPort = 443);
builder.Services.AddSingleton<MarketStore>();
builder.Services.AddSingleton<FinnhubApi>();
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
    context.Response.Headers.ContentSecurityPolicy = "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'";
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
app.UseStaticFiles();
app.UseRouting();
app.UseRateLimiter();
app.MapGet("/health", () => Results.Ok(new { status = "ok" })).RequireRateLimiting("read");
app.MapControllers();
app.Run();

public partial class Program;
