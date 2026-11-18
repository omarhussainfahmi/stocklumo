using System.Net.WebSockets;

namespace MarketDesk.Services;

public class MarketSocketFactory
{
    public virtual async Task<WebSocket> OpenAsync(string key, CancellationToken token)
    {
        var socket = new ClientWebSocket();
        socket.Options.KeepAliveInterval = TimeSpan.FromSeconds(20);
        socket.Options.KeepAliveTimeout = TimeSpan.FromSeconds(20);
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(token);
        timeout.CancelAfter(TimeSpan.FromSeconds(15));
        try
        {
            await socket.ConnectAsync(new Uri("wss://ws.finnhub.io?token=" + Uri.EscapeDataString(key)), timeout.Token);
            return socket;
        }
        catch { socket.Dispose(); throw; }
    }
}
