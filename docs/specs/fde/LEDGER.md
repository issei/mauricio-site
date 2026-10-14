# Ledger de consumo — reposicionamento FDE

Uma linha por WU, preenchida ao fim da sessão que a executou. Serve para ajustar as camadas de
modelo (PLANO §5.1) com números, não com impressão. Mesma ideia do "ledger de quota" defendido em
`engenharia-agentes-ia`.

Como medir:
- **Custo/tokens:** `/cost` (API) ou `/usage` (assinatura) no fim da sessão.
- **RTK:** `rtk gain` (economia acumulada; anotar a diferença desde a linha anterior).
- **Contexto:** pico de uso da janela visto na sessão; meta é ficar abaixo de 50% (relatório `learn` do Caveman de 03/09 mediu 81% dos turnos acima disso).
- **Gate:** quantas rodadas de `npm run gate` até verde.

| WU | Data | Onde rodou | Modelo da sessão | Subagentes (modelo) | Tokens / custo | RTK (Δ) | Pico de contexto | Rodadas de gate | Observação |
|---|---|---|---|---|---|---|---|---|---|
| 0+1 | 2026-10-14 | nuvem (tópico do projeto) | camada de decisão | nenhum | não medido | não usado | — | 0 (só docs) | Spec, ADR, questionários, subagentes e este ledger. Nenhum ativo público alterado; sem `/en/`. |
