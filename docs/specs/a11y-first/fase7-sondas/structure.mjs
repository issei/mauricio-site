import { pw, BASE, pages, newCtx, pool, write, isExc } from './lib.mjs';
const out = {};
for (const bt of ['chromium','firefox']) {
  const browser = await pw[bt].launch();
  out[bt] = await pool(pages, 4, async (p) => {
    const ctx = await newCtx(browser);
    const page = await ctx.newPage();
    await page.goto(BASE+p.url, {waitUntil:'load', timeout:45000});
    await page.waitForTimeout(800);
    const s = await page.evaluate(() => {
      const q = s => document.querySelectorAll(s).length;
      const vis = el => { const r = el.getBoundingClientRect(); const cs=getComputedStyle(el); return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'; };
      const h1s=[...document.querySelectorAll('h1')];
      const mains=[...document.querySelectorAll('main,[role=main]')];
      return { lang:document.documentElement.lang, title:document.title, h1:h1s.length, h1vis:h1s.filter(vis).length, h1text:h1s.map(h=>h.textContent.trim().slice(0,50)), main:mains.length, mainTags:mains.map(m=>m.tagName+(m.getAttribute('role')?'[role]':'')),
        viewport:document.querySelector('meta[name=viewport]')?.content||null, hreflang:[...document.querySelectorAll('link[rel=alternate][hreflang]')].map(l=>l.hreflang) };
    });
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    const first = await page.evaluate(() => { const a=document.activeElement; if(!a||a===document.body) return {tag:'BODY'}; const r=a.getBoundingClientRect(); const cs=getComputedStyle(a);
      const href=a.getAttribute('href'); const tgt = href&&href.startsWith('#')? document.getElementById(decodeURIComponent(href.slice(1))):null;
      return {tag:a.tagName, text:(a.textContent||'').trim().slice(0,50), href, targetExists:!!tgt, targetTag:tgt?.tagName, onscreen:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth, rect:[r.x|0,r.y|0,r.width|0,r.height|0], opacity:cs.opacity}; });
    let skipWorks = null;
    if (first.href && first.href.startsWith('#') && first.targetExists) {
      await page.keyboard.press('Enter'); await page.waitForTimeout(400);
      skipWorks = await page.evaluate((h) => { const t=document.getElementById(decodeURIComponent(h.slice(1))); const a=document.activeElement; return { hash:location.hash, activeIsTarget: a===t, activeInTarget: !!t&&t.contains(a), targetTabindex:t?.getAttribute('tabindex'), targetInViewport:(()=>{const r=t.getBoundingClientRect(); return r.top<innerHeight&&r.bottom>0;})(), activeTag:a.tagName }; }, first.href);
      // next Tab should land after target (sequential focus starting point)
      await page.keyboard.press('Tab'); await page.waitForTimeout(200);
      skipWorks.nextTabInMain = await page.evaluate(h=>{const t=document.getElementById(decodeURIComponent(h.slice(1))); const a=document.activeElement; return !!t&&(t.contains(a)||!!(t.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING));}, first.href);
    }
    await ctx.close();
    return { id:p.id, exc:isExc(p), ...s, first, skipWorks };
  });
  await browser.close();
}
write('structure.json', out);
