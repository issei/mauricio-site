// Entrevista por escrito, não listada (spec: docs/specs/pages/entrevista-acessibilidade-streaming/SPEC.md §8).
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/entrevista-acessibilidade-streaming.html';
const PERGUNTA_1 = 'Como o streaming entra na sua rotina? Quando, onde e com quem você costuma assistir?';

test.describe('/entrevista-acessibilidade-streaming', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test('carrega com H1 único e as partes em ordem', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    const ids = await page.locator('#entrevista > section').evaluateAll((s) => s.map((e) => e.id));
    expect(ids).toEqual(['inicio', 'privacidade', 'antes', 'rotina', 'escolha', 'comecar', 'controle', 'continuidade', 'contornos', 'extras', 'final', 'autorizacao', 'enviar']);
    await expect(page.getByRole('textbox', { name: PERGUNTA_1 })).toBeVisible();
  });

  test('não é listada e não carrega analítica: noindex, sem hreflang, sem terceiros', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mauricio.issei.com.br/entrevista-acessibilidade-streaming');
    await expect(page.locator('link[hreflang]')).toHaveCount(0);
    const html = await page.content();
    expect(html).not.toMatch(/googletagmanager|google-analytics|clarity\.ms|cookie-consent/);
  });

  test('nenhuma requisição de rede leva as respostas', async ({ page }) => {
    const pedidos = [];
    page.on('request', (r) => { if (r.method() !== 'GET' || /SEGREDO-123/.test(r.url())) pedidos.push(r.url()); });
    await page.fill('#antes-nome', 'SEGREDO-123');
    await page.fill('#rotina-1', 'SEGREDO-123');
    await page.getByRole('button', { name: /Baixar o arquivo de respostas/ }).click();
    await page.waitForTimeout(600);
    expect(pedidos).toEqual([]);
  });

  test('salva no navegador e recupera ao recarregar', async ({ page }) => {
    await page.getByRole('textbox', { name: PERGUNTA_1 }).fill('À noite, na sala.');
    await page.getByRole('radio', { name: 'Só com o primeiro nome' }).check();
    await expect(page.locator('#ultimo-salvamento')).toContainText('Respostas salvas neste navegador');
    await page.reload();
    await expect(page.getByRole('textbox', { name: PERGUNTA_1 })).toHaveValue('À noite, na sala.');
    await expect(page.getByRole('radio', { name: 'Só com o primeiro nome' })).toBeChecked();
    await expect(page.locator('#ultimo-salvamento')).toContainText('Respostas recuperadas');
  });

  test('desligar o salvamento apaga o que estava gravado', async ({ page }) => {
    await page.fill('#rotina-1', 'algo');
    await expect(page.locator('#ultimo-salvamento')).toContainText('salvas');
    await page.getByRole('checkbox', { name: 'Salvar automaticamente neste navegador' }).uncheck();
    expect(await page.evaluate(() => localStorage.getItem('entrevista-streaming:v1'))).toBeNull();
    await page.reload();
    await expect(page.locator('#rotina-1')).toHaveValue('');
    await expect(page.getByRole('checkbox', { name: 'Salvar automaticamente neste navegador' })).not.toBeChecked();
  });

  test('situação: adicionar leva o foco ao primeiro campo, remover pede confirmação e renumera', async ({ page }) => {
    const adicionar = page.getByRole('button', { name: 'Adicionar uma situação à Parte 3' });
    await adicionar.click();
    const grupo = page.getByRole('group', { name: 'Parte 3, situação 1' });
    await expect(grupo).toBeVisible();
    await expect(grupo.getByLabel('Em qual aparelho foi?')).toBeFocused();
    await expect(page.locator('#anuncio')).toHaveText('Parte 3, situação 1 adicionada.');
    await grupo.getByLabel('O que você fez, passo a passo?').fill('abri o menu');

    await adicionar.click();
    await expect(page.getByRole('group', { name: 'Parte 3, situação 2' })).toBeVisible();

    await page.getByRole('button', { name: 'Remover parte 3, situação 1' }).click();
    const dlg = page.getByRole('dialog');
    await expect(dlg).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dlg).toBeHidden();
    await expect(page.getByRole('button', { name: 'Remover parte 3, situação 1' })).toBeFocused();

    await page.getByRole('button', { name: 'Remover parte 3, situação 1' }).click();
    await dlg.getByRole('button', { name: 'Remover' }).click();
    await expect(page.getByRole('group', { name: 'Parte 3, situação 2' })).toHaveCount(0);
    await expect(page.getByRole('group', { name: 'Parte 3, situação 1' })).toHaveCount(1);
    await expect(adicionar).toBeFocused();
  });

  test('situação salva volta ao recarregar', async ({ page }) => {
    await page.getByRole('button', { name: 'Adicionar uma situação à Parte 4' }).click();
    await page.getByRole('group', { name: 'Parte 4, situação 1' }).getByLabel('Em qual aparelho foi?').fill('Smart TV');
    await expect(page.locator('#ultimo-salvamento')).toContainText('salvas');
    await page.reload();
    await expect(page.getByRole('group', { name: 'Parte 4, situação 1' }).getByLabel('Em qual aparelho foi?')).toHaveValue('Smart TV');
  });

  test('bloco extra com resposta salva abre sozinho', async ({ page }) => {
    const bloco = page.locator('#extras details').first();
    await expect(bloco).not.toHaveAttribute('open', '');
    await bloco.locator('summary').click();
    await page.fill('#extras-1-1', 'pelo título da tela');
    await expect(page.locator('#ultimo-salvamento')).toContainText('salvas');
    await page.reload();
    await expect(page.locator('#extras details').first()).toHaveAttribute('open', '');
  });

  test('baixa o .txt e o .json, e o .json reabre as respostas', async ({ page }) => {
    await page.fill('#antes-nome', 'Ana Lúcia');
    await page.fill('#rotina-1', 'À noite.');
    await page.getByRole('button', { name: 'Adicionar uma situação à Parte 2' }).click();
    await page.getByRole('group', { name: 'Parte 2, situação 1' }).getByLabel('Qual recurso ou ajuste estava envolvido?').fill('audiodescrição');

    const [txt] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Baixar o arquivo de respostas/ }).click()]);
    const texto = await (await txt.createReadStream()).toArray().then((b) => Buffer.concat(b).toString('utf8'));
    expect(txt.suggestedFilename()).toMatch(/^respostas-entrevista-Ana-Lucia-\d{4}-\d{2}-\d{2}\.txt$/);
    expect(texto).toContain('Respostas de: Ana Lúcia');
    expect(texto).toContain(`Pergunta: ${PERGUNTA_1}\nResposta: À noite.`);
    expect(texto).toContain('Parte 2, situação 1\nQual recurso ou ajuste estava envolvido? audiodescrição');
    await expect(page.locator('#anuncio')).toContainText('baixado');

    const [js] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Baixar o arquivo de continuação/ }).click()]);
    const caminho = await js.path();

    await page.getByRole('button', { name: 'Apagar as respostas deste navegador' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Apagar' }).click();
    await expect(page.locator('#rotina-1')).toHaveValue('');
    await expect(page.locator('h1')).toBeFocused();

    await page.setInputFiles('#importar-arquivo', caminho);
    await expect(page.locator('#rotina-1')).toHaveValue('À noite.');
    await expect(page.getByRole('group', { name: 'Parte 2, situação 1' }).getByLabel('Qual recurso ou ajuste estava envolvido?')).toHaveValue('audiodescrição');
  });

  test('abrir arquivo inválido mostra o erro em texto, ligado ao campo', async ({ page }) => {
    await page.setInputFiles('#importar-arquivo', { name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"versao":99}') });
    await expect(page.locator('#importar-erro')).toBeVisible();
    await expect(page.locator('#importar-erro')).toContainText('versão 99');
    await expect(page.locator('#importar-arquivo')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#importar-arquivo')).toBeFocused();
  });

  test('a11y: axe sem violações serious/critical, também com situação aberta e diálogo', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expectNoSeriousA11yViolations(page);
    await page.getByRole('button', { name: 'Adicionar uma situação à Parte 5' }).click();
    await page.locator('#extras details').first().locator('summary').click();
    await expectNoSeriousA11yViolations(page);
    await page.getByRole('button', { name: 'Remover parte 5, situação 1' }).click();
    await expectNoSeriousA11yViolations(page);
  });

  test('alvos de toque dos controles com ≥ 44 px de altura', async ({ page }) => {
    await page.getByRole('button', { name: 'Adicionar uma situação à Parte 2' }).click();
    const baixos = await page.evaluate(() =>
      [...document.querySelectorAll('.et-btn, .et-opcoes > label, .et-detalhe > summary, input[type=text], textarea')]
        .filter((el) => el.offsetParent !== null && el.getBoundingClientRect().height < 44)
        .map((el) => el.textContent.trim().slice(0, 40) || el.id));
    expect(baixos).toEqual([]);
  });

  test('sem rolagem horizontal a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.getByRole('button', { name: 'Adicionar uma situação à Parte 2' }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
