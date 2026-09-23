import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Home "Mapa de Linhas" — SDD do portfólio v1.1 + delta v1.2 (docs/specs/pages/portfolio/).
// Os critérios de aceite §12 da SDD viram asserções contra public/cv.json: a página
// não pode ter menos (nem outros) fatos que a fonte.

const PATH = '/';
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));

test.describe('Home — Mapa de Linhas', () => {
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

  test('§12.1–12.2: 5 experiências em ordem cronológica inversa e 19 cards STAR', async ({ page }) => {
    await page.goto(PATH);
    const orgs = await page.locator('.pf-exp .pf-exp-org').allTextContents();
    expect(orgs).toEqual(['Rede', 'Serasa Experian', 'Indra', 'Telefônica', 'Sysgen']);
    await expect(page.locator('details.pf-star')).toHaveCount(cv.Projetos.length);
    // Abrir um card revela S/T/A/R completos
    const card = page.locator('details.pf-star').first();
    await card.locator('summary').click();
    await expect(card.locator('.pf-step')).toHaveCount(4);
    await expect(card.locator('.pf-step[data-step="S"]')).toContainText(cv.Projetos[0].Situacao);
  });

  test('§12.3–12.4: 26 certificações, links idênticos ao cv.json, diploma verificável', async ({ page }) => {
    await page.goto(PATH);
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
    await page.goto(PATH);
    const quotes = page.locator('#recommendations blockquote');
    await expect(quotes).toHaveCount(cv.Recomendacoes_Recebidas.length);
    for (const [i, r] of cv.Recomendacoes_Recebidas.entries()) {
      expect((await quotes.nth(i).textContent()).trim()).toBe(r.Recomendacao);
    }
  });

  test('§12.6: JSON-LD com Person (knowsAbout 1:1), ProfilePage e ItemList das certificações', async ({ page }) => {
    await page.goto(PATH);
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
    const html = await (await request.get(PATH)).text();
    const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
    expect(scripts).not.toMatch(/fetch\(|XMLHttpRequest|cv\.json|star\.json/);
    expect(html).not.toContain('cv-renderer');
  });

  test('mapa: toda estação é link para um alvo existente; legenda cobre as 7 linhas', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.pf-legend .pf-key')).toHaveCount(Object.keys(cv.Habilidades).length);
    await expect(page.locator('.pf-grid .pf-hub')).toHaveCount(cv.Experiencia.length);
    const hrefs = await page.locator('.pf-grid a').evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute('href')))]);
    for (const h of hrefs) await expect(page.locator(h), h).toHaveCount(1);
  });

  test('mobile 375px: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(PATH);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    // Blocos com overflow:hidden (ex.: o hero) escondem o transbordo do scrollWidth:
    // mede o conteúdo de verdade.
    const wide = await page.evaluate(() => [...document.querySelectorAll('.pf-wrap > *')]
      .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1).map((e) => e.className || e.tagName));
    expect(wide).toEqual([]);
  });

  test('a11y: sem violações sérias (axe)', async ({ page }) => {
    await page.goto(PATH);
    await page.locator('details.pf-star').first().locator('summary').click();
    await expectNoSeriousA11yViolations(page);
  });
});
