const AxeBuilder = require('@axe-core/playwright').default;
const { test, expect, dismissPrivacy } = require('./fixtures.cjs');

const paths = ['/', '/markets', '/watchlist', '/news', '/stock/AAPL', '/screener', '/compare', '/portfolio', '/earnings', '/privacy', '/terms', '/settings', '/not-a-stocklumo-page'];
for (const theme of ['light', 'dark']) {
  for (const path of paths) {
    test(`${theme} ${path}: accessible, contained, titled and error-free`, async ({ page }) => {
      const errors = [], failedAssets = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        if (/\/(css|js|images)\//.test(response.url()) && !response.ok()) failedAssets.push(response.url());
      });
      await page.addInitScript(theme => localStorage.setItem('stocklumo.theme', theme), theme);
      const response = await page.goto(path);
      expect(response.status()).toBe(path.startsWith('/not-') ? 404 : 200);
      await dismissPrivacy(page);
      if (path === '/screener') await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page).toHaveTitle(/.+ \| Stocklumo$/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S.{20,}/);
      await expect(page.locator('main')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(page.getByRole('link', { name: /Technical Analysis/i })).toHaveCount(0);
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(accessibility.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, explanation: n.failureSummary })) }))).toEqual([]);
      expect(errors).toEqual([]);
      expect(failedAssets).toEqual([]);
    });
  }
}

test('local provider setup state never claims live', async ({ page }) => {
  await page.unroute('**/api/**');
  await page.goto('/');
  await dismissPrivacy(page);
  await expect(page.locator('#notice')).toContainText('Connect a Finnhub API key');
  await expect(page.locator('#connection')).not.toHaveText('LIVE');
});
