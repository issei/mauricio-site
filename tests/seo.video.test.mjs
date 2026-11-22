/**
 * Vídeo complementar não vira VideoObject (Search Console, 2026-11-22).
 *
 * O Google só indexa vídeo em "página de exibição": página cujo objetivo
 * principal é mostrar um único vídeo. Nas páginas de pages.mjs o vídeo
 * complementa o texto, e o VideoObject delas gerava o problema "O vídeo não
 * está em uma página de exibição". A página de exibição é a ficha
 * /videos/<slug> (scripts/gen-videos.mjs), que mantém o VideoObject.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildGraph } from '../scripts/seo/lib.mjs';
import { PAGES } from '../scripts/seo/pages.mjs';

const tipos = (g) => g['@graph'].map((n) => n['@type']).flat();

test('página com vídeo complementar não declara VideoObject', () => {
  const comVideo = PAGES.filter((p) => p.video);
  assert.ok(comVideo.length > 0, 'esperava páginas com vídeo em pages.mjs');
  for (const p of comVideo) assert.ok(!tipos(buildGraph(p)).includes('VideoObject'), p.slug);
});

test('HTML publicado das páginas de pages.mjs não declara VideoObject', () => {
  for (const p of PAGES.filter((x) => x.video).concat([{ slug: 'engenharia-confianca' }])) {
    const html = readFileSync(new URL(`../src/${p.slug}.html`, import.meta.url), 'utf8');
    assert.doesNotMatch(html, /"@type":\s*"VideoObject"/, p.slug);
  }
});
