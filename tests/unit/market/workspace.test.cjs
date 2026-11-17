const {test} = require("node:test");
const assert = require("node:assert/strict");
const {page} = require("../../support/market-page.cjs");
const {flushTasks: settle} = require("../../browser-async.cjs");

test("spotlight subscribes to real symbols and renders incoming prices", async () => {
  const dom = page({ dashboard: true });
  await settle();
  const stream = dom.streams.at(-1);
  assert.match(decodeURIComponent(stream.url), /AAPL,MSFT,NVDA/);
  assert.equal(dom.requests.some(url => url.includes("/indices")), false);
  stream.onmessage({ data: JSON.stringify({ status: "connected", message: "Connected", stocks: [{ symbol: "NVDA", price: 123.45, changePercent: 1.5, updatedAt: new Date().toISOString() }] }) });
  const card = dom.window.document.querySelector('#spotlight [data-price-symbol="NVDA"]');
  assert.equal(card.querySelector('.last').textContent, '123.45 USD');
  assert.equal(card.querySelector('.delta').textContent, '+1.50%');
  assert.match(card.querySelector('.age').textContent, /s ago/);
  assert.equal(dom.window.document.querySelector('#ticker-stocks [data-price-symbol="NVDA"] .last').textContent, '123.45 USD');
  assert.equal(dom.window.document.getElementById('connection').dataset.state, 'closed');
  stream.onerror();
  assert.equal(dom.window.document.getElementById('connection').dataset.state, 'disconnected');
  dom.window.close();
});

test("explore more reveals and collapses the additional companies", async () => {
  const dom = page({ dashboard: true });
  await settle();
  const button = dom.window.document.getElementById('more-stocks');
  const extras = [...dom.window.document.querySelectorAll('.explore-extra')];
  assert.equal(extras.length, 28);
  assert.ok(extras.every(link => link.hidden));
  button.click();
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.ok(extras.every(link => !link.hidden));
  button.click();
  assert.ok(extras.every(link => link.hidden));
  await settle(); // Allow the one in-flight discovery quote to finish before closing its document.
  dom.window.close();
});

test("market snapshot uses existing quotes, a shared scale and honest unavailable states", async () => {
  const dom = page({ dashboard: true, storedWatch: ["AAPL"] });
  await settle();
  const d = dom.window.document;
  assert.equal(d.getElementById("summary-quotes").textContent, "8 / 8");
  assert.equal(d.querySelectorAll("#spotlight .spotlight-stock").length, 8);
  assert.equal(d.getElementById("summary-universe").textContent, "5,000");
  assert.equal(d.getElementById("summary-change").textContent, "+11.11%");
  assert.equal(d.getElementById("summary-watch").textContent, "1");
  const count = dom.requests.length;
  dom.streams.at(-1).onmessage({ data: JSON.stringify({ status: "connected", stocks: [
    { symbol: "AAPL", price: 100, changePercent: -2, updatedAt: new Date().toISOString() },
    { symbol: "MSFT", price: 200, changePercent: 4, updatedAt: new Date().toISOString() },
    { symbol: "TSLA", price: 100, changePercent: 0, updatedAt: new Date().toISOString() }
  ] }) });
  const rows = d.querySelectorAll(".pulse-row");
  assert.equal(rows.length, 8);
  assert.equal(d.getElementById("summary-universe").textContent, "5,000");
  assert.equal(d.getElementById("summary-change").textContent, "+7.19%");
  assert.equal(rows[0].querySelector("span").textContent, "-2.00%");
  assert.equal(rows[1].querySelector("span").textContent, "+4.00%");
  assert.equal(Number(rows[1].querySelector("rect").getAttribute("width")), 2 * Number(rows[0].querySelector("rect").getAttribute("width")));
  assert.equal(rows[0].querySelector("a").getAttribute("href"), "/stock/AAPL");
  assert.equal(rows[0].querySelector("svg").getAttribute("preserveAspectRatio"), "none");
  assert.equal(rows[0].querySelector("rect").getAttribute("height"), "24");
  const coverage = d.getElementById("universe-coverage");
  assert.equal(coverage.hidden, false);
  assert.equal(coverage.open, false);
  assert.match(coverage.textContent, /2026-10-16 10:00:00 UTC/);
  assert.match(coverage.textContent, /quote access varies/);
  assert.equal(dom.requests.length, count);
  dom.window.close();
  const missing = page({ dashboard: true, missing: true });
  await settle();
  assert.equal(missing.window.document.getElementById("summary-quotes").textContent, "-");
  assert.equal(missing.window.document.getElementById("summary-change").textContent, "-");
  for (const id of ["summary-universe", "summary-exchanges"])
    assert.equal(missing.window.document.getElementById(id).textContent, "-");
  assert.equal(missing.window.document.querySelectorAll(".pulse-row rect").length, 0);
  assert.ok([...missing.window.document.querySelectorAll(".pulse-row span")].every(n => n.textContent === "Unavailable"));
  missing.window.close();
});

test("failed ticker initialization retries and starts streaming when profiles recover",async()=>{
  const dom=page({missing:true,dashboard:true});await settle();
  dom.window.fetch=async url=>({ok:true,json:async()=>url === '/api/universe' ? {state:'ok',count:10,exchanges:1,selection:[{symbol:'META'}]} : url.endsWith('/profile')?{state:'ok',data:{ticker:url.split('/')[4],currency:'USD',name:'Fixture'}}:{state:'ok',data:{c:100,pc:90,t:1700000000}}});
  const now=dom.window.Date.now();dom.window.Date.now=()=>now+301000;dom.timers.at(-1)();await settle();
  assert.match(decodeURIComponent(dom.streams.at(-1).url),/META/);
  assert.match(dom.window.document.querySelector('#ticker-stocks .last').textContent,/100/);dom.window.close();
});

test("provider selection and universe count remain independent of partial quote coverage", async () => {
  const dom = page({ dashboard: true, universeCount: 12000, selection: ["ABC", "XYZ"], missingQuote: "XYZ" });
  await settle();
  const d = dom.window.document;
  assert.equal(d.getElementById("summary-universe").textContent, "12,000");
  assert.equal(d.getElementById("summary-quotes").textContent, "1 / 1");
  assert.equal(d.getElementById("summary-change").textContent, "+11.11%");
  assert.deepEqual([...d.querySelectorAll(".spotlight-stock")].map(n => n.dataset.priceSymbol), ["ABC"]);
  dom.timers.forEach(fn => fn());
  await settle();
  assert.equal(dom.requests.filter(url => url === "/api/universe").length, 1);
  dom.window.close();
});

test("daily spotlight replaces failed profiles and missing quotes, stopping after eight available stocks", async () => {
  const good = ['AAA','BBB','CCC','DDD','EEE','FFF','GGO','HHI'];
  const dom = page({ dashboard:true, selection:['BADP','BADQ',...good.slice(0,6)],
    candidates:['BADP','BADQ',...good,'UNUSED'], missingProfile:'BADP', missingQuote:'BADQ' });
  await settle();
  const d = dom.window.document;
  assert.deepEqual([...d.querySelectorAll('#spotlight .spotlight-stock')].map(n=>n.dataset.priceSymbol),good);
  assert.deepEqual([...d.querySelectorAll('.pulse-row a')].map(n=>n.textContent),good);
  assert.equal(d.getElementById('summary-quotes').textContent,'8 / 8');
  assert.equal(dom.requests.some(url=>url.includes('/UNUSED/')),false);
  assert.equal(dom.requests.filter(url=>url==='/api/data/stock/BADP/quote').length,0);
  assert.equal(d.querySelectorAll('#ticker-stocks .ticker-stock').length,8);
  dom.window.close();
});

test("a failed daily candidate is retried after the cooldown and joins only when a quote is available", async () => {
  const dom = page({ dashboard:true, selection:['ABC','XYZ'], missingQuote:'XYZ' }); await settle();
  const originalFetch = dom.window.fetch;
  dom.window.fetch = async url => url === '/api/data/stock/XYZ/quote'
    ? {ok:true,json:async()=>({state:'ok',data:{c:50,pc:45,t:1700000000}})} : originalFetch(url);
  const initial = dom.window.Date.now(); dom.window.Date.now = ()=>initial+301000;
  dom.timers.forEach(fn=>fn()); await settle();
  assert.deepEqual([...dom.window.document.querySelectorAll('#spotlight .spotlight-stock')].map(n=>n.dataset.priceSymbol),['ABC','XYZ']);
  assert.equal(dom.window.document.getElementById('summary-quotes').textContent,'2 / 2');
  dom.window.close();
});

test("a new UTC day fetches a new daily pool and removes yesterday's spotlight", async () => {
  const dom = page({dashboard:true,selection:['ABC']}); await settle();
  const w = dom.window, NativeDate = w.Date, initial = NativeDate.now();
  w.Date = class extends NativeDate {
    constructor(...args) { super(...(args.length ? args : [initial+86400000])); }
    static now() { return initial+86400000; }
  };
  const originalFetch = w.fetch;
  let nextPoolCalls = 0;
  w.fetch = async url => {
    if (url === '/api/universe') { nextPoolCalls++; return {ok:true,json:async()=>({state:'ok',count:10,selection:[{symbol:'NEXT'}]})}; }
    return originalFetch(url);
  };
  dom.timers.forEach(fn=>fn()); await settle();
  assert.equal(nextPoolCalls,1);
  assert.deepEqual([...w.document.querySelectorAll('#spotlight .spotlight-stock')].map(n=>n.dataset.priceSymbol),['NEXT']);
  assert.deepEqual([...w.document.querySelectorAll('.pulse-row a')].map(n=>n.textContent),['NEXT']);
  w.close();
});

test("fixed top ticker stays independent of daily spotlight and snapshot", async () => {
  const dom = page({dashboard:true,selection:["ABC","XYZ"]}); await settle();
  const d=dom.window.document;
  assert.deepEqual([...d.querySelectorAll("#ticker-stocks [data-price-symbol]")].map(n=>n.dataset.priceSymbol),["AAPL","MSFT","AMZN","GOOGL","META","TSLA","V","NVDA"]);
  assert.deepEqual([...d.querySelectorAll("#spotlight [data-price-symbol]")].map(n=>n.dataset.priceSymbol),["ABC","XYZ"]);
  assert.deepEqual([...d.querySelectorAll(".pulse-row a")].map(n=>n.textContent),["ABC","XYZ"]);
  assert.equal(d.getElementById("summary-quotes").textContent,"2 / 2");
  const active=dom.streams.at(-1);
  assert.equal(new Set(decodeURIComponent(active.url).split("symbols=")[1].split(",")).size,10);
  active.onmessage({data:JSON.stringify({status:"connected",stocks:[{symbol:"V",price:300,changePercent:2,updatedAt:new Date().toISOString()}]})});
  assert.equal(d.querySelector('#ticker-stocks [data-price-symbol="V"] .last').textContent,"300.00 USD");
  assert.equal(d.getElementById("summary-quotes").textContent,"2 / 2");
  assert.equal(dom.requests.filter(url=>url==="/api/data/stock/AAPL/quote").length,1);
  dom.window.close();
});

test("top ticker remains available when the provider universe has no selection", async () => {
  const dom=page({dashboard:true,selection:[]}); await settle();
  assert.equal(dom.window.document.querySelectorAll("#ticker-stocks .ticker-stock").length,8);
  assert.match(dom.window.document.querySelector("#ticker-stocks .last").textContent,/100.00/);
  assert.equal(dom.window.document.querySelectorAll("#spotlight .spotlight-stock").length,0);
  assert.match(dom.window.document.getElementById("spotlight").textContent,/No eligible provider symbols/);
  dom.window.close();
});

test("spotlight average excludes missing changes, includes zero and updates without extra requests", async () => {
  const dom = page({ dashboard: true, selection: ["AAPL", "MSFT", "NVDA"] });
  await settle();
  const d = dom.window.document, count = dom.requests.length;
  const send = changes => dom.streams.at(-1).onmessage({ data: JSON.stringify({ status: "connected", stocks:
    ["AAPL", "MSFT", "NVDA"].map((symbol, i) => ({ symbol, price: 100, changePercent: changes[i], updatedAt: new Date().toISOString() }))
  }) });
  send([-4, 0, null]);
  assert.equal(d.getElementById("summary-change").textContent, "-2.00%");
  assert.equal(d.getElementById("summary-change-note").textContent, "2 stocks · vs previous close");
  assert.equal(d.getElementById("summary-change").classList.contains("down"), true);
  send([null, null, null]);
  assert.equal(d.getElementById("summary-change").textContent, "-");
  assert.equal(d.getElementById("summary-change").classList.contains("down"), false);
  send([0, null, null]);
  assert.equal(d.getElementById("summary-change").textContent, "0.00%");
  assert.equal(dom.requests.length, count);
  dom.window.close();
});
