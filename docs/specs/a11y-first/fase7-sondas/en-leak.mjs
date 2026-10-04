import { pw, BASE, pages, newCtx, pool, write } from './lib.mjs';
const browser = await pw.chromium.launch();
const PT=/\b(Pular|Fechar|Aceitar|Recusar|Personalizar|Menu principal|Voltar|Próximo|Anterior|Abrir|Ecossistema|Cookies? e|privacidade importa|Preferências|Saiba|Ver |Enviar|Navegação|conteúdo)\b/i;
const res = await pool(pages.filter(p=>p.lang==='en'), 4, async(p)=>{
  const ctx=await newCtx(browser); const page=await ctx.newPage(); await page.goto(BASE+p.url,{waitUntil:'load'}); await page.waitForTimeout(2000);
  const r=await page.evaluate((src)=>{ const re=new RegExp(src,'i'); const hits=[]; const chk=(e,txt,kind)=>{ if(txt&&re.test(txt)) { let l=null; for(let a=e;a&&a.nodeType===1;a=a.parentElement){ if(a.hasAttribute('lang')){l=a.getAttribute('lang');break;} } hits.push(kind+':'+txt.trim().slice(0,50)+' [lang='+l+'] <'+e.tagName.toLowerCase()+'.'+(e.className+'').slice(0,18)+'>'); } };
    for(const e of document.querySelectorAll('[aria-label],[title],[alt]')) { chk(e,e.getAttribute('aria-label'),'aria-label'); chk(e,e.getAttribute('title'),'title'); }
    for(const e of document.querySelectorAll('a,button,summary,label')) if(!e.children.length||e.children.length<3) chk(e,e.textContent,'text');
    const eco=document.querySelector('eco-nav'); if(eco&&eco.shadowRoot){ for(const e of eco.shadowRoot.querySelectorAll('a,button,[aria-label]')) { chk(e,(e.getAttribute('aria-label')||'')+' '+(e.textContent||''),'eco-nav'); } }
    return hits; }, PT.source);
  await ctx.close(); return {id:p.id,hits:r};
});
write('en-pt-leak.json',res);
const agg={}; res.forEach(r=>r.hits.forEach(h=>{const k=h.replace(/\[lang=.*$/,'').slice(0,60); agg[k]=(agg[k]||0)+1;}));
console.log(Object.entries(agg).sort((a,b)=>b[1]-a[1]).slice(0,25));
console.log('pages with hits', res.filter(r=>r.hits.length).length,'/',res.length);
await browser.close();
