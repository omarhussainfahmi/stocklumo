const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');

test('research navigation and background fill the screen while middle content keeps its bounds', async ({ page, isMobile }, testInfo) => {
  for (const theme of ['light', 'dark']) {
    await page.addInitScript(theme => localStorage.setItem('stocklumo.theme', theme), theme);
    for (const width of isMobile ? [390] : [1920, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      for (const path of ['/screener', '/compare', '/portfolio', '/earnings']) {
        await page.goto(path); await dismissPrivacy(page);
        await expect(page.locator('#research-controls')).toBeVisible();
        const geometry = await page.evaluate(() => {
          const box = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
          return { viewport: document.documentElement.clientWidth,
            gutter: parseFloat(getComputedStyle(document.querySelector('.page')).paddingLeft),
            toolbar: box('.workspace-toolbar'), field: box('.market-atmosphere'),
            research: box('#research'), controls: box('#research-controls'),
            overflow: document.documentElement.scrollWidth > innerWidth + 1 };
        });
        // Same middle dimensions as the approved bounded layout, independently
        // of the now full-width navigation/background shell.
        const limit = path === '/screener' ? 1600 : 1480;
        const contentWidth = Math.min(geometry.viewport, limit) - 2 * geometry.gutter;
        expect(Math.abs(geometry.research.width - contentWidth)).toBeLessThan(2);
        expect(Math.abs(geometry.research.x - (geometry.viewport - contentWidth) / 2)).toBeLessThan(2);
        const formLimit = { '/screener': contentWidth, '/compare': 920, '/portfolio': 1120, '/earnings': 1280 }[path];
        expect(Math.abs(geometry.controls.width - Math.min(contentWidth, formLimit))).toBeLessThan(2);
        // November 4: the owner approved a full-bleed toolbar surface matching
        // header/ticker; its links retain gutter padding within that surface.
        expect(Math.abs(geometry.toolbar.x)).toBeLessThan(2);
        expect(Math.abs(geometry.toolbar.width - geometry.viewport)).toBeLessThan(2);
        expect(Math.abs(geometry.field.x)).toBeLessThan(1);
        expect(Math.abs(geometry.field.width - geometry.viewport)).toBeLessThan(1);
        expect(geometry.overflow).toBe(false);
        if (width === 1920) await page.screenshot({ path: testInfo.outputPath(`${path.slice(1)}-${theme}.png`) });
      }
    }
  }
});
