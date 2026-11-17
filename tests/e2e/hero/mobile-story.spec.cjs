const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
for(const [width,height] of [[320,568],[360,800],[390,844],[430,932],[844,390],[768,1024],[1440,900]]) {
test(`responsive video backdrop keeps centered overlay content and accessible actions at ${width}x${height}`, async ({page},info)=>{
    // Two theme switches and two captures share this budget; keep action caps.
    test.setTimeout(60000);
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
    await page.setViewportSize({width,height}); await page.goto('/'); await dismissPrivacy(page);
    for(const theme of ['dark','light']) {
      if(await page.locator('html').getAttribute('data-theme')!==theme) await page.locator('#theme').click();
      await expect(page.locator('#hero-skip')).toHaveCount(0);
      // The action observer may settle after the theme/layout update.
      await expect.poll(()=>page.evaluate(()=>{
        const header=document.querySelector('.header').getBoundingClientRect();
        return [...document.querySelectorAll('#intro-actions .primary,.mobile-action:not([hidden])')].some(e=>{
          const b=e.getBoundingClientRect();return b.width>0&&b.top>=header.bottom&&b.bottom<=innerHeight;
        });
      })).toBe(true);
      const state=await page.evaluate(()=>{
        const visual=document.querySelector('#hero-visual').getBoundingClientRect(),copy=document.querySelector('.intro-copy').getBoundingClientRect();
        return {width:innerWidth,height:innerHeight,theme:document.documentElement.dataset.theme,overflow:document.documentElement.scrollWidth>innerWidth+1,
          visualTop:visual.top,visualBottom:visual.bottom,copyTop:copy.top,copyBottom:copy.bottom,
          visualHeight:visual.height,visualWidth:visual.width,pins:document.querySelectorAll('.pin-spacer').length};
      });
      expect(state.overflow).toBe(false); expect(state.pins).toBe(0);
      expect(state.visualTop).toBeLessThanOrEqual(state.copyTop); expect(state.visualBottom).toBeGreaterThanOrEqual(state.copyBottom);
      expect(state.visualHeight).toBeGreaterThanOrEqual(780); expect(state.visualWidth).toBeGreaterThanOrEqual(width-32);
      await page.screenshot({path:info.outputPath(`opening-${width}-${height}-${theme}.png`)});
    }
});
}

test('opening has no animation-skip control and native scrolling reaches research',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');await dismissPrivacy(page);
  await expect(page.locator('#hero-skip')).toHaveCount(0);
  await page.locator('#market-content').scrollIntoViewIfNeeded();
  await expect(page.locator('#workspace-summary')).toBeVisible();
  await expect(page.locator('#toolkit')).toBeVisible();
});


test('compact disclosure navigation closes with Escape and links; focused search yields the fixed action',async({page})=>{
  for(const [width,height] of [[390,844],[844,390]]) {
    await page.setViewportSize({width,height});await page.goto('/');await dismissPrivacy(page);
    const button=page.locator('#navigation-toggle');await expect(button).toBeVisible();await button.click();
    await expect(button).toHaveAttribute('aria-expanded','true');await expect(button).toHaveText('Close menu');
    await page.keyboard.press('Escape');await expect(button).toBeFocused();await expect(button).toHaveAttribute('aria-expanded','false');
    await page.locator('#search').focus();await expect(page.locator('.mobile-action')).toBeHidden();
    await page.setViewportSize({width,height:440});
    await page.locator('#search').fill('Apple');await expect(page.locator('#search-results a')).toBeVisible();
    expect(await page.locator('#search-results').evaluate(e=>e.clientHeight)).toBeLessThanOrEqual(220);
    const popup=await page.locator('#search-results').evaluate(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,header:document.querySelector('.header').getBoundingClientRect().bottom,height:innerHeight}));
    expect(popup.top).toBeGreaterThanOrEqual(popup.header);expect(popup.bottom).toBeLessThanOrEqual(popup.height);
    await button.click();await page.locator('#site-navigation a[href="/earnings"]').click();
    await expect(page).toHaveURL(/\/earnings$/);await expect(page.locator('#navigation-toggle')).toHaveAttribute('aria-expanded','false');
  }
});

test('direct content anchors, history and reduced motion avoid unnecessary initialization',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.emulateMedia({reducedMotion:'reduce'});
  const requests=[];page.on('request',r=>{if(r.url().includes('/js/generated/hero-scene.js'))requests.push(r.url());});
  await page.goto('/#market-content');await dismissPrivacy(page);
  await expect(page.locator('#hero-visual canvas')).toHaveCount(0);expect(requests).toEqual([]);
  await page.goto('/markets');await page.goBack();
  await expect(page).toHaveURL(/#market-content$/);
  expect(await page.locator('#market-content').evaluate(e=>e.getBoundingClientRect().top)).toBeLessThan(240);
  expect(requests).toEqual([]);
});

test('JavaScript-disabled home retains the original poster and accessible navigation',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}),page=await context.newPage();
  await page.goto('http://127.0.0.1:5161/');
  await expect(page.locator('#site-navigation a[href="/markets"]')).toBeVisible();
  await expect(page.locator('#hero-visual img:visible')).toHaveCount(1);
  await expect(page.locator('#hero-skip')).toHaveCount(0);
  // Safari's native Tab-to-links preference is platform-owned. Focus the
  // accessibility link directly before testing its reveal and native anchor.
  await page.locator('.skip').focus();
  await page.locator('.skip').press('Enter');await expect(page).toHaveURL(/#main$/);
  await page.getByRole('link',{name:'AAPL Apple',exact:true}).click();await expect(page).toHaveURL(/\/stock\/AAPL$/);
  await context.close();
});


test('Save-Data keeps the static compact poster without requesting WebGL code',async({page})=>{
  await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true},configurable:true}));
  await page.setViewportSize({width:390,height:844});
  const requests=[];page.on('request',r=>{if(r.url().includes('/js/generated/hero-scene.js'))requests.push(r.url());});
  await page.goto('/');await dismissPrivacy(page);
  await page.locator('#hero-visual').evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
  await page.locator('#theme').click();
  await expect(page.locator('#hero-visual img:visible')).toHaveCount(1);
  await expect(page.locator('#hero-visual canvas')).toHaveCount(0);expect(requests).toEqual([]);
});

test('enlarged reading content reflows without hiding text beneath the visual',async({page})=>{
  await page.setViewportSize({width:320,height:568});await page.goto('/');await dismissPrivacy(page);
  // A content-text enlargement stress test, not a physical Safari text-size or keyboard measurement.
  await page.evaluate(()=>{
    for(const e of document.querySelectorAll('.intro h1,.intro-description,.intro .search label,#intro-actions a'))
      e.style.fontSize=`${parseFloat(getComputedStyle(e).fontSize)*2}px`;
  });
  const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,
    visual:document.querySelector('#hero-visual').getBoundingClientRect().top,copy:document.querySelector('.intro-copy').getBoundingClientRect().bottom}));
  expect(layout.overflow).toBe(false);expect(layout.visual).toBeLessThan(layout.copy);
  await expect(page.locator('#hero-skip')).toHaveCount(0);
  await page.locator('#market-content').scrollIntoViewIfNeeded();await expect(page.locator('#workspace-summary')).toBeVisible();
});
