const AxeBuilder = require('@axe-core/playwright').default;
const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');

test('research data dialog isolates the note without shifting or changing the editor', async ({ page }, info) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const theme of ['light', 'dark']) {
    for (const route of ['/screener', '/compare', '/portfolio', '/earnings']) {
      await page.goto(route);
      await dismissPrivacy(page);
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#theme').click();
      const dialog = page.getByRole('dialog', { name: 'About this data', exact: true });
      const trigger = page.getByRole('button', { name: 'About this data', exact: true });
      const close = page.locator('#research-data-close');
      const note = page.locator('#research-notes');
      await expect(note).not.toHaveText('');
      await trigger.scrollIntoViewIfNeeded();
      const geometry = () => page.evaluate(() => ({
        scroll: scrollY,
        boxes: ['.research-heading', '#research-title', '#research-data-open', '#research-controls', '#research-results'].map(selector => {
          const r = document.querySelector(selector).getBoundingClientRect();
          return [r.x + scrollX, r.y + scrollY, r.width, r.height];
        }),
      }));
      const before = await geometry();
      const values = () => page.locator('#research-controls input, #research-controls select').evaluateAll(fields => fields.map(field => field.value));
      const beforeValues = await values();
      await trigger.click();
      await expect(dialog).toBeVisible();
      await expect(note).toBeVisible();
      expect(await dialog.evaluate(element => element.matches(':modal'))).toBe(true);
      await expect(close).toBeFocused();
      expect(await geometry()).toEqual(before);
      const box = await dialog.boundingBox();
      const viewport = page.viewportSize();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
      expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
      expect((await new AxeBuilder({ page }).include('#research-data-dialog').analyze()).violations).toEqual([]);
      if (route === '/portfolio') await page.screenshot({ path: info.outputPath(`notes-${theme}.png`) });
      // Native modal isolation blocks focus entering the background editor.
      await page.locator('#research-controls input').first().evaluate(input => input.focus());
      await expect(close).toBeFocused();
      if (info.project.name === 'iphone-webkit') {
        // Mobile WebKit has no Playwright mouse-wheel API. Verify its backdrop
        // touch handler cancels a cancelable movement; physical swipes are separate.
        expect(await page.evaluate(() => {
          const event = new Event('touchmove', { bubbles: true, cancelable: true });
          Object.defineProperty(event, 'touches', { value: [{ clientX: 5, clientY: innerHeight - 5 }] });
          return document.dispatchEvent(event);
        })).toBe(false);
      } else {
        await page.mouse.move(5, viewport.height - 5);
        await page.mouse.wheel(0, 300);
      }
      expect(await geometry()).toEqual(before);
      await close.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      expect(await geometry()).toEqual(before);
      await trigger.press('Enter');
      await expect(note).toBeVisible();
      await close.click();
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      expect(await values()).toEqual(beforeValues);
    }
  }
  await noteLongContent(page);
});

async function noteLongContent(page) {
  // Test-only long copy must stay in a bounded, scrollable reading surface.
  await page.locator('#research-notes').evaluate(note => { note.textContent = note.textContent.repeat(30); });
  await page.locator('#research-data-open').click();
  const dialog = page.locator('#research-data-dialog');
  expect(await dialog.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
  const box = await dialog.boundingBox(), viewport = page.viewportSize();
  expect(box.y).toBeGreaterThanOrEqual(0);
  expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  await page.keyboard.press('Escape');
}
