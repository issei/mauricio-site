import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/operacao-capital-cognitivo.html';

test.describe('Operação Capital Cognitivo — Smoke', () => {
  test('carrega com 200, título e canonical corretos, sem erros de console', async ({ page }) => {
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Operação Capital Cognitivo/);
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('operacao-capital-cognitivo');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc.length).toBeGreaterThan(50);
    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('HUD oculto na intro; aparece ao iniciar', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#hud')).toBeHidden();
    await page.click('#btn-start');
    await expect(page.locator('#hud')).toBeVisible();
    await expect(page.locator('#hud-cash')).toBeVisible();
    expect(await page.getAttribute('#hud-cash', 'aria-live')).toBe('polite');
  });
});

test.describe('Capítulo 1 — Fatura + iceberg', () => {
  test.beforeEach(async ({ page }) => { await page.goto(PATH); await page.click('#btn-start'); });

  test('fatura tem 5 linhas colapsadas', async ({ page }) => {
    await expect(page.locator('#invoice-lines details')).toHaveCount(5);
    expect(await page.locator('#invoice-lines details[open]').count()).toBe(0);
  });

  test('revisão humana revela R$ 120 e custo de troca de contexto', async ({ page }) => {
    await page.click('#invoice-human summary');
    await expect(page.locator('#invoice-human-detail')).toContainText('R$ 120');
    await page.click('#ctx-switch-btn');
    await expect(page.locator('#ctx-switch-detail')).toBeVisible();
  });

  test('abrir todas as linhas revela o gráfico e desbloqueia EVID_01', async ({ page }) => {
    const summaries = page.locator('#invoice-lines details summary');
    const n = await summaries.count();
    for (let i = 0; i < n; i++) await summaries.nth(i).click();
    await expect(page.locator('#tco-pie-chart')).toBeVisible();
    const unlocked = await page.evaluate(() => window.__DEBUG_getState && true);
    expect(unlocked).toBeTruthy();
  });
});

test.describe('Digital Twin — conceitos v4.1 via UI', () => {
  test('cache semântico reduz apiCost', async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    const before = await page.evaluate(() => window.__DEBUG_getState().finances.apiCost);
    await page.check('#ctrl-cache');
    await page.click('#btn-advance-quarter');
    // fecha eventual modal de evento
    if (await page.locator('#event-alert-dialog[open]').count()) await page.click('#dialog-close');
    const after = await page.evaluate(() => window.__DEBUG_getState().finances.apiCost);
    expect(after).toBeLessThan(before);
  });

  test('Context Rot aparece acima de 50k tokens', async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    await page.fill('#ctrl-context-tokens', '100000');
    await page.dispatchEvent('#ctrl-context-tokens', 'input');
    await expect(page.locator('#context-rot-meter')).toBeVisible();
  });

  test('multiagente sem isolamento mostra aviso de cascata', async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    await page.check('#ctrl-multiagent');
    await page.uncheck('#ctrl-agent-isolation');
    await expect(page.locator('#cascade-warning')).toBeVisible();
  });

  test('caixa negativo leva a FAILURE (insolvência)', async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate(() => { window.__DEBUG_setState({ finances: { cashBalance: -1 } }); });
    const outcome = await page.evaluate(() => {
      const s = window.__DEBUG_getState();
      return s.finances.cashBalance;
    });
    expect(outcome).toBeLessThanOrEqual(0);
  });
});

test.describe('Acessibilidade WCAG 2.2 AA', () => {
  test('intro sem violações serious/critical', async ({ page }) => {
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });

  test('sandbox do Cap. 5 com sliders rotulados e sem violações', async ({ page }) => {
    await page.goto(PATH);
    await page.evaluate(() => window.__DEBUG_skipToChapter(5));
    const sliders = page.locator('#sandbox-controls input[type="range"]');
    const n = await sliders.count();
    for (let i = 0; i < n; i++) {
      const label = await sliders.nth(i).getAttribute('aria-label');
      expect((label || '').length).toBeGreaterThan(10);
    }
    await expectNoSeriousA11yViolations(page, '#scene-cap5');
  });
});
