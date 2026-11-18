const {test} = require("node:test");
const assert = require("node:assert/strict");
const {readFileSync} = require("node:fs");
const {page} = require("../../support/market-page.cjs");
const {flushTasks: settle} = require("../../browser-async.cjs");

test("company marks cover the fixed ticker and retain an identity after image failures", async () => {
  const dom = page({ dashboard: true }); await settle();
  const w = dom.window, marks = w.StocklumoCompanyMarks;
  for (const symbol of ["AAPL", "MSFT", "AMZN", "GOOG", "GOOGL", "META", "NVDA", "TSLA", "V"]) {
    const mark = marks.create(symbol, "stock-mark"), image = mark.querySelector("img");
    assert.ok(image, symbol);
    assert.ok(readFileSync("MarketDesk/wwwroot" + image.getAttribute("src")).length > 0);
    image.dispatchEvent(new w.Event("error"));
    assert.equal(mark.querySelector("img"), null);
    assert.equal(mark.querySelector(".company-initials").hidden, false);
  }
  assert.equal(marks.create('<bad>', "stock-mark"), null);
  w.close();
});

test("provider logos upgrade existing unknown-company badges without extra API requests", async () => {
  const dom = page({ dashboard: true }); await settle();
  const w = dom.window, marks = w.StocklumoCompanyMarks, mark = marks.create("JPM", "stock-mark");
  w.document.body.append(mark);
  const requests = dom.requests.length;
  marks.register({ ticker: "JPM", logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JPM.png" });
  const image = mark.querySelector("img");
  assert.ok(image); assert.equal(image.referrerPolicy, "no-referrer");
  assert.equal(image.getAttribute("src"), "/api/data/company-logo/JPM.png");
  image.dispatchEvent(new w.Event("load"));
  assert.equal(image.hidden, false); assert.equal(mark.firstChild.hidden, true);
  image.dispatchEvent(new w.Event("error"));
  assert.equal(mark.querySelector("img"), null); assert.equal(mark.firstChild.hidden, false);
  assert.equal(dom.requests.length, requests);
  w.close();
});

test("company logos reject untrusted origins, credentials, query strings and executable URLs", async () => {
  const dom = page({ dashboard: true }); await settle();
  const w = dom.window, marks = w.StocklumoCompanyMarks;
  for (const logo of ["javascript:alert(1)", "data:image/svg+xml,test", "http://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/X.png", "https://evil.example/logo.png", "https://static2.finnhub.io.evil.example/file/publicdatany/finnhubimage/stock_logo/X.png", "https://user:pass@static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/X.png", "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/X.png?token=secret", "https://static2.finnhub.io/other/X.svg"]) {
    marks.register({ ticker: "XYZ", logo });
    assert.equal(marks.create("XYZ", "stock-mark").querySelector("img"), null, logo);
  }
  w.close();
});
