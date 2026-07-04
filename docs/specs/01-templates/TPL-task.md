---
id: TPL-task
titulo: Template de Tarefa de Backlog
versao: 1.0.0
status: aprovado
---

# TPL — Template de Tarefa

Tarefas são a unidade de trabalho entregue a UM agente (P04). A tarefa deve ser
executável lendo apenas a própria tarefa + dieta listada.

```markdown
### BKL-<fase>-<nn> — <título imperativo>
- **Objetivo:** 1 frase com resultado observável.
- **Agente:** A<n> (ver P04).
- **Dieta:** [lista de docs — máx. 5].
- **Dependências:** [BKL-ids que precisam estar DONE].
- **Artefato:** caminho/nome do arquivo ou função a entregar.
- **Critérios de aceite:** (copiados da spec, literais)
  - [ ] ...
  - [ ] ...
- **Estimativa:** P|M|G (P ≤ 1 sessão de agente; M ≤ 3; G = quebrar antes de emitir).
- **Prioridade:** MVP|alpha|beta|rc.
```

Regras:
1. Tarefa G nunca é emitida — é quebrada em P/M primeiro.
2. Critérios de aceite são SEMPRE copiados, nunca "ver spec X".
3. Toda tarefa referencia no máximo 1 componente (CMP-*).
