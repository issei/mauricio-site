import { test, expect } from '@playwright/test';

test('A Home deve carregar os elementos principais', async ({ page }) => {
    await page.goto('/'); // O Playwright usará o servidor local do Vite

    // Valida o Título (SEO)
    await expect(page).toHaveTitle(/Mauricio Yokoyama Issei/);

    // Valida se o Header está visível
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Simula clique no botão de contato
    const cta = page.locator('text=Aplicar para a Boutique');
    await expect(cta).toHaveAttribute('href', /\/formulario\.html/);
});