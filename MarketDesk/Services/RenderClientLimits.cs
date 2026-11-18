using System.Net;
using System.Net.Sockets;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.Primitives;

namespace MarketDesk.Services;

internal static class RenderClientLimits
{
    // The middleware acquires this limiter before the shared endpoint limiter.
    internal static PartitionedRateLimiter<HttpContext> Create() =>
        PartitionedRateLimiter.Create<HttpContext, (string Policy, int Bucket)>(context =>
        {
            var policy = context.GetEndpoint()?.Metadata.GetMetadata<EnableRateLimitingAttribute>()?.PolicyName;
            if (policy is not ("read" or "stream"))
                return RateLimitPartition.GetNoLimiter(("unmetered", 0));

            var key = (policy, Bucket(context.Request.Headers["CF-Connecting-IP"]));
            if (policy == "stream")
                return RateLimitPartition.GetConcurrencyLimiter(key, _ => new ConcurrencyLimiterOptions { PermitLimit = 6 });

            return RateLimitPartition.GetFixedWindowLimiter(key, _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 120,
                Window = TimeSpan.FromMinutes(1)
            });
        });

    internal static int Bucket(StringValues header)
    {
        if (header.Count != 1 || header[0] is not { Length: > 0 and <= 45 } value ||
            value.Contains('%') || value.Contains('[') || !IPAddress.TryParse(value, out var address))
            return -1;

        // TryParse also accepts abbreviated and legacy numeric IPv4 forms.
        if (address.AddressFamily == AddressFamily.InterNetwork && value != address.ToString()) return -1;
        if (address.IsIPv4MappedToIPv6) address = address.MapToIPv4();
        Span<byte> bytes = stackalloc byte[16];
        address.TryWriteBytes(bytes, out var length);
        // Group IPv6 privacy addresses by /64. Process-seeded buckets bound memory
        // even during address churn and keep raw addresses out of limiter state.
        var hash = new HashCode();
        hash.AddBytes(bytes[..Math.Min(length, 8)]);
        return hash.ToHashCode() & 0x0fff;
    }
}
