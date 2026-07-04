---
id: TPL-contrato
titulo: Template de Contrato
versao: 1.0.0
status: aprovado
---

# TPL — Template de Contrato

Contratos definem COMO módulos conversam. Nunca contêm lógica ou narrativa —
apenas formas de dados, nomes canônicos e regras de compatibilidade.

```markdown
---
id: CTR-nn
titulo: <nome>
versao: 1.0.0                 # semver: MAJOR quebra consumidor; MINOR adiciona campo
status: aprovado
produtores: [<CMP-ids>]
consumidores: [<CMP-ids>]
---

# CTR-nn — <Título>

## Propósito
1–2 linhas: que fronteira este contrato governa.

## Schema
Formato JSON/pseudotipo com TODOS os campos, tipos, obrigatoriedade e exemplo real.

## Regras de validação
Restrições que produtores DEVEM garantir e consumidores PODEM assumir.

## Compatibilidade e versionamento
O que constitui breaking change; como depreciar um campo.

## Exemplo canônico completo
Um payload real do projeto, copiável.
```

## Regras globais de nomenclatura (valem para todos os contratos)
- Eventos: `dominio:acao-em-kebab` (ex.: `monolith:reveal-start`). Sempre minúsculo.
- IDs de fase: snake_case herdado do site (`wedding`, `fork_twins_x2`).
- Campos de schema: camelCase. Constantes: SCREAMING_SNAKE.
- Cores: hex minúsculo com `#`. Tempos: ms (inteiro). Ângulos: graus.
- Proibido sinônimo: "marco" = fase narrativa (nunca "nível", que é do avatar);
  "versão" = do avatar (v1–v5); "arco" = um de: infancia|tecnologia|familia|maturidade.
