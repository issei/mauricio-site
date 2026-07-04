---
id: NAR-03
titulo: Operações Git como Eventos Jogáveis
versao: 1.0.0
status: aprovado
dominio: narrative
depende-de: [CTR-01, CTR-02]
consumido-por: [A4, A5]
---

# NAR-03 — Operações Git

## Contexto
A biografia é modelada como árvore Git com 2 branches (pessoal rosa `#ff77c8`,
profissional verde `#4dff9c`). Cada `marco.gitOp` (CTR-01) tem manifestação
física no corredor (geometria em GMP-05) e textual no CLI.

## Tabela de operações
| gitOp | Marco | Manifestação física | Manifestação CLI |
|---|---|---|---|
| `merge` | 8 (e 7, simbólico) | Trilhos curvam e se tocam em nó luminoso sob o Monolito; depois seguem trançados | Prompt de PR interativo (aprovar com [ENTER]) |
| `conflict` | 5 | Trilhos sobrepostos piscando `#ff3344` alternado; marcadores `<<<<<<<`/`>>>>>>>` flutuantes; zigue-zague forçado | Bloco de conflito impresso ao entrar; `resolved:` ao sair |
| `panic` | 6 | Não é operação: host down. Corredor escurece 60%; fissura scar-2004 abre | `[FATAL] host origem: unreachable.` (única linha FATAL do jogo) |
| `cherry-pick` | 10 | Glifo de commit viaja visualmente do quadrante 4 (ao longe) até o avatar | Log do cherry-pick com origem/destino/conflitos: nenhum |
| `rebase` | 11 | Corredor à frente reconstruído plataforma a plataforma, cada uma com nome de empresa (`sysgen`→`telefonica`→`indra`→`serasa`→`rede`) e hash novo; laranja-Rede (`#ff8c00`) tinge o accent | `git rebase --onto rede/main` com replay listado |

## Texto do prompt de PR (marco 8 — literal)
```
> PULL REQUEST #2011: merge feature/personal-lifestyle → main
> Reviewer: coração. Checks: férias vendidas ✓, bônus investido ✓,
>          lua de mel curta porém inteira ✓
> [ENTER] para aprovar. (Este merge não tem botão de revert.)
```

## Texto do conflito (marco 5 — literal)
```
<<<<<<< feature/professional-stack
    turno_diurno: callcenter.atendimento(usuarios_perdidos_na_discada)
=======
    turno_noturno: mackenzie.sistemas_de_informacao(materias_atrasadas)
>>>>>>> feature/personal-lifestyle
```

## Saída do `git log` (grafo ASCII até a fase corrente)
Renderizar os marcos desbloqueados no formato do grafo de P01/GDD §3.2, cortado
na fase atual; marcos futuros não aparecem (nem mascarados).

## Regras
1. `gitOp` de marcos não alcançados nunca vaza em nenhum comando.
2. Cores de conflito/merge vêm de CTR-03 §Cores fixas — nunca do accent do arco.
3. O rebase (11) só inicia no Ato III (GMP-04) — nunca na entrada da fase.

## Critérios de aceite
- [ ] Textos de PR e conflito idênticos aos literais acima.
- [ ] `git log` corta na fase atual.
- [ ] Única linha `[FATAL]` do jogo inteiro está no marco 6.
