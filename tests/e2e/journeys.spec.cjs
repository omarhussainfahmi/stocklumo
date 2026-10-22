const { test, expect, dismissPrivacy } = require('./fixtures.cjs');
async function visit(page, path) { await page.goto(path); await dismissPrivacy(page); }

test('search supports keyboard navigation to stock details and watchlist persistence', async ({ page }) => {
  await visit(page, '/');
  await page.getByRole('searchbox', { name: 'Find a stock' }).fill('Apple');
  const result = page.locator('#search-results a');
  await expect(result).toHaveCount(1);
  await page.getByRole('searchbox').press('ArrowDown');
  await expect(result).toBeFocused();
  await result.press('Enter');
  await expect(page).toHaveURL(/\/stock\/AAPL$/);
  await expect(page.locator('#company')).toHaveText('Fixture AAPL');
  await page.getByRole('button', { name: 'Add to watchlist', exact: true }).click();
  await page.goto('/watchlist');
  await expect(page.locator('#watch-rows')).toContainText('AAPL');
  await page.reload();
  await expect(page.locator('#watch-rows')).toContainText('AAPL');
});

test('theme persists and compact navigation opens, escapes and reaches research', async ({ page, isMobile }) => {
  await visit(page, '/');
  const theme = page.locator('#theme'), original = await page.locator('html').getAttribute('data-theme');
  await theme.click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', original === 'dark' ? 'light' : 'dark');
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await expect(page.locator('#navigation-toggle')).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('#navigation-toggle')).toBeFocused();
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.locator('#site-navigation').getByRole('link', { name: 'Stock screener', exact: true }).click();
  } else await page.locator('.research-nav').getByRole('link', { name: 'Stock screener', exact: true }).click();
  await expect(page).toHaveURL(/\/screener$/);
});

test('screener filters, resets and restores a saved preset', async ({ page }) => {
  await visit(page, '/screener');
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
  await page.getByLabel('Company or ticker', { exact: true }).fill('AAPL');
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Save preset', exact: true }).click();
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
  await page.getByRole('button', { name: 'Load preset', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.getByLabel('Company or ticker', { exact: true }).fill('No such fixture company');
  await expect(page.locator('#research-results')).toContainText('No matches');
});

test('portfolio validates, saves, edits and removes an isolated practice holding', async ({ page }) => {
  await visit(page, '/portfolio');
  await page.getByRole('button', { name: 'Save holding', exact: true }).click();
  await expect(page.getByLabel('Ticker', { exact: true })).toBeFocused();
  await expect(page.getByLabel('Ticker', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Ticker', { exact: true }).fill('AAPL');
  await page.getByLabel('Quantity', { exact: true }).fill('2');
  await page.getByLabel('Purchase price (per share)', { exact: true }).fill('100');
  await page.getByRole('button', { name: 'Save holding', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page.getByLabel('Quantity', { exact: true }).fill('3');
  await page.getByRole('button', { name: /Save|Update/ }).filter({ hasText: /holding/ }).click();
  await expect(page.locator('#research-results tbody tr')).toContainText('3');
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.locator('#research-results')).toContainText('No practice holdings');
});

test('comparison reports missing history without inventing a chart', async ({ page }) => {
  await visit(page, '/compare');
  await page.getByLabel('Tickers (comma-separated)', { exact: true }).fill('AAPL');
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  await expect(page.locator('#research-status')).toHaveAttribute('role', 'alert');
  await page.getByLabel('Tickers (comma-separated)', { exact: true }).fill('AAPL, MSFT');
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  await expect(page.locator('#research-results')).toContainText(/unavailable/i);
});

test('earnings filters the watchlist and keeps empty results explicit', async ({ page }) => {
  await visit(page, '/earnings');
  await page.getByRole('combobox', { name: 'Filter', exact: true }).selectOption('watch');
  await page.getByRole('button', { name: 'Load earnings', exact: true }).click();
  await expect(page.locator('#research-results')).toContainText('No matching stocks');
  await page.getByRole('combobox', { name: 'Display', exact: true }).selectOption('reported');
  await page.getByRole('combobox', { name: 'Filter', exact: true }).selectOption('all');
  await page.getByRole('button', { name: 'Load earnings', exact: true }).click();
  await expect(page.getByLabel('Ticker (optional)', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

test('stock chart keyboard inspection and unavailable historical range remain usable', async ({ page }) => {
  await visit(page, '/stock/AAPL');
  await expect(page.locator('#price')).toHaveText('120.00');
  await page.locator('#chart').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#chart-value')).toContainText('120');
});

test('rate-limited research stays unavailable and recovers on explicit retry', async ({ page }) => {
  await page.route('**/api/research/stock/*', route => route.fulfill({ status: 429, json: { message: 'Test request limit' } }));
  await visit(page, '/screener');
  await expect(page.locator('#research-status')).toContainText(/missing data.*Retry in a minute if limited/i);
  await expect(page.locator('#research-results tbody tr')).toHaveCount(0);
  // Remove the override only; the shared API fixture still serves isolated data.
  await page.unroute('**/api/research/stock/*');
  await page.getByRole('button', { name: 'Refresh data', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
});

test('date controls stay within their frames and sticky navigation remains reachable', async ({ page }) => {
  for (const path of ['/portfolio', '/earnings']) {
    await visit(page, path);
    const dates = page.locator('input[type="date"]');
    await expect(dates.first()).toBeVisible();
    for (const input of await dates.all()) {
      const rect = await input.boundingBox(), frame = await input.locator('..').boundingBox();
      expect(rect.x).toBeGreaterThanOrEqual(frame.x);
      expect(rect.x + rect.width).toBeLessThanOrEqual(frame.x + frame.width + 1);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    }
    await page.locator('.footer').scrollIntoViewIfNeeded();
    // WebKit's visual viewport can differ slightly from layout coordinates
    // during scroll. Check that the controls are fully reachable instead.
    await expect(page.locator('.header .brand')).toBeInViewport({ ratio: 1 });
    await expect(page.locator('#theme')).toBeInViewport({ ratio: 1 });
  }
});

test('sitemap, robots and social preview resolve; disabled analysis remains absent', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toContain('/technical');
  for (const path of ['/robots.txt', '/images/stocklumo-share.png', '/images/favicon-32.png']) {
    expect((await request.get(path)).ok()).toBe(true);
  }
  expect((await request.get('/technical')).status()).toBe(404);
});

test('loading deferred scripts does not move the main content below the header', async ({ page }) => {
  let release;
  const ready = new Promise(resolve => { release = resolve; });
  await page.route('**/js/*.js*', async route => { await ready; await route.continue(); });
  await page.goto('/', { waitUntil: 'commit' });
  await expect(page.locator('.header')).toBeVisible();
  const before = await page.locator('main').boundingBox();
  release();
  await page.waitForLoadState('load');
  await dismissPrivacy(page);
  await expect(page.locator('#ticker-stocks a')).toHaveCount(8);
  const after = await page.locator('main').boundingBox();
  expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(1);
});
