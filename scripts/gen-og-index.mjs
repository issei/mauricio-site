// Gera a imagem social (1200x630) da página inicial com o retrato
// (SDD-elementos-visuais §5; SDD-nova-home §14.6: refeita no visual da home nova).
// Renderiza um cartão HTML no Chromium do Playwright e tira a captura, no padrão de
// gen-og-engenharia-confianca.mjs. Textos e cores vêm da home: a abertura de
// scripts/home/home.data.mjs e os tokens --hm-* do :root de src/home.css.
//   node scripts/gen-og-index.mjs
// Na nuvem, onde o navegador do Playwright fixado não está instalado:
//   PW_CHROMIUM=/opt/pw-browsers/chromium node scripts/gen-og-index.mjs
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { ABERTURA } from './home/home.data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public/og-index.png');
const retrato = readFileSync(path.join(ROOT, 'public/img/retrato-960.webp')).toString('base64');
const cv = JSON.parse(readFileSync(path.join(ROOT, 'public/cv.json'), 'utf8'));
const raiz = readFileSync(path.join(ROOT, 'src/home.css'), 'utf8').match(/:root\{([^}]*)\}/)[1];
const cor = (n) => raiz.match(new RegExp(`--hm-${n}:([^;]+);`))[1];
const [nome1, ...nome2] = cv.Nome.split(' ');

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Shippori+Mincho:wght@500&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body { font-family: Inter, 'Segoe UI', system-ui, sans-serif; color: ${cor('grafite')}; position: relative; overflow: hidden; background: ${cor('aizome')}; }
  .txt { position: absolute; left: 72px; top: 92px; width: 640px; }
  .eyebrow { font-size: 17px; font-weight: 600; letter-spacing: .02em; color: ${cor('cinza')}; line-height: 1.4; white-space: nowrap; }
  h1 { margin-top: 22px; font-size: 64px; line-height: 1.04; font-weight: 600; color: ${cor('tinta')}; letter-spacing: -.02em; }
  .msg { margin-top: 30px; font: 500 34px/1.35 'Shippori Mincho', Georgia, serif; color: ${cor('tinta')}; }
  .fio { position: absolute; left: 48px; top: 92px; width: 2px; height: 446px; background: ${cor('kin')}; }
  .url { position: absolute; left: 72px; bottom: 56px; font-size: 22px; font-weight: 500; color: ${cor('cinza')}; }
  .foto { position: absolute; right: 72px; top: 65px; width: 400px; height: 500px; object-fit: cover; outline: 1px solid ${cor('shoji-strong')}; outline-offset: -1px; }
</style></head><body>
  <span class="fio"></span>
  <div class="txt">
    <div class="eyebrow">${ABERTURA.sub.replace(/\.$/, '')}</div>
    <h1>${nome1}<br>${nome2.join(' ')}</h1>
    <div class="msg">${ABERTURA.mensagem.join('<br>')}</div>
  </div>
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
