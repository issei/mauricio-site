// Helper de acessibilidade (doc 08). Roda axe-core na página e falha em
// violações de severidade 'serious' ou 'critical'.
import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

/**
 * Executa a auditoria axe e afirma que não há violações serious/critical.
 * @param {import('@playwright/test').Page} page
 * @param {string} [context] - seletor opcional para limitar o escopo da análise
 */
export async function expectNoSeriousA11yViolations(page, context) {
  let builder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .exclude('iframe'); // iframes de origem cruzada não são auditáveis por nós
  if (context) builder = builder.include(context);

  const results = await builder.analyze();
  const blocking = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );

  if (blocking.length) {
    const summary = blocking
      .map((v) => `- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nó(s))`)
      .join('\n');
    // Mensagem legível no relatório do gate.
    expect(blocking, `Violações de acessibilidade serious/critical:\n${summary}`).toHaveLength(0);
  }
}
