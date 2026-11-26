const path=require('path');
// Parte 1: rolagem total por etapa e mapa de constância (diferença média entre capturas a cada toque de 40 px)
const R=path.resolve(__dirname,'../../../../../../')+'/',U=process.argv[2]||'http://127.0.0.1:5180/nova-home.template.html',TAG=process.argv[3]||'antes';
const s=require(R+'node_modules/sharp'),{chromium}=require(R+'node_modules/playwright'),fs=require('fs');
(async()=>{const b=await chromium.launch();const out={};
for(const [n,w,h] of [['1440x900',1440,900],['1536x730',1536,730],['390x844',390,844]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto(U,{waitUntil:'networkidle'});
 await p.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
 const g=await p.evaluate(()=>{const q=t=>document.querySelector(t),y=e=>e.getBoundingClientRect().top+scrollY,vh=innerHeight;const s1=q('.hm-s01'),c=s1.offsetHeight-vh,u=c-.3*vh;
  return{total:document.documentElement.scrollHeight-vh,u,s3:y(q('.hm-s03')),s4:y(q('.hm-s04')),fim4:y(q('.hm-s04'))+q('.hm-s04').offsetHeight-vh}});
 const fr=[0,10,30,42,60,80,100].map(x=>x/100*g.u);const et={};['c01','c02','c03','c04','c05','c06'].forEach((k,i)=>et[k]=Math.round((fr[i+1]-fr[i])/40));
 et.S02=Math.round((g.s3-g.u)/40);et.S03=Math.round((g.s4-g.s3)/40);et.S04=Math.round((g.fim4-g.s4)/40);et.rodape=Math.round((g.total-g.fim4)/40);
 // constância na S01 (até o fim da S01 útil + passagem)
 const dif=[];let ant=null;for(let y=0;y<=g.u+0.3*h;y+=40){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60);const buf=await s(await p.screenshot({type:'jpeg',quality:60})).resize(240).greyscale().raw().toBuffer();
  if(ant){let d=0;for(let i=0;i<buf.length;i++)d+=Math.abs(buf[i]-ant[i]);dif.push(+(d/buf.length).toFixed(2))}ant=buf}
 const mortas=dif.map((d,i)=>[i+1,d]).filter(([,d])=>d<0.15).map(([i])=>i),bruscas=dif.map((d,i)=>[i+1,d]).filter(([,d])=>d>6).map(([i,d])=>`${i}(${d})`);
 // maior sequência de toques mortos
 let seq=0,max=0;for(const d of dif){seq=d<0.15?seq+1:0;max=Math.max(max,seq)}
 out[n]={pixels:Math.round(g.total),toques:Math.round(g.total/40),etapas:et,s01:{toques:dif.length,mortas:mortas.length,maiorSequenciaMorta:max,bruscas,mediaDif:+(dif.reduce((a,b)=>a+b,0)/dif.length).toFixed(2)}};
 fs.writeFileSync(R+`tmp/capturas-rev6b/constancia-${TAG}-${n}.json`,JSON.stringify(dif));await p.close()}
console.log(JSON.stringify(out,null,1));fs.writeFileSync(R+`tmp/capturas-rev6b/medida-${TAG}.json`,JSON.stringify(out,null,1));await b.close()})()
