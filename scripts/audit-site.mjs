#!/usr/bin/env node
/*
 * Auditoria global de coerência do site.
 * -----------------------------------------------------------------------------
 * Varre TODAS as páginas de src/*.html e verifica o que só se enxerga olhando o
 * conjunto: links internos quebrados, âncoras inexistentes, páginas órfãs,
 * divergência entre as fontes da verdade (pages.mjs, ecosystem.nav.yaml,
 * eco-nav.js, catalogo.html) e o checklist de SEO do repositório.
 *
 * Existe porque a verificação até aqui era por página: cada suíte olhava a sua
 * e ninguém olhava as arestas entre elas. Coerência é propriedade do grafo.
 *
 * Uso:
 *   node scripts/audit-site.mjs            # relatório completo
 *   node scripts/audit-site.mjs --strict   # sai ≠0 se houver ERRO (para o gate)
 *   node scripts/audit-site.mjs --json     # saída estruturada
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGES } from './seo/pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const PUB = join(ROOT, 'public');
const strict = process.argv.includes('--strict');
const asJson = process.argv.includes('--json');

/**
 * Páginas fora do escopo público: utilitários internos, backups e áreas
 * administrativas. Não entram no catálogo nem no grafo — e não devem ser
 * cobradas por isso.
 */
const NAO_PUBLICAS = new Set([
  '404', 'admin', 'admin-editor', 'diagnostic', 'test-github',
  'index-bkp', 'index.template', 'devin-bkp',
  'privacidade', 'termos', 'cookies',      // legais: linkadas no rodapé
  'exemplopdi', 'mapmind', 'vsl',          // experimentos/utilitários
  'catalogo',                              // é o próprio hub
]);

const erros = [];
const avisos = [];
const info = [];
const erro = (pagina, msg) => erros.push({ pagina, msg });
const aviso = (pagina, msg) => avisos.push({ pagina, msg });

/* ── Coleta ──────────────────────────────────────────────────────────────── */

/**
 * Mesma exclusão de vite.config.js: backups e templates não entram no build,
 * portanto não são páginas e não se cobram deles as regras de página.
 */
const NAO_CONSTRUIDOS = /(^|[.-])(bkp|backup|template)$/i;

const arquivos = readdirSync(SRC)
  .filter((f) => f.endsWith('.html'))
  .map((f) => basename(f, '.html'))
  .filter((slug) => !NAO_CONSTRUIDOS.test(slug))
  .sort();

const docs = new Map();
for (const slug of arquivos) {
  docs.set(slug, readFileSync(join(SRC, `${slug}.html`), 'utf8'));
}

const publicas = arquivos.filter((s) => !NAO_PUBLICAS.has(s));

/* ── Utilidades de extração (regex é suficiente: só lemos o <head> e hrefs) ── */

const tag = (html, re) => (html.match(re) || [])[1]?.trim();
const title = (h) => tag(h, /<title[^>]*>([\s\S]*?)<\/title>/i);
const desc = (h) => tag(h, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
const canonical = (h) => tag(h, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
const robots = (h) => tag(h, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
const lang = (h) => tag(h, /<html[^>]+lang=["']([^"']*)["']/i);

/** Comentários e scripts fora: `<h1>` citado em prosa não é um heading. */
const semComentarios = (html) =>
  html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<script[\s\S]*?<\/script>/gi, ' ');

function h1Count(html) {
  return (semComentarios(html).match(/<h1\b/gi) || []).length;
}

/**
 * hrefs internos: ./x.html, x.html, /x, #ancora
 *
 * Descarta expressões de template (`${...}`, `{{...}}`) e identificadores JS
 * soltos como `step.href`: são hrefs montados em tempo de execução dentro de
 * strings de script, não links do documento.
 */
function linksInternos(html) {
  return [...html.matchAll(/href=["']([^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((h) => h && !/^(https?:|mailto:|tel:|data:|javascript:)/i.test(h))
    .filter((h) => !/[${}]|\{\{/.test(h))
    .filter((h) => !/^[A-Za-z_$][\w$]*(\.[\w$]+)+$/.test(h));
}

function idsDe(html) {
  return new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]));
}

/* ── 1. SEO por página (checklist do repositório) ─────────────────────────── */

for (const slug of arquivos) {
  const html = docs.get(slug);
  const p = `${slug}.html`;

  if (lang(html) !== 'pt-BR') aviso(p, `lang="${lang(html) ?? 'ausente'}" — esperado pt-BR`);

  const n = h1Count(html);
  if (n === 0) erro(p, 'sem <h1>');
  else if (n > 1) erro(p, `${n} elementos <h1> — deve haver exatamente um`);

  if (NAO_PUBLICAS.has(slug)) continue;

  const t = title(html);
  if (!t) erro(p, 'sem <title>');
  else if (t.length < 10 || t.length > 60) aviso(p, `<title> com ${t.length} chars (10–60)`);

  const d = desc(html);
  if (!d) erro(p, 'sem meta description');
  else if (d.length < 50 || d.length > 160) aviso(p, `description com ${d.length} chars (50–160)`);

  const c = canonical(html);
  if (!c) erro(p, 'sem <link rel="canonical">');
  else if (!c.startsWith('https://mauricio.issei.com.br')) {
    erro(p, `canonical fora do domínio: ${c}`);
  }

  const r = robots(html);
  if (r && /noindex/i.test(r)) aviso(p, `robots="${r}" — página pública com noindex`);
}

/* ── 2. Links internos e âncoras ──────────────────────────────────────────── */

for (const slug of arquivos) {
  const html = docs.get(slug);
  const p = `${slug}.html`;
  const proprios = idsDe(html);

  for (const href of new Set(linksInternos(html))) {
    if (href.startsWith('#')) {
      const id = href.slice(1);
      if (!id || proprios.has(id)) continue;
      // Em páginas administrativas o conteúdo é hidratado por JS, então o
      // destino da âncora pode não existir no HTML estático. Vira aviso.
      if (NAO_PUBLICAS.has(slug)) aviso(p, `âncora sem destino no HTML estático: ${href}`);
      else erro(p, `âncora inexistente na própria página: ${href}`);
      continue;
    }

    // separa caminho de âncora
    const [caminho, ancora] = href.split('#');
    const limpo = caminho.replace(/^\.?\//, '').replace(/^\//, '');
    if (!limpo) continue;

    // recursos de public/ (md, pdf, json, imagens…)
    if (!limpo.endsWith('.html')) {
      const emPublic = existsSync(join(PUB, limpo));
      const emSrc = existsSync(join(SRC, limpo));
      const semExt = !/\.[a-z0-9]+$/i.test(limpo);
      if (semExt) {
        // Sem extensão pode ser (a) um recurso real servido sem extensão, como
        // os documentos de /.well-known/, ou (b) uma rota que o CloudFront
        // reescreve para .html. Só é erro se não for nenhum dos dois.
        if (emPublic || emSrc || docs.has(limpo)) continue;
        erro(p, `link para rota inexistente: ${href}`);
        continue;
      }
      if (!emPublic && !emSrc) erro(p, `recurso inexistente: ${href}`);
      continue;
    }

    const alvo = basename(limpo, '.html');
    if (!docs.has(alvo)) {
      erro(p, `link para página inexistente: ${href}`);
      continue;
    }
    if (ancora && !idsDe(docs.get(alvo)).has(ancora)) {
      aviso(p, `âncora inexistente em ${alvo}.html: #${ancora}`);
    }
  }
}

/* ── 3. Alcançabilidade: órfãs e cobertura do catálogo ────────────────────── */

const catalogo = docs.get('catalogo') ?? '';
const noCatalogo = new Set(
  [...catalogo.matchAll(/href=["']\.?\/?([a-z0-9-]+)\.html["']/gi)].map((m) => m[1])
);

// quem é apontado por alguém (fora do próprio arquivo)
const apontadas = new Set();
for (const [slug, html] of docs) {
  for (const href of linksInternos(html)) {
    const alvo = basename(href.split('#')[0].replace(/^\.?\//, ''), '.html');
    if (alvo && alvo !== slug && docs.has(alvo)) apontadas.add(alvo);
  }
}

for (const slug of publicas) {
  if (!noCatalogo.has(slug)) aviso(`${slug}.html`, 'página pública fora de catalogo.html');
  if (!apontadas.has(slug)) erro(`${slug}.html`, 'órfã — nenhuma página do site aponta para ela');
}

/* ── 4. Sincronia entre as fontes da verdade ──────────────────────────────── */

const yaml = readFileSync(join(ROOT, 'specs/ecosystem.nav.yaml'), 'utf8');
const ecoJs = readFileSync(join(ROOT, 'src/js/eco-nav.js'), 'utf8');

const yamlNodes = [...yaml.matchAll(/^\s{4}nodes:\s*\[([^\]]+)\]/gm)]
  .flatMap((m) => m[1].split(',').map((s) => s.trim()));
const jsNodes = [...ecoJs.matchAll(/nodes:\s*\[([^\]]+)\]/g)]
  .flatMap((m) => m[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')));

for (const n of yamlNodes) {
  if (!jsNodes.includes(n)) erro('ecosystem', `nó "${n}" no YAML mas ausente de eco-nav.js`);
}
for (const n of jsNodes) {
  if (!yamlNodes.includes(n)) erro('ecosystem', `nó "${n}" em eco-nav.js mas ausente do YAML`);
}
for (const n of new Set([...yamlNodes, ...jsNodes])) {
  if (!docs.has(n)) erro('ecosystem', `nó "${n}" não corresponde a src/${n}.html`);
}

const yv = yaml.match(/version:\s*"([\d.]+)"/)?.[1];
const jv = ecoJs.match(/version:\s*'([\d.]+)'/)?.[1];
if (yv !== jv) erro('ecosystem', `versões divergentes — YAML ${yv} × eco-nav.js ${jv}`);

// pages.mjs × arquivos
const slugsSeo = new Set(PAGES.map((p) => p.slug));
for (const p of PAGES) {
  if (!docs.has(p.slug)) erro('pages.mjs', `slug "${p.slug}" sem src/${p.slug}.html`);
}
for (const slug of publicas) {
  if (!slugsSeo.has(slug)) aviso(`${slug}.html`, 'fora de scripts/seo/pages.mjs (sem AEO/OG)');
}

// companions .md declarados
for (const p of PAGES) {
  if (p.hasMd && !existsSync(join(PUB, `${p.slug}.md`))) {
    erro('pages.mjs', `hasMd: true mas public/${p.slug}.md não existe (${p.slug})`);
  }
}

/* ── 4b. Manifest e ícones ────────────────────────────────────────────────── */

const manifestPath = join(PUB, 'site.webmanifest');
if (existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    for (const icon of manifest.icons ?? []) {
      const src = String(icon.src || '').replace(/^\//, '');
      // Os ícones do manifest não aparecem em nenhum href de página: sem esta
      // checagem, apontar para arquivos inexistentes passa despercebido e o
      // ícone do app instalado simplesmente não carrega.
      if (src && !existsSync(join(PUB, src))) {
        erro('site.webmanifest', `ícone inexistente: /${src}`);
      }
    }
  } catch {
    erro('site.webmanifest', 'JSON inválido');
  }
}

/* ── 4c. Sitemap (só se já houver build) ──────────────────────────────────── */

const sitemapPath = join(ROOT, 'dist/sitemap.xml');
if (existsSync(sitemapPath)) {
  const xml = readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(/^https?:\/\/[^/]+\//, '').replace(/\/$/, ''));

  for (const url of urls) {
    const slug = url || 'index';
    // O sitemap é um convite explícito à indexação: área administrativa,
    // página de erro e utilitários internos não podem estar nele.
    if (NAO_PUBLICAS.has(slug) && !['privacidade', 'termos', 'cookies', 'catalogo'].includes(slug)) {
      erro('sitemap.xml', `oferece página não pública à indexação: /${slug}`);
    }
    if (NAO_CONSTRUIDOS.test(slug)) erro('sitemap.xml', `oferece backup/template: /${slug}`);
  }
  for (const slug of publicas) {
    if (!urls.includes(slug) && !(slug === 'index' && urls.includes(''))) {
      aviso('sitemap.xml', `página pública ausente do sitemap: /${slug}`);
    }
  }
} else {
  info.push('dist/sitemap.xml ausente — rode `npx vite build` para auditá-lo');
}

/* ── 5. Coerência de identidade e tom ─────────────────────────────────────── */

const LEXICO = [
  [/\bdevin\b/i, 'Devin'],
  [/\bsalesforce\b/i, 'Salesforce'],
  [/\bgraphrag\b/i, 'GraphRAG'],
  [/\bflosum\b/i, 'Flosum'],
];
const MARKETING = [
  'revolucionário', 'revolucionária', 'disruptivo', 'disruptiva',
  'game-changer', 'solução completa', 'de última geração',
];

/**
 * Luminância relativa de um hex (WCAG 2.1). Duplicada aqui de propósito: este
 * script roda no gate antes dos testes e não deve importar de tests/.
 */
function luminancia(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(full.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Croma absoluto (max−min dos canais), 0–1. Separa superfície neutra de cor de
 * acento.
 *
 * Usa-se croma e não saturação HSL: para cores muito claras o denominador da
 * HSL fica minúsculo e infla o resultado — #FDFBF7, um creme quase branco,
 * marcava 0.59 e escapava do filtro. Em croma ele marca 0.02, que é o que a
 * percepção diz.
 */
function croma(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  return Math.max(r, g, b) - Math.min(r, g, b);
}

for (const slug of publicas) {
  const html = docs.get(slug);

  /*
   * INV-S9 — fundo escuro em toda página (AGENTS.md: "Pure Dark Mode. Never use
   * light backgrounds"). `know.html` violava isso com uma paleta editorial clara
   * e nada acusava, porque a verificação era por página e nenhuma suíte
   * comparava páginas entre si.
   *
   * Procura declarações de fundo com luminância alta em CSS embutido. Não
   * substitui o axe — que mede contraste real, com cascata e opacidade — mas
   * pega a regressão na fonte, antes de subir navegador.
   */
  for (const m of html.matchAll(/background(?:-color)?:\s*(#[0-9a-fA-F]{3,6})\b/g)) {
    // Luminância sozinha acusaria acentos vivos (#00f5a0, #22d3ee) usados
    // em badges e barras, que não são superfície. O que a norma proíbe é
    // SUPERFÍCIE clara — quase sempre neutra. Exige-se as duas condições.
    if (luminancia(m[1]) > 0.5 && croma(m[1]) < 0.15) {
      erro(`${slug}.html`, `fundo claro declarado: ${m[1]} — o site é dark mode (INV-S9)`);
    }
  }
  for (const m of html.matchAll(/background(?:-color)?:\s*(white|ivory|snow|ghostwhite|floralwhite)\b/gi)) {
    erro(`${slug}.html`, `fundo claro declarado: ${m[1]} — o site é dark mode (INV-S9)`);
  }

  const texto = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');

  for (const [loose, canonicalForm] of LEXICO) {
    if (loose.test(texto) && !texto.includes(canonicalForm)) {
      aviso(`${slug}.html`, `lexical lock: "${canonicalForm}" fora da grafia canônica`);
    }
  }
  for (const termo of MARKETING) {
    if (new RegExp(`\\b${termo}\\b`, 'i').test(texto)) {
      aviso(`${slug}.html`, `jargão de marketing: "${termo}" (ECOSYSTEM.md §4.2)`);
    }
  }
}

info.push(`${arquivos.length} páginas em src/ · ${publicas.length} públicas`);
info.push(`${yamlNodes.length} nós no grafo · ${PAGES.length} entradas em pages.mjs`);

/* ── Relatório ───────────────────────────────────────────────────────────── */

if (asJson) {
  console.log(JSON.stringify({ erros, avisos, info }, null, 2));
} else {
  console.log('=== Auditoria global de coerência ===');
  for (const i of info) console.log(`  · ${i}`);

  const agrupar = (lista) => {
    const m = new Map();
    for (const { pagina, msg } of lista) {
      if (!m.has(pagina)) m.set(pagina, []);
      m.get(pagina).push(msg);
    }
    return m;
  };

  if (erros.length) {
    console.log(`\n✗ ERROS (${erros.length})`);
    for (const [pagina, msgs] of agrupar(erros)) {
      console.log(`  ${pagina}`);
      for (const m of msgs) console.log(`    - ${m}`);
    }
  }
  if (avisos.length) {
    console.log(`\n⚠ AVISOS (${avisos.length})`);
    for (const [pagina, msgs] of agrupar(avisos)) {
      console.log(`  ${pagina}`);
      for (const m of msgs) console.log(`    - ${m}`);
    }
  }
  if (!erros.length && !avisos.length) console.log('\n✓ nenhum problema encontrado.');
}

if (strict && erros.length) {
  console.error(`\n✗ [audit] ${erros.length} erro(s) de coerência.`);
  process.exit(1);
}
