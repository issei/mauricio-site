import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';

// /curriculo — a home anterior, com a mesma aparência, agora com o conteúdo
// gravado no HTML por scripts/gen-portfolio.mjs (sem fetch do cv.json).

const PATH = '/curriculo.html';
const cv = JSON.parse(readFileSync(new URL('../public/cv.json', import.meta.url), 'utf8'));

test.describe('Currículo (versão clássica)', () => {
  test('carrega com todos os blocos preenchidos', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#projects-container .project-card')).toHaveCount(cv.Projetos.length);
    await expect(page.locator('#certifications-container > div')).toHaveCount(cv.Certificados.length);
    await expect(page.locator('#recommendations-container > div')).toHaveCount(cv.Recomendacoes_Recebidas.length);
    await expect(page.locator('#experience-container .timeline-item')).toHaveCount(cv.Experiencia.length);
  });

  test('modal "Saiba Mais" mostra o STAR do projeto certo', async ({ page }) => {
    await page.goto(PATH);
    const i = 5;
    const p = cv.Projetos[i];
    await page.waitForFunction(() => typeof window.openModal === 'function'); // módulo carregado
    await page.locator('#projects-container .project-card').nth(i).getByRole('button', { name: 'Saiba Mais' }).click();
    await expect(page.locator('#project-modal')).toBeVisible();
    await expect(page.locator('#modal-project-name')).toHaveText(p.Nome);
    await expect(page.locator('#modal-project-situacao')).toHaveText(p.Situacao);
    await expect(page.locator('#modal-project-acoes li')).toHaveCount(p.Acoes.length);
    await page.keyboard.press('Escape');
    await expect(page.locator('#project-modal')).toBeHidden();
  });

  test('HTML servido não busca o currículo em runtime', async ({ request }) => {
    const html = await (await request.get(PATH)).text();
    expect(html).not.toMatch(/fetch\(|cv-renderer|initCVRenderer/);
  });

  test('a11y: sem violações sérias (axe), exceto contraste herdado', async ({ page }) => {
    await page.goto(PATH);
    // Sem html.js as seções nascem visíveis (sem transição de opacidade no meio da auditoria).
    await page.evaluate(() => document.documentElement.classList.remove('js'));
    // color-contrast fica de fora: a paleta Tailwind da home antiga tem pares
    // abaixo de 4.5:1 (ex.: gray-400 sobre gray-700 = 4.28:1) e a decisão foi
    // preservar a aparência sem alterações. Qualquer OUTRA regra continua bloqueando.
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast'])
      .analyze();
    const blocking = violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    expect(blocking.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});
