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
  // Aguarda o CSS assentar antes de auditar. No dev server (Vite) o CSS é
  // injetado via JS; há uma janela de FOUC em que o texto ainda usa a cor padrão
  // (#000) sobre o fundo escuro, gerando falso-positivo de contraste intermitente
  // (sobretudo no webkit sob carga). Esperamos as fontes e a cor de texto temática
  // serem aplicadas, com timeout tolerante para não travar a auditoria.
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await page
    .waitForFunction(() => getComputedStyle(document.body).color !== 'rgb(0, 0, 0)', undefined, {
      timeout: 4000,
    })
    .catch(() => {});
  // Mesma janela de FOUC para o /aeo.css (stylesheet separado): no webkit sob carga
  // o <link> pode ainda não ter aplicado quando auditamos, fazendo o texto do bloco
  // .aeo herdar cores da página (falso-positivo de contraste). Espera o bloco AEO
  // ganhar seu fundo temático antes de prosseguir.
  await page
    .waitForFunction(() => {
      const el = document.querySelector('.aeo-tldr');
      if (!el) return true; // página sem bloco AEO
      const bg = getComputedStyle(el).backgroundColor;
      return bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent';
    }, undefined, { timeout: 4000 })
    .catch(() => {});

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
