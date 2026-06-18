# PROGRESS — Melhorias EAI

> Estado de execução da `SPEC_eai_melhorias.md`. Atualizado após cada tarefa.
> Stack real do projeto: **Vite** (root `src/`, build → `dist/`) + **Playwright** (E2E/a11y).
> Fontes editadas in-place em `src/` (não na raiz, como a spec abstrai).

## Estado atual
- [x] T0 — Setup: PROGRESS.md, fixtures, split de lógica pura em módulos testáveis
- [x] T7 — Testes (escritos primeiro, como especificação executável)
- [x] T3 — Simulador: fórmulas transparentes + painel de explicação + tooltips
- [x] T2 — Quiz: perguntas contextualizadas + feedback que ensina
- [x] T5 — Playground: feedback real por componente (last-action + warnings)
- [x] T4 — Pipeline & resiliência: intro, glossário inline e descrições por cenário
- [x] T6 — Anatomia do repositório: árvore visual interativa
- [x] T1 — Trilha: conteúdo dos capítulos expandido

## Decisões de arquitetura (não pedidas explicitamente, mas necessárias)

### D1 — Framework de teste: `node:test` (built-in), não Vitest
A spec sugere "Vitest ou equivalente". O projeto já usa **Playwright** e Node 22.
`node --test` é zero-config, zero-dependência e roda os testes de lógica pura
(SimModel, PlaygroundRules, QuizData, RepoTree). As interações de DOM
(clique na árvore atualiza painel, expand/collapse, painel de explicação do sim)
ficam em Playwright, que já tem browser real. Decisão: **nenhuma dependência nova**.

### D2 — Separação lógica-pura × bootstrap-DOM
Para testar em Node sem `document`, cada feature foi dividida:
- `eai-sim-model.js` (puro: `SIM_MODEL` + `score`)  ← `eai-sim.js` (DOM)
- `eai-playground-rules.js` (puro: `evaluate`, `warningsFor`, `insightFor`) ← `eai-playground.js` (DOM)
- `eai-quiz-data.js` (puro: `QUIZ`, `feedbackFor`, `scoreMessage`) ← `eai-quiz.js` (DOM)
- `eai-anatomy-data.js` (puro: `REPO_TREE`, `walk`) ← `eai-anatomy.js` (DOM)
Os módulos puros não tocam `document`, então importam limpo em Node.

### D3 — `sim-model.json` é a fonte da verdade do simulador
O modelo do simulador agora é **dados**, não fórmulas espalhadas. `eai-sim-model.js`
calcula a partir de `SIM_MODEL`; `tests/fixtures/sim-model.json` espelha esses dados.
O painel de explicação (XAI) lê as mesmas `razao` — o site passa a seguir o próprio P10.
Pisos por métrica: custo ≥ 30, risco ≥ 40 (são mínimos do sistema, não zero).

### D4 — Playground NÃO mostra pontuação numérica (reflexão T5)
Decisão: **não** exibir "Arquitetura: 7/10". Um número agregado cria ilusão de
precisão e contradiz P10 (explique, não exponha o número) e P7 (open-world).
Em vez disso: veredito qualitativo + lista de consequências específicas por regra.
Mantive o conjunto-superset de regras (spec ARCH_WARNINGS + regra P8 "LLM sem Ledger")
para que tanto os critérios de aceite novos quanto os testes E2E existentes fiquem verdes.

## Aprendizados acumulados
- O `score()` antigo usava constantes diferentes do `sim-model.json` da spec
  (cache −18 vs −20, schema risco −20 vs −15). Alinhei tudo ao json documentado;
  os pisos viraram **por métrica** (custo 30, risco 40), o que torna verdadeiras as
  asserções "custo nunca < 30" e "Cache reduz custo em exatamente 20".
- Os testes E2E existentes acoplavam-se ao texto do feedback ("Quase"/"Correto",
  "Dead-Letter", "determinístico"). Ao enriquecer os textos (T2/T4), atualizei essas
  asserções para o novo conteúdo — comportamento evolui, teste acompanha.
- `previsibilidade` não estava no `sim-model.json` da spec; estendi o modelo com
  efeitos de previsibilidade documentados (senão a métrica ficaria estática).

## Bloqueios
(nenhum)

## Definition of Done — verificação final
- [x] PROGRESS.md reflete o estado real das 7 tarefas
- [x] Todos os testes de lógica pura passam (`npm run test:unit` → 25/25)
- [x] Quality gate verde: build + 126 testes Playwright em Chrome, Firefox e WebKit
- [x] autonomia=0 + guardrails desmarcados → painel exibe a razão dos pisos (custo≥30, risco≥40)
- [x] Quiz Q2 (Open-World) tem feedback específico para A, B e C
- [x] RAG sem Schema no playground exibe alerta de risco
- [x] Clicar em PROGRESS.md na árvore mostra sua descrição no painel
- [x] Capítulo 3 (Cérebro × Vitrine) tem >150 palavras com a analogia cozinha/salão
- [x] Pipeline & resiliência tem glossário inline de Saga, DLQ e Confiança
- [x] Site abre sem erros de console (teste de console na carga, 3 navegadores)

## Retrospectiva

1. **O que funcionou bem.** Separar lógica pura de bootstrap-DOM (D2) foi a melhor
   decisão: os módulos `eai-*-model/-rules/-data` viraram a especificação executável,
   testável em `node:test` sem browser, e o DOM ficou um shell fino. Escrever os testes
   primeiro (T7) tornou cada implementação quase óbvia — em especial os pisos por métrica
   do simulador, que só ficaram corretos porque o teste "custo nunca < 30" forçou a
   distinção entre piso e clamp em 0.

2. **O que custou mais do que o esperado.** O acoplamento dos testes E2E existentes ao
   *texto* do feedback antigo ("Quase"/"Correto") e a remoção do atributo `data-correct`
   do quiz. Enriquecer o conteúdo (T1/T2/T4) quebrou asserções que não eram sobre
   comportamento, e sim sobre cópia. Atualizá-las uma a uma foi o maior consumo de tempo.

3. **O que faria diferente.** Os testes E2E deveriam ter mirado em *contratos*
   (data-attributes, `data-state`) desde o início, não em substrings de texto. Os novos
   testes que escrevi seguem isso (`data-state="correct|wrong"`, `data-fail="m4"`),
   que sobreviverão a futuras reescritas de cópia.

4. **Melhoria não pedida que implementei.** (a) Realce visual da etapa que falha em cada
   cenário do pipeline (`data-fail` + CSS), tornando o diagrama didático sem texto extra.
   (b) Tooltip ⓘ com símbolo `aria-hidden` para não poluir o nome acessível do
   progressbar. (c) Mensagem de fechamento do quiz por faixa de score, linkando capítulos.
   (d) `sim-model.json` como espelho documental da fonte da verdade em JS.

5. **Consistência com os próprios princípios.** O site agora segue o que ensina:
   - **P10 (XAI):** o simulador explica *por que* cada métrica muda e a razão dos pisos —
     deixou de "expor o número" e passou a "explicar o driver".
   - **P2 (determinismo):** quiz, simulador e playground são funções puras determinísticas,
     cobertas por testes de reprodutibilidade.
   - **P5 (contratos):** os testes E2E agora verificam contratos (data-attributes), não cópia.
   - **P7 (open-world):** o playground nomeia lacunas ("LLM sem Schema", "RAG sem Schema")
     em vez de fingir que a arquitetura está completa; e recusou-se a dar uma nota numérica
     (D4) que fingiria uma precisão que não existe.
