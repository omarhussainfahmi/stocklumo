const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;

// Isolated synthetic quotes only; no fixture values ship to the application.
test('discovery ranks valid USD quotes by price and expands to forty companies without changing the ticker or spotlight', async ({ page }) => {
  const requests = [];
  await page.route('**/api/data/stock/*/quote', async route => {
    const symbol = new URL(route.request().url()).pathname.split('/')[4]; requests.push(symbol);
    const c = symbol === 'BRK.A' ? 700000 : symbol === 'BKNG' ? 5000 : symbol === 'MSFT' ? 500 : symbol === 'AAPL' ? 200 : symbol === 'FICO' ? 0 : 100;
    const t = Math.floor(Date.now()/1000) + (symbol === 'AZO' ? 3600 : 0);
    await route.fulfill({ json: { state:'ok', data:{c,pc:c-1,o:c,h:c,l:c,t} } });
  });
  await page.goto('/'); await dismissPrivacy(page);
  await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
  await expect(page.locator('#explore-grid a')).toHaveCount(40);
  expect(requests).not.toContain('BRK.A');
  // Quote ages keep advancing independently of discovery expansion. Compare
  // identities and quote values rather than the ticking relative-age label.
  const tickerSnapshot = () => page.locator('#ticker-stocks a').evaluateAll(links => links.map(link => ({
    href: link.getAttribute('href'),
    symbol: link.querySelector('strong').textContent,
    price: link.querySelector('.last').textContent,
    change: link.querySelector('.delta').textContent,
  })));
  const ticker = await tickerSnapshot();
  const spotlight = await page.locator('#spotlight h3').allTextContents();
  await page.locator('#discover').scrollIntoViewIfNeeded();
  await expect(page.locator('#explore-grid')).toHaveAttribute('aria-busy','false');
  await page.getByRole('button',{name:'More stocks',exact:true}).click();
  await expect(page.locator('#explore-grid a:visible')).toHaveCount(40);
  await expect(page.locator('#discover-status')).toContainText('38 of 40 priced');
  const ranked=page.locator('#explore-grid a');
  await expect(ranked.first()).toHaveAttribute('href','/stock/BRK.A');
  await expect(ranked.nth(1)).toHaveAttribute('href','/stock/BKNG');
  for(const symbol of ['FICO','AZO']) {
    const card=page.locator(`#explore-grid a[href="/stock/${symbol}"]`);
    await expect(card).toHaveAttribute('aria-label',/^Unranked\./);
    await expect(card.locator('.discovery-price')).toHaveText('Price unavailable');
  }
  const values=await page.locator('#explore-grid .discovery-price').allTextContents();
  const prices=values.filter(v=>v.endsWith(' USD')).map(v=>Number(v.replace(/[^\d.]/g,'')));
  expect(prices).toEqual([...prices].sort((a,b)=>b-a));
  expect(await tickerSnapshot()).toEqual(ticker);
  expect(await page.locator('#spotlight h3').allTextContents()).toEqual(spotlight);
  await page.getByRole('button',{name:'Fewer stocks',exact:true}).click();
  await expect(page.locator('#explore-grid a:visible')).toHaveCount(12);
  await page.getByRole('button',{name:'More stocks',exact:true}).click();
  await expect(page.locator('#discover-status')).toContainText('38 of 40 priced');
  expect(requests.filter(s=>s==='BRK.A')).toHaveLength(1);
});

test('discovery stops at a provider limit and retries only on explicit request', async ({page}) => {
  const extra=[];
  await page.route('**/api/data/stock/*/quote',async route=>{
    const symbol=new URL(route.request().url()).pathname.split('/')[4];
    if(['COST','NFLX','AMD','AVGO'].includes(symbol)) {
      extra.push(symbol); await route.fulfill({json:{state:'limited',message:'Synthetic provider limit'}});
    } else await route.fallback();
  });
  await page.goto('/markets');await dismissPrivacy(page);
  await expect(page.locator('#ticker-stocks a')).toHaveCount(8);
  await page.locator('#discover').scrollIntoViewIfNeeded();
  await expect(page.locator('#discover-status')).toContainText('12 of 12 priced');
  expect(extra).toEqual([]);
  await page.getByRole('button',{name:'More stocks',exact:true}).click();
  await expect(page.locator('#discover-status')).toContainText('Price limit reached');
  await expect(page.locator('#explore-grid a[href="/stock/COST"] .discovery-price')).toHaveText('Not loaded');
  expect(extra).toEqual(['COST']);
  await page.getByRole('button',{name:'Retry prices',exact:true}).focus();
  await page.getByRole('button',{name:'Retry prices',exact:true}).press('Enter');
  await expect(page.getByRole('button',{name:'Retry prices',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'Retry prices',exact:true})).toBeFocused();
  expect(extra).toEqual(['COST','COST']);
});

test('summary cards stay centered and the wider snapshot pairs with stacked desktop research cards in both themes', async ({page,isMobile},info)=>{
  test.setTimeout(120000); // Eight viewport/theme captures and axe scans per browser.
  await page.emulateMedia({reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  // Keep phone profiles at phone portrait/landscape widths. The separate
  // desktop WebKit project retains every original desktop-width assertion.
  const sizes = isMobile ? [[390,844],[844,390],[768,1024]] : [[1920,1080],[1440,1000],[768,1024],[390,844]];
  for(const [width,height] of sizes) {
    await page.setViewportSize({width,height});await page.goto('/');await dismissPrivacy(page);
    await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
    for(const theme of ['light','dark']) {
      if(await page.locator('html').getAttribute('data-theme')!==theme) await page.locator('#theme').click();
      await expect(page.locator('#hero-skip')).toHaveCount(0);
      await page.locator('#workspace-summary').scrollIntoViewIfNeeded();
      const state=await page.evaluate(()=>{
        const cards=[...document.querySelectorAll('#toolkit .tool-grid > a')].map(e=>e.getBoundingClientRect());
        return {overflow:document.documentElement.scrollWidth>innerWidth+1,
          values:[...document.querySelectorAll('.workspace-summary dd:not(.summary-note)')].map(e=>getComputedStyle(e).textAlign),
          labels:[...document.querySelectorAll('.workspace-summary dt')].map(e=>getComputedStyle(e).justifyContent),
          snapshotWidth:document.querySelector('#market-pulse').getBoundingClientRect().width,
          snapshotBottom:document.querySelector('#market-pulse').getBoundingClientRect().bottom,
          toolsBottom:cards.at(-1).bottom,
          snapshotBottomPadding:parseFloat(getComputedStyle(document.querySelector('#market-pulse')).paddingBottom),
          snapshotCaptionMargin:parseFloat(getComputedStyle(document.querySelector('#market-pulse > .caption')).marginBottom),
          toolkitWidth:document.querySelector('#toolkit').getBoundingClientRect().width,
          columns:cards.filter(r=>Math.abs(r.top-cards[0].top)<2).length};
      });
      expect(state.overflow).toBe(false);expect(state.values.every(x=>x==='center')).toBe(true);
      expect(state.labels.every(x=>x==='center')).toBe(true);
      expect(state.columns).toBe(width>1100?1:state.toolkitWidth>480?2:1);
      if(width>1100) {
        expect(state.snapshotWidth/state.toolkitWidth).toBeGreaterThan(1.8);
        expect(Math.abs(state.snapshotBottom-state.toolsBottom)).toBeLessThan(1);
      }
      expect(state.snapshotBottomPadding).toBe(14);expect(state.snapshotCaptionMargin).toBe(0);
      await page.screenshot({path:info.outputPath(`summary-tools-${width}-${theme}.png`)});
      await page.locator('#discover').scrollIntoViewIfNeeded();
      await page.screenshot({path:info.outputPath(`discovery-${width}-${theme}.png`)});
      expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze()).violations).toEqual([]);
    }
  }
  expect(errors).toEqual([]);
});
