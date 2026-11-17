const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
const AxeBuilder=require('@axe-core/playwright').default;
test.beforeEach(async({page})=>{
  // Use the actual local preview controller with synthetic file data; Finnhub stays mocked.
  await page.route('**/api/research-preview/**',r=>r.continue());
  await page.route('**/api/data/stock/*/chart?*',r=>r.continue());
});
async function visit(page,path){await page.goto(path);await dismissPrivacy(page);await expect(page.locator('#research-preview-banner')).toBeVisible();}
for(const theme of ['light','dark'])test(`captured chart ${theme}: ranges, candles, keyboard and responsive contrast`,async({page},info)=>{
  test.setTimeout(90000); // Range changes, both input modes, accessibility scan and full-page capture.
  await page.addInitScript(t=>localStorage.setItem('stocklumo.theme',t),theme);await visit(page,'/stock/AAPL');
  const work=page.locator('#captured-price-history'),slider=page.getByLabel('Inspect historical observation',{exact:true});
  await expect(work).toBeVisible();await expect(work.locator('.history-up')).not.toHaveCount(0);
  const month=Number(await slider.getAttribute('max'));
  await page.getByRole('button',{name:'1Y',exact:true}).click();await expect.poll(async()=>Number(await slider.getAttribute('max'))).toBeGreaterThan(month*5);
  const year=Number(await slider.getAttribute('max')),chart=work.locator('svg[tabindex]');
  // A pointer left over the plot can select an observation after range reflow.
  // Start keyboard inspection explicitly rather than assuming no pointer input.
  await chart.press('End');await expect(slider).toHaveValue(String(year));
  await chart.press('ArrowLeft');await expect(slider).toHaveValue(String(year-1));
  await chart.press('Home');await expect(slider).toHaveValue('0');
  await chart.dispatchEvent('pointermove',{pointerType:'mouse',clientX:100,clientY:100,movementX:0,movementY:0,buttons:0});
  await expect(slider).toHaveValue('0');
  await chart.press('ArrowRight');await expect(slider).toHaveValue('1');
  const bounds=await chart.boundingBox();
  await chart.dispatchEvent('pointerdown',{pointerType:'mouse',buttons:1});
  await chart.dispatchEvent('pointermove',{pointerType:'mouse',clientX:bounds.x+bounds.width/2,clientY:bounds.y+bounds.height/2,buttons:1});
  await expect(slider).not.toHaveValue('1');
  await page.getByRole('button',{name:'Price line',exact:true}).click();await expect(work.locator('.history-line')).toBeVisible();await expect(work.locator('.history-up')).toHaveCount(0);
  await page.getByRole('button',{name:'1D',exact:true}).click();await expect(work).toContainText('1 minute');await expect(page.getByRole('button',{name:'Candles',exact:true})).toBeDisabled();
  await page.getByRole('button',{name:'Session',exact:true}).click();await expect(work).toBeHidden();await expect(page.locator('.plot')).toBeVisible();
  await page.getByRole('button',{name:'1M',exact:true}).click();await expect(work).toBeVisible();
  await expect(page.locator('#financial-history')).toBeVisible();await expect(page.locator('.financial-history-grid figure')).toHaveCount(2);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0);});
  await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  await page.screenshot({path:info.outputPath(`chart-${theme}.png`),fullPage:true});
});
test('comparison changes the historical window and preserves unavailable-stock snapshots',async({page})=>{
  await visit(page,'/compare');const range=page.getByRole('combobox',{name:'Historical range',exact:true});await range.selectOption('1M');
  await page.getByRole('button',{name:'Compare',exact:true}).click();await expect(page.locator('.research-chart')).toBeVisible();
  const initial=await page.locator('#research-results > details tbody tr').count();await range.selectOption('1Y');
  await expect.poll(async()=>await page.locator('#research-results > details tbody tr').count()).toBeGreaterThan(initial*5);
  await expect(page.getByRole('heading',{name:/Forward-adjusted price performance/})).toBeVisible();
  await page.getByLabel('Tickers (comma-separated)',{exact:true}).fill('AAPL, DIS');await page.getByRole('button',{name:'Compare',exact:true}).click();
  await expect(page.locator('#research-results > .table-wrap tbody tr')).toHaveCount(2);
  await expect(page.locator('#research-results')).toContainText('Captured history does not cover every selected stock');await expect(page.locator('.research-chart')).toHaveCount(0);
});

test('captured history survives unavailable Finnhub company details',async({page})=>{
  await page.route('**/api/data/stock/AAPL/profile',r=>r.fulfill({json:{state:'unavailable',message:'Company unavailable.'}}));
  await visit(page,'/stock/AAPL');await expect(page.locator('#captured-price-history')).toBeVisible();
  await expect(page.locator('#company-status')).toContainText('Company unavailable');
  await page.getByRole('button',{name:'1Y',exact:true}).click();
  await expect.poll(async()=>Number(await page.getByLabel('Inspect historical observation',{exact:true}).getAttribute('max'))).toBeGreaterThan(200);
});
test('captured screener filters its stated 100-row subset and retains reset/presets',async({page})=>{
  await visit(page,'/screener');const rows=page.locator('.screener-list tbody tr');await expect(rows).toHaveCount(100);
  const field=await page.getByLabel('Company or ticker',{exact:true}).boundingBox(),panel=await page.locator('#research-controls').boundingBox();expect(field.width).toBeGreaterThan(panel.width*.85);
  await expect(page.locator('#research-status')).toContainText('100 captured rows of 1,234');
  await page.getByLabel('Company or ticker',{exact:true}).fill('MSFT');await expect(rows).toHaveCount(1);
  await page.getByRole('button',{name:'Save preset',exact:true}).click();await page.getByRole('button',{name:'Reset filters',exact:true}).click();await expect(rows).toHaveCount(100);
  await page.getByRole('button',{name:'Load preset',exact:true}).click();await expect(rows).toHaveCount(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('captured earnings keep currency and missing actuals, and reject an uncaptured window',async({page})=>{
  await visit(page,'/earnings');await page.getByRole('button',{name:'Load earnings',exact:true}).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);await expect(page.locator('.earnings-timeline')).toContainText('USD per share');
  await expect(page.locator('#research-results')).toContainText('EPS actual unavailable');
  const outside=new Date();outside.setUTCDate(outside.getUTCDate()-90);
  const from=outside.toISOString().slice(0,10);outside.setUTCDate(outside.getUTCDate()+1);
  await page.getByLabel('From',{exact:true}).fill(from);await page.getByLabel('To',{exact:true}).fill(outside.toISOString().slice(0,10));await page.getByRole('button',{name:'Load earnings',exact:true}).click();
  await expect(page.locator('#research-status')).toContainText('captured calendar window');
});
test('watchlist trends use captured prices and removal preserves the remaining row',async({page})=>{
  await page.addInitScript(()=>localStorage.setItem('stocklumo.watch',JSON.stringify(['AAPL','MSFT'])));await visit(page,'/watchlist');
  await expect(page.locator('.watch-price-trend')).toHaveCount(2);await expect(page.locator('#watch-trend-source')).toContainText('each on its own scale');
  await page.getByRole('button',{name:'Remove AAPL from watchlist',exact:true}).click();await expect(page.locator('#watch-rows tr')).toHaveCount(1);await expect(page.locator('.watch-price-trend')).toHaveCount(1);
});
test('historical practice P/L uses real series through the existing unadjusted endpoint',async({page})=>{
  const date=new Date();date.setUTCDate(date.getUTCDate()-40);
  await page.addInitScript(date=>localStorage.setItem('stocklumo.portfolio',JSON.stringify([{symbol:'AAPL',currency:'USD',quantity:2,purchasePrice:100,date}])),date.toISOString().slice(0,10));
  await visit(page,'/portfolio');await page.getByRole('button',{name:'Historical P/L',exact:true}).click();
  await expect(page.locator('.research-chart')).toBeVisible();await expect(page.locator('#research-results')).toContainText('after all purchases');
});
