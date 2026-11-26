const path=require('path');
const R=path.resolve(__dirname,'../../../../../../')+'/',O=R+'tmp/capturas-rev6c/',U='http://127.0.0.1:5180/nova-home.template.html';
const fs=require('fs'),s=require(R+'node_modules/sharp'),{chromium}=require(R+'node_modules/playwright');
const GOLD='rgb(212, 175, 106)';
function estado(){const vis=e=>{if(!e)return 0;const r=e.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>innerHeight)return 0;let o=1;for(let x=e;x&&x.nodeType===1;x=x.parentElement)o*=+getComputedStyle(x).opacity;return o};
 const clipOk=e=>getComputedStyle(e).clipPath!=='circle(0px at 50% 50%)';
 const ouro=[];const fio=document.querySelector('.hm-fio');if(vis(fio)>.35&&+getComputedStyle(fio,'::after').opacity<.6)ouro.push('fio');
 const f1=document.querySelector('.hm-fio01');if(vis(f1)>.35&&getComputedStyle(f1).display!=='none')ouro.push('fio01');
 const ln=document.querySelector('.hm-linha');if(vis(ln)>.35&&getComputedStyle(ln).scale!=='0 1')ouro.push('traço');
 const sims=[...document.querySelectorAll('.hm-casa .hm-sim')].filter(e=>vis(e)>.3&&clipOk(e));
 const pk=vis(document.querySelector('.hm-pt--k'))>.3,pc=vis(document.querySelector('.hm-pt--c'))>.3;
 if(sims.some(e=>getComputedStyle(e).color==='rgb(212, 175, 106)')||pk)ouro.push('símbolo');
 return {ouro,casa:sims.map(e=>e.classList[3].slice(7)).concat(pk?['•k']:[],pc?['•c']:[]),cab:Math.round(document.querySelector('.sh').getBoundingClientRect().bottom),menu:+(+getComputedStyle(document.querySelector('.hm-menu')).opacity).toFixed(2),pontos:+(+getComputedStyle(document.querySelector('.hm-pontos')).opacity).toFixed(2),ox:document.documentElement.scrollWidth-innerWidth}}
(async()=>{const b=await chromium.launch();const falhas=[];const log=[];
for(const [n,w,h] of [['1440x900',1440,900],['1280x800',1280,800],['390x844',390,844],['360x740',360,740]]){
 fs.mkdirSync(O+n,{recursive:true});const p=await b.newPage({viewport:{width:w,height:h}});const er=[];p.on('console',m=>m.type()==='error'&&er.push(m.text()));p.on('pageerror',e=>er.push(''+e));
 await p.goto(U,{waitUntil:'networkidle'});await p.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
 const g=await p.evaluate(()=>{const s=document.querySelector('.hm-s01'),q=t=>document.querySelector(t);const y=e=>e.getBoundingClientRect().top+scrollY;return{u:s.offsetHeight-innerHeight*1.3,s2:y(q('.hm-s02')),s3:y(q('.hm-s03')),s4:y(q('.hm-s04')),h2:q('.hm-s02').offsetHeight,h3:q('.hm-s03').offsetHeight,h4:q('.hm-s04').offsetHeight,fim:document.documentElement.scrollHeight-innerHeight}});
 const pts=[0,9,12,16,25,34,38,45,50,57,62,70,79,84,88,95].map(x=>[`s01-${String(x).padStart(2,'0')}`,x/100*g.u,x]);
 pts.push(['s02-meio',g.s2+g.h2/2-h/2,null],['s03-meio',g.s3+g.h3/2-h/2,null],['s04-meio',g.s4+g.h4/2-h/2,null],['rodape',g.fim,null]);
 const ims=[];for(const [nm,y,x] of pts){await p.evaluate(y=>scrollTo(0,y),Math.max(0,y));await p.waitForTimeout(220);const buf=await p.screenshot();fs.writeFileSync(O+n+'/'+nm+'.png',buf);ims.push(buf);const e=await p.evaluate(estado);log.push(n+' '+nm+' '+JSON.stringify(e));
  if(e.ox>0)falhas.push(`${n} ${nm}: rolagem lateral ${e.ox}`);
  if(x!==null){if(e.ouro.length>1)falhas.push(`${n} ${nm}: ${e.ouro.length} ouros (${e.ouro})`);if(x>=9&&!e.casa.length)falhas.push(`${n} ${nm}: casa vazia`);
   if(x===0&&(e.cab<=0||e.menu>0.1))falhas.push(`${n} ${nm}: cabeçalho/menu errados na cena 01`);if(x>=12&&(e.cab>2||e.menu<.9||e.pontos<.9))falhas.push(`${n} ${nm}: cabeçalho ${e.cab} menu ${e.menu} pontos ${e.pontos}`)}
  if(nm==='rodape'&&(e.cab<=0))falhas.push(`${n} rodapé: cabeçalho não voltou`)}
 const W=w>800?360:200,Hh=Math.round(W*h/w);const t=await Promise.all(ims.map(x=>s(x).resize(W,Hh).png().toBuffer()));
 await s({create:{width:W*5,height:Hh*Math.ceil(t.length/5),channels:3,background:'#555'}}).composite(t.map((i,k)=>({input:i,left:k%5*W,top:(k/5|0)*Hh}))).png().toFile(O+n+'-folha.png');
 // cliques: pontos e menu
 const alvo={p01:0,p02:28.3,p03:35.6,p04:56.5,p05:76.3,p06:89};
 for(const k of ['p01','p02','p03','p04','p05','p06','p07','p08','p09']){await p.evaluate(y=>scrollTo(0,y),g.u*.5);await p.waitForTimeout(150);await p.click('.hm-pontos .'+k);await p.waitForTimeout(400);
  const r=await p.evaluate(([u,k])=>{const pr=scrollY/u*100;const sec={p07:'t2',p08:'t3',p09:'t4'}[k];if(sec){const t=document.getElementById(sec),pal=t.closest('.palco');return{pr,ok:+getComputedStyle(pal).opacity>.95&&t.getBoundingClientRect().top>=0&&t.getBoundingClientRect().bottom<=innerHeight}}return{pr}},[g.u,k]);
  if(k in alvo){const d=Math.abs(r.pr-alvo[k]);log.push(`${n} clique ${k}: ${r.pr.toFixed(1)}% (alvo ${alvo[k]})`);if(d>1.5)falhas.push(`${n} ponto ${k}: parou em ${r.pr.toFixed(1)}%, esperado ${alvo[k]}%`);
   const e=await p.evaluate(estado);fs.writeFileSync(O+n+`/clique-${k}.png`,await p.screenshot());}else{log.push(`${n} clique ${k}: título visível ${r.ok}`);if(!r.ok)falhas.push(`${n} ponto ${k}: sessão não ficou visível`);fs.writeFileSync(O+n+`/clique-${k}.png`,await p.screenshot())}}
 for(const [k,sel] of [['mn1','#t0'],['mn2','t2'],['mn3','t3'],['mn4','t4']]){await p.evaluate(y=>scrollTo(0,y),g.u*.5);await p.waitForTimeout(150);await p.click('.hm-menu .'+k);await p.waitForTimeout(400);
  const r=await p.evaluate(sel=>{if(sel==='#t0')return{ok:scrollY<5};const t=document.getElementById(sel),pal=t.closest('.palco');return{ok:+getComputedStyle(pal).opacity>.95&&t.getBoundingClientRect().top>=0}},sel);log.push(`${n} menu ${k}: ${r.ok}`);if(!r.ok)falhas.push(`${n} menu ${k}: destino errado`)}
 // Tab a partir do meio da S01: foco visível no menu e nos pontos
 await p.evaluate(y=>scrollTo(0,y),g.u*.5);await p.waitForTimeout(200);await p.evaluate(()=>document.querySelector('.hm-menu li:nth-child(2) a').focus());await p.keyboard.press('Shift+Tab');await p.waitForTimeout(120);
 const foco=[];for(let i=0;i<14;i++){foco.push(await p.evaluate(()=>{const e=document.activeElement,cs=getComputedStyle(e),r=e.getBoundingClientRect();let o=1;for(let x=e;x&&x.nodeType===1;x=x.parentElement)o*=+getComputedStyle(x).opacity;return{t:(e.getAttribute('aria-label')||e.textContent).trim().slice(0,22),contorno:cs.outlineStyle!=='none'&&parseFloat(cs.outlineWidth)>=2,visivel:o>.9&&r.top>=0&&r.bottom<=innerHeight&&r.width>0}}));await p.keyboard.press('Tab');await p.waitForTimeout(120)}
 const mp=foco.slice(0,13);const ruins=mp.filter(f=>!f.contorno||!f.visivel);log.push(`${n} tab: ${mp.map(f=>f.t).join(' › ')}`);if(ruins.length)falhas.push(`${n} foco: ${JSON.stringify(ruins)}`);
 await p.evaluate(()=>document.querySelector('.sh a').focus());await p.waitForTimeout(200);const cb=await p.evaluate(()=>Math.round(document.querySelector('.sh').getBoundingClientRect().top));log.push(`${n} cabeçalho com foco: top ${cb}`);if(cb<0)falhas.push(`${n} cabeçalho com foco não aparece (top ${cb})`);
 if(er.length)falhas.push(`${n} console: ${er.join(' | ')}`);await p.close()}
// modo reduzido
for(const [w,h] of [[1440,900],[390,844]]){const p=await b.newPage({viewport:{width:w,height:h},reducedMotion:'reduce'});await p.goto(U,{waitUntil:'networkidle'});
 const r=await p.evaluate(()=>({anims:document.getAnimations().length,menu:getComputedStyle(document.querySelector('.hm-menu')).display,pontos:getComputedStyle(document.querySelector('.hm-pontos')).display,cab:getComputedStyle(document.querySelector('.sh')).position,casa:getComputedStyle(document.querySelector('.hm-casa')).display,mos:[...document.querySelectorAll('.hm-sim-mos')].length,ox:document.documentElement.scrollWidth-innerWidth}));
 log.push(`reduzido ${w}: ${JSON.stringify(r)}`);if(r.anims||r.menu!=='none'||r.pontos!=='none'||r.cab!=='sticky'||r.casa!=='none'||r.mos!==5||r.ox)falhas.push(`reduzido ${w}: ${JSON.stringify(r)}`);
 fs.mkdirSync(O+'reduzido',{recursive:true});await p.screenshot({path:O+`reduzido/${w}-topo.png`});await p.evaluate(()=>document.querySelector('.hm-cenas').scrollIntoView());await p.screenshot({path:O+`reduzido/${w}-mosaico.png`});await p.close()}
fs.writeFileSync(O+'relatorio.txt',log.join('\n')+'\n\nFALHAS:\n'+falhas.join('\n'));console.log(log.filter(l=>/clique|menu|tab|cabeçalho|reduzido/.test(l)).join('\n'));console.log('\nFALHAS ('+falhas.length+'):\n'+falhas.join('\n'));await b.close()})()
