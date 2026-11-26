#!/usr/bin/env node
/*
 * Capturas do próprio site usadas pela home (SDD-nova-home §14.3 e §14.4). Porta de
 * docs/specs/pages/portfolio/prototipo/scripts/crops.cjs.
 *
 * Abre cada página no build (`dist/`, servido por `vite preview`), recorta o detalhe e grava a
 * fonte em assets-fonte/home/<nome>.webp (2×, qualidade 92). O gen-imagens deriva dela as saídas
 * AVIF e WebP publicadas. assets-fonte/home/manifesto.json registra página, seletor e commit.
 * Nenhuma imagem é gerada por IA: toda fonte é uma captura de página deste site.
 *
 * Uso: npx vite preview --port 5185 &  →  node scripts/home/capturas.mjs [--site URL] [nome …]
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import sharp from 'sharp';
import { chromium } from 'playwright';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, 'assets-fonte/home');
const MANIFESTO = join(OUT, 'manifesto.json');
const args = process.argv.slice(2);
const SITE = args.includes('--site') ? args[args.indexOf('--site') + 1] : 'http://127.0.0.1:5185';
const so = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--site');
const FUNDO = { r: 13, g: 17, b: 23 }; // fundo das páginas do site, para completar o diagrama

/**
 * Cada captura: página, seletor do detalhe, largura do recorte (px CSS, proporção 16:10),
 * deslocamento vertical do centro, alinhamento ('esq' encosta à esquerda do elemento) e CSS extra.
 * `elemento: true` fotografa o próprio elemento e o encaixa no tamanho `saida`, sobre o fundo do site.
 */
export const CAPTURAS = {
  diagrama: { pagina: 'agent-ready', seletor: 'svg:has(#diag-titulo)', elemento: true, saida: [1600, 1067] },
  estados: { pagina: 'formulacao-de-problemas', seletor: '.fp-eyebrow:has-text("Figura 3") >> xpath=..', elemento: true, saida: [960, 768], cobrir: true },
  estudo: { pagina: 'curiosidade-e-investigacao', seletor: 'header.ci-hero', largura: 760, dy: 0 },
  videos: { pagina: 'videos', seletor: 'main h1', largura: 640, dy: 40, alinhar: 'esq', css: 'section.hero{visibility:hidden!important}' },
  acessibilidade: { pagina: 'acessibilidade', seletor: 'dl.ac-status', largura: 600, dy: -30, alinhar: 'esq' },
  'case-agents': { pagina: 'case-agents', seletor: '.ca-score', largura: 600, dy: -30, alinhar: 'esq' },
  'agent-ready': { pagina: 'agent-ready', seletor: '.ar-score', largura: 600, dy: -30, alinhar: 'esq' },
  boutique: { pagina: 'boutique-empresarial-showcase', seletor: 'h2:has-text("Fundação Metodológica")', largura: 1240, dy: 330 },
};

const ESCONDE = '.sh,header.sh,[class*=cookie],[id*=cookie],[class*=consent],[id*=consent],[id^=cc-]{display:none!important}*{animation:none!important;transition:none!important}';
const commit = execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim();
const manifesto = existsSync(MANIFESTO) ? JSON.parse(readFileSync(MANIFESTO, 'utf8')) : {};
mkdirSync(OUT, { recursive: true });

const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'dark', reducedMotion: 'reduce' });
await c.route(/googletagmanager|google-analytics|clarity\.ms/, (r) => r.abort());
for (const [nome, k] of Object.entries(CAPTURAS)) {
  if (so.length && !so.includes(nome)) continue;
  const p = await c.newPage();
  await p.goto(`${SITE}/${k.pagina}.html`, { waitUntil: 'load' });
  await p.waitForTimeout(1200);
  await p.addStyleTag({ content: ESCONDE + (k.css ?? '') });
  const e = p.locator(k.seletor).first();
  await e.scrollIntoViewIfNeeded();
  await p.waitForTimeout(300);
  let img;
  if (k.elemento) {
    const [w, h] = k.saida;
    img = await sharp(await e.screenshot()).resize(w * 2, h * 2, { fit: k.cobrir ? 'cover' : 'contain', position: 'left top', background: FUNDO }).webp({ quality: 92 }).toBuffer();
  } else {
    const bb = await e.boundingBox();
    const w = k.largura, h = Math.round(w / 1.6), cx = bb.x + bb.width / 2;
    await p.evaluate((y) => window.scrollBy(0, y), bb.y + bb.height / 2 + k.dy - 450);
    await p.waitForTimeout(300);
    const bb2 = await e.boundingBox();
    const clip = { x: Math.max(0, Math.round(k.alinhar === 'esq' ? bb2.x - 32 : cx - w / 2)), y: Math.max(0, Math.round(bb2.y + bb2.height / 2 + k.dy - h / 2)), width: w, height: h };
    img = await sharp(await p.screenshot({ clip })).resize(1920, 1200).webp({ quality: 92 }).toBuffer();
  }
  writeFileSync(join(OUT, `${nome}.webp`), img);
  manifesto[nome] = { pagina: `/${k.pagina}`, seletor: k.seletor, commit, origem: 'captura do site' };
  console.log(`✓ [capturas] ${nome} ← /${k.pagina} (${Math.round(img.length / 1024)} KB)`);
  await p.close();
}
await b.close();
writeFileSync(MANIFESTO, `${JSON.stringify(manifesto, null, 2)}\n`);
