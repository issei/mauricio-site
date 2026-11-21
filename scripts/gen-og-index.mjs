// Gera a imagem social (1200x630) da página inicial com o retrato
// (SDD-elementos-visuais §5). Renderiza um cartão HTML no Chromium do
// Playwright e tira a captura, no padrão de gen-og-engenharia-confianca.mjs.
// O texto é o mesmo da imagem anterior: nenhuma frase nova.
//   node scripts/gen-og-index.mjs
// Na nuvem, onde o navegador do Playwright fixado não está instalado:
//   PW_CHROMIUM=/opt/pw-browsers/chromium node scripts/gen-og-index.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/og-index.png');
const retrato = readFileSync(path.join(ROOT, 'public/img/retrato-960.webp')).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;800&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    font-family: Inter, 'Segoe UI', system-ui, sans-serif; color: #c9d1d9; position: relative; overflow: hidden;
    background: radial-gradient(1000px 500px at 85% 10%, rgba(138,43,226,.14), transparent 60%),
                radial-gradient(800px 500px at 0% 100%, rgba(0,123,255,.12), transparent 60%), #0d1117;
  }
  .txt { position: absolute; left: 72px; top: 110px; width: 640px; }
  .eyebrow { font-size: 19px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: #58a6ff; line-height: 1.35; }
  h1 { margin-top: 24px; font-size: 74px; line-height: 1; font-weight: 800; color: #fff; letter-spacing: -.035em; }
  .sub { margin-top: 30px; font-size: 32px; font-weight: 500; color: #8b949e; }
  .traco { position: absolute; left: 72px; bottom: 104px; width: 120px; height: 3px; border-radius: 2px; background: linear-gradient(90deg, #007bff, #8a2be2); }
  .url { position: absolute; left: 72px; bottom: 56px; font-size: 24px; font-weight: 500; color: #8b949e; }
  .foto { position: absolute; right: 72px; top: 65px; width: 400px; height: 500px; border-radius: 16px; object-fit: cover;
          box-shadow: 0 0 0 1px #30363d; -webkit-mask: linear-gradient(#000 80%, transparent); mask: linear-gradient(#000 80%, transparent); }
</style></head><body>
  <div class="txt">
    <div class="eyebrow">Tech Lead · Especialista em Análise de Sistemas</div>
    <h1>Maurício<br>Yokoyama Issei</h1>
    <div class="sub">20+ anos: Salesforce, AWS e APIs</div>
  </div>
  <div class="traco"></div>
  <div class="url">mauricio.issei.com.br</div>
  <img class="foto" src="data:image/webp;base64,${retrato}" alt="">
</body></html>`;

const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
// Paleta de cores reduzida: a imagem fica abaixo de 200 KB (SDD §5) sem perda visível.
await sharp(png).png({ palette: true, quality: 90, effort: 10 }).toFile(OUT);
console.log('OG image gerado:', OUT);
