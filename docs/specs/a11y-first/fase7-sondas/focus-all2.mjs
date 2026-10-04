import { pw, BASE, pages, newCtx, pool, write, isExc, OUT } from './lib.mjs';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const sharp = createRequire('D:/projetos/mauricio-site/package.json')('sharp');
const b = await pw.chromium.launch();
const prev=JSON.parse(fs.readFileSync(OUT+'/focus-sweep-all.json','utf8')); const want=new Set(prev.filter(r=>r.suspects.length).map(r=>r.id));
const res = await pool(pages.filter(p=>want.has(p.id)), 3, async (p)=>{
  const ctx=await newCtx(b); await ctx.addInitScript(()=>{localStorage.setItem('consent_v',JSON.stringify({v:'2.0',ts:new Date().toISOString(),categories:{necessary:true,analytics:false,marketing:false,personalization:false},method:'reject_all'}));});
  const page=await ctx.newPage(); await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(1500);
  await page.addStyleTag({content:'html,body,*{scroll-behavior:auto !important}'}); await page.keyboard.press('Tab');
  const n = await page.evaluate(()=>{ window.__f=[...document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary,[tabindex]:not([tabindex="-1"])')].filter(e=>{const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return r.width>=8&&r.height>=8&&cs.visibility!=='hidden'&&cs.display!=='none'&&!e.disabled&&!e.closest('[inert],[aria-hidden=true]');}); return window.__f.length;});
  const suspects=[]; const max=Math.min(n,160);
  for(let i=0;i<max;i++){
    const d = await page.evaluate((i)=>{ const e=window.__f[i]; e.scrollIntoView({block:'center',behavior:'instant'}); e.focus({preventScroll:true}); const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
      const ind = cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>0 || (cs.boxShadow&&cs.boxShadow!=='none');
      return { ind, fv:e.matches(':focus-visible'), rect:[r.x|0,r.y|0,r.width|0,r.height|0], name:(e.getAttribute('aria-label')||e.textContent||e.value||'').trim().replace(/\s+/g,' ').slice(0,25), tag:e.tagName.toLowerCase()+'.'+[...e.classList].slice(0,2).join('.'), ow:cs.outlineWidth, os:cs.outlineStyle }; }, i);
    if(!d.fv||d.ind) continue; // has computed indicator
    // confirm by pixel diff
    await page.waitForTimeout(250);
    const pad=6, vp=page.viewportSize(); const x=Math.max(0,d.rect[0]-pad), y=Math.max(0,d.rect[1]-pad), w=Math.min(vp.width-x,d.rect[2]+2*pad), h=Math.min(vp.height-y,d.rect[3]+2*pad);
    if(w<=0||h<=0||d.rect[1]>vp.height||d.rect[1]+d.rect[3]<0){ suspects.push({...d,diff:'offscreen'}); continue; }
    const s1=await sharp(await page.screenshot({clip:{x,y,width:w,height:h}})).raw().toBuffer();
    await page.evaluate(()=>document.activeElement.blur()); await page.waitForTimeout(120);
    const s2=await sharp(await page.screenshot({clip:{x,y,width:w,height:h}})).raw().toBuffer();
    let k=0; for(let j=0;j<s1.length;j+=4) if(Math.abs(s1[j]-s2[j])+Math.abs(s1[j+1]-s2[j+1])+Math.abs(s1[j+2]-s2[j+2])>24) k++;
    if(k<15) suspects.push({...d,diff:k});
  }
  await ctx.close(); return { id:p.id, exc:isExc(p), n, checked:max, suspects };
});
write('focus-sweep-2.json',res);
let t=0; for(const r of res){ if(r.suspects.length){ t+=r.suspects.length; console.log((r.exc?'[EXC] ':'')+r.id,'focusables',r.n,'suspects',r.suspects.length, JSON.stringify(r.suspects.slice(0,4).map(s=>s.tag+' "'+s.name+'" diff='+s.diff+' out='+s.os+' '+s.ow))); } }
console.log('pages',res.length,'checked',res.reduce((s,r)=>s+r.checked,0),'suspects total',t);
await b.close();
