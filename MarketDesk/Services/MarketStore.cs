using MarketDesk.Models;

namespace MarketDesk.Services;

public sealed class MarketStore
{
    private readonly object gate = new();
    private readonly Dictionary<string, Stock> stocks = new[] {
        new Stock("AAPL", "Apple", "Technology"),
        new Stock("MSFT", "Microsoft", "Technology"),
        new Stock("NVDA", "NVIDIA", "Semiconductors"),
        new Stock("AMZN", "Amazon", "Consumer discretionary"),
        new Stock("GOOGL", "Alphabet", "Communication services"),
        new Stock("TSLA", "Tesla", "Automotive"),
        new Stock("JPM", "JPMorgan Chase", "Financials"),
        new Stock("V", "Visa", "Payments")
    }.ToDictionary(s => s.Symbol, StringComparer.Ordinal);
    private string status = "setup";
    private readonly Dictionary<string, int> viewers = new(StringComparer.Ordinal);
    public string[] ActiveSymbols { get { lock (gate) return viewers.Keys.ToArray(); } }
    public void Ensure(string symbol, string name, string sector)
    {
        if (!StockSymbol.IsValid(symbol)) return;
        lock (gate)
        {
            if (stocks.Count >= 256 && !stocks.ContainsKey(symbol))
            {
                var unused = stocks.Keys.FirstOrDefault(s => !viewers.ContainsKey(s));
                if (unused is null) return;
                stocks.Remove(unused);
            }
            if (stocks.TryGetValue(symbol, out var existing)) stocks[symbol] = existing with { Name = name, Sector = sector };
            else stocks[symbol] = new Stock(symbol, name, sector);
        }
    }
    public IDisposable? Subscribe(string[] symbols)
    {
        lock (gate)
        {
            if (symbols.Any(s => !stocks.ContainsKey(s)) || viewers.Keys.Union(symbols).Count() > 40) return null;
            foreach (var symbol in symbols.Distinct()) viewers[symbol] = viewers.GetValueOrDefault(symbol) + 1;
            return new Subscription(this, symbols.Distinct().ToArray());
        }
    }
    private sealed class Subscription(MarketStore store, string[] symbols) : IDisposable
    {
        private int disposed;
        public void Dispose()
        {
            if (Interlocked.Exchange(ref disposed, 1) != 0) return;
            lock (store.gate) foreach (var symbol in symbols)
            {
                if (--store.viewers[symbol] == 0) store.viewers.Remove(symbol);
            }
        }
    }
    private string message = "Connect your Finnhub API key to receive market data.";
    public string[] Symbols { get { lock (gate) return stocks.Keys.ToArray(); } }
    public MarketSnapshot Snapshot() { lock (gate) return new(status, message, DateTimeOffset.UtcNow, stocks.Values.ToArray()); }
    public void SetStatus(string value, string detail) { lock (gate) { status = value; message = detail; } }
    public void Quote(string symbol, decimal price, decimal previous, decimal open, decimal high, decimal low, long timestamp)
    {
        if (price <= 0 || timestamp <= 0 || timestamp > 253402300799) return;
        lock (gate)
        {
            if (!stocks.TryGetValue(symbol, out var old)) return;
            var time = DateTimeOffset.FromUnixTimeSeconds(timestamp);
            var newer = old.UpdatedAt is null || time >= old.UpdatedAt;
            stocks[symbol] = old with
            {
                Price = newer ? price : old.Price,
                PreviousClose = previous > 0 ? previous : null,
                Open = open > 0 ? open : null,
                High = high > 0 ? high : null,
                Low = low > 0 ? low : null,
                UpdatedAt = newer ? time : old.UpdatedAt,
                Source = newer ? "Quote" : old.Source
            };
        }
    }
    public void Trade(string symbol, decimal price, long timestamp)
    {
        if (price <= 0 || timestamp <= 0 || timestamp > 253402300799999) return;
        lock (gate)
        {
            if (!stocks.TryGetValue(symbol, out var old)) return;
            var time = DateTimeOffset.FromUnixTimeMilliseconds(timestamp);
            if (old.UpdatedAt > time) return;
            stocks[symbol] = old with { Price = price, UpdatedAt = time, Source = "Trade" };
        }
    }
}
