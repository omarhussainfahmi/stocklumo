using MarketDesk.Models;

namespace MarketDesk.Services;

// Stream admission owns validation; reading a company profile has no state side effect.
public sealed class CompanyRegistration(FinnhubApi api, MarketStore store)
{
    public async Task<ProviderResult?> PrepareAsync(string[] symbols, CancellationToken token)
    {
        foreach (var symbol in symbols.Distinct())
        {
            if (!StockSymbol.IsValid(symbol)) return new("invalid", "Invalid stock symbol.");
            if (store.Contains(symbol)) continue;
            var profile = await api.GetAsync("stock/profile2?symbol=" + Uri.EscapeDataString(symbol), TimeSpan.FromHours(12), token);
            if (profile.State != "ok") return profile;
            if (ResearchService.Text(profile.Data, "ticker") != symbol)
                return new("unavailable", "Company information is unavailable for this symbol.");
            store.Ensure(symbol, ResearchService.Text(profile.Data, "name") ?? symbol,
                ResearchService.Text(profile.Data, "finnhubIndustry") ?? "");
        }
        return null;
    }
}
