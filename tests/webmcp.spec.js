// @ts-check
/**
 * WebMCP em todas as páginas (docs/specs/AGENT_READINESS_POR_PAGINA.md, D3).
 *
 * O scanner de agent readiness carrega a página e conta as tools registradas
 * em navigator.modelContext. Aqui um modelContext falso registra os nomes que
 * recebe: amostra PT, EN, uma página nova e o lifeos (fora do Vite).
 */
import { test, expect } from '@playwright/test';

const PAGINAS = [
  '/index.html',
  '/curiosidade-e-investigacao.html',
  '/catalogo.html',
  '/en/devin.html',
  '/lifeos.html',
];

for (const url of PAGINAS) {
  test(`WebMCP registra as tools em ${url}`, async ({ page }) => {
    await page.addInitScript(() => {
      // @ts-ignore — navigator.modelContext ainda não está nos tipos do DOM
      window.__tools = [];
      Object.defineProperty(navigator, 'modelContext', {
        configurable: true,
        // @ts-ignore
        value: { registerTool: (tool) => window.__tools.push(tool.name) },
      });
    });
    await page.goto(url);
    // @ts-ignore
    await page.waitForFunction(() => window.__tools.length >= 2);
    // @ts-ignore
    const nomes = await page.evaluate(() => window.__tools);
    // Uma vez cada: registrar a mesma tool duas vezes lança erro no navegador real.
    expect(nomes.sort()).toEqual(['get_cv_data', 'get_star_projects']);
  });
}
