# Guia Definitivo: Estruturando Projetos para Agent-Driven Development e Vibe Coding

> Uma documentação fundacional para desenvolvedores, arquitetos e gestores que querem montar um repositório otimizado tanto para humanos quanto para Agentes de IA autônomos.

Este guia parte de uma ideia simples: a forma como organizamos um projeto de software muda profundamente quando o principal "leitor" do repositório deixa de ser apenas um humano e passa a ser também uma inteligência artificial que planeja e executa tarefas sozinha. O que se segue é o mapa dessa nova forma de trabalhar.

---

## 1. Introdução ao Paradigma

### O que é Agent-Driven Development

**Agent-Driven Development** (Desenvolvimento Orientado a Agentes) é a prática de estruturar um projeto para que um Agente de IA autônomo possa **ler o contexto, planejar uma tarefa e executá-la de ponta a ponta** — escrevendo código, rodando testes e integrando a mudança — com supervisão humana nos pontos certos, e não em cada linha.

A diferença em relação ao uso comum de IA é de grau de autonomia. Um **copilot** sugere a próxima linha enquanto você digita; ele é reativo e vive dentro do seu editor. Um **agente** recebe um objetivo ("implemente este módulo") e conduz o trabalho inteiro: consulta a documentação, decide a abordagem, escreve, testa e abre a integração.

Essa mudança transfere responsabilidade do humano para a máquina. E responsabilidade exige estrutura.

### O que é Vibe Coding

**Vibe Coding** é o estilo de desenvolvimento em que o humano descreve a intenção em linguagem natural e a IA materializa o código. O foco sai da sintaxe e vai para a clareza da intenção e do contexto.

O risco do Vibe Coding mal feito é virar "caos de prompts": pedidos soltos, sem memória, que geram código inconsistente e impossível de manter. O Vibe Coding maduro resolve isso com **contexto estruturado e persistente** — o tema central deste guia.

Há ainda um risco mais sutil e perigoso: o do **código elegante, mas errado**. LLMs são extraordinários em produzir código que *parece* perfeito — sintaxe impecável, nomes bem escolhidos, estrutura convincente — e que mesmo assim está logicamente incorreto ou fere uma regra de negócio. É a **alucinação sintática**: a aparência de correção sem a substância. Por isso, fazer Vibe Coding sem uma rede de testes forte não é ágil, é imprudente. A confiança que o código bonito inspira é exatamente o que o torna traiçoeiro.

### Por que a estrutura do projeto muda

Quando a IA é apenas um copilot, o contexto vive na cabeça do desenvolvedor. Quando a IA é um agente autônomo, **o contexto precisa viver no repositório**, escrito de forma que a máquina consiga ler e seguir.

Um agente não tem intuição sobre decisões passadas, convenções implícitas ou "o jeito que fazemos as coisas aqui". Tudo isso precisa estar documentado de forma explícita e acessível.

O resultado é uma inversão importante. A documentação deixa de ser um subproduto opcional escrito no final e passa a ser **infraestrutura de primeira classe** — tão crítica quanto o código, porque é literalmente o que dirige o agente.

> **Regra de ouro:** num projeto Agent-Driven, contexto não documentado é contexto que não existe. Se o agente não consegue ler, o agente não sabe.

---

## 2. O Dicionário da Nova Arquitetura

Esta seção define os pilares que sustentam um repositório pronto para agentes. Cada um resolve um problema específico de comunicação entre humanos, máquinas e o tempo.

### SDD — Software Design Document

O **SDD** é a bússola do projeto. É o documento que descreve **o que o sistema é, o que ele faz e quais são seus limites** — a visão, a arquitetura, o escopo e, sobretudo, o que está **fora** de escopo.

Seu propósito prático é dar ao agente uma fonte da verdade estável sobre o desenho do sistema. Antes de implementar qualquer coisa, o agente consulta o SDD para entender onde a peça se encaixa e quais restrições respeitar.

Um bom SDD evita que o agente "invente" funcionalidades ou tome decisões de arquitetura que contrariam a visão do produto.

### ADR — Architecture Decision Records

Os **ADRs** são a memória histórica do projeto. Cada ADR registra **uma decisão de arquitetura importante**: o contexto que a motivou, a decisão tomada, as alternativas consideradas e as consequências aceitas.

Seu propósito é impedir que erros do passado se repitam. Quando o agente (ou um humano novo) pergunta "por que não usamos um banco de dados aqui?", a resposta está num ADR — com a justificativa completa.

ADRs são imutáveis e cumulativos: não se apaga uma decisão antiga, registra-se uma nova que a supera. Isso cria uma trilha de raciocínio que o agente pode seguir para não desfazer escolhas deliberadas.

> **Regra de ouro:** o SDD diz o que o sistema é hoje; os ADRs explicam por que ele chegou até aqui. Juntos, eles dão ao agente memória e direção.

### BDD — Behavior-Driven Development

O **BDD** é o contrato de testes que humanos e máquinas leem da mesma forma. Os comportamentos do sistema são descritos em **Gherkin** — uma linguagem estruturada de "Dado / Quando / Então" — antes de o código existir.

Seu propósito é duplo. Para o humano, é uma especificação legível do que o sistema deve fazer. Para o agente, é um alvo executável: ele implementa até que todos os cenários passem.

O BDD transforma "funciona" numa definição objetiva e verificável, eliminando ambiguidade sobre o que significa terminar uma tarefa.

### DoR e DoD — Definition of Ready e Definition of Done

A **Definition of Ready (DoR)** e a **Definition of Done (DoD)** são as barreiras de governança que cercam cada tarefa.

A **DoR** define quando uma tarefa está pronta para **entrar** em execução: objetivo claro, contrato definido, cenários de teste esboçados, dependências resolvidas e nenhuma decisão de design em aberto. Uma tarefa que falha na DoR não vai para o agente — porque ambiguidade entregue a um agente vira código errado com confiança.

A **DoD** define quando uma tarefa está pronta para ser considerada **concluída**: testes verdes, verificações de qualidade aprovadas, integração feita por revisão e estado do projeto atualizado.

Seu propósito é proteger o agente de si mesmo. Sem fronteiras explícitas, um agente autônomo tende a "preencher as lacunas" com suposições. A DoR fecha as lacunas antes; a DoD valida o resultado depois.

> **Regra de ouro:** a qualidade de um sistema agêntico é decidida na fronteira da tarefa, não no meio dela. Especifique bem antes de delegar.

### MCP — Model Context Protocol

O **MCP** é o protocolo padronizado pelo qual a IA interage com o ambiente e com ferramentas externas. É o que permite ao agente ir além de gerar texto: ler arquivos, consultar documentação, acessar serviços e executar ações no mundo real.

Seu propósito prático é dar ao agente "mãos e olhos" de forma controlada e configurável. Em vez de integrações improvisadas, o MCP oferece uma interface uniforme para conectar capacidades ao agente.

Num repositório bem estruturado, a configuração de MCP declara explicitamente quais ferramentas o agente pode usar — o que também é uma fronteira de segurança.

---

## 3. A Anatomia do Repositório

Aqui mapeamos onde cada pilar vive. A regra geral é que cada diretório tem uma responsabilidade única e previsível, para que o agente saiba sempre onde procurar e onde escrever.

### As pastas `.ai/` e `.claude/` — o cérebro e o estado do agente

Estas pastas contêm o que o agente precisa para operar: seu estado e suas habilidades.

O arquivo de progresso (por exemplo, um `PROGRESS.md` dentro de `.ai/state/`) é a **âncora de estado** do projeto. É onde se registra "onde paramos": o marco atual, a próxima ação e o histórico recente. Todo run autônomo lê esse arquivo no início e o atualiza no fim — é a memória de curto prazo que permite retomar o trabalho entre sessões.

A pasta de habilidades (por exemplo, `.claude/skills/`) contém **procedimentos reutilizáveis** que o agente pode invocar: rotinas para especificar uma tarefa, para sincronizar o quadro de trabalho, para implementar um módulo seguindo o processo padrão.

Aqui também vivem as configurações e permissões do agente, definindo o que ele pode e não pode fazer no ambiente.

Um ponto crítico de maturidade: **esses arquivos de contexto e estado devem ser versionados no Git**, junto com o código-fonte. O PROGRESS.md, as habilidades em SKILL.md, as configurações do agente — tudo entra no controle de versão como cidadão de primeira classe. A razão é poderosa. Versionar o estado cognitivo permite fazer rollback não apenas do software, mas da **memória e do raciocínio do agente** num ponto específico no tempo. Se uma mudança de contexto levou o agente a uma direção ruim, você volta o repositório para o commit anterior e recupera, ao mesmo tempo, o código *e* o estado mental que o produziu. Código e cognição evoluem juntos e são restauráveis juntos.

> **Regra de ouro:** trate o estado cognitivo do agente como código. O que não está no Git não pode ser auditado, comparado nem revertido — e um agente sem memória versionada é um agente cujo passado você não controla.

### A pasta `docs/` — a biblioteca de contexto

Esta é a biblioteca que o agente consulta para entender o projeto. É onde moram os pilares de conhecimento e governança.

Um subdiretório guarda os **ADRs** (por exemplo, `docs/decisions/`), com o histórico de decisões de arquitetura. Outro guarda os **SDDs e especificações** (por exemplo, `docs/specs/`), com a visão e o desenho do sistema. Um terceiro guarda a **governança** (por exemplo, `docs/governance/`), com as definições de DoR/DoD e o modo de operação do time.

É comum haver também uma pasta de planejamento, com o plano-mestre e o backlog, e uma de aprendizados, onde lições recorrentes são registradas para o agente não tropeçar duas vezes na mesma pedra.

### A pasta `tests/` — a validação contínua

Esta pasta materializa o BDD e é o que dá ao agente um critério objetivo de sucesso.

Os arquivos de cenários (por exemplo, em `tests/features/`) contêm as especificações em Gherkin: os comportamentos esperados em linguagem legível. Os arquivos de passos (por exemplo, em `tests/steps/`) ligam cada frase do Gherkin ao código que a verifica.

Há ainda os dados de teste gravados (fixtures): respostas de serviços externos capturadas uma vez e reutilizadas, para que os testes rodem sem rede, de forma rápida e determinística.

Esta pasta é, na prática, a **defesa do projeto contra alucinações elegantes**. Como o agente gera código que parece correto com facilidade, a única forma confiável de separar o que de fato funciona do que apenas convence é submeter tudo aos cenários BDD. Os testes são a primeira linha de defesa — porque o agente implementa contra eles — e a última — porque nada entra na base principal sem passá-los. Num projeto Agent-Driven, a cobertura de testes não é uma métrica de higiene; é o que torna a autonomia segura.

> **Regra de ouro:** num projeto com IA, código bonito não é prova de nada. A prova é o teste verde. Se o comportamento não está coberto por um cenário, considere-o quebrado até que esteja.

### As pastas `scripts/` e `.github/` — os gates de automação e DevOps

Estas pastas contêm os "portões" automáticos que garantem qualidade sem depender de disciplina manual.

A pasta de scripts (por exemplo, `scripts/`) reúne as ferramentas locais: o **quality gate** que roda linter, verificação de tipos e testes de uma vez; o script de bootstrap que monta o ambiente do zero; e utilitários para criar tarefas ou gravar fixtures.

A pasta de integração contínua (por exemplo, `.github/`) define a automação no servidor: os fluxos de CI que rodam a cada mudança, os modelos de pull request e de issues. É aqui que se garante que nada entra na base principal sem passar pelos mesmos testes verdes.

Estes gates têm uma dimensão que projetos tradicionais não conhecem: a **financeira**. Quando se dá autonomia a um agente, o consumo de tokens e os custos de API podem escalar de forma exponencial — basta a IA ficar presa num loop de tentativa e erro, refazendo a mesma tarefa indefinidamente, para uma noite de execução virar uma fatura inesperada. Por isso, os gates de automação devem incluir **restrições operacionais e financeiras**, não apenas de qualidade. Na prática, isso significa limites de iterações nos scripts (o agente para depois de N tentativas em vez de insistir para sempre), orçamentos diários de requisições ou de gasto, e um comportamento de "falhar e parar" quando o teto é atingido — registrando o bloqueio honestamente em vez de queimar recursos. O agente deve parar num ponto seguro quando o orçamento acaba, exatamente como pararia diante de um teste vermelho.

> **Regra de ouro:** autonomia sem teto de custo é um risco financeiro, não uma funcionalidade. Todo agente que gasta recursos precisa de um gate que diga "até aqui" — em iterações, em requisições e em dinheiro.

> **Regra de ouro:** se uma verificação de qualidade depende de alguém lembrar de fazê-la, ela vai falhar. O que importa precisa estar num gate automático que o agente e o humano são obrigados a passar.

---

## 4. Guia de Construção: Como criar esta estrutura

Há duas formas de chegar a um repositório como este. A primeira usa a própria IA para gerar a fundação; a segunda constrói à mão. As duas convergem para a mesma estrutura.

### A Abordagem LLM — Bootstrapping via Meta-Prompt

A ideia aqui é usar um LLM de contexto longo para **gerar a fundação do projeto a partir de um único prompt arquitetural** bem escrito, chamado de meta-prompt ou Master Context.

O meta-prompt é um documento que descreve, em alto nível, tudo o que o projeto precisa: a visão do produto, as restrições de arquitetura, os guardrails (o que nunca fazer), o estilo de trabalho e a estrutura de pastas desejada. Ele é, essencialmente, o briefing completo entregue à IA.

A partir dele, o LLM gera a árvore de diretórios e os arquivos base: o SDD inicial, o arquivo de estado (PROGRESS.md), o primeiro ADR registrando as decisões fundacionais, os modelos de cenários BDD e os scripts de validação.

O fluxo prático segue mais ou menos esta ordem:

- Escreva o Master Context descrevendo visão, escopo, guardrails e estrutura.
- Peça ao LLM para gerar a árvore de pastas e os arquivos fundacionais a partir dele.
- Revise criticamente o que foi gerado — o humano valida a fundação antes de prosseguir.
- Ajuste o meta-prompt e regenere os pontos fracos até a base ficar sólida.

A grande vantagem é a velocidade: em minutos você tem um esqueleto coerente. A grande responsabilidade é a revisão: a fundação gerada vira a verdade que o agente seguirá depois, então erros aqui se propagam.

> **Regra de ouro:** invista mais tempo no meta-prompt do que no código gerado. Um Master Context claro produz uma fundação sólida; um vago produz caos elegante.

### A Abordagem Manual — Do It Yourself

Construir à mão dá controle total e um entendimento profundo de cada peça. A sequência lógica importa: comece pelo contexto, depois a visão, depois as regras de validação e só então o código.

O passo a passo recomendado:

- **Passo 1 — Crie as pastas de contexto.** Monte a estrutura de diretórios primeiro: `.ai/`, `docs/`, `tests/`, `scripts/`. Crie o arquivo de estado (PROGRESS.md) vazio. Isso estabelece os lugares onde tudo vai morar.
- **Passo 2 — Escreva o SDD base.** Documente a visão do produto, o escopo e, com igual cuidado, o que está fora de escopo. Este é o documento que ancora todas as decisões seguintes.
- **Passo 3 — Registre o primeiro ADR.** Documente as decisões de arquitetura fundacionais (linguagem, persistência, dependências principais) com suas justificativas. Comece a memória histórica desde o dia um.
- **Passo 4 — Defina as regras de validação via scripts.** Escreva o quality gate (linter, tipos, testes) como um único comando. Configure a integração contínua para rodar esse gate a cada mudança. A barreira de qualidade precisa existir antes do primeiro código de produto.
- **Passo 5 — Escreva o primeiro cenário BDD.** Antes de implementar a primeira funcionalidade, descreva seu comportamento esperado em Gherkin. Estabeleça o hábito de especificar antes de codar.
- **Passo 6 — Estabeleça DoR e DoD.** Documente, na pasta de governança, o que torna uma tarefa pronta para começar e pronta para terminar. A partir daqui, toda tarefa passa por esses portões.

Só depois desses seis passos o desenvolvimento de funcionalidades começa — agora sobre uma fundação que o agente consegue ler e respeitar.

> **Regra de ouro:** construa o contexto e os gates antes da primeira linha de código de produto. É tentador inverter a ordem, mas um agente solto numa estrutura incompleta gera dívida mais rápido do que valor.

---

## Conclusão

Estruturar um projeto para Agent-Driven Development não é burocracia — é o que torna a autonomia segura. Cada pilar resolve um problema concreto: o SDD dá direção, os ADRs dão memória, o BDD dá um alvo objetivo, a DoR e a DoD dão fronteiras, e o MCP dá ao agente mãos controladas.

A estrutura de pastas é a materialização disso: um lugar previsível para o estado, para o contexto, para a validação e para a automação. E a construção, seja via meta-prompt ou à mão, segue sempre a mesma lógica — contexto e gates primeiro, código depois.

O investimento se paga rápido. Um repositório bem estruturado transforma a IA de uma fonte de surpresas em um colaborador previsível, e transforma o Vibe Coding de uma aposta em um processo de engenharia confiável.

> **A ideia final:** você não está apenas escrevendo código para a máquina executar. Está escrevendo o contexto que ensina a máquina a escrever o código. Faça esse contexto bem, e o resto segue.
