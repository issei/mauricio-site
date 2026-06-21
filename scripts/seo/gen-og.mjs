// Gera os OG images (1200x630) de todas as páginas de pages.mjs renderizando um
// cartão HTML on-brand e tirando screenshot com o Chromium do Playwright (já
// instalado). Sem dependências novas.
//   node scripts/seo/gen-og.mjs [slug ...]
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from './pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUB = path.resolve(__dirname, '../../public');

function esc(s = '') {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function card(p) {
  const og = p.og || {};
  const titleHtml = (og.title || p.title).replace(
    /\{([^}]+)\}/g, '<span class="g">$1</span>'); // {palavra} vira gradiente
  const chips = (og.chips || []).map(
    (c) => `<div class="chip"><b>${esc(c.k)}</b><span>${esc(c.label)}</span></div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: 'Segoe UI', Inter, system-ui, sans-serif;
    background: radial-gradient(1200px 700px at 80% -10%, rgba(138,43,226,0.22), transparent 60%),
                radial-gradient(900px 600px at 0% 110%, rgba(0,123,255,0.18), transparent 55%), #0d1117;
    color: #c9d1d9; position: relative; overflow: hidden;
  }
  .wrap { position: absolute; inset: 0; padding: 72px 80px; display: flex; flex-direction: column; }
  .eyebrow { font-size: 24px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #58a6ff; }
  h1 { margin-top: 18px; font-size: ${og.titleSize || 86}px; line-height: 1.04; font-weight: 800; color: #fff; letter-spacing: -0.02em; max-width: 1040px; }
  h1 .g { background: linear-gradient(90deg, #58a6ff, #bc8cff); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .sub { margin-top: 22px; font-size: 32px; font-weight: 500; color: #8b949e; max-width: 1000px; }
  .thesis { margin-top: 26px; font-size: 28px; font-weight: 600; color: #e6edf3; max-width: 980px; line-height: 1.3; }
  .chips { margin-top: auto; display: flex; gap: 16px; }
  .chip { flex: 1; background: rgba(28,34,48,0.85); border: 1px solid #30363d; border-top: 4px solid #007bff; border-radius: 16px; padding: 18px 20px; }
  .chip b { display: block; color: #fff; font-size: 26px; font-weight: 800; }
  .chip span { font-size: 21px; color: #8b949e; }
  .foot { position: absolute; bottom: 30px; right: 80px; font-size: 22px; color: #6e7681; font-weight: 600; }
</style></head><body>
  <div class="wrap">
    <div class="eyebrow">${esc(og.eyebrow || 'Maurício Yokoyama Issei')}</div>
    <h1>${titleHtml}</h1>
    ${og.subtitle ? `<div class="sub">${esc(og.subtitle)}</div>` : ''}
    ${og.thesis ? `<div class="thesis">${esc(og.thesis)}</div>` : ''}
    ${chips ? `<div class="chips">${chips}</div>` : ''}
  </div>
  <div class="foot">mauricio.issei.com.br</div>
</body></html>`;
}

const args = process.argv.slice(2);
const list = args.length ? PAGES.filter((p) => args.includes(p.slug)) : PAGES;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const p of list) {
  await page.setContent(card(p), { waitUntil: 'networkidle' });
  const out = path.join(PUB, `og-${p.slug}.png`);
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('✓ og-' + p.slug + '.png');
}
await browser.close();
