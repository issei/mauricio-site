import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte de testes da página "Case Agents".
 *
 * Conforme docs/specs/pages/case-agents/00_SDD_case_agents.md §12.4:
 * Valida o carregamento (200 OK), SEO, H1, link para o repositório,
 * seções narrativas, embed nocookie de vídeos, integridade de âncoras internas,
 * comportamento responsivo a 360px e varredura axe-core sem violações críticas.
 */

const PATH = '/case-agents.html';

test.describe('Case Agents — página', () => {
  test('carrega com sucesso (200 OK), título SEO e meta description válidos', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/Case Agents: a tool errada não é uma aproximação aceitável/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('h1')).toContainText('A tool errada não é uma aproximação aceitável');
  });

  test('SEO: único H1, canonical e link para o repositório oficial no GitHub', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toBe('https://mauricio.issei.com.br/case-agents');

    const repoLink = page.locator('a[href="https://github.com/issei/case-agents"]').first();
    await expect(repoLink).toBeVisible();

    const reportLink = page.locator('a[href*="candidate_report.json"]').first();
    await expect(reportLink).toBeVisible();
  });

  test('seção do Crash Silencioso e comparador antes/depois visíveis', async ({ page }) => {
    await page.goto(PATH);
    const section = page.locator('#crash-silencioso');
    await expect(section).toBeVisible();
    await expect(section).toContainText('Qual e o email cadastrado na minha conta?');
    // Comparador-assinatura: ranking antes (erro) e depois (guarda de direção)
    await expect(section.locator('.ca-compare-card--failed .ca-ranking')).toBeVisible();
    await expect(section.locator('.ca-compare-card--passed .ca-ranking')).toBeVisible();
    await expect(section).toContainText('EXECUÇÃO INCORRETA');
  });

  test('diagrama de fluxo da Barreira de 4 camadas presente e acessível', async ({ page }) => {
    await page.goto(PATH);
    const barrier = page.locator('#barreira .ca-barrier-flow');
    await expect(barrier).toBeVisible();
    await expect(barrier.locator('.ca-barrier-step')).toHaveCount(4);
    await expect(barrier).toContainText('HUMAN_FALLBACK_LOW_CONFIDENCE');
    await expect(barrier).toContainText('AMBIGUOUS_CONFIRMATION');
  });

  test('embeds de vídeo utilizam youtube-nocookie com lazy loading e title descritivo', async ({ page }) => {
    await page.goto(PATH);
    const iframes = page.locator('.ca-video iframe');
    const count = await iframes.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(2); // Regra de contenção (máximo 2 embeds - D-5)

    for (let i = 0; i < count; i++) {
      const iframe = iframes.nth(i);
      await expect(iframe).toHaveAttribute('loading', 'lazy');
      await expect(iframe).toHaveAttribute('title', /.{15,}/);
      const src = await iframe.getAttribute('src');
      expect(src).toContain('youtube-nocookie.com/embed/');
    }
  });

  test('acessibilidade e integridade: skip link, âncoras internas e axe-core', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('a.ca-skip')).toHaveAttribute('href', '#conteudo');

    // Valida que todas as âncoras na navegação resolvem para IDs válidos na página
    const quebradas = await page.evaluate(() =>
      [...document.querySelectorAll('a[href^="#"]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => h && h !== '#' && !document.getElementById(h.slice(1)))
    );
    expect(quebradas).toEqual([]);

    await expectNoSeriousA11yViolations(page);
  });

  test('responsividade mobile: sem transbordo horizontal em 360px', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(PATH);
    const estoura = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    expect(estoura).toBe(false);
  });
});
