using System.Text.RegularExpressions;

namespace MarketDesk.Models;

public static partial class StockSymbol
{
    public static bool IsValid(string? symbol) => symbol is not null && Pattern().IsMatch(symbol);
    [GeneratedRegex(@"\A[A-Z][A-Z0-9.-]{0,14}\z", RegexOptions.CultureInvariant)]
    private static partial Regex Pattern();
}
