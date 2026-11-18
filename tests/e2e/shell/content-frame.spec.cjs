const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
const fs = require('node:fs');
const AxeBuilder = require('@axe-core/playwright').default;
const css = fs.readFileSync('MarketDesk/wwwroot/css/observatory.css', 'utf8');
const beforeCss = css.replace(/\/\* Match the research content frame[\s\S]*?(?=\/\* Full-screen navigation)/, '');

test('four public content frames match research bounds without resizing the hero, bars or footer', async ({page,isMobile},info)=>{
  test.setTimeout(180000);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(()=>localStorage.setItem('stocklumo.watch',JSON.stringify(['AAPL','MSFT'])));
  await page.route('**/api/data/news',r=>r.fulfill({json:{state:'ok',data:Array.from({length:4},(_,i)=>({
    headline:`Synthetic layout report ${i+1}: company research and market updates`, source:'Test publisher',
    summary:'Synthetic article excerpt for responsive layout verification.',datetime:1700000000,url:`https://example.org/layout-${i}`
  }))}}));
  let baseline=false;
  await page.route('**/css/observatory.css*',r=>r.fulfill({contentType:'text/css',body:baseline?beforeCss:css}));
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const measurements=[];
  for(const width of isMobile?[390]:[1920,1280,768,390]) {
    await page.setViewportSize({width,height:1000});
    for(const theme of ['light','dark']) {
      await page.addInitScript(t=>localStorage.setItem('stocklumo.theme',t),theme);
      for(const [path,selector] of [['/','#workspace-summary'],['/markets','.market-workspace'],['/watchlist','#watch-section'],['/news','#news-section']]) {
        let before;
        for(const original of [true,false]) {
          baseline=original;await page.goto(path);await dismissPrivacy(page);
          await page.evaluate(()=>document.fonts.ready);
          if(path==='/news') await expect(page.locator('#news .news-item')).toHaveCount(4);
          else if(path==='/watchlist') await expect(page.locator('#watch-rows tr')).toHaveCount(2);
          else await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
          // Compare settled shell states, rather than measuring one page during
          // its initial status-label wrap or abandoning its remaining requests.
          await expect(page.locator('#ticker-stocks .last')).toHaveCount(8);
          await expect.poll(()=>page.locator('#ticker-stocks .last').allTextContents()).toEqual(Array(8).fill('120.00 USD'));
          // The finite SSE fixture closes after its initial event.
          await expect(page.locator('#connection')).toHaveText('DISCONNECTED');
          if(path==='/markets') await expect(page.locator('#explore-grid')).toHaveAttribute('aria-busy','false');
          const geometry=await page.evaluate(selector=>{
            const box=s=>{const r=document.querySelector(s).getBoundingClientRect();return{x:r.x,width:r.width,height:r.height};};
            return {viewport:document.documentElement.clientWidth,gutter:parseFloat(getComputedStyle(document.querySelector('.page')).paddingLeft),
              content:box(selector),header:box('.header'),ticker:box('.ticker'),toolbar:box('.workspace-toolbar'),footer:box('.footer'),
              field:box('.market-atmosphere'),hero:document.body.dataset.page==='home'?box('.intro'):null,
              gap:getComputedStyle(document.querySelector('.spotlight')).gap,overflow:document.documentElement.scrollWidth>innerWidth+1};
          },selector);
          if(original){before=geometry;continue;}
          const expected=Math.min(geometry.viewport,1480)-2*geometry.gutter;
          expect(Math.abs(geometry.content.width-expected)).toBeLessThan(2);
          expect(Math.abs(geometry.content.x-(geometry.viewport-expected)/2)).toBeLessThan(2);
          for(const name of ['header','ticker','toolbar','footer',...(geometry.hero?['hero']:[])])
            for(const key of ['x','width','height']) expect(Math.abs(geometry[name][key]-before[name][key]),`${path} ${name}.${key}`).toBeLessThan(2);
          for(const key of ['x','width']) expect(Math.abs(geometry.field[key]-before.field[key])).toBeLessThan(2);
          expect(geometry.gap).toBe('18px');expect(geometry.overflow).toBe(false);
          measurements.push({path,theme,width,...geometry});
          if(width===1920 || isMobile) {
            await page.locator(selector).scrollIntoViewIfNeeded();
            await page.screenshot({path:info.outputPath(`${path==='/'?'dashboard':path.slice(1)}-${width}-${theme}.png`)});
          }
          if(width===390) expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze()).violations).toEqual([]);
        }
      }
    }
  }
  expect(errors).toEqual([]);
  fs.mkdirSync('output/content-frame',{recursive:true});fs.writeFileSync(`output/content-frame/${info.project.name}.json`,JSON.stringify(measurements,null,2));
});
