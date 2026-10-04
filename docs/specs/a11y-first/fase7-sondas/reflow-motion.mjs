import { pw, BASE, pages, newCtx, pool, write, isExc } from './lib.mjs';
const browser = await pw.chromium.launch();
// 4. reflow 320x256
const reflow = await pool(pages, 4, async (p) => {
  const ctx = await newCtx(browser, {viewport:{width:320,height:256}}); const page = await ctx.newPage();
  await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(1500);
  const r = await page.evaluate(()=>{ const de=document.documentElement; const over=[]; const vw=de.clientWidth;
    for(const e of document.body.querySelectorAll('*')){ const r=e.getBoundingClientRect(); if(r.width>0&&r.right>vw+1){ // ignore if clipped by overflow ancestor
        let clipped=false; for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const cs=getComputedStyle(a); if(/(hidden|auto|scroll|clip)/.test(cs.overflowX)){const ar=a.getBoundingClientRect(); if(ar.right<=vw+1){clipped=true;break;}}}
        if(!clipped) over.push(e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+'.'+[...e.classList].slice(0,2).join('.')+' right='+Math.round(r.right)); } }
    return { sw:de.scrollWidth, cw:de.clientWidth, bsw:document.body.scrollWidth, over:over.slice(0,4), nover:over.length, vp:document.querySelector('meta[name=viewport]')?.content }; });
  await ctx.close(); return { id:p.id, exc:isExc(p), ...r, scrolls:r.sw>r.cw };
});
write('reflow.json', reflow);
// 5. motion
async function motion(reduce){ return pool(pages, 4, async (p)=>{
  const ctx = await newCtx(browser, reduce?{reducedMotion:'reduce'}:{}); const page = await ctx.newPage();
  await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(1000);
  const r = await page.evaluate(()=>{ const an=document.getAnimations().filter(a=>a.playState==='running'); const inf=an.filter(a=>{const t=a.effect?.getComputedTiming?.(); return t&&t.iterations===Infinity;});
    const kinds={}; inf.forEach(a=>{const k=(a.animationName||a.constructor.name)+'@'+(a.effect?.target?.tagName||'?')+'.'+((a.effect?.target?.className||'')+'').toString().split(' ')[0].slice(0,25); kinds[k]=(kinds[k]||0)+1;});
    const vids=[...document.querySelectorAll('video')].map(v=>({paused:v.paused,autoplay:v.autoplay,loop:v.loop,muted:v.muted,controls:v.controls,src:(v.currentSrc||v.src||'').slice(-40)}));
    const auds=[...document.querySelectorAll('audio')].map(v=>({paused:v.paused,autoplay:v.autoplay}));
    const marq=document.querySelectorAll('marquee').length;
    return { running:an.length, infinite:inf.length, kinds, vids, auds, marq, canvas:document.querySelectorAll('canvas').length }; });
  await ctx.close(); return { id:p.id, exc:isExc(p), ...r }; }); }
write('motion-reduce.json', await motion(true));
write('motion-normal.json', await motion(false));
await browser.close();
console.log('done');
