---
id: UI-04
titulo: Modal de Memória — Layout e DOM
versao: 1.0.0
status: aprovado
dominio: ui
depende-de: [GMP-01, GMP-02, ACC-01, CTR-01]
consumido-por: [A8]
---

# UI-04 — Modal de Memória

## Contexto
Camada DOM que exibe a memória decodificada (imagem + texto). A LÓGICA do
decode (passos, hold, corrupção) é de GMP-01/02 — este doc define estrutura,
layout e acessibilidade do contêiner.

## Regras — estrutura
- RG-01 DOM: `#modal` overlay fixo → `.modal-frame` (borda 1px no accent do
  arco, fundo `#0a0706` a 96%) → `.modal-canvas` (decode da imagem, 1 canvas
  global reutilizado — PRF-01 RG-03) → `#decode-status` (rótulo percentual,
  fonte mono) → `.modal-period` (period de CTR-01) → `.modal-title` →
  `.modal-text` (typewriter) → `.modal-close` (`[ESC] fechar` / botão touch).
- RG-02 Layout: desktop = imagem à esquerda (máx. 46vw), texto à direita;
  mobile (<640px) = empilhado, imagem máx. 38vh, texto rolável abaixo.
- RG-03 Tipografia: títulos VT323, corpo Share Tech Mono (herdadas do site);
  corpo ≥14px mobile / ≥16px desktop; largura de linha máx. 68ch.
- RG-04 Estados visuais (dirigidos por GMP-01/02): `decoding` (status ativo,
  fechar desabilitado), `holding` (prompt de sustentação em destaque — GMP-02
  RG-01), `revealed` (fechar habilitado, foco no botão).
- RG-05 Abertura/fechamento: fade+scale 0,98→1 em 250ms; FOCUS de UI-02
  acionado pelo evento, não pelo modal (o modal não conhece o HUD).

## Regras — acessibilidade
- RG-06 `role="dialog"` `aria-modal="true"`; foco preso no modal; ESC fecha
  (quando `revealed`); retorno de foco ao elemento anterior.
- RG-07 Texto completo em `aria-live="polite"` injetado APÓS o typewriter
  terminar (leitor de tela recebe a versão inteira, sem os backspaces — os
  erros corrigidos de GMP-02 RG-05 são efeito visual, não conteúdo).
- RG-08 `alt` da imagem: campo `image.alt` de CTR-01. Em decode corrompido, o
  alt não muda (descreve a foto final, não o glitch).
- RG-09 Alvo de fechar ≥48px; hold no mobile: a área inteira do modal é alvo
  (GMP-02 RG-06).

## Casos extremos
- Texto maior que o espaço (mobile): rolagem interna apenas em `.modal-text`;
  o typewriter auto-rola acompanhando o cursor.
- Rotação de tela com modal aberto: re-layout sem reiniciar decode.
- Fechar durante typewriter (permitido após imagem completa): texto completa
  instantâneo, `memory:unlocked` publica normalmente — nunca memória "meio lida".

## Critérios de aceite
- [ ] 1 único canvas de decode em toda a sessão (profiler).
- [ ] Foco preso e restaurado (teste de teclado completo).
- [ ] Leitor de tela recebe texto integral sem artefatos de corrupção.
- [ ] Fechar antecipado não quebra desbloqueio nem sequência de fase.
