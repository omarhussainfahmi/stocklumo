const { waitFor } = require("./browser-async.cjs");
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { readFileSync } = require('node:fs');
const source = readFileSync('MarketDesk/wwwroot/js/motion.js','utf8');
function setup(reduced=false) {
  const dom = new JSDOM('<body><div id="pulse-bars"><svg class="down"><line x1="100"/><rect x="40" width="60" height="24"/></svg><svg class="up"><line x1="100"/><rect x="100" width="50" height="24"/></svg></div></body>',{runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window, calls=[], observed=new Set(); let intersect; const frames = [];
  w.requestAnimationFrame = callback => { frames.push(callback); return frames.length; };
  w.cancelAnimationFrame = () => {};
  w.matchMedia=()=>({matches:reduced,addEventListener(){}});
  w.IntersectionObserver=class {constructor(fn){intersect=fn;}observe(n){observed.add(n);}unobserve(n){observed.delete(n);}};
  w.Element.prototype.animate=function(frames,options){const a={cancel(){a.cancelled=true;}};calls.push({node:this,frames,options,animation:a});return a;};
  w.eval(source);
  return {dom,w,calls,frames,show(){intersect([...observed].map(target=>({target,isIntersecting:true})));}};
}
test('chart bars reveal from the true zero side without changing dimensions or values',()=>{
  const s=setup();s.show();assert.equal(s.calls.length,2);
  assert.equal(s.calls[0].frames[0].clipPath,'inset(0 0 0 100%)');
  assert.equal(s.calls[1].frames[0].clipPath,'inset(0 100% 0 0)');
  assert.equal(s.calls[0].node.getAttribute('width'),'60');
  assert.equal(s.calls[0].node.getAttribute('x'),'40');s.dom.window.close();
});
test('provider redraws do not restart chart entrances',async()=>{
  const s=setup();s.show();const root=s.w.document.getElementById('pulse-bars');root.replaceChildren(...[...root.childNodes].map(node=>node.cloneNode(true)));
  await waitFor(() => s.frames.length > 0, "Mutation observer did not schedule chart scan");
  s.frames.splice(0).forEach(callback => callback());s.show();assert.equal(s.calls.length,2);s.w.close();
});
test('reduced motion keeps all chart marks present without animations',()=>{
  const s=setup(true);s.show();assert.equal(s.calls.length,0);assert.equal(s.w.document.querySelectorAll('rect').length,2);s.w.close();
});
test('pagehide cancels active chart animations',()=>{
  const s=setup();s.show();s.w.dispatchEvent(new s.w.Event('pagehide'));assert.ok(s.calls.every(c=>c.animation.cancelled));s.w.close();
});
