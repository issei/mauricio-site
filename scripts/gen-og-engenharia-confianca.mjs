// Gera o OG image (1200x630) da página "A Engenharia da Confiança" renderizando
// um cartão HTML on-brand e tirando screenshot com o Chromium do Playwright
// (já instalado para o gate). Sem dependências novas.
//   node scripts/gen-og-engenharia-confianca.mjs
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../public/og-engenharia-confianca.png');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: 'Segoe UI', Inter, system-ui, sans-serif;
    background: radial-gradient(1200px 700px at 80% -10%, rgba(138,43,226,0.22), transparent 60%),
                radial-gradient(900px 600px at 0% 110%, rgba(0,123,255,0.18), transparent 55%),
                #0d1117;
    color: #c9d1d9; position: relative; overflow: hidden;
  }
  .wrap { position: absolute; inset: 0; padding: 72px 80px; display: flex; flex-direction: column; }
  .eyebrow { font-size: 24px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
             color: #58a6ff; }
  h1 { margin-top: 18px; font-size: 92px; line-height: 1.02; font-weight: 800; color: #fff; letter-spacing: -0.02em; }
  h1 .g { background: linear-gradient(90deg, #58a6ff, #bc8cff); -webkit-background-clip: text;
          background-clip: text; -webkit-text-fill-color: transparent; }
  .sub { margin-top: 22px; font-size: 34px; font-weight: 500; color: #8b949e; }
  .thesis { margin-top: 28px; font-size: 30px; font-weight: 600; color: #e6edf3; max-width: 980px; line-height: 1.3; }
  .chips { margin-top: auto; display: flex; gap: 16px; }
  .chip { flex: 1; background: rgba(28,34,48,0.85); border: 1px solid #30363d;
          border-top: 4px solid #007bff; border-radius: 16px; padding: 20px 22px; }
  .chip b { display: block; color: #fff; font-size: 26px; font-weight: 800; }
  .chip span { font-size: 22px; color: #8b949e; }
  .foot { position: absolute; bottom: 30px; right: 80px; font-size: 22px; color: #6e7681; font-weight: 600; }
</style></head><body>
  <div class="wrap">
    <div class="eyebrow">Intentional Systems Model · ISM v1.0</div>
    <h1>A Engenharia da <span class="g">Confiança</span></h1>
    <div class="sub">Da Intenção à Execução Agêntica · 4 módulos</div>
    <div class="thesis">A capacidade vem do modelo; a confiança vem da engenharia.</div>
    <div class="chips">
      <div class="chip"><b>M0</b><span>Despertar</span></div>
      <div class="chip"><b>M1</b><span>Mapear</span></div>
      <div class="chip"><b>M2</b><span>Arquitetar</span></div>
      <div class="chip"><b>M3</b><span>Orquestrar</span></div>
    </div>
  </div>
  <div class="foot">mauricio.issei.com.br</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: OUT, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log('OG image gerado:', OUT);
