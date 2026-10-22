const { test, expect, dismissPrivacy } = require('./fixtures.cjs');

for (const theme of ['dark', 'light']) {
  test(`observatory ${theme}: header search, company context and chart retain usable geometry`, async ({ page, isMobile }, testInfo) => {
    if (!isMobile) await page.setViewportSize({ width: 1487, height: 1058 });
    await page.addInitScript(theme => localStorage.setItem('stocklumo.theme', theme), theme);
    await page.goto('/stock/AAPL');
    await dismissPrivacy(page);
    await expect(page.locator('#company')).toHaveText('Fixture AAPL');
    await expect(page.locator('#price')).toHaveText('120.00');
    await expect(page.locator('#search')).toHaveCount(1);
    await expect(page.locator('.header #search')).toBeVisible();
    await expect(page.locator('#watch-section')).toHaveCount(1);
    await expect(page.locator('.brand img').first()).toHaveAttribute('src', /\/images\/stocklumo-mark\.svg/);
    await expect(page.locator('#company-mark')).toHaveAttribute('src', /\/images\/icons\/apple\.svg$/);
    await expect.poll(() => page.locator('#company-mark').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(page.locator('#chart-status')).toContainText('History unavailable');
    await expect(page.locator('[data-range]:visible')).toHaveCount(1);
    await expect(page.locator('.range-card svg')).toHaveCount(2);
    await page.getByRole('button', { name: 'Add to watchlist', exact: true }).click();
    await expect(page.locator('.stock-context #watch-rows')).toContainText('AAPL');
    const geometry = await page.evaluate(async () => {
      await document.fonts.ready;
      const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
      return { main: box('main'), chart: box('.price-panel'), watch: box('#watch-section'), profile: box('.company-panel'),
        contained: document.documentElement.scrollWidth <= innerWidth + 1,
        fontLoaded: [...document.fonts].some(font => font.family.includes('Manrope') && font.status === 'loaded') };
    });
    expect(geometry.contained).toBe(true);
    expect(geometry.fontLoaded).toBe(true);
    expect(geometry.chart.width / geometry.main.width).toBeGreaterThan(0.85);
    if (isMobile) expect(geometry.profile.y).toBeGreaterThan(geometry.watch.y);
    else {
      expect(Math.abs(geometry.profile.y - geometry.watch.y)).toBeLessThan(2);
      expect(geometry.chart.y).toBeLessThan(450);
    }
    const screenshot = testInfo.outputPath(`observatory-${theme}.png`);
    await page.screenshot({ path: screenshot, fullPage: false });
    await testInfo.attach('Synthetic fixture layout preview', { path: screenshot, contentType: 'image/png' });
  });
}
