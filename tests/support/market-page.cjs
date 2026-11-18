const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {JSDOM} = require('jsdom');
const html = require('../page-fixture.cjs')();
const script = require('./browser-scripts.cjs').marketScripts();
function page({ missing = false, quoteWait, storedWatch = [], dashboard = false, marketOpen = false, universeCount = 5000, selection = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "META", "TSLA", "JPM"], candidates = [], missingQuote, missingProfile } = {}) {
  const dom = new JSDOM(html, {
    url: dashboard ? "http://localhost/" : "http://localhost/stock/AAPL",
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });
  const w = dom.window;
  // JSDOM has no scroll layout; actual placement is verified in Playwright.
  // Match browser teardown so pending mutation callbacks cannot run on a closed
  // document, and fail instead of silently printing genuine runtime errors.
  w.scrollBy = () => {};
  const observers = [], NativeObserver = w.MutationObserver, runtimeErrors = [];
  w.MutationObserver = class extends NativeObserver { constructor(callback) { super(callback); observers.push(this); } };
  w.addEventListener('error', event => { runtimeErrors.push(event.message); event.preventDefault(); });
  const close = w.close.bind(w);
  w.close = () => { observers.forEach(observer => observer.disconnect()); assert.deepEqual(runtimeErrors, []); close(); };
  w.StocklumoMath = require("../../MarketDesk/wwwroot/js/research-math.js");
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
    else if (url === "/api/universe") body = { state: "ok", count: universeCount, exchanges: 3, retrievedAt: "2026-10-16T10:00:00Z", selection: selection.map(symbol => ({ symbol })), candidates: candidates.map(symbol => ({ symbol })) };
    else if (url.includes(`/${missingProfile}/profile`)) body = { state: 'unavailable', message: 'Company information unavailable.' };
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
  w.eval(readFileSync("MarketDesk/wwwroot/js/site.js", "utf8"));
  w.eval(script);
  return dom;
}
module.exports = {page};
