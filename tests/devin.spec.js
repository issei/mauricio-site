import { test, expect } from '@playwright/test';

test('should load devin.html and render the new Synthesis section and video embed', async ({ page }) => {
  const response = await page.goto('/devin.html');
  expect(response.status()).toBe(200);

  // Verify Title/SEO
  const title = await page.title();
  expect(title).toContain('Vibe Coding com Devin');

  // Verify Synthesis section is present
  const sinteseSection = page.locator('#sintese');
  await expect(sinteseSection).toBeVisible();

  // Verify YouTube iframe is present with correct URL
  const iframe = page.locator('#sintese iframe');
  await expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/AakO78FwnB8');

  // Verify TOC includes the new Synthesis item
  const tocItem = page.locator('.devin-toc a[href="#sintese"]');
  await expect(tocItem).toBeVisible();
  await expect(tocItem).toContainText('Síntese');
});
