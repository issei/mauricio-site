import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

/*
 * Suíte da página "Da execução à orquestração do trabalho" (áudio comentado).
 *
 * O que ela protege, além do smoke: a página publica um áudio com números
 * errados e corrige cada um ao lado. A regressão barata é um número corrigido
 * voltar ao texto da página como se fosse resultado — fora da coluna "No áudio"
 * e fora da transcrição automática, que é rascunho rotulado.
 * Critérios de aceite: docs/specs/pages/da-execucao-a-orquestracao/01_SPEC.md §8.
 */

const PATH = '/da-execucao-a-orquestracao.html';
const AUDIO = '/static/audio/Da_execu%C3%A7%C3%A3o_%C3%A0_orquestra%C3%A7%C3%A3o_do_trabalho.m4a';

test.describe('Da execução à orquestração — página', () => {
  test('carrega, título/SEO e um único h1', async ({ page }) => {
    const res = await page.goto(PATH);
    expect(res?.status()).toBe(200);

    await expect(page).toHaveTitle('Da execução à orquestração do trabalho — áudio comentado');
    const desc = await page.getAttribute('meta[name="description"]', 'content');
    expect(desc?.length).toBeGreaterThan(50);
    expect(desc?.length).toBeLessThanOrEqual(155);
    await expect(page.locator('h1')).toHaveCount(1);

    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toBe('https://mauricio.issei.com.br/da-execucao-a-orquestracao');
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).not.toMatch(/noindex/);
    const og = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(og).toContain('og-da-execucao-a-orquestracao.png');
  });

  test('critério 1: seções na ordem da spec (§12.2)', async ({ page }) => {
    await page.goto(PATH);
    const ids = await page.$$eval('main > section[id]', (els) => els.map((e) => e.id));
    expect(ids).toEqual(['inicio', 'conclusao', 'ouvir', 'como-ouvir', 'evidencia', 'aplicar', 'fontes']);
  });

  test('critério 2: player nativo com rótulo e link de download', async ({ page }) => {
    await page.goto(PATH);
    const audio = page.locator('#ouvir audio');
    await expect(audio).toHaveCount(1);
    await expect(audio).toHaveAttribute('controls', '');
    await expect(audio).toHaveAttribute('preload', 'metadata');
    await expect(audio).not.toHaveAttribute('autoplay', /.*/);
    await expect(audio).toHaveAccessibleName(/Da execução à orquestração do trabalho/);
    const source = audio.locator('source');
    await expect(source).toHaveAttribute('type', 'audio/mp4');
    await expect(source).toHaveAttribute('src', AUDIO);
    const download = page.locator(`#ouvir a[href="${AUDIO}"][download]`);
    await expect(download).toBeVisible();
    await expect(download).toContainText('Baixar o áudio');
  });

  test('critério 3: a tabela "O que corrigir" tem 12 linhas de dados', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#como-ouvir tbody tr')).toHaveCount(12);
  });

  test('critério 4: números corrigidos só aparecem na coluna "No áudio" ou na transcrição', async ({ page }) => {
    await page.goto(PATH);
    const texto = await page.evaluate(() => {
      // O <main> e o bloco AEO (Em síntese + FAQ, fora do <main>) são o texto visível da página.
      const partes = [document.querySelector('main'), document.querySelector('section.aeo')].filter(Boolean);
      return partes.map((parte) => {
        const clone = parte.cloneNode(true);
        clone.querySelectorAll('#como-ouvir td:first-child, #transcricao').forEach((n) => n.remove());
        return clone.textContent;
      }).join(' ').replace(/\s+/g, ' ');
    });
    for (const s of ['0,85', '92%', 'aprovação de crédito', '10 mil agentes', 'zero alucinações', 'aluga computadores']) {
      expect(texto, `"${s}" fora da coluna "No áudio"`).not.toContain(s);
    }
  });

  test('critérios 5 e 6: cada bloco de evidência tem selo e fonte', async ({ page }) => {
    await page.goto(PATH);
    const blocos = page.locator('#evidencia .eo-bloco');
    await expect(blocos).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      const bloco = blocos.nth(i);
      await expect(bloco.locator('.eo-selo')).toHaveText(/^(Fato|Inferência|Hipótese)/);
      await expect(bloco.locator('.eo-fontes-curtas a').first()).toBeVisible();
    }
    // Cada link de fonte curta aponta para uma entrada que existe na lista de fontes.
    const alvos = await page.$$eval('#evidencia .eo-fontes-curtas a', (as) => as.map((a) => a.getAttribute('href')));
    for (const alvo of alvos) await expect(page.locator(`#fontes ${alvo}`)).toHaveCount(1);
  });

  test('critério 7: "não é X — é Y" no máximo uma vez por seção', async ({ page }) => {
    await page.goto(PATH);
    const contagens = await page.$$eval('main > section', (secs) =>
      secs.map((s) => (s.textContent.match(/não é [^.—]{1,60}—\s*é /gi) || []).length));
    for (const n of contagens) expect(n).toBeLessThanOrEqual(1);
  });

  test('a transcrição integral existe, começa fechada e declara como foi revisada', async ({ page }) => {
    await page.goto(PATH);
    const det = page.locator('#transcricao');
    await expect(det.locator('summary')).toContainText('Transcrição do áudio');
    await expect(det).toContainText('não foi conferido palavra por palavra com o áudio');
    expect(await det.locator('.eo-prose p').count()).toBeGreaterThan(20);
    await expect(det).not.toHaveAttribute('open', /.*/);
  });

  test('revisão 2: conclusão em um minuto e três caminhos de leitura', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#conclusao dt')).toHaveText([
      'O que a evidência sustenta', 'O que continua incerto', 'O que esta página não defende',
    ]);
    for (const alvo of ['#conclusao', '#ouvir', '#como-ouvir', '#fontes']) {
      await expect(page.locator(`#inicio .eo-caminhos a[href="${alvo}"]`)).toHaveCount(1);
    }
  });

  test('revisão 2: matriz de decisão marcada como proposta de aplicação', async ({ page }) => {
    await page.goto(PATH);
    await expect(page.locator('#matriz-decisao tbody tr')).toHaveCount(5);
    await expect(page.locator('#aplicar')).toContainText('Proposta de aplicação');
    await expect(page.locator('#aplicar')).toContainText('não é resultado demonstrado pelas fontes');
  });

  test('revisão 2: cada bloco de evidência diz o alcance e cada fonte tem tipo', async ({ page }) => {
    await page.goto(PATH);
    const blocos = page.locator('#evidencia .eo-bloco');
    for (let i = 0; i < 6; i++) await expect(blocos.nth(i).locator('.eo-alcance')).toContainText('Alcance:');
    const refs = await page.$$eval('#fontes .eo-refs > li', (lis) => lis.map((li) => li.textContent.trim()));
    for (const r of refs) expect(r, r.slice(0, 60)).toMatch(/\[[^\]]+\]\.?$/);
  });

  test('o menu <eco-nav> aparece e situa a página no pilar Fundação', async ({ page }) => {
    await page.goto(PATH);
    const nav = page.locator('eco-nav');
    await expect(nav).toHaveCount(1);
    // A pílula do pilar só aparece se o slug estiver no grafo do componente.
    const texto = await nav.evaluate((el) => el.shadowRoot?.textContent ?? '');
    expect(texto).toContain('Fundação');
  });

  test('critério 8: a11y sem violações serious/critical', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(PATH);
    await page.locator('#transcricao summary').click();
    await expectNoSeriousA11yViolations(page);
  });

  test('critério 8: títulos não pulam nível', async ({ page }) => {
    await page.goto(PATH);
    const niveis = await page.$$eval('main h1, main h2, main h3, main h4', (hs) => hs.map((h) => Number(h.tagName[1])));
    expect(niveis[0]).toBe(1);
    for (let i = 1; i < niveis.length; i++) expect(niveis[i] - niveis[i - 1]).toBeLessThanOrEqual(1);
  });

  test('critério 8: sem rolagem horizontal a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(PATH);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
