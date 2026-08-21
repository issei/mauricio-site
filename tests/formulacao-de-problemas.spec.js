import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "Formulação de Problemas como Engenharia Interrompida".
 * Spec: docs/specs/pages/formulacao-de-problemas/.
 *
 * O que esta suíte protege, além do smoke: as visualizações são conteúdo, não
 * enfeite — e o conteúdo precisa existir no HTML mesmo sem JavaScript. Por isso
 * os testes olham o texto dos painéis e a tabela de fallback, não só o SVG.
 */

const PATH = '/formulacao-de-problemas.html';

test.describe('Formulação de Problemas — página', () => {
  test('carrega, título/SEO e hero visíveis', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/Formulação de Problemas/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('engenharia interrompida');
    await expect(page.locator('.fp-hero__thesis')).toContainText('regra de parada');
  });

  test('SEO: um único H1, canonical e og:image da própria página', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('formulacao-de-problemas');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-formulacao-de-problemas.png');
  });

  test('honestidade epistêmica: selos e veredito parcial estão na página', async ({ page }) => {
    await page.goto(PATH);
    // A página não pode afirmar mais do que o artigo sustenta.
    await expect(page.locator('#veredito-titulo')).toContainText('sustentação parcial');
    await expect(page.locator('#parada .fp-selo--naovalidado').first()).toBeVisible();
    await expect(page.locator('#veredito .fp-selo--naovalidado').first()).toBeVisible();
    // As cinco negações da hipótese.
    await expect(page.locator('.fp-negacao li')).toHaveCount(5);
  });

  test('as seis dimensões de incerteza existem como conteúdo', async ({ page }) => {
    await page.goto(PATH);
    const ids = ['aleatoria', 'epistemica', 'estrutural', 'semantica', 'fronteira', 'valores'];
    for (const id of ids) {
      await expect(page.locator(`#dim-${id} h3`)).toHaveCount(1);
    }
    await expect(page.locator('[data-solo="incertezas"] [data-solo-chip]')).toHaveCount(6);
  });

  test('seletor de incertezas: clique e setas trocam o painel visível', async ({ page }) => {
    await page.goto(PATH);
    const chips = page.locator('[data-solo="incertezas"] [data-solo-chip]');

    // Com JavaScript, o modo solo mostra um painel por vez.
    await expect(page.locator('#dim-aleatoria')).toBeVisible();
    await expect(page.locator('#dim-valores')).toBeHidden();

    await chips.nth(4).click();
    await expect(page.locator('#dim-fronteira')).toBeVisible();
    await expect(page.locator('#dim-aleatoria')).toBeHidden();
    await expect(chips.nth(4)).toHaveAttribute('aria-current', 'true');

    await chips.nth(4).press('ArrowRight');
    await expect(page.locator('#dim-valores')).toBeVisible();
  });

  test('estados do conhecimento: seis estados e o portão de qualidade', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('[data-solo="estados"] [data-solo-chip]')).toHaveCount(6);
    await expect(page.locator('.fp-gate')).toContainText('fora do escopo');
    for (const s of ['s0', 's1', 's2', 's3', 's4', 's5']) {
      await expect(page.locator(`#estado-${s} h3`)).toHaveCount(1);
    }
  });

  test('regra de parada: mover λ antecipa o ponto de parada', async ({ page }) => {
    await page.goto(PATH);
    const leitura = page.locator('[data-parada-out-t]');
    await expect(leitura).toHaveText('4,0 rodadas');

    const lambda = page.locator('#fp-in-lambda');
    await expect(lambda).toBeEnabled();
    await lambda.fill('1.5');
    await lambda.dispatchEvent('input');

    // Mais penalidade de hiper-resolução ⇒ parar antes.
    const depois = await leitura.textContent();
    const valor = Number(depois.replace(' rodadas', '').replace(',', '.'));
    expect(valor).toBeLessThan(4);

    // A linha vertical do SVG acompanha o novo t*.
    const x = await page.getAttribute('[data-parada-stop]', 'x1');
    expect(Number(x)).toBeLessThan(474);
  });

  test('fallback: a tabela de números da curva existe no HTML', async ({ page }) => {
    await page.goto(PATH);
    const linhas = page.locator('#parada table.fp-tabela tbody tr');
    await expect(linhas).toHaveCount(9);
    await expect(page.locator('#parada .fp-tabela__stop')).toHaveCount(1);
  });

  test('bloco AEO: síntese e perguntas frequentes', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.aeo-tldr__title')).toBeVisible();
    await expect(page.locator('.aeo-faq__item')).toHaveCount(6);
  });

  test('fórmulas: equação oculta ao leitor de tela, com leitura em prosa', async ({ page }) => {
    await page.goto(PATH);
    const formulas = page.locator('.fp-formula');
    const total = await formulas.count();
    expect(total).toBeGreaterThan(0);

    for (let i = 0; i < total; i++) {
      const bloco = formulas.nth(i);
      // A linha da equação é decorativa para quem ouve: soletrar subscritos não
      // comunica nada. Quem carrega o significado é a leitura em prosa.
      await expect(bloco.locator('.fp-formula__eq')).toHaveAttribute('aria-hidden', 'true');
      await expect(bloco.locator('.fp-vh')).toContainText('Leitura da fórmula:');
    }
  });

  test('glossário: todo termo linkado tem destino na página', async ({ page }) => {
    await page.goto(PATH);
    const quebrados = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#g-"]')]
        .map((a) => a.getAttribute('href').slice(1))
        .filter((id) => !document.getElementById(id))
    );
    expect(quebrados).toEqual([]);

    // O jargão que o artigo usa sem definir no corpo precisa estar no glossário.
    for (const id of ['g-belief-plausibility', 'g-conjuntos-credais', 'g-model-averaging', 'g-kendall']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('pipeline: seção de vídeo posicionada após os estados, com embed acessível', async ({ page }) => {
    await page.goto(PATH);

    const secao = page.locator('#pipeline');
    await expect(secao.locator('h2')).toHaveText(/Pipeline da Decisão Computacional/);

    // Os três pontos que a seção promete conectar ao artigo.
    await expect(secao).toContainText('Armadilha do Solucionismo');
    await expect(secao).toContainText('PFQi');
    await expect(secao).toContainText('supervisão humana');
    // …e as amarras que impedem a seção de contradizer o resto da página.
    await expect(secao.locator('a[href="#g-solutioneering"]')).toHaveCount(1);
    await expect(secao.locator('a[href="#metricas"]')).toHaveCount(1);

    // Ordem no documento: vem depois da Figura 3 (estados) e antes da regra de parada.
    const ordem = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('main section[id]')].map((s) => s.id);
      return { estados: ids.indexOf('estados'), pipeline: ids.indexOf('pipeline'), parada: ids.indexOf('parada') };
    });
    expect(ordem.estados).toBeLessThan(ordem.pipeline);
    expect(ordem.pipeline).toBeLessThan(ordem.parada);

    const iframe = secao.locator('.fp-video__frame iframe');
    await expect(iframe).toHaveAttribute('title', 'Vídeo: O Pipeline da Decisão');
    await expect(iframe).toHaveAttribute('loading', 'lazy');
    await expect(iframe).toHaveAttribute('src', /lhEdMm7qvAU/);

    // Proporção 16:9 preservada — a moldura reserva a altura antes do lazy-load.
    const caixa = await secao.locator('.fp-video__frame').boundingBox();
    expect(caixa.height / caixa.width).toBeCloseTo(9 / 16, 2);
  });

  test('pipeline: a proporção 16:9 sobrevive ao mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    const caixa = await page.locator('#pipeline .fp-video__frame').boundingBox();
    expect(caixa.height / caixa.width).toBeCloseTo(9 / 16, 2);
  });

  test('a11y: axe sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });

  test('mobile 375px: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('movimento reduzido: nada fica invisível esperando animação', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    const invisiveis = await page.evaluate(() =>
      [...document.querySelectorAll('.fp-reveal')].filter(
        (el) => Number(getComputedStyle(el).opacity) < 0.99
      ).length
    );
    expect(invisiveis).toBe(0);
  });
});
