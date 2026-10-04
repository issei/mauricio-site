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
    // Contenção (D-5): até 2 vídeos de referência conceitual (§10) + 1 vídeo-resumo do próprio case.
    expect(count).toBeLessThanOrEqual(3);
    // O vídeo-resumo do case está presente.
    await expect(page.locator('#resumo-video .ca-video iframe')).toHaveCount(1);

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

  test('estatística no código: 5 técnicas, trechos da branch enxuta com link permanente e medições', async ({ page }) => {
    await page.goto(PATH);
    const section = page.locator('#tecnicas-estatisticas');
    await expect(section).toBeVisible();

    // 5 técnicas + o comparativo enxuta × main
    await expect(section.locator('h3')).toHaveCount(6);
    for (const id of ['tecnica-classificacao', 'tecnica-calibracao', 'tecnica-recuperacao', 'tecnica-decisao', 'tecnica-metricas']) {
      await expect(section.locator(`h3#${id}`)).toBeVisible();
    }

    // Os trechos são do código real: cada técnica tem o seu símbolo
    const codigo = await section.locator('.ca-code pre').allTextContents();
    const todo = codigo.join('\n');
    for (const simbolo of ['TfidfVectorizer', 'LogisticRegression', 'CalibratedClassifierCV', 'cosine_similarity', 'Guard Rail 3', 'compute_precision_at_k']) {
      expect(todo, `trecho com ${simbolo}`).toContain(simbolo);
    }

    // Links permanentes: sempre o commit completo da branch enxuta, nunca "main" ou "HEAD"
    const links = await section.locator('a[href*="github.com/issei/case-agents/blob/"]').evaluateAll(
      (as) => as.map((a) => a.getAttribute('href'))
    );
    const permanentes = links.filter((h) => /\/blob\/e2dcd7f3bdbe7d7408ff80a837bd8a247b431131\/candidate_starter\/[\w.]+#L\d+-L\d+$/.test(h));
    expect(permanentes.length).toBeGreaterThanOrEqual(10);

    // Medições da branch enxuta — e a explicação de por que o número impresso engana
    await expect(section).toContainText('26,3%');
    await expect(section).toContainText('top-2 20/20');
    await expect(section).toContainText('20 de 20');
  });

  test('menu e numeração: link para a nova seção e eyebrows em ordem crescente, sem repetição', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('nav.ca-nav__trail a[href="#tecnicas-estatisticas"]')).toHaveCount(1);

    const numeros = await page.locator('main .ca-section > .ca-wrap > .ca-eyebrow').evaluateAll(
      (els) => els.map((e) => Number((e.textContent.match(/^(\d+)\s·/) || [])[1])).filter((n) => !Number.isNaN(n))
    );
    expect(numeros.length).toBeGreaterThanOrEqual(14);
    expect(numeros).toEqual([...numeros].sort((a, b) => a - b));
    expect(new Set(numeros).size).toBe(numeros.length);
  });

  test('card da branch enxuta descreve o que o código de fato contém', async ({ page }) => {
    await page.goto(PATH);
    const card = page.locator('.ca-branch-card--enxuta');
    await expect(card).toContainText('Platt Scaling (cv=3)');
    await expect(card).toContainText('15 testes unitários');
    await expect(card).not.toContainText('não calibrada');
    await expect(card).not.toContainText('Inexistente');
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
