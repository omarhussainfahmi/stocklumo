const {test, expect, dismissPrivacy} = require('./fixtures.cjs');

for (const theme of ['dark','light']) {
  test(`screener ${theme}: ranking and sticky inspector end on the same grid boundary`, async ({page,isMobile},testInfo) => {
    await page.addInitScript(theme=>localStorage.setItem('stocklumo.theme',theme),theme);
    for (const width of isMobile ? [390] : [1920,1280]) {
      if (!isMobile) await page.setViewportSize({width,height:900});
      await page.goto('/screener'); await dismissPrivacy(page);
      await expect(page.locator('.screener-list tbody tr')).toHaveCount(12);
      await page.getByText('Day-change ranking',{exact:true}).click();
      await page.locator('.screener-workspace').evaluate(async element=>{
        await document.fonts.ready;
        window.scrollTo(0,element.getBoundingClientRect().bottom+scrollY-innerHeight+24);
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      });
      const boxes = await page.evaluate(()=>({
        chart:document.querySelector('.ranking-details > figure').getBoundingClientRect().toJSON(),
        inspector:document.querySelector('.stock-inspector').getBoundingClientRect().toJSON(),
        contained:document.documentElement.scrollWidth<=innerWidth+1
      }));
      expect(boxes.contained).toBe(true);
      if (!isMobile) expect(Math.abs(boxes.chart.bottom-boxes.inspector.bottom)).toBeLessThanOrEqual(2);
      else expect(boxes.inspector.y).toBeGreaterThan(boxes.chart.y);
      await page.screenshot({path:testInfo.outputPath(`screener-${width}-${theme}.png`)});
    }
  });
}

test('comparison range reloads history and explains access failures',async({page})=>{
  const requests=[]; let available=true;
  await page.route('**/api/data/stock/*/chart?*',route=>{
    const range=new URL(route.request().url()).searchParams.get('range'); requests.push(range);
    return route.fulfill({json:available ? {state:'ok',data:{s:'ok',t:[1700000000,1700086400],c:range==='1M'?[10,11]:[10,15]}}
      : {state:'unavailable',message:'This information is unavailable under the current Finnhub access.'}});
  });
  await page.goto('/compare'); await dismissPrivacy(page);
  await page.getByRole('button',{name:'Compare',exact:true}).click();
  await expect(page.locator('.bar-chart')).toBeVisible(); expect(requests).toEqual([]);
  const range=page.getByLabel('Historical range',{exact:true});
  await range.selectOption('1M');
  await expect(page.locator('.research-chart')).toHaveAttribute('aria-label',/1 month/);
  await range.selectOption('6M');
  await expect(page.locator('.research-chart')).toHaveAttribute('aria-label',/6 months/);
  // Accessible data values establish that a new range response was rendered.
  await expect(page.locator('#research-results details')).toContainText('150');
  expect(requests.slice(-2)).toEqual(['6M','6M']);
  available=false; await range.selectOption('1Y');
  await expect(page.locator('#comparison-range-help')).toContainText('History unavailable');
  await expect(range).toHaveValue('');
  await expect(page.locator('.research-chart')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Retry history'})).toBeVisible();
  await expect(range.locator('option[value="1M"]')).toHaveJSProperty('disabled',true);
  available=true; await page.getByRole('button',{name:'Retry history'}).click();
  await expect(page.locator('.research-chart')).toBeVisible();
  await expect(range.locator('option[value="1M"]')).toHaveJSProperty('disabled',false);
});
