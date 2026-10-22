const { test: base, expect } = require('@playwright/test');

// SYNTHETIC TEST DATA ONLY. Intercepted in isolated browser contexts, never
// shipped to the app, rendered in production, or submitted to a market provider.
const symbols = ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'META', 'TSLA', 'JPM'];
const timestamp = () => Math.floor(Date.now() / 1000);
const profile = symbol => ({ ticker: symbol, name: `Fixture ${symbol}`, country: 'US', currency: 'USD', exchange: 'NASDAQ', finnhubIndustry: 'Technology' });
const stock = symbol => ({ symbol, name: `Fixture ${symbol}`, currency: 'USD', price: 120, changePercent: 2, timestamp: timestamp(), industry: 'Technology', marketCapMillions: 1000, averageVolumeMillions: 2, peTtm: 15, dividendYieldTtm: 1, state: 'ok' });
const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/api/**', async route => {
      const url = new URL(route.request().url()), path = url.pathname;
      const symbol = path.split('/')[4] || 'AAPL';
      let json = { state: 'ok', data: [] };
      if (path === '/api/market/stream') {
        await route.fulfill({ contentType: 'text/event-stream', body: `data: ${JSON.stringify({ status: 'connected', message: 'Synthetic browser test', serverTime: new Date().toISOString(), stocks: [] })}\n\n` });
        return;
      }
      if (path === '/api/universe') json = { state: 'ok', count: symbols.length, exchanges: 1, retrievedAt: new Date().toISOString(), selection: symbols.map(symbol => ({ symbol })) };
      else if (path.endsWith('/profile')) json.data = profile(symbol);
      else if (path.endsWith('/quote')) json.data = { c: 120, pc: 118, o: 119, h: 125, l: 115, t: timestamp() };
      else if (path.endsWith('/metrics')) json.data = { metric: { '52WeekHigh': 150, '52WeekLow': 80, peTTM: 15 } };
      else if (path.endsWith('/chart')) json = { state: 'unavailable', message: 'Historical candles unavailable on this test plan.' };
      else if (path === '/api/data/status') json.data = { isOpen: true, session: 'regular', t: timestamp() };
      else if (path === '/api/data/search') json.data = { result: [{ symbol: 'AAPL', description: 'Fixture Apple', type: 'Common Stock' }] };
      else if (path.startsWith('/api/research/stock/')) json = stock(path.split('/').at(-1));
      else if (path === '/api/research/earnings') json.data = { earningsCalendar: [] };
      else if (path === '/api/market') json = { status: 'connected', serverTime: new Date().toISOString(), stocks: [] };
      await route.fulfill({ json });
    });
    await use(page);
  },
});
async function dismissPrivacy(page) {
  const reject = page.getByRole('button', { name: 'Reject analytics', exact: true });
  if (await reject.isVisible()) await reject.click();
}
module.exports = { test, expect, dismissPrivacy };
