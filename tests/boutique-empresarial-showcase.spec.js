import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Boutique Empresarial Showcase — Smoke & Accessibility', () => {
  test('carrega boutique-empresarial-showcase.html com sucesso', async ({ page }) => {
    const response = await page.goto('/boutique-empresarial-showcase.html');
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Boutique Empresarial/);

    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Boutique Empresarial');
  });

  test('seções principais e CTAs estão presentes na página', async ({ page }) => {
    await page.goto('/boutique-empresarial-showcase.html');

    // Hero CTAs
    const githubCta = page.getByRole('link', { name: 'Ver no GitHub' });
    await expect(githubCta).toBeVisible();

    const specCta = page.getByRole('link', { name: 'Explorar Especificações' });
    await expect(specCta).toBeVisible();

    // 4 Pilares
    await expect(page.locator('h3:has-text("Specification Driven Development")')).toBeVisible();
    await expect(page.locator('h3:has-text("Pipeline Multi-Agente")')).toBeVisible();
    await expect(page.locator('h3:has-text("Quality Gate Determinístico")')).toBeVisible();
    await expect(page.locator('h3:has-text("Agent Readiness")')).toBeVisible();

    // Anatomia do repositório
    await expect(page.locator('text=Anatomia do Repositório')).toBeVisible();

    // AWS & CI/CD
    await expect(page.locator('text=GitHub Actions & AWS IAM')).toBeVisible();

    // FAQ AEO
    await expect(page.locator('text=Qual é a stack principal do projeto Boutique Empresarial?')).toBeVisible();
  });

  test('acessibilidade com axe-core sem erros sérios ou críticos', async ({ page }) => {
    await page.goto('/boutique-empresarial-showcase.html');
    const results = await new AxeBuilder({ page }).analyze();
    const seriousOrCritical = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(seriousOrCritical).toEqual([]);
  });
});
