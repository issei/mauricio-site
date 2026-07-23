/**
 * Comportamento em tela pequena (spec §2.B.4, evolução 10) — projeto `mobile`.
 *
 * "A retícula visual e a tabela comparativa do seletor não são reduzidas
 * proporcionalmente — elas se reestruturam em cartões empilhados, um por
 * dimensão, com a visão ativa sempre no topo."
 *
 * Antes destes testes, os projetos mobile do repositório estavam comentados.
 */
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/apresentacao.html';

test.beforeEach(async ({ page }) => {
  await page.goto(PATH);
});

test('evolução 10 · as dimensões viram cartões empilhados', async ({ page }) => {
  const dims = page.locator('.ap-dimension');
  await expect(dims).toHaveCount(3);

  const boxes = await dims.evaluateAll((els) =>
    els.map((el) => el.getBoundingClientRect()).map((r) => ({ x: r.x, y: r.y, w: r.width }))
  );

  // Empilhados: mesma coluna, y crescente — não três colunas espremidas.
  const xs = new Set(boxes.map((b) => Math.round(b.x)));
  expect(xs.size, 'os cartões deveriam compartilhar a mesma coluna').toBe(1);
  expect(boxes[1].y).toBeGreaterThan(boxes[0].y);
  expect(boxes[2].y).toBeGreaterThan(boxes[1].y);
});

test('evolução 10 · a dimensão da visão ativa fica no topo da pilha', async ({ page }) => {
  const active = page.locator('.ap-dimension[data-active="true"]');
  await expect(active).toHaveCount(1);

  const [activeY, allY] = await Promise.all([
    active.evaluate((el) => el.getBoundingClientRect().y),
    page.locator('.ap-dimension').evaluateAll(
      (els) => els.map((el) => el.getBoundingClientRect().y)
    ),
  ]);
  expect(activeY).toBe(Math.min(...allY));
});

test('nenhuma rolagem horizontal a 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow, 'a página rola horizontalmente').toBeLessThanOrEqual(0);
});

test('nenhum elemento individual estoura a largura da tela', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  const wide = await page.evaluate(() => {
    const limit = document.documentElement.clientWidth + 1;
    return [...document.querySelectorAll('main *')]
      .filter((el) => el.getBoundingClientRect().right > limit)
      .map((el) => el.tagName.toLowerCase() + '.' + (el.className || '').toString().slice(0, 40))
      .slice(0, 8);
  });
  expect(wide, `elementos além da viewport: ${wide.join(', ')}`).toEqual([]);
});

test('os alvos de toque têm ao menos 44px', async ({ page }) => {
  const small = await page.evaluate(() =>
    [...document.querySelectorAll('button, a[href]')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return false;   // oculto
        if (r.height >= 44) return false;

        // Exceção da WCAG (2.5.5 / 2.5.8): links embutidos numa frase seguem a
        // altura da linha do texto e estão isentos do tamanho mínimo de alvo.
        // Aumentá-los quebraria o ritmo do parágrafo sem ganho de acessibilidade.
        const inline = getComputedStyle(el).display === 'inline';
        const inProse = !!el.closest('p, li, dd');
        return !(inline && inProse);
      })
      .map((el) => `${el.tagName.toLowerCase()}: ${el.textContent.trim().slice(0, 30)}`)
      .slice(0, 8)
  );
  expect(small, `alvos menores que 44px: ${small.join(' | ')}`).toEqual([]);
});

test('o seletor continua alcançável durante a rolagem', async ({ page }) => {
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'instant' }));
  await expect(page.locator('[data-ap-selector]')).toBeInViewport();
});

test('as três abas do Hub continuam visíveis, sem virar dropdown', async ({ page }) => {
  const tabs = page.locator('[role="tab"]');
  await expect(tabs).toHaveCount(3);
  for (let i = 0; i < 3; i++) await expect(tabs.nth(i)).toBeVisible();
  expect(await page.locator('select').count()).toBe(0);
});

test('axe sem violações serious/critical no mobile', async ({ page }) => {
  await expectNoSeriousA11yViolations(page);
});
