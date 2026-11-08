// Comportamento dos modelos de página de vídeo — docs/specs/pages/videos-youtube/SDD-fase-1.md §8.
//
// Um teste por MODELO (ficha, assunto, índice), não por vídeo: as páginas reais
// saem todas do mesmo gerador. As páginas são geradas a partir de
// tests/fixtures/videos/ numa pasta temporária e abertas por file://, para o
// teste não depender da API do YouTube nem de content/ ter vídeos.
import { test, expect } from '@playwright/test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { run } from '../scripts/gen-videos.mjs';
import { expectNoSeriousA11yViolations } from './_helpers/axe.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let out;
const abre = (page, rel) => page.goto(pathToFileURL(join(out, rel)).href);

test.beforeAll(() => {
  out = mkdtempSync(join(tmpdir(), 'videos-spec-'));
  run({ contentDir: join(ROOT, 'tests/fixtures/videos'), outRoot: out });
});
test.afterAll(() => rmSync(out, { recursive: true, force: true }));

test.beforeEach(async ({ page }) => {
  // Nada sai para a rede: o iframe do YouTube e as fontes não são o que se testa.
  await page.route(/^https?:\/\//, (r) => r.abort());
});

test('ficha: iframe só nasce no clique, com youtube-nocookie e título', async ({ page }) => {
  await abre(page, 'src/videos/como-ancorar-agentes-no-repositorio.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.getByRole('button', { name: /Assistir aqui/ }).click();
  const f = page.locator('.yt iframe');
  await expect(f).toHaveAttribute('src', /^https:\/\/www\.youtube-nocookie\.com\/embed\/AAAAAAAAAA1/);
  await expect(f).toHaveAttribute('title', 'Vídeo: Como ancorar agentes no repositório');
});

test('ficha: transcrição abre pelo teclado e avisa que não foi revisada', async ({ page }) => {
  await abre(page, 'src/videos/como-ancorar-agentes-no-repositorio.html');
  const resumo = page.locator('summary', { hasText: 'Mostrar a transcrição completa' });
  await resumo.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details')).toHaveAttribute('open', '');
  await expect(page.getByText('Transcrição automática, não revisada.')).toBeVisible();
  await expectNoSeriousA11yViolations(page);
});

test('assunto: lista os vídeos do assunto', async ({ page }) => {
  await abre(page, 'src/temas/engenharia-agentica.html');
  await expect(page.locator('h1')).toHaveText('Engenharia agêntica');
  await expect(page.locator('.lista > li')).toHaveCount(3);
  await expectNoSeriousA11yViolations(page);
});

test('índice: o filtro por assunto esconde os outros vídeos e anuncia a contagem', async ({ page }) => {
  await abre(page, 'src/videos.html');
  const itens = page.locator('#lista-videos > li');
  await expect(itens).toHaveCount(3);
  await page.getByLabel('Filtrar por assunto').selectOption('acessibilidade');
  await expect(itens.filter({ visible: true })).toHaveCount(1);
  await expect(page.locator('#filtro-status')).toHaveText('1 vídeo');
  await expectNoSeriousA11yViolations(page);
});

// SDD-fase-2 §6: modelo do artigo publicado.
test('artigo: indexado, âncora vai ao YouTube sem JS e toca aqui no minuto certo com JS', async ({ page }) => {
  await abre(page, 'src/videos/especificacao-antes-do-codigo.html');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  const ancora = page.locator('a.ancora', { hasText: '01:10' });
  await expect(ancora).toHaveAttribute('href', 'https://www.youtube.com/watch?v=DDDDDDDDDD4&t=70s');
  await expect(page.locator('iframe')).toHaveCount(0);
  await ancora.click();
  await expect(page.locator('.yt iframe')).toHaveAttribute('src', /\/embed\/DDDDDDDDDD4\?.*start=70/);
  await expect(page.getByRole('heading', { name: 'Fontes' })).toBeVisible();
  await expect(page.getByText(/Revisado por/)).toBeVisible();
  await expectNoSeriousA11yViolations(page);
});

test('artigo: sem JS a âncora continua um link para o YouTube', async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.route(/^https?:\/\//, (r) => r.abort());
  await abre(page, 'src/videos/especificacao-antes-do-codigo.html');
  await expect(page.locator('a.ancora').first()).toHaveAttribute('href', /youtube\.com\/watch\?v=DDDDDDDDDD4&t=\d+s/);
  await expect(page.locator('iframe')).toHaveCount(0);
  await ctx.close();
});
