import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// A home é a "O pensamento em prática" (SDD-nova-home). O currículo completo vive em /curriculo:
// os critérios §12 da SDD do portfólio continuam valendo lá, contra public/cv.json.

const PATH = '/';
const CV_PATH = '/curriculo.html';
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));
const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/;

// Home nova "O pensamento em prática" (SDD-nova-home §13 e §14.8).
const SECOES = ['Minha história', 'Minhas ideias', 'Meus projetos'];
const DESCRICAO = 'Maurício Yokoyama Issei: engenharia de software, arquitetura em produção e agentes de IA. Trajetória, ideias e projetos.';

test.describe('Home nova (SDD-nova-home §14.8)', () => {
  test('carrega, SEO e um único h1 com o nome do cv.json', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Maurício Yokoyama Issei/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(cv.Nome);
    expect(await page.getAttribute('html', 'lang')).toBe('pt-BR');
    expect(await page.getAttribute('meta[property="og:type"]', 'content')).toBe('profile');
    expect(await page.getAttribute('meta[name="description"]', 'content')).toBe(DESCRICAO);
  });

  for (const [w, h] of [[1280, 800], [390, 844]]) {
    test(`primeira dobra em ${w}×${h}: nome, mensagem, subtítulo e os três caminhos`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(PATH);
      for (const sel of ['#hm-nome', '.hm-mensagem', '.hm-sub']) await expect(page.locator(sel)).toBeInViewport();
      await expect(page.locator('.hm-caminhos a')).toHaveText(SECOES);
      for (const a of await page.locator('.hm-caminhos a').all()) await expect(a).toBeInViewport();
    });
  }

  test('quatro sessões, cada uma com o seu título', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('section.hm-s')).toHaveCount(4);
    await expect(page.locator('main h2')).toHaveText(SECOES);
  });

  test('os links da home funcionam: âncoras existem e as páginas respondem 200', async ({ page, request }) => {
    await page.goto(PATH);
    const hrefs = [...new Set(await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href'))))];
    expect(hrefs.length).toBeGreaterThanOrEqual(20);
    for (const h of hrefs.filter((x) => x.startsWith('#'))) await expect(page.locator(h), h).toHaveCount(1);
    for (const h of hrefs.filter((x) => x.startsWith('/'))) {
      const [rota, frag] = h.split('#');
      const res = await request.get(rota);
      expect(res.status(), h).toBe(200);
      if (frag) expect(await res.text(), h).toContain(`id="${frag}"`);
    }
  });

  test('o primeiro Tab cai em "Pular para o conteúdo", que leva ao main', async ({ page }) => {
    await page.goto(PATH);
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText('Pular para o conteúdo');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement.closest('main#conteudo'))).toBe(true);
  });

  test('a11y: sem violações sérias (axe)', async ({ page }) => {
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });
});

// Os critérios §12 da SDD do portfólio, agora contra /curriculo (F2/F3).
test.describe('Carreira — critérios §12 do portfólio', () => {
  test('§12.1–12.2: 4 experiências em ordem cronológica inversa e 19 cards STAR', async ({ page }) => {
    await page.goto(CV_PATH);
    const orgs = await page.locator('.pf-exp .pf-exp-org').allTextContents();
    expect(orgs).toEqual(['Rede', 'Serasa Experian', 'Indra', 'Sysgen']);
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
    const profile = graph.find((n) => [].concat(n['@type']).includes('ProfilePage'));
    expect(profile).toBeTruthy();
    // Search Console: dateCreated/dateModified da ProfilePage precisam ser DateTime com fuso.
    for (const k of ['dateCreated', 'dateModified']) expect(profile[k]).toMatch(ISO_DATETIME);
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
