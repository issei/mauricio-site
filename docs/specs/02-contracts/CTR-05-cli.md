---
id: CTR-05
titulo: Contrato de Comandos CLI
versao: 1.0.0
status: aprovado
produtores: [CMP-10]
consumidores: [CMP-08, CMP-09, CMP-12, CMP-18]
---

# CTR-05 — Comandos CLI

## Propósito
Gramática completa do terminal. O parser (CMP-10) valida e publica `cli:command`
(CTR-02); executores assinam e agem. O parser NUNCA executa lógica de domínio.

## Comandos
| Comando | Args | Executor | Efeito |
|---|---|---|---|
| `help` | — | CMP-10 | Lista comandos com 1 linha cada |
| `clear` | — | CMP-10 | Limpa o painel |
| `cd <ano>` | int válido em CTR-01 | CMP-08 | Teleporta ao quadrante; `via:"cd"` |
| `ls memories` | — | CMP-10 | Desbloqueadas por `cliId`; futuras: `<bloqueado>` |
| `cat <id>` | id ou cliId | CMP-10 | Log completo de memória desbloqueada |
| `git log` | — | CMP-08 | Grafo ASCII dos branches até a fase atual |
| `git blame <ano>` | int | CMP-12 | Companion responde quem "escreveu" aquela fase |
| `top` | — | CMP-09 | Expande dashboard + lista processos vivos |
| `ask "<pergunta>"` | string | CMP-12 | Resposta do Companion via base de marcos, typewriter |
| `config set <k> <v>` | `safe-mode on\|off`, `motion reduced\|full` | CMP-18 | Flags de acessibilidade |
| `git add saude.self` | — | CMP-14 | Só na fase 11, estado conflito (GMP-04) |
| `git merge --continue` | — | CMP-14 | Só após `git add saude.self` |

## Regras do parser
1. Case-insensitive; trim; múltiplos espaços colapsam.
2. Comando desconhecido → `comando não encontrado: <raw>. tente 'help'.` (nunca exceção).
3. Args inválidos → mensagem específica do comando + exemplo de uso.
4. Input com HTML/escape → sanitizado (render como texto puro, nunca innerHTML).
5. Histórico ↑/↓ (pilha máx. 50); Tab autocompleta contra comandos + anos + ids.
6. Fase 11 em conflito: TODOS os comandos exceto os dois de merge (e `help`)
   retornam `> não há rota ao redor. só através.`

## Estados do painel
`closed` → (tecla `'` ou botão `>_`) → `open` (movimento suprimido) → `closed`.
Fase 11: estado especial `forced-open` (GMP-04) — não fechável até `vale:merge-resolved`.

## Mobile
Sem teclado do SO na fase 11: composer por tokens (CLI-02). Fora dela, o painel
usa input de texto padrão com autocomplete por chips tocáveis.
