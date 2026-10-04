import fs from 'node:fs';
const bt=process.argv[2]||'chromium';
const o=JSON.parse(fs.readFileSync(`tab5-${bt}.json`,'utf8'));
for(const r of o){
  console.log('=====',r.id,'stops',r.nstops,JSON.stringify(r.cycle));
  const real=r.stops.filter(s=>s.path);
  const noInd=real.filter(s=>s.inViewport&&(s.diff===0)); 
  const lowInd=real.filter(s=>typeof s.diff==='number'&&s.diff>0&&s.diff<20);
  const offs=real.filter(s=>!s.inViewport);
  const hid=real.filter(s=>s.n>0&&s.hidden===s.n);
  const part=real.filter(s=>s.hidden>0&&s.hidden<s.n);
  const invis=real.filter(s=>s.vis!=='visible'||s.op==='0'||s.rect[2]===0||s.rect[3]===0);
  const nodiff=real.filter(s=>s.diff===null||typeof s.diff==='string');
  const fmt=s=>`#${s.i} ${s.path.split('>').slice(-1)[0]} "${s.name}" rect=${s.rect} diff=${s.diff} outline=${s.outline}${s.hider?' hider='+s.hider:''}`;
  console.log(' NO-INDICATOR (diff=0):',noInd.length); noInd.slice(0,25).forEach(s=>console.log('   ',fmt(s)));
  console.log(' low diff (<20px):',lowInd.length); lowInd.slice(0,8).forEach(s=>console.log('   ',fmt(s)));
  console.log(' off-viewport:',offs.length); offs.slice(0,8).forEach(s=>console.log('   ',fmt(s)));
  console.log(' FULLY obscured:',hid.length); hid.slice(0,8).forEach(s=>console.log('   ',fmt(s)));
  console.log(' partly obscured:',part.length); part.slice(0,5).forEach(s=>console.log('   ',fmt(s)));
  console.log(' invisible focus:',invis.length); invis.slice(0,8).forEach(s=>console.log('   ',fmt(s)));
  console.log(' not measured:',nodiff.length);nodiff.slice(0,6).forEach(s=>console.log('   ',fmt(s)));
}


