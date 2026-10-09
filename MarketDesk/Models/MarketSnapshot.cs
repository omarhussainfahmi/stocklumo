namespace MarketDesk.Models;

public sealed record Stock(string Symbol, string Name, string Sector, decimal? Price = null,
    decimal? PreviousClose = null, decimal? Open = null, decimal? High = null, decimal? Low = null,
    DateTimeOffset? UpdatedAt = null, string Source = "Awaiting data")
{
    public decimal? Change => Price is { } price && PreviousClose is > 0 ? price - PreviousClose : null;
    public decimal? ChangePercent => Change / PreviousClose * 100;
}
public sealed record MarketSnapshot(string Status, string Message, DateTimeOffset ServerTime, Stock[] Stocks);
