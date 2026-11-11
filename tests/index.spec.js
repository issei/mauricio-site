import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Home editorial (F3) — SDD-F1-F1b, Parte 6. O currículo completo (competências,
// STAR, certificações, recomendações) vive em /curriculo desde a F2: os critérios §12 da
// SDD do portfólio continuam valendo lá, contra public/cv.json.

const PATH = '/';
const CV_PATH = '/curriculo.html';
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));
const eco = YAML.parse(readFileSync(new URL('../specs/ecosystem.nav.yaml', import.meta.url), 'utf8'));
const temas = YAML.parse(readFileSync(new URL('../content/temas.yml', import.meta.url), 'utf8'));
const resultados = cv.Projetos.flatMap((p) => p.Resultados);

test.describe('Home editorial (F3)', () => {
  test('carrega, título/SEO e um único h1', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Maurício Yokoyama Issei/);
    expect((await page.title()).length).toBeLessThanOrEqual(60);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(cv.Nome);
    expect(await page.getAttribute('html', 'lang')).toBe('pt-BR');
    expect(await page.getAttribute('meta[property="og:type"]', 'content')).toBe('profile');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc.length).toBeGreaterThan(50);
    expect(desc.length).toBeLessThanOrEqual(160);
  });

  test('RF-F3-02: hero com título, resumo e as três portas', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.pf-hero')).toContainText(cv.Titulo);
    await expect(page.locator('.pf-hero')).toContainText(cv.ResumoHero);
    const portas = await page.locator('.pf-cta a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(portas).toEqual(['./curriculo.html', './catalogo.html', '/videos.html', '#contact']);
    await expect(page.locator('#contact')).toContainText(cv.Contato.Email);
  });

  test('RF-F3-01: seções na ordem, sem o currículo completo', async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.locator('main > section').evaluateAll((ss) => ss.map((s) => s.id));
    expect(ids).toEqual(['about', 'temas', 'provas', 'destaques']);
    await expect(page.locator('details.pf-star')).toHaveCount(0);
    await expect(page.locator('#recommendations')).toHaveCount(0);
  });

  test('RF-F8-06: os 10 temas no lugar dos pilares, com link para o catálogo', async ({ page, request }) => {
    await page.goto(PATH);
    const links = page.locator('.pf-temas a');
    await expect(links).toHaveCount(Object.keys(temas).length);
    const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(new Set(hrefs)).toEqual(new Set(Object.keys(temas).map((t) => `./catalogo.html#tema-${t}`)));
    await expect(page.locator('.pf-pilar')).toHaveCount(0);
    for (const pl of eco.pillars) await expect(page.locator('main')).not.toContainText(pl.label);
    const catalogo = await (await request.get('/catalogo.html')).text();
    for (const h of hrefs) expect(catalogo, h).toContain(`id="${h.split('#')[1]}"`);
    const destaques = await page.locator('.pf-destaque a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    for (const h of destaques) expect((await request.get(h.replace('./', '/'))).status(), h).toBe(200);
  });

  test('RF-F8-02: botões da home com os nomes das áreas', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.pf-cta a')).toHaveText(['Ver carreira', 'Explorar os conteúdos', /Vídeos/, 'Contato']);
  });

  test('RF-F3-05 / CA-F3-02: provas literais do cv.json, com alvo no currículo', async ({ page }) => {
    await page.goto(PATH);
    const itens = page.locator('.pf-provas li');
    const n = await itens.count();
    expect(n).toBeGreaterThanOrEqual(3);
    expect(n).toBeLessThanOrEqual(5);
    const textos = await page.locator('.pf-prova-text').allTextContents();
    for (const t of textos) expect(resultados, t).toContain(t.trim());
    const alvos = await page.locator('.pf-provas a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    await page.goto(CV_PATH);
    for (const a of alvos) {
      expect(a.startsWith('./curriculo.html#')).toBe(true);
      await expect(page.locator(a.slice(a.indexOf('#'))), a).toHaveCount(1);
    }
  });

  test('RF-F3-06: destaques com formato e natureza, ao menos uma Experiência', async ({ page }) => {
    await page.goto(PATH);
    const n = await page.locator('.pf-destaque').count();
    expect(n).toBeGreaterThanOrEqual(3);
    expect(n).toBeLessThanOrEqual(4);
    const tags = await page.locator('.pf-destaque .pf-nat').allTextContents();
    expect(tags).toContain('Experiência');
  });

  test('RF-F3-09: leitura de no máximo 3 min (200 ppm)', async ({ page }) => {
    await page.goto(PATH);
    const palavras = await page.locator('main').evaluate((m) => m.innerText.split(/\s+/).filter(Boolean).length);
    expect(palavras).toBeLessThanOrEqual(600);
  });

  test('RF-F3-08: JSON-LD com Person (knowsAbout 1:1), ProfilePage e ItemList das certificações', async ({ page }) => {
    await page.goto(PATH);
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent())['@graph'];
    const person = graph.find((n) => n['@type'] === 'Person');
    expect(person.knowsAbout).toEqual(Object.values(cv.Habilidades).flat());
    expect(person.knowsLanguage).toBeUndefined();
    expect(graph.some((n) => [].concat(n['@type']).includes('ProfilePage'))).toBe(true);
    const list = graph.find((n) => n['@type'] === 'ItemList');
    expect(list.itemListElement).toHaveLength(cv.Certificados.length);
  });

  test('HTML servido não busca o currículo em runtime', async ({ request }) => {
    const html = await (await request.get(PATH)).text();
    const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
    expect(scripts).not.toMatch(/fetch\(|XMLHttpRequest|cv\.json|star\.json/);
    expect(html).not.toContain('cv-renderer');
  });

  test('âncoras da barra de seções existem', async ({ page }) => {
    await page.goto(PATH);
    const hrefs = await page.locator('.pf-nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    for (const h of hrefs) await expect(page.locator(h), h).toHaveCount(1);
  });

  test('mobile 375px: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    const wide = await page.evaluate(() => [...document.querySelectorAll('.pf-wrap > *')]
      .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1).map((e) => e.className || e.tagName));
    expect(wide).toEqual([]);
  });

  test('a11y: sem violações sérias (axe)', async ({ page }) => {
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });
});

// Os critérios §12 da SDD do portfólio, agora contra /curriculo (F2/F3).
test.describe('Carreira — critérios §12 do portfólio', () => {
  test('§12.1–12.2: 5 experiências em ordem cronológica inversa e 19 cards STAR', async ({ page }) => {
    await page.goto(CV_PATH);
    const orgs = await page.locator('.pf-exp .pf-exp-org').allTextContents();
    expect(orgs).toEqual(['Rede', 'Serasa Experian', 'Indra', 'Telefônica', 'Sysgen']);
    await expect(page.locator('details.pf-star')).toHaveCount(cv.Projetos.length);
    // Abrir um card revela S/T/A/R completos
    const card = page.locator('details.pf-star').first();
    await card.locator('summary').click();
    await expect(card.locator('.pf-step')).toHaveCount(4);
    await expect(card.locator('.pf-step[data-step="S"]')).toContainText(cv.Projetos[0].Situacao);
  });

  test('§12.3–12.4: 27 certificações, links idênticos ao cv.json, diploma verificável', async ({ page }) => {
    await page.goto(CV_PATH);
    await expect(page.locator('.pf-certs .pf-ticket')).toHaveCount(cv.Certificados.length);
    const hrefs = await page.locator('.pf-certs .pf-ticket-link').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.sort()).toEqual(cv.Certificados.filter((c) => c.Verificacao).map((c) => c.Verificacao).sort());
    // Os sem link não ganham botão quebrado
    for (const c of cv.Certificados.filter((c) => !c.Verificacao)) {
      const t = page.locator('.pf-certs .pf-ticket', { hasText: c.Nome });
      await expect(t.locator('a')).toHaveCount(0);
    }
    const pos = cv.Formacao_Academica.find((f) => f.Verificacao);
    await expect(page.locator(`#education a[href="${pos.Verificacao}"]`)).toHaveCount(1);
    await expect(page.locator('.pf-featured .pf-ticket')).toHaveCount(4);
  });

  test('§12.5: 6 recomendações com texto integral', async ({ page }) => {
    await page.goto(CV_PATH);
    const quotes = page.locator('#recommendations blockquote');
    await expect(quotes).toHaveCount(cv.Recomendacoes_Recebidas.length);
    for (const [i, r] of cv.Recomendacoes_Recebidas.entries()) {
      expect((await quotes.nth(i).textContent()).trim()).toBe(r.Recomendacao);
    }
  });

  test('§12.6: JSON-LD com Person (knowsAbout 1:1), ProfilePage e ItemList das certificações', async ({ page }) => {
    await page.goto(CV_PATH);
    const graph = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent())['@graph'];
    const person = graph.find((n) => n['@type'] === 'Person');
    expect(person.knowsAbout).toEqual(Object.values(cv.Habilidades).flat());
    expect(person.knowsLanguage).toBeUndefined(); // pendência 12.4: não inventar idiomas
    expect(graph.some((n) => [].concat(n['@type']).includes('ProfilePage'))).toBe(true);
    const list = graph.find((n) => n['@type'] === 'ItemList');
    expect(list.itemListElement).toHaveLength(cv.Certificados.length);
    expect(list.itemListElement.filter((i) => i.item.url)).toHaveLength(cv.Certificados.filter((c) => c.Verificacao).length);
  });

  test('§12.12: HTML servido não busca o currículo em runtime', async ({ request }) => {
    const html = await (await request.get(CV_PATH)).text();
    const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
    expect(scripts).not.toMatch(/fetch\(|XMLHttpRequest|cv\.json|star\.json/);
    expect(html).not.toContain('cv-renderer');
  });

  test('Parte 7: sem Mapa de Linhas; competências por grupo, como no cv.json', async ({ page }) => {
    await page.goto(CV_PATH);
    await expect(page.locator('#mapa, .pf-metro, .pf-grid, [data-l]')).toHaveCount(0);
    const grupos = await page.locator('.pf-line-card h4').allTextContents();
    expect(grupos.map((g) => g.trim())).toEqual(Object.keys(cv.Habilidades));
  });

  test('mobile 375px: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(CV_PATH);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    // Blocos com overflow:hidden (ex.: o hero) escondem o transbordo do scrollWidth:
    // mede o conteúdo de verdade.
    const wide = await page.evaluate(() => [...document.querySelectorAll('.pf-wrap > *')]
      .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1).map((e) => e.className || e.tagName));
    expect(wide).toEqual([]);
  });

});
