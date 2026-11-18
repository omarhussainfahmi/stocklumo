const AxeBuilder = require('@axe-core/playwright').default;
const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');

const paths = ['/', '/markets', '/watchlist', '/news', '/stock/AAPL', '/screener', '/compare', '/portfolio', '/earnings', '/privacy', '/terms', '/settings', '/not-a-stocklumo-page'];
for (const theme of ['light', 'dark']) {
  for (const path of paths) {
    test(`${theme} ${path}: accessible, contained, titled and error-free`, async ({ page }, testInfo) => {
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
      await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(page.getByRole('link', { name: /Technical Analysis/i })).toHaveCount(0);
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(accessibility.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, explanation: n.failureSummary })) }))).toEqual([]);
      expect(errors).toEqual([]);
      expect(failedAssets).toEqual([]);
      if (process.env.STOCKLUMO_CAPTURE_DIR) {
        const fs = require('node:fs/promises'), filePath = require('node:path');
        await fs.mkdir(process.env.STOCKLUMO_CAPTURE_DIR, { recursive: true });
        await page.screenshot({ path: filePath.join(process.env.STOCKLUMO_CAPTURE_DIR,
          `${testInfo.project.name}-${theme}-${path.replace(/[^a-z0-9]+/gi, '-') || 'home'}.png`), fullPage: true });
      }
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
