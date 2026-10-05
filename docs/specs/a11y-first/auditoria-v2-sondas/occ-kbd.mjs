// OCC cap. 3: dá para montar a fração só com teclado?
import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/package.json');
const { chromium } = require('@playwright/test');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto('http://localhost:5173/operacao-capital-cognitivo.html', { waitUntil: 'load' });
await p.waitForTimeout(3500); await p.evaluate(() => window.__DEBUG_skipToChapter ? window.__DEBUG_skipToChapter(3) : null); await p.waitForTimeout(800);
const info = await p.evaluate(() => {
  const chips = [...document.querySelectorAll('.formula-block')];
  return { chips: chips.length, sceneHidden: document.querySelector('#scene-cap3')?.hidden,
    zonesFocusable: [...document.querySelectorAll('.drop-zone')].map((z) => z.tabIndex), chipRole: chips[0]?.getAttribute('role') };
});
console.log('estado:', info);
if (info.chips) {
  await p.evaluate(() => { document.querySelector('#scene-cap3').hidden = false; });
  const chip = p.locator('.formula-block').first();
  await chip.focus();
  for (const k of ['Enter', ' ']) {
    await p.keyboard.press(k);
    console.log(`após ${JSON.stringify(k)} no bloco: selected =`, await chip.evaluate((c) => c.classList.contains('selected')));
  }
  // Tab a partir do último bloco: para onde vai o foco?
  await p.locator('.formula-block').last().focus();
  await p.keyboard.press('Tab');
  console.log('Tab após o último bloco →', await p.evaluate(() => { const a = document.activeElement; return a.id || a.className.slice(0, 40) || a.tagName; }));
  // Caminho do mouse funciona? (clique bloco → clique zona)
  await chip.click(); await p.locator('#formula-numerator').click();
  console.log('mouse: numerador =', await p.locator('#formula-numerator').innerText());
  console.log('snapshot do grupo:\n' + await p.locator('#formula-canvas').ariaSnapshot());
}
await b.close();
