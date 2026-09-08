import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "Agent Ready".
 *
 * O que ela protege além do smoke: a página ensina Agent Readiness usando este
 * próprio domínio como evidência. Se as afirmações verificáveis saírem do
 * documento — o placar datado, os rótulos que separam código real de exemplo
 * genérico, a seção de limites do score — sobra uma página que celebra um
 * número, que é exatamente o gênero de texto que ela existe para contradizer.
 */

const PATH = '/agent-ready.html';

test.describe('Agent Ready — página', () => {
  test('carrega, título/SEO e hero visíveis', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/Agent Ready/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Agent-Ready');
    await expect(page.locator('.ar-hero__thesis')).toContainText('terceiro consumidor');
  });

  test('SEO: um único H1, canonical e og:image da própria página', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toBe('https://mauricio.issei.com.br/agent-ready');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-agent-ready.png');

    // O gêmeo Markdown é o próprio assunto da §6.2: se a página deixar de
    // anunciá-lo, ela contradiz o que ensina.
    const md = await page.getAttribute('link[rel="alternate"][type="text/markdown"]', 'href');
    expect(md).toBe('https://mauricio.issei.com.br/agent-ready.md');
  });

  test('o placar é estático e datado — não uma consulta em tempo de carregamento', async ({ page }) => {
    await page.goto(PATH);
    const placar = page.locator('.ar-score');
    await expect(placar).toBeVisible();
    await expect(placar).toContainText('16');
    await expect(placar).toContainText('6');
    // A data do scan é parte do componente: número sem data não é verificável.
    await expect(page.locator('.ar-score__foot')).toContainText('2026');
  });

  test('todo bloco de código declara se é real ou genérico', async ({ page }) => {
    await page.goto(PATH);
    const blocos = page.locator('.ar-code');
    const total = await blocos.count();
    expect(total).toBeGreaterThan(5);

    for (let i = 0; i < total; i++) {
      const rotulos = blocos.nth(i).locator('.ar-tag--real, .ar-tag--generic');
      expect(await rotulos.count(), `bloco de código ${i} sem rótulo de procedência`).toBe(1);
    }
  });

  test('a seção de limites nomeia o que o score não prova', async ({ page }) => {
    await page.goto(PATH);
    const limites = page.locator('#limites');
    await expect(limites).toContainText('não prova');
    await expect(limites.locator('#metadado-runtime')).toBeVisible();
    await expect(limites.locator('#neutral-nao-e-pass')).toBeVisible();
    await expect(limites).toContainText('não certifica a presença');
  });

  test('as cinco camadas têm diagrama acessível e tabela de operação', async ({ page }) => {
    await page.goto(PATH);
    const svg = page.locator('#camadas figure svg');
    await expect(svg).toHaveAttribute('role', 'img');
    // Texto real, não path: um agente que lê o DOM precisa enxergar as camadas.
    await expect(svg.locator('title')).toHaveText(/cinco camadas/i);
    await expect(svg).toContainText('WELL-KNOWN');
  });

  test('o vídeo entra com enquadramento, título e carregamento adiado', async ({ page }) => {
    await page.goto(PATH);
    const iframe = page.locator('#video iframe');
    await expect(iframe).toHaveAttribute('loading', 'lazy');
    await expect(iframe).toHaveAttribute('title', /.{20,}/);
    const src = await iframe.getAttribute('src');
    expect(src).toContain('youtube-nocookie.com');
  });

  test('as oito etapas do tutorial estão presentes e abrem', async ({ page }) => {
    await page.goto(PATH);
    const etapas = page.locator('#tutorial details.ar-step');
    await expect(etapas).toHaveCount(8);

    const ultima = etapas.last();
    await ultima.locator('summary').click();
    await expect(ultima.locator('.ar-step__body')).toBeVisible();
  });

  test('a11y: skip link, âncoras resolvem e axe sem violações serious/critical', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('a.ar-skip')).toHaveAttribute('href', '#conteudo');

    // Toda âncora interna precisa de destino: é o mesmo contrato de descoberta
    // que a página ensina, aplicado a ela mesma.
    const quebradas = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && h !== '#' && !document.getElementById(h.slice(1)))
    );
    expect(quebradas).toEqual([]);

    await expectNoSeriousA11yViolations(page);
  });

  test('degradado mobile: sem rolagem horizontal a 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(PATH);
    const estoura = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(estoura).toBe(false);
  });
});
