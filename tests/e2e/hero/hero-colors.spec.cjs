const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
test('reduced motion uses matching owner posters without downloading the videos',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});const requests=[];page.on('request',r=>{if(r.url().includes('-60fps.mp4'))requests.push(r.url());});await page.goto('/');await dismissPrivacy(page);
 for(const theme of ['dark','light']){if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme').click();await expect(page.locator(`.hero-logo-${theme}`)).toBeVisible();}
 expect(requests).toEqual([]);await expect(page.locator('#hero-film-toggle')).toBeHidden();
});
