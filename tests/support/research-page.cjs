const {readFileSync} = require('node:fs');
const {JSDOM} = require('jsdom');
const math = require('../../MarketDesk/wwwroot/js/research-math.js');
const {flushTasks} = require('../browser-async.cjs');
async function researchPage(path, response, holdings) {
  const dom = new JSDOM(require("../page-fixture.cjs")(), { url: `https://example.test/${path}`, runScripts: "outside-only" });
  const w = dom.window;
  w.StocklumoMath = math; w.setInterval = () => 0;
  if (holdings) w.localStorage.setItem("stocklumo.portfolio", JSON.stringify(holdings));
  w.fetch = async url => ({ ok: true, json: async () => response(url) });
  w.eval(readFileSync("MarketDesk/wwwroot/js/research/view.js", "utf8"));
  w.eval(require("../research-scripts.cjs")());
  await flushTasks();
  return dom;
}
module.exports = {researchPage};
