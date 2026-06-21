import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Suíte da página "A Engenharia da Confiança" (jornada de 4 módulos).
// Spec: docs/specs/pages/engenharia-confianca/. Os diagramas Mermaid vêm de CDN
// e podem não carregar offline — por isso os testes verificam os equivalentes
// textuais (sempre no DOM) e a estrutura, não o SVG renderizado.

const PATH = '/engenharia-confianca.html';

test.describe('Engenharia da Confiança — jornada', () => {
  test('caminho feliz: carrega, título/SEO e hero visíveis', async ({ page }) => {
    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Engenharia da Confiança/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('Confiança');
    await expect(page.locator('.ec-hero__thesis')).toContainText('capacidade vem do modelo');
  });

  test('SEO: exatamente um H1 e canonical correta', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('engenharia-confianca');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);
  });

  test('hero: quatro cartões de entrada por dor levando aos módulos', async ({ page }) => {
    await page.goto(PATH);
    const cards = page.locator('.ec-pain .ec-paincard');
    await expect(cards).toHaveCount(4);
    for (const href of ['#modulo-0', '#modulo-1', '#modulo-2', '#modulo-3']) {
      await expect(page.locator(`.ec-paincard[href="${href}"]`)).toBeVisible();
    }
  });

  test('estrutura: quatro módulos + fecho de maturidade com âncoras estáveis', async ({ page }) => {
    await page.goto(PATH);
    for (const id of ['#modulo-0', '#modulo-1', '#modulo-2', '#modulo-3', '#maturidade']) {
      await expect(page.locator(id)).toHaveCount(1);
    }
    await expect(page.locator('#m0-titulo')).toContainText('Crash Silencioso');
    await expect(page.locator('#m2-titulo')).toContainText('confiança vem da engenharia');
  });

  test('nav da trilha aponta para as seções e marca aria-current ao rolar', async ({ page }) => {
    await page.goto(PATH);
    const targets = ['#modulo-0', '#modulo-1', '#modulo-2', '#modulo-3', '#maturidade'];
    for (const href of targets) {
      await expect(page.locator(`.ec-nav__trail a[href="${href}"]`)).toBeVisible();
    }
    await page.locator('.ec-nav__trail a[href="#modulo-2"]').click();
    // Asserta o título da seção em viewport (robusto à altura do módulo, que cresce com o conteúdo)
    await expect(page.locator('#m2-titulo')).toBeInViewport();
    await expect(page.locator('.ec-nav__trail a[aria-current="true"]')).toHaveCount(1);
  });

  test('diagramas: cinco figuras Mermaid, cada uma com equivalente textual', async ({ page }) => {
    await page.goto(PATH);
    const figs = page.locator('[data-ec-mermaid]');
    await expect(figs).toHaveCount(5);
    // o equivalente textual está sempre presente (fallback acessível)
    await expect(page.locator('[data-ec-mermaid] .ec-mermaid__alt')).toHaveCount(5);
    // o diagrama-chave (pipeline determinístico) está presente
    await expect(page.locator('#modulo-2')).toContainText('Pipeline determinístico');
    await expect(page.locator('#modulo-2 .ec-mermaid__alt p').first()).toContainText('resíduo interpretativo');
  });

  test('glossário: termos-âncora + termos de engenharia na seção final', async ({ page }) => {
    await page.goto(PATH);
    const gloss = page.locator('#glossario');
    await expect(gloss).toBeVisible();
    await expect(gloss.locator('dt')).toHaveCount(21);
    await expect(page.locator('#g-crash-silencioso')).toContainText('Crash Silencioso');
    await expect(page.locator('#g-mcp')).toContainText('Model Context Protocol');
    // verbetes adicionados na refatoração ISM v1.0
    await expect(page.locator('#g-ism')).toContainText('Intentional Systems Model');
    await expect(page.locator('#g-limiar-98')).toContainText('98%');
    await expect(page.locator('#g-a2ui')).toContainText('Agent-to-User Interface');
  });

  test('refatoração ISM: M0 formaliza o modelo; M2 traz o Limiar de 98%; M3 traz A2UI', async ({ page }) => {
    await page.goto(PATH);
    // ISM v1.0 ancorado na introdução do M0
    await expect(page.locator('#modulo-0')).toContainText('Intentional Systems Model (ISM) v1.0');
    // Limiar de 98% no M2 com fallback estruturado
    await expect(page.locator('#modulo-2')).toContainText('Limiar de 98% de Certeza');
    await expect(page.locator('#modulo-2')).toContainText('fallback estruturado');
    // A2UI no M3 (renderização determinística)
    await expect(page.locator('#modulo-3')).toContainText('A2UI');
    await expect(page.locator('#modulo-3')).toContainText('emitir intenção de interface');
  });

  test('encadeamento de artefatos M1 → M2 → M3 está explícito', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#modulo-1')).toContainText('Encadeamento de artefatos');
    await expect(page.locator('#modulo-2')).toContainText('assinatura das ferramentas');
    await expect(page.locator('#modulo-3')).toContainText('costura a jornada');
  });

  test('glossário: termo inline destaca o verbete correspondente (desktop)', async ({ page }) => {
    await page.goto(PATH);
    const term = page.locator('.ec-term[data-term="crash-silencioso"]').first();
    await expect(term).toBeVisible();
    await term.click();
    await expect(page.locator('#g-crash-silencioso')).toHaveClass(/is-flash/);
  });

  test('régua de maturidade: clicar num estágio revela o próximo passo concreto', async ({ page }) => {
    await page.goto(PATH);
    const ruler = page.locator('[data-ec-ruler]');
    await expect(ruler.locator('[role="tab"]')).toHaveCount(5);
    await expect(ruler.locator('[data-ec-ruler-panel]')).toContainText('Selecione um estágio');

    await ruler.locator('[role="tab"][data-stage="3"]').click();
    await expect(ruler.locator('[role="tab"][data-stage="3"]')).toHaveAttribute('aria-selected', 'true');
    const panel = ruler.locator('[data-ec-ruler-panel]');
    await expect(panel).toContainText('Mapeado');
    await expect(panel).toContainText('Próximo passo');
  });

  test('prática M0: classificar cenário dá feedback correto/errado', async ({ page }) => {
    await page.goto(PATH);
    const first = page.locator('[data-ec-classify] .ec-scenario').first(); // resposta = silencioso
    await first.locator('button[data-pick="visivel"]').click();
    await expect(first).toHaveAttribute('data-state', 'wrong');
    await first.locator('button[data-pick="silencioso"]').click();
    await expect(first).toHaveAttribute('data-state', 'correct');
    await expect(first.locator('.ec-scenario__fb')).toContainText('Crash Silencioso');
  });

  test('prática M2: "e se eu não fizer" abre e mostra o risco', async ({ page }) => {
    await page.goto(PATH);
    const item = page.locator('#modulo-2 .ec-ifnot__item').first();
    await expect(item).not.toHaveAttribute('open', /.*/);
    await item.locator('summary').click();
    await expect(item.locator('.ec-ifnot__risk')).toBeVisible();
    await expect(item.locator('.ec-ifnot__risk')).toContainText('Risco');
  });

  test('CTAs "Explore o pilar completo" apontam para as três páginas-fonte', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#modulo-1 .ec-pillar-cta a[href="./proposta-engenharia-reversa.html"]')).toBeVisible();
    await expect(page.locator('#modulo-2 .ec-pillar-cta a[href="./engenharia-agentes-ia.html"]')).toBeVisible();
    await expect(page.locator('#modulo-3 .ec-pillar-cta a[href="./devin.html"]')).toBeVisible();
  });

  test('dogfooding presente e footer com navegação para os pilares', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('.ec-dogfood')).toContainText('pratica o que ensina');
    await expect(page.locator('footer.ec-footer')).toBeVisible();
    await expect(page.locator('.ec-footer__nav a[href="./catalogo.html"]')).toBeVisible();
  });

  test('a página está listada no catálogo do site', async ({ page }) => {
    const res = await page.goto('/catalogo.html');
    expect(res?.status()).toBe(200);
    await expect(page.locator('a[href="./engenharia-confianca.html"]')).toBeVisible();
  });

  test('editorial: layout em coluna única (sem sidebar) e numerais-fantasma nos módulos', async ({ page }) => {
    await page.goto(PATH);
    // a antiga sidebar/índice lateral não existe mais
    await expect(page.locator('.ec-rail')).toHaveCount(0);
    await expect(page.locator('.ec-toc')).toHaveCount(0);
    await expect(page.locator('.ec-gloss-fab')).toHaveCount(0);
    // cada módulo carrega seu numeral-fantasma
    await expect(page.locator('#modulo-0')).toHaveAttribute('data-num', '01');
    await expect(page.locator('#modulo-3')).toHaveAttribute('data-num', '04');
  });

  test('callouts de conceito isolam Limiar de 98% (M2) e A2UI (M3)', async ({ page }) => {
    await page.goto(PATH);
    const c98 = page.locator('#modulo-2 .ec-callout--concept');
    await expect(c98).toBeVisible();
    await expect(c98).toContainText('Limiar de 98% de Certeza');
    const a2ui = page.locator('#modulo-3 .ec-callout--concept');
    await expect(a2ui).toContainText('Agent-to-User Interface');
  });

  test('container de diagrama (M2→M3) com fluxo Inventário → Schemas → MCP', async ({ page }) => {
    await page.goto(PATH);
    const dc = page.locator('.diagram-container');
    await expect(dc).toBeVisible();
    await expect(dc.locator('.diagram-container__node')).toHaveCount(3);
    await expect(dc).toContainText('Inventário de Comportamentos');
    await expect(dc).toContainText('Tools via MCP');
  });

  test('glossário no fim: termo inline rola até o verbete em viewport mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    // reduced-motion torna o scrollIntoView instantâneo: elimina a corrida com o
    // smooth-scroll (página longa) que tornava o clique instável no webkit sob carga.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    // sem drawer/FAB; o glossário é uma seção no fim acessível pelos termos inline
    await expect(page.locator('.ec-gloss-fab')).toHaveCount(0);
    const term = page.locator('.ec-term[data-term="mcp"]').first();
    await term.scrollIntoViewIfNeeded();
    await term.click();
    await expect(page.locator('#g-mcp')).toHaveClass(/is-flash/);
  });

  test('degradado: legível em viewport mobile sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    await expect(page.locator('#hero-titulo')).toBeVisible();
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('open-world / a11y: skip link, h1 único e axe sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expect(page.locator('a.ec-skip')).toHaveAttribute('href', '#conteudo');
    await expect(page.locator('h1')).toHaveCount(1);
    await expectNoSeriousA11yViolations(page);
  });
});
