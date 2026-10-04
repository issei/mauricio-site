import { pw, BASE, newCtx } from './lib.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire('D:/projetos/mauricio-site/package.json')('sharp');
const b = await pw.chromium.launch();
for (const u of ['/en/devops-salesforce.html','/devops-salesforce.html','/en/devops-salesforce.html','/en/devops-salesforce.html']) {
  const c=await newCtx(b); await c.addInitScript(()=>{localStorage.setItem('consent_v',JSON.stringify({v:'2.0',ts:new Date().toISOString(),categories:{necessary:true,analytics:false,marketing:false,personalization:false},method:'reject_all'}));});
  const p=await c.newPage(); await p.goto(BASE+u,{waitUntil:'load'}); await p.waitForTimeout(1500);
  const loc=p.locator('a.btn-primary.px-8').first(); await loc.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); await p.keyboard.press('Tab'); await loc.focus(); await p.waitForTimeout(1200);
  const r=await loc.evaluate(e=>{const r=e.getBoundingClientRect(); return [r.x|0,r.y|0,r.width|0,r.height|0, scrollY|0, getComputedStyle(e).opacity];});
  console.log('rect',r.join(',')); if(r[1]<0||r[1]>700){console.log('offscreen, skip');await c.close();continue;} const clip={x:Math.max(0,r[0]-10),y:Math.max(0,r[1]-10),width:r[2]+20,height:r[3]+20}; const s1=await p.screenshot({clip}); await loc.evaluate(e=>e.blur()); await p.waitForTimeout(400); const s2=await p.screenshot({clip});
  const a=await sharp(s1).raw().toBuffer(), bb=await sharp(s2).raw().toBuffer(); let n=0; for(let j=0;j<a.length;j+=4) if(Math.abs(a[j]-bb[j])+Math.abs(a[j+1]-bb[j+1])+Math.abs(a[j+2]-bb[j+2])>24) n++;
  console.log(u,'rect',r.join(','),'diff',n); await c.close(); }
await b.close();

