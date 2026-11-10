/**
 * Aplica uma lista de trocas "errado → certo" no texto de um .vtt, sem tocar nos tempos.
 * Passo 4b da skill transcricao-local: o modelo devolve só os pares; este script aplica.
 *
 * Remove as tags de tempo por palavra (<00:00:01.160><c> ... </c>) das linhas de texto:
 * o parseVtt do site já as ignora, e sem elas uma troca de duas palavras não quebra.
 * Linhas com "-->" (tempos), o cabeçalho e a ordem das cues ficam como estão.
 *
 * Uso: node scripts/videos/aplicar-trocas.mjs <arquivo.vtt> <trocas.json>
 *   trocas.json = [{ "de": "amadilha", "para": "armadilha" }, ...]
 * Sai com código 1 se alguma troca não achou o texto (para conferir o par).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function aplicarTrocas(vtt, trocas) {
  const usos = trocas.map(() => 0);
  const linhas = vtt.replace(/\r/g, '').split('\n').map((l, i) => {
    if (i === 0 || l.includes('-->') || /^(Kind|Language):/.test(l)) return l;
    let t = l.replace(/<[^>]+>/g, '');
    trocas.forEach(({ de, para }, k) => {
      const n = t.split(de).length - 1;
      if (n) { usos[k] += n; t = t.split(de).join(para); }
    });
    return t;
  });
  return { vtt: linhas.join('\n'), naoAchadas: trocas.filter((_, k) => !usos[k]) };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [arquivo, json] = process.argv.slice(2);
  const { vtt, naoAchadas } = aplicarTrocas(readFileSync(arquivo, 'utf8'), JSON.parse(readFileSync(json, 'utf8')));
  writeFileSync(arquivo, vtt);
  for (const t of naoAchadas) console.error(`não achei: "${t.de}"`);
  process.exit(naoAchadas.length ? 1 : 0);
}
