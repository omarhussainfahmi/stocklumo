const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');

test('ambient field begins below the full home intro and stays out of pointer/focus interactions',async({page})=>{
  await page.goto('/');await dismissPrivacy(page);
  const field=page.locator('.market-atmosphere');await expect(field).toHaveAttribute('aria-hidden','true');
  await expect.poll(()=>page.evaluate(()=>{
    const field=document.querySelector('.market-atmosphere').getBoundingClientRect(),hero=document.querySelector('.intro').getBoundingClientRect();
    return Math.abs(field.top-hero.bottom);
  })).toBeLessThan(2);
  const style=await field.evaluate(n=>({pointer:getComputedStyle(n).pointerEvents,focusables:n.querySelectorAll('a,button,input,[tabindex]').length}));
  expect(style).toEqual({pointer:'none',focusables:0});
  await page.getByRole('button',{name:'Pause background motion',exact:true}).click();
  await expect(field).toHaveAttribute('data-paused','true');
  await page.goto('/screener');await expect(page.locator('.market-atmosphere')).toHaveAttribute('data-paused','true');
  await page.getByRole('button',{name:'Resume background motion',exact:true}).click();
  await expect(page.locator('.market-atmosphere')).toHaveAttribute('data-paused','false');
  await expect(page.locator('.market-atmosphere')).toHaveCSS('animation-name','none');
});

test('reduced motion freezes both decorative layers and keeps the information pages functional',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/privacy');await dismissPrivacy(page);
  await expect(page.getByRole('button',{name:'Background motion off',exact:true})).toBeDisabled();
  await expect(page.locator('.field-orbit')).toHaveCSS('animation-name','none');
  await expect(page.locator('.field-current')).toHaveCSS('animation-name','none');
  await expect(page.locator('.market-atmosphere')).toHaveAttribute('data-paused','true');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await page.getByRole('link',{name:'Your choices',exact:true}).click();
  const heading=await page.locator('#your-choices').boundingBox(),header=await page.locator('.header').boundingBox();
  expect(heading.y).toBeGreaterThanOrEqual(header.y+header.height);
});

test('unavailable homepage quotes use a compact full-width workspace',async({page,isMobile})=>{
  test.skip(isMobile,'Desktop layout; phones already stack the workspace.');
  await page.route('**/api/universe',r=>r.fulfill({json:{state:'unavailable',count:null,selection:[],message:'Coverage unavailable.'}}));
  await page.goto('/');await dismissPrivacy(page);
  await expect(page.locator('#pulse-bars')).toContainText('No quotes available.');
  const grid=await page.locator('.market-workspace').boundingBox(),panel=await page.locator('#market-pulse').boundingBox();
  expect(Math.abs(grid.width-panel.width)).toBeLessThan(2);
  const cards=await page.locator('#toolkit .tool-grid > a').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().top));
  expect(Math.max(...cards)-Math.min(...cards)).toBeLessThan(2);
});
