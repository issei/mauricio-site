---
id: CLI-02
titulo: Terminal — Composer por Tokens (Mobile)
versao: 1.0.0
status: aprovado
dominio: cli
depende-de: [CLI-01, CTR-05, GMP-04]
consumido-por: [A9]
---

# CLI-02 — Composer Mobile

## Contexto
Na fase 11, o merge exige comandos digitados — mas invocar o teclado do SO no
mobile cobre metade da tela e mata o silêncio da cena. Solução: compor os
comandos tocando tokens. Princípio: a intencionalidade é o requisito; a
ortografia, não.

## Objetivo
Fluxo do merge conflict 100% completável por toque, com a mesma carga de
deliberação do desktop.

## Regras
- RG-01 Ativação: dispositivos touch sem teclado físico detectado (heurística:
  `pointer: coarse` + sem evento keydown nos últimos 30s) E fase 11 em
  `forced-open`. Fora disso, CLI mobile usa input de texto padrão com chips de
  autocomplete tocáveis.
- RG-02 Tokens do comando corrente exibidos embaralhados como fragmentos
  flutuantes no painel (estilo visual das partículas de glifo — mesma fonte,
  glow suave): para o passo 1: `git` `add` `saude.self` + 2 distratores
  (`commit`, `--force`); passo 2: `git` `merge` `--continue` + distratores
  (`rebase`, `--abort`).
- RG-03 Toque em token correto: beep de tecla; token voa (300ms) para a linha
  de prompt e é "digitado" com typewriter. Toque em errado/fora de ordem:
  glitch curto de 150ms no token (safe-mode: pulso de opacidade), retorna ao
  lugar; sem punição.
- RG-04 Distratores escolhidos por significado: `--force` e `--abort` são as
  tentações narrativas (forçar sem cuidar / desistir). Tocar 2× no mesmo
  distrator imprime resposta única: `--force`: "> forçar já foi tentado. por
  anos." · `--abort`: "> abortar não está no seu histórico."
- RG-05 Área de toque mínima por token: 48×48px (WCAG). Espaçamento ≥12px.
- RG-06 A cada 3 erros: comando esperado aparece como dica fantasma na linha
  de prompt (paridade com GMP-04 §extremos).
- RG-07 Fora da fase 11, o composer NUNCA aparece (é linguagem do Vale).

## Interfaces
- Publica: `cli:command` idêntico ao fluxo digitado (executores não sabem a
  origem).
- Lê: `a11yFlags` (glitch → pulso).

## Casos extremos
- Tablet com teclado bluetooth conectado no meio: aceitar AMBOS os inputs
  simultaneamente (digitar OU tocar).
- Rotação de tela no meio: re-layout dos tokens preservando os já compostos.
- Leitor de tela: tokens são buttons com aria-label do texto; ordem de foco =
  ordem correta do comando (acessibilidade > desafio, decisão deliberada).

## Critérios de aceite
- [ ] Teclado do SO nunca invocado na fase 11 (nenhum focus em input de texto).
- [ ] Payload de `cli:command` idêntico entre digitado e composto.
- [ ] Alvos ≥48px; navegável por leitor de tela.
- [ ] Distratores respondem com as falas literais de RG-04.
