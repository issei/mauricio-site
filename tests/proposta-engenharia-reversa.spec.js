import { test, expect } from '@playwright/test';

// Smoke test
test('deve carregar proposta-engenharia-reversa.html com sucesso', async ({ page }) => {
  const response = await page.goto('/proposta-engenharia-reversa.html');
  expect(response.status()).toBe(200);
});

// SEO check
test('deve ter title e meta description válidos', async ({ page }) => {
  await page.goto('/proposta-engenharia-reversa.html');
  const title = await page.title();
  expect(title.length).toBeGreaterThan(10);
  expect(title.length).toBeLessThan(70);
  const desc = await page.getAttribute('meta[name="description"]', 'content');
  expect(desc?.length).toBeGreaterThan(50);
});

// WebGL canvas check
test('deve ter canvas WebGL presente no hero', async ({ page }) => {
  await page.goto('/proposta-engenharia-reversa.html');
  const canvas = page.locator('#hero-canvas');
  await expect(canvas).toBeVisible();
});
