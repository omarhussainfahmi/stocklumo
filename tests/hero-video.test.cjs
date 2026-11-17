const {test}=require('node:test'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom'),fs=require('node:fs');
const source=fs.readFileSync('MarketDesk/wwwroot/js/hero/video.js','utf8');
function setup({reduced=false,saveData=false,pending=false}={}){
 const dom=new JSDOM('<html data-theme="light"><body><div id="hero-visual"><video id="hero-film"></video></div><button id="hero-film-toggle"></button></body></html>',{url:'https://example.test',runScripts:'outside-only',pretendToBeVisual:true}),w=dom.window,d=w.document,v=d.querySelector('video');
 let plays=0,reject;
 w.matchMedia=()=>({matches:reduced,addEventListener(){}});Object.defineProperty(w.navigator,'connection',{value:{saveData}});w.requestIdleCallback=fn=>fn();
 d.querySelector('#hero-visual').getBoundingClientRect=()=>({width:500,height:500,top:0,bottom:500});
 v.canPlayType=()=> 'probably';v.load=()=>{};v.pause=()=>{};v.play=()=>{plays++;return pending?new Promise((_,r)=>reject=r):Promise.resolve();};
 w.eval(source);w.dispatchEvent(new w.Event('load'));
 return {w,d,v,close:()=>w.close(),plays:()=>plays,reject:()=>reject?.(Error('Aborted by pause'))};
}
test('reduced-motion and Save-Data never attach a video source',()=>{
 for(const options of [{reduced:true},{saveData:true}]){const s=setup(options);assert.equal(s.v.hasAttribute('src'),false);assert.equal(s.plays(),0);s.close();}
});
test('an aborted play promise cannot overwrite Resume with a broken Play action',async()=>{
 const s=setup({pending:true}),b=s.d.getElementById('hero-film-toggle');b.click();s.reject();await Promise.resolve();await Promise.resolve();assert.equal(b.textContent,'Resume motion');const before=s.plays();b.click();assert.ok(s.plays()>before);s.close();
});
test('theme changes select the matching same-origin movie',async()=>{
 const s=setup();assert.ok(s.v.src.endsWith('owner-light-60fps.mp4'));s.d.documentElement.dataset.theme='dark';await Promise.resolve();assert.ok(s.v.src.endsWith('owner-dark-60fps.mp4'));s.close();
});

test('hero and background share pause state when session storage is blocked',()=>{
 const s=setup(),main=s.d.createElement('main'),background=s.d.createElement('button');
 main.id='main';main.append(s.d.getElementById('hero-visual'));s.d.body.prepend(main);
 background.dataset.backgroundMotion='';s.d.body.append(background);
 Object.defineProperty(s.w,'sessionStorage',{configurable:true,get(){throw Error('Storage blocked');}});
 s.w.eval(fs.readFileSync('MarketDesk/wwwroot/js/atmosphere.js','utf8'));
 const hero=s.d.getElementById('hero-film-toggle'),plays=s.plays();
 hero.click();
 assert.equal(s.w.StocklumoMotion.isPaused(),true);
 assert.equal(hero.textContent,'Resume motion');
 assert.equal(background.textContent,'Resume background motion');
 assert.equal(s.d.querySelector('.market-atmosphere').dataset.paused,'true');
 s.d.dispatchEvent(new s.w.Event('visibilitychange'));
 assert.equal(s.plays(),plays);
 background.click();
 assert.equal(hero.textContent,'Pause motion');
 assert.equal(s.w.StocklumoMotion.isPaused(),false);
 assert.ok(s.plays()>plays);s.close();
});
