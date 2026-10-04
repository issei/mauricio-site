import fs from 'node:fs';
const o=JSON.parse(fs.readFileSync('structure.json','utf8'));
for (const bt of Object.keys(o)) { console.log('=====',bt);
 for (const x of o[bt]) { if(x.error){console.log(x.id,'ERR',x.error);continue;}
  const probs=[]; 
  const expLang = x.id.startsWith('en/')?'en':'pt-BR';
  if(x.lang!==expLang) probs.push('lang='+x.lang);
  if(x.h1!==1) probs.push('h1='+x.h1+(x.h1vis!==x.h1?`(vis ${x.h1vis})`:''));
  if(x.main!==1) probs.push('main='+x.main);
  if(!x.title) probs.push('notitle');
  if(!x.first.href||!x.first.href.startsWith('#')) probs.push('firstTab='+x.first.tag+':'+(x.first.text||'').slice(0,25)+' '+x.first.href);
  else if(!x.first.targetExists) probs.push('skip target missing '+x.first.href);
  else if(!x.skipWorks.activeInTarget&&!x.skipWorks.activeIsTarget) probs.push('skip focus not in target (active='+x.skipWorks.activeTag+', tabindex='+x.skipWorks.targetTabindex+', nextTabAfter='+x.skipWorks.nextTabInMain+')');
  if(x.first.href&&!x.first.onscreen) probs.push('skip offscreen when focused');
  if(/user-scalable|maximum-scale/.test(x.viewport||'')) probs.push('viewport:'+x.viewport);
  console.log((x.exc?'[EXC] ':'')+x.id, probs.length?probs.join(' | '):'ok');
 }}
