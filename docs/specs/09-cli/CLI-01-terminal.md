---
id: CLI-01
titulo: Terminal — UX do Painel e Execução de Comandos
versao: 1.0.0
status: aprovado
dominio: cli
depende-de: [CTR-05, CTR-02]
consumido-por: [A9]
---

# CLI-01 — Terminal UX

## Contexto
Painel Quake-style (desliza do topo) com CLI funcional. Gramática e executores
em CTR-05; aqui, o comportamento de interface.

## Objetivo
Terminal que parece um terminal de verdade — resposta imediata, falha graciosa,
sem nunca quebrar o estado do jogo.

## Regras
- RG-01 Toggle: tecla `'` ou botão `>_` no HUD. Animação: translateY 250ms
  ease-out. Publicar `cli:opened/closed`.
- RG-02 Foco: ao abrir, input recebe foco; movimento suprimido (RND-01 RG-05).
  ESC ou toggle fecha (exceto `forced-open` — CTR-05).
- RG-03 Render de saída: linhas com no máx. 80 colunas; quebra de palavra;
  scroll interno máx. 200 linhas (FIFO). SEMPRE textContent, nunca innerHTML.
- RG-04 Autocomplete: Tab completa contra árvore de comandos + anos + ids
  válidos; múltiplos candidatos → listar em linha única (estilo bash).
- RG-05 Histórico: ↑/↓ navega pilha (máx. 50); edição de linha básica
  (Home/End/Backspace).
- RG-06 Latência: eco do caractere <16ms; execução de comando <100ms ou
  imprimir feedback intermediário (`…`).
- RG-07 Beep por tecla via `sfx.beep` (AUD-01), throttle 30ms.
- RG-08 Saídas longas (`git log`, `cat`): impressão em blocos de 4 linhas por
  frame (efeito de terminal real, sem travar o main thread).
- RG-09 Erros: sempre no formato `> <mensagem em minúsculas>. tente 'help'.`
  — nunca stack trace, nunca exceção não capturada (try/catch no dispatcher).
- RG-10 Painel ocupa máx. 55% da altura; mundo 3D visível abaixo (o jogo nunca
  desaparece — exceto `forced-open` da fase 11: 100%).

## Interfaces
- Publica: `cli:opened`, `cli:closed`, `cli:command`.
- Assina: `avatar:version-changed` (imprime changelog), eventos com saída
  roteada ao painel quando aberto.

## Casos extremos
- Colar 10k caracteres no input: truncar a 200, avisar.
- Comando durante transição de fase: enfileirar até `phase:changed` completar.
- Abrir CLI durante modal de memória: bloqueado (modal tem prioridade); botão
  `>_` desabilitado visualmente.
- Spam de toggle: debounce 300ms.

## Critérios de aceite
- [ ] Fuzzing de 1.000 inputs aleatórios sem exceção não capturada (TST-01).
- [ ] Nenhum innerHTML em todo o componente.
- [ ] `forced-open` intransponível até `vale:merge-resolved`.
- [ ] Eco de tecla <16ms medido.
