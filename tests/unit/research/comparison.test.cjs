const {test} = require("node:test");
const assert = require("node:assert/strict");
const {researchPage} = require("../../support/research-page.cjs");
const {flushTasks} = require("../../browser-async.cjs");

test("comparison renders snapshots without historical controls or candle requests", async () => {
  const requests=[];
  const dom=await researchPage("compare",url=>{
    requests.push(url);
    return {state:"ok",symbol:url.split('/').at(-1),price:12,currency:"USD",changePercent:2,marketCapMillions:1000,peTtm:15,dividendYieldTtm:1,timestamp:1700086400};
  });
  const w=dom.window,d=w.document;
  const run=[...d.querySelectorAll('button')].find(b=>b.textContent==='Compare');
  run.click(); await flushTasks();
  assert.equal(d.querySelector('#research-controls select'),null);
  assert.ok(![...d.querySelectorAll('button')].some(b=>b.textContent==='Retry history'));
  assert.equal(d.querySelector('.comparison-mode strong').textContent,'Latest snapshot');
  assert.match(d.querySelector('#comparison-range-help').textContent,/Historical prices are unavailable/);
  assert.equal(d.querySelectorAll('.comparison-metrics figure').length,3);
  assert.deepEqual([...d.querySelectorAll('.data-bar strong')].map(n=>n.textContent),['AAPL','MSFT']);
  assert.match(d.querySelector('.bar-chart figcaption').textContent,/not a historical return/);
  assert.ok(requests.every(url=>url.startsWith('/api/research/stock/')));
  assert.equal(d.querySelector('.research-chart'),null);
  const before=requests.length;
  d.querySelector('#research-controls input').value='AAPL';run.click();
  assert.equal(requests.length,before);
  assert.match(d.querySelector('#research-status').textContent,/2 to 5/);
  w.close();
});

test("comparison can refresh latest figures without fetching history", async () => {
  let price=12; const requests=[];
  const dom=await researchPage("compare",url=>{requests.push(url);return {state:"ok",symbol:url.split('/').at(-1),price,currency:"USD",changePercent:2};});
  const w=dom.window,d=w.document,run=[...d.querySelectorAll('button')].find(b=>b.textContent==='Compare');
  run.click();await flushTasks();
  assert.match(d.querySelector('tbody').textContent,/12 USD/);
  price=15;run.click();await flushTasks();
  assert.match(d.querySelector('tbody').textContent,/15 USD/);
  assert.equal(requests.length,4);
  assert.ok(requests.every(url=>!url.includes('/chart')));
  w.close();
});
