const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;

test('light cards reveal the background and navigation has a clear highlight', async ({ page, isMobile }, info) => {
  test.setTimeout(150000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => localStorage.setItem('stocklumo.theme', 'light'));
  await page.route('**/api/data/news', route => route.fulfill({ json: { state: 'ok', data: [{ headline: 'Synthetic layout test', summary: 'Test-only article for material verification.', source: 'Test', datetime: 1700000000, url: 'https://example.org/test' }] } }));
  for (const [route, selectors] of [
    ['/', ['.market-pulse', '.tool-grid > a']],
    ['/markets', ['.market-pulse', '.spotlight-stock', '.explore-grid a']],
    ['/stock/AAPL', ['.price-panel', '.company-panel', '.range-card', '.watch-panel']],
    ['/screener', ['.research-controls', '.stock-inspector']],
    ['/portfolio', ['.research-controls', '.empty-state']],
    ['/news', ['.news-item']],
    ['/settings', ['.settings-body']],
    ['/privacy', ['.policy']],
  ]) {
    await page.goto(route); await dismissPrivacy(page);
    for (const selector of selectors) {
      const surface = page.locator(selector).first(); await expect(surface).toBeVisible();
      const material = await surface.evaluate(element => {
        const style = getComputedStyle(element);
        return { fill: style.backgroundColor, image: style.backgroundImage, base: style.getPropertyValue('--glass-base').trim(), rim: style.getPropertyValue('--glass-rim').trim() };
      });
      expect(material.fill).toBe('rgba(0, 0, 0, 0)');
      expect(material.image).toContain('gradient');
      const alpha = parseInt(material.base.slice(-2), 16) / 255;
      expect(alpha).toBeGreaterThan(.45); expect(alpha).toBeLessThan(.6);
      expect(material.rim).toBe('#ffffff');
    }
    if (['/markets', '/stock/AAPL', '/screener'].includes(route)) {
      await page.locator(selectors[0]).scrollIntoViewIfNeeded();
      await page.screenshot({ path: info.outputPath(`light-${route.replaceAll('/', '')}.png`) });
    }
  }
  await page.goto('/markets'); await dismissPrivacy(page);
  if (isMobile) await page.locator('#navigation-toggle').click();
  const link = page.locator('#site-navigation a[href="/watchlist"]');
  const before = await link.boundingBox();
  if (isMobile) await link.focus(); else await link.hover();
  const layer = page.locator('#site-navigation .nav-glide');
  await expect(layer).toHaveCSS('opacity', '1');
  expect(await link.boundingBox()).toEqual(before);
  const alpha = await layer.evaluate(element => {
    const canvas = document.createElement('canvas'), context = canvas.getContext('2d');
    context.fillStyle = getComputedStyle(element).backgroundColor;
    context.fillRect(0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data[3] / 255;
  });
  expect(alpha).toBeGreaterThan(.25); expect(alpha).toBeLessThan(.32);
  expect((await new AxeBuilder({ page }).include('.header').analyze()).violations).toEqual([]);
  await page.locator('.header').screenshot({ path: info.outputPath('light-nav-highlight.png') });
  await page.locator('#theme').click();
  expect(await layer.evaluate(element => getComputedStyle(element).backgroundColor)).toBe('rgb(6, 61, 64)');
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).getPropertyValue('--glass-base').trim())).toBe('#071f35d9');
});

test('feature toolbar reaches both viewport edges without resizing bounded content', async ({ page, isMobile }) => {
  test.setTimeout(150000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of isMobile ? [390] : [2200, 1280, 768]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark']) {
      await page.addInitScript(value => localStorage.setItem('stocklumo.theme', value), theme);
      for (const route of ['/markets', '/watchlist', '/news', '/stock/AAPL', '/screener', '/compare', '/portfolio', '/earnings', '/privacy']) {
        await page.goto(route); await dismissPrivacy(page);
        const geometry = await page.evaluate(() => {
          const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
          const main = document.querySelector('.page'), style = getComputedStyle(main);
          return { viewport: document.documentElement.clientWidth, bar: box('.workspace-toolbar'), main: box('.page'), gutter: parseFloat(style.paddingLeft), form: document.querySelector('#research-controls')?.getBoundingClientRect().toJSON(), overflow: document.documentElement.scrollWidth > innerWidth + 1 };
        });
        expect(geometry.bar.x).toBe(0);
        expect(Math.abs(geometry.bar.width - geometry.viewport)).toBeLessThan(1);
        expect(geometry.overflow).toBe(false);
        if (['/markets', '/watchlist', '/news'].includes(route)) {
          const field = await page.locator('.market-atmosphere').boundingBox();
          expect(Math.abs(field.x)).toBeLessThan(1);
          expect(Math.abs(field.width - geometry.viewport)).toBeLessThan(1);
        }
        if (route === '/stock/AAPL') expect(geometry.main.width).toBe(Math.min(1600, geometry.viewport));
        if (['/screener', '/compare', '/portfolio', '/earnings'].includes(route)) {
          const content = Math.min(route === '/screener' ? 1600 : 1480, geometry.viewport) - 2 * geometry.gutter;
          const formLimit = { '/screener': content, '/compare': 920, '/portfolio': 1120, '/earnings': 1280 }[route];
          expect(Math.abs(geometry.form.width - Math.min(content, formLimit))).toBeLessThan(2);
        }
      }
    }
  }
  await page.goto('/'); await expect(page.locator('.workspace-toolbar')).toBeHidden();
});
