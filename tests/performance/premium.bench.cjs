const {test,expect,dismissPrivacy}=require('../e2e/support/fixtures.cjs');
const fs=require('node:fs/promises');
// Local lab samples with isolated synthetic API fixtures; not field CWV or a
// provider-speed benchmark. Same browsers, fixtures and sampling window both runs.
for(const theme of ['dark','light']) for(const path of ['/','/stock/AAPL','/screener']) {
  test(`${theme} ${path} local lab sample`,async({page},info)=>{
    await page.addInitScript(theme=>{
      localStorage.setItem('stocklumo.theme',theme);
      window.__lab={lcp:null,cls:0,longTasks:0};
      try {new PerformanceObserver(list=>{for(const e of list.getEntries()) window.__lab.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});}catch{ /* This browser may not support this optional performance entry type. */ }
      try {new PerformanceObserver(list=>{for(const e of list.getEntries()) if(!e.hadRecentInput) window.__lab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});}catch{ /* This browser may not support this optional performance entry type. */ }
      try {new PerformanceObserver(list=>{for(const e of list.getEntries()) window.__lab.longTasks+=e.duration;}).observe({type:'longtask',buffered:true});}catch{ /* This browser may not support this optional performance entry type. */ }
    },theme);
    const start=Date.now();await page.goto(path);await dismissPrivacy(page);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
    if(path==='/stock/AAPL') await expect(page.locator('#price')).toHaveText('120.00');
    if(path==='/screener') await expect(page.locator('#research-results tbody tr')).toHaveCount(12);
    await page.evaluate(()=>document.fonts.ready);
    // A fixed quiet window is part of this lab protocol, not an app timeout.
    await page.waitForTimeout(1200);
    const metrics=await page.evaluate(()=>{
      const resources=performance.getEntriesByType('resource'),nav=performance.getEntriesByType('navigation')[0];
      return {...window.__lab,supported:PerformanceObserver.supportedEntryTypes,viewport:[innerWidth,innerHeight],ttfb:nav.responseStart-nav.requestStart,
        domContentLoaded:nav.domContentLoadedEventEnd,jsTransfer:resources.filter(e=>/\/js\//.test(e.name)).reduce((sum,e)=>sum+e.transferSize,0),
        resources:resources.length,apiRequests:resources.filter(e=>new URL(e.name).pathname.startsWith('/api/')).length};
    });
    const out=`output/premium-upgrade/${process.env.STOCKLUMO_BENCH_PHASE||'sample'}`;await fs.mkdir(out,{recursive:true});
    const name=`${info.project.name}-${theme}-${path==='/'?'home':path.replaceAll('/','-').slice(1)}`;
    await fs.writeFile(`${out}/${name}.json`,JSON.stringify({path,theme,browser:info.project.name,cache:'fresh context',network:'unthrottled loopback',cpu:'unthrottled host',fixture:'synthetic API interception',elapsedMs:Date.now()-start,...metrics},null,2));
    await page.screenshot({path:`${out}/${name}.png`,fullPage:true});
  });
}
