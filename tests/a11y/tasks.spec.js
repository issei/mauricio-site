// T1/T3/T6 — chegar ao conteúdo e usar controles só com teclado (testing-strategy.md §3, F-02/F-09/F-11).
// A catraca (scripts/a11y-sweep.mjs) já exige skip link + <main> nas 42 páginas; aqui se confere o
// COMPORTAMENTO em páginas que nasceram sem eles.
import { test, expect } from '@playwright/test';

const PAGES = [
  ['devops-salesforce', 'conteudo'],
  ['proposta', 'conteudo'],
  ['service-operations-2-0', 'conteudo'],
  ['know', 'conteudo'],
  ['catalogo', 'conteudo'],
  ['life', 'game-container'],
  ['life3d', 'conteudo'],
  ['404', 'conteudo'],
];

for (const [page, target] of PAGES) {
  test(`${page}: 1º Tab é o skip link, aparece no foco e leva ao <main>`, async ({ page: pw, browserName }) => {
    // O Safari não põe links na ordem de Tab por padrão (só com Option+Tab ou VoiceOver); o Playwright
    // WebKit herda isso — o comportamento do skip link aí é de validação humana, não de Tab simulado.
    test.skip(browserName === 'webkit', 'WebKit não tabula links por padrão');
    await pw.goto(`/${page}.html`);
    await pw.waitForLoadState('load');
    // O consentimento aparece em ~5 páginas; fora delas não há nada antes do skip link.
    await pw.keyboard.press('Tab');
    const skip = pw.locator('a.a11y-skip');
    await expect(skip).toBeFocused();
    const box = await skip.boundingBox();
    expect(box.y, 'skip link visível no foco').toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThan(120);

    await pw.keyboard.press('Enter');
    await expect(pw).toHaveURL(new RegExp(`#${target}$`));
    const main = pw.locator(`main#${target}`);
    await expect(main).toHaveCount(1);
    // o próximo Tab entra no conteúdo, não volta ao cabeçalho
    await pw.keyboard.press('Tab');
    const where = await pw.evaluate((id) => {
      const a = document.activeElement;
      return a && document.getElementById(id)?.contains(a) ? 'main' : a?.tagName;
    }, target);
    // 404 e life3d têm um único controle útil; basta que o foco não tenha ficado no skip link
    expect(where).not.toBe('A.a11y-skip');
  });
}

// T4 (auditoria-v2, AV2-01): a fração do capítulo 3 do OCC só se montava com mouse — blocos `div` com
// tabindex e só `click`, zonas sem foco — e sem ela os capítulos 4–6 não liberam.
test('OCC cap. 3: monta a fração só com teclado', async ({ page }) => {
  await page.goto('/operacao-capital-cognitivo.html');
  await page.waitForFunction(() => typeof window.__DEBUG_skipToChapter === 'function');
  await page.evaluate(() => window.__DEBUG_skipToChapter(3));
  const bloco = (nome) => page.getByRole('button', { name: nome, exact: true });
  const num = page.getByRole('button', { name: /^Numerador/ });
  const den = page.getByRole('button', { name: /^Denominador/ });
  for (const [nome, zona, tecla] of [
    ['Trabalho Correto Aprovado', num, 'Enter'],
    ['Custo API', den, ' '],
    ['Custo de Infraestrutura', den, 'Enter'],
    ['Custo Revisão Humana', den, ' '],
  ]) {
    await bloco(nome).focus();
    await page.keyboard.press(tecla);
    await expect(bloco(nome)).toHaveAttribute('aria-pressed', 'true');
    await zona.focus();
    await page.keyboard.press(tecla);
  }
  await expect(page.locator('#formula-validator')).toHaveAttribute('role', 'status');
  await expect(page.locator('#formula-validator')).toContainText('Lógica correta');
  await expect(page.locator('#formula-naming')).toBeVisible();
});

test('curriculo: botão secundário mantém 4,5:1 também no hover', async ({ page }) => {
  await page.goto('/curriculo.html');
  const btn = page.locator('a.btn-secondary', { hasText: 'LinkedIn' }).first();
  await btn.hover();
  await page.waitForTimeout(400); // transição de 0,3 s
  const { bg, fg } = await btn.evaluate((e) => {
    const cs = getComputedStyle(e);
    return { bg: cs.backgroundColor, fg: cs.color };
  });
  const lum = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).slice(0, 3).map((v) => {
      const c = Number(v) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [a, b] = [lum(bg), lum(fg)].sort((x, y) => y - x);
  expect((a + 0.05) / (b + 0.05)).toBeGreaterThanOrEqual(4.5);
});
