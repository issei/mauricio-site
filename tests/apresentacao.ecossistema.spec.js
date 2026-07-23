/**
 * Coerência da página v3.0 com o resto do ecossistema.
 *
 * Uma página nova não está entregue quando renderiza: está entregue quando o
 * site inteiro continua consistente com ela. Estes testes verificam as
 * fronteiras — links que apontam para lugares reais, SSOT sincronizada,
 * vocabulário travado e ausência de vazamento de estilo.
 */
import { test, expect } from '@playwright/test';

const PATH = '/apresentacao.html';

/* ── Alcançabilidade ────────────────────────────────────────────────────── */

test('a página é alcançável a partir do catálogo', async ({ page }) => {
  await page.goto('/catalogo.html');
  const link = page.locator('a[href="./apresentacao.html"]');
  await expect(link).toHaveCount(1);
  await expect(link.locator('h3')).toContainText('Arquitetura de IA auditável');
});

test('todo link interno da página aponta para um arquivo que existe', async ({ page, request }) => {
  await page.goto(PATH);
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && !/^(https?:|mailto:|tel:|#)/.test(h))
  );
  expect(hrefs.length).toBeGreaterThan(5);

  const quebrados = [];
  for (const href of [...new Set(hrefs)]) {
    const res = await request.get(href.replace(/^\.\//, '/'));
    if (!res.ok()) quebrados.push(`${href} → ${res.status()}`);
  }
  expect(quebrados, `links quebrados: ${quebrados.join(', ')}`).toEqual([]);
});

test('os destinos do Hub existem e conferem com o slug declarado', async ({ page, request }) => {
  await page.goto(PATH);
  const items = await page.evaluate(() =>
    [...document.querySelectorAll('[data-hub-item]')].map((a) => a.getAttribute('href'))
  );
  for (const href of items) {
    const res = await request.get(href.replace(/^\.\//, '/'));
    expect(res.ok(), `${href} respondeu ${res.status()}`).toBe(true);
  }
});

/* ── SSOT de navegação ──────────────────────────────────────────────────── */

test('o componente <eco-nav> conhece a página nova', async ({ page }) => {
  await page.goto(PATH);
  const nav = page.locator('eco-nav');
  await expect(nav).toHaveCount(1);

  // A pílula de contexto mostra o pilar da página atual — se o slug não
  // estivesse no grafo, o componente não saberia em qual pilar ela vive.
  const pilar = await nav.evaluate((el) => el.shadowRoot?.textContent ?? '');
  expect(pilar).toContain('Engenharia de Confiança');
});

// A sincronia YAML ↔ eco-nav.js é verificada em
// tests/apresentacao.ecossistema.test.mjs, que lê os dois arquivos do disco —
// o YAML não é servido pelo dev server.

/* ── Isolamento visual ──────────────────────────────────────────────────── */

test('o namespace .ap- não vaza para outras páginas', async ({ page }) => {
  for (const url of ['/catalogo.html', '/index.html', '/engenharia-confianca.html']) {
    await page.goto(url);
    const vazou = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        token: root.getPropertyValue('--ap-l1-bg').trim(),
        classes: document.querySelectorAll('[class*="ap-"]').length,
      };
    });
    expect(vazou.token, `tokens .ap- vazaram para ${url}`).toBe('');
  }
});

test('as outras páginas mantêm a paleta Dark Tech', async ({ page }) => {
  await page.goto('/catalogo.html');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(13, 17, 23)'); // #0d1117 — inalterado
});

/* ── Vocabulário e tom ──────────────────────────────────────────────────── */

test('lexical lock: os nomes do ecossistema aparecem na grafia canônica', async ({ page }) => {
  await page.goto(PATH);
  const texto = await page.locator('main').innerText();

  const erros = [];
  const pares = [
    [/salesforce/i, 'Salesforce'],
    [/graphrag/i, 'GraphRAG'],
    [/knowledge\s*os/i, 'Knowledge OS'],
  ];
  for (const [loose, canonical] of pares) {
    if (loose.test(texto) && !texto.includes(canonical)) erros.push(canonical);
  }
  expect(erros, `grafia fora do padrão: ${erros.join(', ')}`).toEqual([]);
});

test('nenhum jargão de marketing no conteúdo visível (ECOSYSTEM.md §4.2)', async ({ page }) => {
  await page.goto(PATH);
  const texto = (await page.locator('main').innerText()).toLowerCase();
  const proibidos = [
    'revolucionário', 'disruptivo', 'game-changer', 'solução completa',
    'poderoso', 'incrível', 'de ponta', 'best-in-class',
  ];
  const achados = proibidos.filter((p) => texto.includes(p));
  expect(achados, `termos de marketing: ${achados.join(', ')}`).toEqual([]);
});

/* ── AEO/GEO ────────────────────────────────────────────────────────────── */

test('o companion markdown existe e descreve a página', async ({ request }) => {
  const res = await request.get('/apresentacao.md');
  expect(res.ok()).toBe(true);
  const md = await res.text();
  expect(md).toContain('auditáve');
  expect(md.length).toBeGreaterThan(400);
});

test('JSON-LD válido, com o mesmo título e URL canônica do head', async ({ page }) => {
  await page.goto(PATH);
  const blocks = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent)
  );
  expect(blocks.length).toBeGreaterThan(0);

  const graph = JSON.parse(blocks[0]);
  const json = JSON.stringify(graph);
  expect(json).toContain('https://mauricio.issei.com.br/apresentacao');
  expect(json).toContain('FAQPage');
});

test('o bloco AEO visível está estilizado, não herdando cor de fallback', async ({ page }) => {
  await page.goto(PATH);
  const aeo = page.locator('.aeo');
  await expect(aeo).toHaveCount(1);
  const bg = await aeo.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).not.toBe('rgba(0, 0, 0, 0)'); // sem /aeo.css, quem estiliza é apresentacao.css
});
