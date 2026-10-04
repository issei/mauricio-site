import { pw, AxeBuilder, BASE, pages, newCtx, pool, write, isExc } from './lib.mjs';
const tags = ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'];
const browser = await pw.chromium.launch();
async function run(reduce) {
  return pool(pages, 4, async (p) => {
    const ctx = await newCtx(browser, reduce?{reducedMotion:'reduce'}:{});
    const page = await ctx.newPage();
    await page.goto(BASE+p.url, {waitUntil:'load', timeout:45000});
    await page.waitForTimeout(1200);
    const r = await new AxeBuilder({page}).withTags(tags).analyze();
    await ctx.close();
    return { id:p.id, exc:isExc(p), violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length,sample:v.nodes.slice(0,3).map(n=>n.target.join(' ')+' :: '+(n.failureSummary||'').split('\n')[1])})), incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.length})) };
  });
}
const a = await run(false); write('axe-normal.json', a);
const b = await run(true); write('axe-reduced.json', b);
await browser.close();
const tot = r=>r.reduce((s,x)=>s+(x.violations||[]).reduce((t,v)=>t+v.nodes,0),0);
console.log('normal nodes', tot(a), 'pages w/ viol', a.filter(x=>x.violations?.length).length, 'errors', a.filter(x=>x.error).length);
console.log('reduced nodes', tot(b));
