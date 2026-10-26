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

test('comparison offers static snapshot information and no history requests',async({page},testInfo)=>{
  const historyRequests=[];
  page.on('request',request=>{if(request.url().includes('/chart?'))historyRequests.push(request.url());});
  await page.goto('/compare'); await dismissPrivacy(page);
  await expect(page.getByLabel('Historical range',{exact:true})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Retry history',exact:true})).toHaveCount(0);
  await expect(page.locator('.comparison-mode')).toContainText('Latest snapshot');
  await expect(page.locator('#comparison-range-help')).toContainText('Historical prices are unavailable');
  await page.getByRole('button',{name:'Compare',exact:true}).click();
  await expect(page.locator('#research-results > .table-wrap tbody tr')).toHaveCount(2);
  await expect(page.locator('.bar-chart')).toBeVisible();
  await expect(page.locator('.comparison-metrics > figure')).toHaveCount(3);
  await page.getByLabel('Tickers (comma-separated)',{exact:true}).fill('AAPL, MSFT, NVDA');
  await page.getByRole('button',{name:'Compare',exact:true}).click();
  await expect(page.locator('#research-results > .table-wrap tbody tr')).toHaveCount(3);
  expect(historyRequests).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await page.screenshot({path:testInfo.outputPath('compare-snapshot.png')});
});
