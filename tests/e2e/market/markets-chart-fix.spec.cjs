const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
test('Markets discovery wraps below snapshot and sparse chart presents an honest quote', async ({page}, info) => {
  test.setTimeout(90000);
  const errors=[]; page.on('pageerror', error => errors.push(error.message));
  // One genuine fixture observation: repeat fetches must share its timestamp.
  const timestamp=Math.floor(Date.now()/1000);
  await page.route('**/api/data/stock/*/quote',route=>route.fulfill({json:{state:'ok',data:{c:120,pc:118,o:119,h:125,l:115,t:timestamp}}}));
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const theme of ['light','dark']) {
    await page.addInitScript(t=>localStorage.setItem('stocklumo.theme',t),theme);
    await page.goto('/markets'); await dismissPrivacy(page);
    expect(await page.locator('.market-workspace').evaluate(e=>[...e.children].map(child=>child.id))).toEqual(['market-pulse','overview','discover']);
    const pulse=await page.locator('#market-pulse').boundingBox(), discover=await page.locator('#discover').boundingBox();
    expect(discover.y).toBeGreaterThanOrEqual(pulse.y+pulse.height);
    expect(discover.width).toBeCloseTo(pulse.width,0);
    expect(await page.locator('#discover').evaluate(e=>getComputedStyle(e).backgroundImage)).toBe('none');
    await page.locator('#more-stocks').click();
    await expect(page.locator('#explore-grid a')).toHaveCount(40);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
    await page.locator('#discovery-retry').evaluate(e=>e.hidden=false);
    const more=await page.locator('#more-stocks').boundingBox(), retry=await page.locator('#discovery-retry').boundingBox();
    expect(more.y).toBeCloseTo(retry.y,0); expect(more.height).toBe(retry.height);
    await page.locator('#discover').screenshot({path:info.outputPath(`discovery-${theme}.png`)});
    await page.goto('/stock/AAPL');
    await expect(page.locator('#chart')).toHaveAttribute('data-observations','1');
    await expect(page.locator('#single-quote-price')).toContainText('120');
    await expect(page.locator('#chart-single-quote')).toBeVisible();
    await expect(page.locator('#chart-point')).toBeHidden();
    expect(await page.locator('#chart-line').getAttribute('d')).toBe('');
    await page.locator('#chart').focus(); await page.keyboard.press('ArrowRight');
    await expect(page.locator('#chart-value')).toContainText('120');
    await expect(page.locator('#cursor')).toBeHidden();
    await page.locator('.price-panel').screenshot({path:info.outputPath(`single-quote-${theme}.png`)});
  }
  expect(errors).toEqual([]);
});
