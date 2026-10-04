import { pw, BASE, pages, newCtx, pool, write } from './lib.mjs';
const browser = await pw.chromium.launch();
const out = { tablists:[], dialogs:[], cookie:[] };
const K = async (page,key)=>{ await page.keyboard.press(key); await page.waitForTimeout(250); };
const snap = (sel)=>({sel});
// ---- TABLISTS on all PT+EN pages
const tl = await pool(pages.filter(p=>!['admin','admin-editor'].includes(p.id)), 4, async (p)=>{
  const ctx = await newCtx(browser); const page = await ctx.newPage();
  await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(1800);
  const n = await page.evaluate(()=>document.querySelectorAll('[role=tablist]').length);
  const res=[];
  for(let i=0;i<n;i++){
    const info = await page.evaluate((i)=>{ const l=document.querySelectorAll('[role=tablist]')[i]; const tabs=[...l.querySelectorAll('[role=tab]')]; const nonTabBtns=[...l.querySelectorAll('button,a')].filter(b=>b.getAttribute('role')!=='tab').length;
      const vis=(()=>{const r=l.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(l).visibility!=='hidden';})();
      return { label:l.getAttribute('aria-label')||l.getAttribute('aria-labelledby'), orient:l.getAttribute('aria-orientation'), n:tabs.length, nonTabBtns, vis,
        tabindex:tabs.map(t=>t.getAttribute('tabindex')), selected:tabs.map(t=>t.getAttribute('aria-selected')),
        controls:tabs.map(t=>{const c=t.getAttribute('aria-controls'); const el=c&&document.getElementById(c); return c?(el?(el.getAttribute('role')||'noRole'):'MISSING'):'none';}),
        panelLabelled:tabs.map(t=>{const c=t.getAttribute('aria-controls'); const el=c&&document.getElementById(c); return el?(el.getAttribute('aria-labelledby')===t.id||!!el.getAttribute('aria-label')):null;}) }; }, i);
    if(!info.vis||info.n===0){ res.push({i,...info,kb:'skipped (invisible/no tabs)'}); continue; }
    // keyboard test
    const kb = await page.evaluate((i)=>{ const l=document.querySelectorAll('[role=tablist]')[i]; const tabs=[...l.querySelectorAll('[role=tab]')]; const sel=tabs.find(t=>t.getAttribute('aria-selected')==='true')||tabs[0]; sel.scrollIntoView({block:'center'}); sel.focus(); return tabs.indexOf(sel); }, i);
    await page.waitForTimeout(700);
    const state = ()=>page.evaluate((i)=>{ const l=document.querySelectorAll('[role=tablist]')[i]; const tabs=[...l.querySelectorAll('[role=tab]')]; return { focus:tabs.indexOf(document.activeElement), sel:tabs.findIndex(t=>t.getAttribute('aria-selected')==='true'), tab0:tabs.map((t,k)=>t.getAttribute('tabindex')==='0'?k:-1).filter(k=>k>=0) }; }, i);
    const seq=[]; seq.push(['start',await state()]);
    const horiz = info.orient!=='vertical';
    for(const key of [horiz?'ArrowRight':'ArrowDown', horiz?'ArrowLeft':'ArrowUp','End','Home']){ await K(page,key); seq.push([key,await state()]); }
    // Tab leaves the tablist?
    await K(page,'Tab'); const left = await page.evaluate((i)=>{const l=document.querySelectorAll('[role=tablist]')[i]; return !l.contains(document.activeElement);}, i); seq.push(['Tab-leaves',left]);
    res.push({i,...info,kbStartIdx:kb,seq});
  }
  await ctx.close(); return {id:p.id, n, res};
});
out.tablists = tl;
write('tablists.json', out.tablists);
await browser.close(); console.log('tablists done');
