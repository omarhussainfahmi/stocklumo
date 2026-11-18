const {test,expect,dismissPrivacy}=require('../support/fixtures.cjs');
const AxeBuilder=require('@axe-core/playwright').default;

test('standalone watchlist frames populated and empty content without a nested card',async({page},info)=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const theme of ['light','dark']) {
    await page.addInitScript(t=>{
      localStorage.setItem('stocklumo.theme',t);
      localStorage.setItem('stocklumo.watch',JSON.stringify(['AAPL','MSFT']));
    },theme);
    await page.goto('/watchlist');await dismissPrivacy(page);
    await expect(page.locator('#watch-rows tr')).toHaveCount(2);
    for(const state of ['populated','empty']) {
      const frame=await page.locator('#watch-section').evaluate(e=>{
        const r=e.getBoundingClientRect(),s=getComputedStyle(e);
        const children=[...e.children].filter(c=>c.getBoundingClientRect().width>0);
        return {radius:parseFloat(s.borderTopLeftRadius),border:parseFloat(s.borderTopWidth),
          contained:children.every(c=>{const b=c.getBoundingClientRect();return b.left>=r.left+15&&b.right<=r.right-15;}),
          overflow:document.documentElement.scrollWidth>innerWidth+1};
      });
      expect(frame.radius).toBeGreaterThan(0);expect(frame.border).toBeGreaterThan(0);
      expect(frame.contained).toBe(true);expect(frame.overflow).toBe(false);
      if(state==='populated') {
        const table=await page.locator('#watch-section .table-wrap').evaluate(e=>({border:getComputedStyle(e).borderTopWidth,background:getComputedStyle(e).backgroundColor}));
        expect(table).toEqual({border:'0px',background:'rgba(0, 0, 0, 0)'});
      }
      await page.locator('#watch-section').screenshot({path:info.outputPath(`watch-frame-${theme}-${state}.png`)});
      if(state==='populated') {
        await page.getByRole('button',{name:'Remove AAPL from watchlist',exact:true}).click();
        await page.getByRole('button',{name:'Remove MSFT from watchlist',exact:true}).click();
        await expect(page.locator('#watch-empty')).toBeVisible();
      }
    }
  }
});

test('incoming news batches keep shared row endings aligned without fixed or clipped content',async({page,isMobile},info)=>{
  test.setTimeout(90000);
  await page.emulateMedia({reducedMotion:'reduce'});
  let count=8;
  const respond=route=>route.fulfill({json:{state:'ok',data:Array.from({length:count},(_,i)=>({
    headline:`Synthetic report ${i+1}: ${i%3===0?'A longer company headline with several regional research updates':'Company update'}`,
    summary:i===2?'':i%3===0?'Synthetic excerpt with complete provider-supplied context for layout verification. '.repeat(6):'Short synthetic news excerpt.',
    datetime:1700000000,url:`https://example.org/card-alignment-${i}`,source:'Test publisher'
  }))}});
  await page.route('**/api/data/news',respond);await page.route('**/api/data/stock/*/news',respond);
  for(const theme of ['light','dark']) {
    await page.addInitScript(t=>localStorage.setItem('stocklumo.theme',t),theme);
    await page.setViewportSize({width:isMobile?390:1440,height:1000});
    for(const path of ['/news','/stock/AAPL']) {
      for(const batch of [8,5,2,1]) {
        count=batch;await page.goto(path);await dismissPrivacy(page);
        const selector=path==='/news'?'#news':'#stock-news';
        await expect(page.locator(`${selector} .news-item`)).toHaveCount(batch);
        await page.evaluate(()=>document.fonts.ready);
        const state=await page.locator(selector).evaluate(grid=>({
          cards:[...grid.querySelectorAll('.news-item')].map(card=>{
            const r=card.getBoundingClientRect();const p=card.querySelector('p');
            return {top:r.top,bottom:r.bottom,clamp:p?getComputedStyle(p).webkitLineClamp:null,clipped:p?p.scrollHeight>p.clientHeight+1:false,
              titleOnly:!p,titleMargin:getComputedStyle(card.querySelector('h3')).marginBottom};
          }),overflow:document.documentElement.scrollWidth>innerWidth+1
        }));
        for(const a of state.cards) {
          expect(a.clipped).toBe(false);expect(a.clamp).not.toBe('3');
          if(a.titleOnly) expect(a.titleMargin).toBe('0px');
          for(const b of state.cards.filter(b=>Math.abs(b.top-a.top)<1)) expect(Math.abs(b.bottom-a.bottom)).toBeLessThan(1);
        }
        expect(state.overflow).toBe(false);
        if(batch===8){await page.locator(selector).scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath(`${path==='/news'?'market':'company'}-news-${theme}.png`)});}
      }
    }
  }
});

test('empty watchlist keeps its text and working action without an inner card surface',async({page,isMobile},info)=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:isMobile?390:1440,height:900});
  for(const path of ['/','/watchlist','/stock/AAPL']) {
    await page.goto(path);await dismissPrivacy(page);
    await expect(page.locator('#watch-empty')).toBeVisible();
    const style=await page.locator('#watch-empty').evaluate(e=>{const s=getComputedStyle(e);return{border:s.borderTopWidth,background:s.backgroundColor,radius:s.borderRadius,padding:s.padding};});
    expect(style).toEqual({border:'0px',background:'rgba(0, 0, 0, 0)',radius:'0px',padding:'0px'});
    await expect(page.locator('#watch-empty h3')).toHaveText('No saved stocks yet');
    await expect(page.locator('#watch-empty .button-link')).toHaveAttribute('href','/markets');
    await page.locator('#watch-section').scrollIntoViewIfNeeded();
    await page.screenshot({path:info.outputPath(`watch-empty-${path==='/'?'home':path.split('/')[1]}.png`)});
  }
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze()).violations).toEqual([]);
  await page.locator('#watch-empty .button-link').click();await expect(page).toHaveURL(/\/markets$/);
});
