import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "Capacidade Antes do Acesso".
 *
 * O que ela protege, além do smoke: o artigo é uma revisão crítica cuja tese é
 * justamente a calibragem entre o que a evidência sustenta e o que ela não
 * sustenta. Uma página que perdesse os selos de força de evidência, ou a
 * distinção entre os dois domínios etários, afirmaria mais do que o texto
 * sustenta — que é o erro que o próprio artigo denuncia.
 */

const PATH = '/capacidade-antes-do-acesso.html';

test.describe('Capacidade Antes do Acesso — página', () => {
  test('carrega, título/SEO e hero visíveis', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle(/Capacidade Antes do Acesso/);
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(160);

    await expect(page.locator('main#conteudo')).toBeVisible();
    await expect(page.locator('#hero-titulo')).toContainText('medeia');
    await expect(page.locator('.ca-hero__thesis')).toContainText('mediação pedagógica');
  });

  test('SEO: um único H1, canonical e og:image da própria página', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('capacidade-antes-do-acesso');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-capacidade-antes-do-acesso.png');
  });

  test('os dois domínios etários estão separados, não fundidos', async ({ page }) => {
    await page.goto(PATH);
    const dominios = page.locator('#dominios');
    await expect(dominios).toContainText('0–6 anos');
    await expect(dominios).toContainText('6–13 anos');
    // A separação é a correção metodológica central: precisa estar explícita.
    await expect(dominios).toContainText('não é uma política de ECEC');
  });

  test('as quatro camadas da competência adulta existem como conteúdo', async ({ page }) => {
    await page.goto(PATH);
    for (const id of ['capacidade', 'julgamento', 'mediacao', 'governanca']) {
      await expect(page.locator(`#camada-${id} h3`)).toHaveCount(1);
    }
  });

  test('honestidade epistêmica: as três proposições com seus selos', async ({ page }) => {
    await page.goto(PATH);
    const veredito = page.locator('#veredito');
    await expect(veredito.locator('.ca-selo--limitada')).toHaveCount(1);      // P1
    await expect(veredito.locator('.ca-selo--naosustentada')).toHaveCount(1); // P2
    await expect(veredito.locator('.ca-selo--forte')).toHaveCount(1);         // P3
    await expect(veredito).toContainText('não permite sustentar a suficiência');
  });

  test('o caso norueguês é apresentado como desenho, não eficácia, de política', async ({ page }) => {
    await page.goto(PATH);
    const noruega = page.locator('#noruega');
    await expect(noruega).toContainText('policy design');
    await expect(noruega).toContainText('não');
    await expect(noruega).toContainText('policy effectiveness');
    await expect(noruega.locator('.ca-table tbody tr')).toHaveCount(4);
  });

  /*
   * Invariantes da revisão crítica (docs/specs/pages/capacidade-antes-do-acesso/
   * 06_plano_de_revisao_critica.md). São regressões baratas de cometer: cada uma
   * delas é um ponto em que a página passou a afirmar mais do que sustenta —
   * exatamente o defeito que ela denuncia na literatura.
   */
  test('calibragem: a página não trata orientação norueguesa como legislação', async ({ page }) => {
    await page.goto(PATH);
    // O Udir publicou "råd" (orientações). A Tabela 3 sempre disse "diretriz";
    // o cartão e a FAQ diziam "legisla" — a página se contradizia.
    const corpo = await page.locator('body').innerText();
    expect(corpo).not.toMatch(/legisl/i);
    await expect(page.locator('#dominios')).toContainText('orientações oficiais por etapa');
  });

  test('calibragem: o cartão do herói não sobrevende o experimento', async ({ page }) => {
    await page.goto(PATH);
    const corpo = await page.locator('body').innerText();
    // "o único experimento causal forte disponível" extrapolava o escopo que o
    // próprio corpo do artigo já delimita ("de toda a matriz revisada").
    expect(corpo).not.toContain('único experimento causal');
    // −17% (teste final) e +127% (durante a prática) não são um par comparável.
    await expect(page.locator('#v3-cap')).toContainText('momentos de medição distintos');
  });

  test('rastreabilidade: rubrica A–D, âncoras e citações não fixadas', async ({ page }) => {
    await page.goto(PATH);
    const matriz = page.locator('#matriz');
    // A escala só é auditável com o critério escrito.
    await expect(matriz).toContainText('Ensaio randomizado com desfecho comportamental');
    // As duas linhas sem DOI resolvido precisam se declarar.
    await expect(matriz.locator('.ca-selo--naosustentada')).toHaveCount(2);
    // Cada linha da matriz alcança a sua referência no rodapé.
    const ancoras = matriz.locator('th a[href^="#ref-"]');
    expect(await ancoras.count()).toBeGreaterThanOrEqual(10);
    for (const href of await ancoras.evaluateAll((as) => as.map((a) => a.getAttribute('href')))) {
      await expect(page.locator(href)).toHaveCount(1);
    }
  });

  test('leitura: o resumo "Em síntese" vem antes do corpo do artigo', async ({ page }) => {
    await page.goto(PATH);
    // O bloco existia, mas ficava depois de </main> — o leitor só o encontrava
    // ao fim de 1.400 linhas. Guarda de posição, não de existência.
    const posicao = await page.evaluate(() => {
      const tldr = document.querySelector('.aeo-tldr');
      const matriz = document.querySelector('#matriz');
      if (!tldr || !matriz) return null;
      return tldr.compareDocumentPosition(matriz) & Node.DOCUMENT_POSITION_FOLLOWING ? 'antes' : 'depois';
    });
    expect(posicao).toBe('antes');
    await expect(page.locator('main .aeo-tldr')).toHaveCount(1);
  });

  test('o continuum tem forma operável, com o teste de retirada do apoio', async ({ page }) => {
    await page.goto(PATH);
    const continuum = page.locator('#continuum');
    await expect(continuum.locator('table tbody tr')).toHaveCount(4);
    await expect(continuum).toContainText('Critério de retirada do apoio');
    // A coluna que carrega o peso: desempenho sem a ferramenta disponível.
    await expect(continuum).toContainText('sem a ferramenta disponível');
  });

  test('a11y: axe sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await expectNoSeriousA11yViolations(page);
  });

  test('mobile: sem scroll horizontal', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
