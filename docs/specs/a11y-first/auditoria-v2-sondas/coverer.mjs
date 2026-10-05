import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/package.json');
const { chromium } = require('@playwright/test');
const S = 'test-results/'; // capturas (fora do git)
const b = await chromium.launch();
for (const f of ['curriculo.html', 'engenharia-agentes-ia.html', 'service-operations-2-0.html', 'devin.html', 'apresentacao.html']) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => localStorage.setItem('consent_v', JSON.stringify({ v: '2.0', ts: new Date().toISOString(), categories: { analytics: false }, method: 'probe' })));
  const p = await ctx.newPage();
  await p.goto(`http://localhost:4399/${f}`, { waitUntil: 'load' }); await p.waitForTimeout(1000);
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(300);
  for (let i = 0; i < 160; i++) {
    await p.keyboard.press('Shift+Tab'); await p.waitForTimeout(60);
    const r = await p.evaluate(() => {
      const a = document.activeElement; if (!a || a === document.body) return { end: 1 };
      const rc = a.getBoundingClientRect(); const x = rc.left + rc.width / 2, y = rc.top + rc.height / 2;
      if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return {};
      const t = document.elementFromPoint(x, y); if (!t || a.contains(t) || t.contains(a)) return {};
      let n = t; for (; n; n = n.parentElement) { const c = getComputedStyle(n); if (c.position === 'fixed' || c.position === 'sticky') break; }
      if (!n) return {};
      const c = getComputedStyle(n);
      return { focus: a.tagName + ' ' + (a.textContent || '').trim().slice(0, 30), y: Math.round(rc.top), cover: `${n.tagName.toLowerCase()}${n.id ? '#' + n.id : ''}.${[...n.classList].slice(0, 3).join('.')}`, pos: c.position, top: Math.round(n.getBoundingClientRect().top), h: Math.round(n.getBoundingClientRect().height), bg: c.backgroundColor, op: c.opacity, pe: c.pointerEvents };
    });
    if (r.end) break;
    if (r.cover) { console.log(f, JSON.stringify(r)); await p.screenshot({ path: S + 'cover-' + f.replace('.html', '') + '.png' }); break; }
  }
  await ctx.close();
}
await b.close();
