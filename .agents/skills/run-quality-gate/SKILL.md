---
name: run-quality-gate
description: Como rodar o quality gate da página engenharia-agentes-ia e interpretar falhas antes de commit/push.
allowed-tools: [bash, read]
triggers: ['rodar gate', 'quality gate', 'validar antes do push', 'testes eai']
---

# Quality Gate — engenharia-agentes-ia

Gate único, offline e determinístico. **Verde obrigatório antes de qualquer push na `main`.**

## Comandos
```bash
node scripts/quality-gate.mjs                       # build + Playwright + axe (completo)
node scripts/quality-gate.mjs --no-build            # só testes (iteração rápida)
node scripts/quality-gate.mjs --grep "EAI" --project chromium   # foco em 1 navegador
```
Atalhos npm equivalentes: `npm run gate`, `npm test`.

## O que ele roda
1. `vite build` — falha de build = vermelho (pega erro de markup/import).
2. `playwright test` — smoke + comportamento por seção + acessibilidade (`@axe-core/playwright`,
   bloqueia violações serious/critical), em chromium/firefox/webkit, com mobile e reduced-motion.

## Interpretando falhas
- **Build falhou:** erro de import/HTML/CSS. Corrija o arquivo apontado.
- **Teste de comportamento:** seletor/ID/âncora divergente do contrato da WU — alinhe markup ↔ teste.
- **axe serious/critical:** ver resumo na mensagem (contraste, label, landmark, foco). Corrija o markup.
- **overflow horizontal (mobile):** algum elemento estoura 375px — revise larguras/`overflow`.

## Regra
Máximo **3** idas ao gate por WU. Persistiu vermelho → registre `BLOCKED:` em
`.ai/state/PROGRESS.md` e pare num ponto seguro (fail-closed). Nunca commitar com gate vermelho;
nunca `--force`.
