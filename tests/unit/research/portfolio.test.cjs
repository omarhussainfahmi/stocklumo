const {test} = require("node:test");
const assert = require("node:assert/strict");
const {readFileSync} = require("node:fs");
const {JSDOM} = require("jsdom");
const math = require("../../../MarketDesk/wwwroot/js/research-math.js");
const {researchPage} = require("../../support/research-page.cjs");
const {flushTasks} = require("../../browser-async.cjs");

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
  const data = math.unrealizedProfitLossHistory(holdings, {
    AAA: [
      { time: Date.parse("2020-01-01"), value: 12 },
      { time: Date.parse("2020-01-02"), value: 15 },
    ],
  });
  assert.equal(data[0].points.length, 1);
  assert.equal(data[0].points[0].value, 10);
});

test("historical unrealized P/L joins shared dates, aggregates lots and keeps currencies separate", () => {
  const holdings = [
    { symbol: "AAA", currency: "USD", quantity: 2, purchasePrice: 10, date: "2020-01-01" },
    { symbol: "AAA", currency: "USD", quantity: 1, purchasePrice: 12, date: "2020-01-02" },
    { symbol: "BBB", currency: "EUR", quantity: 3, purchasePrice: 20, date: "2020-01-01" }
  ];
  const points = (days, values) => days.map((day, i) => ({ time: Date.parse(`2020-01-0${day}`), value: values[i] }));
  const histories = { AAA: points([1, 2, 3, 4], [10, 15, 16, 17]), BBB: points([1, 2, 4], [20, 18, 22]) };
  const result = math.unrealizedProfitLossHistory(holdings, histories);
  assert.deepEqual(result.map(series => series.points.map(point => point.value)), [[13, 19], [-6, 6]]);
  assert.deepEqual(result[0].points.map(point => point.time), [Date.parse("2020-01-02"), Date.parse("2020-01-04")]);
  assert.deepEqual(math.unrealizedProfitLossHistory(holdings, { AAA: histories.AAA }), []);
});

test("portfolio form saves a verified lot, calculates value, and removes it", async () => {
  const dom = new JSDOM(
      require("../../page-fixture.cjs")(),
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
  w.eval(readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8"));
  w.eval(require("../../research-scripts.cjs")());
  await flushTasks();
  const inputs = w.document.querySelectorAll("#research-controls input");
  ["AAPL", "2", "10", "2020-01-01"].forEach((v, i) => (inputs[i].value = v));
  [...w.document.querySelectorAll("button")]
    .find((b) => b.textContent === "Save holding")
    .click();
  await flushTasks();
  assert.equal(
    JSON.parse(w.localStorage.getItem("stocklumo.portfolio")).length,
    1,
  );
  assert.deepEqual(
    [...w.document.querySelectorAll(".portfolio-metrics dd")].map(n => n.textContent),
    ["20", "30", "+10", "+50%"],
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
