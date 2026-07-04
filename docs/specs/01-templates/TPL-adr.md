---
id: TPL-adr
titulo: Template de ADR (Architecture Decision Record)
versao: 1.0.0
status: aprovado
---

# TPL — Template de ADR

```markdown
---
id: ADR-nnn
titulo: <decisão em 1 linha>
data: AAAA-MM-DD
status: proposto|aceito|substituído-por-ADR-nnn
---

# ADR-nnn — <Título>

## Contexto
Que problema forçou uma decisão. Fatos, não opiniões.

## Decisão
O que foi decidido, em 1–3 frases afirmativas.

## Alternativas consideradas
| Alternativa | Por que rejeitada |

## Consequências
- Positivas (o que fica mais simples).
- Negativas ASSUMIDAS (o custo aceito — obrigatório preencher).
- Componentes afetados (IDs).
```

Regra: nenhuma decisão estrutural entra numa spec sem ADR correspondente.
Specs citam ADRs; nunca re-explicam a justificativa.
