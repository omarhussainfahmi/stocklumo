const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');

test('daily stocks replace unavailable candidates on every reload and keep the fixed ticker separate', async ({ page }) => {
  const good = ['AAA','BBB','CCC','DDD','EEE','FFF','GGO','HHI','JJJ'];
  let failFirst = false;
  await page.route('**/api/universe', route => route.fulfill({ json: { state:'ok', count:1000, exchanges:3,
    selection:['BADP','BADQ','FUT',...good.slice(0,5)].map(symbol=>({symbol})),
    candidates:['BADP','BADQ','FUT',...good].map(symbol=>({symbol})) } }));
  await page.route('**/api/data/stock/*/profile', route => {
    const ticker = new URL(route.request().url()).pathname.split('/')[4];
    return route.fulfill({json:ticker === 'BADP' ? {state:'unavailable'} : {state:'ok',data:{ticker,name:`Fixture ${ticker}`,currency:'USD',exchange:'NASDAQ'}}});
  });
  await page.route('**/api/data/stock/*/quote', route => {
    const ticker = new URL(route.request().url()).pathname.split('/')[4];
    return route.fulfill({json:{state:'ok',data:{c:ticker === 'BADQ' || failFirst && ticker === 'AAA' ? 0 : 120,
      pc:100,t:Math.floor(Date.now()/1000)+(ticker === 'FUT' ? 3600 : 0)}}});
  });
  for (const reload of [false, true]) {
    failFirst = reload;
    if (reload) await page.reload(); else await page.goto('/');
    await dismissPrivacy(page);
    await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
    const expected = reload ? good.slice(1,9) : good.slice(0,8);
    await expect.poll(()=>page.locator('#spotlight .spotlight-stock').evaluateAll(nodes=>nodes.map(n=>n.dataset.priceSymbol))).toEqual(expected);
    await expect(page.locator('.pulse-row a')).toHaveText(expected);
    await expect(page.locator('#summary-quotes')).toHaveText('8 / 8');
    await expect(page.locator('#spotlight')).not.toContainText('Unavailable');
    expect(await page.locator('#ticker-stocks .ticker-stock').evaluateAll(nodes=>nodes.map(n=>n.dataset.priceSymbol)))
      .toEqual(['AAPL','MSFT','AMZN','GOOGL','META','TSLA','V','NVDA']);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1)).toBe(true);
  }
});
