# Especificação Editorial da Página
# Deterministic Grounding para Engenharia Agentic de Software

**Versão:** 1.0  
**Idioma do conteúdo:** Português do Brasil  
**Destinatário:** Outra LLM responsável por elaborar o conteúdo final da página  
**Natureza deste documento:** Especificação editorial, conceitual e instrutiva  
**Foco:** Conteúdo, estrutura narrativa, explicações, orientações e referências  
**Fora do escopo:** Design visual, HTML, CSS, JavaScript, framework, CMS, hospedagem e detalhes de implementação da página

---

## 0. Instrução principal para a LLM autora

Elabore uma nova página técnica, instrutiva e explicativa intitulada **“Deterministic Grounding para Engenharia Agentic de Software”**.

A página deve ser complementar ao conjunto de páginas existente do autor e deve ocupar uma lacuna específica: explicar **como ancorar um agente de desenvolvimento no estado atual do software, limitar sua autoridade operacional e validar suas mudanças com evidência rastreável**.

Não escreva uma página genérica sobre inteligência artificial. Não escreva um catálogo de ferramentas. Não escreva um tutorial de MCP. Não transforme a página em uma defesa promocional da arquitetura. A página deve ensinar o leitor a raciocinar sobre falhas, controles, evidências e limites.

A página deve deixar claro que:

> **Um agente pode produzir código correto em isolamento e ainda modificar o repositório errado, usar contexto obsoleto, violar uma arquitetura, exceder o escopo autorizado ou passar por testes que não observam a propriedade crítica.**

A resposta final da LLM autora deve ser um conteúdo editorial completo e publicável. Ela deve conter explicações desenvolvidas, exemplos, instruções de aplicação, contraexemplos e referências. Não deve devolver apenas um plano, uma lista de tópicos ou um resumo desta especificação.

---

# 1. Contexto do ecossistema editorial

A nova página fará parte de um conjunto que já cobre visão estratégica, engenharia da confiança, agentes, conhecimento, operações, sustentação, formulação de problemas e casos aplicados.

A LLM autora deve compreender a função de cada página existente para evitar repetição.

## 1.1 Páginas existentes e seus papéis

### Arquitetura de IA auditável

URL: <https://mauricio.issei.com.br/apresentacao.html>

Apresenta a visão geral de uma arquitetura de IA auditável. Seus eixos são memória institucional, especificação como contrato, esteira contínua de resiliência, determinismo, auditabilidade, rastreabilidade e reversibilidade.

A nova página deve aprofundar a mecânica da auditabilidade aplicada ao repositório. Não deve repetir a visão executiva nem reexplicar GraphRAG de forma ampla.

### Engenharia da Confiança

URL: <https://mauricio.issei.com.br/engenharia-confianca.html>

Apresenta o Intentional Systems Model e a jornada da IA como mágica à IA como engenharia. Seus módulos incluem despertar, mapeamento do estado atual, arquitetura determinístico-primeiro e orquestração por SDD.

A nova página deve detalhar o mecanismo que conecta o inventário do estado atual aos contratos, ao gateway de ações e à evidência de validação.

### Engenharia de Agentes de IA

URL: <https://mauricio.issei.com.br/engenharia-agentes-ia.html>

Apresenta os princípios determinístico-primeiro, Cérebro × Vitrine, contratos rígidos, fail-closed, MCP e controle de custo.

A nova página deve mostrar como esses princípios se aplicam a um agente que modifica software. O foco deve ser repositório, diff, dependências, arquitetura, escopo e evidência.

### Agent Ready

URL: <https://mauricio.issei.com.br/agent-ready.html>

Trata da superfície pública de um site consumível por agentes: descoberta, leitura, controle e contratos invocáveis.

A nova página deve ser distinguida desse tema. **Agent Ready** trata da superfície externa de um sistema para agentes. **Deterministic Grounding** trata do ciclo interno de desenvolvimento e mudança realizado por agentes.

### Knowledge OS

URL: <https://mauricio.issei.com.br/knowledge-os-presentation.html>

Trata conhecimento corporativo como infraestrutura cognitiva governada, com GraphRAG, ontologias, observabilidade cognitiva, circuit breakers e FinOps.

A nova página deve reconhecer que GraphRAG e memória podem ajudar na recuperação de contexto, mas não garantem frescor, identidade do snapshot ou alinhamento com o repositório atual.

### Case Agents

URL: <https://mauricio.issei.com.br/case-agents.html>

Apresenta um caso de roteamento de ferramentas. O sistema escolhe ferramentas, governa o catálogo, diferencia leitura de escrita e bloqueia execução quando a decisão não é confiável ou quando há incompatibilidade de direção.

Este é o caso mais importante para explicar o **Action Gateway**. A nova página deve generalizar a Guarda de Direção para o desenvolvimento de software:

```text
Tarefa limitada a src/api/** + diff inclui deploy/**
→ incompatibilidade de escopo
→ bloqueio antes da aplicação
```

### Sustentação de Sistemas em Produção

URL: <https://mauricio.issei.com.br/sustentacao.html>

Trata confiabilidade, comunicação, decisão sob pressão, incidentes e aprendizado.

A nova página deve mostrar como evidências de operação, incidentes e regressões retornam para a especificação e para os oráculos.

### Service Operations 2.0

URL: <https://mauricio.issei.com.br/service-operations-2-0.html>

Trata resiliência sistêmica, automação, IA governada e operação orientada ao cliente.

A nova página deve ocupar o estágio anterior à operação: como mudanças agênticas são contidas e validadas antes de ampliar o risco operacional.

### Proposta Salesforce + AWS

URL: <https://mauricio.issei.com.br/proposta.html>

Apresenta inteligência de vendas em tempo real, eventos, dados e sinais acionáveis.

É um caso de aplicação de arquitetura orientada a dados, não deve ser repetido na nova página.

### Observabilidade Mobile

URL: <https://mauricio.issei.com.br/proposta-observabilidade-mobile.html>

Apresenta observabilidade fim a fim para mobilidade corporativa e redução de MTTR.

A nova página pode conectar validação de mudança com observabilidade, mas não deve se transformar em uma página de SRE.

### Know — Navegando na Complexidade

URL: <https://mauricio.issei.com.br/know.html>

Trata formulação de problemas, complexidade, conhecimento tácito e limites de melhores práticas.

A nova página deve receber o problema já formulado e mostrar como convertê-lo em estado desejado, contratos, restrições e oráculos.

### Devin — Vibe Coding com Devin

URL: <https://mauricio.issei.com.br/devin.html>

Apresenta Vibe Coding maduro, SDD, BDD, Skills, Playbooks, Knowledge e o fluxo:

```text
Spec → Retrieve → Refatorar → Validar
```

A nova página deve aprofundar o que torna cada etapa desse fluxo verificável e governável:

```text
Spec
→ Snapshot Capsule
→ Contexto versionado
→ Plano do agente
→ Action Gateway
→ Workspace limitado
→ Oráculos
→ Evidence Record
→ Reconciliação
```

### Formulação de Problemas

URL: <https://mauricio.issei.com.br/formulacao-de-problemas.html>

Trata a redução de incerteza orientada à decisão, regra de parada, suficiência decisional e limites da investigação.

A nova página deve estabelecer a relação entre **suficiência decisional** e **suficiência de ação**:

> Formular um problema ajuda a decidir o que fazer. Deterministic Grounding verifica se há base suficiente para permitir que um agente faça uma mudança específica.

### Social Selling

URL: <https://mauricio.issei.com.br/socialselling.html>

Apresenta SDD-to-Code Loop, gates determinísticos, Open-World e feedback real.

A nova página deve generalizar esses mecanismos para agentes de desenvolvimento, concentrando-se em estado, autoridade e evidência.

---

# 2. Posicionamento da nova página

## 2.1 Pergunta central

A página deve responder:

> **Como um agente de desenvolvimento pode transformar uma intenção em uma mudança verificável no repositório correto, dentro do escopo correto, com autoridade limitada e evidência suficiente para decidir o próximo passo?**

## 2.2 Tese central

Use a seguinte tese como eixo da página:

> **Grounding estrutural versionado, enforcement de ações e validação explícita podem reduzir classes específicas de mismatch entre intenção, estado do repositório e ação do agente, tornando as decisões mais observáveis e auditáveis. A magnitude dessa redução, sua generalização e seu custo permanecem hipóteses que exigem comparação experimental com um baseline.**

A tese não deve afirmar que:

- o agente se tornou determinístico;
- o software ficou correto;
- a arquitetura elimina alucinação;
- todos os testes passaram;
- GraphRAG representa a verdade completa do repositório;
- MCP garante autorização;
- uma política textual é enforcement;
- um score de confiança do modelo é prova de verdade.

## 2.3 Subtítulo recomendado

Use ou adapte:

> **Como ancorar contexto, restringir ações e validar mudanças sem confundir um resultado verde com correção global.**

## 2.4 Função editorial

A página deve ser uma **ponte operacional** entre:

```text
Formulação de Problemas
        ↓
Engenharia da Confiança
        ↓
Engenharia de Agentes / Devin
        ↓
DETERMINISTIC GROUNDING
        ↓
Case Agents / Social Selling / aplicações
        ↓
Sustentação / Service Operations
```

As páginas existentes apresentam princípios, métodos e casos. A nova página deve ensinar o mecanismo que torna esses princípios operacionais em um repositório vivo.

---

# 3. Princípios editoriais obrigatórios

## 3.1 Foco na substância operacional

Não use uma introdução genérica sobre “o futuro da IA”. Explique mecanismos concretos:

- o que o agente observa;
- o que ele apenas infere;
- o que pode mudar;
- quem autoriza a mudança;
- como o efeito é contido;
- como a propriedade é validada;
- o que permanece desconhecido.

## 3.2 Honestidade epistêmica

Classifique afirmações importantes conforme a taxonomia abaixo:

- **ESTABLISHED:** fato ou prática consolidada;
- **DOCUMENTED:** propriedade documentada de ferramenta, protocolo ou fonte institucional;
- **PROPOSED:** construção arquitetural desta proposta;
- **HYPOTHESIS:** hipótese que requer validação;
- **INFERENCE:** interpretação derivada de fatos observados;
- **UNKNOWN:** não há evidência suficiente para concluir.

A classificação deve aparecer próxima da afirmação quando houver risco de confundir uma proposta com um fato.

## 3.3 Contraexemplos obrigatórios

Cada conceito importante deve apresentar pelo menos um caso em que:

- a abordagem falha;
- a evidência é insuficiente;
- o controle cobre apenas uma projeção do problema;
- o resultado verde não sustenta a conclusão desejada.

## 3.4 Perspectiva crítica

A página deve explicar tanto:

- o que o mecanismo permite controlar;
- quanto o que permanece fora da sua capacidade de prova.

Não usar linguagem promocional como “resolve”, “elimina”, “garante” ou “torna impossível” sem qualificação rigorosa.

## 3.5 Orientações prescritivas

A página deve conter instruções diretas para quem pretende aplicar o conceito. Não basta dizer “use contratos”. É necessário dizer o que deve ser registrado, verificado, bloqueado, aprovado ou marcado como `UNKNOWN`.

---

# 4. Vocabulário e distinções fundamentais

A LLM autora deve usar o vocabulário abaixo de forma consistente.

## 4.1 `A_t`, `S_t` e `D`

- `A_t`: estado operacional do agente no instante `t`: prompt, contexto, memória, recuperações, hipóteses, plano, ferramentas disponíveis e histórico de ações;
- `S_t`: estado observável do sistema no instante `t`: commit, árvore, alterações não commitadas, branch, manifestos, lockfiles, dependências, build, toolchain, configuração, artefatos e runtime relevante;
- `D`: estado desejado: propriedades, contratos, restrições, qualidades, comportamentos e critérios que a mudança deve satisfazer.

## 4.2 Agent–Repository Gap

Use **Agent–Repository Gap** como uma denominação analítica proposta:

> A diferença entre as premissas que orientam a ação do agente em `A_t` e os predicados verificáveis sobre o estado observável `S_t`.

Uma formulação operacional possível é:

```text
G_t = Premissas(A_t, contexto_t) − Predicados_verificados(S_t)
```

Não trate o termo como nomenclatura acadêmica consolidada. Declare-o como **PROPOSED** e registre que seu status terminológico geral é **UNKNOWN**.

## 4.3 Current State e Desired State

- **Current State:** o que existe ou foi observado agora, dentro de um snapshot identificado;
- **Desired State:** o que deveria ser verdadeiro após a mudança;
- **Historical State:** o que foi decidido ou observado antes;
- **Policy State:** o que é permitido fazer;
- **Evidence State:** o que um validador demonstrou dentro de seu escopo.

A frase “a especificação é a fonte da verdade” deve ser qualificada:

```text
Specification = autoridade sobre o que deveria ser verdadeiro
Repository/runtime = autoridade sobre o que foi observado agora
Policy = autoridade sobre o que pode ser feito
Evidence = autoridade limitada sobre o que foi demonstrado
Memory = autoridade histórica e contextual, sujeita a validade
```

## 4.4 Grounding, enforcement, validation, evidence e reconciliation

Mantenha os conceitos separados:

- **Grounding:** associa uma representação, decisão ou ação a uma realidade observada e relevante;
- **Enforcement:** restringe, bloqueia ou limita uma ação segundo autoridade e policy;
- **Validation:** avalia um predicado explícito por meio de um oracle;
- **Evidence:** registra resultado, escopo, proveniência e limitações;
- **Reconciliation:** compara Desired State, Current State e Evidence State e decide se o ciclo pode prosseguir.

O ciclo integrado é:

```text
Observation
    ↓
Grounding
    ↓
Enforcement
    ↓
Execution
    ↓
Validation
    ↓
Evidence
    ↓
Reconciliation
```

Os termos **grounding lifecycle**, **structural grounding** e **deterministic grounding** devem ser classificados como **PROPOSED** ou **INFERENCE**, não como terminologia estabelecida, salvo nova evidência específica.

## 4.5 Determinismo operacional

“Determinístico” deve qualificar o mecanismo de avaliação dentro de um envelope controlado, não o pipeline inteiro nem a correção global.

Para um validador `V`, uma execução é operacionalmente determinística dentro de um envelope `Ω` quando:

```text
mesma entrada observável
+ mesma versão do validator
+ mesma configuração
+ mesmas dependências relevantes
+ mesmas entradas de teste
+ mesmo ambiente controlado
→ mesmo resultado de V
```

O envelope deve declarar, quando aplicável:

- versão do código analisado;
- parser, compilador ou validator;
- configuração e flags;
- dependências e artefatos;
- dados de teste;
- sistema operacional, runtime e arquitetura;
- serviços externos, relógio, aleatoriedade e rede;
- concorrência, timeout e política para testes flaky.

A formulação recomendada é:

> **Grounding estrutural versionado com validação determinística de propriedades explícitas.**

---

# 5. Taxonomia do desvio

Apresente a taxonomia abaixo como **PROPOSED**. Explique que ela organiza mecanismos de falha e não é uma classificação universal.

| Classe | Definição | Controle principal | Limite |
|---|---|---|---|
| **Dependency Hallucination** | Referência a pacote, módulo, versão ou API inexistente ou não resolvível. | Resolução hermética, manifesto, lockfile e registry. | Dependência existente pode ser inadequada ou maliciosa. |
| **Stale Context** | Contexto relevante, mas pertencente a commit, branch, configuração ou dependência anterior. | Proveniência, SHA, validade e invalidação de índice. | Identidade correta não captura tudo que é dinâmico ou local. |
| **Scope Violation** | Alteração fora do escopo permitido de arquivos, diretórios, APIs ou tipos de mudança. | Comparação do diff com allowlist. | Alteração permitida pode produzir efeitos indiretos fora do escopo. |
| **Architectural Violation** | Dependência, alocação ou chamada proibida pela arquitetura modelada. | Regras arquiteturais, análise de dependências, CodeQL, ArchUnit ou equivalentes. | Só cobre regras formalizadas e artefatos realmente analisados. |
| **Repository-State Mismatch** | Premissa do agente divergente do snapshot observável do trabalho. | Snapshot Capsule e revalidação antes/depois da ação. | SHA não captura sozinho dirty state, ambiente ou dependências instaladas. |

Explique que outras categorias existem, mas pertencem a dimensões diferentes:

| Dimensão | Exemplos |
|---|---|
| Conhecimento | stale context, incorrect API assumption, repository-state mismatch |
| Ação e autoridade | scope violation, tool misuse, policy bypass |
| Estrutura | architectural violation, dependency violation |
| Comportamento e domínio | behavioral regression, semantic misunderstanding, specification divergence |
| Impacto | security issue, privacy exposure, availability impact |

Não misture causas, sintomas e impactos em uma única taxonomia plana.

---

# 6. Estrutura narrativa obrigatória da página

A página deve seguir a sequência abaixo. Os títulos podem ser ajustados editorialmente, mas a ordem pedagógica deve ser preservada.

---

## Abertura — O problema em uma frase

Abra com o problema concreto:

> Um agente pode produzir código sintaticamente correto, passar nos testes disponíveis e ainda violar a arquitetura, o escopo, a privacidade ou o estado atual do repositório.

Explique que o problema não é apenas “alucinação”. É um desalinhamento entre:

```text
intenção
estado atual
contexto do agente
ação autorizada
evidência observada
```

Apresente a tese da página e o subtítulo recomendado.

Não comece com uma lista de tecnologias. Comece com uma falha de engenharia.

---

## Seção 1 — O Agent–Repository Gap

### Objetivo

Explicar por que o agente e o repositório não compartilham necessariamente o mesmo estado.

### Conteúdo obrigatório

Defina `A_t`, `S_t`, `D` e `G_t`. Explique que:

- contexto recuperado não é necessariamente estado atual;
- memória histórica não é autoridade sobre o snapshot corrente;
- probabilidade textual não é prova semântica;
- análise estática sobre um commit não descreve outro commit;
- código correto em isolamento pode violar contratos do sistema.

### Exemplo curto

Use este cenário:

- o índice foi criado em `C1`;
- o repositório avançou para `C2`;
- uma dependência foi removida;
- uma regra arquitetural nova foi introduzida;
- o agente recupera código coerente de `C1`;
- produz uma alteração sintaticamente correta, mas inválida em `C2`.

### Contraexemplo obrigatório

O resultado deve incluir um caso em que o agente:

- referencia uma dependência inexistente;
- altera arquivo fora do escopo;
- cria dependência arquitetural proibida;
- usa uma regra histórica que não vale mais.

### Orientação

Instrua o leitor a capturar uma **Snapshot Capsule** antes de recuperar contexto e antes de aplicar uma ação.

---

## Seção 2 — Da intenção ao contrato

### Objetivo

Explicar por que prompt não é contrato e como transformar intenção humana em critérios verificáveis.

### Conteúdo obrigatório

Distinguir:

```text
necessidade humana
→ intenção
→ Desired State
→ requisito
→ contrato
→ oracle
→ evidência
```

Explicar os quatro níveis de contrato:

1. **Interface:** formas, tipos, mensagens, compatibilidade e erros;
2. **Comportamento:** pré-condições, pós-condições, efeitos, invariantes, transições e tempo;
3. **Arquitetura:** componentes, dependências permitidas, camadas, fronteiras e qualidades;
4. **Semântica de domínio:** significado, ownership, finalidade, privacidade, segurança e consequências.

Classifique essa taxonomia como **PROPOSED**. Não diga que a ISO/IEC/IEEE 29148 prescreve exatamente esses quatro níveis sem evidência textual específica.

### Registro mínimo de requisito

Apresente um exemplo com:

```text
requirement_id
subject
context
preconditions
action
postconditions
invariants
threshold_and_tolerance
verification_method
oracle_id
source_of_truth
inconclusive_condition
```

### SDD e especificação executável

Explique que:

- SDD é uma descrição comunicável e rastreável de design;
- especificação executável pode atuar como referência, gerador de casos ou oracle para propriedades modeladas;
- nenhuma especificação executável prova que a intenção humana esteja correta;
- propriedades ausentes do modelo permanecem não observadas.

### Contraexemplo obrigatório

Use o serviço de compartilhamento de fotos:

- testes de API retornam `PASS`;
- a implementação grava imagens e EXIF em logs;
- envia os dados para terceiro;
- retém por período excessivo;
- possui acesso interno amplo;
- nenhum oracle observa logs, retenção, finalidade ou eliminação.

Classifique o caso como **HYPOTHESIS** se não houver incidente específico documentado. Explique que a eventual implicação jurídica depende dos fatos e do contexto regulatório.

### Orientação

Instrua o leitor a incluir propriedades negativas e não funcionais, não apenas respostas esperadas:

- dados que não podem ser coletados;
- destinos que não podem receber dados;
- retenção máxima;
- acessos proibidos;
- estados inválidos;
- efeitos laterais proibidos.

---

## Seção 3 — Grounding estrutural não é apenas RAG

### Objetivo

Explicar a representação estrutural do software e seus limites.

### Conteúdo obrigatório

Apresente o pipeline como capacidade possível:

```text
Repository
→ Parser
→ AST/CST
→ Symbols
→ Typed Relations
→ Dependency / Call / Data-flow Graphs
→ Architectural View
```

Explique que relações precisam declarar sua semântica:

- dependência de build;
- import;
- referência de nome;
- herança;
- chamada estática;
- chamada potencial;
- fluxo de controle;
- fluxo de dados;
- geração de código;
- ligação em runtime.

Explique que “não encontrado” não significa automaticamente “inexistente”.

### Estados de fatos

Apresente os estados:

```text
OBSERVED
INFERRED
POSSIBLE
UNKNOWN
CONFLICT
```

Explique que esses estados descrevem fatos ou relações do grafo. Eles não substituem os veredictos de validação.

### Limitações obrigatórias

Trate explicitamente:

- reflexão;
- `eval`;
- dispatch dinâmico;
- plugins;
- dependências externas;
- geração de código;
- runtime;
- metaprogramação;
- código gerado;
- divergência entre build e working tree.

AST, índice de símbolos e Code Property Graph não são automaticamente:

- modelo completo de domínio;
- estado de execução;
- intenção humana;
- prova de correção.

### Relação com RAG e GraphRAG

Explique:

- RAG seleciona informação;
- GraphRAG adiciona relações tipadas e proveniência;
- ambos podem melhorar contexto;
- nenhum garante frescor do snapshot;
- nenhum substitui uma Snapshot Capsule;
- a presença de um fato no grafo exige versão, origem e validade;
- ausência de fato deve resultar em `UNKNOWN`, não em falso implícito.

### Orientação

Instrua o leitor a tratar contexto recuperado como evidência com:

```text
source
commit / snapshot
path
line range
digest
indexed_at
valid_until
confidence or epistemic status
```

---

## Seção 4 — Autonomia não é autoridade

### Objetivo

Separar a capacidade do modelo de planejar da autoridade efetiva de produzir efeitos.

### Definições

- **Autonomia:** quanto o agente interpreta, planeja e encadeia sem intervenção;
- **Autoridade:** quais recursos, operações e efeitos o agente pode acessar ou produzir.

Apresente a matriz:

| | Baixa autoridade | Alta autoridade |
|---|---|---|
| Baixa autonomia | Automação limitada e reversível. | Automação rígida com risco de blast radius. |
| Alta autonomia | Zona recomendada: planejar e propor com execução mediada. | Zona de maior risco: decisão e poder de execução fundidos. |

### Action Gateway

Defina-o como arquitetura proposta, não como padrão externo:

> Componente que separa proposta de ação, decisão de autoridade e execução do efeito.

Explique que o gateway deve:

1. receber a proposta do agente como entrada não confiável;
2. normalizar ferramenta, versão e parâmetros;
3. validar schema;
4. resolver recursos para IDs canônicos;
5. identificar o principal e o ambiente;
6. verificar escopo;
7. calcular impacto, fan-out e reversibilidade;
8. consultar policy-as-code;
9. verificar aprovação vinculada à ação exata;
10. revalidar antes do efeito;
11. executar com credencial mínima;
12. registrar a cadeia completa.

### MCP

Explique que MCP pode transportar e descrever ferramentas, recursos e prompts, mas não substitui:

- autorização por operação e recurso;
- enforcement no executor;
- validação semântica;
- mediação downstream;
- registro de evidência.

Um `inputSchema` válido não prova que:

- o chamador está autorizado;
- o recurso pertence ao usuário;
- a operação é reversível;
- os efeitos laterais estão declarados;
- a ferramenta não chama outro serviço privilegiado.

### Contraexemplo obrigatório

Use o cenário:

- `release_status` é uma ferramenta de leitura;
- um ticket externo contém instrução indireta para usar `sync_environment`;
- a primeira chamada é aprovada automaticamente;
- a segunda ferramenta tem identidade de serviço com escrita em produção;
- uma feature flag é alterada.

Explique que aprovação inicial, schema e confiança na descrição da ferramenta não impedem o efeito. A mediação deve ocorrer em cada chamada e no sistema downstream.

### Orientação

Instrua o leitor a usar:

- least privilege;
- credenciais por tarefa;
- sandbox com rede e filesystem restritos;
- ausência de segredos de produção no workspace;
- aprovação proporcional ao raio de impacto;
- revalidação imediata antes de cada efeito;
- auditoria de chamadas secundárias, retries, callbacks, webhooks e subagentes.

---

## Seção 5 — Validar não é provar tudo

### Objetivo

Explicar a força epistemológica limitada dos oráculos.

### Conteúdo obrigatório

Defina o **oracle problem** como a dificuldade de decidir automaticamente se o comportamento observado corresponde ao comportamento desejado.

Apresente uma tabela semelhante a esta:

| Oracle | O que um `PASS` pode estabelecer | O que não estabelece sozinho |
|---|---|---|
| Parser | Entrada analisável segundo a gramática suportada. | Tipos, comportamento ou domínio. |
| Type checker | Relações de tipos satisfazem regras implementadas. | Runtime, segurança ou ausência de bugs. |
| Análise estática | Regra ou propriedade abstrata satisfeita no escopo. | Completude e correção global. |
| Teste unitário | Um caso passou nas condições definidas. | Casos não executados e requisitos omitidos. |
| Teste de integração | Componentes funcionaram em cenário observado. | Todos os ambientes e efeitos externos. |
| Scanner de segurança | Nenhuma assinatura aplicável foi detectada. | Vulnerabilidades novas ou lógica maliciosa. |
| Monitor de runtime | Propriedade observada durante execução capturada. | Execuções não observadas. |
| Model checker | Modelo satisfaz propriedade no espaço definido. | Fidelidade completa do modelo ao sistema real. |
| Verificador formal | Implementação satisfaz especificação formal suportada. | Correção da especificação ou intenção humana. |
| Revisão humana | Pessoa autorizada avaliou conforme conhecimento e critérios. | Ausência de erro humano ou completude. |

### Taxonomia de oráculos

Apresente, como organização proposta:

- saída esperada;
- contrato, modelo ou invariante;
- propriedade executável;
- relação metamórfica;
- comparação diferencial;
- julgamento humano;
- mutation testing;
- property-based testing;
- técnicas sem oracle convencional.

Explique os limites de cada tipo.

### Veredictos

Diferencie os estados de evidência:

| Veredicto | Condição |
|---|---|
| `PASS` | Execução concluída, oracle identificável, subject/configuração vinculados e condições satisfeitas. |
| `FAIL` | Execução válida e condição do oracle violada. |
| `UNKNOWN` | Não há base suficiente por skip, timeout, abort, erro de harness, oracle ausente ou cobertura insuficiente. |
| `CONFLICT` | Registros válidos e comparáveis produzem resultados incompatíveis. |

Explique que `UNKNOWN` não é aprovação implícita e que `CONFLICT` não deve ser resolvido por maioria silenciosa.

### Contraexemplo obrigatório

Use o caso do teste desabilitado:

- `test_rejects_negative_amount()` falha;
- o teste é marcado como `skip`;
- o CI verifica apenas agregado verde e lista vazia de falhas;
- sem manifesto esperado, o teste desaparece da decisão;
- o sistema aparenta convergir sem corrigir o comportamento.

A lição é que um gap menor pode ser apenas menor observação.

### Orientação

Instrua o leitor a preservar:

- inventário assinado de testes esperados;
- testes coletados;
- testes executados;
- testes skipped;
- testes abortados;
- testes não encontrados;
- versão do oracle;
- versão do validator;
- configuração e ambiente.

---

## Seção 6 — Evidence Record e reconciliação

### Objetivo

Mostrar como transformar uma execução em evidência limitada, rastreável e auditável.

### Evidence Record mínimo

Apresente um registro conceitual com:

```text
record_id
subject URI e digest
commit SHA completo
tree digest
requirement / contract
oracle id, tipo, versão e digest
validator, versão, commit e imagem/binário
envelope de execução
configuração e parâmetros
ambiente e dependências
artefatos e logs por digest
veredicto
razões
limitações
policy decision
aprovação
assinatura / proveniência
```

Inclua explicitamente:

```text
coverage_or_model_boundary
```

porque toda evidência deve declarar o que não foi observado.

### Relação com proveniência

Explique que W3C PROV, SLSA e in-toto oferecem precedentes para modelar relações entre artefato, atividade, agente, execução e digest. A composição específica chamada **Evidence Record** é uma proposta desta arquitetura, não um esquema único universal.

### Reconciliação

Defina a reconciliação como comparação entre:

```text
Desired State
Current State pós-ação
Evidence State
Policy State
```

O resultado pode ser:

- aceitar a mudança observada;
- bloquear;
- pedir revisão;
- executar novo ciclo;
- corrigir o oracle;
- alterar a especificação por decisão explícita;
- registrar uma exceção com prazo e responsável.

Nunca altere a especificação apenas para fazer o teste passar.

### Orientação

Instrua o leitor a dizer sempre:

- qual propriedade foi avaliada;
- por qual oracle;
- em qual subject;
- em qual escopo;
- com qual configuração;
- com qual cobertura;
- com quais limitações.

Evite a expressão genérica “validado”.

---

## Seção 7 — Implementação mínima e produção

### Objetivo

Distinguir o menor sistema capaz de demonstrar a tese dos controles necessários para produção.

### MVA

O MVA deve ser implementável sem MCP, memória persistente ou uma ferramenta específica.

Seus componentes são:

```text
Specification pequena e versionada
        +
Snapshot / representação estrutural limitada
        +
Agente probabilístico
        +
Action Gateway mínimo
        +
Validação explícita
        +
Evidence Record
        +
Baseline sem grounding
```

O MVA deve demonstrar:

- identidade do snapshot;
- escopo permitido e proibido;
- proposta do agente separada de autoridade;
- execução em workspace reversível;
- pelo menos um oracle independente;
- registro de PASS, FAIL e UNKNOWN;
- detecção de pelo menos um contraexemplo;
- comparação com baseline sem grounding.

### Produção

Explique que produção exige adicionalmente:

- credenciais de privilégio mínimo;
- autorização por recurso e operação;
- enforcement downstream;
- sandboxing real;
- controle de rede e filesystem;
- pinning e proveniência de ferramentas, schemas e dependências;
- logs, métricas e tracing com redaction;
- prevenção de replay;
- aprovação por raio de impacto;
- rollback testado;
- inventário de testes esperado;
- tratamento de flaky tests e checks stale;
- auditoria de alterações de policy e ferramentas;
- proteção contra prompt injection, tool poisoning e tool misuse.

Não apresentar o MVA como prova de prontidão produtiva.

---

## Seção 8 — Hipótese experimental e limites

### Hipótese causal

Inclua uma formulação semelhante:

> **Sob tarefas comparáveis e orçamento controlado, adicionar grounding estrutural versionado, restrições de ação e validação explícita reduz determinados tipos de mismatch entre intenção, estado do repositório e ação do agente, sem aumentar desproporcionalmente custo, latência, número de iterações ou intervenção humana em relação a um baseline sem esses mecanismos.**

Classifique-a como **HYPOTHESIS**.

### Baseline

Compare:

```text
Baseline:
Agent → Context → Tools → Code → Tests
```

com:

```text
Proposed:
Agent → Structural Grounding → Action Constraints
       → Validation → Evidence → Reconciliation
```

### Ablações

Apresente pelo menos:

1. agente com contexto e ferramentas, sem representação estrutural;
2. representação estrutural, sem gateway;
3. gateway, sem validação posterior;
4. validação, sem grounding estrutural;
5. composição completa do MVA;
6. composição completa com memória, MCP e scanners adicionais.

### Variáveis observáveis

- dependency/API assumptions incorretas;
- scope violations;
- architectural violations;
- regressões comportamentais;
- requisitos não satisfeitos;
- vulnerabilidades detectadas;
- falsos `PASS`;
- falsos `FAIL`;
- quantidade de `UNKNOWN`;
- custo de tokens e ferramentas;
- latência;
- número de iterações;
- intervenção humana;
- cobertura e validade dos oráculos.

### Critério de enfraquecimento

A tese deve ser enfraquecida se:

- o MVA não reduzir os mismatches definidos;
- os ganhos dependerem apenas de mais contexto ou mais tentativas;
- o custo crescer desproporcionalmente;
- os resultados desaparecerem com ambiente e oracles controlados;
- o baseline for comparado com critérios diferentes;
- a métrica puder ser melhorada removendo testes ou relaxando predicados.

A página não precisa apresentar o protocolo experimental completo, mas deve deixar claro que a arquitetura é uma hipótese testável, não uma conclusão universal.

---

## Seção 9 — Contraexemplos e limites

A página deve manter quatro contraexemplos centrais.

### Contraexemplo 1 — Contexto stale e arquitetura

Código sintaticamente correto e funcional em isolamento usa contexto de `C1`, mas o repositório está em `C2`. A mudança introduz dependência inexistente, altera arquivo fora do escopo e viola a arquitetura.

**Lição:** contexto coerente não é estado atual.

### Contraexemplo 2 — Privacidade não observada

Todos os testes de API passam, mas dados pessoais são enviados a logs e terceiros, retidos além da finalidade e acessíveis de forma ampla.

**Lição:** interface e comportamento observados não cobrem propriedades ausentes dos oráculos.

### Contraexemplo 3 — Ferramenta secundária com autoridade maior

Uma chamada de leitura induz uma segunda chamada de escrita em produção. O primeiro gateway aprova a leitura e não mede a cadeia secundária.

**Lição:** schema, aprovação inicial e allowlist parcial não substituem mediação completa.

### Contraexemplo 4 — Falso progresso por remoção do teste

Um teste falho é marcado como `skip`, e o sistema mede apenas o agregado verde.

**Lição:** um gap menor pode representar menor observação, não software melhor.

### Limitações que devem ser explicitadas

- propriedades podem estar erradas ou incompletas;
- validators podem compartilhar o mesmo defeito;
- análise estática pode usar build incompleto;
- grafo pode estar stale;
- policy escrita pode não ser aplicada;
- ferramenta pode possuir efeito lateral não declarado;
- proveniência pode provar a decisão sem provar a correção;
- sandbox pode reduzir blast radius sem isolar completamente;
- revisão humana pode falhar;
- confiança do modelo não é garantia de verdade;
- cobertura de testes não é correção global.

---

# 7. Instruções prescritivas que devem aparecer na página

A página deve possuir uma seção final ou caixas operacionais com instruções agrupadas por momento.

## Antes de o agente agir

- Fixe commit, branch, árvore e ambiente relevantes.
- Declare escopo permitido e proibido.
- Separe `Desired State` de `Current State`.
- Transforme cada requisito em critério de aceitação.
- Associe cada critério a um oracle.
- Declare o que deve produzir `UNKNOWN`.
- Classifique o raio de impacto da ação.

## Durante o planejamento

- Trate contexto sem proveniência como não confiável.
- Não trate memória histórica como estado atual.
- Dê origem, validade e tipo a cada relação estrutural.
- Marque runtime não observado como `UNKNOWN` ou `POSSIBLE`.
- Faça o agente propor a ação sem conceder autoridade implícita.

## Antes da execução

- Valide schema, parâmetros, identidade e recurso canônico.
- Compare o diff previsto com a allowlist.
- Resolva dependências no registry e lockfile reais.
- Consulte policy-as-code fora do modelo.
- Exija aprovação proporcional ao impacto.
- Use credencial mínima e ambiente limitado.
- Revalide o snapshot imediatamente antes do efeito.

## Depois da execução

- Recalcule snapshot e diff.
- Execute validators versionados.
- Separe falha funcional de erro de infraestrutura.
- Não transforme skip, timeout ou ausência de evidência em `PASS`.
- Preserve divergências como `CONFLICT`.
- Registre subject, oracle, validator, ambiente e limitações.
- Atualize a especificação somente por decisão explícita.
- Reconcilie evidência com a intenção e o estado observado.

---

# 8. Coerência com conceitos já usados no site

## 8.1 Limiar de 98% de certeza

As páginas existentes usam um limiar de confiança como mecanismo operacional de abstention.

A nova página deve qualificar esse conceito sem criar contradição:

> Um score de confiança pode ser usado como sinal de roteamento ou abstention se tiver sido calibrado para a tarefa. Ele nunca substitui a validação estrutural, a autorização, a proveniência ou o oracle do domínio.

Para mudanças de software, prefira:

```text
oracle verificável
+ escopo
+ proveniência
+ ambiente
+ abstention
```

A página não deve sugerir que 98% de confiança textual seja prova de alinhamento com o repositório.

## 8.2 MCP como fronteira de segurança

Preserve a ideia de MCP como fronteira de interoperabilidade e ferramentas, acrescentando:

> MCP descreve e transporta capacidades. A autoridade efetiva deve ser aplicada pelo gateway e pelo sistema downstream.

## 8.3 GraphRAG e mundo aberto

Preserve a ideia de que ausência de dado deve ser tratada como incerteza. Acrescente:

- relações tipadas melhoram rastreabilidade;
- relações tipadas não garantem frescor;
- presença no grafo precisa de versão e validade;
- ausência deve resultar em `UNKNOWN`, não em falso;
- Snapshot Capsule é necessária para associar o grafo ao estado atual.

## 8.4 Crash Silencioso

Reutilize o conceito, mas specialize-o:

> **Crash Silencioso de engenharia agêntica:** o agente produz uma mudança que compila, passa nos checks disponíveis e ainda assim viola o estado, a arquitetura, o escopo ou uma propriedade não observada.

---

# 9. Fluxo de leitura recomendado

A página deve ser compreensível em camadas:

1. **Superfície:** o problema, a tese e o exemplo central;
2. **Mecanismo:** estados, contratos, gateway, oráculos e evidência;
3. **Aplicação:** instruções MVA, produção, contraexemplos e procedimento de início;
4. **Núcleo técnico:** envelope de determinismo, grafo estrutural, taxonomia epistemológica e hipótese experimental.

A densidade técnica deve crescer ao longo da página. Não despeje todo o glossário ou todas as referências no início.

---

# 10. Navegação editorial recomendada

A nova página deve ser referenciada a partir de:

- **Apresentação:** depois de determinismo e Spec-Driven Development;
- **Engenharia da Confiança:** entre o inventário do estado atual e a arquitetura de contratos;
- **Engenharia de Agentes:** depois de contratos rígidos e MCP;
- **Devin:** depois do fluxo `Spec → Retrieve → Refatorar → Validar`;
- **Case Agents:** depois da Guarda de Direção;
- **Formulação de Problemas:** depois de suficiência decisional;
- **Sustentação:** no ciclo que leva incidentes de volta à especificação.

A nova página deve devolver o leitor para:

- a visão geral de Arquitetura de IA auditável;
- os princípios de Engenharia de Agentes;
- o caso de roteamento de ferramentas;
- o método de Sustentação e Resiliência.

---

# 11. Critérios de aceitação do conteúdo final

A página elaborada pela outra LLM só estará completa se:

1. explicar o Agent–Repository Gap sem reduzi-lo a “alucinação”;
2. definir `A_t`, `S_t`, `D` e `G_t`;
3. separar Current State, Desired State, Historical State, Policy State e Evidence State;
4. definir a taxonomia de cinco desvios como proposta;
5. explicar por que RAG, GraphRAG e memória não garantem frescor do repositório;
6. apresentar Snapshot Capsule;
7. apresentar representação estrutural do código e seus limites;
8. diferenciar grounding, enforcement, validation, evidence e reconciliation;
9. separar autonomia de autoridade;
10. explicar Action Gateway, least privilege, sandbox, policy-as-code e mediação downstream;
11. explicar que MCP não é autorização nem validador semântico;
12. apresentar os quatro níveis de contrato;
13. definir determinismo dentro de um envelope controlado;
14. explicar a força limitada de diferentes oráculos;
15. definir `PASS`, `FAIL`, `UNKNOWN` e `CONFLICT`;
16. incluir Evidence Record com subject, oracle, validator, ambiente, configuração, digest, cobertura e limitações;
17. incluir os quatro contraexemplos obrigatórios;
18. diferenciar MVA de produção;
19. incluir hipótese, baseline, ablações e variáveis observáveis em nível resumido;
20. fornecer instruções antes, durante e depois da ação;
21. preservar as distinções epistemológicas;
22. conectar explicitamente a página às páginas existentes;
23. evitar repetição de visão geral, catálogo de ferramentas ou propaganda tecnológica;
24. não prometer determinismo global, correção global ou eliminação de risco;
25. concluir com um procedimento prático de início.

---

# 12. Referências necessárias

A página final deve usar referências numéricas em Markdown, com títulos completos. As fontes abaixo constituem o conjunto mínimo recomendado. A LLM autora pode acrescentar fontes, mas deve verificar cada uma e não usar snippets de busca como evidência suficiente.

## Engenharia de requisitos e especificação

[1]: https://www.iso.org/standard/72089.html "ISO/IEC/IEEE 29148:2018 — Systems and software engineering — Life cycle processes — Requirements engineering"

[2]: https://standards.ieee.org/standard/29148-2018.html "IEEE/ISO/IEC 29148-2018 — Requirements engineering"

[3]: https://standards.ieee.org/ieee/1016/4502/ "IEEE 1016-2009 — Software Design Descriptions"

[4]: https://www.nasa.gov/reference/appendix-c-how-to-write-a-good-requirement/ "Appendix C: How to Write a Good Requirement"

[5]: https://nodis3.gsfc.nasa.gov/displayDir.cfm?Internal_ID=N_PR_7150_002D_\u0026page_name=Chapter4 "NPR 7150.2D — Chapter 4: Software Engineering Life Cycle Requirements"

[6]: https://www.nist.gov/document/formal-speci-cations-certi-able-cryptography "Formal Specifications for Certifiable Cryptography"

## Análise estrutural e estado do repositório

[7]: https://www.di.ens.fr/~cousot/COUSOTpapers/POPL77.shtml "Abstract interpretation: a unified lattice model for static analysis of programs by construction or approximation of fixpoints"

[8]: https://codeql.github.com/docs/codeql-overview/about-codeql/ "About CodeQL"

[9]: https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/ "About data flow analysis"

[10]: https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/manage-your-configuration/codeql-for-compiled-languages "CodeQL code scanning for compiled languages"

[11]: https://www.archunit.org/userguide/html/000_Index.html "ArchUnit User Guide"

[12]: https://docs.github.com/en/rest/commits/commits "REST API endpoints for commits"

[13]: https://git-scm.com/docs/git-rev-parse "git-rev-parse Documentation"

[14]: https://docs.npmjs.com/threats-and-mitigations/ "npm Threats and Mitigations"

## Recuperação, memória e contexto

[15]: https://arxiv.org/abs/2005.11401 "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"

[16]: https://arxiv.org/html/2406.10279v3 "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs"

## Agentes, ferramentas e segurança

[17]: https://modelcontextprotocol.io/specification/draft/server/tools "Model Context Protocol — Tools"

[18]: https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization "Model Context Protocol — Authorization"

[19]: https://genai.owasp.org/llmrisk/llm01-prompt-injection/ "OWASP LLM01:2025 Prompt Injection"

[20]: https://genai.owasp.org/llmrisk/llm062025-excessive-agency/ "OWASP LLM06:2025 Excessive Agency"

[21]: https://owasp.org/www-project-mcp-top-10/ "OWASP MCP Top 10"

[22]: https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html "AI Agent Security Cheat Sheet"

[23]: https://csrc.nist.gov/glossary/term/least_privilege "Least privilege — NIST CSRC Glossary"

[24]: https://www.openpolicyagent.org/docs "Open Policy Agent Documentation"

[25]: https://docs.docker.com/engine/security/ "Docker Engine security"

## Oráculos, testes e evidência

[26]: https://dl.acm.org/doi/10.1109/TSE.2014.2372785 "The Oracle Problem in Software Testing: A Survey"

[27]: https://github.com/in-toto/attestation/blob/main/spec/predicates/test-result.md "in-toto Predicate type: Test Result"

[28]: https://github.com/in-toto/attestation/blob/main/spec/v1/statement.md "in-toto Statement layer specification"

[29]: https://www.w3.org/TR/prov-o/ "PROV-O: The PROV Ontology"

[30]: https://slsa.dev/spec/v1.2/provenance "SLSA Provenance v1.2"

[31]: https://research.google/pubs/state-of-mutation-testing-at-google/ "State of Mutation Testing at Google"

[32]: https://www.cs.tufts.edu/~nr/cs257/archive/john-hughes/quick.pdf "QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs"

[33]: https://csrc.nist.gov/Projects/automated-combinatorial-testing-for-software/automated-test-generation-using-model-checking/oracle-free-testing "Oracle-free Testing"

[34]: https://docs.pytest.org/en/stable/how-to/skipping.html "How to use skip and xfail to deal with tests that cannot succeed"

## Páginas do ecossistema editorial

[35]: https://mauricio.issei.com.br/apresentacao.html "Arquitetura de IA auditável"

[36]: https://mauricio.issei.com.br/engenharia-confianca.html "A Engenharia da Confiança — Da Intenção à Execução Agêntica"

[37]: https://mauricio.issei.com.br/engenharia-agentes-ia.html "Engenharia de Agentes de IA — Os 10 princípios do determinismo"

[38]: https://mauricio.issei.com.br/agent-ready.html "Agent Ready — o site legível por agentes"

[39]: https://mauricio.issei.com.br/knowledge-os-presentation.html "Knowledge OS Enterprise — Arquitetura IA-First de Conhecimento"

[40]: https://mauricio.issei.com.br/case-agents.html "Case Agents: a tool errada não é uma aproximação aceitável"

[41]: https://mauricio.issei.com.br/sustentacao.html "Do Caos à Resiliência — Sustentação de Sistemas em Produção"

[42]: https://mauricio.issei.com.br/service-operations-2-0.html "Service Operations 2.0 — Resiliência Sistêmica"

[43]: https://mauricio.issei.com.br/know.html "Navegando na Complexidade — O Fim das Melhores Práticas"

[44]: https://mauricio.issei.com.br/devin.html "Vibe Coding com Devin — De Executor a Orquestrador Cognitivo"

[45]: https://mauricio.issei.com.br/formulacao-de-problemas.html "Formulação de Problemas — Engenharia Interrompida"

[46]: https://mauricio.issei.com.br/socialselling.html "SocialSelling — Busca de clientes mais eficiente com IA"

---

# 13. Instrução final para a LLM autora

Antes de entregar o conteúdo final:

1. verifique se a página explica um mecanismo, não apenas uma visão;
2. certifique-se de que cada conceito central possui definição, uso, limite e contraexemplo;
3. classifique propostas e hipóteses sem apresentá-las como fatos;
4. use as referências para sustentar afirmações externas;
5. conecte a página às páginas existentes sem repetir seus conteúdos;
6. preserve a diferença entre estado desejado, estado atual, política e evidência;
7. não transforme `PASS` em “software correto”;
8. não transforme schema em autorização;
9. não transforme RAG em sincronização de estado;
10. não transforme MCP em segurança completa;
11. não transforme confiança do modelo em verdade;
12. conclua com orientações que o leitor possa executar em um MVA de baixo risco.

A página estará pronta quando o leitor conseguir responder, para qualquer ação de um agente:

```text
O que o agente acredita?
O que foi observado no repositório?
O que deveria ser verdadeiro?
Qual ação foi proposta?
Quem autorizou?
Qual efeito foi permitido?
Qual oracle avaliou?
Sobre qual subject e ambiente?
O que o PASS realmente prova?
O que continua UNKNOWN?
Qual é a decisão de reconciliação?
```
