const { test } = require("node:test");
const assert = require("node:assert/strict");
const math = require("../MarketDesk/wwwroot/js/research-math.js");
const { readFileSync } = require("node:fs");
const { JSDOM } = require("jsdom");
test("screener loads real response fields and supports reset and saved presets", async () => {
  const dom = new JSDOM(
    readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8"),
    { url: "https://example.test/screener", runScripts: "outside-only" },
  );
  const w = dom.window;
  w.StocklumoMath = math;
  w.fetch = async (url) => ({
    ok: true,
    json: async () => ({
      symbol: url.split("/").at(-1),
      name: "Fixture",
      currency: "USD",
      price: 20,
      changePercent: url.endsWith("AAPL") ? -2 : 3,
      timestamp: 1700000000,
      industry: "Technology",
      state: "ok",
    }),
  });
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js", "utf8"));
  await new Promise((r) => setTimeout(r, 30));
  assert.equal(
    w.document.querySelectorAll("#research-results tbody tr").length,
    12,
  );
  assert.equal(w.document.querySelectorAll(".data-bar").length, 12);
  assert.equal(w.document.querySelector(".data-bar svg").getAttribute("preserveAspectRatio"), "none");
  assert.match(w.document.getElementById("research-notes").textContent, /10-day average/);
  assert.equal(w.document.querySelector("#research .data-notes").open, false);
  assert.equal(w.document.querySelectorAll(".research-actions button").length, 4);
  assert.match(w.document.querySelector(".data-bar").title, /Quote .*UTC/);
  const input = w.document.querySelector("#research-controls input");
  input.value = "AAPL";
  input.dispatchEvent(new w.Event("input"));
  assert.equal(
    w.document.querySelectorAll("#research-results tbody tr").length,
    1,
  );
  assert.equal(w.document.querySelectorAll(".data-bar").length, 1);
  assert.equal(w.document.querySelector(".data-bar").getAttribute("href"), "/stock/AAPL");
  assert.match(w.document.querySelector(".data-bar").textContent, /-2 %/);
  input.value = "NO MATCH"; input.dispatchEvent(new w.Event("input"));
  assert.equal(w.document.querySelector(".data-bar"), null);
  input.value = "AAPL"; input.dispatchEvent(new w.Event("input"));
  const click = (name) =>
    [...w.document.querySelectorAll("button")]
      .find((b) => b.textContent === name)
      .click();
  click("Save preset");
  click("Reset filters");
  assert.equal(input.value, "");
  click("Load preset");
  assert.equal(input.value, "AAPL");
  dom.window.close();
});
test("screener filters missing metrics and sorts nulls last in both directions", () => {
  const rows = [
    { symbol: "AAA", name: "Alpha", price: 10 },
    { symbol: "BBB", name: "Beta", price: null },
    { symbol: "CCC", name: "Gamma", price: 20 },
  ];
  assert.deepEqual(
    math.screen(rows, { price: "15" }).map((r) => r.symbol),
    ["CCC"],
  );
  assert.deepEqual(
    math.screen(rows, { sort: "price", desc: true }).map((r) => r.symbol),
    ["CCC", "AAA", "BBB"],
  );
  assert.equal(math.screen(rows, { query: "alpha" }).length, 1);
  assert.equal(math.screen(rows, { industry: "Tech" }).length, 0);
});
test("comparison aligns common timestamps and normalizes each series independently", () => {
  const data = math.normalize([
    {
      name: "A",
      points: [
        { time: 1, value: 10 },
        { time: 2, value: 20 },
        { time: 3, value: 30 },
      ],
    },
    {
      name: "B",
      points: [
        { time: 2, value: 80 },
        { time: 3, value: 40 },
      ],
    },
  ]);
  assert.deepEqual(data[0].points, [
    { time: 2, value: 100 },
    { time: 3, value: 150 },
  ]);
  assert.equal(data[1].points[1].value, 50);
  assert.deepEqual(
    math.normalize([
      { name: "A", points: [] },
      { name: "B", points: [] },
    ]),
    [],
  );
});
test("historical parser rejects mismatched or unordered data without inventing volume", () => {
  assert.deepEqual(math.candles({ s: "ok", c: [1, 2], t: [3] }), []);
  assert.deepEqual(math.candles({ s: "ok", c: [1, 2], t: [3, 2] }), []);
  assert.equal(math.candles({ s: "ok", c: [1, 2], t: [1, 2] })[0].volume, null);
});
test("portfolio validates quantities and real calendar dates", () => {
  const h = {
    symbol: "AAA",
    currency: "USD",
    quantity: 2,
    purchasePrice: 10,
    date: "2020-01-01",
  };
  assert.equal(math.validHolding(h), true);
  for (const patch of [
    { quantity: -1 },
    { quantity: Infinity },
    { date: "2020-02-31" },
    { date: "2099-01-01" },
    { symbol: "../bad" },
    { currency: "???" },
  ])
    assert.equal(math.validHolding({ ...h, ...patch }), false);
});
test("portfolio totals never mix currencies or silently omit unpriced lots", () => {
  const h = {
    symbol: "AAA",
    currency: "USD",
    quantity: 2,
    purchasePrice: 10,
    date: "2020-01-01",
  };
  const priced = { price: 15, currency: "USD", timestamp: 1700000000 };
  const value = math.valueHoldings([h], { AAA: priced });
  assert.equal(value.groups[0].profit, 10);
  assert.equal(
    math.valueHoldings([h, { ...h, symbol: "BBB" }], { AAA: priced }).groups[0]
      .value,
    null,
  );
  assert.equal(
    math.valueHoldings([h], { AAA: { ...priced, currency: "EUR" } }).lots[0]
      .value,
    null,
  );
  assert.equal(
    math.valueHoldings([h], { AAA: { ...priced, timestamp: 1 } }).lots[0].value,
    null,
  );
});
test("historical portfolio P/L excludes dates before purchases", () => {
  const holdings = [
    {
      symbol: "AAA",
      currency: "USD",
      quantity: 2,
      purchasePrice: 10,
      date: "2020-01-02",
    },
  ];
  const data = math.portfolioHistory(holdings, {
    AAA: [
      { time: Date.parse("2020-01-01"), value: 12 },
      { time: Date.parse("2020-01-02"), value: 15 },
    ],
  });
  assert.equal(data[0].points.length, 1);
  assert.equal(data[0].points[0].value, 10);
});
test("portfolio form saves a verified lot, calculates value, and removes it", async () => {
  const dom = new JSDOM(
      readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8"),
      { url: "https://example.test/portfolio", runScripts: "outside-only" },
    ),
    w = dom.window;
  w.StocklumoMath = math;
  w.setInterval = () => 0;
  w.fetch = async (url) => ({
    ok: true,
    json: async () =>
      url.endsWith("/profile")
        ? { data: { ticker: "AAPL", currency: "USD" } }
        : {
            symbol: "AAPL",
            currency: "USD",
            price: 15,
            timestamp: 1700000000,
            state: "ok",
          },
  });
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js", "utf8"));
  await new Promise((r) => setTimeout(r, 20));
  const inputs = w.document.querySelectorAll("#research-controls input");
  ["AAPL", "2", "10", "2020-01-01"].forEach((v, i) => (inputs[i].value = v));
  [...w.document.querySelectorAll("button")]
    .find((b) => b.textContent === "Save holding")
    .click();
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(
    JSON.parse(w.localStorage.getItem("stocklumo.portfolio")).length,
    1,
  );
  assert.deepEqual(
    [...w.document.querySelectorAll(".portfolio-metrics dd")].map(n => n.textContent),
    ["20", "30", "+10"],
  );
  assert.equal(w.document.querySelectorAll(".allocation-chart circle").length, 1);
  assert.equal(w.document.querySelector(".allocation-chart circle").getAttribute("stroke-dasharray"), "100 0");
  assert.match(w.document.querySelector(".allocation-chart li").textContent, /100%/);
  assert.match(w.document.querySelector(".data-bar").textContent, /\+10 USD/);
  [...w.document.querySelectorAll("#research-results button")]
    .find((b) => b.textContent === "Remove")
    .click();
  assert.deepEqual(
    JSON.parse(w.localStorage.getItem("stocklumo.portfolio")),
    [],
  );
  w.close();
});
test("moving averages use full warm-up windows and EMA seeds from SMA", () => {
  assert.deepEqual(math.sma([1, 2, 3, 4], 3), [null, null, 2, 3]);
  assert.deepEqual(math.ema([1, 2, 3, 5], 3), [null, null, 2, 3.5]);
  assert.deepEqual(math.sma([1], 3), [null]);
  assert.throws(() => math.ema([1], 0));
});
test("Wilder RSI handles gains, losses, flat prices, and smoothing", () => {
  assert.equal(math.rsi([1, 2, 3, 4], 3).at(-1), 100);
  assert.equal(math.rsi([4, 3, 2, 1], 3).at(-1), 0);
  assert.equal(math.rsi([1, 1, 1, 1], 3).at(-1), 50);
  assert.equal(math.rsi([1, 3, 2, 4], 3).at(-1), 80);
  assert.ok(
    Math.abs(math.rsi([1, 3, 2, 4, 3], 3).at(-1) - 61.53846153846) < 1e-8,
  );
});
test("MACD aligns signal and histogram after warm-up", () => {
  const data = math.macd([1, 2, 3, 4, 5, 6, 7, 8], 3, 5, 2);
  assert.equal(data.line[3], null);
  assert.equal(data.line[4], 1);
  assert.equal(data.signal[4], null);
  assert.equal(data.signal[5], 1);
  assert.equal(data.histogram[5], 0);
  assert.throws(() => math.macd([], 5, 3, 2));
});
test("disabled technical route has no navigation or controls and makes no research requests", () => {
  const dom = new JSDOM(
    readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8"),
    { url: "https://example.test/technical", runScripts: "outside-only" },
  );
  const w = dom.window;
  w.StocklumoMath = math;
  let requests = 0;
  w.fetch = () => { requests++; throw new Error("Disabled feature requested data"); };
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js", "utf8"));
  assert.equal(w.document.querySelector('a[href="/technical"]'), null);
  assert.equal(w.document.querySelector("#research").hidden, true);
  assert.equal(w.document.querySelector("#research-controls").children.length, 0);
  assert.equal(requests, 0);
  w.close();
});

test("earnings filters the watchlist and preserves missing actuals instead of zero", async () => {
  const dom = new JSDOM(
      readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8"),
      { url: "https://example.test/earnings", runScripts: "outside-only" },
    ),
    w = dom.window;
  w.StocklumoMath = math;
  w.localStorage.setItem("stocklumo.watch", '["AAPL"]');
  w.fetch = async () => ({
    ok: true,
    json: async () => ({
      state: "ok",
      data: {
        earningsCalendar: [
          {
            symbol: "AAPL",
            date: "2026-11-02",
            epsEstimate: 2,
            epsActual: null,
          },
          { symbol: "MSFT", date: "2026-11-01", epsActual: 1 },
        ],
      },
    }),
  });
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js", "utf8"));
  w.document.querySelectorAll("#research-controls select")[1].value = "watch";
  [...w.document.querySelectorAll("button")]
    .find((b) => b.textContent === "Load earnings")
    .click();
  await new Promise((r) => setTimeout(r, 20));
  const rows = w.document.querySelectorAll("#research-results tbody tr");
  assert.equal(rows.length, 1);
  assert.match(rows[0].textContent, /AAPL/);
  assert.match(rows[0].textContent, /Unavailable/);
  assert.equal(w.document.querySelectorAll(".earnings-events article").length, 1);
  assert.match(w.document.querySelector(".earnings-events article").textContent, /EPS actual unavailable/);
  assert.equal(w.document.querySelector(".earnings-timeline time").dateTime, "2026-11-02");
  w.close();
});

test("comparison renders labeled shared-scale charts and keeps unavailable history explicit", async () => {
  const dom = new JSDOM(readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8"), {
    url: "https://example.test/compare", runScripts: "outside-only",
  });
  const w = dom.window;
  w.StocklumoMath = math;
  let missing = false, requests = 0;
  w.fetch = async (url) => {
    requests++;
    return { ok: true, json: async () => url.includes("/chart")
      ? { state: missing ? "unavailable" : "ok", data: missing ? null : { s: "ok", c: [10, 12], t: [1700000000, 1700086400] } }
      : { state: "ok", symbol: url.split("/").at(-1), price: 12, currency: "USD", changePercent: 2, timestamp: 1700086400 } };
  };
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js", "utf8"));
  const run = [...w.document.querySelectorAll("button")].find(b => b.textContent === "Compare");
  run.click();
  await new Promise(r => setTimeout(r, 20));
  assert.equal(w.document.querySelectorAll(".research-chart path").length, 2);
  assert.equal(w.document.querySelectorAll(".chart-axis-label").length, 3);
  assert.deepEqual([...w.document.querySelectorAll(".chart-legend span")].map(n => n.textContent.trim()), ["AAPL", "MSFT"]);
  assert.notEqual(w.document.querySelectorAll(".research-chart path")[0].getAttribute("stroke-dasharray"), w.document.querySelectorAll(".research-chart path")[1].getAttribute("stroke-dasharray"));
  assert.match(w.document.querySelector(".research-chart").getAttribute("aria-label"), /base 100/);
  assert.equal(w.document.querySelectorAll("details tbody tr").length, 4);
  const slider = w.document.querySelector(".chart-date-control input");
  slider.value = "1"; slider.dispatchEvent(new w.Event("input"));
  assert.match(w.document.querySelector(".chart-detail").textContent, /AAPL: 120.*MSFT: 120/);
  missing = true;
  run.click();
  await new Promise(r => setTimeout(r, 20));
  assert.equal(w.document.querySelector(".research-chart"), null);
  assert.deepEqual([...w.document.querySelectorAll(".data-bar strong")].map(n => n.textContent), ["AAPL", "MSFT"]);
  assert.match(w.document.querySelector(".bar-chart figcaption").textContent, /not a historical return/);
  assert.match(w.document.querySelector("#research-results").textContent, /Historical comparison unavailable/);
  const before = requests;
  w.document.querySelector("#research-controls input").value = "AAPL";
  run.click();
  assert.equal(requests, before);
  assert.match(w.document.querySelector("#research-status").textContent, /2 to 5/);
  w.close();
});

async function researchPage(path, response, holdings) {
  const dom = new JSDOM(readFileSync("MarketDesk/Views/Market/Index.cshtml", "utf8"), { url: `https://example.test/${path}`, runScripts: "outside-only" });
  const w = dom.window;
  w.StocklumoMath = math; w.setInterval = () => 0;
  if (holdings) w.localStorage.setItem("stocklumo.portfolio", JSON.stringify(holdings));
  w.fetch = async url => ({ ok: true, json: async () => response(url) });
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js", "utf8"));
  await new Promise(r => setTimeout(r, 25));
  return dom;
}
test("portfolio chart aggregates lots by stock, keeps currencies apart, and suppresses incomplete totals", async () => {
  const holdings = [
    {symbol:"AAA",currency:"USD",quantity:2,purchasePrice:10,date:"2020-01-01"},
    {symbol:"AAA",currency:"USD",quantity:1,purchasePrice:10,date:"2020-01-01"},
    {symbol:"BBB",currency:"USD",quantity:1,purchasePrice:10,date:"2020-01-01"},
    {symbol:"CCC",currency:"EUR",quantity:1,purchasePrice:10,date:"2020-01-01"}];
  const response = url => ({ symbol:url.split("/").at(-1), currency:url.endsWith("CCC")?"EUR":"USD",price:20,timestamp:1700000000 });
  const dom = await researchPage("portfolio",response,holdings);
  const charts=dom.window.document.querySelectorAll(".allocation-chart");
  assert.equal(charts.length,2);
  assert.deepEqual([...charts[0].querySelectorAll("li strong")].map(n=>n.textContent),["75%","25%"]);
  assert.equal(charts[1].querySelector("li strong").textContent,"100%");
  dom.window.close();
  const partial=await researchPage("portfolio",url=>url.endsWith("BBB")?{state:"error"}:response(url),holdings);
  assert.equal(partial.window.document.querySelectorAll(".allocation-chart").length,1);
  assert.match(partial.window.document.querySelector(".allocation-chart h2").textContent,/EUR/);
  assert.match(partial.window.document.querySelector("#research-results").textContent,/allocation unavailable/);
  partial.window.close();
  const empty=await researchPage("portfolio",response,[]);
  assert.equal(empty.window.document.querySelector(".data-figure"),null);
  empty.window.close();
});
test("earnings empty ranges and fiscal quarters never produce announcement timelines", async () => {
  const dom=await researchPage("earnings",()=>({state:"ok",data:{earningsCalendar:[]}}));
  const w=dom.window,run=[...w.document.querySelectorAll("button")].find(b=>b.textContent==="Load earnings");
  const dates = [...w.document.querySelectorAll('#research-controls input[type="date"]')];
  const originalDates = dates.map(input => input.value);
  assert.equal(dates.length, 2);
  assert.ok(dates.every(input => input.closest("label").hidden === false));
  run.click();await new Promise(r=>setTimeout(r,20));
  assert.equal(w.document.querySelector(".earnings-timeline"),null);
  assert.match(w.document.querySelector("#research-results").textContent,/No earnings found/);
  w.document.querySelector("#research-controls input").value="AAA";
  w.document.querySelector("#research-controls select").value="reported";
  w.document.querySelector("#research-controls select").dispatchEvent(new w.Event("change"));
  assert.ok(dates.every(input => input.closest("label").hidden));
  w.fetch=async()=>({ok:true,json:async()=>({state:"ok",data:[{symbol:"AAA",period:"2026-09-30",actual:2}]})});
  run.click();await new Promise(r=>setTimeout(r,20));
  assert.equal(w.document.querySelector(".earnings-timeline"),null);
  assert.match(w.document.querySelector("#research-results").textContent,/Fiscal period end/);
  w.document.querySelector("#research-controls select").value = "calendar";
  w.document.querySelector("#research-controls select").dispatchEvent(new w.Event("change"));
  assert.ok(dates.every(input => !input.closest("label").hidden));
  assert.deepEqual(dates.map(input => input.value), originalDates);
  w.close();
});
