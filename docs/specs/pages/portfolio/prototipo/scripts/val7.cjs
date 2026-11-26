// Revisão 7: capturas por cena e sessão, contagem de ouro por quadro, modo reduzido e literais de cor.
// Uso: node val7.cjs [url]   (servidor do protótipo; padrão 127.0.0.1:5183)
const path=require('path'),fs=require('fs');
const R=path.resolve(__dirname,'../../../../../../')+'/',O=R+'tmp/capturas-rev7/',U=process.argv[2]||'http://127.0.0.1:5183/nova-home.template.html';
const s=require(R+'node_modules/sharp'),{chromium}=require(R+'node_modules/playwright');
const KIN='rgb(212, 175, 106)';
// Elementos dourados visíveis no quadro (cor, fundo ou borda; pseudo-elementos incluídos).
function ouros(KIN){const vis=e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth)return 0;let o=1;for(let x=e;x&&x.nodeType===1;x=x.parentElement){const c=getComputedStyle(x);o*=+c.opacity;if(c.visibility==='hidden'||c.display==='none')return 0;if(c.scale&&c.scale.startsWith('0 '))return 0}return o};
 const pal=[...document.querySelectorAll('.hm-s')];const coberto=e=>{const i=pal.indexOf(e.closest('.hm-s'));const r=e.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;return pal.slice(i+1).some(sc=>{const p=sc.querySelector('.palco'),q=p.getBoundingClientRect();return +getComputedStyle(p).opacity>.9&&x>=q.left&&x<=q.right&&y>=q.top&&y<=q.bottom})};
 const out=[];for(const e of document.querySelectorAll('body *')){if(e.closest('.sh,.hm-menu,.hm-rodape'))continue;const v=vis(e);if(v<.35||coberto(e))continue;
  for(const ps of [null,'::before','::after']){const c=getComputedStyle(e,ps);if(ps&&(c.content==='none'||c.content==='normal'))continue;if(ps&&(+c.opacity<.35||c.scale.startsWith('0 ')))continue;
   const txt=!ps&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
   if((txt&&c.color===KIN)||c.backgroundColor===KIN||(parseFloat(c.borderLeftWidth)>0&&c.borderLeftColor===KIN&&c.borderLeftStyle!=='none'))out.push((e.className||e.tagName).toString().split(' ')[0]+(ps||''))}}
 return [...new Set(out)]}
(async()=>{const b=await chromium.launch();const log=[],falhas=[];
for(const [n,w,h] of [['1440x900',1440,900],['390x844',390,844]]){fs.mkdirSync(O+n,{recursive:true});
 const p=await b.newPage({viewport:{width:w,height:h}});const er=[];p.on('pageerror',e=>er.push(''+e));p.on('console',m=>m.type()==='error'&&er.push(m.text()));
 await p.goto(U,{waitUntil:'networkidle'});await p.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
 const g=await p.evaluate(()=>{const q=t=>document.querySelector(t),y=e=>e.getBoundingClientRect().top+scrollY;return{u:q('.hm-s01').offsetHeight-innerHeight*1.3,s2:y(q('.hm-s02')),s3:y(q('.hm-s03')),s4:y(q('.hm-s04')),h2:q('.hm-s02').offsetHeight,h3:q('.hm-s03').offsetHeight,h4:q('.hm-s04').offsetHeight,fim:document.documentElement.scrollHeight-innerHeight}});
 const pts=[['01-abertura',0],['01b-saida',8],['02a-pergunta',20],['02b-fontes',26.5],['02c-sintese',36],['03a-diagrama',45],['03b-gate',53],['03c-noite',60],['04a-incidente',66],['04b-racha',71],['04c-reparo',78],['05a-estudo',86],['05b-passagem',95],['05c-fim',100]].map(([k,x])=>[`s01-${k}`,x/100*g.u]);
 pts.push(['s02-historia',g.s2+g.h2/2-h/2],['s03-ideias',g.s3+g.h3/2-h/2],['s04-projetos',g.s4+g.h4/2-h/2],['s05-rodape',g.fim]);
 const ims=[];for(const [nm,y] of pts){await p.evaluate(y=>scrollTo(0,y),Math.max(0,y));await p.waitForTimeout(250);const buf=await p.screenshot();fs.writeFileSync(O+n+'/'+nm+'.png',buf);ims.push(buf);
  const au=await p.evaluate(ouros,KIN),ox=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);log.push(`${n} ${nm}: ouro=[${au}]`);
  if(au.length>1)falhas.push(`${n} ${nm}: ${au.length} ouros (${au})`);if(ox>0)falhas.push(`${n} ${nm}: rolagem lateral ${ox}px`)}
 const W=w>800?360:200,Hh=Math.round(W*h/w);const t=await Promise.all(ims.map(x=>s(x).resize(W,Hh).png().toBuffer()));
 await s({create:{width:W*6,height:Hh*Math.ceil(t.length/6),channels:3,background:'#555'}}).composite(t.map((i,k)=>({input:i,left:k%6*W,top:(k/6|0)*Hh}))).png().toFile(O+n+'-folha.png');
 // Tab na abertura a partir do meio da S01: as cenas saem da frente
 await p.evaluate(y=>scrollTo(0,y),g.u*.5);await p.waitForTimeout(200);await p.evaluate(()=>document.querySelector('.hm-caminhos a').focus());await p.waitForTimeout(200);
 const cen=await p.evaluate(()=>getComputedStyle(document.querySelector('.hm-cenas')).visibility);log.push(`${n} foco nos caminhos no meio da S01: cenas ${cen}`);if(cen!=='hidden')falhas.push(`${n}: caminhos com foco sobre a legenda`);
 fs.writeFileSync(O+n+'/foco-caminhos.png',await p.screenshot());
 if(er.length)falhas.push(`${n} console: ${er.join(' | ')}`);await p.close()}
for(const [w,h] of [[1440,900],[390,844]]){const p=await b.newPage({viewport:{width:w,height:h},reducedMotion:'reduce'});await p.goto(U,{waitUntil:'networkidle'});
 const r=await p.evaluate(()=>({anims:document.getAnimations().length,menu:getComputedStyle(document.querySelector('.hm-menu')).display,cenas:document.querySelectorAll('.hm-cena').length,ox:document.documentElement.scrollWidth-innerWidth}));
 log.push(`reduzido ${w}: ${JSON.stringify(r)}`);if(r.anims||r.menu!=='none'||r.ox)falhas.push(`reduzido ${w}: ${JSON.stringify(r)}`);
 fs.mkdirSync(O+'reduzido',{recursive:true});await p.screenshot({path:O+`reduzido/${w}-pagina.png`,fullPage:true});await p.close()}
// Literais de cor fora do :root
const css=fs.readFileSync(path.resolve(__dirname,'../home.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');const fora=css.replace(/:root\{[^}]*\}/,'');
const lit=fora.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/g)||[];log.push(`literais de cor fora do :root: ${lit.length}`);if(lit.length)falhas.push(`literais fora do :root: ${lit.join(' ')}`);
fs.writeFileSync(O+'relatorio.txt',log.join('\n')+'\n\nFALHAS:\n'+falhas.join('\n'));console.log(log.join('\n'));console.log('\nFALHAS ('+falhas.length+'):\n'+falhas.join('\n'));await b.close()})();
