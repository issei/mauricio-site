#!/usr/bin/env node
/*
 * Gera os ícones raster do site a partir de public/favicon.svg.
 *
 * As páginas legais e o site.webmanifest referenciavam quatro arquivos que
 * nunca existiram no repositório (favicon-96x96.png, apple-touch-icon.png,
 * web-app-manifest-192x192.png e -512x512.png), resultando em 404 em toda
 * visita — e em nenhum ícone no iOS, que não usa favicon SVG.
 *
 * O texto do SVG é convertido em geometria própria aqui em vez de renderizado
 * por fonte: o rasterizador não tem "Inter" disponível e produziria um quadrado
 * vazio ou uma fonte substituta qualquer.
 *
 * Uso: node scripts/gen-favicons.mjs
 */
import sharp from 'sharp';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');

const BG = '#192A56';   // mesma cor de public/favicon.svg
const FG = '#FFFFFF';

/**
 * "MI" desenhado como geometria (path + rect) na grade 100×100 do favicon
 * original. Contornos explícitos renderizam idênticos em qualquer rasterizador,
 * ao contrário de <text>, que depende de a fonte estar instalada.
 *
 * O M é um polígono fechado com o vértice central descendo até y=58 — tentativas
 * anteriores com barras verticais empilhadas liam como "H".
 */
const M_PATH =
  'M18 70 V30 H30 L40 51 L50 30 H62 V70 H51 V47 L43 63 H37 L29 47 V70 Z';

function markup(size, radiusRatio) {
  const r = Math.round(size * radiusRatio);
  const s = size / 100;

  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<rect width="${size}" height="${size}" rx="${r}" fill="${BG}"/>` +
      `<g transform="scale(${s})" fill="${FG}">` +
        `<path d="${M_PATH}"/>` +
        `<rect x="70" y="30" width="11" height="40"/>` +
      `</g>` +
      `</svg>`
  );
}

const ALVOS = [
  { file: 'favicon-96x96.png', size: 96, radius: 0.15 },
  // iOS aplica a própria máscara: cantos retos evitam borda dupla.
  { file: 'apple-touch-icon.png', size: 180, radius: 0 },
  // `purpose: maskable` no manifest — o sistema recorta; sem cantos próprios.
  { file: 'web-app-manifest-192x192.png', size: 192, radius: 0 },
  { file: 'web-app-manifest-512x512.png', size: 512, radius: 0 },
];

for (const { file, size, radius } of ALVOS) {
  await sharp(markup(size, radius)).png({ compressionLevel: 9 }).toFile(join(PUB, file));
  console.log(`✓ public/${file} (${size}×${size})`);
}

console.log(`\n${ALVOS.length} ícones gerados a partir de public/favicon.svg.`);
