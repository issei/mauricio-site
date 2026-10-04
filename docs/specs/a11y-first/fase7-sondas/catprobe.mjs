import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch(); const c = await newCtx(b); const p = await c.newPage();
await p.goto(BASE+'/catalogo.html',{waitUntil:'load'}); await p.waitForTimeout(2000);
for(let i=0;i<40;i++){ await p.keyboard.press('Tab'); await p.waitForTimeout(900);
  const r = await p.evaluate(()=>{const a=document.activeElement; const r=a.getBoundingClientRect(); let tr=[]; for(let e=a;e&&e!==document.documentElement;e=e.parentElement){const cs=getComputedStyle(e); if(cs.transform!=='none'||cs.opacity!=='1') tr.push(e.tagName+'.'+(e.className||'').toString().slice(0,25)+' tf='+cs.transform.slice(0,30)+' op='+cs.opacity);} return {y:scrollY|0, max:document.documentElement.scrollHeight-innerHeight, top:r.top|0, bottom:r.bottom|0, h:innerHeight, name:(a.textContent||'').trim().slice(0,25), tr};});
  if(r.top>r.h-20||r.bottom<0||r.tr.length) console.log(i, JSON.stringify(r)); }
await p.screenshot({path:'cat-last.png'});
await b.close();
