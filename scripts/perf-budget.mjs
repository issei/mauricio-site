#!/usr/bin/env node
/*
 * Orçamento de performance da página v3.0 (spec §4.3).
 *
 * A promessa de "autoridade em 5 segundos" do Hero só se sustenta se o próprio
 * carregamento não consumir esse tempo. Este script mede o CAMINHO CRÍTICO real
 * em dist/ e reprova o build quando ele estoura — antes que a regressão chegue
 * ao CloudFront.
 *
 * Não substitui Lighthouse; substitui a ausência de qualquer guarda, que era o
 * estado anterior do repositório (dívida D-T05). Mede bytes e requisições
 * bloqueantes, que são determinísticos e não dependem de rede.
 *
 * Uso: node scripts/perf-budget.mjs [--verbose]
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const verbose = process.argv.includes('--verbose');

const BUDGET = {
  page: 'apresentacao.html',
  criticalGzipKB: 60,   // HTML + CSS/JS bloqueantes do Hero e do Seletor
  /*
   * REQUISIÇÕES DE REDE que travam o primeiro render. Script inline não entra
   * na conta: ele custa microssegundos de parser, não um round-trip de rede —
   * e é a ida à rede que ameaça a promessa de "autoridade em 5 segundos" numa
   * conexão móvel ruim. O snippet de analítica do site é inline por design.
   */
  blockingRequests: 2,
  inlineScriptsInHead: 2,  // teto separado, para que não cresçam sem limite
};

/*
 * Regra que vale para o SITE INTEIRO, não só para a página v3.0.
 *
 * `cdn.tailwindcss.com` compila CSS no navegador: além do download, custa a
 * compilação inteira antes do primeiro pixel. Seis páginas o carregavam
 * (SITE_MASTER_PLAN §5.3); agora nenhuma, e esta verificação impede que volte.
 */
const CDNS_PROIBIDAS = [
  { host: 'cdn.tailwindcss.com', motivo: 'compila CSS no navegador — use uma folha própria com @theme' },
];

if (!existsSync(DIST)) {
  console.error('✗ [perf] dist/ não existe. Rode `npx vite build` antes.');
  process.exit(1);
}

const htmlPath = join(DIST, BUDGET.page);
if (!existsSync(htmlPath)) {
  console.error(`✗ [perf] ${BUDGET.page} não encontrada em dist/.`);
  process.exit(1);
}

const html = readFileSync(htmlPath, 'utf8');
const gzKB = (buf) => gzipSync(buf).length / 1024;

let criticalKB = gzKB(Buffer.from(html));
const parts = [[BUDGET.page, criticalKB]];

// Stylesheets sem media condicional bloqueiam o render. Módulos com defer/async
// (todo <script type="module"> é deferido por definição) não bloqueiam.
//
// O conteúdo de <noscript> sai da conta: aquele <link> é o fallback de quem não
// executa JavaScript e nunca é buscado pelos demais — contá-lo faria a página
// parecer ter o dobro de recursos críticos.
const htmlSemNoscript = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, ' ');
const blocking = [];
for (const m of htmlSemNoscript.matchAll(/<link\b[^>]*>/gi)) {
  const tag = m[0];
  if (!/rel=["']?stylesheet/i.test(tag)) continue;
  if (/\bmedia=["'](?!all)/i.test(tag)) continue; // media condicional não bloqueia
  const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1];
  if (!href) continue;

  if (/^https?:|^\/\//i.test(href)) {
    // CSS de terceiro é o pior caso: DNS + TLS + download no caminho crítico.
    blocking.push(`${href} (externo)`);
    continue;
  }
  blocking.push(href);
  const local = join(DIST, href.replace(/^\.?\//, ''));
  if (existsSync(local)) {
    const kb = gzKB(readFileSync(local));
    criticalKB += kb;
    parts.push([href, kb]);
  }
}

// Scripts inline no <head> contam num orçamento próprio: travam o parser, mas
// não custam round-trip. Fora do <head> não afetam o primeiro render.
const head = html.slice(0, html.indexOf('</head>'));
let inlineHeadScripts = 0;
for (const m of head.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>/gi)) {
  if (/\btype=["']application\/ld\+json/i.test(m[0])) continue; // JSON-LD não executa
  inlineHeadScripts += 1;
}

for (const m of html.matchAll(/<script\b[^>]*\bsrc=[^>]*>/gi)) {
  const tag = m[0];
  if (/\b(defer|async)\b/i.test(tag)) continue;
  if (/type=["']module["']/i.test(tag)) continue; // módulos são deferidos
  blocking.push((tag.match(/src=["']([^"']+)["']/i) || [])[1] || '<script>');
}

const failures = [];
if (criticalKB > BUDGET.criticalGzipKB) {
  failures.push(
    `caminho crítico ${criticalKB.toFixed(1)}KB gzip — teto ${BUDGET.criticalGzipKB}KB`
  );
}
if (blocking.length > BUDGET.blockingRequests) {
  failures.push(
    `${blocking.length} requisições bloqueantes — teto ${BUDGET.blockingRequests}\n    ${blocking.join('\n    ')}`
  );
}
if (inlineHeadScripts > BUDGET.inlineScriptsInHead) {
  failures.push(
    `${inlineHeadScripts} scripts inline no <head> — teto ${BUDGET.inlineScriptsInHead}`
  );
}

/* ── Regra de site: nenhuma página pode voltar a compilar CSS no navegador ── */

const { readdirSync } = await import('node:fs');
const paginas = readdirSync(DIST).filter((f) => f.endsWith('.html'));
const reincidentes = [];

for (const arquivo of paginas) {
  const conteudo = readFileSync(join(DIST, arquivo), 'utf8');
  for (const { host, motivo } of CDNS_PROIBIDAS) {
    if (conteudo.includes(host)) reincidentes.push(`${arquivo}: ${host} — ${motivo}`);
  }
}
if (reincidentes.length) {
  failures.push(`CDN proibida em ${reincidentes.length} página(s):\n    ${reincidentes.join('\n    ')}`);
}

/*
 * Nenhuma página pode bloquear o primeiro render num round-trip a terceiro.
 * Folhas externas devem ser assíncronas (media="print" + onload), com o
 * <noscript> preservando o recurso para quem não executa JavaScript.
 */
const bloqueiaTerceiro = [];
for (const arquivo of paginas) {
  const conteudo = readFileSync(join(DIST, arquivo), 'utf8');
  const head = conteudo.slice(0, conteudo.indexOf('</head>'));
  // Fora de <noscript>, onde o link bloqueante é justamente o fallback correto.
  const semNoscript = head.replace(/<noscript>[\s\S]*?<\/noscript>/gi, ' ');

  for (const m of semNoscript.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/rel=["']?stylesheet/i.test(tag)) continue;
    if (!/https?:\/\//i.test(tag)) continue;              // folha própria: ok
    if (/media=["']print["']/i.test(tag)) continue;       // já assíncrona
    const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1] || '?';
    bloqueiaTerceiro.push(`${arquivo}: ${href.slice(0, 60)}`);
  }
}
if (bloqueiaTerceiro.length) {
  failures.push(
    `CSS de terceiro bloqueando o render em ${bloqueiaTerceiro.length} caso(s):\n    ` +
    bloqueiaTerceiro.slice(0, 10).join('\n    ')
  );
}

console.log(`=== Orçamento de performance :: ${BUDGET.page} ===`);
console.log(`  site: ${paginas.length} páginas · ${reincidentes.length} com CDN que compila no cliente · ${bloqueiaTerceiro.length} com CSS de terceiro bloqueante`);
if (verbose || failures.length) {
  for (const [name, kb] of parts) console.log(`  ${kb.toFixed(1).padStart(6)}KB  ${name}`);
  console.log(`  bloqueantes: ${blocking.length ? blocking.join(", ") : "nenhum"} · inline no head: ${inlineHeadScripts}`);
}
console.log(
  `  crítico: ${criticalKB.toFixed(1)}KB / ${BUDGET.criticalGzipKB}KB · inline-head: ${inlineHeadScripts}/${BUDGET.inlineScriptsInHead} · ` +
  `bloqueantes: ${blocking.length} / ${BUDGET.blockingRequests}`
);

if (failures.length) {
  console.error('\n✗ [perf] orçamento estourado:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('✓ [perf] dentro do orçamento.');
