#!/usr/bin/env node
/*
 * Gera as imagens da home em AVIF e WebP (SDD-elementos-visuais §4.3, §4.7, §6):
 *
 *   assets-fonte/retrato.jpg        → public/img/retrato-{192,480,960}.{avif,webp}
 *   og:image de cada destaque        → public/img/capas/<página>-{320,640}.{avif,webp}
 *   assets-fonte/badges/<arquivo>    → public/img/badges/<slug>-{72,144}.{avif,webp} (§4.9)
 *
 * O manifesto fica em assets-fonte/ (não é publicado).
 *
 * assets-fonte/manifesto.json guarda o sha256 de cada fonte. O --check falha se uma
 * fonte mudou sem nova geração, se falta uma saída ou se uma saída passa do peso
 * máximo (RNF-EV-02). Não compara bytes de saída: o codificador pode variar entre
 * versões do libvips, e o que importa é a fonte e o orçamento.
 *
 * Fotos saem sem metadados (EXIF e GPS removidos, R-IMG-04): o sharp só grava
 * metadados quando se chama withMetadata(), e este script não chama.
 *
 * Uso: node scripts/gen-imagens.mjs [--check]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { DESTAQUES } from './home/destaques.mjs';
import { loadEcossistema } from './catalogo/dados.mjs';
import { lerBadges, BADGE_LARGURAS } from './home/badges.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public/img');
const MANIFESTO = join(ROOT, 'assets-fonte/manifesto.json');
const check = process.argv.includes('--check');
const fail = (msg) => { console.error(`✗ [imagens] ${msg}`); process.exit(1); };
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const rel = (p) => p.slice(ROOT.length + 1).replace(/\\/g, '/');

/** Pesos máximos em KB por largura (SDD §4.3 e §4.7). */
const QUALIDADE = { avif: { quality: 55 }, webp: { quality: 78 } };

/** Lista de trabalhos: fonte, saídas (largura × altura), teto de peso. */
function trabalhos() {
  const lista = [{
    id: 'retrato',
    fonte: join(ROOT, 'assets-fonte/retrato.jpg'),
    proporcao: 5 / 4,
    saidas: [192, 480, 960, 1200].map((w) => ({ w, base: join(OUT, `retrato-${w}`) })),
    teto: { 480: { avif: 35, webp: 55 }, 960: { avif: 90 } },
  }];
  // Home nova (SDD-nova-home §14.4): capturas do próprio site, feitas por scripts/home/capturas.mjs.
  const HOME = { diagrama: { prop: 1067 / 1600, ws: [960, 1600] }, estados: { prop: 768 / 960 } };
  for (const nome of ['diagrama', 'estados', 'estudo', 'videos', 'acessibilidade', 'case-agents', 'agent-ready', 'boutique']) {
    const k = HOME[nome] ?? {};
    lista.push({
      id: `home:${nome}`,
      fonte: join(ROOT, 'assets-fonte/home', `${nome}.webp`),
      proporcao: k.prop ?? 600 / 960,
      saidas: (k.ws ?? [480, 960]).map((w) => ({ w, base: join(OUT, 'home', `${nome}-${w}`) })),
      teto: { 960: { avif: 60, webp: 90 } },
    });
  }
  const { eco } = loadEcossistema();
  for (const slug of DESTAQUES) {
    const n = eco.nodes[slug] ?? fail(`destaque "${slug}" ausente do YAML`);
    const html = readFileSync(join(ROOT, 'src', n.file), 'utf8');
    const og = html.match(/<meta property="og:image" content="https:\/\/mauricio\.issei\.com\.br\/([^"]+)"/)?.[1]
      ?? fail(`${n.file} não tem og:image`);
    const fonte = join(ROOT, 'public', og);
    if (!existsSync(fonte)) fail(`og:image de ${n.file} não existe: public/${og}`);
    const pagina = n.file.replace(/\.html$/, '');
    lista.push({
      id: `capa:${pagina}`,
      fonte,
      proporcao: 630 / 1200,
      saidas: [320, 640].map((w) => ({ w, base: join(OUT, 'capas', `${pagina}-${w}`) })),
      teto: { 640: { avif: 30, webp: 45 } },
    });
  }
  for (const b of lerBadges(ROOT)) {
    lista.push({
      id: `badge:${b.slug}`,
      fonte: b.fonte,
      proporcao: 1,
      contain: true,
      saidas: BADGE_LARGURAS.map((w) => ({ w, base: join(OUT, 'badges', `${b.slug}-${w}`) })),
      teto: { 144: { avif: 12, webp: 20 } },
    });
  }
  return lista;
}

/**
 * Badge com fundo branco opaco (alguns do Itaú): torna transparente o branco ligado à borda, por
 * preenchimento a partir dos cantos. O branco de dentro do selo fica. Sem isso, o badge vira um
 * quadrado claro sobre o fundo escuro da página.
 */
async function semFundoBranco(fonte) {
  const { data, info } = await sharp(fonte).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const claro = (i) => data[i + 3] > 0 && data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235;
  if (!claro(0)) return sharp(fonte);
  const visto = new Uint8Array(W * H);
  const pilha = [0, W - 1, (H - 1) * W, H * W - 1];
  while (pilha.length) {
    const p = pilha.pop();
    if (visto[p] || !claro(p * 4)) continue;
    visto[p] = 1;
    data[p * 4 + 3] = 0;
    const x = p % W;
    if (x > 0) pilha.push(p - 1);
    if (x < W - 1) pilha.push(p + 1);
    if (p >= W) pilha.push(p - W);
    if (p < W * (H - 1)) pilha.push(p + W);
  }
  return sharp(data, { raw: { width: W, height: H, channels: 4 } });
}

const anterior = existsSync(MANIFESTO) ? JSON.parse(readFileSync(MANIFESTO, 'utf8')) : {};
const manifesto = {};
const problemas = [];
let gravados = 0;

for (const t of trabalhos()) {
  if (!existsSync(t.fonte)) fail(`fonte ausente: ${rel(t.fonte)}`);
  const hash = sha(t.fonte);
  manifesto[t.id] = { fonte: rel(t.fonte), sha256: hash };
  const velho = anterior[t.id]?.sha256 !== hash;
  for (const { w, base } of t.saidas) {
    const h = Math.round(w * t.proporcao);
    for (const fmt of ['avif', 'webp']) {
      const arq = `${base}.${fmt}`;
      if (check) {
        if (velho) { problemas.push(`${rel(arq)}: fonte mudou (${rel(t.fonte)})`); continue; }
        if (!existsSync(arq)) { problemas.push(`${rel(arq)}: ausente`); continue; }
      } else if (velho || !existsSync(arq)) {
        mkdirSync(dirname(arq), { recursive: true });
        // Badge: o selo inteiro cabe no quadrado, sobre fundo transparente.
        const ajuste = t.contain
          ? { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }
          : { fit: 'cover', position: 'centre' };
        const base = t.contain ? await semFundoBranco(t.fonte) : sharp(t.fonte);
        await base.resize(w, h, ajuste)[fmt](QUALIDADE[fmt]).toFile(arq);
        gravados++;
      }
      const teto = t.teto[w]?.[fmt];
      if (teto && existsSync(arq)) {
        const kb = statSync(arq).size / 1024;
        if (kb > teto) problemas.push(`${rel(arq)}: ${kb.toFixed(1)} KB > ${teto} KB`);
      }
    }
  }
}

if (problemas.length) fail(`${problemas.length} problema(s):\n  ${problemas.join('\n  ')}\nRode: node scripts/gen-imagens.mjs`);
const json = `${JSON.stringify(manifesto, null, 2)}\n`;
if (check) {
  if (!existsSync(MANIFESTO) || readFileSync(MANIFESTO, 'utf8') !== json) fail('manifesto.json dessincronizado. Rode: node scripts/gen-imagens.mjs');
  console.log(`✓ [imagens] em dia (${Object.keys(manifesto).length} fontes)`);
} else {
  mkdirSync(OUT, { recursive: true });
  writeFileSync(MANIFESTO, json);
  console.log(`✓ [imagens] ${gravados} arquivo(s) gravado(s), ${Object.keys(manifesto).length} fontes`);
}
