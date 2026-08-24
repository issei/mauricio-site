import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/devops-salesforce.html';

/*
 * A página é um MANUAL: o que ela promete no sumário é o contrato com o leitor.
 * Um link do sumário que não resolve, ou uma seção que sumiu numa edição, quebra
 * a navegação sem quebrar o build — daí as asserções serem sobre a espinha
 * dorsal (nove seções, quatro partes), não sobre frases isoladas.
 */
test.describe('DevOps Salesforce com IA — Manual', () => {
  test('carrega com 200, metadados corretos e sem erros de console', async ({ page }) => {
    // Só erros da própria página: recursos de terceiros (fontes, GA) falham em
    // ambientes offline/atrás de proxy e isso não é defeito do conteúdo.
    const errors = [];
    page.on('console', (m) => {
      if (m.type() !== 'error') return;
      const url = m.location()?.url || '';
      if (url && !url.includes('localhost')) return;
      errors.push(m.text());
    });

    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Manual Prático/);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('devops-salesforce');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc.length).toBeGreaterThan(50);
    expect(desc.length).toBeLessThanOrEqual(160);

    expect(errors, errors.join('\n')).toHaveLength(0);
  });

  test('as nove seções e as quatro partes existem', async ({ page }) => {
    await page.goto(PATH);
    for (let n = 1; n <= 9; n++) {
      await expect(page.locator(`#secao-${n}`)).toHaveCount(1);
    }
    for (const parte of ['fundacao', 'arquitetura', 'metodologia', 'governanca']) {
      await expect(page.locator(`#${parte}`)).toHaveCount(1);
    }
  });

  test('todo link do sumário aponta para um alvo existente', async ({ page }) => {
    await page.goto(PATH);
    const hrefs = await page.locator('#sumario a[href^="#"]').evaluateAll(
      (as) => as.map((a) => a.getAttribute('href'))
    );
    expect(hrefs.length).toBe(9); // as nove seções do manual
    for (const href of hrefs) {
      await expect(page.locator(href)).toHaveCount(1);
    }
  });

  test('os comandos operacionais do manual estão na página', async ({ page }) => {
    await page.goto(PATH);
    const texto = await page.locator('body').innerText();
    for (const cmd of [
      'npm install --global @salesforce/cli',
      'sf org login web',
      'sf project convert source',
      'force-app/',
    ]) {
      expect(texto, `comando ausente: ${cmd}`).toContain(cmd);
    }
  });

  test('sem violações de acessibilidade serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });
});
