const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { JSDOM } = require("jsdom");
const html = readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8");
const script = readFileSync("MarketDesk/wwwroot/js/market.js", "utf8");
const settle = () => new Promise((resolve) => setTimeout(resolve, 30));

// Synthetic values are test fixtures only. They never ship as application data.
function page({ missing = false, quoteWait, storedWatch = [], dashboard = false, marketOpen = false, universeCount = 5000, selection = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "JPM"], missingQuote } = {}) {
  const dom = new JSDOM(html, {
    url: dashboard ? "http://localhost/" : "http://localhost/stock/AAPL",
    runScripts: "outside-only",
  });
  const w = dom.window;
  w.document.body.dataset.symbol = dashboard ? "" : "AAPL";
  w.matchMedia = () => ({ matches: false });
  dom.timers = [];
  w.setInterval = callback => { dom.timers.push(callback); return 0; };
  w.localStorage.setItem("stocklumo.watch", JSON.stringify(storedWatch));
  const streams = [];
  w.EventSource = class {
    constructor(url) {
      this.url = url;
      streams.push(this);
    }
    close() {
      this.closed = true;
    }
  };
  dom.streams = streams;
  dom.requests = [];
  w.fetch = async (url) => {
    dom.requests.push(url);
    let body;
    if (missing) body = { state: "setup", message: "API key required" };
    else if (url === "/api/universe") body = { state: "ok", count: universeCount, exchanges: 3, retrievedAt: "2026-10-16T10:00:00Z", selection: selection.map(symbol => ({ symbol })) };
    else if (url.includes("/profile"))
      body = {
        state: "ok",
        data: {
          ticker: dashboard ? url.split("/")[4] : "AAPL",
          name: "Test Company",
          country: "US",
          exchange: "NASDAQ/NMS (GLOBAL MARKET)",
          currency: "USD",
          weburl: "javascript:alert(1)",
        },
      };
    else if (url.includes("/quote")) {
      if (quoteWait) await quoteWait;
      body = {
        state: "ok",
        data: url.includes(`/${missingQuote}/`) ? null : { c: 100, pc: 90, o: 95, h: 105, l: 92, t: 1700000000 },
      };
    } else if (url.includes("/chart"))
      body = {
        state: "ok",
        data: { s: "ok", c: [90, 100], t: [1700000000, 1700001000] },
      };
    else if (url.includes("/news"))
      body = {
        state: "ok",
        data: [
          {
            headline: "<script>bad()</script>",
            url: "https://example.com/article",
            source: "Test source",
            datetime: 1700000000,
          },
          { headline: "Bad URL", url: "javascript:alert(1)" },
        ],
      };
    else body = { state: "ok", data: { isOpen: marketOpen, session: marketOpen ? "regular" : "closed", t: Math.floor(w.Date.now() / 1000) } };
    return { ok: true, json: async () => body };
  };
  w.eval(script);
  return dom;
}

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
  assert.equal(extras.length, 12);
  assert.ok(extras.every(link => link.hidden));
  button.click();
  assert.equal(button.getAttribute('aria-expanded'), 'true');
  assert.ok(extras.every(link => !link.hidden));
  button.click();
  assert.ok(extras.every(link => link.hidden));
  dom.window.close();
});

test("market snapshot uses existing quotes, a shared scale and honest unavailable states", async () => {
  const dom = page({ dashboard: true, storedWatch: ["AAPL"] });
  await settle();
  const d = dom.window.document;
  assert.equal(d.getElementById("summary-quotes").textContent, "8 / 8");
  assert.equal(d.querySelectorAll("#spotlight .spotlight-stock").length, 8);
  assert.equal(d.getElementById("summary-universe").textContent, "5,000");
  assert.equal(d.getElementById("summary-live").textContent, "0");
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
  assert.equal(d.getElementById("summary-live").textContent, "0");
  assert.equal(rows[0].querySelector("span").textContent, "-2.00%");
  assert.equal(rows[1].querySelector("span").textContent, "+4.00%");
  assert.equal(Number(rows[1].querySelector("rect").getAttribute("width")), 2 * Number(rows[0].querySelector("rect").getAttribute("width")));
  assert.equal(rows[0].querySelector("a").getAttribute("href"), "/stock/AAPL");
  assert.equal(dom.requests.length, count);
  dom.window.close();
  const missing = page({ dashboard: true, missing: true });
  await settle();
  assert.equal(missing.window.document.getElementById("summary-quotes").textContent, "-");
  for (const id of ["summary-universe", "summary-exchanges", "summary-live"])
    assert.equal(missing.window.document.getElementById(id).textContent, "-");
  assert.equal(missing.window.document.querySelectorAll(".pulse-row rect").length, 0);
  assert.ok([...missing.window.document.querySelectorAll(".pulse-row span")].every(n => n.textContent === "Unavailable"));
  missing.window.close();
});

test("stock profile, quote and recently viewed use supplied data", async () => {
  const dom = page();
  await settle();
  const w = dom.window;
  assert.equal(
    w.document.getElementById("company").textContent,
    "Test Company",
  );
  assert.equal(w.document.getElementById("price").textContent, "100.00");
  assert.deepEqual(JSON.parse(w.localStorage.getItem("stocklumo.recent")), [
    "AAPL",
  ]);
  assert.equal(w.document.querySelector("#company-status a"), null);
  dom.window.close();
});

test("stream recovery re-registers symbols without an aggressive request loop", async () => {
  const dom = page();
  await settle();
  const profiles = () =>
    dom.requests.filter((url) => url.endsWith("/profile")).length;
  const before = profiles();
  dom.streams.at(-1).onerror();
  await settle();
  assert.equal(profiles(), before + 1);
  dom.streams.at(-1).onerror();
  await settle();
  assert.equal(profiles(), before + 1);
  assert.equal(
    dom.window.document.getElementById("connection").textContent,
    "DISCONNECTED",
  );
  dom.window.close();
});

test("watchlist add and remove persist and theme selection is remembered", async () => {
  const dom = page();
  await settle();
  const w = dom.window;
  w.document.getElementById("save-stock").click();
  assert.deepEqual(JSON.parse(w.localStorage.getItem("stocklumo.watch")), [
    "AAPL",
  ]);
  assert.equal(w.document.querySelectorAll("#watch-rows tr").length, 1);
  w.document.querySelector('[aria-label="Remove AAPL from watchlist"]').click();
  assert.deepEqual(JSON.parse(w.localStorage.getItem("stocklumo.watch")), []);
  w.document.getElementById("theme").click();
  assert.equal(w.document.documentElement.dataset.theme, "dark");
  assert.equal(w.localStorage.getItem("stocklumo.theme"), "dark");
  dom.window.close();
});

test("news text is escaped and unsafe publisher links are omitted", async () => {
  const dom = page();
  await settle();
  const w = dom.window;
  assert.equal(w.document.querySelectorAll("#stock-news article").length, 1);
  assert.equal(
    w.document.querySelector("#stock-news h3").textContent,
    "<script>bad()</script>",
  );
  assert.equal(w.document.querySelector("#stock-news script"), null);
  dom.window.close();
});

test("historical chart renders real fixture observations and supports keyboard inspection", async () => {
  const dom = page();
  await settle();
  const w = dom.window;
  w.document.querySelector('[data-range="1M"]').click();
  await settle();
  assert.match(
    w.document.getElementById("chart-line").getAttribute("d"),
    /^M.+L/,
  );
  w.document
    .getElementById("chart")
    .dispatchEvent(new w.KeyboardEvent("keydown", { key: "ArrowRight" }));
  assert.match(
    w.document.getElementById("chart-value").textContent,
    /100\.00 USD/,
  );
  assert.equal(
    w.document.getElementById("cursor").hasAttribute("hidden"),
    false,
  );
  dom.window.close();
});

test("an older REST response cannot overwrite a newer streamed price", async () => {
  let release;
  const quoteWait = new Promise((resolve) => {
    release = resolve;
  });
  const dom = page({ quoteWait });
  await settle();
  dom.streams.at(-1).onmessage({
    data: JSON.stringify({
      status: "connected",
      message: "Test stream",
      stocks: [
        {
          symbol: "AAPL",
          price: 110,
          updatedAt: new Date(1700000100000).toISOString(),
        },
      ],
    }),
  });
  release();
  await settle();
  assert.equal(
    dom.window.document.getElementById("price").textContent,
    "110.00",
  );
  assert.match(
    dom.window.document.getElementById("change").textContent,
    /\+20\.00/,
  );
  dom.window.close();
});

test("unverified saved symbols do not poison valid subscriptions", async () => {
  const dom = page({ storedWatch: ["MISSING", "AAPL"] });
  await settle();
  assert.ok(dom.streams.length > 0);
  for (const stream of dom.streams)
    assert.equal(
      new URL(stream.url, "http://localhost").searchParams.get("symbols"),
      "AAPL",
    );
  assert.ok(dom.streams.slice(0, -1).every((stream) => stream.closed));
  assert.deepEqual(
    JSON.parse(dom.window.localStorage.getItem("stocklumo.watch")),
    ["MISSING", "AAPL"],
  );
  dom.window.close();
});

test("missing credentials never create prices or allow an unverified watchlist entry", async () => {
  const dom = page({ missing: true });
  await settle();
  const w = dom.window;
  assert.equal(w.document.getElementById("price").textContent, "-");
  assert.equal(w.document.getElementById("save-stock").disabled, true);
  assert.equal(
    w.document.getElementById("notice").textContent,
    "API key required",
  );
  dom.window.close();
});
test("a stalled stream is replaced and closed-market prices are explained", async () => {
  const dom = page({dashboard:true}); await settle();
  const old = dom.streams.at(-1), now = dom.window.Date.now();
  dom.window.Date.now = () => now + 61000;
  dom.timers.at(-1)();
  assert.equal(old.closed,true); assert.notEqual(dom.streams.at(-1),old);
  dom.streams.at(-1).onmessage({data:JSON.stringify({status:'connected',message:'Connected',stocks:[{symbol:'AAPL',price:100,updatedAt:'2020-01-01T00:00:00Z'}]})});
  assert.match(dom.window.document.getElementById('notice').textContent,/outside regular trading hours/);
  assert.match(dom.window.document.querySelector('#ticker-stocks .age').textContent,/market closed/);
  dom.window.close();
});
test("failed ticker initialization retries and starts streaming when profiles recover",async()=>{
  const dom=page({missing:true,dashboard:true});await settle();
  dom.window.fetch=async url=>({ok:true,json:async()=>url === '/api/universe' ? {state:'ok',count:10,exchanges:1,selection:[{symbol:'META'}]} : url.endsWith('/profile')?{state:'ok',data:{ticker:url.split('/')[4],currency:'USD',name:'Fixture'}}:{state:'ok',data:{c:100,pc:90,t:1700000000}}});
  const now=dom.window.Date.now();dom.window.Date.now=()=>now+301000;dom.timers.at(-1)();await settle();
  assert.match(decodeURIComponent(dom.streams.at(-1).url),/META/);
  assert.match(dom.window.document.querySelector('#ticker-stocks .last').textContent,/100/);dom.window.close();
});


test("a handshake and heartbeats cannot claim live; only a fresh received US trade can", async () => {
  const dom = page({ dashboard: true, marketOpen: true }); await settle();
  const w = dom.window, stream = dom.streams.at(-1), label = w.document.getElementById("connection");
  const send = stocks => stream.onmessage({ data: JSON.stringify({ status: "connected", stocks }) });
  send([]); assert.equal(label.textContent, "STALE");
  const updatedAt = new Date(w.Date.now()).toISOString();
  send([{ symbol: "AAPL", price: 101, updatedAt, source: "Quote" }]);
  assert.equal(label.textContent, "STALE");
  send([{ symbol: "AAPL", price: 102, updatedAt, source: "Trade", tradeReceivedAt: updatedAt }]);
  assert.equal(label.textContent, "LIVE");
  assert.equal(w.document.getElementById("summary-live").textContent, "1");
  assert.match(w.document.querySelector('#ticker-stocks .age').textContent, /live/);
  const start = w.Date.now(); w.Date.now = () => start + 181000;
  await dom.timers[0](); send([]); assert.equal(label.textContent, "STALE");
  dom.window.close();
});

test("discarded connection callbacks and hidden-page timers cannot revive an old stream", async () => {
  const dom = page({ dashboard: true }); await settle();
  const old = dom.streams.at(-1), w = dom.window;
  w.dispatchEvent(new w.Event("online")); await settle();
  const current = dom.streams.at(-1); assert.notEqual(old, current);
  old.onmessage({data:JSON.stringify({status:"connected",stocks:[{symbol:"AAPL",price:999,updatedAt:new Date().toISOString()}]})});
  assert.doesNotMatch(w.document.querySelector('#ticker-stocks .last').textContent, /999/);
  old.onerror(); assert.notEqual(w.document.getElementById("connection").textContent,"DISCONNECTED");
  w.dispatchEvent(new w.Event("pagehide"));
  const count = dom.streams.length; dom.timers.at(-1)(); w.dispatchEvent(new w.Event("online")); await settle();
  assert.equal(dom.streams.length,count); assert.equal(current.closed,true); dom.window.close();
});

test("invalid, future and unsolicited prices are ignored while quote failures stay visible", async () => {
  const dom = page({ dashboard:true, marketOpen:true }); await settle();
  const stream = dom.streams.at(-1), w=dom.window;
  stream.onmessage({data:"null"}); stream.onmessage({data:"not json"});
  stream.onmessage({data:JSON.stringify({status:"connected",stocks:[null,{symbol:"AAPL",price:999,updatedAt:"2999-01-01T00:00:00Z"},{symbol:"UNKNOWN",price:20,updatedAt:new Date().toISOString()},{symbol:"MSFT",quoteState:"limited",price:null}]})});
  assert.match(w.document.querySelector('#ticker-stocks .last').textContent,/100/);
  assert.equal(w.document.getElementById("connection").textContent,"ERROR");
  assert.match(w.document.getElementById("notice").textContent,/MSFT/); dom.window.close();
});

test("market status expires instead of assuming an old closure is still valid", async () => {
  const dom=page({dashboard:true}); await settle(); const w=dom.window;
  const send=()=>dom.streams.at(-1).onmessage({data:JSON.stringify({status:"connected",stocks:[]})});
  send(); assert.equal(w.document.getElementById("connection").textContent,"MARKET CLOSED");
  const initial=w.Date.now(); w.Date.now=()=>initial+121000; send();
  assert.equal(w.document.getElementById("connection").textContent,"STALE");
  assert.match(w.document.getElementById("notice").textContent,/could not be verified/); dom.window.close();
});

test("provider selection and universe count remain independent of partial quote coverage", async () => {
  const dom = page({ dashboard: true, universeCount: 12000, selection: ["ABC", "XYZ"], missingQuote: "XYZ" });
  await settle();
  const d = dom.window.document;
  assert.equal(d.getElementById("summary-universe").textContent, "12,000");
  assert.equal(d.getElementById("summary-quotes").textContent, "1 / 2");
  assert.equal(d.getElementById("summary-live").textContent, "0");
  assert.deepEqual([...d.querySelectorAll(".spotlight-stock")].map(n => n.dataset.priceSymbol), ["ABC", "XYZ"]);
  dom.timers.forEach(fn => fn());
  await settle();
  assert.equal(dom.requests.filter(url => url === "/api/universe").length, 1);
  dom.window.close();
});
