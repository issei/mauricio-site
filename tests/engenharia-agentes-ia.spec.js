import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

// Suíte da página Engenharia de Agentes de IA.
// Evolui por Work Unit (ver BUILD_PLAN §3): cada WU adiciona seus 3 eixos
// (caminho feliz / degradado / open-world+a11y). Aqui está a base do WU-0 (fundação).

const PATH = '/engenharia-agentes-ia.html';

test.describe('EAI — WU-0 fundação (shell + hero placeholder)', () => {
  test('caminho feliz: carrega, título/SEO e hero visíveis', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(PATH);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Engenharia de Agentes de IA/);

    // Landmark e hero
    await expect(page.locator('main#conteudo')).toBeVisible();
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('pouca IA');

    // Flag de construção presente (WU-0) — será removida ao "abrir as cortinas"
    await expect(page.locator('[data-eai-status="construindo"]')).toBeVisible();

    // Sem erros de console na carga
    expect(consoleErrors, consoleErrors.join('\n')).toHaveLength(0);
  });

  test('open-world / a11y: skip link, h1 único e axe sem violações serious/critical', async ({ page }) => {
    await page.goto(PATH);

    // Exatamente um H1
    await expect(page.locator('h1')).toHaveCount(1);

    // Skip link existe e aponta para o conteúdo
    await expect(page.locator('a.eai-skip-link')).toHaveAttribute('href', '#conteudo');

    await expectNoSeriousA11yViolations(page);
  });

  test('degradado: legível em viewport mobile sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    await expect(page.locator('#hero-titulo')).toBeVisible();

    // Não deve haver overflow horizontal (mede o documento contra a viewport)
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return el.scrollWidth - el.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
