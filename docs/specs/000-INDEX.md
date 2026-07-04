---
id: 000-INDEX
titulo: Índice Mestre — LifeOS / Terminal Evolutivo
versao: 1.0.0
atualizado: 2026-07-04
---

# 000-INDEX — Arquitetura de Especificações

Fonte de alto nível: `docs/gdd-lifeos-terminal-evolutivo.md` (leitura HUMANA;
agentes NUNCA recebem o GDD — só os docs desta árvore).
Regras da árvore: docs ≤150 linhas (~1,5k tokens); autocontidos; comunicação
entre módulos só por contratos (CTR-*). Templates em `01-templates/`.
Obs.: a pasta `pages/` neste diretório pertence a outros projetos do site.

## Estado da geração
✅ = gerado e validado · ⬜ = pendente (gerar com TPL-spec + dieta indicada)

### 00-project — Fundação (Fases 0–4) ✅
| Doc | Conteúdo |
|---|---|
| ✅ P00-analise | Objetivos, escopo, riscos, premissas biográficas invariantes |
| ✅ P01-blueprint | Arquitetura macro, bounded contexts, fluxo principal |
| ✅ P02-componentes | Registro CMP-01..18 (responsabilidade, I/O, deps) |
| ✅ P03-grafo-dependencias | Camadas, matriz de eventos, proibições, caminho crítico |
| ✅ P04-plano-agentico | Agentes A1–A11, reviewers R1–R5, waves, dietas |

### 01-templates ✅  TPL-spec · TPL-contrato · TPL-adr · TPL-task

### 02-contracts ✅ (CTR-01..08)
story-data · eventos · arc-theme · telemetria · cli · avatar · audio-cues · session-state

### 03-narrative ✅  NAR-01 (marcos 1–6) · NAR-02 (7–12) · NAR-03 (git-ops)
### 04-gameplay ✅  GMP-01 (revelação) · GMP-02 (hold) · GMP-03/04 (Vale) · GMP-05 (rails)
### 05-rendering ✅  RND-01 (core) · RND-02 (grid/cicatrizes) · RND-03 (partículas) · RND-04 (postfx)
### 06-avatar ✅  AVT-01 (v1–3) · AVT-02 (v4–5 + queda de cabelo)
### 07-audio ✅  AUD-01 (cadeias/SFX) · AUD-02 (cues do Vale)
### 08-companion ✅  CAI-01 (comportamento) · CAI-02 (persona/diálogos)
### 09-cli ✅  CLI-01 (terminal) · CLI-02 (composer mobile)
### 10-ui ✅  UI-01 (dashboard) · UI-02 (estados de atenção) · UI-03 (log)
### 11-a11y ✅  ACC-01 · 12-perf ✅ PRF-01 · 13-testing ✅ TST-01
### 14-adr ✅  ADR-001 (sem build) · ADR-002 (cicatrizes) · ADR-003 (eventbus)
### 15-backlog ✅ BKL-01 (MVP, 13 tarefas) · BKL-02 (Alpha, 12) · BKL-03 (Beta+RC) · RMP-01 (roadmap com gates)
### 16-agents ✅  AGT-01 (modelo A3) · AGT-02 (reviewers R1–R5) · AGT-03 (deltas A1–A11)
### 17-security ✅ SEC-01 (hardening: textContent, CSP, save hostil, SRI)
### 18-observability 🟡 OBS-01 (telemetria real — rascunho; ativação é decisão do dono)

## Estado da implementação (BKL-01 — MVP)
✅ Implementado em `src/lifeos/` (13 módulos, 1.530 linhas) + entry `src/lifeos.html`:
bus, session, a11y, dados (CTR-01/03/04/06), story engine, scene core+input,
audio (4 cadeias+SFX), grid c/ cicatrizes, partículas (4 modos), postfx CRT
c/ safe-mode+fallback, avatar v1–v5, monolito (reveal+hold 3 ciclos), dashboard
(AMBIENT/PAGED/FOCUS). Testes: `tests/t1-t3.test.mjs` (16 verdes). SEC-01 grep: limpo.
⬜ Próximo: validação visual em navegador (T4/T5 exigem WebGL) → BKL-02 (Alpha).

## Docs com gate humano pendente
| Doc | Status | Ação do dono |
|---|---|---|
| 🟡 NAR-04-textos-integrais | 1.0.0-rc rascunho | Aprovar strings → status aprovado (gate do RC — BKL-rc-02) |
| 🟡 OBS-01 | 0.1.0 rascunho | Decidir se ativa coleta pós-produção |
| D-01/D-02 (P00 §Dúvidas) | abertas | Rota final (`/lifeos.html`?) e fotos |

## Como usar esta árvore (orquestração)
1. Emitir tarefas de BKL-01 na sequência declarada (P04 §Waves); prompt =
   AGT-01 + delta de AGT-03 + dieta da tarefa (conteúdo injetado, ≤7,5k tokens).
2. Artefato → reviewer(s) da wave (AGT-02). REPROVADO 2× → suspeitar de lacuna
   de spec (P04 §Escalação).
3. Gate de etapa: RMP-01. Matriz TST-02 fecha o release.

## Validação executada (Fases 12–13, árvore completa)
- IDs citados × arquivos: OK — zero referências órfãs (BKL-04 citado apenas
  como hipótese em RMP-01 §Pós, sem compromisso).
- Limite de linhas: máx. 90/150 por doc. Eventos: padrão `dominio:acao`.
- Terminologia: "marco" (fase narrativa) ≠ "versão" (avatar) ≠ "arco" (tema).
- Fatos biográficos: conferidos contra P00 §Premissas.
- Total: 60 documentos, máx. 90 linhas (~1,1k tokens médios/doc) — dieta de 5 docs cabe em 8k.
