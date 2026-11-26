const path=require('path');
// Parte 2: carga fria, primeira rolagem em 0 / 500 / 3000 ms, seta e roda; trace de desempenho
const R=path.resolve(__dirname,'../../../../../../')+'/',fs=require('fs'),{chromium}=require(R+'node_modules/playwright');
const URLS={dev:'http://127.0.0.1:5180/nova-home.template.html',build:'http://127.0.0.1:5181/nova-home.template.html'};
(async()=>{const b=await chromium.launch();const res=[];
for(const [amb,U] of Object.entries(URLS))for(const espera of [0,500,3000])for(const modo of ['seta','roda']){
 const c=await b.newContext({viewport:{width:1440,height:900}});const p=await c.newPage();const cdp=await c.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
 await p.addInitScript(()=>{window.__lf=[];new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lf.push({t:Math.round(e.startTime),d:Math.round(e.duration),st:Math.round(e.styleAndLayoutStart?e.startTime+e.duration-e.styleAndLayoutStart:0)})}).observe({type:'long-animation-frame',buffered:true});
  window.__ls=0;new PerformanceObserver(l=>{for(const e of l.getEntries())window.__ls+=e.value}).observe({type:'layout-shift',buffered:true})});
 const tr=espera===0&&modo==='roda';if(tr)await b.startTracing(p,{path:R+`tmp/capturas-rev6/trace-${amb}.json`,screenshots:false,categories:['devtools.timeline','disabled-by-default-devtools.timeline','blink','cc','gpu','loading']});
 await p.goto(U,{waitUntil:'commit'});if(espera)await p.waitForTimeout(espera);else await p.waitForLoadState('domcontentloaded');
 const t0=await p.evaluate(()=>performance.now());const y0=await p.evaluate(()=>scrollY);
 if(modo==='seta'){await p.mouse.click(700,600);for(let i=0;i<6;i++){await p.keyboard.press('ArrowDown');await p.waitForTimeout(30)}}else{await p.mouse.move(700,450);for(let i=0;i<6;i++){await p.mouse.wheel(0,100);await p.waitForTimeout(30)}}
 await p.waitForTimeout(700);if(tr)await b.stopTracing();
 const r=await p.evaluate(a=>({lf:window.__lf.filter(x=>x.t>=a-50),ls:+window.__ls.toFixed(3),y:scrollY,fontes:document.fonts.status}),t0);
 res.push(`${amb} espera ${espera}ms ${modo}: rolou ${r.y-y0}px, quadros longos ${JSON.stringify(r.lf)}, layout-shift ${r.ls}, fontes ${r.fontes}`);await c.close()}
console.log(res.join('\n'));await b.close()})()
