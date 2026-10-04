import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch();
{ const c = await newCtx(b); const p = await c.newPage(); await p.goto(BASE+'/engenharia-agentes-ia.html',{waitUntil:'load'}); await p.waitForTimeout(1200);
  console.log('role=list lists computed list-style:', JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('ol[role=list],ul[role=list]')].map(l=>getComputedStyle(l).listStyleType+'/'+(l.firstElementChild?getComputedStyle(l.firstElementChild).display:'empty')).reduce((a,k)=>(a[k]=(a[k]||0)+1,a),{})))); }
{ const c = await newCtx(b,{reducedMotion:'reduce'}); const p = await c.newPage(); await p.goto(BASE+'/engenharia-agentes-ia.html',{waitUntil:'load'}); await p.waitForTimeout(1500);
  await p.keyboard.press('Tab'); await p.keyboard.press('Enter'); await p.waitForTimeout(500); await p.keyboard.press('Tab');
  console.log('EAI skip under reduce -> hash, next focus:', await p.evaluate(()=>location.hash+' | '+document.activeElement.tagName+'.'+document.activeElement.className+' | inMain='+document.querySelector('main').contains(document.activeElement))); }
{ const c = await newCtx(b); const p = await c.newPage(); await p.goto(BASE+'/engenharia-agentes-ia.html',{waitUntil:'load'}); await p.waitForTimeout(1500);
  // other anchor links on page: do they move focus? click-equivalent keyboard on first nav link with '#'
  const r = await p.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>a.getAttribute('href').length>1).length); console.log('EAI in-page anchors:', r); }
await b.close();
function lum(h){const n=parseInt(h.slice(1),16);return [n>>16&255,n>>8&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
const cr=(a,b)=>{const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return ((x+.05)/(y+.05)).toFixed(2);};
for(const [fg,bg] of [['#c9d1d9','#0d1117'],['#99a1af','#0d1117'],['#94a3b8','#0d1117'],['#58a6ff','#0d1117'],['#58a6ff','#161b22'],['#6a7282','#0d1117']]) console.log('own-calc',fg,'on',bg,cr(fg,bg));

