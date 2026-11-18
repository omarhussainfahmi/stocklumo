const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
test('owner videos loop at original dimensions with centered usable overlay',async({page,isMobile},info)=>{
 test.setTimeout(75000); // Two assets each retain a 25s ready limit and a 5s loop check, plus navigation/control checks.
 await page.setViewportSize({width:isMobile?390:1440,height:1000});await page.goto('/');await dismissPrivacy(page);
 for(const theme of ['dark','light']){
  if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme').click();await page.locator('#hero-visual').scrollIntoViewIfNeeded();await expect(page.locator('#hero-visual')).toHaveAttribute('data-state','ready',{timeout:25000});
  const v=page.locator('#hero-film');expect(await v.evaluate(v=>[v.duration,v.loop,v.muted,v.playsInline])).toEqual([20,true,true,true]);
  // File dimensions/FPS are verified independently; native WebKit can expose a scaled decode size.
  expect(await v.evaluate(v=>Math.abs(v.videoWidth/v.videoHeight-1.75))).toBeLessThan(.01);expect(await v.getAttribute('src')).toContain(`owner-${theme}-60fps.mp4`);
  const copy=await page.locator('.intro-copy').boundingBox();expect(Math.abs(copy.x+copy.width/2-(isMobile?390:1440)/2)).toBeLessThan(2);
  await v.evaluate(v=>v.currentTime=19.8);await expect.poll(()=>v.evaluate(v=>v.currentTime),{timeout:5000}).toBeLessThan(1);
  await page.screenshot({path:info.outputPath(`owner-${theme}.png`)});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 await page.locator('#search').fill('Apple');await expect(page.locator('#search-results')).toContainText('AAPL');await expect(page.locator('#intro-actions a')).toHaveCount(2);
 await page.locator('#hero-film-toggle').click();await expect.poll(()=>page.locator('#hero-film').evaluate(v=>v.paused)).toBe(true);await page.locator('#hero-film-toggle').click();await expect.poll(()=>page.locator('#hero-film').evaluate(v=>v.paused)).toBe(false);
});
