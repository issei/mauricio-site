import { pw, BASE, pages, newCtx, pool, write, isExc } from './lib.mjs';
const browser = await pw.chromium.launch();
const r = await pool(pages, 4, async (p)=>{
  const ctx = await newCtx(browser,{reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{ window.__raf=0; const o=window.requestAnimationFrame; window.requestAnimationFrame=function(cb){ window.__raf++; return o.call(window,cb); }; window.__tl=0; const st=window.setInterval; });
  const page = await ctx.newPage(); await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(1500);
  const a = await page.evaluate(()=>window.__raf); await page.waitForTimeout(2000); const b = await page.evaluate(()=>window.__raf);
  await ctx.close(); return { id:p.id, exc:isExc(p), rafPerSec:(b-a)/2 };
});
write('raf-reduce.json', r);
r.filter(x=>x.rafPerSec>3).forEach(x=>console.log(x.id, x.rafPerSec));
await browser.close();
