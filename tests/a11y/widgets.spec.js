// Fase 6 — T4/T5/T6: widgets interativos só com teclado (docs/specs/a11y-first/testing-strategy.md §3).
// O que o axe não vê: ordem de Tab dentro do widget, setas/Home/End, nome do grupo, estado e anúncio.
import { test, expect } from '@playwright/test';

const SEM_CONSENTIMENTO = { v: '2.0', ts: 'x', categories: { necessary: true }, method: 'explicit' };

async function abre(page, url) {
  await page.addInitScript((c) => localStorage.setItem('consent_v', JSON.stringify(c)), SEM_CONSENTIMENTO);
  await page.goto(url);
}

/* ── Tabs (APG): todo tablist do site ───────────────────────────────────────── */

const TABLISTS = [
  ['engenharia-agentes-ia', 2],
  ['engenharia-confianca', 1],
  ['artifice', 1],
  ['devin', 2],
  ['apresentacao', 1],
];

for (const [pagina, esperado] of TABLISTS) {
  test(`${pagina}: tablists seguem o padrão Tabs (tabindex móvel, setas, Home/End, aria-controls)`, async ({ page }) => {
    test.setTimeout(90_000); // devin (GSAP + Lenis) leva ~30s no WebKit sob carga
    await abre(page, `/${pagina}.html`);
    const lists = page.locator('[role="tablist"]');
    await expect(lists).toHaveCount(esperado);

    for (let i = 0; i < esperado; i++) {
      const list = lists.nth(i);
      const tabs = list.locator('[role="tab"]');
      const n = await tabs.count();
      expect(n, `tablist #${i}`).toBeGreaterThan(1);

      // nome do tablist
      expect(await list.evaluate((l) => l.getAttribute('aria-label') || l.getAttribute('aria-labelledby')), `tablist #${i} sem nome`).toBeTruthy();
      // tabindex móvel: exatamente UMA aba na ordem de Tab
      const tabbables = await tabs.evaluateAll((ts) => ts.filter((t) => t.tabIndex === 0).length);
      expect(tabbables, `tablist #${i}: abas tabuláveis`).toBe(1);
      // cada aba controla um painel que existe
      const painéis = await tabs.evaluateAll((ts) => ts.map((t) => {
        const el = t.getAttribute('aria-controls') && document.getElementById(t.getAttribute('aria-controls'));
        return !!el && el.getAttribute('role') === 'tabpanel';
      }));
      expect(painéis.every(Boolean), `tablist #${i}: aria-controls → role=tabpanel`).toBe(true);

      if (!(await tabs.first().isVisible())) continue;
      await tabs.first().scrollIntoViewIfNeeded();
      await tabs.first().focus();
      await page.keyboard.press('ArrowRight');
      await expect(tabs.nth(1)).toBeFocused();
      await page.keyboard.press('End');
      await expect(tabs.nth(n - 1)).toBeFocused();
      await page.keyboard.press('Home');
      await expect(tabs.first()).toBeFocused();
      await page.keyboard.press('ArrowLeft'); // volta ao fim (circular)
      await expect(tabs.nth(n - 1)).toBeFocused();
      // a aba focada é a selecionada (ativação automática) e o painel é nomeado por ela
      await expect(tabs.nth(n - 1)).toHaveAttribute('aria-selected', 'true');
    }
  });
}

/* ── Quiz (T4): pergunta nomeia o grupo, escolha tem estado, resposta é anunciada ─ */

test('EAI quiz: opções são um grupo com o enunciado como nome; a escolhida leva aria-pressed', async ({ page }) => {
  await abre(page, '/engenharia-agentes-ia.html');
  const q = page.locator('[data-quiz-q]').first();
  const grupo = q.getByRole('group');
  await expect(grupo).toHaveAccessibleName(/Qual arquitetura é correta/);
  const opcoes = q.locator('.eai-quiz__opts button');
  await expect(opcoes.first()).toHaveAttribute('aria-pressed', 'false');

  await opcoes.first().focus();
  await page.keyboard.press('Enter');
  await expect(opcoes.first()).toHaveAttribute('aria-pressed', 'true');
  await expect(opcoes.nth(1)).toHaveAttribute('aria-pressed', 'false');
  await expect(q.locator('[data-quiz-fb]')).not.toBeEmpty(); // região viva com a explicação
  await expect(q.locator('[data-quiz-fb]')).toHaveAttribute('aria-live', 'polite');

  // pode corrigir a resposta só com teclado; o placar sobe e o foco não se perde
  await opcoes.nth(1).focus();
  await page.keyboard.press('Space');
  await expect(page.locator('[data-quiz-score]')).toHaveText('1');
  await expect(opcoes.nth(1)).toBeFocused();
});

/* ── Calibrador (T5): o veredito é anunciado ───────────────────────────────── */

test('EAI calibrador: o veredito é uma região de status e muda ao mexer no controle', async ({ page }) => {
  await abre(page, '/engenharia-agentes-ia.html');
  const veredito = page.locator('[data-cal-result]');
  await expect(veredito).toHaveAttribute('role', 'status');
  const antes = await veredito.textContent();
  const cost = page.locator('#cal-cost');
  await cost.focus();
  await page.keyboard.press('End'); // custo do erro 100: muda a faixa do veredito
  await expect(veredito).not.toHaveText(antes ?? '');
});

/* ── Diálogos do simulador OCC: nome acessível, Esc, foco de volta ───────────── */

test('OCC: ajuda e glossário são diálogos nomeados e devolvem o foco ao fechar', async ({ page }) => {
  await abre(page, '/operacao-capital-cognitivo.html');
  const glossario = page.getByRole('button', { name: /glossário antes de começar/i });
  await expect(glossario).toBeVisible();
  await glossario.focus();
  await page.keyboard.press('Enter');
  const dlg = page.locator('#glossary-dialog');
  await expect(dlg).toBeVisible();
  await expect(dlg).toHaveAccessibleName(/Glossário/);
  expect(await page.evaluate(() => !!document.activeElement.closest('#glossary-dialog'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dlg).toBeHidden();
  await expect(glossario).toBeFocused();
});

/* ── eco-nav (T6): não obscurece o foco (WCAG 2.4.11) ────────────────────────── */

test('eco-nav sai da frente de um link focado embaixo dele e volta quando recebe o foco', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await abre(page, '/devin.html');
  await page.waitForTimeout(800);
  const link = page.locator('.devin-footer__link').first();
  await link.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(500);
  await link.focus();
  const eco = page.locator('eco-nav');
  const cobre = await page.evaluate(() => {
    const l = document.querySelector('.devin-footer__link').getBoundingClientRect();
    const e = document.querySelector('eco-nav').getBoundingClientRect();
    return l.left < e.right && l.right > e.left && l.top < e.bottom && l.bottom > e.top;
  });
  test.skip(!cobre, 'neste viewport o botão não fica sobre o link — nada a verificar');
  await expect(eco).toHaveAttribute('data-away', '');
  await page.keyboard.press('Tab'); // próxima parada = o próprio eco-nav
  await expect(eco).not.toHaveAttribute('data-away', '');
});
