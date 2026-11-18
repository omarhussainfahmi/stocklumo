const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { JSDOM } = require("jsdom");
const math = require("../MarketDesk/wwwroot/js/research-math.js");
const source = readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8") + "\n" + require("./research-scripts.cjs")();
const { flushTasks: settle, waitFor: until } = require("./browser-async.cjs");
const button = (document, text) => [...document.querySelectorAll("button")].find(control => control.textContent === text);


test("malformed successful responses release portfolio controls and never save unverified holdings", async t => {
  for (const malformed of [null, [], "invalid", new SyntaxError("Invalid JSON")]) {
    await t.test(String(malformed), async t => {
      const { w, d } = await page("portfolio", () => null);
      t.after(() => w.close());
      w.fetch = async () => ({ ok: true, json: async () => {
        if (malformed instanceof Error) throw malformed;
        return malformed;
      } });
      const [ticker, quantity, purchase] = d.querySelectorAll("#research-controls input");
      ticker.value = "AAPL"; quantity.value = "1"; purchase.value = "100";
      d.querySelector('#research-controls input[type="date"]').value = "2020-01-02";
      const save = button(d, "Save holding");
      save.click();
      await until(() => !save.disabled);
      assert.equal(d.getElementById("research-status").textContent, "Invalid server response. Please retry.");
      assert.equal(w.localStorage.getItem("stocklumo.portfolio"), null);
      assert.equal(ticker.value, "AAPL");
      assert.equal(d.querySelectorAll("#research-controls :disabled").length, 0);
    });
  }
});

test("a screener refresh with malformed JSON finishes with missing data and remains retryable", async t => {
  const { w, d } = await page("screener", () => null);
  t.after(() => w.close());
  const refresh = button(d, "Refresh data");
  await until(() => !refresh.disabled);
  assert.match(d.getElementById("research-status").textContent, /12 with missing data/);
  w.fetch = async () => ({ ok: true, json: async () => { throw new SyntaxError("Invalid JSON"); } });
  refresh.click();
  await until(() => !refresh.disabled);
  assert.match(d.getElementById("research-status").textContent, /12 with missing data/);
});

// Synthetic provider-shaped responses and browser storage exist only in these isolated tests.
async function page(path, response, { holdings, now = "2028-02-29T23:30:00Z", clearable } = {}) {
  const dom = new JSDOM(require("./page-fixture.cjs")(), { url: `https://example.test/${path}`, runScripts: "outside-only" });
  const w = dom.window, ActualDate = w.Date;
  w.Date = class extends ActualDate {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return ActualDate.parse(now); }
  };
  w.StocklumoMath = math;
  w.matchMedia = () => ({ matches: false, addEventListener() {} });
  w.setInterval = () => 0;
  if (clearable) w.StocklumoUI = { clearable };
  if (holdings) w.localStorage.setItem("stocklumo.portfolio", JSON.stringify(holdings));
  const requests = [];
  w.fetch = async url => {
    requests.push(url);
    return { ok: true, json: async () => response(url) };
  };
  w.eval(source);
  await settle();
  return { dom, w, d: w.document, requests };
}

test("earnings rejects invalid ranges inline before requests and exactly matches UTC leap-year bounds", async t => {
  const { w, d, requests } = await page("earnings", () => ({ state: "ok", data: { earningsCalendar: [] } }));
  t.after(() => w.close());
  const [from, to] = d.querySelectorAll('#research-controls input[type="date"]');
  assert.equal(from.min, "2027-02-28");
  assert.equal(to.max, "2029-02-28");
  assert.equal(from.required, true);
  assert.match(d.getElementById("earnings-date-hint").textContent, /92 days/);
  const run = button(d, "Load earnings");
  for (const [start, end, invalid] of [
    ["", "2028-03-01", from],
    ["2028-03-02", "2028-03-01", to],
    ["2028-02-29", "2028-06-01", to], // 93 days, not a 92-day span.
    ["2027-02-27", "2027-03-01", from],
    ["2029-02-27", "2029-03-01", to],
  ]) {
    from.value = start; to.value = end; run.click();
    assert.equal(requests.length, 0);
    assert.equal(invalid.getAttribute("aria-invalid"), "true");
    assert.equal(d.activeElement, invalid);
    const error = d.getElementById(`${invalid.id}-error`);
    assert.equal(error.hidden, false);
    assert.ok(error.textContent.length);
    assert.ok(invalid.getAttribute("aria-describedby").split(/\s+/).includes(error.id));
    assert.equal(d.getElementById("research-status").getAttribute("role"), "alert");
  }
  from.value = "2028-02-29"; to.value = "2028-05-31"; run.click();
  await settle();
  assert.equal(requests.length, 1);
  assert.match(requests[0], /from=2028-02-29&to=2028-05-31/);
  assert.equal(from.hasAttribute("aria-invalid"), false);
  assert.equal(to.hasAttribute("aria-invalid"), false);
  assert.equal(d.querySelector("table caption").textContent, "Earnings calendar: announcement dates, estimates and actual results");
});

test("reported quarters ignore invalid hidden calendar dates and clear their errors", async t => {
  const { w, d, requests } = await page("earnings", () => ({ state: "ok", data: [] }));
  t.after(() => w.close());
  const [from, to] = d.querySelectorAll('#research-controls input[type="date"]');
  from.value = ""; to.value = "";
  button(d, "Load earnings").click();
  const mode = d.querySelector("#research-controls select");
  mode.value = "reported"; mode.dispatchEvent(new w.Event("change"));
  d.querySelector('#research-controls input[type="text"]').value = "AAPL";
  button(d, "Load earnings").click(); await settle();
  assert.deepEqual(requests, ["/api/research/earnings/AAPL/reported"]);
  assert.equal(from.hasAttribute("aria-invalid"), false);
  assert.equal(d.getElementById("earnings-date-hint").hidden, true);
  assert.match(d.querySelector("table caption").textContent, /Reported earnings/);
});

const lot = (symbol, quantity = 1) => ({ symbol, quantity, purchasePrice: 100, date: "2020-01-02", currency: "USD" });
const quote = url => ({ state: "ok", symbol: url.split("/").at(-1), price: 120, currency: "USD", timestamp: 1835481600, changePercent: 2, marketCapMillions: 100, industry: "Technology" });

test("portfolio verification locks conflicting controls, prevents duplicate saves and preserves rejected input", async t => {
  let finish, profiles = 0;
  const { w, d } = await page("portfolio", url => {
    if (url.endsWith("/profile")) { profiles++; return new Promise(resolve => { finish = resolve; }); }
    return quote(url);
  }, { holdings: [lot("MSFT")] });
  t.after(() => w.close());
  const [ticker, quantity, purchase] = d.querySelectorAll("#research-controls input");
  ticker.value = "AAPL"; quantity.value = "2"; purchase.value = "100";
  d.querySelector('#research-controls input[type="date"]').value = "2020-01-02";
  const save = button(d, "Save holding"), cancel = button(d, "Cancel edit");
  save.click(); save.click(); cancel.click();
  await settle();
  assert.equal(profiles, 1);
  assert.equal(ticker.value, "AAPL");
  for (const control of d.querySelectorAll("#research-controls input, #research-controls button, [data-holding-action]")) assert.equal(control.disabled, true);
  finish({ state: "error", message: "Currency unverified. Holding not saved." }); await settle();
  assert.equal(ticker.value, "AAPL"); assert.equal(quantity.value, "2");
  assert.equal(save.disabled, false); assert.equal(cancel.disabled, false);
  assert.deepEqual(JSON.parse(w.localStorage.getItem("stocklumo.portfolio")), [lot("MSFT")]);
  save.click(); await settle(); finish({ data: { ticker: "AAPL", currency: "USD" } }); await settle();
  assert.equal(JSON.parse(w.localStorage.getItem("stocklumo.portfolio")).length, 2);
  assert.equal(d.querySelectorAll('[data-holding-action]:disabled').length, 0);
});

test("removing an earlier holding while editing preserves lot identity without adding a duplicate", async t => {
  const { w, d } = await page("portfolio", url => url.endsWith("/profile") ? { data: { ticker: "MSFT", currency: "USD" } } : quote(url), { holdings: [lot("AAPL"), lot("MSFT")] });
  t.after(() => w.close());
  d.querySelectorAll("tbody tr")[1].querySelector('button').click();
  const inputs = d.querySelectorAll("#research-controls input");
  inputs[1].value = "3";
  d.querySelector("tbody tr").querySelectorAll("button")[1].click();
  assert.equal(inputs[0].value, "MSFT");
  button(d, "Update holding").click(); await settle();
  const saved = JSON.parse(w.localStorage.getItem("stocklumo.portfolio"));
  assert.equal(saved.length, 1);
  assert.equal(saved[0].symbol, "MSFT"); assert.equal(saved[0].quantity, 3);
  d.querySelector("tbody tr button").click();
  d.querySelector("tbody tr").querySelectorAll("button")[1].click();
  assert.equal(inputs[0].value, "");
  assert.ok(button(d, "Save holding"));
  assert.deepEqual(JSON.parse(w.localStorage.getItem("stocklumo.portfolio")), []);
});

test("screener keyboard selection retains focus and applied filters share the matching dataset", async t => {
  let refreshes = 0, clearOptions;
  const { w, d } = await page("screener", quote, { clearable(input, options) { clearOptions = options; return { refresh() { refreshes++; } }; } });
  t.after(() => w.close());
  const providerStatus = d.getElementById("research-status").textContent;
  const point = d.querySelector(".distribution-point");
  point.focus(); point.dispatchEvent(new w.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  assert.equal(point.isConnected, false);
  assert.equal(d.activeElement.dataset.symbol, point.dataset.symbol);
  assert.equal(d.activeElement.getAttribute("aria-pressed"), "true");
  const query = d.querySelector('#research-controls input[type="text"]');
  query.value = "AAPL"; query.dispatchEvent(new w.Event("input", { bubbles: true }));
  assert.equal(d.querySelectorAll("tbody tr").length, 1);
  assert.equal(d.querySelector(".results-summary").textContent, "1 of 12 selected companies match.");
  assert.equal(d.getElementById("research-status").textContent, providerStatus);
  const chip = d.querySelector(".filter-chip");
  assert.match(chip.getAttribute("aria-label"), /Remove company or ticker filter: AAPL/);
  chip.click();
  assert.equal(d.querySelectorAll("tbody tr").length, 12);
  assert.equal(d.activeElement, query);
  assert.equal(d.querySelector(".filter-chips").hidden, true);
  query.value = "NO MATCH"; query.dispatchEvent(new w.Event("input", { bubbles: true }));
  assert.match(d.querySelector(".results-summary").textContent, /^0 of 12/);
  query.value = ""; clearOptions.onClear();
  assert.equal(d.querySelectorAll("tbody tr").length, 12);
  const selects = [...d.querySelectorAll("#research-controls select")];
  const industry = selects.find(input => input.closest("label").textContent.startsWith("Industry"));
  const sort = selects.find(input => input.closest("label").textContent.startsWith("Sort by"));
  industry.value = "Technology"; industry.dispatchEvent(new w.Event("input", { bubbles: true }));
  const minimum = d.querySelector('#research-controls input[type="number"]');
  minimum.value = "121"; minimum.dispatchEvent(new w.Event("input", { bubbles: true }));
  sort.value = "price"; sort.dispatchEvent(new w.Event("input", { bubbles: true }));
  assert.equal(d.querySelectorAll(".filter-chip").length, 2); // Sorting is not a filter.
  assert.match(d.querySelector(".advanced-filters > summary").textContent, /1 active/);
  [...d.querySelectorAll(".filter-chip")].find(chip => chip.getAttribute("aria-label").startsWith("Remove min. price")).click();
  assert.equal(d.activeElement, minimum);
  assert.equal(d.querySelectorAll("tbody tr").length, 12);
  button(d, "Reset filters").click();
  assert.equal(d.querySelector(".filter-chips").hidden, true);
  button(d, "Save preset").click(); button(d, "Reset filters").click(); button(d, "Load preset").click();
  assert.ok(refreshes >= 3);
  assert.match(d.querySelector("table caption").textContent, /Screened stocks/);
});
