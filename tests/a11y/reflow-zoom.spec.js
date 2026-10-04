// Fase 5 — reflow a 320px, zoom, regiões roláveis, modal do currículo e lista de fases do life3d.
// A catraca (scripts/a11y-sweep.mjs) já trava `reflow:320`, `meta-viewport`, `aria-prohibited-attr` e
// `motion:reduce` nas 42 páginas; aqui se confere o COMPORTAMENTO que a catraca não enxerga.
import { test, expect } from '@playwright/test';

test('life e life3d não bloqueiam o zoom (WCAG 1.4.4)', async ({ page }) => {
  for (const p of ['life', 'life3d']) {
    await page.goto(`/${p}.html`);
    const content = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(content, p).not.toMatch(/user-scalable\s*=\s*(no|0)/i);
    expect(content, p).not.toMatch(/maximum-scale/i);
  }
});

test('life3d: fases são uma lista; só a atual leva aria-current', async ({ page }) => {
  await page.goto('/life3d.html');
  const items = page.locator('#progress-dots ol > li.dot');
  await expect.poll(() => items.count(), { timeout: 15_000 }).toBeGreaterThan(5); // os pontos são montados por script
  await expect(items.first()).toContainText(/Fase 1 de \d+/);
  await expect(page.locator('#progress-dots [aria-label]')).toHaveCount(0); // nada de aria-label em <div>
  expect(await page.locator('#progress-dots [aria-current="step"]').count()).toBeLessThanOrEqual(1);
});

test('a 320px o bloco de código que rola vira região focável e rola por teclado', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/salesforce-agentic-dev.html');
  await page.waitForFunction(() => document.querySelector('pre[data-a11y-scroll]'));
  const pre = page.locator('pre[data-a11y-scroll]').first();
  await expect(pre).toHaveAttribute('role', 'region');
  await expect(pre).toHaveAttribute('aria-label', /rolável/i);
  await pre.focus();
  const before = await pre.evaluate((e) => e.scrollLeft);
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(150);
  expect(await pre.evaluate((e) => e.scrollLeft)).toBeGreaterThan(before);
});

test('a 1280px blocos que cabem não ganham parada de Tab à toa', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/salesforce-agentic-dev.html');
  await page.waitForTimeout(600);
  const total = await page.locator('pre').count();
  const marcados = await page.locator('pre[data-a11y-scroll]').count();
  expect(marcados).toBeLessThan(total);
});

test('curriculo: modal do projeto fecha por teclado, prende o foco e devolve ao gatilho', async ({ page }) => {
  await page.goto('/curriculo.html');
  await page.waitForFunction(() => typeof window.openModal === 'function');
  const gatilho = page.locator('#projects-container .project-card').first().getByRole('button', { name: 'Saiba Mais' });
  await gatilho.focus();
  await page.keyboard.press('Enter');
  const modal = page.locator('#project-modal');
  await expect(modal).toBeVisible();

  const fechar = modal.getByRole('button', { name: 'Fechar detalhe do projeto' });
  expect(await fechar.evaluate((e) => e.tagName)).toBe('BUTTON');

  // fundo inerte: nenhum Tab alcança a página atrás
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    const fora = await page.evaluate(() => {
      const a = document.activeElement;
      return a !== document.body && !a.closest('#project-modal');
    });
    expect(fora, `Tab #${i} saiu do modal`).toBe(false);
  }

  await fechar.focus();
  await page.keyboard.press('Enter');
  await expect(modal).toBeHidden();
  await expect(gatilho).toBeFocused();
  expect(await page.evaluate(() => document.querySelectorAll('[inert]').length)).toBe(0);
});

test('movimento reduzido: nenhuma animação infinita nas propostas e no currículo', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  for (const p of ['proposta', 'service-operations-2-0', 'sustentacao', 'curriculo']) {
    const page = await ctx.newPage();
    await page.goto(`/${p}.html`);
    await page.waitForTimeout(1200);
    const rodando = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.getComputedTiming().duration > 1).length);
    expect(rodando, p).toBe(0);
    await page.close();
  }
  await ctx.close();
});
