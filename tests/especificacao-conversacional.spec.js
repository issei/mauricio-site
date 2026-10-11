import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da landing "Especificação Conversacional Estruturada".
 * Spec: docs/specs/pages/Vibe-Spec-ing/00_wireframe_conteudo_landing.md (§9).
 *
 * Protege o que a página promete: um H1 só, as seções do mapa, o kit baixável,
 * os selos de procedência (a postura "proposta, não método validado") e o
 * layout de 375 px sem rolagem horizontal da página.
 */

const PATH = '/especificacao-conversacional.html';
const KIT = '/downloads/kit-especificacao-conversacional.md';

const SECOES = [
  'hero', 'problema', 'causa', 'definicao', 'etapas', 'protocolo',
  'autoridade', 'divergencia', 'tdd', 'limites', 'comece', 'referencias',
];

test.describe('Especificação Conversacional — página', () => {
  test('carrega, título/SEO e hero visíveis', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    const title = await page.title();
    expect(title).toMatch(/Especificação Conversacional Estruturada/);
    expect(title.length).toBeLessThanOrEqual(60);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#hero-titulo')).toContainText('Especificação Conversacional Estruturada');
  });

  test('SEO: canonical, og:image e gêmeo Markdown da própria página', async ({ page, request }) => {
    await page.goto(PATH);
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toBe('https://mauricio.issei.com.br/especificacao-conversacional');
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-especificacao-conversacional.png');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);

    const md = await request.get('/especificacao-conversacional.md');
    expect(md.status()).toBe(200);
  });

  test('todas as seções do mapa existem, cada uma com o próprio título', async ({ page }) => {
    await page.goto(PATH);
    for (const id of SECOES) {
      await expect(page.locator(`section#${id}`), `seção #${id}`).toHaveCount(1);
    }
    for (const id of SECOES.filter((s) => s !== 'hero')) {
      await expect(page.locator(`#${id}-titulo`), `título de #${id}`).toHaveCount(1);
    }
  });

  test('honestidade epistêmica: selos de procedência e aviso de proposta', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#hero .ecs-selo--proposta')).toBeVisible();
    await expect(page.locator('#hero .ecs-aviso')).toContainText('ainda não foi comparado a uma linha de base');
    // O cenário é sempre marcado como construído, nunca como caso real.
    for (const id of ['causa', 'protocolo', 'divergencia', 'tdd']) {
      await expect(page.locator(`#${id} .ecs-selo--cenario`).first(), `selo de cenário em #${id}`).toBeVisible();
    }
    await expect(page.locator('#limites .ecs-selo--naovalidado').first()).toBeVisible();
  });

  test('a matriz de autoridade nega autoridade ao modelo por padrão', async ({ page }) => {
    await page.goto(PATH);
    const linha = page.locator('#autoridade tr.is-model');
    await expect(linha).toHaveCount(1);
    await expect(linha).toContainText('Nenhuma autoridade substantiva por padrão');
  });

  test('as cinco práticas do protocolo existem como conteúdo', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#protocolo > .ecs-container > ol.ecs-steps > li')).toHaveCount(5);
    await expect(page.locator('#protocolo .ecs-code')).toContainText('nao_conhecido');
  });

  test('o kit é baixável e todos os botões de download apontam para ele', async ({ page, request }) => {
    await page.goto(PATH);
    const links = page.locator('a[data-ecs-cta^="kit-"]');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    for (const href of await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
      expect(href).toBe(KIT);
    }
    const res = await request.get(KIT);
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain('proposta, não método validado');
  });

  test('links internos e âncoras da página apontam para destinos existentes', async ({ page, request }) => {
    await page.goto(PATH);
    const hrefs = await page.locator('main a[href^="#"], header a[href^="#"]')
      .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href')))]);
    for (const href of hrefs) {
      if (href === '#') continue;
      await expect(page.locator(href), `âncora ${href}`).toHaveCount(1);
    }
    const internos = await page.locator('main a[href^="./"]')
      .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href')))]);
    for (const href of internos) {
      const [arquivo] = href.split('#');
      const res = await request.get(`/${arquivo.replace('./', '')}`);
      expect(res.status(), `link interno ${href}`).toBe(200);
    }
  });

  test('375 px: sem rolagem horizontal da página', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('a11y: sem violações serious/critical (axe)', async ({ page }) => {
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });
});
