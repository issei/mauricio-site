# Framework Agêntico de Desenvolvimento Orientado a Especificação (SDD) para Devin

**Tipo de documento:** Framework reutilizável de orquestração multi-agente
**Escopo:** Agnóstico ao domínio do projeto (desenvolvimento de software, arquitetura de solução, documentação técnica, migração de dados, automação, etc.)
**Ferramenta de execução:** Devin (Cognition) — CLI local e/ou Cloud, conforme disponibilidade
**Metodologia:** Spec-Driven Development (SDD)

Este documento não descreve um projeto específico. Ele descreve **como decompor qualquer projeto** em pacotes de trabalho executáveis por sessões Devin, com controles de qualidade, DoR/DoD padronizados e otimização de consumo de recursos (ACUs e modo de agente). A aplicação a um projeto concreto consiste em preencher os templates das Seções 6 e 7.

---

## 1. Nota prévia — Devin CLI vs. Devin Cloud

Este framework precisa ser lido com uma distinção de capacidade em mente, pois ela muda onde cada mecanismo de orquestração é implementado:

| Capacidade | Devin CLI (local) | Devin Cloud (web/API) |
|---|---|---|
| Execução em terminal, arquivos locais, ambiente do desenvolvedor | Sim | Não (roda em VM isolada) |
| Knowledge (base de conhecimento persistente, recall automático) | Não | Sim |
| Playbooks (fluxos reutilizáveis com steps, critérios de sucesso e guardrails) | Não | Sim |
| Managed Devins / orquestração paralela nativa (uma sessão coordenadora delega a sessões filhas em VMs isoladas) | Não | Sim |
| Session Insights, análise de sessões passadas, Advanced Mode | Não | Sim |
| API/MCP para scripting e automação (criar sessões, aguardar conclusão em lote, tags) | Indireto, via Devin Cloud | Sim |

Ou seja: o **Devin CLI é o executor local**, e a **camada de orquestração (Knowledge, Playbooks, delegação paralela nativa) vive no Devin Cloud**. Este framework assume um modelo híbrido:

- **Se a organização tem acesso ao Devin Cloud** (plano Core/Team/Enterprise): a orquestração usa Managed Devins nativos, Playbooks e Knowledge conforme descrito nas Seções 5 e 8, e o Devin CLI é usado apenas para sessões locais pontuais de desenvolvimento interativo.
- **Se a organização usa apenas o Devin CLI local**: a camada de orquestração (Seção 5) é implementada por fora — scripts de shell/CI que disparam múltiplas sessões `devin` locais ou remotas em paralelo, cada uma isolada em seu próprio workspace/branch, com os specs do repositório fazendo o papel que o Knowledge faria no Cloud.

O framework é desenhado para funcionar nos dois cenários sem alterar a estrutura de WPs, DoR/DoD — apenas o mecanismo de disparo e coordenação muda.

---

## 2. Princípios de SDD aplicados

| Princípio | Aplicação |
|---|---|
| A especificação é a fonte de verdade | Nenhuma sessão Devin inicia trabalho sem um spec de pacote de trabalho (WP) aprovado |
| Specs são versionáveis e revisáveis | Specs vivem no repositório (`specs/`), sob controle de versão, não apenas na memória de uma sessão |
| A execução deriva da spec, não o inverso | Divergência entre o que foi produzido e o spec gera atualização do spec ou nova iteração da sessão — nunca "ajuste silencioso" do resultado |
| Contratos explícitos de entrada/saída por unidade de trabalho | Cada WP declara entradas, saídas, critérios de sucesso mensuráveis — pré-requisito para paralelizar com segurança |
| Validação é parte da spec, não uma etapa informal posterior | O DoD de cada WP é escrito antes da execução, e vira o critério de aceite objetivo da sessão que revisa o trabalho |
| Reuso de padrões validados | Todo WP que se repete (mesmo tipo de tarefa em contextos diferentes) deve virar um Playbook, e não ser reescrito a cada vez |

---

## 3. Estrutura de artefatos de especificação (genérica)

Independente do domínio do projeto, os seguintes artefatos devem existir antes do início da execução:

| Artefato | Propósito | Onde vive |
|---|---|---|
| `specs/00-escopo-e-objetivos.md` | Objetivo do projeto, perguntas que o entregável final precisa responder, critérios de sucesso do produto como um todo | Repositório (fonte de verdade única) |
| `specs/01-padroes-e-convencoes.md` | Padrões estruturais, de nomenclatura, de formatação ou arquiteturais que toda saída deve seguir (equivalente a um "design system", podendo ser visual, de código, ou documental) | Repositório; espelhado em Knowledge se houver Devin Cloud |
| `specs/02-modelo-de-unidade-de-trabalho.md` | Template padrão de um WP (ver Seção 7) — estrutura que toda seção/módulo/componente deve seguir | Repositório |
| `specs/03-glossario-e-terminologia.md` | Termos do domínio do projeto e nível de profundidade assumido para o público/usuário final | Repositório; espelhado em Knowledge |
| `specs/04-mapa-de-dependencias.md` | Grafo de dependências entre WPs e fases de paralelização | Repositório, mantido pelo Agente Orquestrador |
| `specs/05-checklist-de-qualidade.md` | Critérios de validação transversais a todo o projeto | Repositório; referenciado pelo Playbook de QA |
| `playbooks/*.devin.md` | Um Playbook por tipo de tarefa recorrente (ex.: "implementar módulo seguindo padrão X", "revisar contra checklist de qualidade Y") | Devin Cloud (ou versão local em `playbooks/` como referência, se só houver CLI) |

Nenhum WP é iniciado sem que `00`, `01`, `02` e `03` estejam aprovados. Essa é a Definition of Ready do projeto como um todo (Seção 9).

---

## 4. Papéis (agnósticos de domínio)

| Papel | Responsabilidade | Onde roda |
|---|---|---|
| **Orquestrador** | Interpreta o objetivo do projeto, produz os specs da Seção 3, decompõe o escopo em WPs, define o grafo de dependências e o plano de paralelização, aloca modo de agente e orçamento de ACU por WP | Sessão principal (Cloud, se disponível) ou o responsável humano coordenando execuções do CLI |
| **Executores** (um por WP, paralelizáveis) | Produzem a saída de um WP a partir do seu spec, sem depender de contexto de outros executores em andamento | Managed Devins (Cloud) ou sessões `devin` CLI isoladas em workspaces/branches distintos |
| **Revisor de Qualidade** | Valida cada WP entregue contra seu DoD e contra o checklist transversal; pode rodar de forma incremental, WP a WP | Sessão dedicada (Cloud com Playbook de QA, ou sessão CLI com o checklist como contexto local) |
| **Integrador** | Consolida os WPs aprovados em um entregável único coerente, resolve referências cruzadas | Sessão principal, ao final |

Esta tabela é a versão genérica dos "Agentes 0–5" de uma especificação de projeto específico — o número de executores paralelos varia conforme o número de WPs da Fase de execução, não é fixo.

---

## 5. Camada de orquestração — dois modos de operação

### 5.1 Modo Cloud (Managed Devins nativos)

Quando há acesso ao Devin Cloud, a sessão do Orquestrador pode delegar diretamente:

- O Orquestrador recebe o pedido de decompor um grande escopo em unidades paralelas e delega a um time de Managed Devins, cada um em VM isolada, com contexto limpo e escopo estreito.
- A sessão coordenadora monitora progresso, resolve conflitos entre entregas e compila os resultados — sem intervenção manual de disparo por WP.
- Isso pode ser feito de forma explícita ("crie uma sessão gerenciada para cada WP da Fase 1") ou deixado para o Devin decidir automaticamente quando identifica que a tarefa se beneficia de paralelização.
- Cada sessão pode receber um schema de saída estruturado, o que torna o DoD do WP verificável de forma programática (aprovado/reprovado/pendências), e não apenas em texto livre.

### 5.2 Modo CLI local (orquestração externa)

Quando apenas o Devin CLI está disponível, a coordenação é feita por fora da ferramenta:

- Cada WP roda em um **workspace ou branch git isolado**, evitando que execuções paralelas conflitem no mesmo working tree.
- Um script de orquestração (shell ou pipeline de CI) dispara uma sessão `devin` por WP, com o spec do WP como prompt inicial (incluindo entradas, DoR, DoD).
- O acompanhamento de conclusão e o agrupamento de resultados são feitos pelo script/CI, não por uma sessão coordenadora nativa — o papel de "Orquestrador" aqui é majoritariamente humano ou de automação externa.
- Ferramentas de scripting sobre a API do Devin (oficiais ou de terceiros) podem ser usadas para padronizar esse disparo, incluir saída em JSON para parsing determinístico, e evitar sessões duplicadas para o mesmo prompt.

**Recomendação prática:** usar o Modo Cloud sempre que o projeto tiver mais de ~3 WPs paralelos ou exigir DoD verificável por schema estruturado; reservar o Modo CLI local para projetos pequenos, protótipos, ou etapas que exigem interação rápida e iterativa com o ambiente local do desenvolvedor.

---

## 6. Processo de decomposição de escopo (como transformar qualquer projeto em WPs)

Este processo é executado pelo Orquestrador antes de qualquer execução, independentemente do domínio do projeto:

1. **Extrair os objetivos verificáveis do projeto.** Toda entrega deve responder a perguntas específicas e checáveis — não "fazer um bom trabalho", mas "responder a estas N perguntas com estas M evidências".
2. **Identificar as unidades naturais de decomposição.** Podem ser módulos de código, seções de um documento, componentes de uma arquitetura, integrações, camadas de um pipeline — o critério é sempre o mesmo: **a unidade pode ser descrita, executada e validada sem exigir contexto simultâneo de outra unidade em andamento.**
3. **Classificar cada unidade quanto ao grau de julgamento exigido** (ver Seção 8) — isso determina o modo de agente e o orçamento de ACU, não apenas o tamanho da tarefa.
4. **Mapear dependências reais entre unidades**, distinguindo:
   - **Paralelizável:** nenhuma unidade depende da saída de outra para iniciar.
   - **Sequencial:** uma unidade consome a saída de outra como entrada obrigatória (ex.: uma spec de contrato precisa existir antes da unidade que a implementa).
5. **Escrever um WP para cada unidade**, usando o template da Seção 7.
6. **Definir o checklist de qualidade transversal** (aplicável a todo WP, independentemente do domínio) e o checklist específico de cada WP.
7. **Validar o grafo de dependências** quanto a ciclos antes de iniciar a execução.

---

## 7. Template de Pacote de Trabalho (WP) — genérico

Todo WP, em qualquer projeto, deve ser especificado com estes campos antes de ser executado:

```
ID do WP:
Título:
Tipo de tarefa: [analítica/argumentativa | descritiva/estrutural | mecânica/repetitiva]
Domínio: [ex.: código, conteúdo, arquitetura, dados, infraestrutura]

Entradas:
  - specs consumidos
  - artefatos produzidos por WPs antecedentes (se sequencial)

Saída esperada:
  - artefato(s) concreto(s) produzido(s)
  - formato e local de entrega

Definition of Ready (DoR):
  - specs de base aprovados e disponíveis
  - dependências sequenciais já entregues (se houver)
  - critério de sucesso mensurável definido

Definition of Done (DoD):
  - critérios objetivos e verificáveis (o mais próximo possível de checável por script/schema)
  - ausência de itens fora do escopo declarado
  - conformidade com specs 01 (padrões) e 03 (glossário)

Modo de agente recomendado:
  - [ver Seção 8]

Orçamento de ACU / limite de sessão:
  - [ver Seção 8]

Isolamento necessário:
  - workspace/branch dedicado: sim/não
  - pode rodar em paralelo com: [lista de WP IDs]

Dependências:
  - bloqueado por: [lista de WP IDs, ou "nenhuma"]
```

Este template substitui, projeto a projeto, o conjunto fixo de WPs que existiria em uma especificação concreta (como a que foi feita para o site de arquitetura E2E Salesforce/Playwright) — aqui ele é o **molde**, não o conteúdo preenchido.

---

## 8. Critério de alocação de modo de agente e orçamento (equivalente à seleção de modelo)

Diferente de ferramentas que expõem escolha explícita de modelo por tarefa, o Devin expõe **modo de agente** e **orçamento de ACU** como as alavancas equivalentes de custo/profundidade. A alocação deve seguir o tipo de tarefa, não o tamanho aparente do WP:

| Tipo de tarefa | Modo de agente recomendado | Orçamento de ACU | Justificativa |
|---|---|---|---|
| Decomposição de escopo, definição de specs, resolução de ambiguidade de contrato entre WPs | Devin (modo padrão), com Planning Mode ativo e aprovação manual do plano antes da execução | Alto, sessão única | Exige julgamento de arquitetura; erro aqui se propaga para todos os WPs dependentes |
| Unidades analíticas/argumentativas (ex.: decisões de arquitetura, avaliação de trade-offs, análise de risco) | Devin (modo padrão), com Playbook detalhado incluindo guardrails e critérios de sucesso explícitos | Médio-alto, com checkpoint de revisão humana obrigatório antes do merge | Tarefas onde a superficialidade compromete o valor do entregável — não devem rodar em modo otimizado para velocidade |
| Unidades descritivas/estruturais (ex.: implementação seguindo padrão já definido, redação de seções descritivas, construção de componentes reutilizáveis) | Devin (modo padrão) ou Fast Mode quando o escopo é bem delimitado e o padrão já está validado | Médio | Volume alto, ambiguidade baixa se o spec de padrões (`01`) estiver bem definido |
| Tarefas analíticas sobre dados estruturados (consultas, análises quantitativas, geração de visualizações) | Agente especializado em dados, quando disponível na plataforma | Médio | Aproveitamento de agente otimizado para o tipo de tarefa, evitando uso do agente de propósito geral para trabalho que tem ferramenta dedicada |
| Validação mecânica, checagem de consistência contra checklist, normalização de formatação/nomenclatura | Fast Mode, com Playbook curto e critérios de sucesso binários | Baixo | Tarefa repetitiva, de baixa ambiguidade, alto volume — não deve consumir orçamento equivalente ao de tarefas analíticas |
| Integração final, consolidação de múltiplas saídas, resolução de referências cruzadas | Devin (modo padrão) | Médio | Exige coordenação entre múltiplas fontes, mas sem julgamento de domínio profundo por unidade |

**Regra geral de otimização:** orçamento alto e revisão humana obrigatória são reservados para WPs classificados como analíticos/argumentativos; WPs mecânicos/repetitivos devem rodar em Fast Mode com playbooks curtos, liberando orçamento para as tarefas que efetivamente precisam de profundidade. Isso evita o padrão comum de gastar o mesmo esforço computacional em toda unidade de trabalho independentemente da complexidade real.

---

## 9. Definition of Ready (DoR) global do projeto

Antes de qualquer WP da fase de execução iniciar:

- `specs/00` a `specs/03` aprovados e sem ambiguidade residual quanto a escopo, padrões e terminologia
- Grafo de dependências (`specs/04`) revisado, sem ciclos
- Checklist de qualidade transversal (`specs/05`) aprovado
- Modo de agente e orçamento de ACU atribuídos a cada WP, com justificativa registrada
- Definido, para o projeto como um todo, se a execução será em Modo Cloud, Modo CLI local, ou híbrido

---

## 10. Definition of Done (DoD) global do projeto

O projeto é considerado concluído quando, cumulativamente:

- Todo WP tem parecer registrado do Revisor de Qualidade: aprovado / aprovado com ressalvas tratadas / não aplicável
- Nenhuma saída contradiz `specs/01` (padrões) ou `specs/03` (glossário/terminologia)
- Todas as perguntas verificáveis definidas em `specs/00` têm resposta localizável em algum artefato produzido
- Referências cruzadas entre WPs resolvidas pelo Integrador, sem pendências
- Relatório consolidado de qualidade sem itens em aberto

---

## 11. Controles de qualidade e rastreabilidade

- **Revisão incremental, não apenas final.** O Revisor de Qualidade avalia cada WP assim que entregue, usando o checklist transversal mais o DoD específico do WP — evita que um problema estrutural só seja descoberto na integração.
- **Session Insights / análise de sessões (Modo Cloud).** Após cada sessão, é possível gerar uma análise do que ocorreu e um prompt aprimorado para tarefas semelhantes futuras — isso deve alimentar a evolução dos Playbooks, e não ficar perdido na sessão individual.
- **Playbooks como memória institucional.** Todo WP que se repete (mesmo padrão, contexto diferente) deve, após a primeira execução bem-sucedida, ser promovido a Playbook — assim novas execuções herdam o aprendizado em vez de repetir o processo de tentativa e erro.
- **Tags e busca por sessão.** Sessões devem ser marcadas por WP/fase/tipo de tarefa, permitindo auditoria posterior de quais critérios de DoD foram de fato verificados em cada entrega.
- **Gate de revisão humana.** Reservado obrigatoriamente para WPs classificados como analíticos/argumentativos (Seção 8) antes de qualquer merge ou publicação — este framework não elimina a necessidade de aprovação humana nesses pontos, apenas concentra onde ela é indispensável.

---

## 12. Riscos do processo multi-agente e mitigações

| Risco | Mitigação |
|---|---|
| Execuções paralelas em Modo CLI conflitando no mesmo workspace | Isolamento obrigatório por workspace/branch dedicado por WP (campo "Isolamento necessário" no template da Seção 7) |
| Uso de orçamento alto (modo padrão) em tarefas mecânicas por falta de classificação prévia | Classificação de tipo de tarefa é etapa obrigatória do processo de decomposição (Seção 6, passo 3) antes de qualquer disparo de sessão |
| Divergência de padrão entre WPs executados em paralelo | `specs/01` (padrões e convenções) é somente leitura para os executores; qualquer necessidade de padrão novo é escalada ao Orquestrador, não decidida localmente |
| DoD subjetivo, difícil de auditar | Preferência por critérios de sucesso mensuráveis e, quando em Modo Cloud, uso de schema de saída estruturado em vez de avaliação em texto livre |
| Conhecimento adquirido em uma sessão se perdendo ao final dela | Promoção sistemática de sessões bem-sucedidas e recorrentes a Playbooks, e de aprendizados a entradas de Knowledge |
| Dependência oculta entre WPs classificados como paralelizáveis | Validação do grafo de dependências (`specs/04`) como parte da DoR global, antes do início da fase de execução, não durante |

---

## 13. Como aplicar este framework a um projeto concreto

Para instanciar este framework em um projeto real (de qualquer domínio):

1. Preencher `specs/00-escopo-e-objetivos.md` com os objetivos verificáveis específicos do projeto.
2. Rodar o processo de decomposição (Seção 6) para gerar a lista real de WPs, cada um preenchido com o template da Seção 7.
3. Classificar cada WP quanto ao tipo de tarefa e atribuir modo de agente/orçamento conforme a Seção 8.
4. Montar o grafo de dependências e as fases de paralelização em `specs/04-mapa-de-dependencias.md`.
5. Definir, conforme a infraestrutura disponível (Cloud, CLI local, ou híbrido), o mecanismo de disparo descrito na Seção 5.
6. Executar, com revisão incremental (Seção 11) e gate humano nos pontos analíticos/argumentativos.
7. Ao final, promover os padrões que se mostraram reutilizáveis a Playbooks e Knowledge, fechando o ciclo de melhoria contínua do processo para o próximo projeto.

O exemplo de aplicação concreta deste framework — um site de documentação técnica sobre arquitetura E2E Salesforce/Playwright, com 7 WPs paralelos e alocação de modelo por tipo de tarefa — está documentado separadamente e pode ser usado como referência de preenchimento dos templates acima.
