const { test } = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const { readFileSync } = require("node:fs");
const script = readFileSync("MarketDesk/wwwroot/js/site.js", "utf8");
function site({ saved, blocked = false, token = "a".repeat(32) } = {}) {
  const dom = new JSDOM(`<head><meta name="stocklumo-analytics" content="${token}"></head><body><button id="theme"></button><p id="analytics-choice"></p><button data-privacy-open>Settings</button>${readFileSync("MarketDesk/Views/Shared/_PrivacyControls.cshtml", "utf8")}</body>`, { url: "https://stocklumo.onrender.com/settings", runScripts: "outside-only" });
  const w = dom.window; w.matchMedia = () => ({ matches: false });
  if (saved !== undefined) w.localStorage.setItem("stocklumo.privacy", JSON.stringify(saved));
  if (blocked) Object.defineProperty(w.navigator, "globalPrivacyControl", { value: true });
  w.eval(script); return dom;
}
test("analytics loads once only after explicit opt-in and can reopen preferences", () => {
  const dom = site(), w = dom.window, d = w.document;
  assert.equal(d.querySelector("#cloudflare-analytics"), null);
  assert.equal(d.querySelector("#privacy-panel").hidden, false);
  d.querySelector("#privacy-accept").click();
  assert.equal(d.querySelectorAll("#cloudflare-analytics").length, 1);
  assert.equal(JSON.parse(w.localStorage.getItem("stocklumo.privacy")).analytics, true);
  d.querySelector("[data-privacy-open]").click(); d.querySelector("#privacy-accept").click();
  assert.equal(d.querySelectorAll("#cloudflare-analytics").length, 1);
  dom.window.close();
});
test("rejecting, expired consent, invalid tokens and browser privacy signals do not track", () => {
  for (const options of [{}, { saved: {version:1, analytics:true, at:0} }, { saved:{version:1,analytics:true,at:Date.now()}, blocked:true }, { token: "bad" }]) {
    const dom = site(options), d = dom.window.document;
    assert.equal(d.querySelector("#cloudflare-analytics"), null);
    d.querySelector("#privacy-reject").click();
    assert.equal(d.querySelector("#cloudflare-analytics"), null);
    assert.equal(JSON.parse(dom.window.localStorage.getItem("stocklumo.privacy")).analytics, false);
    dom.window.close();
  }
});
test("saved consent restores, and disabled storage leaves an honest visit-only choice", () => {
  const dom = site({saved:{version:1,analytics:true,at:Date.now()}});
  assert.ok(dom.window.document.querySelector("#cloudflare-analytics")); dom.window.close();
  const other = site();
  other.window.Storage.prototype.setItem = () => { throw Error("blocked"); };
  other.window.document.querySelector("#privacy-reject").click();
  assert.match(other.window.document.querySelector("#privacy-feedback").textContent, /visit only/);
  other.window.close();
});
function backups() {
  const dom = new JSDOM(`<body>${readFileSync("MarketDesk/Views/Site/Settings.cshtml", "utf8")}</body>`, {url:"https://example.test/settings",runScripts:"outside-only"});
  dom.window.StocklumoMath = require("../MarketDesk/wwwroot/js/research-math.js");
  dom.window.eval(readFileSync("MarketDesk/wwwroot/js/backups.js", "utf8")); return dom;
}
async function upload(dom, text, size = text.length) {
  const input = dom.window.document.querySelector("#backup-file");
  Object.defineProperty(input,"files",{configurable:true,value:[{size,text:async()=>text}]});
  await input.onchange({target:input});
}
test("backup restore previews before replacement and leaves analytics consent untouched", async () => {
  const dom = backups(), w = dom.window;
  w.localStorage.setItem("stocklumo.watch", '["MSFT"]');
  w.localStorage.setItem("stocklumo.privacy", "private-choice");
  await upload(dom, JSON.stringify({app:"Stocklumo",version:1,data:{"stocklumo.watch":["AAPL"]}}));
  assert.equal(w.localStorage.getItem("stocklumo.watch"), '["MSFT"]');
  assert.match(w.document.querySelector("#backup-preview").textContent,/1 saved stocks/);
  w.document.querySelector("#backup-restore").click();
  assert.equal(w.localStorage.getItem("stocklumo.watch"), '["AAPL"]');
  assert.equal(w.localStorage.getItem("stocklumo.privacy"), "private-choice");
  w.close();
});
test("malformed, oversized and untrusted backup fields never overwrite saved records", async () => {
  const dom = backups(), w = dom.window;
  w.localStorage.setItem("stocklumo.watch", '["MSFT"]');
  for(const data of ['broken', JSON.stringify({app:"Stocklumo",version:1,data:{"Finnhub:ApiKey":"bad"}}), JSON.stringify({app:"Stocklumo",version:1,data:{"stocklumo.watch":["<script>"]}}), JSON.stringify({app:"Stocklumo",version:1,data:{"stocklumo.portfolio":[{symbol:"AAPL",quantity:-2}]}})]) {
    await upload(dom,data); assert.equal(w.document.querySelector("#backup-restore").hidden,true);
    assert.equal(w.localStorage.getItem("stocklumo.watch"), '["MSFT"]');
  }
  await upload(dom,"{}",129*1024);
  assert.match(w.document.querySelector("#backup-status").textContent,/128 KB/); w.close();
});
test("backup write failure rolls back earlier writes", async () => {
  const dom = backups(),w=dom.window;
  w.localStorage.setItem("stocklumo.watch", '["MSFT"]');
  const original = w.Storage.prototype.setItem; let failed=false;
  w.Storage.prototype.setItem=function(key,value){if(key==="stocklumo.theme"&&!failed){failed=true;throw Error("quota");} return original.call(this,key,value);};
  await upload(dom,JSON.stringify({app:"Stocklumo",version:1,data:{"stocklumo.watch":["AAPL"],"stocklumo.theme":"dark"}}));
  w.document.querySelector("#backup-restore").click();
  assert.equal(w.localStorage.getItem("stocklumo.watch"),'["MSFT"]');
  assert.match(w.document.querySelector("#backup-status").textContent,/retained/); w.close();
});

test("backup export contains only local user categories, never consent or unrelated secrets", () => {
  const dom = backups(), w = dom.window; let serialized;
  w.localStorage.setItem("stocklumo.watch", '["AAPL"]');
  w.localStorage.setItem("stocklumo.privacy", '{"analytics":true}');
  w.localStorage.setItem("unrelated-test-secret", "fixture-secret");
  w.Blob = class { constructor(parts) { serialized = parts.join(""); } };
  w.URL.createObjectURL = () => "blob:test"; w.URL.revokeObjectURL = () => {};
  w.HTMLAnchorElement.prototype.click = function() {};
  w.document.querySelector("#backup-export").click();
  const output = JSON.parse(serialized);
  assert.equal(output.version, 1); assert.equal(Object.keys(output.data).length, 5);
  assert.deepEqual(output.data["stocklumo.watch"], ["AAPL"]);
  assert.doesNotMatch(serialized, /analytics|fixture-secret|privacy/); w.close();
});
test("changing backup files discards stale file-reader results", async () => {
  const dom = backups(), w = dom.window; let finish;
  const input = w.document.querySelector("#backup-file");
  Object.defineProperty(input,"files",{configurable:true,value:[{size:100,text:()=>new Promise(resolve=>finish=resolve)}]});
  const earlier = input.onchange({target:input});
  await upload(dom, JSON.stringify({app:"Stocklumo",version:1,data:{"stocklumo.watch":["MSFT"]}}));
  finish(JSON.stringify({app:"Stocklumo",version:1,data:{"stocklumo.watch":["AAPL"]}}));
  await earlier; w.document.querySelector("#backup-restore").click();
  assert.equal(w.localStorage.getItem("stocklumo.watch"), '["MSFT"]'); w.close();
});
test("invalid comparison input exposes a focused error without provider requests", () => {
  const dom = new JSDOM(require("./page-fixture.cjs")(), {url:"https://example.test/compare",runScripts:"outside-only"}), w=dom.window;
  w.StocklumoMath = require("../MarketDesk/wwwroot/js/research-math.js"); let calls=0;
  w.fetch=()=>{calls++;throw Error("Unexpected provider request");};
  w.eval(readFileSync("MarketDesk/wwwroot/js/research.js","utf8"));
  const input=w.document.querySelector("#research-controls input"); input.value="<script>";
  [...w.document.querySelectorAll("button")].find(b=>b.textContent==="Compare").click();
  assert.equal(input.getAttribute("aria-invalid"),"true");
  assert.equal(w.document.activeElement,input);
  assert.equal(w.document.querySelector("#research-status").getAttribute("role"),"alert"); assert.equal(calls,0);
  input.dispatchEvent(new w.Event("input",{bubbles:true}));
  assert.equal(input.hasAttribute("aria-invalid"),false); w.close();
});
