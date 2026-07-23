/**
 * Contraste realçado (WCAG AAA, 7:1) — exigência da Camada 3 da página v3.0
 * (spec §1.2 e evolução 11).
 *
 * Helper SEPARADO de `axe.js` de propósito: aquele usa tags wcag2aa (4.5:1) e
 * é dependência de 8 suítes legadas. Modificá-lo mudaria o critério de todas
 * as páginas do site de uma vez. Aqui a regra `color-contrast-enhanced` é
 * aplicada apenas ao escopo pedido.
 */
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 * @param {string} selector escopo — normalmente '[data-layer="3"]'
 */
export async function expectEnhancedContrast(page, selector) {
  // Mesma janela de FOUC tratada em axe.js: no dev server o CSS entra por JS.
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page
    .waitForFunction(
      () => getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)',
      undefined,
      { timeout: 4000 }
    )
    .catch(() => {});

  const results = await new AxeBuilder({ page })
    .include(selector)
    .withRules(['color-contrast-enhanced'])
    .analyze();

  const summary = results.violations
    .flatMap((v) => v.nodes.map((n) => `- ${n.target.join(' ')} :: ${n.failureSummary}`))
    .join('\n');

  expect(
    results.violations,
    `Contraste abaixo de 7:1 em ${selector} (evolução 11):\n${summary}`
  ).toHaveLength(0);
}
