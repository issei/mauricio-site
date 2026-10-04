import { pw, BASE, newCtx } from './lib.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire('D:/projetos/mauricio-site/package.json')('sharp');
const b = await pw.chromium.launch();
for (const [u,sel] of [['/devops-salesforce.html','a.btn-primary.px-8'],['/en/devops-salesforce.html','a.btn-primary.px-8'],['/salesforce-agentic-quickstart.html','input.chk'],['/proposta-observabilidade-mobile.html','a.inline-flex.items-center']]) {
  const c=await newCtx(b); await c.addInitScript(()=>{localStorage.setItem('consent_v',JSON.stringify({v:'2.0',ts:new Date().toISOString(),categories:{necessary:true,analytics:false,marketing:false,personalization:false},method:'reject_all'}));});
  const p=await c.newPage(); await p.goto(BASE+u,{waitUntil:'load'}); await p.waitForTimeout(1500); await p.addStyleTag({content:'*{scroll-behavior:auto!important}'});
  const total=await p.locator(sel).count(); const rows=[];
  for(let k=0;k<Math.min(total,4);k++){ const loc=p.locator(sel).nth(k); await loc.scrollIntoViewIfNeeded(); await p.keyboard.press('Tab'); // modality
    await loc.focus(); await p.waitForTimeout(500);
    const d=await loc.evaluate(e=>{const cs=getComputedStyle(e); const r=e.getBoundingClientRect(); const lab=e.closest('label'); const cs2=lab?getComputedStyle(lab):null; return {fv:e.matches(':focus-visible'), outline:cs.outline, shadow:cs.boxShadow.slice(0,50), rect:[r.x|0,r.y|0,r.width|0,r.height|0], appearance:cs.appearance, opacity:cs.opacity, labelOutline: lab?(lab.matches(':has(:focus-visible)')?'has-focus':'')+' '+cs2.outline:'' , cls:e.className.slice(0,30)};});
    const pad=8; const x=Math.max(0,d.rect[0]-pad), y=Math.max(0,d.rect[1]-pad), w=Math.min(1280-x,d.rect[2]+2*pad), h=Math.min(800-y,d.rect[3]+2*pad);
    let k2='n/a'; if(w>0&&h>0&&d.rect[1]>=0&&d.rect[1]<800){ const s1=await sharp(await p.screenshot({clip:{x,y,width:w,height:h}})).raw().toBuffer(); await loc.evaluate(e=>e.blur()); await p.waitForTimeout(200); const s2=await sharp(await p.screenshot({clip:{x,y,width:w,height:h}})).raw().toBuffer(); let n=0; for(let j=0;j<s1.length;j+=4) if(Math.abs(s1[j]-s2[j])+Math.abs(s1[j+1]-s2[j+1])+Math.abs(s1[j+2]-s2[j+2])>24) n++; k2=n; }
    rows.push(`#${k} fv=${d.fv} outline=${d.outline} shadow=${d.shadow} rect=${d.rect} diff=${k2} ${d.labelOutline}`); }
  console.log(u,sel,'count',total); rows.forEach(r=>console.log('  ',r)); await c.close(); }
await b.close();
