const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
const fs = require('node:fs');
const path = require('node:path');

// SYNTHETIC TEST DATA ONLY. All provider calls are intercepted by fixtures.cjs;
// these browser-local holdings and responses never reach a financial provider.
const lot = (symbol, quantity = 1) => ({ symbol, quantity, purchasePrice: 100, date: '2020-01-02', currency: 'USD' });
async function visit(page, route) { await page.goto(route); await dismissPrivacy(page); }
async function seed(page, watch = ['AAPL', 'MSFT', 'NVDA'], holdings = [lot('AAPL', 2), lot('MSFT')]) {
  await page.addInitScript(({ watch, holdings }) => {
    if (localStorage.getItem('stocklumo.watch') === null) localStorage.setItem('stocklumo.watch', JSON.stringify(watch));
    if (localStorage.getItem('stocklumo.portfolio') === null) localStorage.setItem('stocklumo.portfolio', JSON.stringify(holdings));
  }, { watch, holdings });
}
async function stored(page, key) { return page.evaluate(key => JSON.parse(localStorage.getItem(key)), key); }
async function expectInlineError(page, input) {
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  const id = await input.getAttribute('id');
  const error = page.locator(`#${id}-error`);
  await expect(error).toBeVisible();
  await expect(error).not.toHaveText('');
  expect((await input.getAttribute('aria-describedby')).split(/\s+/)).toContain(`${id}-error`);
  await expect(page.locator('#research-status')).toHaveAttribute('role', 'alert');
}

test('remote stock search waits for IME commit and resolves the committed query', async ({ page }) => {
  const queries = [];
  await page.route('**/api/data/search?*', async route => {
    queries.push(new URL(route.request().url()).searchParams.get('q'));
    await route.fulfill({ json: { state: 'ok', data: { result: [{ symbol: 'AAPL', description: 'Synthetic committed search', type: 'Common Stock' }] } } });
  });
  await visit(page, '/');
  const search = page.getByRole('searchbox', { name: 'Find a stock', exact: true });
  await search.focus();
  await search.dispatchEvent('compositionstart', { data: '' });
  await search.evaluate(input => {
    input.value = 'あ';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, data: 'あ', inputType: 'insertCompositionText', isComposing: true }));
  });
  // Cross the actual 300 ms debounce while composition remains active.
  await page.waitForTimeout(380);
  expect(queries).toEqual([]);
  await expect(page.locator('#search-results')).toBeHidden();
  await expect(page.locator('#search-status')).toHaveText('');
  await search.evaluate(input => { input.value = 'Apple'; });
  await search.dispatchEvent('compositionend', { data: 'Apple' });
  await expect(page.locator('#search-results a')).toHaveText(/AAPL - Synthetic committed search/);
  expect(queries).toEqual(['Apple']);
  await search.press('ArrowDown');
  await expect(page.locator('#search-results a')).toBeFocused();
});

test('Clear stock search aborts a pending query, keeps focus and rejects its late result', async ({ page }) => {
  await page.addInitScript(() => {
    const original = window.fetch;
    window.__premiumSearchAborted = false;
    window.fetch = function (url, options) {
      if (String(url).includes('/api/data/search?')) options?.signal?.addEventListener('abort', () => { window.__premiumSearchAborted = true; }, { once: true });
      return original.call(this, url, options);
    };
  });
  await visit(page, '/markets');
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let dispatched = 0, completed = false;
  await page.route('**/api/data/search?*', async route => {
    dispatched++;
    await gate;
    try {
      await route.fulfill({ json: { state: 'ok', data: { result: [{ symbol: 'AAPL', description: 'Synthetic late result', type: 'Common Stock' }] } } });
    } catch (error) {
      // An aborted browser request may already be gone when its fixture replies.
      if (!/intercepted|closed|aborted|invalid interception/i.test(error.message)) throw error;
    } finally { completed = true; }
  });
  const search = page.getByRole('searchbox', { name: 'Find a stock', exact: true });
  try {
    await search.fill('Apple');
    await expect.poll(() => dispatched).toBe(1);
    await page.getByRole('button', { name: 'Clear stock search', exact: true }).click();
    await expect(search).toHaveValue('');
    await expect(search).toBeFocused();
    expect(await page.evaluate(() => window.__premiumSearchAborted)).toBe(true);
    release();
    await expect.poll(() => completed).toBe(true);
    await expect(page.locator('#search-results')).toBeHidden();
    await expect(page.locator('#search-results a')).toHaveCount(0);
    await expect(page.locator('#search-status')).toHaveText('');
    await expect(page.getByRole('button', { name: 'Clear stock search', exact: true })).toBeHidden();
  } finally { release(); }
});

test('watchlist keyboard reorder and removal preserve logical focus, status and saved order', async ({ page }) => {
  await seed(page);
  await visit(page, '/watchlist');
  await expect(page.locator('#watch-rows tr')).toHaveCount(3);
  const up = page.getByRole('button', { name: 'Move MSFT up', exact: true });
  await up.focus(); await up.press('Enter');
  expect(await page.locator('#watch-rows tr').evaluateAll(rows => rows.map(row => row.dataset.priceSymbol))).toEqual(['MSFT', 'AAPL', 'NVDA']);
  expect(await stored(page, 'stocklumo.watch')).toEqual(['MSFT', 'AAPL', 'NVDA']);
  await expect(page.getByRole('button', { name: 'Remove MSFT from watchlist', exact: true })).toBeFocused();
  await expect(page.locator('#storage-status')).toHaveText('MSFT moved up. Saved in this browser.');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Remove AAPL from watchlist', exact: true })).toBeFocused();
  await expect(page.locator('#storage-status')).toHaveText('MSFT removed. Saved in this browser.');
  expect(await stored(page, 'stocklumo.watch')).toEqual(['AAPL', 'NVDA']);
  await page.reload();
  await expect(page.locator('#watch-rows tr')).toHaveCount(2);
  expect(await page.locator('#watch-rows tr').evaluateAll(rows => rows.map(row => row.dataset.priceSymbol))).toEqual(['AAPL', 'NVDA']);
  await page.getByRole('button', { name: 'Remove AAPL from watchlist', exact: true }).press('Enter');
  await page.getByRole('button', { name: 'Remove NVDA from watchlist', exact: true }).press('Enter');
  await expect(page.locator('#watch-empty').getByRole('link', { name: /Explore stocks/ })).toBeFocused();
  await expect(page.locator('#storage-status')).toHaveText('NVDA removed. Saved in this browser.');
  expect(await stored(page, 'stocklumo.watch')).toEqual([]);
});

test('earnings invalid date ranges make no API request and identify the focused error inline', async ({ page }) => {
  const requests = [];
  page.on('request', request => { if (new URL(request.url()).pathname.startsWith('/api/research/earnings')) requests.push(request.url()); });
  await visit(page, '/earnings');
  const from = page.getByLabel('From', { exact: true }), to = page.getByLabel('To', { exact: true });
  const run = page.getByRole('button', { name: 'Load earnings', exact: true });
  const today = new Date().toISOString().slice(0, 10);
  await from.fill(''); await run.click(); await expectInlineError(page, from);
  await from.fill(today);
  const previous = new Date(`${today}T00:00:00Z`); previous.setUTCDate(previous.getUTCDate() - 1);
  await to.fill(previous.toISOString().slice(0, 10)); await run.click(); await expectInlineError(page, to);
  const beyond = new Date(`${today}T00:00:00Z`); beyond.setUTCDate(beyond.getUTCDate() + 93);
  await to.fill(beyond.toISOString().slice(0, 10)); await run.click(); await expectInlineError(page, to);
  expect(requests).toEqual([]);
  await page.getByRole('combobox', { name: 'Display', exact: true }).selectOption('reported');
  await expect(page.getByRole('combobox', { name: 'Display', exact: true })).toHaveValue('reported');
  await expect(from).toBeHidden(); await expect(to).toBeHidden();
  await expect(page.locator('#earnings-date-hint')).toBeHidden();
  expect(await from.getAttribute('aria-invalid')).toBeNull();
  expect(await to.getAttribute('aria-invalid')).toBeNull();
});

test('portfolio verification locks conflicting controls and saves exactly one verified lot', async ({ page }) => {
  await seed(page, [], [lot('MSFT')]);
  await visit(page, '/portfolio');
  await expect(page.getByRole('button', { name: 'Save holding', exact: true })).toBeEnabled();
  // Research routes have no spotlight. Wait for the fixed ticker rather than
  // an absent dashboard-only region before delaying this verification.
  await expect(page.locator('#ticker-stocks a')).toHaveCount(8);
  await page.getByLabel('Ticker', { exact: true }).fill('AAPL');
  await page.getByLabel('Quantity', { exact: true }).fill('2');
  await page.getByLabel('Purchase price (per share)', { exact: true }).fill('100');
  await page.getByLabel('Purchase date', { exact: true }).fill('2020-01-02');
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let verifications = 0;
  await page.route('**/api/data/stock/AAPL/profile', async route => {
    verifications++; await gate;
    await route.fulfill({ json: { state: 'ok', data: { ticker: 'AAPL', name: 'Synthetic verification', currency: 'USD' } } });
  });
  try {
    const save = page.getByRole('button', { name: 'Save holding', exact: true });
    await save.click();
    await expect(page.locator('#research-status')).toHaveText('Verifying company and currency...');
    for (const control of await page.locator('#research-controls input, #research-controls select, #research-controls button, [data-holding-action]').all()) await expect(control).toBeDisabled();
    await expect(save).toHaveAttribute('aria-busy', 'true');
    await expect(page.locator('#research-results')).toHaveAttribute('aria-busy', 'true');
    // Even script-generated duplicate activation cannot enter another save.
    await save.dispatchEvent('click');
    await expect.poll(() => verifications).toBe(1);
    expect(await stored(page, 'stocklumo.portfolio')).toEqual([lot('MSFT')]);
    release();
    await expect(page.locator('#research-results tbody tr')).toHaveCount(2);
    await expect(save).toBeEnabled();
    expect(await stored(page, 'stocklumo.portfolio')).toEqual([lot('MSFT'), lot('AAPL', 2)]);
  } finally { release(); }
});

test('removing a preceding or edited portfolio lot never duplicates the edited holding', async ({ page }) => {
  await seed(page, [], [lot('AAPL'), lot('MSFT')]);
  await visit(page, '/portfolio');
  const rows = page.locator('#research-results tbody tr');
  await expect(rows).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Save holding', exact: true })).toBeEnabled();
  await rows.nth(1).getByRole('button', { name: 'Edit', exact: true }).click();
  await page.getByLabel('Quantity', { exact: true }).fill('3');
  await rows.nth(0).getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.getByLabel('Ticker', { exact: true })).toHaveValue('MSFT');
  await page.getByRole('button', { name: 'Update holding', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Save holding', exact: true })).toBeEnabled();
  await expect(rows).toHaveCount(1);
  expect(await stored(page, 'stocklumo.portfolio')).toEqual([lot('MSFT', 3)]);
  await rows.getByRole('button', { name: 'Edit', exact: true }).click();
  await rows.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.getByLabel('Ticker', { exact: true })).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Save holding', exact: true })).toBeVisible();
  expect(await stored(page, 'stocklumo.portfolio')).toEqual([]);
});

test('screener chips, matching count and canonical clear control share the visible dataset', async ({ page }) => {
  await visit(page, '/screener');
  const rows = page.locator('.screener-list tbody tr'), query = page.getByLabel('Company or ticker', { exact: true });
  await expect(rows).toHaveCount(12);
  const providerStatus = await page.locator('#research-status').textContent();
  await query.fill('AAPL');
  await expect(rows).toHaveCount(1);
  await expect(page.locator('.results-summary')).toHaveText('1 of 12 selected companies match.');
  await expect(page.getByRole('table', { name: 'Screened stocks, quotes and fundamentals', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Remove company or ticker filter: AAPL', exact: true }).click();
  await expect(query).toBeFocused(); await expect(query).toHaveValue('');
  await expect(rows).toHaveCount(12);
  await expect(page.locator('.results-summary')).toHaveText('12 of 12 selected companies match.');
  await query.fill('MSFT'); await page.getByRole('button', { name: 'Clear company filter', exact: true }).click();
  await expect(query).toBeFocused(); await expect(rows).toHaveCount(12);
  await expect(page.locator('.filter-chip')).toHaveCount(0);
  await expect(page.locator('#research-status')).toHaveText(providerStatus);
  const more = page.locator('.advanced-filters');
  if ((await more.getAttribute('open')) === null) await more.locator('summary').click();
  const sort = page.getByRole('combobox', { name: 'Sort by', exact: true });
  await sort.selectOption('price'); await expect(sort).toHaveValue('price');
  const order = page.getByRole('combobox', { name: 'Order', exact: true });
  await order.selectOption('desc'); await expect(order).toHaveValue('desc');
  // The browser owns native select popup appearance; selected states are the contract.
  await expect(rows).toHaveCount(12);
});

test('unsaved portfolio edits can be kept or discarded without blocking a clean editor', async ({page},info) => {
  // Two complete edit/keep/discard journeys, including modal audits and captures.
  test.setTimeout(90000);
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(30000);
  for(const theme of ['light','dark']) {
    await visit(page,'/portfolio');
    if(await page.locator('html').getAttribute('data-theme')!==theme) await page.locator('#theme').click();
    await page.getByLabel('Ticker',{exact:true}).fill('AAPL');
    const destination=page.getByRole('navigation',{name:'Footer navigation'}).getByRole('link',{name:'Markets',exact:true});
    await destination.click();
    const dialog=page.getByRole('dialog',{name:'Leave without saving?'});
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button',{name:'Keep editing',exact:true})).toBeFocused();
    // Audit the settled native modal, rather than its 200ms entrance fade.
    await dialog.evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
    await page.screenshot({path:info.outputPath(`unsaved-${theme}.png`)});
    const AxeBuilder=require('@axe-core/playwright').default;
    expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag22aa']).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();await expect(destination).toBeFocused();
    await expect(page.getByLabel('Ticker',{exact:true})).toHaveValue('AAPL');
    await destination.click();await dialog.getByRole('button',{name:'Keep editing',exact:true}).click();
    await expect(dialog).toBeHidden();
    await destination.click();await dialog.getByRole('button',{name:'Discard changes',exact:true}).click();
    await expect(page).toHaveURL(/\/markets$/);
    await visit(page,'/portfolio');
    await page.getByRole('navigation',{name:'Footer navigation'}).getByRole('link',{name:'Markets',exact:true}).click();
    await expect(page).toHaveURL(/\/markets$/);
  }
});

test('premium responsive matrix captures nine populated routes in two themes at six widths', async ({ page, isMobile }, testInfo) => {
  test.skip(isMobile || testInfo.project.name !== 'desktop-chromium', 'The matrix uses one desktop Chromium context with explicit viewport widths.');
  test.setTimeout(600000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await seed(page);
  await page.addInitScript(() => localStorage.setItem('stocklumo.theme', 'light'));
  await page.route('**/api/data/news*', route => route.fulfill({ json: { state: 'ok', data: [
    { headline: 'Synthetic market report for responsive layout verification', source: 'Test fixture publisher', summary: 'This article exists only in an isolated browser fixture.', datetime: 1700000000, url: 'https://example.org/test-report' },
    { headline: 'Second synthetic company report', source: 'Test fixture publisher', summary: 'Synthetic fixture content, never a production market report.', datetime: 1700000100, url: 'https://example.org/test-report-two' }
  ] } }));
  await page.route('**/api/research/earnings?*', route => route.fulfill({ json: { state: 'ok', data: { earningsCalendar: [
    { symbol: 'AAPL', date: new Date().toISOString().slice(0, 10), hour: 'amc', epsEstimate: 1, epsActual: 1.1, revenueEstimate: 1000, revenueActual: 1100 },
    { symbol: 'MSFT', date: new Date().toISOString().slice(0, 10), hour: 'bmo', epsEstimate: 2, epsActual: null, revenueEstimate: 2000, revenueActual: null }
  ] } } }));
  const directory = path.resolve('output/premium-upgrade/final-matrix');
  fs.mkdirSync(directory, { recursive: true });
  const records = [], pageErrors = [];
  page.on('pageerror', error => pageErrors.push(`pageerror: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') pageErrors.push(`console: ${message.text()}`); });
  const routes = ['/', '/markets', '/stock/AAPL', '/watchlist', '/news', '/screener', '/compare', '/portfolio', '/earnings'];
  try {
    for (const width of [360, 390, 768, 1024, 1440, 1920]) for (const theme of ['light', 'dark']) for (const route of routes) {
      const startErrors = pageErrors.length;
      await page.setViewportSize({ width, height: 1000 });
      await visit(page, route);
      if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#theme').click();
      if (route === '/' || route === '/markets') await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
      if (route === '/stock/AAPL') { await expect(page.locator('#company')).toHaveText('Fixture AAPL'); await expect(page.locator('#price')).toHaveText('120.00'); }
      if (route === '/watchlist') await expect(page.locator('#watch-rows tr')).toHaveCount(3);
      if (route === '/news') await expect(page.locator('#news .news-item')).toHaveCount(2);
      if (route === '/screener') await expect(page.locator('.screener-list tbody tr')).toHaveCount(12);
      if (route === '/portfolio') { await expect(page.locator('#research-results tbody tr')).toHaveCount(2); await expect(page.getByRole('button', { name: 'Save holding', exact: true })).toBeEnabled(); }
      if (route === '/compare') { await page.getByRole('button', { name: 'Compare', exact: true }).click(); await expect(page.locator('#research-results tbody tr')).toHaveCount(2); }
      if (route === '/earnings') { await page.getByRole('button', { name: 'Load earnings', exact: true }).click(); await expect(page.locator('#research-results tbody tr')).toHaveCount(2); }
      await page.evaluate(async () => { await document.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); window.scrollTo({ top: 0, behavior: 'instant' }); });
      const metrics = await page.evaluate(() => {
        const visible = node => !!(node.getBoundingClientRect().width && node.getBoundingClientRect().height) && getComputedStyle(node).visibility !== 'hidden';
        return { overflow: document.documentElement.scrollWidth > innerWidth + 1,
          headings: [...document.querySelectorAll('h1')].filter(visible).map(node => node.textContent.trim()),
          tables: [...document.querySelectorAll('table')].filter(visible).map(table => ({ caption: table.querySelector('caption')?.textContent.trim() || '', columnHeaders: table.querySelectorAll('thead th').length })) };
      });
      const filename = `${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${theme}-${width}.png`;
      await page.screenshot({ path: path.join(directory, filename), fullPage: true, animations: 'disabled' });
      const errors = pageErrors.slice(startErrors);
      records.push({ route, theme, width, ...metrics, errors, screenshot: filename });
      expect.soft(metrics.overflow, `${route} ${theme} ${width}: document overflow`).toBe(false);
      expect.soft(metrics.headings.length, `${route} ${theme} ${width}: one visible h1`).toBe(1);
      expect.soft(metrics.headings.every(Boolean), `${route} ${theme} ${width}: named h1`).toBe(true);
      expect.soft(metrics.tables.every(table => table.caption && table.columnHeaders > 0), `${route} ${theme} ${width}: captioned tables with headers`).toBe(true);
      expect.soft(errors, `${route} ${theme} ${width}: uncaught browser errors`).toEqual([]);
    }
    expect(records).toHaveLength(108);
  } finally {
    const manifest = JSON.stringify({ fixture: 'Synthetic isolated browser fixtures only; no live financial data.', captures: records.length, records }, null, 2);
    fs.writeFileSync(path.join(directory, 'matrix.json'), manifest);
    await testInfo.attach('premium-responsive-matrix', { body: manifest, contentType: 'application/json' });
  }
});
