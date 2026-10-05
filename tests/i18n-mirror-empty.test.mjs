// Espelho EN não pode perder texto (auditoria-v2, AV2-10). O tradutor antigo devolvia vazio para segmento que abre
// com emoji/símbolo ("⛔ Guardrails…", "✅ core") e o espelho saía com <h3></h3>, <p></p>, <td><span></span></td>.
// O motor foi corrigido (fallback para o PT), mas o manifesto só olha o hash da fonte: espelho gerado antes da
// correção nunca era refeito. Retraduzir tudo a cada mudança do motor gera ruído (medido: 650 linhas em 41
// arquivos), então a guarda é sobre o sintoma, barata e sem Python: o EN não tem mais elementos de texto
// vazios que a sua fonte PT.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const VAZIO = /<(h[1-6]|p|div|span|td|th|a|button|li|summary|label|strong|em|code)\b[^>]*>\s*<\/\1>/gi;
const conta = (arquivo) => (readFileSync(arquivo, 'utf8').match(VAZIO) || []).length;

test('nenhum espelho EN tem mais elementos de texto vazios que a fonte PT', () => {
  const ruins = readdirSync('src/en')
    .filter((f) => f.endsWith('.html'))
    .map((f) => ({ f, pt: conta(`src/${f}`), en: conta(`src/en/${f}`) }))
    .filter(({ pt, en }) => en > pt)
    .map(({ f, pt, en }) => `${f}: PT ${pt}, EN ${en} — rode \`node scripts/sync-i18n.mjs --files src/${f}\``);
  assert.deepEqual(ruins, []);
});
