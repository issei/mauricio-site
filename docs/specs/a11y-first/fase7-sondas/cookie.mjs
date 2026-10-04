import { pw, BASE, newCtx, write } from './lib.mjs';
const browser = await pw.chromium.launch();
const W=(p,ms=300)=>p.waitForTimeout(ms);
const where = (page)=>page.evaluate(()=>{const a=document.activeElement; return a.tagName+'#'+a.id+'.'+(a.className+'').slice(0,22)+' "'+((a.getAttribute('aria-label')||a.textContent||'').trim().replace(/\s+/g,' ').slice(0,22))+'"';});
// A) curriculo modal tab path
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/curriculo.html',{waitUntil:'load'}); await W(page,2500);
  const t=page.locator('button.btn-secondary.mt-4').first(); await t.scrollIntoViewIfNeeded(); await t.focus(); await page.keyboard.press('Enter'); await W(page,700);
  const seq=[await where(page)]; for(let i=0;i<8;i++){ await page.keyboard.press('Tab'); await W(page,150); seq.push(await where(page)); }
  console.log('curriculo modal tab path:\n '+seq.join('\n '));
  // click-less: does Esc close from deep?
  await ctx.close(); }
// B) cookie banner, fresh storage
const res={};
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/index.html',{waitUntil:'load'}); await W(page,2000);
  res.banner = await page.evaluate(()=>{const b=document.querySelector('.cc-banner'); if(!b) return null; const r=b.getBoundingClientRect(); const cs=getComputedStyle(b); return {tag:b.tagName, role:b.getAttribute('role'), label:b.getAttribute('aria-label')||b.getAttribute('aria-labelledby'), pos:cs.position, rect:[r.x|0,r.y|0,r.width|0,r.height|0], vis:cs.visibility, html:b.outerHTML.slice(0,200), bodyPadBottom:getComputedStyle(document.body).paddingBottom, htmlScrollPad:getComputedStyle(document.documentElement).scrollPaddingBottom, live:[...document.querySelectorAll('[aria-live],[role=status],[role=alert]')].map(e=>e.className+'|'+e.getAttribute('aria-live')+'|'+(e.textContent||'').trim().slice(0,40))}; });
  // path of focus order to banner: count Tab presses to reach .cc-btn-accept
  let n=0, found=-1; for(;n<200;n++){ await page.keyboard.press('Tab'); await W(page,25); const isAcc=await page.evaluate(()=>document.activeElement.classList.contains('cc-btn-accept')); if(isAcc){found=n+1;break;} }
  res.tabsToAccept=found;
  // operate by keyboard: Tab to Recusar (shift+tab once) press Enter
  await page.keyboard.press('Shift+Tab'); res.focusedBeforeReject=await where(page); await page.keyboard.press('Enter'); await W(page,800);
  res.afterReject = await page.evaluate(()=>({bannerGone:!document.querySelector('.cc-banner')||getComputedStyle(document.querySelector('.cc-banner')).display==='none'||document.querySelector('.cc-banner').hidden, stored:localStorage.getItem('consent_v')&&localStorage.getItem('consent_v').slice(0,90), active:document.activeElement.tagName+'#'+document.activeElement.id+'.'+(document.activeElement.className+'').slice(0,20)}));
  await ctx.close(); }
// C) cookie prefs dialog (fresh): focus 'Personalizar', Enter
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/index.html',{waitUntil:'load'}); await W(page,2000);
  const trig=page.locator('.cc-btn-customize'); await trig.focus(); await page.keyboard.press('Enter'); await W(page,700);
  const info=()=>page.evaluate(()=>{const d=document.querySelector('dialog[open]'); return {open:!!d, inside:!!d&&d.contains(document.activeElement), active:document.activeElement.tagName+'#'+document.activeElement.id+'.'+(document.activeElement.className+'').slice(0,20), role:d?.getAttribute('role'), label:d?.getAttribute('aria-label')||d?.getAttribute('aria-labelledby'), modalAttr:d?.matches(':modal')}; });
  res.prefsOpen=await info(); const ins=[]; for(let i=0;i<14;i++){ await page.keyboard.press('Tab'); await W(page,100); ins.push((await info()).inside);} res.prefsTabInside=ins.every(Boolean);
  await page.keyboard.press('Escape'); await W(page,700); res.prefsAfterEsc={...(await info()), focusNow: await where(page)};
  await ctx.close(); }
// D) EN banner too
{ const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+'/en/index.html',{waitUntil:'load'}); await W(page,2000);
  res.enBanner = await page.evaluate(()=>{const b=document.querySelector('.cc-banner'); return b?{lang:b.getAttribute('lang'), text:(b.textContent||'').replace(/\s+/g,' ').trim().slice(0,160)}:null;}); await ctx.close(); }
console.log(JSON.stringify(res,null,1)); write('cookie.json',res);
await browser.close();
