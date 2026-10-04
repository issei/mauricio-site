import { pw, BASE, newCtx, pool, write } from './lib.mjs';
const P = ['index','catalogo','engenharia-agentes-ia','devin','artifice','operacao-capital-cognitivo','curriculo','life3d'];
const browser = await pw.chromium.launch();
const jobs = P.flatMap(id=>[{id,w:1280,h:800},{id,w:375,h:812}]);
const res = await pool(jobs, 4, async (j)=>{
  const ctx = await newCtx(browser,{viewport:{width:j.w,height:j.h}}); const page = await ctx.newPage();
  await page.goto(BASE+`/${j.id}.html`,{waitUntil:'load',timeout:45000}); await page.waitForTimeout(2000);
  // dismiss nothing; measure as is (banner present)
  const r = await page.evaluate(()=>{
    const sel='a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=checkbox],[role=switch],[role=menuitem],[tabindex]:not([tabindex="-1"])';
    const els=[...document.querySelectorAll(sel)].filter(e=>{ if(e.disabled) return false; const cs=getComputedStyle(e); if(cs.visibility==='hidden'||cs.display==='none') return false; const r=e.getBoundingClientRect(); if(r.width===0||r.height===0) return false;
      for(let a=e;a;a=a.parentElement){ if(a.hasAttribute&&(a.hasAttribute('inert')||a.getAttribute('aria-hidden')==='true')&&a.tagName!=='BODY') return false; const s=getComputedStyle(a); if(s.display==='none'||s.visibility==='hidden') return false;} 
      // skip off-canvas closed things: rect fully outside document horizontally
      if(r.right<0||r.left>document.documentElement.scrollWidth) return false; return true;});
    const boxes=els.map(e=>{const r=e.getBoundingClientRect(); return {e,x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height};});
    const isInline=e=>{ // link inside running text: inline display & parent has other text
      if(e.tagName!=='A') return false; const cs=getComputedStyle(e); if(cs.display!=='inline') return false; const p=e.parentElement; const own=[...p.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim().length>0).length; return own>0; };
    const small=boxes.filter(b=>b.w<24||b.h<24);
    const out=[];
    for(const s of small){ const cx=s.x+s.w/2, cy=s.y+s.h/2;
      // circle of diameter 24 centered at bbox center; fails if it intersects any other target box or another undersized target's circle
      let conflict=null;
      for(const o of boxes){ if(o===s) continue; if(s.e.contains(o.e)||o.e.contains(s.e)) continue;
        // circle-rect intersection
        const nx=Math.max(o.x,Math.min(cx,o.x+o.w)), ny=Math.max(o.y,Math.min(cy,o.y+o.h)); const d=Math.hypot(cx-nx,cy-ny);
        if(d<12){ conflict=o; break; }
        if((o.w<24||o.h<24)){ const d2=Math.hypot(cx-(o.x+o.w/2),cy-(o.y+o.h/2)); if(d2<24){conflict=o;break;} } }
      const eq=s.e.tagName==='A'&&s.e.href&&boxes.some(o=>o!==s&&o.e.tagName==='A'&&o.e.href===s.e.href&&o.w>=24&&o.h>=24); // equivalent larger target
      const d=s.e.tagName.toLowerCase()+(s.e.id?'#'+s.e.id:'')+'.'+[...s.e.classList].slice(0,2).join('.')+' "'+((s.e.getAttribute('aria-label')||s.e.textContent||s.e.value||'').trim().replace(/\s+/g,' ').slice(0,28))+'" '+Math.round(s.w)+'x'+Math.round(s.h);
      out.push({d,inline:isInline(s.e),spacingOK:!conflict,conflict:conflict&&(conflict.e.tagName.toLowerCase()+'.'+[...conflict.e.classList].slice(0,1).join('.')),equivalent:eq});
    }
    return { total:boxes.length, small:out };
  });
  await ctx.close(); return { id:j.id,w:j.w,...r };
});
write('targets.json',res);
for(const r of res){ const fails=r.small.filter(s=>!s.inline&&!s.spacingOK&&!s.equivalent); console.log(r.id,r.w,'targets',r.total,'<24:',r.small.length,'inline:',r.small.filter(s=>s.inline).length,'spacing-ok:',r.small.filter(s=>!s.inline&&s.spacingOK).length,'FAIL:',fails.length);
  fails.slice(0,8).forEach(f=>console.log('   ',f.d,'| conflict',f.conflict)); }
await browser.close();
