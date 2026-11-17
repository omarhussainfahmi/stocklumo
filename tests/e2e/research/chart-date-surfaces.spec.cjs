const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');

test('chart range tabs stay flat and native dates have one rounded focus frame',async({page},info)=>{
  test.setTimeout(60000);
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const theme of ['light','dark']) {
    await page.goto('/stock/AAPL');await dismissPrivacy(page);
    if(await page.locator('html').getAttribute('data-theme')!==theme)await page.locator('#theme').click();
    const session=page.getByRole('button',{name:'Session',exact:true});
    const tab=await session.evaluate(e=>{const s=getComputedStyle(e);return{image:s.backgroundImage,shadow:s.boxShadow,left:s.paddingLeft,right:s.paddingRight,width:e.getBoundingClientRect().width};});
    expect(tab.image).toBe('none');expect(tab.shadow).toBe('none');expect(tab.left).toBe(tab.right);expect(tab.width).toBeGreaterThanOrEqual(64);
    await session.click();await expect(session).toHaveAttribute('aria-pressed','true');
    await page.locator('#ranges').screenshot({path:info.outputPath(`range-${theme}.png`)});
    for(const path of ['/portfolio','/earnings']) {
      await page.goto(path);await dismissPrivacy(page);
      const date=page.locator('.date-field input').first(),frame=page.locator('.date-field').first();
      await date.scrollIntoViewIfNeeded();
      const before=await frame.boundingBox();
      await date.hover();
      expect(await frame.evaluate(e=>getComputedStyle(e).boxShadow)).toBe('none');
      await date.focus();await expect(date).toBeFocused();
      const field=await date.evaluate(e=>({outline:getComputedStyle(e).outlineStyle,shadow:getComputedStyle(e).boxShadow}));
      expect(field).toEqual({outline:'none',shadow:'none'});
      expect(await frame.evaluate(e=>getComputedStyle(e).boxShadow)).not.toBe('none');
      expect(await frame.boundingBox()).toEqual(before);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
      await frame.screenshot({path:info.outputPath(`date-${path.slice(1)}-${theme}.png`)});
    }
  }
});
