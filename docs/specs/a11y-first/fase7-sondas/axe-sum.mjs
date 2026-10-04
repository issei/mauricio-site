import fs from 'node:fs';
const a=JSON.parse(fs.readFileSync('axe-normal.json','utf8')), b=JSON.parse(fs.readFileSync('axe-reduced.json','utf8'));
console.log('pages', a.length);
for(const x of a){ if(x.violations.length) console.log((x.exc?'[EXC] ':'')+x.id, x.violations.map(v=>`${v.id}(${v.impact},${v.nodes})`).join(' ')); }
const diff=a.filter((x,i)=>JSON.stringify(x.violations.map(v=>[v.id,v.nodes]))!==JSON.stringify(b[i].violations.map(v=>[v.id,v.nodes]))).map(x=>x.id);
console.log('diff reduced:',diff);
console.log('--- non-exc samples');
for(const x of a){ if(!x.exc) for(const v of x.violations) console.log(x.id,v.id,JSON.stringify(v.sample)); }
