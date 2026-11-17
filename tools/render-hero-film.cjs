// node tools/render-hero-film.cjs <path-to-ffmpeg.exe>
// Requires the repository's existing Playwright installation and its Chromium.
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),{spawn,spawnSync}=require('node:child_process');
const ffmpeg=process.argv[2];if(!ffmpeg)throw Error('Pass an FFmpeg executable path.');
const dest='MarketDesk/wwwroot/media/hero',evidence='output/hero-film';fs.mkdirSync(dest,{recursive:true});fs.mkdirSync(evidence,{recursive:true});
async function encode(page,theme){
  const output=path.resolve(dest,`stocklumo-${theme}.mp4`);
  const args=['-y','-f','image2pipe','-vcodec','png','-framerate','30','-i','pipe:0','-an','-c:v','libx264','-preset','medium','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','-frames:v','450',output];
  const proc=spawn(ffmpeg,args,{stdio:['pipe','ignore','pipe']});let log='';proc.stderr.on('data',d=>log+=d);
  const done=new Promise((resolve,reject)=>{proc.on('error',reject);proc.on('close',code=>code?reject(Error(log)):resolve());});
  for(let frame=0;frame<450;frame++){
    await page.evaluate(({t,theme})=>window.render(t,theme),{t:frame/30,theme});
    const png=await page.locator('canvas').screenshot({animations:'allow'});
    if([0,90,180,270,360,449].includes(frame))fs.writeFileSync(`${evidence}/${theme}-${frame}.png`,png);
    if(frame===270)await page.locator('canvas').screenshot({path:`${dest}/stocklumo-${theme}-poster.jpg`,type:'jpeg',quality:90});
    if(!proc.stdin.write(png))await new Promise(r=>proc.stdin.once('drain',r));
    if(frame%90===0)console.log(`${theme}: ${frame}/450`);
  }
  proc.stdin.end();await done;fs.writeFileSync(`${evidence}/${theme}-encode.txt`,log);
  // Deterministic loop endpoint must be pixel-identical to frame zero.
  await page.evaluate(theme=>window.render(15,theme),theme);const endpoint=await page.locator('canvas').screenshot();
  if(!endpoint.equals(fs.readFileSync(`${evidence}/${theme}-0.png`)))throw Error('Loop endpoint mismatch');
  const webm=spawnSync(ffmpeg,['-y','-i',output,'-an','-c:v','libvpx-vp9','-b:v','0','-crf','33','-row-mt','1',path.resolve(dest,`stocklumo-${theme}.webm`)],{encoding:'utf8'});
  if(webm.status)throw Error(webm.stderr);
  const check=spawnSync(ffmpeg,['-i',output,'-f','null','-'],{encoding:'utf8'});fs.writeFileSync(`${evidence}/${theme}-decode.txt`,check.stderr);if(check.status)throw Error('Decode failed');
}
(async()=>{const browser=await chromium.launch();try{const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
  await page.setContent(fs.readFileSync('frontend/hero-film.html','utf8'));await page.addStyleTag({content:'html,body{margin:0;padding:0;overflow:hidden}canvas{display:block}'});
  for(const theme of ['dark','light']){await page.evaluate(({svg,font})=>window.prepare(svg,font),{svg:fs.readFileSync(`MarketDesk/wwwroot/images/stocklumo-mark${theme==='dark'?'-dark':''}.svg`,'utf8'),font:fs.readFileSync('MarketDesk/wwwroot/fonts/manrope-latin-600.woff2').toString('base64')});await encode(page,theme);}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
