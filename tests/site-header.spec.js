// Cabeçalho comum (F1b, lote L1) — comportamento no navegador.
// Spec: docs/specs/arquitetura-informacao/SDD-F1-F1b.md (Parte 2, F1b.6).
// As páginas /en/ entram depois que o espelho for retraduzido (i18n:sync roda o gerador).
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PAGINAS = [
  ['/index.html', 'Início', 'page'],
  ['/curriculo.html', 'Trajetória', 'page'],
  ['/catalogo.html', 'Produção', 'page'],
  ['/videos.html', 'Vídeos', 'page'],
  ['/temas/engenharia-agentica.html', 'Vídeos', 'true'],
  ['/privacidade.html', null, null],
  ['/404.html', null, null],
];

for (const [url, atual, valor] of PAGINAS) {
  test(`${url}: um banner, quatro links na ordem e aria-current certo`, async ({ page }) => {
    await page.goto(url);
    await expect(page.getByRole('banner')).toHaveCount(1);
    const nav = page.getByRole('navigation', { name: 'Navegação do site' });
    await expect(nav.getByRole('link')).toHaveText(['Início', 'Trajetória', 'Produção', 'Vídeos']);
    const marcados = nav.locator('a[aria-current]');
    if (atual) {
      await expect(marcados).toHaveCount(1);
      await expect(marcados).toHaveText(atual);
      await expect(marcados).toHaveAttribute('aria-current', valor);
    } else {
      await expect(marcados).toHaveCount(0);
    }
  });
}

/* Lote L2: páginas com trilha própria (G-B). A trilha desce para baixo do cabeçalho (RF-F1b-16). */
const L2 = [
  ['acessibilidade', '.ac-nav'], ['agent-ready', '.ar-nav'], ['aprendizagem-autorregulada', '.aa-topbar'],
  ['aprendizagem-autorregulada-artigo', '.aa-topbar'], ['capacidade-antes-do-acesso', '.ca-nav'], ['case-agents', '.ca-nav'],
  ['curiosidade-e-investigacao', '.ci-topbar'], ['da-execucao-a-orquestracao', '.eo-nav'], ['develop-engineering', '.dg-nav'],
  ['digital-workplace-agentico', '.dw-nav'], ['engenharia-agentes-ia', '.eai-nav'], ['engenharia-confianca', '.ec-nav'],
  ['especificacao-conversacional', '.ecs-nav'], ['formulacao-de-problemas', '.fp-nav'],
];
for (const [pagina, trilha] of L2) {
  test(`${pagina}: um banner, Produção marcada e a trilha abaixo do cabeçalho ao rolar`, async ({ page }) => {
    await page.goto(`/${pagina}.html`);
    await expect(page.getByRole('banner')).toHaveCount(1);
    const nav = page.getByRole('navigation', { name: 'Navegação do site' });
    await expect(nav.locator('a[aria-current="true"]')).toHaveText('Produção');
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    const sh = await page.locator('header.sh').boundingBox();
    expect(sh.y).toBe(0);
    if (page.viewportSize().width < 640) {
      // no celular a trilha rola junto com a página; só o cabeçalho do site fica fixo
      await expect(page.locator(trilha).first()).toHaveCSS('position', 'static');
      return;
    }
    const t = await page.locator(trilha).first().boundingBox();
    expect(t.y).toBeGreaterThanOrEqual(sh.y + sh.height - 1);
  });
}

/* Lote L3: páginas com barra própria de site (G-C). A barra vira trilha abaixo do cabeçalho comum;
   artifice e socialselling usam barra sticky (estática no celular); as demais são fixas e ficam abaixo dele. */
const L3 = [
  ['artifice', true], ['devops-salesforce', false], ['knowledge-os-presentation', false],
  ['proposta-observabilidade-mobile', false], ['salesforce-agentic-dev', false],
  ['salesforce-agentic-quickstart', false], ['socialselling', true], ['service-operations-2-0', false],
];
for (const [pagina, estaticaNoCelular] of L3) {
  test(`${pagina}: um banner, Produção marcada e a barra da página abaixo do cabeçalho`, async ({ page }) => {
    await page.goto(`/${pagina}.html`);
    await expect(page.getByRole('banner')).toHaveCount(1);
    const nav = page.getByRole('navigation', { name: 'Navegação do site' });
    await expect(nav.locator('a[aria-current="true"]')).toHaveText('Produção');
    const barra = page.locator('[aria-label="Navegação da página"]');
    await expect(barra).toHaveCount(1);
    await page.evaluate(() => window.scrollTo(0, 1500));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
    const sh = await page.locator('header.sh').boundingBox();
    expect(sh.y).toBe(0);
    if (estaticaNoCelular && page.viewportSize().width < 640) {
      await expect(barra).toHaveCSS('position', 'static');
      return;
    }
    const b = await barra.boundingBox();
    expect(b.y).toBeGreaterThanOrEqual(sh.y + sh.height - 1);
  });
}

test('devin: a barra "Portfólio" saiu; o cabeçalho comum é o único banner', async ({ page }) => {
  await page.goto('/devin.html');
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.locator('.devin-nav')).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Navegação do site' }).locator('a[aria-current="true"]')).toHaveText('Produção');
});

test('knowledge-os-presentation: a barra não repete o link do Catálogo', async ({ page }) => {
  await page.goto('/knowledge-os-presentation.html');
  await expect(page.locator('[aria-label="Navegação da página"] a[href*="catalogo"]')).toHaveCount(0);
});

test('o skip link vem antes do cabeçalho na ordem de Tab', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Safari não foca links com Tab por padrão');
  await page.goto('/catalogo.html');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('Pular para o conteúdo');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('Maurício Yokoyama Issei');
});

test('fica fixo no topo ao rolar (Q6)', async ({ page }) => {
  await page.goto('/catalogo.html');
  await page.evaluate(() => window.scrollTo(0, 2000));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  const topo = await page.locator('header.sh').evaluate((h) => h.getBoundingClientRect().top);
  expect(topo).toBe(0);
});

test('a barra de seções do currículo fica abaixo do cabeçalho (RF-F1b-16)', async ({ page }) => {
  await page.goto('/curriculo.html');
  const sh = await page.locator('header.sh').boundingBox();
  const secoes = await page.getByRole('navigation', { name: 'Seções do currículo' }).boundingBox();
  expect(secoes.y).toBeGreaterThanOrEqual(sh.y + sh.height - 1);
});

test.describe('celular (Q8)', () => {
  test.use({ viewport: { width: 375, height: 740 } });
  test.skip(({ javaScriptEnabled }) => javaScriptEnabled === false, 'o botão só existe com JavaScript');

  test('botão Menu abre, Esc fecha e devolve o foco', async ({ page }) => {
    await page.goto('/catalogo.html');
    const botao = page.getByRole('button', { name: 'Menu' });
    const lista = page.locator('#sh-lista');
    await expect(botao).toBeVisible();
    await expect(botao).toHaveAttribute('aria-expanded', 'false');
    await expect(lista).toBeHidden();

    await botao.focus();
    await page.keyboard.press('Enter');
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
    await expect(lista).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText('Início');
    await page.keyboard.press('Escape');
    await expect(botao).toHaveAttribute('aria-expanded', 'false');
    await expect(lista).toBeHidden();
    await expect(botao).toBeFocused();

    await page.keyboard.press('Space');
    await expect(botao).toHaveAttribute('aria-expanded', 'true');
  });

  test('sem rolagem horizontal a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    for (const url of ['/catalogo.html', '/index.html', '/privacidade.html']) {
      await page.goto(url);
      const largura = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(largura, url).toBeLessThanOrEqual(320);
    }
  });
});

test('sem JavaScript, o botão some e os quatro links ficam visíveis no celular', async ({ page, javaScriptEnabled }) => {
  test.skip(javaScriptEnabled !== false, 'só no projeto no-js');
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/catalogo.html');
  await expect(page.locator('.sh-botao')).toBeHidden();
  await expect(page.getByRole('navigation', { name: 'Navegação do site' }).getByRole('link')).toHaveCount(4);
  for (const l of await page.locator('#sh-lista a').all()) await expect(l).toBeVisible();
});

test('sem violações serious/critical no cabeçalho, com o menu aberto no celular', async ({ page, javaScriptEnabled }) => {
  test.skip(javaScriptEnabled === false, 'o botão só existe com JavaScript');
  await page.setViewportSize({ width: 375, height: 740 });
  await page.goto('/catalogo.html');
  await page.getByRole('button', { name: 'Menu' }).click();
  await expectNoSeriousA11yViolations(page, 'header.sh');
});

/* Lote L4: páginas especiais (G-D). Barras próprias e experiências imersivas ficam abaixo do cabeçalho, sem sobrepor. */
const L4 = [
  ['know', 'Produção', null], ['sustentacao', 'Produção', '#navbar'], ['proposta-engenharia-reversa', 'Produção', '#navbar'],
  ['operacao-capital-cognitivo', 'Produção', null], ['boutique-empresarial-showcase', 'Produção', null],
  ['apresentacao', 'Produção', '.ap-selector-dock'], ['life', 'Trajetória', '#game-container'],
  ['life3d', 'Trajetória', '#canvas3d'], ['terminal-evolutivo', 'Trajetória', null],
];
for (const [pagina, area, abaixo] of L4) {
  test(`${pagina}: um banner, ${area} marcada e nada por cima do cabeçalho`, async ({ page }) => {
    await page.goto(`/${pagina}.html`);
    await expect(page.getByRole('banner')).toHaveCount(1);
    const nav = page.getByRole('navigation', { name: 'Navegação do site' });
    await expect(nav.getByRole('link')).toHaveText(['Início', 'Trajetória', 'Produção', 'Vídeos']);
    await expect(nav.locator('a[aria-current="true"]')).toHaveText(area);
    const sh = await page.locator('header.sh').boundingBox();
    expect(sh.y).toBe(0);
    if (!abaixo) return;
    const alvo = page.locator(abaixo).first();
    if ((await alvo.evaluate((el) => getComputedStyle(el).position)) === 'static') return;
    const b = await alvo.boundingBox();
    expect(b.y).toBeGreaterThanOrEqual(sh.y + sh.height - 1);
  });
}
