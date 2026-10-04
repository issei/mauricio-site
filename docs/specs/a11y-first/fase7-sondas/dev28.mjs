import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch(); const c = await newCtx(b); const p = await c.newPage();
await p.goto(BASE+'/devin.html',{waitUntil:'load'}); await p.waitForTimeout(2500);
for(let i=0;i<30;i++){ await p.keyboard.press('Tab'); await p.waitForTimeout(400); const t=await p.evaluate(()=>document.activeElement.className||''); if(String(t).includes('ep09-encerramento__cta')) break; }
await p.waitForTimeout(1500);
const info = await p.evaluate(()=>{const a=document.activeElement; const r=a.getBoundingClientRect(); const cs=getComputedStyle(a); const anc=[]; for(let e=a.parentElement;e&&e!==document.documentElement;e=e.parentElement){const s=getComputedStyle(e); if(s.overflow!=='visible'||s.clipPath!=='none') anc.push(e.tagName+'.'+(e.className+'').slice(0,30)+' ov='+s.overflow+' clip='+s.clipPath);} return {cls:a.className, rect:[r.x,r.y,r.width,r.height], scrollY, outline:cs.outline, offset:cs.outlineOffset, color:cs.color, bg:cs.backgroundColor, anc, focusVisible:a.matches(':focus-visible')};});
console.log(JSON.stringify(info,null,1));
const r=info.rect; await p.screenshot({path:'devin28-focused.png', clip:{x:Math.max(0,r[0]-60),y:Math.max(0,r[1]-40),width:r[2]+120,height:r[3]+80}});
await p.evaluate(()=>document.activeElement.blur()); await p.waitForTimeout(300);
await p.screenshot({path:'devin28-blurred.png', clip:{x:Math.max(0,r[0]-60),y:Math.max(0,r[1]-40),width:r[2]+120,height:r[3]+80}});
await b.close();
