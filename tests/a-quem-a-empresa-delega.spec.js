import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "A quem a empresa delega quando delega à IA?".
 * Spec: docs/specs/pages/a-quem-a-empresa-delega/SPEC.md
 *
 * O que ela protege, além do smoke: a regra não compensatória do checklist
 * (RF-dl-03). Um checklist que somasse respostas diria que uma IA competente
 * pode compensar a falta de um botão de pânico, o contrário do que o artigo
 * afirma. Protege também o desfecho do caso (os dados foram recuperados).
 */

const PATH = '/a-quem-a-empresa-delega.html';

test.describe('A quem a empresa delega — página', () => {
  test('carrega, um único H1, canonical e descrição', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/A quem a empresa delega/);
    await expect(page.locator('h1')).toHaveCount(1);
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('a-quem-a-empresa-delega');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);
  });

  test('o caso tem 3 quadros e o desfecho', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#caso ol > li')).toHaveCount(3);
    await expect(page.locator('#caso')).toContainText('recuperar os dados');
  });

  test('as 5 perguntas existem e abrem', async ({ page }) => {
    await page.goto(PATH);
    const qs = page.locator('#perguntas details.dl-q');
    await expect(qs).toHaveCount(5);
    await qs.first().locator('summary').click();
    await expect(qs.first()).toHaveAttribute('open', '');
  });

  test('checklist: um "Não sei" basta para parar; cinco "Sim" liberam', async ({ page }) => {
    await page.goto(PATH);
    const qs = page.locator('#perguntas details.dl-q');
    for (let i = 0; i < 5; i++) await qs.nth(i).locator('summary').click();
    const resultado = page.locator('[data-resultado]');

    for (let i = 1; i <= 4; i++) await page.locator(`input[name="q${i}"][value="sim"]`).check({ force: true });
    await page.locator('input[name="q5"][value="nao-sei"]').check({ force: true });
    await expect(resultado).toContainText('Pare aqui');

    await page.locator('input[name="q5"][value="sim"]').check({ force: true });
    await expect(resultado).toContainText('Pode seguir');
    await expect(page.locator('[data-progresso]')).toContainText('5 de 5');
  });

  test('o artigo completo está na página, com as referências', async ({ page }) => {
    await page.goto(PATH);
    const artigo = page.locator('#artigo');
    await expect(artigo.locator('h2[id^="art-"]')).toHaveCount(11);
    await expect(artigo.locator('#art-referencias')).toBeVisible();
    await expect(artigo).toContainText('A responsabilidade não é automatizável');
  });

  test('link para o vídeo sobre o artigo', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('a[href="/videos/a-quem-a-empresa-delega-quando-delega-a-ia-o-guia-de"]').first()).toBeVisible();
  });

  test('sem violações sérias de acessibilidade (axe)', async ({ page }) => {
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });
});
