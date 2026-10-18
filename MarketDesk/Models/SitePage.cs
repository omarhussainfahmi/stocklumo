namespace MarketDesk.Models;

public sealed record SitePage(string Title, string Description, string Path, bool NoIndex = false)
{
    // Canonicals never use an untrusted Host header or a visitor's query string.
    public const string Origin = "https://stocklumo.onrender.com";
    public static readonly string[] PublicPaths = ["/", "/markets", "/news", "/screener", "/compare", "/earnings", "/privacy", "/terms"];
    public static SitePage ForPath(string path, int status = 200) => status >= 400
        ? new("Page unavailable", "Find your way back to Stocklumo's market dashboard.", path, true)
        : path switch
        {
            "/" => new("Stock dashboard", "Track stock prices, explore companies and follow your watchlist with Stocklumo, your personal market desk.", path),
            "/markets" => new("Markets", "Explore US companies, selected stock quotes and market news. Check each quote's timestamp and data availability.", path),
            "/watchlist" => new("Your watchlist", "Follow your saved stocks and their latest available prices. Your watchlist stays in this browser.", path, true),
            "/news" => new("Market news", "Read financial headlines from their original publishers and discover company news through Stocklumo.", path),
            "/screener" => new("Stock screener", "Filter selected US companies by price, daily change, industry and available fundamentals. Inspect matching stocks side by side.", path),
            "/compare" => new("Compare stocks", "Compare two to five stocks using available quotes and fundamentals, with clearly labeled units and provider limitations.", path),
            "/portfolio" => new("Virtual portfolio", "Record hypothetical holdings and track their value and unrealized profit or loss using actual quotes. No real trades.", path, true),
            "/earnings" => new("Earnings calendar", "Explore upcoming earnings, EPS estimates and reported results. Announcement dates and fiscal periods are labeled separately.", path),
            "/privacy" => new("Privacy policy", "How Stocklumo uses browser storage, market-data providers and optional analytics, and how to manage your choices.", path),
            "/terms" => new("Terms of use", "Understand Stocklumo's informational purpose, market-data limitations and practice-only virtual portfolio.", path),
            "/settings" => new("Privacy & backups", "Manage optional analytics and download or restore your Stocklumo browser data.", path, true),
            _ when path.StartsWith("/stock/", StringComparison.Ordinal) && StockSymbol.IsValid(path[7..]) =>
                new(path[7..] + " stock price & company", "Explore " + path[7..] + " quotes, available price charts, company fundamentals and publisher news on Stocklumo.", path),
            _ => new("Page unavailable", "Return to the Stocklumo stock dashboard.", path, true)
        };
}
