import { test, expect } from '@playwright/test';

test.describe('Develop Engineering - Deterministic Grounding Page', () => {
  test('smoke & basic layout test', async ({ page }) => {
    await page.goto('/develop-engineering.html');

    // Title check
    await expect(page).toHaveTitle(/Deterministic Grounding/);

    // Single H1 check
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s.first()).toContainText('Deterministic Grounding para Engenharia Agentic de Software');

    // Skip link
    const skipLink = page.locator('a.dg-skip');
    await expect(skipLink).toHaveCount(1);

    // Main element
    const main = page.locator('main#conteudo');
    await expect(main).toHaveCount(1);
  });

  test('interactive state cards in Scene 01', async ({ page }) => {
    await page.goto('/develop-engineering.html');

    const stateCards = page.locator('#dg-state-cards-container .dg-state-card');
    await expect(stateCards).toHaveCount(5);

    // Click Desired State card
    const desiredCard = stateCards.filter({ hasText: 'Desired State' });
    await desiredCard.click();
    await expect(desiredCard).toHaveClass(/is-active/);

    const panelTitle = page.locator('#dg-state-panel-title');
    await expect(panelTitle).toContainText('Desired State');
  });

  test('interactive capsule lacre toggle in Scene 02', async ({ page }) => {
    await page.goto('/develop-engineering.html');

    const badge = page.locator('#dg-capsule-status-badge');
    await expect(badge).toContainText('SEALED');

    const btnToggle = page.locator('#dg-btn-toggle-capsule');
    await btnToggle.click();

    await expect(badge).toContainText('UNKNOWN');

    await btnToggle.click();
    await expect(badge).toContainText('SEALED');
  });

  test('oracle verdict filters in Scene 06', async ({ page }) => {
    await page.goto('/develop-engineering.html');

    const oracleRows = page.locator('#dg-oracle-table tbody tr');
    await expect(oracleRows).toHaveCount(10);

    // Click PASS filter button
    const passBtn = page.locator('[data-verdict-filter="PASS"]');
    await passBtn.click();

    const counter = page.locator('#dg-oracle-hidden-counter');
    await expect(counter).toContainText('Exibindo 7 de 10 oráculos (3 ocultos)');
  });

  test('responsive mobile 375px view without overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/develop-engineering.html');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  });
});
