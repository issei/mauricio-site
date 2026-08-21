#!/usr/bin/env node
/*
 * Gera src/js/apresentacao/hub-data.js — os itens do Hub de Conexão (spec §2.E).
 *
 * PROCEDÊNCIA DE CADA CAMPO (o ponto todo deste script):
 *   slug/title/blurb  ← scripts/seo/pages.mjs   (SSOT de conteúdo já existente)
 *   minutes           ← texto visível de src/<slug>.html, a 200 ppm
 *   tab/complexity    ← INTENT abaixo — o único dado editorial novo
 *
 * Por que o mapeamento de intenção vive AQUI e não em pages.mjs: aquele SSOT é
 * consumido por build-aeo.mjs para as 17 páginas do site. Acrescentar campos que
 * só uma página usa acoplaria o SSOT global a uma feature local. O que não pode
 * acontecer — e não acontece — é uma segunda cópia de título, blurb ou URL.
 *
 * O tempo de leitura NUNCA é digitado. Numa página que argumenta por dado real,
 * um "12 min" estimado no olho seria uma incoerência com a própria tese.
 *
 * Uso: node scripts/gen-hub-data.mjs [--check]
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from './seo/pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/js/apresentacao/hub-data.js');

/**
 * Mapeamento de INTENÇÃO do leitor — não de autoridade.
 * Os tiers S/A/B de pages.mjs medem peso editorial; as abas medem "para que o
 * visitante veio". São eixos diferentes e não se derivam um do outro.
 */
const INTENT = {
  // Para decidir — síntese, risco, estratégia
  know: { tab: 'decidir', complexity: 'Estratégica' },
  'service-operations-2-0': { tab: 'decidir', complexity: 'Estratégica' },
  sustentacao: { tab: 'decidir', complexity: 'Estratégica' },
  socialselling: { tab: 'decidir', complexity: 'Estratégica' },
  'terminal-evolutivo': { tab: 'decidir', complexity: 'Estratégica' },

  // Para planejar — casos, táticas de orquestração e esteira
  devin: { tab: 'planejar', complexity: 'Técnica Aplicada' },
  'devops-salesforce': { tab: 'planejar', complexity: 'Técnica Aplicada' },
  'salesforce-agentic-quickstart': { tab: 'planejar', complexity: 'Técnica Aplicada' },
  proposta: { tab: 'planejar', complexity: 'Técnica Aplicada' },
  'proposta-observabilidade-mobile': { tab: 'planejar', complexity: 'Técnica Aplicada' },
  'engenharia-confianca': { tab: 'planejar', complexity: 'Técnica Aplicada' },

  // Para especificar — arquiteturas de referência, ontologias, whitepapers
  'engenharia-agentes-ia': { tab: 'especificar', complexity: 'Tópico Profundo' },
  'knowledge-os-presentation': { tab: 'especificar', complexity: 'Tópico Profundo' },
  'proposta-engenharia-reversa': { tab: 'especificar', complexity: 'Tópico Profundo' },
  'formulacao-de-problemas': { tab: 'especificar', complexity: 'Tópico Profundo' },
  'salesforce-agentic-dev': { tab: 'especificar', complexity: 'Tópico Profundo' },
};

const WPM = 200; // leitura técnica em PT-BR

/**
 * Tempo de consumo derivado do TEXTO VISÍVEL de src/<slug>.html.
 *
 * Os public/<slug>.md são resumos para AEO (250–730 palavras) e não representam
 * o que o visitante lê — a página real tem ordens de grandeza a mais. Derivar
 * daquele arquivo produziria "1 min" para um artigo de vinte minutos, ou seja,
 * exatamente o número estimado por efeito que a spec §2.A proíbe.
 */
function readingMinutes(slug) {
  const page = join(ROOT, 'src', `${slug}.html`);
  if (!existsSync(page)) return null;

  const text = readFileSync(page, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')       // rótulos de diagrama não se leem em prosa
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ');

  const words = text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  return Math.max(1, Math.round(words / WPM));
}

const items = [];
const missing = [];

for (const page of PAGES) {
  const intent = INTENT[page.slug];
  if (!intent) continue; // páginas fora do Hub (index, catalogo, life…) por escolha

  const minutes = readingMinutes(page.slug);
  if (minutes === null) {
    missing.push(page.slug);
    continue;
  }

  items.push({
    slug: page.slug,
    title: page.title.split(/\s+[—|]\s+/)[0].trim(),
    blurb: page.description,
    href: `./${page.slug}.html`,
    tab: intent.tab,
    minutes,
    complexity: intent.complexity,
  });
}

if (missing.length) {
  console.warn(
    `⚠ [hub] sem HTML em src/, fora do Hub: ${missing.join(', ')}\n` +
    `  (o tempo de leitura seria estimado — preferimos omitir o item)`
  );
}

// Ordem: aba, depois tempo crescente. Dentro de cada aba o visitante encontra
// primeiro o item mais barato de consumir.
const order = { decidir: 0, planejar: 1, especificar: 2 };
items.sort((a, b) => order[a.tab] - order[b.tab] || a.minutes - b.minutes);

const banner = `/**
 * GERADO por scripts/gen-hub-data.mjs — NÃO EDITAR À MÃO.
 *
 * Procedência: título/blurb de scripts/seo/pages.mjs; \`minutes\` calculado do
 * texto visível de src/<slug>.html a ${WPM} ppm; \`tab\`/\`complexity\` do mapa
 * INTENT do gerador. Rode o script novamente após alterar qualquer fonte.
 */`;

const body =
  `${banner}\n\n/** @type {import('./hub-model.js').HubItem[]} */\n` +
  `export const HUB_ITEMS = ${JSON.stringify(items, null, 2)};\n`;

const counts = items.reduce((a, i) => ({ ...a, [i.tab]: (a[i.tab] || 0) + 1 }), {});

/* ── Injeção no HTML ─────────────────────────────────────────────────────
 * Os cards são renderizados no HTML base, não montados por JavaScript. Sem
 * isto, o Hub inteiro sumiria na versão sem JS — e o Hub é onde está todo o
 * caminho de aprofundamento do site. O JS apenas alterna `hidden` para filtrar.
 */
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const cards = items
  .map((i) => `        <a class="ap-hub-item" href="${i.href}" data-hub-item data-tab="${i.tab}"${
    i.tab === 'decidir' ? '' : ' hidden'
  }>
          <h3>${esc(i.title)}</h3>
          <p>${esc(i.blurb)}</p>
          <span class="ap-hub-meta">
            <span class="ap-complexity">${esc(i.complexity)}</span>
            <span>${i.minutes} min</span>
          </span>
        </a>`)
  .join('\n');

const HUB_START = '<!-- AP-HUB:START -->';
const HUB_END = '<!-- AP-HUB:END -->';
const hubBlock = `${HUB_START}
        <div class="ap-hub-grid" id="ap-hub-panel" role="tabpanel" aria-labelledby="ap-hub-title">
${cards}
        </div>
        ${HUB_END}`;

const PAGE = join(ROOT, 'src/apresentacao.html');
let pageHtml = existsSync(PAGE) ? readFileSync(PAGE, 'utf8') : '';
let pageNext = pageHtml;

if (pageHtml) {
  const re = new RegExp(`${HUB_START}[\\s\\S]*?${HUB_END}`);
  if (!re.test(pageHtml)) {
    console.error(`✗ [hub] marcadores ${HUB_START} … ${HUB_END} ausentes em src/apresentacao.html`);
    process.exit(1);
  }
  pageNext = pageHtml.replace(re, hubBlock);

  // Os contadores no HTML base também precisam ser reais: sem JS eles são o
  // único número que o visitante vê.
  for (const tab of ['decidir', 'planejar', 'especificar']) {
    pageNext = pageNext.replace(
      new RegExp(`(data-tab="${tab}"[\\s\\S]*?<span class="ap-tab-count">)\\([0-9]+\\)`),
      `$1(${counts[tab] || 0})`
    );
  }
}

const check = process.argv.includes('--check');
const prev = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';

// Comparação insensível a fim de linha: no Windows o Git converte os arquivos
// para CRLF ao restaurar, e uma comparação byte a byte acusaria dessincronia
// permanente em algo que só difere no separador de linha.
const eol = (s) => s.replace(/\r\n/g, '\n');
const inSync = eol(prev) === eol(body) && eol(pageNext) === eol(pageHtml);

if (inSync) {
  console.log(`✓ [hub] sincronizado (${items.length} itens)`);
  process.exit(0);
}
if (check) {
  console.error('✗ [hub] dessincronizado. Rode: node scripts/gen-hub-data.mjs');
  process.exit(1);
}

writeFileSync(OUT, body);
if (pageHtml) writeFileSync(PAGE, pageNext);
console.log(
  `✓ [hub] ${items.length} itens — ` +
  `decidir ${counts.decidir || 0} · planejar ${counts.planejar || 0} · especificar ${counts.especificar || 0}`
);
