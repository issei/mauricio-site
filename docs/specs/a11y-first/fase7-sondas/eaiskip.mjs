import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch(); const c = await newCtx(b); const p = await c.newPage();
await p.goto(BASE+'/engenharia-agentes-ia.html',{waitUntil:'load'}); await p.waitForTimeout(1500);
const st = async(l)=>console.log(l, JSON.stringify(await p.evaluate(()=>({hash:location.hash, y:scrollY, act:document.activeElement.tagName+'.'+document.activeElement.className, mainTop:document.querySelector('main').getBoundingClientRect().top|0}))));
await st('load'); await p.keyboard.press('Tab'); await st('tab1'); await p.keyboard.press('Enter'); await p.waitForTimeout(800); await st('enter');
await p.keyboard.press('Tab'); await st('tab2');
// try click
await p.goto(BASE+'/engenharia-agentes-ia.html',{waitUntil:'load'}); await p.waitForTimeout(1500);
await p.keyboard.press('Tab'); 
const ev = await p.evaluate(()=>new Promise(res=>{const a=document.activeElement; a.addEventListener('click',e=>setTimeout(()=>res({defaultPrevented:e.defaultPrevented}),0)); a.click();}));
console.log('click', JSON.stringify(ev)); await st('afterclick');
await b.close();
