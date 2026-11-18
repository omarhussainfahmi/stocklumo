const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
const AxeBuilder=require('@axe-core/playwright').default;

test('compact stock quote metrics balance their labels and align with the history panel',async({page,isMobile},info)=>{
  // This checks the sparse, one-observation layout. Keep the fixture quote time
  // fixed so crossing a wall-clock second cannot create a second observation.
  const quoteTime=Math.floor(Date.now()/1000);
  await page.route('**/api/data/stock/AAPL/quote',route=>route.fulfill({json:{state:'ok',data:{c:120,pc:118,o:119,h:125,l:115,t:quoteTime}}}));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:isMobile?390:1440,height:1000});
  for(const theme of ['light','dark']) {
    await page.addInitScript(t=>localStorage.setItem('stocklumo.theme',t),theme);
    await page.goto('/stock/AAPL');await dismissPrivacy(page);
    await expect(page.locator('#price-ranges .range-card')).toHaveCount(2);
    await expect(page.locator('#stats > div')).toHaveCount(4);
    const layout=await page.evaluate(()=>{
      const price=document.querySelector('.price-panel').getBoundingClientRect(),metrics=document.querySelector('.stock-metrics').getBoundingClientRect();
      return {priceBottom:price.bottom,metricsBottom:metrics.bottom,centered:[...document.querySelectorAll('#stats > div')].every(e=>getComputedStyle(e).textAlign==='center'),overflow:document.documentElement.scrollWidth>innerWidth+1};
    });
    if(!isMobile) expect(Math.abs(layout.priceBottom-layout.metricsBottom)).toBeLessThan(1);
    expect(layout.centered).toBe(true);expect(layout.overflow).toBe(false);
    await page.locator('.stock-overview').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath(`stock-metrics-${theme}.png`)});
  }
});

test('portfolio keeps one accessible error note and aligned fields without duplicate inline text',async({page,isMobile},info)=>{
  await page.setViewportSize({width:isMobile?390:1440,height:1000});
  await page.goto('/portfolio');await dismissPrivacy(page);
  const save=page.getByRole('button',{name:'Save holding',exact:true}),ticker=page.getByLabel('Ticker',{exact:true});
  await save.click();await expect(ticker).toBeFocused();await expect(ticker).toHaveAttribute('aria-invalid','true');
  await expect(page.locator('#research-status')).toHaveText('Enter one valid ticker.');
  await expect(page.locator('#research-status')).toHaveAttribute('role','alert');
  await expect(ticker).toHaveAttribute('aria-describedby',/research-status/);
  await expect(page.locator('#research-controls .field-error')).toHaveCount(0);
  await ticker.fill('AAPL');await save.click();
  await expect(page.getByLabel('Quantity',{exact:true})).toBeFocused();
  await expect(page.locator('#research-status')).toContainText('Quantity and price must be above zero');
  if(!isMobile) {
    const tops=await page.locator('#research-controls input').evaluateAll(nodes=>nodes.map(e=>e.getBoundingClientRect().top));
    expect(Math.max(...tops)-Math.min(...tops)).toBeLessThan(5);
  }
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.locator('#research-controls').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('portfolio-shared-error.png')});
});

test('earnings controls fill their row and page-size values retain a separate arrow lane',async({page,isMobile},info)=>{
  await page.setViewportSize({width:isMobile?390:1440,height:1000});
  const today=new Date().toISOString().slice(0,10);
  // Synthetic events exist only in this intercepted test response.
  await page.route('**/api/research/earnings?*',r=>r.fulfill({json:{state:'ok',data:{earningsCalendar:Array.from({length:60},(_,i)=>({symbol:i%2?'MSFT':'AAPL',date:today,epsActual:1,epsEstimate:1.1}))}}}));
  await page.goto('/earnings');await dismissPrivacy(page);
  const run=page.getByRole('button',{name:'Load earnings',exact:true});
  if(!isMobile) {
    const tops=await page.locator('#research-controls > label, #research-controls .research-actions').evaluateAll(nodes=>nodes.map(e=>e.getBoundingClientRect().bottom));
    expect(Math.max(...tops)-Math.min(...tops)).toBeLessThan(5);
  }
  const hint=await page.locator('#earnings-date-hint').boundingBox(),action=await run.boundingBox();
  expect(hint.y).toBeGreaterThanOrEqual(action.y+action.height);
  await run.click();await expect(page.locator('#research-results tbody tr')).toHaveCount(25);
  const size=page.getByRole('combobox',{name:'Rows per page',exact:true});
  for(const [value,rows] of [['100',60],['50',50],['25',25]]) {
    await size.selectOption(value);await expect(page.locator('#research-results tbody tr')).toHaveCount(rows);
    const spacing=await size.evaluate(e=>{
      const s=getComputedStyle(e),canvas=document.createElement('canvas'),c=canvas.getContext('2d');c.font=s.font;
      return {right:parseFloat(s.paddingRight),available:e.clientWidth-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight),text:c.measureText(e.value).width};
    });
    expect(spacing.right).toBeGreaterThanOrEqual(32);expect(spacing.available).toBeGreaterThan(spacing.text);
  }
  await page.locator('#research-controls').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('earnings-compact-controls.png')});
  await page.locator('.pagination').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('earnings-page-size.png')});
  await page.getByRole('combobox',{name:'Display',exact:true}).selectOption('reported');
  await expect(page.getByLabel('From',{exact:true})).toBeHidden();await expect(page.locator('#earnings-date-hint')).toBeHidden();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
});
