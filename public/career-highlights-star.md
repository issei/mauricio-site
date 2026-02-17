# Casos de Sucesso - Metodologia STAR

Exemplos práticos de projetos e desafios técnicos resolvidos ao longo da carreira, organizados pela metodologia **STAR** (Situação, Tarefa, Ação, Resultado).

---

## 2025

### Pipe Automática Comercial

**🎯 Desafio (Situação/Tarefa)**

Lista de atuação do executivo não tinha uma priorização inteligente para otimizar o tempo de planejamento do dia e da meta a ser atendida pelo executivo.

**Tarefas:**
- Discovery e implementação de solução de viabilidade rápida para atender as dores e avaliar o modelo e metodologia do planejamento

**⚡ Minha Atuação (Ação)**

- Desenhado solução de contorno para processar a inteligência de priorização na própria Salesforce com processos batchs agendados

**📊 Impacto (Resultado)**

- **Aumento de mais de 15%** no atingimento das metas
- Agilidade nos agendamentos e atendimentos aos clientes

**🛠️ Stack:** Salesforce

---

## 2024

### Projeto de Agrupamento Comercial

**🎯 Desafio (Situação/Tarefa)**

- Automações legadas tinham um processo com **SLA de até 10 dias** para efetivar a taxa do contrato para o cliente
- Processo com falhas e com muitas dependências manuais
- Sem validação do arranjo dos participantes do grupo

**Tarefas:**
- Discovery e desenho de solução técnica para viabilizar a modernização
- Desenvolvimento de aplicação de validação de arranjo de participantes

**⚡ Minha Atuação (Ação)**

- Implementado e refinado solução para implementação do novo agrupamento Comercial junto ao time

**📊 Impacto (Resultado)**

- Modernização do processo com validação e efetivação **em tempo de proposta** (redução de 10 dias para tempo real)

**🛠️ Stack:** Java | AWS | APIs

---

### Projeto de Entrega na Hora da Máquina pelo Executivo

**🎯 Desafio (Situação/Tarefa)**

Apenas era entregue a máquina após processo de abertura de Ordem de Serviço que era atendido apenas por técnicos.

**Tarefas:**
- Viabilizar solução para validação do modelo de atendimento comercial onde era utilizada uma nova tecnologia de auto inicialização da máquina no ato da proposta

**⚡ Minha Atuação (Ação)**

- Implementado no primeiro semestre de 2024 um **MVP** para validação do modelo
- Implementado no segundo semestre arquitetura definitiva para escolha do tipo de tecnologia e quantidade que pode ser entregue na hora pelo comercial

**📊 Impacto (Resultado)**

- Velocidade e metas de ativação no ato do Credenciamento

**🛠️ Stack:** Salesforce | AWS

---

### Implementação do Likert nas Jornadas

**🎯 Desafio (Situação/Tarefa)**

Sem dados de avaliação das jornadas comerciais.

**Tarefas:**
- Viabilizar a captura das informações de satisfação da jornada de forma controlada e reutilizável pelas outras jornadas

**⚡ Minha Atuação (Ação)**

- Desenhado solução técnica para padronizar a captura e validação de elegibilidade para captura da pesquisa
- Elaborado POC no Quicksight de relatório de acompanhamento analítico

**📊 Impacto (Resultado)**

- Visibilidade e criação de **OKR de satisfação** das jornadas

**🛠️ Stack:** Quicksight | Salesforce

---

## 2023

### Atualização do Status do Credenciamento em Callback do WF

**🎯 Desafio (Situação/Tarefa)**

- Após o envio das propostas pelo executivo, o executivo precisava ficar consultando o status para saber se a proposta estava efetivada ou teve algum problema
- Para os casos que tiveram algum problema não havia detalhes que orientassem o executivo sobre o que fazer, sendo necessário a abertura de incidente pelo executivo para análise e orientação ou tratativa da proposta
- Alto volume de incidentes e problemas de propostas paradas, pendentes de processamento (status C)

**Tarefas:**
- Implementar serviço que recebe o retorno do status da proposta, que é enviado pelo WF após o processamento
- Mapeamento dos principais motivos de propostas que ficavam paradas por erros ou falhas
- Refinamento de soluções de causa raiz para os problemas identificados

**⚡ Minha Atuação (Ação)**

- Implementado serviço de **callback do WF** para o TV2
- Abertas histórias e priorizadas correções de causa raiz dos problemas das propostas

**📊 Impacto (Resultado)**

- Rapidez no retorno da informação da situação da proposta para os executivos
- Priorização de correções de causa raiz de validações e problemas que deixavam a proposta pendente

**🛠️ Stack:** Salesforce | AWS | APIs

---

## 2022

### Abertura de Conta Corrente PJ pelo Cockpit Rede

**🎯 Desafio (Situação/Tarefa)**

Projeto com viés de experimentação do modelo comercial da Rede para dar autonomia ao Executivo para iniciar a abertura de Conta Corrente Itaú PJ no próprio Cockpit Rede.

**Tarefas:**
- Participação de refinamentos técnicos
- Desenvolvimento de telas e integrações
- Acompanhamento de implantações e de validações
- Revisão e refatoração de integrações
- Discovery para evolução do MVP
- Atendimento de incidentes

**⚡ Minha Atuação (Ação)**

- No acompanhamento do piloto foi identificado melhorias pontuais no MVP para ampliar o número de executivos que experimentavam a solução
- Melhorado logs e monitorações das integrações para rápida identificação de problemas ou divergências

**📊 Impacto (Resultado)**

- Solução estável e proporcionou escalar para a maioria dos executivos utilizarem
- Com ajustes do modelo de atendimento foi encurtado o processo, não sendo necessário atuação do gerente do banco, dando mais autonomia para o executivo

**🛠️ Stack:** Salesforce | Cockpit Rede | Itaú PJ | APIs

---

### Projetos de Evolução do Credenciamento no Plano Padrão

**🎯 Desafio (Situação/Tarefa)**

O credenciamento no plano padrão era tratado em um fluxo diferente de telas com informações, integrações e preenchimento específicos. As principais necessidades da área comercial foram abertas em **3 grandes épicos:**
- Envio de mais de uma máquina no Credenciamento Plano Padrão
- Envio de mais de uma tecnologia no Credenciamento Plano Padrão
- Validação de elegibilidade de contratação de Flex no Credenciamento Plano Padrão

**Tarefas:**
- Implementar no fluxo do plano padrão o preenchimento da quantidade de máquinas por tipo de tecnologia
- Implementar a mesma consulta de elegibilidade da contratação de Flex do Ipricing
- Homologar todas as integrações até a geração das Ordens de Serviço e do PV

**⚡ Minha Atuação (Ação)**

- Refinado as necessidades e elaborado uma estratégia de entregas curtas de simples implementação e em paralelo o discovery da total absorção do fluxo do plano padrão, dentro do processo de negociação do Ipricing 2.0
- Foi entregue inicialmente a possibilidade apenas de informar mais de uma máquina para uma única tecnologia
- Foi entregue na sequência a jornada unificada do Ipricing 2.0 considerando como as opções de oferta padrão, com ou sem Flex dependendo da elegibilidade e também com a possibilidade de escolher mais de um tipo de tecnologia e também informar mais de uma máquina por tecnologia na proposta

**📊 Impacto (Resultado)**

- Otimização da operação logística, conseguindo realizar em **D0** em boa parte dos atendimentos a entrega completa da proposta realizada pelo comercial
- Otimização do operacional do Executivo que não necessita abrir novas solicitações de máquina após a proposta
- Executivo informa corretamente ao cliente em tempo de contratação se possui a antecipação em D2
- Agilidade na entrega das demandas, sendo os **3 grandes épicos resolvidos em duas entregas estratégicas**
- Padronização da jornada de negociação sem mais a necessidade de duas squads para cuidar do Credenciamento Cockpit

**🛠️ Stack:** Salesforce | Ipricing

---

### Credenciamento Pessoa Física

**🎯 Desafio (Situação/Tarefa)**

- Os executivos comerciais apenas tinham a opção de credenciamento de Pessoa Física com plano padrão através do envio por e-mail do formulário PCAE para a central de atendimento que enviava a proposta
- Somente após a efetivação do PV e atualização dos dados na Salesforce (D+2) o executivo poderia renegociar as taxas para o cliente PF no Ipricing 2.0

**Tarefas:**
- Desenvolvimento de um novo fluxo para o PF
- Homologação das integrações
- Implantação com estratégia de expansão de usuários em ondas, com acompanhamento e validação de cada nova proposta

**⚡ Minha Atuação (Ação)**

- Buscado desenvolver um fluxo de telas componentizado com funcionalidades 'funcionais' na Salesforce (low-code) e com micro componentes de telas mais especializados
- Atendimento em paralelo de outro épico envolvido para simplificação e redução de dados cadastrais da proposta de credenciamento

**📊 Impacto (Resultado)**

- Entregue jornada no Cockpit integrada com a negociação do Ipricing, com todas funcionalidades já evoluídas do PJ como a solicitações de mais de uma máquina e mais de uma tecnologia, elegibilidade de Flex, ofertas e negociação de preço

**🛠️ Stack:** Salesforce | Ipricing | Low-code

---

### Validação do Domicílio Bancário no Canal

**🎯 Desafio (Situação/Tarefa)**

Necessidade de validar em tempo de preenchimento de proposta se os dados de domicílio bancário do Itaú, são válidos com uma conta apta para receber pagamentos.

**Tarefas:**
- Desenhar arquitetura de integração
- Refinar com UX como tratar as validações
- Homologação integrada com squad do GE

**⚡ Minha Atuação (Ação)**

- Foi implementado na camada da AWS a integração entre o TV2 e o GE1, sendo apenas o TV2 responsável pela integração com a Salesforce que dispara a consulta

**📊 Impacto (Resultado)**

- Projeto implantado em fases, com público de piloto controlado, com validação e acompanhamento gradual de cada fase, sendo feita expansão total após bastante validações com os executivos e de implementações de melhorias
- Validação com regra de negócio dinâmica sendo o GE1 responsável por determinar se é um retorno de impedimento ou que aceita o domicílio com as mensagens de orientação
- Pequena redução nos casos de suspensão bancária de clientes Itaú. Descoberto que a situação que torna a conta apta para recebimento não se resume em um status

**🛠️ Stack:** AWS | Salesforce

---

### Envio da Formalização do Credenciamento Pelo WhatsApp

**🎯 Desafio (Situação/Tarefa)**

O envio do link para o cliente realizar a formalização da proposta de credenciamento PJ é somente realizado por e-mail.

**Tarefas:**
- Arquitetura de integração entre TV2, QI1 e EP8 do Itaú via ambiente interno
- Autenticação do serviço do Itaú via STS
- Liberação de rotas, regras de segurança e cadastros de aplicações no Itaú
- Condicionar a funcionalidade para público controlado de piloto
- Projeto correlacionado a evoluções da formalização que tem como objetivo dar mais clareza ao cliente do que está sendo contratado

**⚡ Minha Atuação (Ação)**

- Desenhado e alinhado uma arquitetura de integração interna entre AWS Rede e Gateway interno banco
- Realizado os cadastros de aplicações de consumo no STS e do Gateway do banco
- Por falta de time técnico e de priorização pela squad da sigla QI1, foi realizado todo desenvolvimento da parte da sigla de forma de **'innersource'**
- Integração desenvolvida com configurações parametrizadas para possibilitar o reuso por outros canais

**📊 Impacto (Resultado)**

- Piloto em produção funcionou bem, mas foi pivotado devido à correlação deste projeto com as melhorias da formalização que não foram bem aceitas pelos executivos e com falta de processos automatizados que dependia de uma atuação operacional do time de TI para efetivar propostas que não tinham interação do cliente e também sobre formalização de propostas de agrupamento que não era coerente enviar valores e condições que não seriam as efetivadas para o cliente após os processos do agrupamento e equiparação de taxas

**🛠️ Stack:** AWS | STS | WhatsApp API

---

## 2021

### Discovery para Mudança de IPs do Sybase ASE Corp

**🎯 Desafio (Situação/Tarefa)**

Para segregar as redes PCI da Não PCI, foi aberto um projeto para avaliar a alteração do IP do servidor do Sybase ASE Corporativo (siglas GE1, WF1, WM1, etc.) sendo necessário mapear e estimar todas aplicações e serviços que precisariam ser ajustados.

**Tarefas:**
- Encontrar, mapear e estimar esforço para manutenção de cada aplicação ou serviço

**⚡ Minha Atuação (Ação)**

- Busca de fontes versionados
- Análise das configurações de cada aplicação/serviço
- Levantamento de como testar cada aplicação e serviço
- Aplicar e testar em homologação a alteração

**📊 Impacto (Resultado)**

- Projeto foi despriorizado após inicial estimativa de alto impacto em um volume muito grande de aplicações e serviços ainda em levantamento
- Foi apresentado pelo time de infraestrutura outra solução que não seria necessário alterar o IP atual
- Mapeamento e entendimento do time de sustentação sobre muitas aplicações legadas

**🛠️ Stack:** Sybase | Infraestrutura | PCI Compliance

---

### Onboarding do Novo Modelo de Comunidade Integrada e Build&Run

**🎯 Desafio (Situação/Tarefa)**

Integração dos times de projetos com os times de sustentação, sendo necessário incluir na rotina do time de projetos processos de atendimento de chamados, plantão, monitoração e governança do ambiente produtivo.

**Tarefas:**
- Documentar backlog de sustentação
- Capacitar time de projetos no atendimento de incidentes

**⚡ Minha Atuação (Ação)**

- Realização de acompanhamento em duplas com dev e sustentação nos atendimentos dos incidentes e no plantão
- Passagem de conhecimento sobre problemas produtivos recorrentes

**📊 Impacto (Resultado)**

- Times com rotinas de entregas e de sustentação em revezamento de 'rebatedor' e plantonista

**🛠️ Stack:** Agile | DevOps

---

## 2020

### Revisão Orçamentária e CINVEST do Novo Contrato Salesforce

**🎯 Desafio (Situação/Tarefa)**

Com o vencimento do primeiro contrato da Salesforce e significativa expansão de usuários das ferramentas, time não conhecia como era precificado os tipos de licenças e não tinha uma base histórica das aquisições avulsas que já haviam sido feitas e precisava fechar um orçamento bem conservador.

**Tarefas:**
- Reuniões com a Salesforce para detalhar cada tipo de licença
- Revisão de todas as funcionalidades e necessidades previstas
- Alinhar com cada área quantidade de usuários e expectativas de expansões
- Definir uma gestão de limites de licenças

**⚡ Minha Atuação (Ação)**

- Planilhado todos os custos no menor nível de detalhe
- Elaborado apresentação e defesa para CINVEST
- Detalhado para cada time como era composto o orçamento

**📊 Impacto (Resultado)**

- **Economia de mais de 3MM** na negociação do contrato final
- Novo contrato negociado em parceria com CoE Salesforce do Itaú e time de compras
- Clareza das áreas sobre o custo de cada tipo de licença

**🛠️ Stack:** Salesforce | Gestão de Contratos

---

### Revisão Orçamentária de Fornecedores (MGI Tech & Maplink)

**🎯 Desafio (Situação/Tarefa)**

Falta de clareza e conhecimento sobre a precificação do que já estava em uso na produção e das estimativas de expansão das áreas para elaboração de orçamento da área de TI.

**Tarefas:**
- Alinhamento com cada fornecedor para esclarecer a precificação
- Alinhamento com as áreas de Logística e Comercial sobre recursos subutilizados e planejamento de expansão
- Elaboração das novas condições e necessidades para novo contrato

**⚡ Minha Atuação (Ação)**

- Planilhado e construído apresentação e defesa para CINVEST
- Cancelado a contratação de aluguel de tablets para os comerciais
- Revisto e atualizado a versão de celulares alugados para os técnicos de Logística
- Separado o contrato de equipamento e recursos dos fornecedores, do contrato de prestação de serviços

**📊 Impacto (Resultado)**

- **Economia de aproximadamente 500k** nos contratos renegociados
- Melhor gestão orçamentária dos fornecedores

**🛠️ Stack:** Gestão de Contratos | Orçamento

---

### Sustentação Core Rede (GE1, WF1, WM1, etc.)

**🎯 Desafio (Situação/Tarefa)**

Com sustentação do Força de Vendas muito mais tranquila, foi unificado a sustentação com os sistemas Core Rede do WF1, GE1, etc., com a necessidade e metas para redução do número de chamados, abends, tempo do atendimento de incidentes e direcionamento de correções de causa raiz para os times de projetos.

**Tarefas:**
- Análise de chamados críticos com necessidade de soluções paliativas rápidas
- Especificação de melhorias de causa raiz
- Desenvolvimento de melhorias e correções
- Validação e acompanhamento de implantações de projetos
- Acompanhamento de refinamentos de projetos com viés de sustentação, priorizando com os times requisitos não funcionais de monitoração, segurança e qualidade

**⚡ Minha Atuação (Ação)**

- Atendimento aos chamados de variados problemas (Cadastrais, Credenciamento, Domicílio Bancário, Habilitação de produtos, Projetos estruturantes, etc.)
- Melhorias em logs
- Incluído integrações para captura de logs no Splunk
- Treinamento do time de sustentação com conhecimento sobre a Salesforce

**📊 Impacto (Resultado)**

- Atingimento de metas de redução de incidentes e de tempo de atendimento dos chamados
- Redução de abends da malha batch
- Time de sustentação com capacitação também em Salesforce

**🛠️ Stack:** Splunk | Salesforce | Mainframe

---

## 2019

### Sustentação AFVC - Força Campo

**🎯 Desafio (Situação/Tarefa)**

Continuidade do trabalho de sustentação com aumento do time de sustentação precisando de capacitação e organização para atender um volume grande de chamados e problemas com alta criticidade recorrentes em Logística.

**Exemplos de problemas comuns:**
- Falhas na criação de OS
- Falhas na roteirização das OSs
- Falhas no app Força Campo para atuação do Técnico

**Tarefas:**
- Discovery das funcionalidades do Força Campo
- Treinamento de time para atendimento da Sustentação
- Priorização de backlog de correções de causa raiz
- Desenvolvimento de correções de causa raiz

**⚡ Minha Atuação (Ação)**

- Participação em refinamentos com os times de projetos, opinando sobre melhores práticas e qualidade do desenvolvimento
- Validação de toda nova entrega, compartilhando conhecimento com time de sustentação do que estava sendo evoluído
- Especificando e validando desenvolvimento de Fábrica de Software nas tratativas de causa raiz

**📊 Impacto (Resultado)**

- Redução de problemas críticos de impacto à operação Logística
- Menor tempo de atendimento dos incidentes
- Melhor gestão dos incidentes e problemas
- Time de projetos com mais entregas e com maior qualidade

**🛠️ Stack:** Salesforce | Força Campo App

---

### Sustentação AFVC - Força Vendas

**🎯 Desafio (Situação/Tarefa)**

Continuidade do trabalho de sustentação com divisão do time de sustentação para focar nos processos do Comercial, que estava em expansão e com alto volume de chamados e problemas.

**Exemplo de problemas comuns:**
- Falhas na sincronização de dados no App Offline do Cockpit (versão Android)
- Abends recorrentes de malha batch da sigla TV2
- Alto volume de erros em funcionalidades do Cockpit

**Tarefas:**
- Discovery das funcionalidades do Cockpit
- Treinamento de time para atendimento da Sustentação
- Priorização de backlog de correções de causa raiz
- Desenvolvimento de correções de causa raiz

**⚡ Minha Atuação (Ação)**

- Participação de refinamentos com time de projetos, opinando sobre melhores práticas e qualidade do desenvolvimento
- Validação de toda nova entrega, compartilhando conhecimento com time de sustentação do que estava sendo evoluído
- Especificando e validando desenvolvimento de Fábrica de Software nas tratativas de causa raiz

**📊 Impacto (Resultado)**

- Redução de problemas críticos de impacto à operação comercial
- Menor tempo de atendimento dos incidentes
- Melhor gestão dos incidentes e problemas
- Time de projetos com mais entregas e com maior qualidade

**🛠️ Stack:** Salesforce | Android | Mainframe

---

### Sustentação Credenciamento Rede (Força Vendas + WF1)

**🎯 Desafio (Situação/Tarefa)**

Priorização e metas corporativas para o Comercial realizar mais Credenciamentos, onde foi desenvolvido na própria Salesforce (fora do app Android) o credenciamento Cockpit que nascia com mais integrações online com o WF1 e GE. Já com o time de sustentação apartado do time de Logística.

**Tarefas:**
- Mapeamento das integrações e arquitetura do Credenciamento Cockpit
- Acompanhamento dos refinamentos do novo Credenciamento
- Atendimento dos incidentes

**⚡ Minha Atuação (Ação)**

- Validação de toda nova entrega de mudanças em produção
- Execução dos Runbooks de implantação em produção e acompanhamento das validações
- Direcionamento para o time de projetos de melhorias e tratativas de causa raiz de incidentes

**📊 Impacto (Resultado)**

- Rapidez em atendimento de incidentes
- Redução de problemas críticos para operação comercial
- Maior número de entregas com qualidade do time de projetos

**🛠️ Stack:** Salesforce | Android

---

## 2018

### Transição do Time de Sustentação

**🎯 Desafio (Situação/Tarefa)**

Projetos do Cockpit e do Força Campo, recentemente implantados em produção, sem um processo de sustentação e de mudanças bem definidos, com um alto volume de erros e reclamações.

**Tarefas:**
- Analisar e direcionar erros, falhas e funcionalidades incompletas
- Alinhar processos de versionamento, mudança e de implantações
- Implementar monitorações
- Tratar incidentes

**⚡ Minha Atuação (Ação)**

- Alinhado e criado um fluxo de chamados de sustentação para os executivos comerciais e para os técnicos e gestores de Logística
- Alinhado com a área de mudanças e de segurança da informação a responsabilidade do time de sustentação ser responsável por validar e executar as implantações dos times na Salesforce de forma centralizada
- Alinhado com os times melhores práticas para versionamento e utilizações de Sandboxes de desenvolvimento
- Especificado e priorizado junto com fábrica de desenvolvimento Salesforce as correções de causa raiz para os problemas produtivos
- Alinhado com time de CMR monitorações e alarmes

**📊 Impacto (Resultado)**

- Redução e estabilidade do ambiente Salesforce, tanto para o Força de Vendas como para o Força de Campo
- Ampliação do número de executivos e técnicos utilizando as ferramentas
- Maior foco e número de entregas de projetos pelos times de projetos

**🛠️ Stack:** Salesforce | Cockpit | Força Campo
