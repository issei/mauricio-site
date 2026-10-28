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
    // O snippet do GA4 sai; o consent-default inline (marcado por __consentDefault) fica:
    // ele PRECISA vir antes do gtag.js, e sem esta exceção cada regeneração o apagava.
    /^[\t ]*<script>(?![^<]*__consentDefault)[^<]*gtag\([^<]*<\/script>\s*$/gim,
    /[\t ]*<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
    /<!--\s*Open Graph\s*-->\s*/gi,
  ];
  return patterns.reduce((h, re) => h.replace(re, ''), head);
}

function processPage(p) {
  const file = path.join(SRC, `${p.slug}.html`);
  // Com core.autocrlf, a cópia de trabalho no Windows vem em CRLF. As regex de
  // limpeza abaixo esperam \n: em CRLF elas não casavam, e cada execução
  // empilhava mais um separador e mais um bloco (30 páginas tocadas numa
  // regeneração de uma só, em 2026-10-11). Processa em LF e devolve o EOL original.
  const original = fs.readFileSync(file, 'utf8');
  const crlf = original.includes('\r\n');
  let html = original.replace(/\r\n/g, '\n');

  // 1) limpa execuções anteriores
  // O separador `<!-- ==== -->` é a primeira linha do bloco gerado, mas fica
  // FORA dos marcadores AEO:START/END — sem removê-lo aqui, cada regeneração
  // deixava mais uma linha dele acumulada no <head>.
  html = html.replace(/(?:^[\t ]*<!-- ={10,} -->\n)+(?=[\t ]*<!-- AEO:START)/gm, '');
  html = stripMarked(html, '<!-- AEO:START', '<!-- AEO:END -->');
  // O bloco visível some, mas o MARCADOR fica no lugar dele.
  //
  // O marcador `<!-- AEO-BODY -->` é consumido na primeira injeção (vira o
  // bloco). Se a limpeza o apagasse junto, a regeneração seguinte não teria
  // como saber onde o autor quis o bloco e cairia no fallback "antes do último
  // <footer>" — devolvendo ao rodapé um resumo deliberadamente posicionado no
  // topo. Era exatamente o que acontecia: a posição sobrevivia a uma execução e
  // se perdia na próxima, em silêncio.
  html = html.replace(
    /([\t ]*)<!-- AEO-BODY:START[\s\S]*?<!-- AEO-BODY:END -->\n?/,
    (_, indent) => `${indent}<!-- AEO-BODY -->\n`
  );

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
  // Grava só o que mudou: regenerar uma página não toca as outras.
  const final = crlf ? html.replace(/\n/g, '\r\n') : html;
  if (final !== original) fs.writeFileSync(file, final);
  console.log(`${final === original ? '·' : '✓'} ${p.slug}.html`);

  if (p.hasMd && (doMd || true)) {
    const mdFile = path.join(PUB, `${p.slug}.md`);
    const antes = fs.existsSync(mdFile) ? fs.readFileSync(mdFile, 'utf8') : '';
    const md = antes.includes('\r\n') ? buildMd(p).replace(/\r?\n/g, '\r\n') : buildMd(p);
    if (md !== antes) {
      fs.writeFileSync(mdFile, md);
      console.log(`  ↳ public/${p.slug}.md`);
    }
  }
}

const list = slugs.length ? PAGES.filter((p) => slugs.includes(p.slug)) : PAGES;
if (!list.length) { console.error('Nenhuma página correspondente em pages.mjs:', slugs); process.exit(1); }
for (const p of list) processPage(p);
console.log(`\nConcluído: ${list.length} página(s).`);
