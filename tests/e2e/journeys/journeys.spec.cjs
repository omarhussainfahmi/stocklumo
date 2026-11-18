const { test, expect, dismissPrivacy } = require('../support/fixtures.cjs');
const AxeBuilder = require('@axe-core/playwright').default;
async function visit(page, path) { await page.goto(path); await dismissPrivacy(page); }

test('research pages initialize ticker and search without dashboard scaffolding or universe requests', async ({ page }) => {
  const universeRequests = [];
  page.on('request', request => { if (new URL(request.url()).pathname === '/api/universe') universeRequests.push(request.url()); });
  for (const path of ['/screener', '/compare', '/portfolio', '/earnings']) {
    await visit(page, path);
    await expect(page.locator('#research')).toBeVisible();
    await expect(page.locator('#ticker-stocks .ticker-stock')).toHaveCount(8);
    await expect(page.locator('#overview, #discover, #workspace-summary, #market-pulse, .intro')).toHaveCount(0);
    await expect(page.getByRole('searchbox', { name: 'Find a stock' })).toBeVisible();
  }
  expect(universeRequests).toEqual([]);
});

test('overview reflow keeps discovery and footer research navigation functional', async ({ page, isMobile }) => {
  if (!isMobile) await page.setViewportSize({ width: 1920, height: 1080 });
  await visit(page, '/');
  await expect(page.locator('#workspace-summary')).toBeVisible();
  expect(await page.locator('#workspace-summary').evaluate(e=>e.getBoundingClientRect().top >= document.querySelector('#market-content').getBoundingClientRect().bottom)).toBe(true);
  await expect(page.locator('.market-workspace #toolkit')).toBeVisible();
  await expect(page.locator('#ticker-stocks .ticker-stock')).toHaveCount(8);
  await expect(page.locator('#spotlight .spotlight-stock')).toHaveCount(8);
  await visit(page, '/markets');
  await expect(page.locator('.market-workspace #discover')).toBeVisible();
  await page.getByRole('button', { name: 'More stocks', exact: true }).click();
  await expect(page.locator('#discover a[href="/stock/COST"]')).toBeVisible();
  await page.getByRole('button', { name: 'Fewer stocks', exact: true }).click();
  await expect(page.locator('#discover a[href="/stock/COST"]')).toBeHidden();
  await page.getByRole('navigation', { name: 'Footer research tools' }).getByRole('link', { name: 'Compare stocks', exact: true }).click();
  await expect(page).toHaveURL(/\/compare$/);
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(2);
});

test('policy section links keep their headings below sticky navigation', async ({ page, isMobile }) => {
  // Walk every anchor across two documents; retain the original per-action cap.
  test.setTimeout(90000);
  page.setDefaultTimeout(30000);
  page.setDefaultNavigationTimeout(30000);
  if (!isMobile) await page.setViewportSize({ width: 1024, height: 768 });
  for (const path of ['/privacy', '/terms']) {
    await visit(page, path);
    const links = page.locator('.policy-index a');
    for (let i = 0; i < await links.count(); i++) {
      const id = await links.nth(i).getAttribute('href');
      await links.nth(i).click();
      await expect(page.locator(id)).toBeVisible();
      const target = await page.locator(id).boundingBox(), header = await page.locator('.header').boundingBox();
      expect(target.y).toBeGreaterThanOrEqual(header.y + header.height - 1);
    }
  }
});

test('populated views remain accessible and contained in both themes', async ({ page, isMobile }, testInfo) => {
  test.setTimeout(90000);
  if (!isMobile) await page.setViewportSize({ width: 768, height: 1024 });
  // Synthetic test-only state and provider responses. Never application data.
  await page.addInitScript(() => {
    localStorage.setItem('stocklumo.watch', JSON.stringify(['AAPL', 'MSFT']));
    localStorage.setItem('stocklumo.portfolio', JSON.stringify([
      { symbol: 'AAPL', currency: 'USD', quantity: 2, purchasePrice: 100, date: '2020-01-02' },
      { symbol: 'MSFT', currency: 'USD', quantity: 1, purchasePrice: 110, date: '2020-01-02' }
    ]));
  });
  await page.route('**/api/data/news', route => route.fulfill({ json: { state: 'ok', data: [
    { headline: 'Synthetic test headline with a longer company and market context', source: 'Test publisher', summary: 'Synthetic content for validating a populated news layout.', datetime: 1700000000, url: 'https://example.org/test-story-one' },
    { headline: 'Second synthetic test headline', source: 'Test publisher', summary: 'Synthetic content used only inside an isolated browser test.', datetime: 1700000100, url: 'https://example.org/test-story-two' }
  ] } }));
  await page.route('**/api/research/earnings?*', route => route.fulfill({ json: { state: 'ok', data: { earningsCalendar: [
    { symbol: 'AAPL', date: new Date().toISOString().slice(0, 10), hour: 'amc', epsEstimate: 1, epsActual: 1.1, revenueEstimate: 1000, revenueActual: 1100 },
    { symbol: 'MSFT', date: new Date().toISOString().slice(0, 10), hour: 'bmo', epsEstimate: 2, epsActual: null, revenueEstimate: 2000, revenueActual: null }
  ] } } }));
  for (const theme of ['dark', 'light']) {
    for (const path of ['/news', '/watchlist', '/portfolio', '/compare', '/earnings']) {
      await visit(page, path);
      if (await page.locator('html').getAttribute('data-theme') !== theme) {
        await page.locator('#theme').click();
        // Audit settled theme colors, rather than the 120ms background transition.
        await page.locator('#theme').evaluate(element => Promise.all(
          element.getAnimations({subtree:true})
            .filter(animation => animation.effect?.getTiming().iterations !== Infinity)
            .map(animation => animation.finished.catch(() => {}))
        ));
      }
      if (path === '/news') await expect(page.locator('#news .news-item')).toHaveCount(2);
      if (path === '/watchlist') await expect(page.locator('#watch-rows tr')).toHaveCount(2);
      if (path === '/portfolio') await expect(page.locator('#research-results tbody tr')).toHaveCount(2);
      if (path === '/compare') {
        await page.getByRole('button', { name: 'Compare', exact: true }).click();
        await expect(page.locator('#research-results tbody tr')).toHaveCount(2);
      }
      if (path === '/earnings') {
        await page.getByRole('button', { name: 'Load earnings', exact: true }).click();
        await expect(page.locator('#research-results tbody tr')).toHaveCount(2);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      // Form focus can scroll the nonsticky research bar partly under the sticky
      // header. Audit a stable viewport rather than that transient intersection.
      await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(audit.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
      await page.screenshot({ path: testInfo.outputPath(`populated-${theme}-${path.slice(1)}.png`), fullPage: true });
    }
  }
});

test('search supports keyboard navigation to stock details and watchlist persistence', async ({ page }) => {
  await visit(page, '/');
  await page.getByRole('searchbox', { name: 'Find a stock' }).fill('Apple');
  const result = page.locator('#search-results a');
  await expect(result).toHaveCount(1);
  await page.getByRole('searchbox').press('ArrowDown');
  await expect(result).toBeFocused();
  await result.press('Enter');
  await expect(page).toHaveURL(/\/stock\/AAPL$/);
  await expect(page.locator('#company')).toHaveText('Fixture AAPL');
  await page.getByRole('button', { name: 'Add to watchlist', exact: true }).click();
  await page.goto('/watchlist');
  await expect(page.locator('#watch-rows')).toContainText('AAPL');
  await page.reload();
  await expect(page.locator('#watch-rows')).toContainText('AAPL');
});

test('theme persists and compact navigation opens, escapes and reaches research', async ({ page, isMobile }) => {
  await visit(page, '/');
  const theme = page.locator('#theme'), original = await page.locator('html').getAttribute('data-theme');
  await theme.click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', original === 'dark' ? 'light' : 'dark');
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await expect(page.locator('#navigation-toggle')).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.locator('#navigation-toggle')).toBeFocused();
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.locator('#site-navigation').getByRole('link', { name: 'Stock screener', exact: true }).click();
  } else await page.getByRole('navigation', { name: 'Footer research tools' }).getByRole('link', { name: 'Stock screener', exact: true }).click();
  await expect(page).toHaveURL(/\/screener$/);
});

test('screener filters, resets and restores a saved preset', async ({ page }) => {
  await visit(page, '/screener');
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
  await page.getByLabel('Company or ticker', { exact: true }).fill('AAPL');
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Save preset', exact: true }).click();
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
  await page.getByRole('button', { name: 'Load preset', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.getByLabel('Company or ticker', { exact: true }).fill('No such fixture company');
  await expect(page.locator('#research-results')).toContainText('No matches');
});

test('phone screener discloses advanced filters without losing their values', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await visit(page, '/screener');
  const more = page.locator('.advanced-filters > summary');
  const minimum = page.getByLabel('Min. price (USD)', { exact: true });
  await expect(minimum).toBeHidden();
  await more.focus();
  await page.keyboard.press('Enter');
  await minimum.fill('121');
  await expect(page.locator('#research-results')).toContainText('No matches');
  await more.click();
  await expect(more).toHaveText('More filters · 1 active');
  await page.getByRole('button', { name: 'Save preset', exact: true }).click();
  await page.getByRole('button', { name: 'Reset filters', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
  await page.getByRole('button', { name: 'Load preset', exact: true }).click();
  await expect(page.locator('#research-results')).toContainText('No matches');
  await more.click();
  await expect(minimum).toHaveValue('121');
  await more.click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(minimum).toBeVisible();
});

test('homepage headline fits two lines on narrow phones and zero changes remain neutral', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await visit(page, '/');
  const geometry = await page.locator('#page-title').evaluate(title => ({
    height: title.getBoundingClientRect().height, line: parseFloat(getComputedStyle(title).lineHeight)
  }));
  expect(geometry.height / geometry.line).toBeLessThanOrEqual(2.05);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.route('**/api/research/stock/*', async route => {
    const symbol = new URL(route.request().url()).pathname.split('/').at(-1);
    await route.fulfill({ json: { symbol, currency: 'USD', price: 120, changePercent: 0, state: 'ok' } });
  });
  await visit(page, '/compare');
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  const changes = page.locator('#research-results tbody tr td:nth-child(3) span');
  await expect(changes).toHaveCount(2);
  for (const change of await changes.all()) {
    await expect(change).toHaveText('0');
    await expect(change).toHaveClass('muted');
  }
});

test('portfolio validates, saves, edits and removes an isolated practice holding', async ({ page }) => {
  await visit(page, '/portfolio');
  await page.getByRole('button', { name: 'Save holding', exact: true }).click();
  await expect(page.getByLabel('Ticker', { exact: true })).toBeFocused();
  await expect(page.getByLabel('Ticker', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await page.getByLabel('Ticker', { exact: true }).fill('AAPL');
  await page.getByLabel('Quantity', { exact: true }).fill('2');
  await page.getByLabel('Purchase price (per share)', { exact: true }).fill('100');
  await page.getByRole('button', { name: 'Save holding', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(1);
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  await page.getByLabel('Quantity', { exact: true }).fill('3');
  await page.getByRole('button', { name: /Save|Update/ }).filter({ hasText: /holding/ }).click();
  await expect(page.locator('#research-results tbody tr')).toContainText('3');
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.locator('#research-results')).toContainText('No practice holdings');
});

test('comparison validates stock selection and shows honest snapshot data', async ({ page }) => {
  await visit(page, '/compare');
  await page.getByLabel('Tickers (comma-separated)', { exact: true }).fill('AAPL');
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  await expect(page.locator('#research-status')).toHaveAttribute('role', 'alert');
  await page.getByLabel('Tickers (comma-separated)', { exact: true }).fill('AAPL, MSFT');
  await page.getByRole('button', { name: 'Compare', exact: true }).click();
  await expect(page.locator('#comparison-range-help')).toContainText('Historical prices are unavailable');
  await expect(page.locator('.research-chart')).toHaveCount(0);
});

test('earnings filters the watchlist and keeps empty results explicit', async ({ page }) => {
  await visit(page, '/earnings');
  await page.getByRole('combobox', { name: 'Filter', exact: true }).selectOption('watch');
  await page.getByRole('button', { name: 'Load earnings', exact: true }).click();
  await expect(page.locator('#research-results')).toContainText('No matching stocks');
  await page.getByRole('combobox', { name: 'Display', exact: true }).selectOption('reported');
  await page.getByRole('combobox', { name: 'Filter', exact: true }).selectOption('all');
  await page.getByRole('button', { name: 'Load earnings', exact: true }).click();
  await expect(page.getByLabel('Ticker (optional)', { exact: true })).toHaveAttribute('aria-invalid', 'true');
});

test('stock chart keyboard inspection and unavailable historical range remain usable', async ({ page }) => {
  await visit(page, '/stock/AAPL');
  await expect(page.locator('#price')).toHaveText('120.00');
  await page.locator('#chart').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#chart-value')).toContainText('120');
});

test('rate-limited research stays unavailable and recovers on explicit retry', async ({ page }) => {
  await page.route('**/api/research/stock/*', route => route.fulfill({ status: 429, json: { message: 'Test request limit' } }));
  await visit(page, '/screener');
  await expect(page.locator('#research-status')).toContainText(/missing data.*Retry in a minute if limited/i);
  await expect(page.locator('#research-results tbody tr')).toHaveCount(0);
  // Remove the override only; the shared API fixture still serves isolated data.
  await page.unroute('**/api/research/stock/*');
  await page.getByRole('button', { name: 'Refresh data', exact: true }).click();
  await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
});

test('date controls stay within their frames and sticky navigation remains reachable', async ({ page }) => {
  for (const path of ['/portfolio', '/earnings']) {
    await visit(page, path);
    const dates = page.locator('input[type="date"]');
    await expect(dates.first()).toBeVisible();
    for (const input of await dates.all()) {
      const rect = await input.boundingBox(), frame = await input.locator('..').boundingBox();
      expect(rect.x).toBeGreaterThanOrEqual(frame.x);
      expect(rect.x + rect.width).toBeLessThanOrEqual(frame.x + frame.width + 1);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    }
    await page.locator('.footer').scrollIntoViewIfNeeded();
    // WebKit's visual viewport can differ slightly from layout coordinates
    // during scroll. Check that the controls are fully reachable instead.
    await expect(page.locator('.header .brand')).toBeInViewport({ ratio: 1 });
    await expect(page.locator('#theme')).toBeInViewport({ ratio: 1 });
  }
});

test('sitemap, robots and social preview resolve; disabled analysis remains absent', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toContain('/technical');
  for (const path of ['/robots.txt', '/images/stocklumo-share.png', '/images/favicon-32.png']) {
    expect((await request.get(path)).ok()).toBe(true);
  }
  expect((await request.get('/technical')).status()).toBe(404);
});

test('loading deferred scripts does not move the main content below the header', async ({ page }) => {
  let release;
  const ready = new Promise(resolve => { release = resolve; });
  await page.route('**/js/*.js*', async route => {
    // The tiny parser-time theme bootstrap must run before styles/markup. Hold
    // deferred enhancement scripts, rather than deadlocking the HTML parser.
    if (!new URL(route.request().url()).pathname.endsWith('/theme-init.js')) await ready;
    await route.continue();
  });
  await page.goto('/', { waitUntil: 'commit' });
  await expect(page.locator('.header')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /^(light|dark)$/);
  const before = await page.locator('main').boundingBox();
  release();
  await page.waitForLoadState('load');
  await dismissPrivacy(page);
  await expect(page.locator('#ticker-stocks a')).toHaveCount(8);
  const after = await page.locator('main').boundingBox();
  expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(1);
});

test('laptop ticker and primary action fit, and hero search stays readable in both themes', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Phone tickers intentionally scroll within their strip.');
  await page.setViewportSize({ width: 1280, height: 720 });
  for (const theme of ['light', 'dark']) {
    await page.addInitScript(theme => localStorage.setItem('stocklumo.theme', theme), theme);
    await visit(page, '/');
    await expect(page.locator('#ticker-stocks a')).toHaveCount(8);
    const geometry = await page.evaluate(async () => {
      await document.fonts.ready;
      const ticker = document.querySelector('#ticker-stocks');
      return { tickerWidth: ticker.clientWidth, tickerContent: ticker.scrollWidth,
        actionBottom: document.querySelector('#intro-actions .primary').getBoundingClientRect().bottom };
    });
    expect(geometry.tickerContent).toBeLessThanOrEqual(geometry.tickerWidth + 1);
    expect(geometry.actionBottom).toBeLessThanOrEqual(720);
    await page.getByRole('searchbox', { name: 'Find a stock', exact: true }).fill('Apple');
    await expect(page.locator('#search-results a')).toBeVisible();
    await page.locator('#search-results a').hover();
    const contrast = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    expect(contrast.violations).toEqual([]);
  }
});

test('small-phone privacy choices stay compact and dismissal grants no consent', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const panel = page.locator('#privacy-panel');
    await expect(panel).toBeVisible();
    await expect(page.locator('.privacy-backdrop')).toBeVisible();
    expect(await page.locator('main').evaluate(node => node.inert)).toBe(true);
    await page.getByRole('button', { name: 'Close privacy notice', exact: true }).focus();
    await page.keyboard.press('Tab');
    await expect(panel.getByRole('link', { name: 'Privacy policy' })).toBeFocused();
    await page.evaluate(() => document.fonts.ready);
    const box = await panel.boundingBox();
    expect(box.height).toBeLessThanOrEqual(200);
    expect(box.x).toBeGreaterThanOrEqual(12);
    expect(box.x + box.width).toBeLessThanOrEqual(width - 11);
    await page.getByRole('button', { name: 'Close privacy notice', exact: true }).press('Enter');
    await expect(panel).toBeHidden();
    await expect(page.locator('.privacy-backdrop')).toBeHidden();
    expect(await page.locator('main').evaluate(node => node.inert)).toBe(false);
    expect(await page.evaluate(() => localStorage.getItem('stocklumo.privacy'))).toBeNull();
    expect(await page.locator('#cloudflare-analytics').count()).toBe(0);
    await page.getByRole('button', { name: 'Cookie settings', exact: true }).click();
    await expect(panel).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(panel).toBeHidden();
    await expect(page.getByRole('button', { name: 'Cookie settings', exact: true })).toBeFocused();
  }
});

test('home hero keeps readable local colors and the sticky shortcut yields to its actions', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const theme of ['light', 'dark']) {
    await page.addInitScript(theme => localStorage.setItem('stocklumo.theme', theme), theme);
    await visit(page, '/');
    const colors = await page.evaluate(() => ['#page-title', '.intro .search label', '#intro-actions .button-link:not(.primary)']
      .map(selector => getComputedStyle(document.querySelector(selector)).color));
    const ink = theme === 'light' ? 'rgb(16, 42, 67)' : 'rgb(238, 246, 255)';
    expect(colors).toEqual([ink, ink, ink]);
    await page.locator('#intro-actions').scrollIntoViewIfNeeded();
    await expect(page.locator('.mobile-action')).toBeHidden();
    await page.locator('#workspace-summary').evaluate(node => node.scrollIntoView({ block: 'start' }));
    await expect(page.locator('.mobile-action')).toBeVisible();
    expect(await page.locator('html').getAttribute('data-theme')).toBe(theme);
  }
});
