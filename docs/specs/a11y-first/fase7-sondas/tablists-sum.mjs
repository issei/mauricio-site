import fs from 'node:fs';
const t=JSON.parse(fs.readFileSync('tablists.json','utf8'));
for(const p of t){ if(!p.n) continue; for(const r of p.res){ if(r.kb){console.log(p.id,r.i,r.label,r.kb);continue;}
  const s=Object.fromEntries(r.seq.map(x=>[x[0],x[1]])); const f=k=>JSON.stringify(s[k]);
  const probs=[]; const nt0=(r.tabindex.filter(x=>x==='0').length); if(nt0!==1) probs.push('tabindex0 count='+nt0+' '+JSON.stringify(r.tabindex)); const ns=r.selected.filter(x=>x==='true').length; if(ns!==1) probs.push('aria-selected true count='+ns);
  if(r.controls.some(c=>c==='MISSING'||c==='none'||c==='noRole')) probs.push('controls='+r.controls.join(','));
  if(r.nonTabBtns) probs.push('nonTab buttons inside='+r.nonTabBtns);
  const keys=r.seq.filter(x=>x[0].startsWith('Arrow')||x[0]==='End'||x[0]==='Home');
  const moved=keys.map(k=>k[1].focus);
  console.log(p.id,'#'+r.i,'"'+r.label+'"','tabs',r.n,'orient',r.orient,'focusSeq',JSON.stringify(moved),'sel',JSON.stringify(keys.map(k=>k[1].sel)),'Tab-leaves',s['Tab-leaves'],probs.join(' ; '));
}}
