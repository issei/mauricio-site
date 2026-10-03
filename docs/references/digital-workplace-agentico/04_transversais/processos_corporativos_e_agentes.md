---
titulo: Arquitetura de processos com agentes — onde o agente entra no processo corporativo, exceções humanas, aprovações e SLAs
modulo: Transversal — Process Architecture
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [processos, bpm, workflow, human-in-the-loop, excecoes, aprovacoes, sla, onboarding, handoff, regras-de-negocio, automacao]
---

# Arquitetura de processos com agentes: onde o agente entra, exceções humanas, aprovações e SLAs

Este arquivo explica como agentes interagem com processos corporativos de RH, TI e serviços internos. A tese é simples: o agente é uma **interface inteligente sobre processos explícitos**, e não um substituto para eles. O arquivo define papéis do agente por etapa, padrões de integração com motores de processo, tratamento de exceções humanas e critérios para decidir o que automatizar. Os exemplos são ilustrativos e não descrevem processos de uma organização específica.

## 1. Que problema existe

Processos corporativos acumulam três tipos de conhecimento:

1. **Regra explícita:** "dependente até 21 anos, ou 24 se estudante".
2. **Regra tácita:** "na prática, o RH aceita a declaração escolar até o fim do mês".
3. **Julgamento:** "este caso tem uma particularidade; vou consultar o jurídico".

Um agente lida bem com interpretação de linguagem e com navegação de regras explícitas. Lida mal, e de forma perigosa, com regras tácitas (vai inventar uma versão plausível) e com julgamento (vai simular um julgamento sem responsabilidade).

## 2. Por que precisa ser resolvido

- **Consistência:** casos iguais precisam ter desfechos iguais. Um modelo pode decidir de maneiras diferentes a cada execução.
- **Auditabilidade:** em organizações de grande porte e reguladas, decisões que afetam o colaborador precisam ser explicáveis e revisáveis (LGPD, art. 20). **[FATO]** ([LGPD](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm))
- **Responsabilidade:** alguém responde pelo processo. Se o agente decide, ninguém responde.

## 3. Princípio: separar interação, orquestração e decisão

```text
┌────────────────────────┐
│ INTERAÇÃO (agente)      │  entende, coleta, explica, confirma, acompanha
└───────────┬────────────┘
            ▼
┌────────────────────────┐
│ ORQUESTRAÇÃO (workflow) │  estado, etapas, timers, tarefas humanas, compensação
└───────────┬────────────┘
            ▼
┌────────────────────────┐
│ DECISÃO (domínio/regras)│  elegibilidade, cálculos, validações
└───────────┬────────────┘
            ▼
┌────────────────────────┐
│ REGISTRO (SoR)          │  fonte da verdade
└────────────────────────┘
```

**[RECOMENDAÇÃO]** Cada camada tem dono e testes próprios. O agente pode mudar de modelo sem mudar a regra; a regra pode mudar sem retreinar ou reescrever o agente.

## 4. Papel do agente em cada etapa do processo

| Etapa | O agente faz | O agente não faz | Mecanismo |
| --- | --- | --- | --- |
| Gatilho | reconhece a intenção e identifica o processo | inventar um processo inexistente | catálogo de serviços da EXP |
| Pré-condições | consulta elegibilidade | decidir elegibilidade | API de regras |
| Coleta | pré-preenche com dados do SoR; pede só o que falta | inferir dados críticos | componentes estruturados, estado AG-UI |
| Validação | apresenta erros de validação de forma clara | ignorar validações | validação no domínio |
| Submissão | inicia o processo com idempotência, após confirmação | submeter sem confirmação ações com efeito | interrupção AG-UI + ferramenta |
| Aprovação | notifica e resume o contexto para o aprovador | aprovar em nome do aprovador | tarefa humana no workflow |
| Exceção | detecta, explica e encaminha com contexto | resolver a exceção por conta própria | fila de exceção |
| Acompanhamento | consulta o estado e explica | prometer prazos fora do SLA | API de estado do workflow |
| Encerramento | confirma o resultado e oferece próximos passos | declarar concluído o que só foi aceito | evento de conclusão |

## 5. Padrões de integração agente ↔ processo

| Padrão | Descrição | Quando usar |
| --- | --- | --- |
| **Agente como iniciador** | o agente coleta e inicia um processo existente | a maioria dos serviços transacionais |
| **Agente como assistente de etapa humana** | o agente resume, sugere e prepara para o humano decidir | aprovações, análises documentais |
| **Etapa de LLM dentro do workflow** | o workflow chama um LLM para uma tarefa delimitada (classificar, extrair, resumir) | triagem de chamados, extração de dados de documentos |
| **Agente como orquestrador** | o agente decide a sequência entre vários serviços | só para jornadas de baixo risco e alta variabilidade, com limites claros |

**[INFERÊNCIA]** O padrão "etapa de LLM dentro do workflow" corresponde ao que a Anthropic chama de workflow (LLMs e ferramentas orquestrados por caminhos de código pré-definidos), e é a forma mais segura de levar IA a processos regulados. **[FATO]** sobre a definição ([Anthropic](https://www.anthropic.com/engineering/building-effective-agents)).

## 6. Pergunta crítica: como lidar com exceções humanas?

### 6.1 Exceções como estados de primeira classe

**[RECOMENDAÇÃO]** Toda exceção previsível tem:

- **tipo** (documento ilegível, fora de prazo, conflito de segregação de funções, caso não previsto);
- **fila** com dono;
- **SLA**;
- **contexto estruturado** transferido (intenção, dados coletados, tentativas, fontes consultadas, motivo do encaminhamento);
- **caminho de retorno** ao fluxo automatizado depois de resolvida.

### 6.2 Gatilhos de handoff

| Gatilho | Exemplo |
| --- | --- |
| Regra exige humano | concessão de acesso privilegiado |
| Baixa confiança na interpretação | intenção ambígua após duas tentativas de esclarecimento |
| Sensibilidade | assédio, saúde mental, desligamento, conflito com gestor |
| Pedido explícito | "quero falar com uma pessoa" |
| Falha técnica persistente | SoR indisponível além do limite |
| Exceção de negócio | caso fora das regras documentadas |

### 6.3 Interrupções e tarefas humanas

- Para **confirmações do próprio usuário**, a interrupção AG-UI é adequada: a execução termina com uma interrupção, e a resposta vem em nova execução, com regra explícita de não executar a ação se não houver resposta. **[FATO]** ([AG-UI Interrupts](https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume.md))
- Para **aprovações de terceiros** (gestor, RH), o lugar certo é o **workflow engine**, com tarefa humana e timers. A interrupção do AG-UI é de curta duração e voltada ao usuário presente; aprovações de terceiros podem levar dias. **[INFERÊNCIA]**

## 7. SLAs e ownership

- O SLA pertence ao **processo**, não ao agente. O agente informa o SLA; não o cria.
- Etapas humanas não pausam o SLA.
- O **dono do processo** recebe métricas do canal agente (volume, taxa de exceção, motivos), porque o agente revela onde o processo é confuso.

**[INFERÊNCIA]** O agente funciona como um **sensor de processo**: as perguntas que ele não consegue resolver e as exceções que ele encaminha mostram regras ambíguas, lacunas de API e etapas desnecessárias. Esse feedback é um dos maiores valores da camada agêntica, desde que exista dono para recebê-lo.

## 8. Exemplos de processos e potencial agêntico

| Processo | Volume | Variabilidade | Risco | Abordagem sugerida **[RECOMENDAÇÃO]** |
| --- | --- | --- | --- | --- |
| Consulta de saldo de férias/horas | alto | baixa | baixo | ferramenta de leitura; resposta direta |
| Solicitação de férias | alto | baixa | médio | agente iniciador + confirmação |
| Abertura de chamado de TI | alto | alta | baixo | agente com triagem (etapa de LLM) e abertura |
| Inclusão de dependente | médio | média | alto (dados sensíveis) | agente iniciador + documento + workflow com validação |
| Solicitação de acesso | alto | média | alto | agente coleta e justifica; aprovação humana obrigatória |
| Onboarding | médio | média | médio | workflow orquestrado; agente como guia do novo colaborador |
| Alteração de cargo | baixo | alta | alto | workflow sistêmico; agente apenas informa |
| Desligamento | baixo | alta | muito alto | canal humano; agente apenas orienta |

## 9. Processos cross-domain

Uma intenção como "vou me mudar de cidade" atravessa RH, benefícios, facilities, TI e folha. **[RECOMENDAÇÃO]**

1. Modelar como **jornada** na EXP, com dono nomeado.
2. Implementar como **workflow de orquestração** que chama os processos de cada domínio.
3. O agente **conduz a conversa** sobre essa jornada, mostra o progresso de cada parte e encaminha exceções.
4. Nunca deixar o agente improvisar a sequência a cada conversa.

## 10. Pergunta crítica: o que é usar IA para compensar processos mal definidos?

É colocar um agente na frente de um processo com regra tácita, sem dono ou com etapas inconsistentes, esperando que o modelo "resolva". O resultado é inconsistência automatizada. **Alternativa:** usar a descoberta do projeto agêntico para **explicitar** o processo (regras, exceções, dono) antes de automatizá-lo. O agente pode, inclusive, ajudar nessa descoberta, analisando chamados e conversas. Ver `05_decisao/anti_patterns.md`.

## 11. Dependências, riscos e maturidade

- **Dependências:** donos de processo; regras externalizadas; workflow engine ou capacidade equivalente nos SoRs; filas de exceção; APIs de estado.
- **Riscos:** processos sombra conduzidos pela conversa; regras duplicadas no prompt; aprovações "assistidas" que viram aprovações automáticas na prática.
- **Maturidade:** BPM e workflows duráveis são **maduros** ([BPMN 2.0](https://www.omg.org/spec/BPMN/2.0/), [Temporal](https://docs.temporal.io/)); a integração com agentes é **emergente** em padrões, mas não exige tecnologia nova. **[INFERÊNCIA]**

## Fontes

- Lei nº 13.709/2018 (LGPD), art. 20: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Anthropic, Building effective agents: https://www.anthropic.com/engineering/building-effective-agents
- AG-UI, Interrupts and Resume: https://docs.ag-ui.com/spec/1.0/basic/patterns/interrupt-resume.md
- OMG, BPMN 2.0: https://www.omg.org/spec/BPMN/2.0/
- Temporal: https://docs.temporal.io/
