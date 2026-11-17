const {test} = require("node:test");
const assert = require("node:assert/strict");
const {page} = require("../../support/market-page.cjs");
const {flushTasks: settle} = require("../../browser-async.cjs");

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
  assert.equal(w.document.getElementById("chart-observation").hidden, true);
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

test("price chart shows the single quote value and real range without inventing history", async () => {
  const dom=page(); await settle(); const d=dom.window.document;
  assert.equal(d.getElementById("chart-point").hasAttribute("hidden"),true);
  assert.equal(d.getElementById("chart-single-quote").hasAttribute("hidden"),false);
  assert.equal(d.getElementById("chart-point").getAttribute("cx"),"450");
  assert.equal(d.getElementById("chart-observation").hidden,false);
  assert.match(d.getElementById("observation-description").textContent,/One observation/);
  d.getElementById("chart").dispatchEvent(new dom.window.KeyboardEvent("keydown", {key:"ArrowRight"}));
  assert.equal(d.getElementById("cursor").hasAttribute("hidden"),true);
  assert.equal(d.getElementById("chart-area").getAttribute("d"),"");
  assert.equal(d.querySelectorAll(".range-card svg").length,1);
  assert.match(d.querySelector(".range-card svg").getAttribute("aria-label"),/92.00 to 105.00/);
  assert.match(d.querySelectorAll(".range-card")[1].textContent,/Range unavailable/);
  dom.window.close();
});

test("empty session selection uses quote observations rather than navigation history", async t => {
  const dom = page({ missing: true });
  t.after(() => dom.window.close());
  await settle();
  dom.window.history.pushState({}, "", "/stock/AAPL?view=session");
  dom.window.document.querySelector('[data-range="session"]').click();
  assert.equal(dom.window.document.getElementById("chart-status").textContent, "Waiting for price observations.");
  assert.equal(dom.window.document.getElementById("chart").dataset.observations, "0");
});
