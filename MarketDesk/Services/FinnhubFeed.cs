using System.Net.WebSockets;
using System.Text.Json;

namespace MarketDesk.Services;

public sealed class FinnhubFeed(MarketStore store, FinnhubApi api, IConfiguration configuration,
    ILogger<FinnhubFeed> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var key = configuration["Finnhub:ApiKey"];
        if (string.IsNullOrWhiteSpace(key)) return;
        if (key.Length > 512 || key.Any(char.IsControl))
        {
            store.SetStatus("error", "The server's Finnhub key configuration is invalid.");
            return;
        }
        await Task.WhenAll(StreamAsync(key, stoppingToken), QuotesAsync(stoppingToken));
    }

    private async Task QuotesAsync(CancellationToken token)
    {
        while (!token.IsCancellationRequested)
        {
            foreach (var symbol in store.ActiveSymbols)
            {
                var result = await api.GetAsync("quote?symbol=" + Uri.EscapeDataString(symbol), TimeSpan.FromSeconds(60), token);
                if (result.Data is not { } data) continue;
                try
                {
                    var quote = data.Deserialize<QuoteResponse>();
                    if (quote is not null) store.Quote(symbol, quote.c, quote.pc, quote.o, quote.h, quote.l, quote.t);
                }
                catch (JsonException) { logger.LogWarning("Invalid quote payload."); }
            }
            await Task.Delay(TimeSpan.FromSeconds(5), token);
        }
    }
    private async Task StreamAsync(string key, CancellationToken token)
    {
        var delay = 2;
        while (!token.IsCancellationRequested)
        {
            if (store.ActiveSymbols.Length == 0)
            {
                store.SetStatus("idle", "Select a stock to connect to the market feed.");
                await Task.Delay(TimeSpan.FromSeconds(1), token);
                continue;
            }
            try
            {
                store.SetStatus("connecting", "Connecting to Finnhub. Quotes may be available while the stream connects.");
                using var socket = new ClientWebSocket();
                socket.Options.KeepAliveInterval = TimeSpan.FromSeconds(20);
                socket.Options.KeepAliveTimeout = TimeSpan.FromSeconds(20);
                using (var connectionTimeout = CancellationTokenSource.CreateLinkedTokenSource(token))
                {
                    connectionTimeout.CancelAfter(TimeSpan.FromSeconds(15));
                    await socket.ConnectAsync(new Uri("wss://ws.finnhub.io?token=" + Uri.EscapeDataString(key)), connectionTimeout.Token);
                }
                using var session = CancellationTokenSource.CreateLinkedTokenSource(token);
                var subscriptions = SynchronizeAsync(socket, session);
                try
                {
                    store.SetStatus("connected", "Stream connected. Prices update when trades arrive; timestamps show data age.");
                    var connectedAt = DateTimeOffset.UtcNow;
                    var buffer = new byte[8192];
                    while (socket.State == WebSocketState.Open)
                    {
                        using var message = new MemoryStream();
                        WebSocketReceiveResult part;
                        do
                        {
                            part = await socket.ReceiveAsync(buffer, session.Token);
                            if (part.MessageType == WebSocketMessageType.Close) throw new WebSocketException();
                            if (message.Length + part.Count > 262144) throw new InvalidDataException();
                            message.Write(buffer, 0, part.Count);
                        } while (!part.EndOfMessage);
                        if (part.MessageType != WebSocketMessageType.Text) continue;
                        ApplyMessage(message.ToArray(), store);
                        if (DateTimeOffset.UtcNow - connectedAt > TimeSpan.FromMinutes(1)) delay = 2;
                    }
                }
                finally
                {
                    await session.CancelAsync();
                    try { await subscriptions; } catch (OperationCanceledException) { }
                }
            }
            catch (OperationCanceledException) when (token.IsCancellationRequested) { return; }
            catch (Exception ex) when (ex is WebSocketException or HttpRequestException or JsonException or InvalidDataException or InvalidOperationException or KeyNotFoundException or FormatException or OverflowException or OperationCanceledException)
            {
                // Provider exceptions can contain the credential-bearing URI. Never log their messages.
                logger.LogWarning("Market stream interrupted ({FailureType}).", ex.GetType().Name);
            }
            store.SetStatus("reconnecting", "Stream unavailable. Retrying automatically; check the API key and Finnhub access if this persists.");
            await Task.Delay(TimeSpan.FromSeconds(delay) + TimeSpan.FromMilliseconds(Random.Shared.Next(500)), token);
            delay = Math.Min(delay * 2, 60);
        }
    }
    private async Task SynchronizeAsync(ClientWebSocket socket, CancellationTokenSource session)
    {
        var subscribed = new HashSet<string>(StringComparer.Ordinal);
        try
        {
            while (!session.IsCancellationRequested)
            {
                var desired = store.ActiveSymbols.ToHashSet(StringComparer.Ordinal);
                foreach (var symbol in subscribed.Except(desired).ToArray())
                {
                    await socket.SendAsync(JsonSerializer.SerializeToUtf8Bytes(new { type = "unsubscribe", symbol }), WebSocketMessageType.Text, true, session.Token);
                    subscribed.Remove(symbol);
                }
                foreach (var symbol in desired.Except(subscribed))
                {
                    await socket.SendAsync(JsonSerializer.SerializeToUtf8Bytes(new { type = "subscribe", symbol }), WebSocketMessageType.Text, true, session.Token);
                    subscribed.Add(symbol);
                }
                if (desired.Count == 0) return;
                await Task.Delay(TimeSpan.FromSeconds(1), session.Token);
            }
        }
        finally { await session.CancelAsync(); }
    }
    internal static void ApplyMessage(ReadOnlyMemory<byte> message, MarketStore store)
    {
        using var doc = JsonDocument.Parse(message);
        var root = doc.RootElement;
        if (!root.TryGetProperty("type", out var type)) return;
        if (type.GetString() == "error") throw new InvalidDataException();
        if (type.GetString() != "trade" || !root.TryGetProperty("data", out var data)) return;
        foreach (var trade in data.EnumerateArray())
        {
            store.Trade(trade.GetProperty("s").GetString() ?? "", trade.GetProperty("p").GetDecimal(), trade.GetProperty("t").GetInt64());
        }
    }
    private sealed record QuoteResponse(decimal c, decimal pc, decimal o, decimal h, decimal l, long t);
}

