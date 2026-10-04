import { pw, BASE, newCtx, write } from './lib.mjs';
const out=[];
const browser = await pw.chromium.launch();
const W=(p,ms=300)=>p.waitForTimeout(ms);
const where = (page)=>page.evaluate(()=>{const a=document.activeElement; return a.tagName+'#'+a.id+'.'+(a.className+'').slice(0,30)+' "'+((a.getAttribute('aria-label')||a.textContent||'').trim().slice(0,25))+'"';});
// generic: focus trigger, Enter, check inside dialog, Tab x N, Esc, focus return
async function testDialog(page, {name, triggerSel, dialogSel, closeKey='Escape', n=14}){
  const r={name};
  const trig = page.locator(triggerSel).first();
  if(!(await trig.count())){ r.error='trigger not found'; return r; }
  await trig.scrollIntoViewIfNeeded(); await trig.focus(); await W(page,500);
  r.triggerDesc = await where(page);
  await page.keyboard.press('Enter'); await W(page,700);
  const insideInfo = ()=>page.evaluate((s)=>{const d=document.querySelector(s); const a=document.activeElement; const r=d?d.getBoundingClientRect():null; const open=d&&(d.open===true||(d.tagName!=='DIALOG'&&getComputedStyle(d).display!=='none'&&getComputedStyle(d).visibility!=='hidden'&&r.width>0)); return {open:!!open, inside:!!d&&d.contains(a), role:d?.getAttribute('role'), modal:d?.getAttribute('aria-modal'), label:d?.getAttribute('aria-label')||d?.getAttribute('aria-labelledby'), labelResolved: (()=>{const id=d?.getAttribute('aria-labelledby'); return id?!!document.getElementById(id):null;})(), active:a.tagName+'#'+a.id}; }, dialogSel);
  r.afterOpen = await insideInfo();
  const escaped=[]; for(let i=0;i<n;i++){ await page.keyboard.press('Tab'); await W(page,120); const s=await insideInfo(); escaped.push(s.inside); }
  r.tabInsideAll = escaped.every(Boolean); r.tabOutsideCount = escaped.filter(x=>!x).length;
  // shift tab
  const sh=[]; for(let i=0;i<4;i++){ await page.keyboard.press('Shift+Tab'); await W(page,120); sh.push((await insideInfo()).inside); } r.shiftTabInside = sh.every(Boolean);
  // background reachable? check inert/aria-hidden on siblings is skipped; use Tab test above
  await page.keyboard.press(closeKey); await W(page,700);
  r.afterClose = await insideInfo(); r.focusAfterClose = await where(page);
  r.focusReturnedToTrigger = r.focusAfterClose===r.triggerDesc;
  return r;
}
// ---- curriculo
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/curriculo.html',{waitUntil:'load'}); await W(page,2500);
  // pre-dismiss cookies? keep banner (fresh user). 
  out.push(await testDialog(page,{name:'curriculo project-modal (Saiba Mais #1)', triggerSel:'#projects button.btn-secondary, button.btn-secondary.mt-4', dialogSel:'#project-modal'}));
  out.push(await testDialog(page,{name:'curriculo project-modal (EN-less 2nd)', triggerSel:'button.btn-secondary.mt-4 >> nth=2', dialogSel:'#project-modal'}));
  await ctx.close(); }
// ---- operacao
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/operacao-capital-cognitivo.html',{waitUntil:'load'}); await W(page,2500);
  const dlgs = await page.evaluate(()=>[...document.querySelectorAll('dialog')].map(d=>d.id+' open='+d.open+' labelledby='+d.getAttribute('aria-labelledby')+' lblEl='+!!document.getElementById(d.getAttribute('aria-labelledby')||'x')+' aria-label='+d.getAttribute('aria-label')));
  out.push({name:'operacao dialogs list', dlgs});
  const btns = await page.evaluate(()=>[...document.querySelectorAll('button')].map(b=>b.id+'|'+(b.textContent||'').trim().slice(0,30)+'|vis='+(b.getBoundingClientRect().width>0)));
  out.push({name:'operacao buttons', btns});
  out.push(await testDialog(page,{name:'operacao glossary-dialog via #btn-glossary-intro', triggerSel:'#btn-glossary-intro', dialogSel:'#glossary-dialog'}));
  await ctx.close(); }
// ---- life3d
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/life3d.html',{waitUntil:'load'}); await W(page,2500);
  const info = await page.evaluate(()=>{ const i=document.getElementById('intro'); return {introHTML:i.innerHTML.replace(/\s+/g,' ').slice(0,400), active:document.activeElement.tagName+'#'+document.activeElement.id, bgInert: document.querySelector('main')?.hasAttribute('inert')}; });
  out.push({name:'life3d intro', ...info});
  const seq=[]; for(let i=0;i<6;i++){ await page.keyboard.press('Tab'); await W(page,150); seq.push(await where(page)); } out.push({name:'life3d tab seq', seq});
  await ctx.close(); }
write('dialogs.json', out);
console.log(JSON.stringify(out,null,1));
await browser.close();
