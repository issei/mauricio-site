// Home nova (SDD-nova-home §14.4): toda imagem da home tem origem registrada; nenhuma é gerada por IA nem vem de og-*.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const ler = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const bloco = ler('src/index.html').match(/<!-- HM:START[\s\S]*?<!-- HM:END -->/)[0];
const capturas = JSON.parse(ler('assets-fonte/home/manifesto.json'));
const fontes = JSON.parse(ler('assets-fonte/manifesto.json'));
const srcs = [...bloco.matchAll(/(?:src|srcset)="([^"]+)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(' ')[0]));

test('toda imagem da home existe em public/', () => {
  assert.ok(srcs.length > 0);
  for (const s of srcs) assert.ok(existsSync(new URL(`../public${s}`, import.meta.url)), s);
});

test('cada imagem tem origem: o retrato real ou uma captura do site registrada no manifesto', () => {
  for (const s of srcs) {
    if (/^\/img\/retrato-\d+\./.test(s)) { assert.equal(fontes.retrato.fonte, 'assets-fonte/retrato.jpg'); continue; }
    const m = s.match(/^\/img\/home\/([a-z-]+)-\d+\.(avif|webp)$/);
    assert.ok(m, `fora do padrão: ${s}`);
    assert.equal(capturas[m[1]]?.origem, 'captura do site', s);
    assert.ok(fontes[`home:${m[1]}`], `sem entrada no manifesto do gen-imagens: ${m[1]}`);
  }
});

test('nenhuma imagem da home vem de og-* nem das antigas fotos geradas por IA', () => {
  for (const s of srcs) assert.doesNotMatch(s, /\/og-|teclado|teste\.|operacao/, s);
});
