// hreflang recíproco (SDD-i18n-en §6.1; auditoria-v2 AV2-13): o espelho EN já trazia o trio; a página PT não trazia
// a volta, e anotação sem volta é ignorada. O plugin `hreflang-pt` (vite.config.js) injeta o trio no PT com espelho.
import { test, expect } from '@playwright/test';

const SITE = 'https://mauricio.issei.com.br';

for (const [pagina, pt, en] of [['index', '/', '/en/'], ['devin', '/devin', '/en/devin'], ['curriculo', '/curriculo', '/en/curriculo']]) {
  test(`${pagina}: PT e EN apontam um para o outro`, async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'marcação estática: um navegador basta');
    for (const url of [`/${pagina}.html`, `/en/${pagina}.html`]) {
      await page.goto(url);
      for (const [lang, rota] of [['pt-BR', pt], ['en', en], ['x-default', pt]]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`), `${url} → ${lang}`).toHaveAttribute('href', SITE + rota);
      }
    }
  });
}

test('página sem espelho não anuncia hreflang', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'marcação estática: um navegador basta');
  await page.goto('/admin.html');
  await expect(page.locator('link[hreflang]')).toHaveCount(0);
});
