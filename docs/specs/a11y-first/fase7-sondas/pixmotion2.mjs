import { pw, BASE, newCtx } from './lib.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire('D:/projetos/mauricio-site/package.json')('sharp');
const b = await pw.chromium.launch();
for (const id of ['life','proposta-engenharia-reversa']) {
  const c = await newCtx(b,{reducedMotion:'reduce'}); const p = await c.newPage();
  await p.goto(BASE+`/${id}.html`,{waitUntil:'load'}); await p.waitForTimeout(2500);
  const A=await sharp(await p.screenshot()).raw().toBuffer(); await p.waitForTimeout(800); const B=await sharp(await p.screenshot()).raw().toBuffer();
  let x0=1e9,y0=1e9,x1=0,y1=0; for(let i=0;i<A.length;i+=4){ if(Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2])>30){ const px=(i/4)%1280, py=Math.floor(i/4/1280); x0=Math.min(x0,px);x1=Math.max(x1,px);y0=Math.min(y0,py);y1=Math.max(y1,py);} }
  const el=await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y); return e&&(e.tagName+'#'+e.id+'.'+(e.className+'').slice(0,40));},[(x0+x1)/2,(y0+y1)/2]);
  console.log(id,'bbox',x0,y0,x1,y1,'el:',el);
  const ctl = await p.evaluate(()=>[...document.querySelectorAll('button,[role=button],input[type=checkbox]')].map(e=>(e.getAttribute('aria-label')||e.textContent||'').trim().slice(0,30)).filter(t=>/paus|stop|anim|motion|mov|reduz/i.test(t)));
  console.log(' pause-like controls:',ctl);
  await c.close();
}
await b.close();
