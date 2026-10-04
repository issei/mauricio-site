import { pw, BASE, newCtx, pool } from './lib.mjs';
const b = await pw.chromium.launch();
const P=['operacao-capital-cognitivo','devin'];
await pool(P,4,async(id)=>{
  const ctx=await newCtx(b); await ctx.addInitScript(()=>{localStorage.setItem('consent_v',JSON.stringify({v:'2.0',ts:new Date().toISOString(),categories:{necessary:true,analytics:false,marketing:false,personalization:false},method:'reject_all'}));});
  const p=await ctx.newPage(); await p.goto(BASE+`/${id}.html`,{waitUntil:'load'}); await p.waitForTimeout(1800);
  const bad=[]; let n=0;
  for(let i=0;i<140;i++){ await p.keyboard.press('Tab'); n++;
    const ok = await p.waitForFunction(()=>{const a=document.activeElement; if(!a||a===document.body||a.tagName==='IFRAME') return true; const r=a.getBoundingClientRect(); if(r.width===0&&r.height===0) return false; return r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth;},null,{timeout:3500}).then(()=>true).catch(()=>false);
    if(!ok){ bad.push(await p.evaluate(()=>{const a=document.activeElement;const r=a.getBoundingClientRect();return a.tagName+'.'+(a.className+'').slice(0,20)+' "'+(a.getAttribute('aria-label')||a.textContent||'').trim().slice(0,25)+'" rect='+[r.x|0,r.y|0,r.width|0,r.height|0]+' scrollY='+(scrollY|0);})); }
    const end=await p.evaluate(()=>document.activeElement===document.body); if(end) break; }
  console.log(id,'stops',n,'never-in-viewport:',bad.length, JSON.stringify(bad.slice(0,6)));
  await ctx.close(); });
await b.close();

