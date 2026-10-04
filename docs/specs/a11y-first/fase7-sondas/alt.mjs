import { pw, BASE, pages, newCtx, pool, write, isExc } from './lib.mjs';
const browser = await pw.chromium.launch();
// 9. img/iframe/svg/alt scan on all pages (DOM, post-JS)
const alt = await pool(pages, 4, async (p)=>{
  const ctx = await newCtx(browser); const page = await ctx.newPage();
  await page.goto(BASE+p.url,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(2500);
  // scroll to trigger lazy
  await page.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=700){ scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); } scrollTo(0,0); });
  await page.waitForTimeout(500);
  const r = await page.evaluate(()=>{
    const fileish=/\.(png|jpe?g|gif|webp|svg|avif)$|^(image|img|foto|photo|picture|imagem|screenshot|logo)\d*$|^IMG[_-]?\d+|^DSC/i;
    const out={noalt:[],emptyinfo:[],suspect:[],hiddenAlt:[],total:0,emptyAlt:0, iframesNoTitle:[], svgRoleImgNoName:[], objectNoName:[], inputImageNoAlt:[], areaNoAlt:[], bgInfo:0};
    const desc=e=>e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+'.'+[...e.classList].slice(0,2).join('.')+' src='+(e.currentSrc||e.src||'').split('/').pop().slice(0,50);
    for(const i of document.querySelectorAll('img')){ out.total++; const a=i.getAttribute('alt');
      const inLink=!!i.closest('a,button'); const w=i.naturalWidth||i.width, h=i.naturalHeight||i.height;
      if(a===null) out.noalt.push(desc(i));
      else if(a.trim()===''){ out.emptyAlt++; const linkName=inLink&&!((i.closest('a,button').textContent||'').trim()||i.closest('a,button').getAttribute('aria-label')); if(linkName||(w>=120&&h>=120&&!i.closest('[aria-hidden=true]'))) out.emptyinfo.push(desc(i)+' size='+w+'x'+h+(linkName?' IN-LINK-NO-NAME':'')); }
      else if(fileish.test(a.trim())||a.trim().length<3||/^image of|^picture of|imagem de$/i.test(a.trim())) out.suspect.push(desc(i)+' alt="'+a+'"');
      if(a&&a.trim()&&(i.closest('[aria-hidden=true]')||i.getAttribute('aria-hidden')==='true'||i.getAttribute('role')==='presentation'||i.getAttribute('role')==='none')) out.hiddenAlt.push(desc(i)+' alt="'+a.slice(0,30)+'"'); }
    for(const f of document.querySelectorAll('iframe')){ if(!(f.getAttribute('title')||'').trim()&&!f.getAttribute('aria-label')&&f.getAttribute('aria-hidden')!=='true') out.iframesNoTitle.push(f.outerHTML.slice(0,140)); }
    for(const s of document.querySelectorAll('svg[role=img],img[role=img]')){ if(!(s.getAttribute('aria-label')||s.getAttribute('aria-labelledby')||s.querySelector(':scope>title'))) out.svgRoleImgNoName.push(desc(s)); }
    for(const o of document.querySelectorAll('object,embed')) if(!(o.getAttribute('aria-label')||o.getAttribute('title'))) out.objectNoName.push(o.outerHTML.slice(0,100));
    for(const o of document.querySelectorAll('input[type=image]')) if(!o.getAttribute('alt')) out.inputImageNoAlt.push(desc(o));
    for(const o of document.querySelectorAll('area[href]')) if(!o.getAttribute('alt')) out.areaNoAlt.push(o.outerHTML.slice(0,80));
    // svg inline w/o hidden or name inside link/button without text
    out.svgLinkNoName=[...document.querySelectorAll('a,button')].filter(b=>b.querySelector('svg,img')&&!(b.textContent||'').trim()&&!b.getAttribute('aria-label')&&!b.getAttribute('aria-labelledby')&&!b.getAttribute('title')&&!b.querySelector('img[alt]:not([alt=""])')&&!b.querySelector('svg title')).map(b=>b.outerHTML.slice(0,120));
    return out; });
  await ctx.close(); return { id:p.id, exc:isExc(p), ...r };
});
write('alt.json', alt);
await browser.close(); console.log('done');
