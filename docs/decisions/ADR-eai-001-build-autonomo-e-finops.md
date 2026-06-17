# ADR-eai-001 — Build autônomo, FinOps de tokens e política de push

- **Status:** Aceito
- **Data:** 2026-06-17
- **Escopo:** construção da página `src/engenharia-agentes-ia.html` e auxiliares
- **Contexto-fonte:** `docs/specs/pages/engenharia-agentes-ia/BUILD_PLAN.md`,
  `guia-agent-driven-development.md`, `guia-engenharia-agentes-ia.md`

## Contexto

A página será construída de forma **autônoma** por agente, a partir de 12 SDDs, aplicando ao próprio
processo os princípios que o site ensina (dogfooding). É preciso fixar três decisões que afetam custo
e produção.

## Decisões

1. **Loop determinístico por Work Unit.** Fluxo fixo `PROGRESS → DoR → teste → código → gate → commit
   → push → estado`. O agente decide *como* implementar uma fatia, nunca *qual* vem a seguir fora da
   fila do `PROGRESS.md`. Estado cognitivo (`.ai/`) versionado no Git (rollback de código + cognição).

2. **FinOps — perfil Moderado, fail-and-stop.** Ledger de tokens por onda no `PROGRESS.md`. A onda
   fecha **algumas** WUs e **para para revisão humana**. Limite de **3** tentativas ao gate por WU;
   estourou → `BLOCKED:` e parada limpa (não insiste em loop, evitando fatura inesperada). Sem
   orçamento ⇒ não inicia nova WU (classe "pendente por orçamento", reprocessável).

3. **Model routing.** Opus 4.8 para arquitetura, design visual e revisão editorial; Sonnet para
   componentes especificados; Haiku para trabalho mecânico; subagentes Explore/Plan (read-only) para
   manter o contexto principal enxuto. Higiene de contexto: 1 WU por sessão, ler só o SDD da WU,
   aproveitar cache de prompt, edições cirúrgicas.

4. **Push direto na `main` a cada WU verde.** `main` dispara deploy a produção (`deploy.yml`). Por
   isso: **gate local verde obrigatório** antes de todo push; **CI de teste** (`test.yml`) como 2ª
   rede; WU incompleta atrás de `noindex` + seção `hidden`/fora do menu até "abrir as cortinas".
   Nunca `--force`.

5. **Tema somente dark.** Adere ao guardrail do `AGENTS.md` ("Pure Dark Mode"). O modo claro descrito
   no doc 07 fica **diferido** (fora do escopo deste build). Contraste AA verificado só no escuro.

## Alternativas consideradas

- **Branch `preview` + promoção manual** (staging): rejeitada a pedido do dono — preferiu publicação
  contínua na `main` por WU verde, com flag `noindex`/`hidden` como salvaguarda.
- **Modo claro opt-in** (exceção ao `AGENTS.md`): rejeitada — manter dark-only simplifica o build.

## Consequências

- (+) Entrega incremental, auditável e reversível; custo de tokens governado.
- (+) Regressões barradas pelo gate (local + CI) antes de afetar produção visível.
- (−) Cada WU verde publica em produção: exige disciplina de flag para não expor seção meio-pronta.
- (−) Modo claro indisponível até decisão futura (novo ADR para reativar).
