import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch(); const c = await newCtx(b); const p = await c.newPage();
await p.goto(BASE+'/operacao-capital-cognitivo.html',{waitUntil:'load'}); await p.waitForTimeout(2000);
console.log(await p.evaluate(()=>{const a=document.getElementById('evidence-panel'); const cs=getComputedStyle(a); const r=a.getBoundingClientRect(); return {cls:a.className, tf:cs.transform, vis:cs.visibility, rect:[r.x|0,r.y|0,r.width|0], ariaHidden:a.getAttribute('aria-hidden'), inert:a.hasAttribute('inert'), role:a.getAttribute('role'), label:a.getAttribute('aria-label')||a.getAttribute('aria-labelledby'), innerW:innerWidth};}));
await b.close();
