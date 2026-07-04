---
id: TPL-spec
titulo: Template de Especificação
versao: 1.0.0
status: aprovado
---

# TPL — Template de Especificação

Copiar este esqueleto para toda spec nova. Limite duro: 150 linhas.
Regra de autocontenção: um agente que leia SÓ este documento (+ contratos citados)
deve conseguir implementar sem perguntar nada.

```markdown
---
id: <DOM-nn>                      # ex.: RND-02
titulo: <nome curto>
versao: 1.0.0
status: rascunho|aprovado|obsoleto
dominio: <narrative|gameplay|rendering|avatar|audio|companion|cli|ui|a11y|perf|test>
depende-de: [<ids>]               # contratos e specs REALMENTE necessários
consumido-por: [<agentes>]        # ver P04
---

# <ID> — <Título>

## Contexto
2–4 linhas situando o leitor que não viu nenhum outro documento.
O que é o jogo, o que é este componente, por que existe.

## Objetivo
1 frase. O resultado observável quando estiver pronto.

## Escopo / Fora de escopo
O que este documento cobre; o que pertence a outro (citar ID).

## Regras
Numeradas (RG-01, RG-02…). Comportamento normativo, sem justificativa longa.
Valores concretos SEMPRE (nada de "rápido", "suave" — usar ms, %, unidades).

## Interfaces
- Eventos publicados / assinados (nomes exatos do CTR-02, com payload).
- Estado global lido (nome exato, ver P02 §Estados).
- Uniforms/APIs expostos, se aplicável.

## Casos extremos
Mínimo 3. O que acontece quando X falha, é 0, é repetido, é mobile.

## Critérios de aceite
Checklist verificável ([ ] frases testáveis, sem subjetividade).

## Referências
IDs relacionados para aprofundamento (leitura OPCIONAL).
```
