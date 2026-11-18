const {test} = require("node:test");
const assert = require("node:assert/strict");
const {page} = require("../../support/market-page.cjs");
const {flushTasks: settle, waitFor, controlTimers} = require("../../browser-async.cjs");

test("search reports malformed successful responses without mislabeling them as connectivity failures", async t => {
  const dom = page({ dashboard: true });
  t.after(() => dom.window.close());
  await settle();
  const w = dom.window, input = w.document.getElementById("search"), status = w.document.getElementById("search-status");
  for (const malformed of [null, [], "invalid", new SyntaxError("Invalid JSON")]) {
    w.fetch = async () => ({ ok: true, json: async () => {
      if (malformed instanceof Error) throw malformed;
      return malformed;
    } });
    input.value = "AAPL";
    input.dispatchEvent(new w.Event("input"));
    await waitFor(() => status.textContent !== "Searching…", "Search did not finish");
    assert.equal(status.textContent, "Invalid server response. Please retry.");
    assert.equal(w.document.getElementById("search-results").hidden, true);
  }
});

test("search supports result keyboard navigation and Escape cancels pending work", async () => {
  const dom = page({dashboard:true}); await settle();
  const w = dom.window, d = w.document, input = d.getElementById("search"), results = d.getElementById("search-results");
  const advance = controlTimers(w);
  let searches = 0;
  w.fetch = async () => { searches++; return {ok:true,json:async()=>({state:"ok",data:{result:["AAPL","MSFT","NVDA"].map(symbol=>({symbol,description:symbol,type:"Common Stock"}))}})}; };
  input.focus(); input.value="test"; input.dispatchEvent(new w.Event("input"));
  input.dispatchEvent(new w.KeyboardEvent("keydown",{key:"Escape"}));
  await advance(300);
  assert.equal(searches,0); assert.equal(results.hidden,true);
  input.dispatchEvent(new w.Event("input")); await advance(300);
  const links = results.querySelectorAll("a");
  input.dispatchEvent(new w.KeyboardEvent("keydown",{key:"ArrowDown"})); assert.equal(d.activeElement,links[0]);
  const key = value => d.activeElement.dispatchEvent(new w.KeyboardEvent("keydown",{key:value,bubbles:true}));
  key("End"); assert.equal(d.activeElement,links[2]);
  key("Home"); assert.equal(d.activeElement,links[0]);
  key("ArrowUp"); assert.equal(d.activeElement,input);
  key("ArrowDown"); key("ArrowDown"); assert.equal(d.activeElement,links[1]);
  key("Escape"); assert.equal(d.activeElement,input); assert.equal(results.hidden,true); w.close();
});

test("a dismissed search cannot reopen from an already pending response", async () => {
  const dom = page({dashboard:true}); await settle(); const w=dom.window,d=w.document,input=d.getElementById("search");
  const advance = controlTimers(w);
  let resolve;
  w.fetch = () => new Promise(r=>{resolve=r;});
  input.focus(); input.value="Apple"; input.dispatchEvent(new w.Event("input"));
  await advance(300);
  await waitFor(() => typeof resolve === "function", "Search request did not start");
  d.getElementById("theme").focus();
  resolve({ok:true,json:async()=>({state:"ok",data:{result:[{symbol:"AAPL",type:"Common Stock",description:"Apple"}]}})});
  await settle(); assert.equal(d.getElementById("search-results").hidden,true);
  assert.equal(d.getElementById("search-results").children.length,0); w.close();
});
