const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
test('hero search and both actions are visible on opening at normal laptop and phone sizes',async({page,isMobile})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const [width,height] of isMobile?[[390,844],[360,800]]:[[1366,768],[1440,900],[1920,1080]]){
  await page.setViewportSize({width,height});await page.goto('/');await dismissPrivacy(page);
  const bounds=await page.locator('#intro-actions').boundingBox();expect(bounds.y+bounds.height).toBeLessThanOrEqual(height);
  const search=await page.locator('#search').boundingBox();expect(search.y).toBeGreaterThan(0);expect(search.y+search.height).toBeLessThan(height);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
});
test('video reaches both desktop edges at its original aspect ratio',async({page,isMobile},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await dismissPrivacy(page);
 for(const width of isMobile?[390]:[1110,1280,1440,1920,2560]){
  await page.setViewportSize({width,height:1000});
  for(const theme of ['light','dark']){
   if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme').click();
   const g=await page.evaluate(()=>{const v=document.querySelector('#hero-film'),r=v.getBoundingClientRect();return {x:r.x,right:r.right,width:r.width,height:r.height,fit:getComputedStyle(v).objectFit,overflow:document.documentElement.scrollWidth>innerWidth};});
   expect(Math.abs(g.x)).toBeLessThan(1);expect(Math.abs(g.right-width)).toBeLessThan(1);expect(g.fit).toBe('cover');expect(g.overflow).toBe(false);
   if(!isMobile)expect(Math.abs(g.width/g.height-1.75)).toBeLessThan(.01);
   if(width===1920||isMobile)await page.screenshot({path:info.outputPath(`edge-${width}-${theme}.png`)});
  }
 }
});
