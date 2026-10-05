import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/package.json');
const { chromium } = require('@playwright/test');
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto('http://localhost:4399/artifice.html', { waitUntil: 'load' }); await p.waitForTimeout(1200);
const vis = () => p.evaluate(() => getComputedStyle(document.querySelector('#tip-dejours')).visibility);
// teclado: foca o termo via Tab (focus-visible), Esc
await p.locator('button[aria-describedby="tip-dejours"]').focus(); await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Tab');
await p.waitForTimeout(300); console.log('foco por Tab → tip:', await vis());
await p.keyboard.press('Escape'); await p.waitForTimeout(300); console.log('após Esc (foco ainda no termo) → tip:', await vis());
// mouse: hover, Esc
await p.locator('body').click({ position: { x: 5, y: 5 } }); await p.keyboard.press('Escape');
await p.locator('button[aria-describedby="tip-dejours"]').hover(); await p.waitForTimeout(300); console.log('hover → tip:', await vis());
await p.keyboard.press('Escape'); await p.waitForTimeout(300); console.log('após Esc (ponteiro ainda em cima) → tip:', await vis());
const name = await p.locator('button[aria-describedby="tip-dejours"]').evaluate((el) => el.textContent.replace(/\s+/g,' ').trim().slice(0,120));
console.log('texto do botão (inclui o tooltip):', name);
console.log((await p.locator('button[aria-describedby="tip-dejours"]').ariaSnapshot()));
await b.close();
