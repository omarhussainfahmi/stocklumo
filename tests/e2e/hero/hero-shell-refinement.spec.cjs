const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
test('slim header and unobscured hero keep navigation scoped to other pages',async({page,isMobile},info)=>{
 await page.setViewportSize({width:isMobile?390:1440,height:1000});await page.goto('/');await dismissPrivacy(page);
 for(const theme of ['light','dark']){
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme').click();
  await expect(page.locator('.workspace-toolbar')).toBeHidden();
  const state=await page.evaluate(()=>{const h=document.querySelector('.header'),v=document.querySelector('#hero-film'),p=getComputedStyle(v);return{height:h.getBoundingClientRect().height,overlay:getComputedStyle(document.querySelector('.hero-visual'),'::after').content,fit:p.objectFit,videoHeight:v.getBoundingClientRect().height,stage:document.querySelector('.hero-visual').getBoundingClientRect().height,overflow:document.documentElement.scrollWidth>innerWidth};});
  expect(state.height).toBeLessThanOrEqual(56);expect(state.overlay).toBe('none');expect(state.overflow).toBe(false);
  expect(state.fit).toBe('cover');if(isMobile)expect(state.videoHeight/state.stage).toBeCloseTo(.9,1);
  for(const selector of ['#theme','#navigation-toggle']){if(await page.locator(selector).isVisible())expect((await page.locator(selector).boundingBox()).height).toBeGreaterThanOrEqual(44);}
  await page.screenshot({path:info.outputPath(`hero-shell-${theme}.png`)});
 }
 for(const route of ['/markets','/watchlist','/news','/screener','/compare','/portfolio','/earnings','/stock/AAPL','/privacy','/terms','/settings','/not-a-stocklumo-page']){
  await page.goto(route);await expect(page.locator('.workspace-toolbar .research-nav')).toBeVisible();await expect(page.locator('.workspace-toolbar .research-nav a')).toHaveCount(4);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});
