// "Conteúdo refém do JavaScript" (A11Y.md §6): quanto texto fica invisível (opacity 0 / visibility hidden) SEM JS.
import { createRequire } from 'node:module';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
const ROOT = process.cwd(); // rode da raiz do repositório
const require = createRequire(ROOT + '/package.json');
const { chromium } = require('@playwright/test');
const BASE = process.argv[2] || 'http://localhost:4399';
const EXCL = /(^|[.-])(bkp|backup|template)$/i;
const pages = readdirSync(`${ROOT}/src`).filter((f) => f.endsWith('.html') && !EXCL.test(f.replace('.html', '')) && existsSync(`${ROOT}/dist/${f}`));
const b = await chromium.launch();
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
const out = [];
for (const f of pages) {
  const p = await ctx.newPage();
  try {
    await p.goto(`${BASE}/${f}`, { waitUntil: 'load', timeout: 45000 });
    out.push({ page: f, ...(await p.evaluate(() => {
      const total = (document.body?.textContent || '').replace(/\s+/g, ' ').trim().length;
      let hidden = 0; const sample = [];
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (!(+cs.opacity === 0 || cs.visibility === 'hidden')) continue;
        if (el.parentElement && el.parentElement.closest('*') && (() => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const c = getComputedStyle(a); if (+c.opacity === 0 || c.visibility === 'hidden') return true; } return false; })()) continue;
        if (el.closest('[aria-hidden="true"],noscript,script,style,template,dialog:not([open])')) continue;
        const t = (el.textContent || '').replace(/\s+/g, ' ').trim();
        if (t.length < 20) continue;
        hidden += t.length; if (sample.length < 3) sample.push(el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : '') + ` (${t.length})`);
      }
      return { total, hidden, pct: total ? Math.round((hidden / total) * 100) : 0, sample };
    })) });
  } catch (e) { out.push({ page: f, error: String(e).slice(0, 120) }); } finally { await p.close(); }
}
await b.close();
writeFileSync(new URL('./nojs.json', import.meta.url), JSON.stringify(out, null, 1));
for (const r of out.filter((r) => r.pct >= 5 || r.error)) console.log(r.page, r.pct + '%', r.hidden + '/' + r.total, r.sample?.join(' | ') || r.error);
