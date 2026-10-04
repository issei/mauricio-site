import { pw, BASE, newCtx } from './lib.mjs';
import { createRequire } from 'node:module';
const sharp = createRequire('D:/projetos/mauricio-site/package.json')('sharp');
const b = await pw.chromium.launch();
for (const id of ['devin','life','life3d','proposta-engenharia-reversa','index','terminal-evolutivo']) {
  const c = await newCtx(b,{reducedMotion:'reduce'}); const p = await c.newPage();
  await p.goto(BASE+`/${id}.html`,{waitUntil:'load'}); await p.waitForTimeout(2500);
  const shots=[]; for(let i=0;i<3;i++){ shots.push(await sharp(await p.screenshot()).raw().toBuffer()); await p.waitForTimeout(700); }
  const d=(a,b)=>{let n=0;for(let i=0;i<a.length;i+=4){ if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>30) n++; } return n;};
  console.log(id,'changed px between frames:',d(shots[0],shots[1]),d(shots[1],shots[2]));
  await c.close();
}
await b.close();
