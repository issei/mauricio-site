// Ferramenta de entrevista não listada (spec: docs/specs/pages/entrevista-acessibilidade-streaming/SPEC.md §8).
import { test, expect } from '@playwright/test';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const PATH = '/entrevista-acessibilidade-streaming.html';

test.describe('/entrevista-acessibilidade-streaming', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PATH);
  });

  test('carrega com H1 único e os blocos do roteiro em ordem', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    const ids = await page.locator('#entrevista > section').evaluateAll((s) => s.map((e) => e.id));
    expect(ids).toEqual(['inicio', 'privacidade', 'abertura', 'contexto', 'principal', 'barreiras', 'final', 'orientacoes', 'topicos', 'exportar']);
    await expect(page.locator('section.et-eixo')).toHaveCount(5);
  });

  test('não é listada e não carrega analítica: noindex, sem hreflang, sem terceiros', async ({ page }) => {
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://mauricio.issei.com.br/entrevista-acessibilidade-streaming');
    await expect(page.locator('link[hreflang]')).toHaveCount(0);
    const html = await page.content();
    expect(html).not.toMatch(/googletagmanager|google-analytics|clarity\.ms|cookie-consent/);
  });

  test('nenhuma requisição de rede leva os dados digitados', async ({ page }) => {
    const pedidos = [];
    page.on('request', (r) => { if (r.method() !== 'GET' || /SEGREDO-123/.test(r.url())) pedidos.push(r.url()); });
    await page.fill('#ab-identificador', 'SEGREDO-123');
    await page.fill('#ctx-notas', 'SEGREDO-123');
    await page.waitForTimeout(600);
    expect(pedidos).toEqual([]);
  });

  test('salva no navegador e recupera ao recarregar', async ({ page }) => {
    await page.fill('#ab-identificador', 'E-07');
    await page.getByRole('radio', { name: 'Por vídeo' }).check();
    await page.getByRole('checkbox', { name: /última vez em que você escolheu algo/ }).check();
    await expect(page.locator('#ultimo-salvamento')).toContainText('Salvo neste navegador');
    await page.reload();
    await expect(page.locator('#ab-identificador')).toHaveValue('E-07');
    await expect(page.getByRole('radio', { name: 'Por vídeo' })).toBeChecked();
    await expect(page.getByRole('checkbox', { name: /última vez em que você escolheu algo/ })).toBeChecked();
    await expect(page.locator('#ultimo-salvamento')).toContainText('Registro recuperado');
  });

  test('desligar o salvamento apaga o que estava gravado', async ({ page }) => {
    await page.fill('#ctx-notas', 'algo');
    await expect(page.locator('#ultimo-salvamento')).toContainText('Salvo');
    await page.getByRole('checkbox', { name: 'Salvar automaticamente neste navegador' }).uncheck();
    expect(await page.evaluate(() => localStorage.getItem('entrevista-streaming:v1'))).toBeNull();
    await page.reload();
    await expect(page.locator('#ctx-notas')).toHaveValue('');
    await expect(page.getByRole('checkbox', { name: 'Salvar automaticamente neste navegador' })).not.toBeChecked();
  });

  test('episódio: adicionar leva o foco ao primeiro campo, origem sem pré-seleção, remover pede confirmação', async ({ page }) => {
    await page.getByRole('button', { name: 'Adicionar episódio ao Eixo B' }).click();
    const grupo = page.getByRole('group', { name: 'Eixo B, episódio 1' });
    await expect(grupo).toBeVisible();
    await expect(grupo.getByLabel('Aparelho', { exact: true })).toBeFocused();
    await expect(page.locator('#anuncio')).toHaveText('Eixo B, episódio 1 adicionado.');

    const origem = grupo.getByRole('group', { name: 'Origem do impedimento' });
    await expect(origem.getByRole('radio')).toHaveCount(4);
    for (const r of await origem.getByRole('radio').all()) await expect(r).not.toBeChecked();
    await origem.getByRole('radio', { name: 'Barreira de interação' }).check();
    await grupo.getByLabel('Palavras exatas da pessoa').fill('o menu sumiu');

    await page.getByRole('button', { name: 'Adicionar episódio ao Eixo B' }).click();
    await expect(page.getByRole('group', { name: 'Eixo B, episódio 2' })).toBeVisible();

    await page.getByRole('button', { name: 'Remover eixo B, episódio 1' }).click();
    const dlg = page.getByRole('dialog');
    await expect(dlg).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dlg).toBeHidden();
    await expect(page.getByRole('button', { name: 'Remover eixo B, episódio 1' })).toBeFocused();

    await page.getByRole('button', { name: 'Remover eixo B, episódio 1' }).click();
    await dlg.getByRole('button', { name: 'Remover' }).click();
    await expect(page.getByRole('group', { name: 'Eixo B, episódio 2' })).toHaveCount(0);
    await expect(page.getByRole('group', { name: 'Eixo B, episódio 1' })).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Adicionar episódio ao Eixo B' })).toBeFocused();
  });

  test('episódio salvo volta com a origem marcada', async ({ page }) => {
    await page.getByRole('button', { name: 'Adicionar episódio ao Eixo C' }).click();
    const grupo = page.getByRole('group', { name: 'Eixo C, episódio 1' });
    await grupo.getByRole('radio', { name: 'Indefinido' }).check();
    await grupo.getByLabel('Aparelho', { exact: true }).fill('Smart TV');
    await expect(page.locator('#ultimo-salvamento')).toContainText('Salvo');
    await page.reload();
    const depois = page.getByRole('group', { name: 'Eixo C, episódio 1' });
    await expect(depois.getByLabel('Aparelho', { exact: true })).toHaveValue('Smart TV');
    await expect(depois.getByRole('radio', { name: 'Indefinido' })).toBeChecked();
  });

  test('cronômetro: iniciar, pausar e anunciar a pausa dos 35 minutos', async ({ page }) => {
    await page.clock.install();
    await page.reload();
    await page.getByRole('button', { name: 'Iniciar' }).click();
    await expect(page.getByRole('button', { name: 'Pausar' })).toBeFocused();
    await page.clock.runFor(35 * 60 * 1000 + 1500);
    await expect(page.locator('#anuncio')).toContainText('35 minutos de entrevista');
    await page.getByRole('button', { name: 'Pausar' }).click();
    await expect(page.locator('#tempo-decorrido')).toHaveText(/^35:0\d$/);
    await expect(page.getByRole('button', { name: 'Retomar' })).toBeEnabled();
  });

  test('lista de tópicos: o nome entra no texto e não é salvo', async ({ page }) => {
    await page.fill('#topicos-nome', 'Ana');
    await expect(page.locator('#topicos-texto')).toHaveValue(/^Olá, Ana\./);
    await expect(page.locator('#topicos-texto')).not.toHaveValue(/\*|\|/);
    await page.fill('#ctx-notas', 'x');
    await expect(page.locator('#ultimo-salvamento')).toContainText('Salvo');
    expect(await page.evaluate(() => localStorage.getItem('entrevista-streaming:v1'))).not.toContain('Ana');
  });

  test('exporta .md e .json, e o .json importado restaura o registro', async ({ page }) => {
    await page.fill('#ab-identificador', 'E-09');
    await page.getByRole('button', { name: 'Adicionar episódio ao Eixo A' }).click();
    await page.getByRole('group', { name: 'Eixo A, episódio 1' }).getByLabel('Recurso envolvido').fill('audiodescrição');

    const [md] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Exportar para leitura/ }).click()]);
    const textoMd = await (await md.createReadStream()).toArray().then((b) => Buffer.concat(b).toString('utf8'));
    expect(md.suggestedFilename()).toMatch(/^E-09-\d{4}-\d{2}-\d{2}\.md$/);
    expect(textoMd).toContain('- Identificador da entrevista: E-09');
    expect(textoMd).toContain('### Eixo A, episódio 1');
    expect(textoMd).toContain('- Recurso envolvido: audiodescrição');

    const [js] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: /Exportar para continuar/ }).click()]);
    const caminho = await js.path();

    await page.getByRole('button', { name: 'Apagar os dados deste navegador' }).click();
    await page.getByRole('dialog').getByRole('button', { name: 'Apagar' }).click();
    await expect(page.locator('#ab-identificador')).toHaveValue('');

    await page.setInputFiles('#importar-arquivo', caminho);
    await expect(page.locator('#ab-identificador')).toHaveValue('E-09');
    await expect(page.getByRole('group', { name: 'Eixo A, episódio 1' }).getByLabel('Recurso envolvido')).toHaveValue('audiodescrição');
  });

  test('importar arquivo inválido mostra o erro em texto, ligado ao campo', async ({ page }) => {
    await page.setInputFiles('#importar-arquivo', { name: 'x.json', mimeType: 'application/json', buffer: Buffer.from('{"versao":99}') });
    await expect(page.locator('#importar-erro')).toBeVisible();
    await expect(page.locator('#importar-erro')).toContainText('versão 99');
    await expect(page.locator('#importar-arquivo')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#importar-arquivo')).toBeFocused();
  });

  test('a11y: axe sem violações serious/critical, também com episódio aberto e diálogo', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expectNoSeriousA11yViolations(page);
    await page.getByRole('button', { name: 'Adicionar episódio ao Eixo C' }).click();
    await expectNoSeriousA11yViolations(page);
    await page.getByRole('button', { name: 'Remover eixo C, episódio 1' }).click();
    await expectNoSeriousA11yViolations(page);
  });

  test('alvos de toque dos controles com ≥ 44 px de altura', async ({ page }) => {
    const baixos = await page.evaluate(() =>
      [...document.querySelectorAll('.et-btn, .et-opcoes > label, .et-perguntas li, .et-detalhe > summary, input[type=text], textarea')]
        .filter((el) => el.offsetParent !== null && el.getBoundingClientRect().height < 44)
        .map((el) => el.textContent.trim().slice(0, 40) || el.id));
    expect(baixos).toEqual([]);
  });

  test('sem rolagem horizontal a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.getByRole('button', { name: 'Adicionar episódio ao Eixo A' }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
  });
});
