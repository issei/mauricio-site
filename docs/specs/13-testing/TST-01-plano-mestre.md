---
id: TST-01
titulo: Plano Mestre de Testes
versao: 1.0.0
status: aprovado
dominio: test
depende-de: [P02, P03]
consumido-por: [A11]
---

# TST-01 — Plano de Testes

## Contexto
Suíte multi-papel cobrindo os riscos definidos nas specs. Ferramentas: testes
unitários headless (parser, máquinas de estado, dados) + testes de integração
em navegador (Playwright ou similar) + análises automatizadas (luminância,
heap). Sem build step no produto; a suíte vive fora (`/tests`).

## Grupos de teste
### T1 — Dados e contratos (unitário)
- T1.1 STORY_DATA valida contra CTR-01 (unicidade, ordem contígua, enums,
  monotonicidade de avatarVersion, premissas P00 — anos corretos).
- T1.2 TELEMETRY_RULES cobre todos os telemetryKeys; limiares consistentes.
- T1.3 ARC_THEME: 4 arcos completos; nenhum hex de arco duplicado nas cores fixas.

### T2 — Parser CLI (unitário + fuzzing)
- T2.1 Todos os comandos de CTR-05 com args válidos/inválidos.
- T2.2 Fuzzing 1.000 inputs aleatórios (unicode, HTML, 10k chars): zero
  exceção não capturada; toda saída via textContent.
- T2.3 Fase 11 `forced-open`: só os 2 comandos (+help) funcionam.

### T3 — Máquinas de estado (unitário)
- T3.1 UI-02: nenhum estado inalcançável; prioridade FOCUS>PAGED>AMBIENT.
- T3.2 StoryEngine: transições walk/cd; memórias append-only.
- T3.3 SessionState: migração de schema, corrupção de JSON, localStorage negado.

### T4 — Coerência narrativa (integração)
- T4.1 Para cada fase: arco, accent, cadeia de áudio ativa (gain dominante),
  versão do avatar e telemetria sincronizados (snapshot por fase).
- T4.2 Regressão de avatar: children do Group após cada transição = apenas os
  da versão atual (CTR-06 RG-01); headset só no marco 4.
- T4.3 Cicatrizes: scar-2004 abre no 6, doura no 7; scar-2017 doura no 11;
  ambas presentes após reload e em revisitas.
- T4.4 Silêncios do Companion (3 janelas — CAI-01 RG-08): zero falas.

### T5 — O Vale (integração, o teste mais importante)
- T5.1 Gatilhos por posição (teleporte parcial dispara o subconjunto correto).
- T5.2 Anti-freeze: nenhum intervalo >1,5s sem mudança de pixel E de áudio
  durante hold (gravação de frames + análise).
- T5.3 Sequência intransponível entre `vale:act2` e `vale:merge-resolved`.
- T5.4 Silêncio VALE-04: 4s ±50ms de piso de ruído (análise de saída).
- T5.5 Fluxo mobile por tokens: payload `cli:command` idêntico ao digitado.
- T5.6 Reload no meio: reinicia no Ato I.

### T6 — Acessibilidade (automatizado + manual)
- T6.1 Luminância da sessão inteira: ≤3 flashes/s, WCAG 2.3.1 (ambos os modos).
- T6.2 Paridade de beats em safe-mode (checklist dos 12 marcos + Vale).
- T6.3 Contraste de todo texto ≥4,5:1; alvos touch ≥48px.

### T7 — Performance (perfil)
- T7.1 Heap estável (PRF-01); zero alocação em frame (instrumentação).
- T7.2 Degraus de fallback nos limiares (CPU/GPU throttle).
- T7.3 Áudio: zero requisições de rede; crossfades sem clipping.

## Regras
- RG-01 Todo PR de agente referencia os testes do grupo correspondente.
- RG-02 Gate de release: T1–T5 verdes; T6.1 e T7.1 verdes; T6.2 manual assinado.

## Critérios de aceite (da própria suíte)
- [ ] Cobertura: todo critério de aceite de spec mapeado a ≥1 teste (matriz).
- [ ] Suíte roda em CI local em <10min.
