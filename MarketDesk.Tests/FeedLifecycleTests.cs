using System.Net;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Channels;
using MarketDesk.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;

namespace MarketDesk.Tests;

public sealed class FeedLifecycleTests
{
    private sealed class Clock : TimeProvider
    {
        private readonly object gate = new();
        private DateTimeOffset now = DateTimeOffset.UtcNow;
        private readonly List<Timer> timers = [];
        public override DateTimeOffset GetUtcNow() { lock (gate) return now; }
        public override ITimer CreateTimer(TimerCallback callback, object? state, TimeSpan dueTime, TimeSpan period)
        {
            var timer = new Timer(this, callback, state);
            lock (gate) timers.Add(timer);
            timer.Change(dueTime, period);
            return timer;
        }
        public bool HasRetry { get { lock (gate) return timers.Any(t => t.Due is { } due && due - now < TimeSpan.FromSeconds(3)); } }
        public void Advance(int seconds)
        {
            Timer[] ready;
            lock (gate) { now = now.AddSeconds(seconds); ready = timers.Where(t => t.Due <= now).ToArray(); foreach (var t in ready) t.Due = null; }
            foreach (var timer in ready) timer.Fire();
        }
        private sealed class Timer(Clock clock, TimerCallback callback, object? state) : ITimer
        {
            public DateTimeOffset? Due;
            public bool Change(TimeSpan dueTime, TimeSpan period)
            {
                if (period != Timeout.InfiniteTimeSpan) throw new NotSupportedException("These tests use one-shot delays.");
                lock (clock.gate) Due = dueTime == Timeout.InfiniteTimeSpan ? null : clock.now + dueTime;
                return true;
            }
            public void Fire() => callback(state);
            public void Dispose() { lock (clock.gate) { Due = null; clock.timers.Remove(this); } }
            public ValueTask DisposeAsync() { Dispose(); return ValueTask.CompletedTask; }
        }
    }
    private sealed class Socket : WebSocket
    {
        public Channel<(byte[] Bytes, WebSocketMessageType Type, bool End)> Incoming = Channel.CreateUnbounded<(byte[], WebSocketMessageType, bool)>();
        public Channel<string> Sent = Channel.CreateUnbounded<string>();
        public bool Disposed;
        public override WebSocketCloseStatus? CloseStatus => null;
        public override string? CloseStatusDescription => null;
        public override string? SubProtocol => null;
        public override WebSocketState State => Disposed ? WebSocketState.Closed : WebSocketState.Open;
        public override void Abort() => Dispose();
        public override void Dispose() => Disposed = true;
        public override Task CloseAsync(WebSocketCloseStatus status, string? description, CancellationToken token) => Task.CompletedTask;
        public override Task CloseOutputAsync(WebSocketCloseStatus status, string? description, CancellationToken token) => Task.CompletedTask;
        public override async Task<WebSocketReceiveResult> ReceiveAsync(ArraySegment<byte> buffer, CancellationToken token)
        {
            var part = await Incoming.Reader.ReadAsync(token);
            part.Bytes.CopyTo(buffer.AsSpan());
            return new(part.Bytes.Length, part.Type, part.End);
        }
        public override Task SendAsync(ArraySegment<byte> buffer, WebSocketMessageType type, bool end, CancellationToken token)
        { Sent.Writer.TryWrite(Encoding.UTF8.GetString(buffer)); return Task.CompletedTask; }
    }
    private sealed class Sockets(params Socket[] sockets) : MarketSocketFactory
    {
        private int index;
        public override Task<WebSocket> OpenAsync(string key, CancellationToken token) => Task.FromResult<WebSocket>(sockets[Interlocked.Increment(ref index) - 1]);
    }
    private sealed class Quotes : HttpMessageHandler, IHttpClientFactory
    {
        public int Calls;
        public HttpClient CreateClient(string name) => new(this, false) { BaseAddress = new("https://finnhub.io/api/v1/") };
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken token) =>
            Task.FromResult(++Calls == 1 ? new HttpResponseMessage(HttpStatusCode.ServiceUnavailable) :
                new(HttpStatusCode.OK) { Content = new StringContent("{\"c\":12,\"pc\":10,\"t\":1700000000}") });
    }
    private static async Task Until(Func<bool> condition)
    {
        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(5));
        while (!condition()) await Task.Delay(1, timeout.Token);
    }

    [Fact]
    public async Task HostedFeedReassemblesTradesReconnectsRecoversQuotesAndStopsCleanly()
    {
        var clock = new Clock(); var store = new MarketStore(); using var lease = store.Subscribe(["AAPL"]);
        using var first = new Socket(); using var second = new Socket(); using var quotes = new Quotes();
        var config = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?> { ["Finnhub:ApiKey"] = "dummy" }).Build();
        using var api = new FinnhubApi(quotes, config, clock);
        using var feed = new FinnhubFeed(store, api, config, NullLogger<FinnhubFeed>.Instance, new Sockets(first, second), clock);
        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(10));
        await feed.StartAsync(timeout.Token);
        Assert.Contains("AAPL", await first.Sent.Reader.ReadAsync(timeout.Token));
        await Until(() => store.Snapshot().Stocks[0].QuoteState == "error");
        first.Incoming.Writer.TryWrite((Encoding.UTF8.GetBytes("{\"type\":\"trade\",\"data\":[{\"s\":\"AAPL\",\"p\":25,"), WebSocketMessageType.Text, false));
        first.Incoming.Writer.TryWrite((Encoding.UTF8.GetBytes("\"t\":1700000001000}]}"), WebSocketMessageType.Text, true));
        await Until(() => store.Snapshot().Stocks[0].Price == 25);
        first.Incoming.Writer.TryWrite(([], WebSocketMessageType.Close, true));
        await Until(() => first.Disposed && clock.HasRetry);
        clock.Advance(3);
        Assert.Contains("AAPL", await second.Sent.Reader.ReadAsync(timeout.Token));
        clock.Advance(31);
        await Until(() => quotes.Calls >= 2 && store.Snapshot().Stocks[0].QuoteState == "ok");
        Assert.Equal(25, store.Snapshot().Stocks[0].Price); // Older recovery quote cannot replace the trade.
        await feed.StopAsync(timeout.Token);
        Assert.True(second.Disposed);
        Assert.Equal(0, store.Snapshot().SubscriptionCount);
        Assert.True(feed.ExecuteTask!.IsCompleted);
    }
}
