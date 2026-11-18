const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
const rim = page => page.locator('.search-orbit').evaluate(e=>({
  state:getComputedStyle(e,'::before').animationPlayState,
  name:getComputedStyle(e,'::before').animationName,
  progress:getComputedStyle(e,'::before').offsetDistance
}));
const aura = page => page.locator('.search-aura').evaluate(e=>({state:getComputedStyle(e,'::before').animationPlayState,name:getComputedStyle(e,'::before').animationName}));

// Give each complete theme journey its own standard timeout and fresh fixture.
// Combining both journeys can exhaust the shared budget on a busy WebKit runner.
for(const theme of ['light','dark']) {
  test(`signal search in ${theme} pauses during editing and preserves keyboard selection`,async({page},info)=>{
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.addInitScript(t=>localStorage.setItem('stocklumo.theme',t),theme);
    await page.goto('/');await dismissPrivacy(page);
    // Scroll restoration or privacy focus can leave the hero offscreen.
    // The rim is deliberately paused there; exercise it while visible.
    await page.locator('.search-shell').scrollIntoViewIfNeeded();
    await expect.poll(async()=>(await rim(page)).state).toBe('running');
    expect((await aura(page)).state).toBe('running');
    const before=await page.locator('#search').boundingBox();
    const alignment=await page.locator('.search-shell').evaluate(shell=>{
      const input=shell.querySelector('input').getBoundingClientRect(),ring=shell.querySelector('.search-orbit').getBoundingClientRect();
      const label=shell.parentElement.querySelector('label');
      return {insets:[input.left-ring.left,input.top-ring.top,ring.right-input.right,ring.bottom-input.bottom],
        labelInset:label.getBoundingClientRect().left+parseFloat(getComputedStyle(label).paddingLeft)-input.left};
    });
    for(const inset of alignment.insets) expect(inset).toBeCloseTo(2,1);
    expect(alignment.labelInset).toBeCloseTo(16,1);
    const first=(await rim(page)).progress;
    await expect.poll(async()=>(await rim(page)).progress).not.toBe(first);
    expect(await page.locator('#search').boundingBox()).toEqual(before);
    await page.locator('.search').screenshot({path:info.outputPath(`search-idle-${theme}.png`)});
    const search=page.getByRole('searchbox',{name:'Find a stock',exact:true});
    await search.fill('Apple');
    await expect(page.locator('#search-results a')).toHaveCount(1);
    expect((await rim(page)).state).toBe('paused');
    expect((await aura(page)).state).toBe('paused');
    await page.locator('.search').screenshot({path:info.outputPath(`search-${theme}.png`)});
    await page.getByRole('button',{name:'Clear stock search',exact:true}).click();
    await expect(search).toHaveValue('');await expect(search).toBeFocused();
    await search.fill('Apple');
    await expect(page.locator('#search-results a')).toHaveCount(1);
    await search.press('ArrowDown');await expect(page.locator('#search-results a')).toBeFocused();
    await page.keyboard.press('Enter');await expect(page).toHaveURL(/\/stock\/AAPL$/);
    await expect(page.locator('.header .search-shell')).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)).toBe(false);
  });
}

test('signal rim respects reduced motion, shared pause, viewport and high-contrast fallback',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');await dismissPrivacy(page);
  expect((await rim(page)).name).toBe('none');
  expect((await aura(page)).name).toBe('none');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await expect.poll(async()=>(await rim(page)).state).toBe('running');
  const control=page.locator('[data-background-motion]');
  await control.click();await expect(page.locator('.search-shell')).toHaveAttribute('data-motion','paused');
  await control.click();
  await page.locator('.search-shell').scrollIntoViewIfNeeded();
  await expect.poll(async()=>(await rim(page)).state).toBe('running');
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.search-shell')).toHaveAttribute('data-motion','paused');
  await page.emulateMedia({forcedColors:'active'});
  await expect(page.locator('.search-orbit')).toBeHidden();
  await expect(page.locator('.search-aura')).toBeHidden();
});
