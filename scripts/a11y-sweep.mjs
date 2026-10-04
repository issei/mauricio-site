#!/usr/bin/env node
/*
 * Varredura de acessibilidade WCAG 2.2 AA — todas as páginas PT-BR, contra o BUILD.
 *
 * Por que existe (docs/specs/a11y-first/accessibility-audit.md, G-01): o axe do
 * Playwright roda em 14 de 41 páginas, no dev server, e as tags param em wcag21aa.
 * Aqui: todas as páginas, `dist/` servido por `vite preview` (CSS real, sem FOUC),
 * tags até wcag22aa, e uma CATRACA — `tests/a11y/baseline.json` guarda a dívida
 * conhecida e só pode DESCER (ver scripts/a11y-ratchet.mjs).
 *
 * Mede, por página:
 *   axe:<regra>          nós violando (wcag2a/2aa/21a/21aa/22aa, qualquer impacto)
 *   static:no-main       sem <main>
 *   static:no-skip-link  1º Tab não cai num skip link que aponta para um id existente
 *   static:h1-count      nº de <h1> diferente de 1
 *   reflow:320           rolagem horizontal da página inteira a 320 px (SC 1.4.10)
 *   motion:reduce        animações CSS/WAAPI ainda correndo com prefers-reduced-motion (infinitas ou > 1 ms
 *                        depois de .finish()). Piso: GSAP/rAF e vídeo não aparecem em getAnimations().
 *
 * Estado medido: movimento reduzido, rastreadores bloqueados (CDNs liberadas — exige rede),
 * banner de cookies visível (contexto novo = sem consentimento gravado).
 *
 * Uso:
 *   node scripts/a11y-sweep.mjs                 # confere contra o baseline (exit 1 se diverge)
 *   node scripts/a11y-sweep.mjs --update        # regrava o baseline (recusa se algo PIOROU)
 *   node scripts/a11y-sweep.mjs --only index.html,curriculo.html
 *   node scripts/a11y-sweep.mjs --base http://localhost:4173   # usa servidor já no ar
 *
 * Limite honesto: axe detecta só parte das barreiras. Passar aqui NÃO é conformidade.
 */
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { preview } from 'vite';
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compare, prune } from './a11y-ratchet.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BASELINE = join(ROOT, 'tests', 'a11y', 'baseline.json');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const EXCLUIR = /(^|[.-])(bkp|backup|template)$/i; // mesmo critério do vite.config.js
const POOL = 4;

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1] ?? ''; };
const update = args.includes('--update');
const only = flag('--only')?.split(',').filter(Boolean);

if (!existsSync(DIST)) {
  console.error('✗ a11y-sweep: dist/ não existe — rode `npx vite build` antes.');
  process.exit(2);
}

// PT-BR (raiz) e o gêmeo EN (`en/<arquivo>`): o espelho é público e indexado, e tradução mais longa estoura
// layout e pode esvaziar um botão — o que o PT não mostra. Chave do baseline: `<arquivo>` ou `en/<arquivo>`.
const list = (dir, prefix) => readdirSync(join(ROOT, 'src', dir))
  .filter((f) => f.endsWith('.html') && !EXCLUIR.test(parse(f).name) && existsSync(join(DIST, dir, f)))
  .map((f) => prefix + f);
const pages = [...list('', ''), ...list('en', 'en/')]
  .filter((k) => !only || only.includes(k))
  .sort();

// Build velho = medição de outra coisa (um `vite build` que falhou deixa o dist anterior de pé).
const velhos = pages.filter((k) => statSync(join(ROOT, 'src', k)).mtimeMs > statSync(join(DIST, k)).mtimeMs + 1000);
if (velhos.length && !args.includes('--base')) {
  console.error(`✗ a11y-sweep: dist/ mais velho que a fonte em ${velhos.length} página(s) (ex.: ${velhos[0]}) — o vite build falhou ou não rodou.`);
  process.exit(2);
}

async function measure(browser, base, file) {
  const url = `${base}/${file}`;
  const out = {};
  const bump = (k, n = 1) => { if (n > 0) out[k] = (out[k] ?? 0) + n; };
  const open = async (width, height) => {
    const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    // Só rastreadores são bloqueados (ruído). CDNs de CSS/JS ficam: páginas legadas dependem delas
    // para renderizar, e medi-las sem elas mascara contraste e ARIA gerado em runtime.
    await ctx.route(/^https?:\/\/(([^/]*\.)?(googletagmanager|google-analytics|doubleclick)\.(com|net)|connect\.facebook\.net)\//, (r) => r.abort());
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await page.waitForTimeout(1200);
    await page.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch { /* infinita */ } }));
    await page.waitForTimeout(300);
    return { ctx, page };
  };

  const desktop = await open(1280, 800);
  try {
    // Guarda contra servidor errado: página sem texto e sem <title> = nada foi servido, e a medição seria ruído.
    const { len, title } = await desktop.page.evaluate(() => ({ len: document.body?.innerText.trim().length ?? 0, title: document.title }));
    if (len < 50 && !title) throw new Error(`${file}: página vazia (${len} chars) — servidor/dist errado`);
    const res = await new AxeBuilder({ page: desktop.page }).withTags(TAGS).exclude('iframe').analyze();
    for (const v of res.violations) bump(`axe:${v.id}`, v.nodes.length);

    const s = await desktop.page.evaluate(() => ({
      main: document.querySelectorAll('main').length,
      h1: document.querySelectorAll('h1').length,
    }));
    if (s.main === 0) bump('static:no-main');
    if (s.h1 !== 1) bump('static:h1-count');

    await desktop.page.keyboard.press('Tab');
    const skip = await desktop.page.evaluate(() => {
      const a = document.activeElement;
      const href = a?.tagName === 'A' ? a.getAttribute('href') ?? '' : '';
      return href.length > 1 && href.startsWith('#') && !!document.getElementById(href.slice(1)) &&
        /pular|ir para|skip|go to|jump to/i.test(a.textContent ?? '');
    });
    if (!skip) bump('static:no-skip-link');

    const motion = await desktop.page.evaluate(() => document.getAnimations()
      .filter((a) => a.playState === 'running' && a.effect?.getComputedTiming().duration > 1).length);
    bump('motion:reduce', motion);
  } finally {
    await desktop.ctx.close();
  }

  const narrow = await open(320, 640);
  try {
    const over = await narrow.page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    if (over) bump('reflow:320');
  } finally {
    await narrow.ctx.close();
  }
  return out;
}

async function run() {
  let server = null;
  let base = flag('--base');
  if (!base) {
    process.chdir(ROOT); // vite.config.js resolve root/outDir a partir daqui
    server = await preview({ configFile: join(ROOT, 'vite.config.js'), preview: { port: 4174, strictPort: true, open: false }, logLevel: 'error' });
    base = server.resolvedUrls.local[0].replace(/\/$/, '');
  }
  const browser = await chromium.launch();
  const measured = {};
  const queue = [...pages];
  try {
    await Promise.all(Array.from({ length: Math.min(POOL, queue.length) }, async () => {
      for (let f = queue.shift(); f; f = queue.shift()) {
        measured[f] = await measure(browser, base, f);
        process.stderr.write(`  · ${f}\n`);
      }
    }));
  } finally {
    await browser.close();
    await server?.close();
  }
  return measured;
}

console.log(`▶ a11y-sweep: ${pages.length} página(s) (PT + EN), WCAG 2.2 AA, build de produção`);
const measured = prune(await run());
const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : {};
// Com --only, compara só o subconjunto medido.
const scoped = only ? Object.fromEntries(Object.entries(baseline).filter(([p]) => only.includes(p))) : baseline;
const { regressions, improvements } = compare(scoped, measured);
const total = (c) => Object.values(c).reduce((a, k) => a + Object.values(k).reduce((x, y) => x + y, 0), 0);

if (update) {
  if (regressions.length && existsSync(BASELINE)) {
    console.error(`✗ a11y-sweep --update recusado: a dívida AUMENTOU (${regressions.length}):\n  ${regressions.join('\n  ')}`);
    process.exit(1);
  }
  const next = only ? prune({ ...baseline, ...Object.fromEntries(pages.map((p) => [p, measured[p] ?? {}])) }) : measured;
  mkdirSync(dirname(BASELINE), { recursive: true });
  writeFileSync(BASELINE, JSON.stringify(next, null, 2) + '\n');
  console.log(`✓ a11y-sweep: baseline gravado (${total(next)} ocorrência(s) em ${Object.keys(next).length} página(s)).`);
  process.exit(0);
}

if (regressions.length) {
  console.error(`✗ a11y-sweep: REGRESSÃO (${regressions.length}) — corrija ou justifique em EXCEPTIONS.md:\n  ${regressions.join('\n  ')}`);
  process.exit(1);
}
if (improvements.length) {
  console.error(`✗ a11y-sweep: a dívida DIMINUIU (${improvements.length}) — regrave com \`node scripts/a11y-sweep.mjs --update\` para travar o ganho:\n  ${improvements.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ a11y-sweep: sem regressão (${total(measured)} ocorrência(s) conhecidas no baseline).`);
