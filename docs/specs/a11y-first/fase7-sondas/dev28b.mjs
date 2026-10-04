import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch(); const c = await newCtx(b); const p = await c.newPage();
await p.goto(BASE+'/devin.html',{waitUntil:'load'}); await p.waitForTimeout(2500);
for(let i=0;i<30;i++){ await p.keyboard.press('Tab'); await p.waitForTimeout(400); const t=await p.evaluate(()=>document.activeElement.className||''); if(String(t).includes('ep09-encerramento__cta')) break; }
await p.waitForTimeout(2500);
const info = await p.evaluate(()=>{const a=document.activeElement; const r=a.getBoundingClientRect(); const chain=[]; for(let e=a;e&&e!==document.documentElement;e=e.parentElement){const s=getComputedStyle(e); if(s.opacity!=='1'||s.visibility!=='visible'||s.transform!=='none'||s.filter!=='none') chain.push(e.tagName+'.'+(e.className+'').slice(0,40)+' op='+s.opacity+' vis='+s.visibility+' tf='+s.transform.slice(0,40));} const top=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2); return {chain, top: top&&(top.tagName+'.'+(top.className+'').slice(0,40)), text:a.textContent, mainScrollers:[...document.querySelectorAll('*')].filter(e=>e.scrollTop>0).map(e=>e.tagName+'.'+(e.className+'').slice(0,20)+' st='+e.scrollTop)};});
console.log(JSON.stringify(info,null,1));
await p.screenshot({path:'D:/projetos/mauricio-site/../'.slice(0,0)+'dev28full.png'.replace(/^/,'C:/Users/issei/AppData/Local/Temp/claude/D--projetos-mauricio-site/73dbc20e-5173-413e-987f-3dee8a866790/scratchpad/fase7/')});
await b.close();
