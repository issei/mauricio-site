// SC 2.4.11: foco INTEIRAMENTE coberto por cabeçalho fixo/sticky ao navegar com Shift+Tab (de baixo para cima).
// Consentimento pré-gravado para isolar o cabeçalho do banner de cookies (já coberto por independent.spec.js).
import { createRequire } from 'node:module';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
const ROOT = process.cwd(); // rode da raiz do repositório
const require = createRequire(ROOT + '/package.json');
const { chromium } = require('@playwright/test');
const B = 'http://localhost:4399';
const EXC = ['admin.html', 'admin-editor.html', 'diagnostic.html', 'test-github.html', 'mapmind.html', 'vsl.html', 'exemplopdi.html'];
const pages = readdirSync(`${ROOT}/src`).filter((f) => f.endsWith('.html') && !/(bkp|template)/.test(f) && !EXC.includes(f) && existsSync(`${ROOT}/dist/${f}`));
const b = await chromium.launch();
const out = [];
const q = [...pages];
await Promise.all(Array.from({ length: 4 }, async () => {
  for (let f = q.shift(); f; f = q.shift()) {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    await ctx.addInitScript(() => { try { localStorage.setItem('consent_v', JSON.stringify({ v: '2.0', ts: new Date().toISOString(), categories: { analytics: false }, method: 'probe' })); } catch {} });
    const p = await ctx.newPage();
    try {
      await p.goto(`${B}/${f}`, { waitUntil: 'load', timeout: 45000 }); await p.waitForTimeout(1000);
      const headers = await p.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => { const c = getComputedStyle(e); if (!['fixed', 'sticky'].includes(c.position)) return false; const r = e.getBoundingClientRect(); return r.top <= 1 && r.height > 20 && r.height < 260 && r.width > innerWidth * 0.5; }).length);
      if (!headers) { out.push({ page: f, headers: 0 }); continue; }
      await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(300);
      await p.keyboard.press('End');
      let hidden = 0; const sample = []; let steps = 0;
      for (; steps < 160; steps++) {
        await p.keyboard.press('Shift+Tab'); await p.waitForTimeout(60);
        const r = await p.evaluate(() => {
          const a = document.activeElement; if (!a || a === document.body) return { end: true };
          const rc = a.getBoundingClientRect(); if (!rc.width || !rc.height) return {};
          const pts = [[rc.left + 2, rc.top + 2], [rc.right - 2, rc.top + 2], [rc.left + 2, rc.bottom - 2], [rc.right - 2, rc.bottom - 2], [rc.left + rc.width / 2, rc.top + rc.height / 2]]
            .filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
          if (!pts.length) return { off: true };
          const covered = pts.every(([x, y]) => { const t = document.elementFromPoint(x, y); if (!t || a.contains(t) || t.contains(a)) return false; for (let n = t; n; n = n.parentElement) { const c = getComputedStyle(n); if (c.position === 'fixed' || c.position === 'sticky') return true; } return false; });
          return covered ? { hid: (a.tagName + ' ' + (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 30)) } : {};
        });
        if (r.end) break;
        if (r.hid) { hidden++; if (sample.length < 3) sample.push(r.hid); }
      }
      out.push({ page: f, headers, steps, hidden, sample });
    } catch (e) { out.push({ page: f, error: String(e).slice(0, 100) }); } finally { await ctx.close(); }
    process.stderr.write('.');
  }
}));
await b.close();
writeFileSync(new URL('./obscured.json', import.meta.url), JSON.stringify(out, null, 1));
for (const r of out.filter((r) => r.hidden || r.error)) console.log(r.page, r.error || `${r.hidden}/${r.steps} paradas cobertas | ${r.sample.join(' ; ')}`);
console.log('páginas com cabeçalho fixo:', out.filter((r) => r.headers).length, 'de', out.length);
