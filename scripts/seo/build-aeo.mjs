// Injetor AEO/GEO idempotente.
//   node scripts/seo/build-aeo.mjs [slug ...] [--dry] [--md]
// - Sem slugs: processa todas as páginas de pages.mjs.
// - Remove blocos AEO antigos + tags de meta conflitantes no <head>, reinsere o bloco gerado.
// - Insere o bloco visível (Em síntese + FAQ) no marcador <!-- AEO-BODY --> ou antes do último <footer>.
// - --dry: imprime o <head> resultante do primeiro slug, sem gravar.
// - --md:  (re)grava os companions public/<slug>.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from './pages.mjs';
import { buildHead, buildBody, buildMd } from './lib.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '../../src');
const PUB = path.resolve(__dirname, '../../public');

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const doMd = args.includes('--md');
const slugs = args.filter((a) => !a.startsWith('--'));

// Remove um bloco entre dois marcadores (inclusive), idempotente.
function stripMarked(s, start, end) {
  const re = new RegExp(`[\\t ]*${start}[\\s\\S]*?${end}\\n?`, 'g');
  return s.replace(re, '');
}

// Remove tags de meta gerenciadas no <head> (fora dos marcadores, já removidos antes).
function stripManagedHeadTags(head) {
  const patterns = [
    /^[\t ]*<link[^>]*rel=["']canonical["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*name=["']robots["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*name=["']author["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*name=["']keywords["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*name=["']theme-color["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*property=["']og:[^"']*["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*property=["']article:[^"']*["'][^>]*>\s*$/gim,
    /^[\t ]*<meta[^>]*name=["']twitter:[^"']*["'][^>]*>\s*$/gim,
    /^[\t ]*<link[^>]*rel=["']alternate["'][^>]*type=["']text\/markdown["'][^>]*>\s*$/gim,
    /^[\t ]*<script[^>]*googletagmanager\.com\/gtag[^>]*><\/script>\s*$/gim,
    /^[\t ]*<script>[^<]*gtag\([^<]*<\/script>\s*$/gim,
    /[\t ]*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
    /<!--\s*Open Graph\s*-->\s*/gi,
  ];
  return patterns.reduce((h, re) => h.replace(re, ''), head);
}

function processPage(p) {
  const file = path.join(SRC, `${p.slug}.html`);
  let html = fs.readFileSync(file, 'utf8');

  // 1) limpa execuções anteriores
  // O separador `<!-- ==== -->` é a primeira linha do bloco gerado, mas fica
  // FORA dos marcadores AEO:START/END — sem removê-lo aqui, cada regeneração
  // deixava mais uma linha dele acumulada no <head>.
  html = html.replace(/(?:^[\t ]*<!-- ={10,} -->\n)+(?=[\t ]*<!-- AEO:START)/gm, '');
  html = stripMarked(html, '<!-- AEO:START', '<!-- AEO:END -->');
  html = stripMarked(html, '<!-- AEO-BODY:START', '<!-- AEO-BODY:END -->');

  // 2) split head/body e de-dup no head
  const hi = html.indexOf('</head>');
  if (hi === -1) throw new Error(`${p.slug}: sem </head>`);
  let head = html.slice(0, hi);
  let rest = html.slice(hi);
  head = stripManagedHeadTags(head);

  // 3) injeta bloco de head antes de </head>
  const headBlock = buildHead(p);
  head = head.replace(/\s*$/, '\n');
  html = `${head}  ${headBlock}\n${rest}`;

  // 4) bloco visível
  const body = buildBody(p);
  if (body) {
    if (html.includes('<!-- AEO-BODY -->')) {
      html = html.replace('<!-- AEO-BODY -->', body);
    } else {
      const fi = html.lastIndexOf('<footer');
      const at = fi !== -1 ? fi : html.lastIndexOf('</body>');
      html = html.slice(0, at) + body + '\n' + html.slice(at);
    }
  }

  if (dry) {
    const nh = html.indexOf('</head>');
    console.log(`\n===== ${p.slug} (dry) <head> =====\n` + html.slice(0, nh).slice(-2600));
    return;
  }
  fs.writeFileSync(file, html);
  console.log(`✓ ${p.slug}.html`);

  if (p.hasMd && (doMd || true)) {
    fs.writeFileSync(path.join(PUB, `${p.slug}.md`), buildMd(p));
    console.log(`  ↳ public/${p.slug}.md`);
  }
}

const list = slugs.length ? PAGES.filter((p) => slugs.includes(p.slug)) : PAGES;
if (!list.length) { console.error('Nenhuma página correspondente em pages.mjs:', slugs); process.exit(1); }
for (const p of list) processPage(p);
console.log(`\nConcluído: ${list.length} página(s).`);
