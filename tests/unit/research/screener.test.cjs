const {test} = require("node:test");
const assert = require("node:assert/strict");
const {readFileSync} = require("node:fs");
const {JSDOM} = require("jsdom");
const math = require("../../../MarketDesk/wwwroot/js/research-math.js");
const {researchPage} = require("../../support/research-page.cjs");
const {flushTasks} = require("../../browser-async.cjs");

test("screener loads real response fields and supports reset and saved presets", async () => {
  const dom = new JSDOM(
    require("../../page-fixture.cjs")(),
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
  w.eval(readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8"));
  w.eval(require("../../research-scripts.cjs")());
  await flushTasks();
  assert.equal(
    w.document.querySelectorAll("#research-results tbody tr").length,
    12,
  );
  assert.equal(w.document.querySelectorAll(".data-bar").length, 12);
  assert.equal(w.document.querySelector(".data-bar svg").getAttribute("preserveAspectRatio"), "none");
  assert.match(w.document.getElementById("research-notes").textContent, /10-day average/);
  assert.equal(w.document.getElementById("research-data-dialog").open, false);
  assert.equal(w.document.getElementById("research-data-open").getAttribute("aria-haspopup"), "dialog");
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
  assert.equal(input.maxLength, 100);
  input.value = "x".repeat(101);
  click("Save preset");
  assert.equal(JSON.parse(w.localStorage.getItem("stocklumo.screener")).query, "AAPL");
  assert.match(w.document.getElementById("research-status").textContent, /Preset not saved/);
  input.value = "x".repeat(100);
  click("Save preset");
  assert.equal(math.validScreenerPreset(JSON.parse(w.localStorage.getItem("stocklumo.screener"))), true);
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

test("screener inspector and keyboard chart selection reuse loaded data and follow filters", async () => {
  let requests=0;
  const dom=await researchPage("screener", url=>{requests++;return {symbol:url.split("/").at(-1),name:url.split("/").at(-1)+" company",currency:"USD",price:20,changePercent:2,marketCapMillions:100,state:"ok"};});
  const w=dom.window; w.matchMedia=()=>({matches:false});
  const count=requests;
  w.document.querySelector('button[data-inspect="MSFT"]').click();
  assert.match(w.document.querySelector(".inspector-heading").textContent,/MSFT company/);
  assert.equal(w.document.querySelector('button[data-inspect="MSFT"]').getAttribute("aria-pressed"),"true");
  assert.match(w.document.querySelector("tr.is-inspected").textContent, /MSFT/);
  assert.equal(w.document.querySelectorAll(".distribution-point").length,12);
  w.document.querySelector(".distribution-point").dispatchEvent(new w.KeyboardEvent("keydown",{key:"Enter"}));
  assert.match(w.document.querySelector(".inspector-heading").textContent,/AAPL company/);
  assert.match(w.document.querySelector("tr.is-inspected").textContent, /AAPL/);
  const input=w.document.querySelector("#research-controls input");input.value="MSFT";input.dispatchEvent(new w.Event("input"));
  assert.equal(w.document.querySelectorAll("#research-results tbody tr").length,1);
  assert.equal(w.document.querySelectorAll(".distribution-point").length,1);
  assert.match(w.document.querySelector(".inspector-heading").textContent,/MSFT company/);
  assert.equal(requests,count);w.close();
});
