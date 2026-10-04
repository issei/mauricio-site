import { pw, BASE, pages, newCtx, pool, write, AxeBuilder, isExc } from './lib.mjs';
const browser = await pw.chromium.launch();
const p1 = await (await newCtx(browser)).newPage();
await p1.goto(BASE+'/engenharia-agentes-ia.html',{waitUntil:'load'}); await p1.waitForTimeout(1500);
console.log(await p1.evaluate(()=>{const i=document.querySelector('img.eai-video__poster'); const p=i.closest('button,a,figure,div'); return p.outerHTML.replace(/\s+/g,' ').slice(0,500);}));
await p1.goto(BASE+'/engenharia-confianca.html',{waitUntil:'load'}); await p1.waitForTimeout(1500);
console.log(await p1.evaluate(()=>{const s=document.querySelector('svg.diagram-container__svg'); return s.outerHTML.slice(0,300)+' ||| parent: '+s.parentElement.outerHTML.replace(/<svg[\s\S]*<\/svg>/,'<svg/>').slice(0,400)+' ||| desc:'+!!s.querySelector('desc,title')+' labelledby:'+s.getAttribute('aria-labelledby')+' hidden:'+s.closest('[aria-hidden=true]')?.tagName;}));
// axe at mobile 375
const tags = ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'];
const r = await pool(pages, 4, async (p)=>{ const ctx=await newCtx(browser,{viewport:{width:375,height:812}}); const page=await ctx.newPage(); await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(1500);
  const a=await new AxeBuilder({page}).withTags(tags).analyze(); await ctx.close();
  return {id:p.id,exc:isExc(p),violations:a.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,sample:v.nodes.slice(0,2).map(n=>n.target.join(' ').slice(0,100))}))}; });
write('axe-mobile375.json', r);
for(const x of r){ const v=x.violations.filter(v=>!['aria-allowed-attr','aria-prohibited-attr'].includes(v.id)&&!(v.id==='button-name'&&/ytm/.test(JSON.stringify(v.sample)))); if(v.length) console.log((x.exc?'[EXC] ':'')+x.id, v.map(v=>`${v.id}(${v.impact},${v.nodes}) ${JSON.stringify(v.sample)}`).join(' ; ')); }
await browser.close();
