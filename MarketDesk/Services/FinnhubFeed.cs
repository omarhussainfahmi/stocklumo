using System.Net.WebSockets;
using System.Text.Json;

namespace MarketDesk.Services;

public sealed class FinnhubFeed(MarketStore store, FinnhubApi api, IConfiguration configuration,
    ILogger<FinnhubFeed> logger, MarketSocketFactory? sockets = null, TimeProvider? time = null) : BackgroundService
{
    private readonly MarketSocketFactory connections = sockets ?? new MarketSocketFactory();
    private readonly TimeProvider clock = time ?? TimeProvider.System;

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
                if (result.Data is not { } data)
                {
                    if (store.UpdateQuoteState(symbol, result.State))
                        logger.LogWarning("Quote refresh failed for {Symbol} ({State}).", symbol, result.State);
                    continue;
                }
                try
                {
                    var quote = data.Deserialize<QuoteResponse>();
                    if (quote is not null && quote.c > 0 && quote.t > 0 && quote.t <= DateTimeOffset.UtcNow.AddMinutes(1).ToUnixTimeSeconds())
                        store.ApplyQuote(symbol, quote.c, quote.pc, quote.o, quote.h, quote.l, DateTimeOffset.FromUnixTimeSeconds(quote.t));
                    else store.UpdateQuoteState(symbol, "unavailable");
                }
                catch (JsonException) { store.UpdateQuoteState(symbol, "error"); logger.LogWarning("Invalid quote payload."); }
            }
            await Task.Delay(TimeSpan.FromSeconds(5), clock, token);
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
                await Task.Delay(TimeSpan.FromSeconds(1), clock, token);
                continue;
            }
            var failureState = "disconnected";
            try
            {
                store.SetStatus("connecting", "Connecting to Finnhub. Quotes may be available while the stream connects.");
                using var socket = await connections.OpenAsync(key, token);
                using var session = CancellationTokenSource.CreateLinkedTokenSource(token);
                var subscriptions = SynchronizeAsync(socket, session);
                try
                {
                    store.SetStatus("connected", "Upstream socket connected. Waiting for qualifying market data; connection health does not establish quote freshness.");
                    var connectedAt = clock.GetUtcNow();
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
                        if (clock.GetUtcNow() - connectedAt > TimeSpan.FromMinutes(1)) delay = 2;
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
                if (ex is InvalidDataException or JsonException) failureState = "error";
                logger.LogWarning("Market stream interrupted ({FailureType}).", ex.GetType().Name);
            }
            finally { store.SubscriptionCount(0); }
            store.SetStatus(failureState, "Stream unavailable. Retrying automatically; check the API key and Finnhub access if this persists.");
            await Task.Delay(TimeSpan.FromSeconds(delay) + TimeSpan.FromMilliseconds(Random.Shared.Next(500)), clock, token);
            delay = Math.Min(delay * 2, 60);
        }
    }
    internal async Task SynchronizeAsync(WebSocket socket, CancellationTokenSource session)
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
                store.SubscriptionCount(subscribed.Count);
                if (desired.Count == 0) return;
                await Task.Delay(TimeSpan.FromSeconds(1), clock, session.Token);
            }
        }
        finally { await session.CancelAsync(); }
    }
    internal static void ApplyMessage(ReadOnlyMemory<byte> message, MarketStore store)
    {
        using var doc = JsonDocument.Parse(message);
        var root = doc.RootElement;
        if (root.ValueKind != JsonValueKind.Object || !root.TryGetProperty("type", out var type) || type.ValueKind != JsonValueKind.String) return;
        store.ProviderMessage();
        if (type.GetString() == "error") throw new InvalidDataException();
        if (type.GetString() != "trade" || !root.TryGetProperty("data", out var data) || data.ValueKind != JsonValueKind.Array) return;
        foreach (var trade in data.EnumerateArray())
        {
            // A malformed entry must not discard later valid trades in the same batch.
            if (trade.ValueKind != JsonValueKind.Object ||
                !trade.TryGetProperty("s", out var symbol) || symbol.ValueKind != JsonValueKind.String ||
                !trade.TryGetProperty("p", out var price) || price.ValueKind != JsonValueKind.Number || !price.TryGetDecimal(out var value) ||
                !trade.TryGetProperty("t", out var time) || time.ValueKind != JsonValueKind.Number || !time.TryGetInt64(out var timestamp)) continue;
            if (timestamp <= 0 || timestamp > DateTimeOffset.UtcNow.AddMinutes(1).ToUnixTimeMilliseconds()) continue;
            store.ApplyTrade(symbol.GetString() ?? "", value, DateTimeOffset.FromUnixTimeMilliseconds(timestamp));
        }
    }

    private sealed record QuoteResponse(decimal c, decimal pc, decimal o, decimal h, decimal l, long t);
}

