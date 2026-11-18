const {test} = require("node:test");
const assert = require("node:assert/strict");
const {readFileSync} = require("node:fs");
const {JSDOM} = require("jsdom");
const math = require("../../../MarketDesk/wwwroot/js/research-math.js");
const {researchPage} = require("../../support/research-page.cjs");
const {waitFor, flushTasks} = require("../../browser-async.cjs");

test("earnings filters the watchlist and preserves missing actuals instead of zero", async () => {
  const dom = new JSDOM(
      require("../../page-fixture.cjs")(),
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
  w.eval(readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8"));
  w.eval(require("../../research-scripts.cjs")());
  w.document.querySelectorAll("#research-controls select")[1].value = "watch";
  [...w.document.querySelectorAll("button")]
    .find((b) => b.textContent === "Load earnings")
    .click();
  await flushTasks();
  const rows = w.document.querySelectorAll("#research-results tbody tr");
  assert.equal(rows.length, 1);
  assert.match(rows[0].textContent, /AAPL/);
  assert.match(rows[0].textContent, /Unavailable/);
  assert.equal(w.document.querySelectorAll(".earnings-events article").length, 1);
  assert.match(w.document.querySelector(".earnings-events article").textContent, /EPS actual unavailable/);
  assert.equal(w.document.querySelector(".earnings-timeline time").dateTime, "2026-11-02");
  w.close();
});

test("large earnings results page every record and lazily expand announcement days without refetching", async () => {
  // Synthetic provider-shaped records are test fixtures, never application data.
  const rows = Array.from({length:1300}, (_, i) => ({symbol:`TEST${i}`,date:i < 650 ? "2026-11-01" : "2026-11-02",epsEstimate:1,epsActual:null}));
  let requests = 0;
  const dom = await researchPage("earnings", () => { requests++; return {state:"ok",data:{earningsCalendar:rows}}; });
  const w = dom.window, d = w.document;
  [...d.querySelectorAll("button")].find(b=>b.textContent === "Load earnings").click();
  await flushTasks();
  assert.equal(d.querySelectorAll("tbody tr").length,25);
  assert.equal(d.querySelectorAll(".earnings-events article").length,25);
  const days = d.querySelectorAll(".earnings-timeline details");
  assert.equal(days[1].querySelectorAll("article").length,0);
  days[1].open = true;
  await waitFor(() => days[1].querySelectorAll("article").length === 25, "Expanded earnings day did not render");
  assert.equal(days[1].querySelectorAll("article").length,25);
  days[1].querySelector(".more-events").click();
  assert.equal(days[1].querySelectorAll("article").length,50);
  assert.equal(d.activeElement,days[1].querySelectorAll("h4")[25]);
  days[1].open = false; await flushTasks();
  days[1].open = true; await flushTasks();
  assert.equal(days[1].querySelectorAll("article").length,50);
  const pager = d.querySelector(".pagination"), buttons = pager.querySelectorAll("button"), size = pager.querySelector("select");
  buttons[1].click(); assert.match(pager.textContent,/26-50 of 1300/);
  assert.equal(d.activeElement,pager.querySelector('[role="status"]'));
  buttons[0].click(); assert.match(pager.textContent,/1-25 of 1300/);
  size.value = "100"; size.dispatchEvent(new w.Event("change"));
  const reached = [];
  for (let pageIndex = 0; pageIndex < rows.length; pageIndex++) {
    reached.push(...[...d.querySelectorAll("tbody tr td:first-child a")].map(a=>a.textContent));
    if (buttons[1].disabled) break;
    buttons[1].click();
  }
  assert.deepEqual(reached,rows.map(r=>r.symbol));
  assert.equal(requests,1); w.close();
});

test("earnings empty ranges and fiscal quarters never produce announcement timelines", async () => {
  const dom=await researchPage("earnings",()=>({state:"ok",data:{earningsCalendar:[]}}));
  const w=dom.window,run=[...w.document.querySelectorAll("button")].find(b=>b.textContent==="Load earnings");
  const dates = [...w.document.querySelectorAll('#research-controls input[type="date"]')];
  const originalDates = dates.map(input => input.value);
  assert.equal(dates.length, 2);
  assert.ok(dates.every(input => input.closest("label").hidden === false));
  run.click();await flushTasks();
  assert.equal(w.document.querySelector(".earnings-timeline"),null);
  assert.match(w.document.querySelector("#research-results").textContent,/No earnings found/);
  w.document.querySelector("#research-controls input").value="AAA";
  w.document.querySelector("#research-controls select").value="reported";
  w.document.querySelector("#research-controls select").dispatchEvent(new w.Event("change"));
  assert.ok(dates.every(input => input.closest("label").hidden));
  w.fetch=async()=>({ok:true,json:async()=>({state:"ok",data:[{symbol:"AAA",period:"2026-09-30",actual:2}]})});
  run.click();await flushTasks();
  assert.equal(w.document.querySelector(".earnings-timeline"),null);
  assert.match(w.document.querySelector("#research-results").textContent,/Fiscal period end/);
  w.document.querySelector("#research-controls select").value = "calendar";
  w.document.querySelector("#research-controls select").dispatchEvent(new w.Event("change"));
  assert.ok(dates.every(input => !input.closest("label").hidden));
  assert.deepEqual(dates.map(input => input.value), originalDates);
  w.close();
});

test("EPS graphics retain negative, zero and missing actuals without inventing bars", async () => {
  const dom=await researchPage("earnings",()=>({state:"ok",data:{earningsCalendar:[
    {symbol:"AAA",date:"2026-11-01",epsEstimate:-2,epsActual:-1},
    {symbol:"BBB",date:"2026-11-01",epsEstimate:0,epsActual:null}]}}));
  const w=dom.window;[...w.document.querySelectorAll("button")].find(b=>b.textContent==="Load earnings").click();
  await flushTasks();
  const cards=w.document.querySelectorAll(".earnings-events article");
  const rects=cards[0].querySelectorAll(".eps-bars rect");
  assert.equal(Number(rects[0].getAttribute("width")),2*Number(rects[1].getAttribute("width")));
  assert.equal(cards[1].querySelectorAll(".eps-bars .eps-actual").length,0);
  assert.equal(cards[1].querySelectorAll(".eps-bars circle").length,1);
  assert.match(cards[1].textContent,/Unavailable/);w.close();
});
