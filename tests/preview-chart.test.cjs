const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');

test('watchlist row refresh retries a failed captured trend and reuses a valid one', async t => {
  const dom = new JSDOM('<main id="main"><div class="table-wrap"><table><tbody id="watch-rows"><tr data-price-symbol="AAPL"><td>AAPL</td></tr></tbody></table></div></main>', {
    url: 'https://example.test/watchlist', runScripts: 'outside-only',
  });
  const w = dom.window;
  t.after(() => w.close());
  w.HTMLElement.prototype.getClientRects = () => [{}];
  let calls = 0;
  w.fetch = async path => ({ ok: true, json: async () => {
    if (path.endsWith('/status')) return { localOnly: true, symbols: ['AAPL'], capturedAt: '2026-01-01' };
    calls++;
    return calls === 1 ? { state: 'unavailable' } : { state: 'ok', data: {
      s: 'ok', localOnly: true, t: [1700000000, 1700086400], c: [10, 11],
    } };
  } });
  w.eval(require('./support/browser-scripts.cjs').previewScripts());
  const rows = w.document.getElementById('watch-rows');
  const refresh = async () => {
    rows.innerHTML = '<tr data-price-symbol="AAPL"><td><span class="trend"></span></td></tr>';
    await w.StocklumoPreviewWatch.render('AAPL', rows.querySelector('.trend'));
  };
  await refresh();
  assert.equal(calls, 1);
  assert.equal(rows.querySelector('.watch-price-trend'), null);
  await refresh();
  assert.ok(rows.querySelector('.watch-price-trend'));
  assert.equal(calls, 2);
  await refresh();
  assert.ok(rows.querySelector('.watch-price-trend'));
  assert.equal(calls, 2);
});

test('captured chart retries failures while deduplicating pending and valid results', async t => {
  const dom = new JSDOM('<body></body>', { url: 'https://example.test', runScripts: 'outside-only' });
  t.after(() => dom.window.close());
  let calls = 0;
  dom.window.fetch = async path => ({ ok: true, json: async () => {
    if (path.includes('/status')) return null;
    calls++;
    return calls === 1 ? { state: 'unavailable' } : { state: 'ok', data: {
      s: 'ok', localOnly: true, t: [1700000000, 1700086400], c: [10, 11],
    } };
  } });
  dom.window.eval(require('./support/browser-scripts.cjs').previewScripts());
  const first = dom.window.StocklumoPreviewChart('AAPL', '1M');
  assert.equal(dom.window.StocklumoPreviewChart('AAPL', '1M'), first);
  await first;
  const retry = dom.window.StocklumoPreviewChart('AAPL', '1M');
  assert.notEqual(retry, first);
  assert.equal((await retry).data.c.length, 2);
  assert.equal(dom.window.StocklumoPreviewChart('AAPL', '1M'), retry);
  assert.equal(calls, 2);
});

test('captured chart owns its host, preserves fallback markup and supports keyboard observation', t => {
  const dom = new JSDOM('<body data-symbol="AAPL"><div class="price-panel"><div id="host"></div><div class="plot">Session chart</div></div></body>', {
    url: 'https://example.test/stock/AAPL', runScripts: 'outside-only'
  });
  const w = dom.window;
  t.after(() => w.close());
  w.fetch = async () => ({ ok: true, json: async () => null });
  w.eval(require('./support/browser-scripts.cjs').previewScripts());
  const host = w.document.getElementById('host');
  const data = { s: 'ok', localOnly: true, t: [1577836800, 1577923200, 1578009600],
    c: [11, 10, 12], o: [10, 11, 10], h: [12, 12, 13], l: [9, 9, 9], v: [0, 10, 20],
    resolution: 'daily', adjustment: 'unadjusted', capturedAt: '2020-01-05T00:00:00Z' };
  const renderer = w.StocklumoPreviewRenderer;
  assert.equal(renderer.render(host, data), true);
  assert.equal(host.querySelectorAll('.history-up, .history-down').length, 3);
  assert.equal(host.querySelectorAll('.history-volume').length, 3);
  assert.equal(w.document.querySelector('.plot').hidden, false);
  const chart = host.querySelector('.history-price-chart');
  chart.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Home', cancelable: true }));
  assert.equal(host.querySelector('input').value, '0');
  assert.match(host.querySelector('output').textContent, /C 11 USD.*0 shares/);
  chart.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
  assert.equal(host.querySelector('input').value, '1');
  host.querySelector('[data-chart-view="line"]').click();
  assert.ok(host.querySelector('.history-line'));
  renderer.loading();
  assert.equal(host.querySelector('figure').getAttribute('aria-busy'), 'true');
  assert.equal(renderer.render(host, { ...data, t: [] }), false);
  assert.equal(host.querySelector('figure').hidden, true);
  assert.equal(w.document.querySelector('.plot').hidden, false);
});
