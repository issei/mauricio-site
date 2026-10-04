import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch();
const ctx = await newCtx(b,{viewport:{width:375,height:812}}); const p = await ctx.newPage();
for (const [u,sel] of [['/salesforce-agentic-quickstart.html','button.lg\\:hidden'],['/salesforce-agentic-dev.html','button.lg\\:hidden'],['/proposta-observabilidade-mobile.html','#mobile-menu-btn']]) {
  await p.goto(BASE+u,{waitUntil:'load'}); await p.waitForTimeout(1500);
  const info = await p.evaluate((s)=>{ const e=document.querySelector(s); if(!e) return 'nf'; const r=e.getBoundingClientRect(); return {html:e.outerHTML.replace(/\s+/g,' ').slice(0,260), vis:r.width>0, aria:e.getAttribute('aria-label'), expanded:e.getAttribute('aria-expanded'), controls:e.getAttribute('aria-controls')}; }, sel);
  console.log(u, JSON.stringify(info)); try { console.log(await p.locator(sel).first().ariaSnapshot()); } catch(e){ console.log('snap err',String(e).slice(0,80)); }
}
// EN devin contrast at 375
await p.goto(BASE+'/en/devin.html',{waitUntil:'load'}); await p.waitForTimeout(2000);
const { AxeBuilder } = await import('./lib.mjs');
const a = await new AxeBuilder({page:p}).withRules(['color-contrast']).analyze();
a.violations.forEach(v=>v.nodes.forEach(n=>console.log('EN devin 375 contrast:', n.target.join(' '), n.any[0]?.message)));
await p.goto(BASE+'/devin.html',{waitUntil:'load'}); await p.waitForTimeout(2000);
const a2 = await new AxeBuilder({page:p}).withRules(['color-contrast']).analyze(); console.log('PT devin 375 contrast viol:', a2.violations.length);
// Chrome keyboard-focusable scrollers test
await p.goto(BASE+'/agent-ready.html',{waitUntil:'load'}); await p.waitForTimeout(1500);
let reached=false, steps=0; for(let i=0;i<150&&!reached;i++){ await p.keyboard.press('Tab'); steps++; reached=await p.evaluate(()=>/tablewrap/.test(document.activeElement.className)); }
console.log('agent-ready 375: Tab reaches .ar-tablewrap?', reached, 'steps', steps, 'chromium', b.version());
await b.close();
