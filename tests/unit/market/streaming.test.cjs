const {test} = require("node:test");
const assert = require("node:assert/strict");
const {page} = require("../../support/market-page.cjs");
const {flushTasks: settle} = require("../../browser-async.cjs");

test("stream recovery relies on explicit server admission without redundant profile requests", async () => {
  const dom = page();
  await settle();
  const profiles = () =>
    dom.requests.filter((url) => url.endsWith("/profile")).length;
  const before = profiles();
  dom.streams.at(-1).onerror();
  await settle();
  assert.equal(profiles(), before);
  dom.streams.at(-1).onerror();
  await settle();
  assert.equal(profiles(), before);
  assert.equal(
    dom.window.document.getElementById("connection").textContent,
    "DISCONNECTED",
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

test("a stalled stream is replaced and closed-market prices are explained", async () => {
  const dom = page({dashboard:true}); await settle();
  const old = dom.streams.at(-1), now = dom.window.Date.now();
  dom.window.Date.now = () => now + 61000;
  dom.timers.at(-1)();
  assert.equal(old.closed,true); assert.notEqual(dom.streams.at(-1),old);
  dom.streams.at(-1).onmessage({data:JSON.stringify({status:'connected',message:'Connected',stocks:[{symbol:'AAPL',price:100,updatedAt:'2020-01-01T00:00:00Z'}]})});
  assert.match(dom.window.document.getElementById('notice').textContent,/outside regular trading hours/);
  assert.match(dom.window.document.querySelector('#ticker-stocks .age').textContent,/market closed/);
  dom.window.close();
});

test("a handshake and heartbeats cannot claim live; only a fresh received US trade can", async () => {
  const dom = page({ dashboard: true, marketOpen: true }); await settle();
  const w = dom.window, stream = dom.streams.at(-1), label = w.document.getElementById("connection");
  const send = stocks => stream.onmessage({ data: JSON.stringify({ status: "connected", stocks }) });
  send([]); assert.equal(label.textContent, "STALE");
  const updatedAt = new Date(w.Date.now()).toISOString();
  send([{ symbol: "AAPL", price: 101, updatedAt, source: "Quote" }]);
  assert.equal(label.textContent, "STALE");
  send([{ symbol: "AAPL", price: 102, updatedAt, source: "Trade", tradeReceivedAt: updatedAt }]);
  assert.equal(label.textContent, "LIVE");
  assert.match(w.document.getElementById("summary-change").textContent, /%$/);
  assert.match(w.document.querySelector('#ticker-stocks .age').textContent, /live/);
  const start = w.Date.now(); w.Date.now = () => start + 181000;
  await dom.timers[0](); send([]); assert.equal(label.textContent, "STALE");
  dom.window.close();
});

test("discarded connection callbacks and hidden-page timers cannot revive an old stream", async () => {
  const dom = page({ dashboard: true }); await settle();
  const old = dom.streams.at(-1), w = dom.window;
  w.dispatchEvent(new w.Event("online")); await settle();
  const current = dom.streams.at(-1); assert.notEqual(old, current);
  old.onmessage({data:JSON.stringify({status:"connected",stocks:[{symbol:"AAPL",price:999,updatedAt:new Date().toISOString()}]})});
  assert.doesNotMatch(w.document.querySelector('#ticker-stocks .last').textContent, /999/);
  old.onerror(); assert.notEqual(w.document.getElementById("connection").textContent,"DISCONNECTED");
  w.dispatchEvent(new w.Event("pagehide"));
  const count = dom.streams.length; dom.timers.at(-1)(); w.dispatchEvent(new w.Event("online")); await settle();
  assert.equal(dom.streams.length,count); assert.equal(current.closed,true); dom.window.close();
});

test("invalid, future and unsolicited prices are ignored while quote failures stay visible", async () => {
  const dom = page({ dashboard:true, marketOpen:true }); await settle();
  const stream = dom.streams.at(-1), w=dom.window;
  stream.onmessage({data:"null"}); stream.onmessage({data:"not json"});
  stream.onmessage({data:JSON.stringify({status:"connected",stocks:[null,{symbol:"AAPL",price:999,updatedAt:"2999-01-01T00:00:00Z"},{symbol:"UNKNOWN",price:20,updatedAt:new Date().toISOString()},{symbol:"MSFT",quoteState:"limited",price:null}]})});
  assert.match(w.document.querySelector('#ticker-stocks .last').textContent,/100/);
  assert.equal(w.document.getElementById("connection").textContent,"ERROR");
  assert.match(w.document.getElementById("notice").textContent,/MSFT/); dom.window.close();
});

test("market status expires instead of assuming an old closure is still valid", async () => {
  const dom=page({dashboard:true}); await settle(); const w=dom.window;
  const send=()=>dom.streams.at(-1).onmessage({data:JSON.stringify({status:"connected",stocks:[]})});
  send(); assert.equal(w.document.getElementById("connection").textContent,"MARKET CLOSED");
  const initial=w.Date.now(); w.Date.now=()=>initial+121000; send();
  assert.equal(w.document.getElementById("connection").textContent,"STALE");
  assert.match(w.document.getElementById("notice").textContent,/could not be verified/); dom.window.close();
});
