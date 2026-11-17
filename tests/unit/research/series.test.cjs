const {test} = require("node:test");
const assert = require("node:assert/strict");
const {readFileSync} = require("node:fs");
const {JSDOM} = require("jsdom");
const math = require("../../../MarketDesk/wwwroot/js/research-math.js");

test("historical chart values stay inside their accessible disclosure", t => {
  const dom = new JSDOM('<main id="results"></main>', { runScripts: "outside-only" });
  t.after(() => dom.window.close());
  const w = dom.window;
  w.StocklumoMath = math;
  w.eval(readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8"));
  const host = w.document.getElementById("results");
  w.StocklumoResearchView.forHost(host).plot([{ name: "Fixture", points: [
    { time: Date.UTC(2026, 0, 1), value: 10 }, { time: Date.UTC(2026, 0, 2), value: 12 },
  ] }], "Comparison");
  const disclosure = host.querySelector("details");
  assert.equal(disclosure.querySelector("summary").textContent, "Historical chart values");
  assert.equal(disclosure.querySelectorAll("tbody tr").length, 2);
  assert.match(disclosure.textContent, /Fixture/);
  assert.equal(host.querySelectorAll(":scope > .table-wrap").length, 0);
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
    require("../../page-fixture.cjs")(),
    { url: "https://example.test/technical", runScripts: "outside-only" },
  );
  const w = dom.window;
  w.StocklumoMath = math;
  let requests = 0;
  w.fetch = () => { requests++; throw new Error("Disabled feature requested data"); };
  w.eval(readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8"));
  w.eval(require("../../research-scripts.cjs")());
  assert.equal(w.document.querySelector('a[href="/technical"]'), null);
  assert.equal(w.document.querySelector("#research").hidden, true);
  assert.equal(w.document.querySelector("#research-controls").children.length, 0);
  assert.equal(requests, 0);
  w.close();
});

test("range positions reject missing bounds and label values outside reported ranges", () => {
  assert.equal(math.pricePosition(null, 20, 15), null);
  assert.equal(math.pricePosition(20, 10, 15), null);
  assert.equal(math.pricePosition(0, 20, 15), null);
  assert.deepEqual(math.pricePosition(10, 20, 15), {fraction:0.5,outside:false,flat:false});
  assert.deepEqual(math.pricePosition(10, 20, 30), {fraction:1,outside:true,flat:false});
  assert.deepEqual(math.pricePosition(10, 10, 10), {fraction:0.5,outside:false,flat:true});
});

test("selection balance keeps missing prices and changes out of unchanged counts", () => {
  assert.deepEqual(math.breadth([{price:10,changePercent:1},{price:10,changePercent:-1},{price:10,changePercent:0},{price:null,changePercent:0},undefined]),
    {up:1,down:1,flat:1,missing:2});
});

test("distribution uses a logarithmic cap scale and excludes missing fields", () => {
  const data = math.distribution([{symbol:"A",marketCapMillions:10,changePercent:-2},{symbol:"B",marketCapMillions:100,changePercent:0},{symbol:"C",marketCapMillions:1000,changePercent:2},{symbol:"D",marketCapMillions:0,changePercent:2},{symbol:"E",marketCapMillions:20,changePercent:null}]);
  assert.deepEqual(data.points.map(p=>[p.symbol,p.x,p.y]),[["A",0,0],["B",0.5,0.5],["C",1,1]]);
  assert.equal(math.distribution([{marketCapMillions:null,changePercent:0}]),null);
  assert.deepEqual(math.distribution([{symbol:"A",marketCapMillions:10,changePercent:0}]).points,[{symbol:"A",x:0.5,y:0.5}]);
});
