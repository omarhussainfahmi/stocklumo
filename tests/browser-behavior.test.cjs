const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { JSDOM } = require("jsdom");
const html = readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8");
const script = readFileSync("MarketDesk/wwwroot/js/market.js", "utf8");
const settle = () => new Promise((resolve) => setTimeout(resolve, 30));

// Synthetic values are test fixtures only. They never ship as application data.
function page({ missing = false, quoteWait, storedWatch = [], dashboard = false } = {}) {
  const dom = new JSDOM(html, {
    url: dashboard ? "http://localhost/" : "http://localhost/stock/AAPL",
    runScripts: "outside-only",
  });
  const w = dom.window;
  w.document.body.dataset.symbol = dashboard ? "" : "AAPL";
  w.matchMedia = () => ({ matches: false });
  w.setInterval = () => 0;
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
    else if (url.includes("/profile"))
      body = {
        state: "ok",
        data: {
          ticker: dashboard ? url.split("/")[4] : "AAPL",
          name: "Test Company",
          country: "US",
          exchange: "Test Exchange",
          currency: "USD",
          weburl: "javascript:alert(1)",
        },
      };
    else if (url.includes("/quote")) {
      if (quoteWait) await quoteWait;
      body = {
        state: "ok",
        data: { c: 100, pc: 90, o: 95, h: 105, l: 92, t: 1700000000 },
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
    else body = { state: "ok", data: { isOpen: false, session: "closed" } };
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
  assert.equal(dom.window.document.getElementById('connection').dataset.state, 'connected');
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
