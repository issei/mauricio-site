import { pw, BASE, newCtx } from './lib.mjs';
const b = await pw.chromium.launch(); const c = await newCtx(b); const p = await c.newPage();
await p.goto(BASE+'/curriculo.html',{waitUntil:'load'}); await p.waitForTimeout(2500);
const info = await p.evaluate(()=>({ links:[...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]')].filter(e=>!e.closest('[hidden],[inert]')).length, modals:[...document.querySelectorAll('[role=dialog],dialog')].map(e=>e.tagName+'#'+e.id+' open='+e.open+' hidden='+e.hidden+' aria-modal='+e.getAttribute('aria-modal')+' display='+getComputedStyle(e).display), inert:[...document.querySelectorAll('[inert]')].map(e=>e.tagName+'#'+e.id+'.'+e.className.toString().slice(0,30)), banner: !!document.querySelector('.cc-banner')}));
console.log(JSON.stringify(info));
const log=[]; for(let i=0;i<30;i++){ await p.keyboard.press('Tab'); await p.waitForTimeout(250); log.push(await p.evaluate(()=>{const a=document.activeElement;return a.tagName+'.'+(a.id||'')+'.'+(a.className&&a.className.toString().slice(0,20))+' '+(a.textContent||'').trim().slice(0,20)+' y='+(scrollY|0)})); }
console.log(log.join('\n'));
await b.close();
