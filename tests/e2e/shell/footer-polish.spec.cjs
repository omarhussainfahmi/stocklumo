const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;

test('footer balances its brand, navigation and controls across themes and screen sizes', async ({ page, isMobile }, info) => {
  test.setTimeout(150000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['light', 'dark']) {
    await page.addInitScript(value => localStorage.setItem('stocklumo.theme', value), theme);
    for (const width of isMobile ? [390, 320] : [2200, 1920, 1280, 1024, 1001, 768, 360]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/markets'); await dismissPrivacy(page);
      await page.evaluate(() => document.fonts.ready);
      const footer = page.locator('.footer');
      await footer.scrollIntoViewIfNeeded();
      // Align the footer below the sticky header before auditing touch targets.
      // A tall footer otherwise gets bottom-aligned and its CTA sits under search.
      await footer.evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - document.querySelector('.header').getBoundingClientRect().height - 16, behavior: 'instant' }));
      const layout = await footer.evaluate(element => {
        const box = node => node.getBoundingClientRect().toJSON();
        const nodes = ['.footer-about', '.footer-main nav:first-of-type', '.footer-main nav:last-of-type', '.footer-contact'].map(selector => element.querySelector(selector));
        const range = document.createRange(); range.selectNodeContents(element.querySelector('.footer-signature'));
        return { footer: box(element), inner: box(element.querySelector('.footer-inner')), blocks: nodes.map(box), text: range.getBoundingClientRect().width,
          signature: box(element.querySelector('.footer-signature')), gutter: parseFloat(getComputedStyle(element).paddingLeft), viewport: document.documentElement.clientWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      expect(layout.footer.x).toBe(0);
      expect(layout.footer.width).toBe(layout.viewport);
      expect(layout.overflow).toBe(false);
      expect(Math.abs(layout.inner.x - layout.gutter)).toBeLessThan(1);
      expect(Math.abs(layout.inner.width - (layout.viewport - 2 * layout.gutter))).toBeLessThan(1);
      expect(layout.text).toBeLessThanOrEqual(layout.signature.width + 1);
      for (let a = 0; a < layout.blocks.length; a++) for (let b = a + 1; b < layout.blocks.length; b++) {
        const first = layout.blocks[a], second = layout.blocks[b];
        const overlap = Math.min(first.right, second.right) - Math.max(first.left, second.left) > 1 && Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top) > 1;
        expect(overlap).toBe(false);
      }
      await expect(footer.locator('.footer-signature')).toHaveAttribute('aria-hidden', 'true');
      await expect(footer.getByRole('link', { name: 'Explore markets', exact: true })).toHaveAttribute('href', '/markets');
      await expect(footer.locator('.footer-email')).toHaveAttribute('href', 'mailto:omarhussainfahmi@hotmail.com');
      await expect(footer.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('rel', 'noopener noreferrer');
      if (width <= 600) {
        const targets = footer.locator('nav a, nav button:visible, .footer-email, .contact-button, .footer-invitation a, .footer-bottom a');
        for (const target of await targets.all()) expect((await target.boundingBox()).height).toBeGreaterThanOrEqual(44);
      }
      expect((await new AxeBuilder({ page }).include('.footer').withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()).violations).toEqual([]);
      if (width === 1920 || width === 390) await footer.screenshot({ path: info.outputPath(`footer-${theme}-${width}.png`) });
      const cookie = footer.getByRole('button', { name: 'Cookie settings', exact: true });
      await cookie.click(); await expect(page.locator('#privacy-panel')).toBeVisible();
      await page.keyboard.press('Escape'); await expect(page.locator('#privacy-panel')).toBeHidden(); await expect(cookie).toBeFocused();
      const pause = footer.locator('[data-background-motion]');
      await expect(pause).toBeVisible();
      await expect(pause).toBeDisabled();
      await expect(pause).toHaveText('Background motion off');
      await expect(pause).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await footer.locator('.footer-bottom a').click(); await expect(page).toHaveURL(/#main$/);
    }
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const pause = page.locator('.footer [data-background-motion]');
  await expect(pause).toBeEnabled();
  await pause.click(); const paused = await pause.getAttribute('aria-pressed');
  await pause.click(); expect(await pause.getAttribute('aria-pressed')).not.toBe(paused);
});

test('shared footer retains research navigation and original branding on every layout', async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const route of ['/', '/stock/AAPL', '/screener', '/compare', '/portfolio', '/earnings', '/privacy', '/settings', '/not-a-stocklumo-page']) {
    await page.goto(route); await dismissPrivacy(page);
    const footer = page.locator('.footer');
    await expect(footer).toHaveCount(1);
    await expect(footer.locator('.brand img')).toHaveAttribute('src', /\/images\/stocklumo-mark\.svg/);
    await expect(footer.locator('.footer-phone')).toHaveAttribute('href', 'tel:+966500411051');
    const social = footer.getByRole('navigation', { name: 'Footer social media' });
    await expect(social.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/gorgeous.omar/');
    await expect(social.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/966500411051');
    await expect(social.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(social.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/omar-hussain-fahmi-830b62256');
    await expect(footer.locator('.footer-contact')).not.toContainText('LinkedIn');
    expect(await footer.getByRole('navigation', { name: 'Footer research tools' }).locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')))).toEqual(['/screener', '/compare', '/portfolio', '/earnings']);
    await expect(footer).toContainText('Coverage and delays vary. For information only, not investment advice.');
  }
  await page.locator('.footer').getByRole('navigation', { name: 'Footer research tools' }).getByRole('link', { name: 'Compare stocks', exact: true }).click();
  await expect(page).toHaveURL(/\/compare$/);
});
