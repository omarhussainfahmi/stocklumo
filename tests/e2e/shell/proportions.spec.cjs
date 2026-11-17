const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');

test('quote tiles, shortcuts and notes fit their content without phone overflow', async ({ page, isMobile }, testInfo) => {
  await page.setViewportSize({ width: isMobile ? 320 : 1920, height: 1080 });
  await page.goto('/'); await dismissPrivacy(page);
  await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
  const sizes = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.spotlight-stock')].map(n => n.getBoundingClientRect());
    const first = document.querySelector('.spotlight-stock');
    return { height: cards[0].height, columns: cards.filter(n => Math.abs(n.y - cards[0].y) < 2).length,
      priceRight: first.querySelector('strong').getBoundingClientRect().right,
      cardRight: cards[0].right,
      shortcut: document.querySelector('.explore-grid a').getBoundingClientRect().width,
      overflow: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  expect(sizes.overflow).toBe(false);
  expect(sizes.columns).toBe(isMobile ? 1 : 4);
  expect(sizes.height).toBeLessThan(185);
  expect(sizes.cardRight - sizes.priceRight).toBeLessThan(20);
  expect(sizes.shortcut).toBeLessThanOrEqual(isMobile ? 320 : 240);
  await page.goto('/watchlist');
  await expect(page.locator('#watch-empty')).toBeVisible();
  if (!isMobile) {
    const widths = await page.evaluate(() => ({
      empty: document.querySelector('#watch-empty').getBoundingClientRect().width,
      note: document.querySelector('.notice').getBoundingClientRect().width,
      main: document.querySelector('main').getBoundingClientRect().width
    }));
    expect(widths.empty / widths.main).toBeLessThan(.65);
    expect(widths.note / widths.main).toBeLessThan(.65);
  }
  await page.screenshot({ path: testInfo.outputPath('content-sized-empty-watchlist.png'), fullPage: true });
});

test('news headlines fill their cards and shared rows have aligned endings', async ({ page, isMobile }, testInfo) => {
  await page.setViewportSize({ width: isMobile ? 320 : 1920, height: 1080 });
  const headline = 'Synthetic layout test: companies review product returns, collection networks and regional distribution plans while preparing their next business update';
  await page.route('**/api/data/news', route => route.fulfill({ json: { state: 'ok', data: [
    { headline, source: 'Test publisher', summary: 'Synthetic excerpt for layout verification. '.repeat(12), datetime: 1700000000, url: 'https://example.org/long-layout-test' },
    { headline: 'Short test report', source: 'Test publisher', summary: 'Brief synthetic excerpt.', datetime: 1700000000, url: 'https://example.org/short-layout-test' }
  ] } }));
  await page.goto('/news'); await dismissPrivacy(page);
  await expect(page.locator('.news-item').first().locator('h3')).toHaveText(headline);
  const layout = await page.evaluate(() => {
    const articles = [...document.querySelectorAll('.news-item')];
    const heading = articles[0].querySelector('h3');
    const range = document.createRange(); range.selectNodeContents(heading);
    return { fill: Math.max(...[...range.getClientRects()].map(r => r.width)) / heading.clientWidth,
      heights: articles.map(n => n.getBoundingClientRect().height),
      overflow: document.documentElement.scrollWidth > innerWidth + 1 };
  });
  expect(layout.fill).toBeGreaterThan(.85);
  expect(layout.overflow).toBe(false);
  if(isMobile) expect(layout.heights[1]).toBeLessThan(layout.heights[0]);
  else expect(Math.abs(layout.heights[1]-layout.heights[0])).toBeLessThan(1);
  await page.screenshot({ path: testInfo.outputPath('synthetic-news-proportions.png'), fullPage: true });
});
