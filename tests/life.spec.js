// Personagem de /life.html — sprite em pixel art desenhada no canvas
// (docs/specs/pages/life/SDD-personagem-pixel-art.md). A cena não tem DOM:
// os testes leem os pixels da faixa do chão onde o personagem anda.
import { test, expect } from '@playwright/test';

// Cores exatas da paleta da sprite (drawImage sem suavização preserva o valor).
const COR = {
  pele: [0xec, 0x9e, 0x67],
  reflexoLente: [0xf5, 0xf2, 0xf1],
  cabelo: [0x0d, 0x0d, 0x12],
  jeans: [0x27, 0x31, 0x4f],
};

// Faixa do mundo (740×380) que contém o personagem perto do início da fase.
const FAIXA = { x: 0, y: 190, w: 300, h: 70 };

async function lerPersonagem(page) {
  return page.evaluate(({ cores, faixa }) => {
    const canvas = document.getElementById('gameCanvas');
    const dpr = canvas.width / 740;
    const w = Math.floor(faixa.w * dpr);
    const { data } = canvas.getContext('2d').getImageData(
      Math.floor(faixa.x * dpr), Math.floor(faixa.y * dpr), w, Math.floor(faixa.h * dpr));
    const out = {};
    for (const [nome, [r, g, b]] of Object.entries(cores)) {
      let n = 0, somaX = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] === r && data[i + 1] === g && data[i + 2] === b) { n++; somaX += (i / 4) % w; }
      }
      out[nome] = { n, cx: n ? somaX / n / dpr : null };
    }
    return out;
  }, { cores: COR, faixa: FAIXA });
}

async function assinaturaDaFaixa(page) {
  return page.evaluate((faixa) => {
    const canvas = document.getElementById('gameCanvas');
    const dpr = canvas.width / 740;
    const { data } = canvas.getContext('2d').getImageData(
      Math.floor(faixa.x * dpr), Math.floor(faixa.y * dpr), Math.floor(faixa.w * dpr), Math.floor(faixa.h * dpr));
    let h = 0;
    for (let i = 0; i < data.length; i++) h = (h * 31 + data[i]) >>> 0;
    return h;
  }, FAIXA);
}

async function abrirJogo(page) {
  await page.goto('/life.html');
  await expect.poll(async () => (await lerPersonagem(page)).reflexoLente.n, { timeout: 15_000 }).toBeGreaterThan(0);
}

// Reflexo das lentes à frente do centro do cabelo = rosto voltado para esse lado.
async function viradoParaDireita(page) {
  const p = await lerPersonagem(page);
  return p.reflexoLente.cx > p.cabelo.cx;
}

test('life: o personagem é desenhado com a paleta da sprite (óculos, pele, cabelo, jeans)', async ({ page }) => {
  await abrirJogo(page);
  const p = await lerPersonagem(page);
  expect(p.reflexoLente.n).toBeGreaterThanOrEqual(2);
  expect(p.pele.n).toBeGreaterThan(40);
  expect(p.cabelo.n).toBeGreaterThan(40);
  expect(p.jeans.n).toBeGreaterThan(20);
});

test('life: ao soltar a seta, o personagem continua virado para onde andou', async ({ page }) => {
  await abrirJogo(page);
  expect(await viradoParaDireita(page)).toBe(true);

  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(600);
  await page.keyboard.up('ArrowRight');
  await page.keyboard.down('ArrowLeft');
  await page.waitForTimeout(400);
  await page.keyboard.up('ArrowLeft');
  await page.waitForTimeout(300);

  expect(await viradoParaDireita(page)).toBe(false);
});

test('life: com movimento reduzido, o personagem parado não respira nem pisca', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await abrirJogo(page);
  const antes = await assinaturaDaFaixa(page);
  await page.waitForTimeout(2_000);
  expect(await assinaturaDaFaixa(page)).toBe(antes);
});

test('life: sem preferência de movimento, o personagem parado respira', async ({ page }) => {
  await abrirJogo(page);
  const antes = await assinaturaDaFaixa(page);
  await expect.poll(() => assinaturaDaFaixa(page), { timeout: 3_000 }).not.toBe(antes);
});
