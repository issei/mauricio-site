import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';

/*
 * SDD do portfólio §4.1 / §12.11: com JavaScript DESLIGADO, 100% do texto do
 * currículo está no DOM — inclusive o corpo dos <details> fechados.
 * Roda só no projeto `no-js` do playwright.config.js.
 */

const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));
const norm = (s) => s.replace(/\s+/g, ' ').trim();

for (const path of ['/', '/curriculo.html']) {
  test(`${path} sem JS: todo texto do cv.json está no DOM`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    const text = norm(await page.evaluate(() => document.body.textContent));
    const facts = [
      cv.Nome, cv.ResumoHero, ...cv.Resumo,
      ...Object.values(cv.Habilidades).flat(),
      ...cv.Experiencia.flatMap((e) => [e.Cargo, e.Empresa, e.Descricao, ...(e.Resultados || []), ...e.Competencias]),
      ...cv.Projetos.flatMap((p) => [p.Nome, p.Situacao, ...(p.Tarefas || []), ...p.Acoes, ...p.Resultados, ...p.Tecnologias]),
      ...cv.Certificados.map((c) => c.Nome),
      ...Object.values(cv.Cursos_Alura).flat(),
      ...cv.Recomendacoes_Recebidas.flatMap((r) => [r.Recomendacao, r.Autor]),
    ];
    const missing = facts.filter((f) => !text.includes(norm(f)));
    expect(missing).toEqual([]);
  });
}

test('/ sem JS: o conteúdo é visível (nada depende de JS para aparecer)', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.pf-grid')).toBeVisible();
  await expect(page.locator('#recommendations blockquote').first()).toBeVisible();
});

test('/curriculo sem JS: seções aparecem (reveal só vale com html.js)', async ({ page }) => {
  await page.goto('/curriculo.html');
  await expect(page.locator('#about')).toHaveCSS('opacity', '1');
  await expect(page.locator('#projects .project-card')).toHaveCount(cv.Projetos.length);
});
