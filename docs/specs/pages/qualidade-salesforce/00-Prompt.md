Você é um Arquiteto de Software Enterprise, especialista em Salesforce, Engenharia de Qualidade e Arquitetura de Software.

Utilize a especificação técnica em anexo como única fonte de verdade para criar um **site de conteúdo técnico**, cujo objetivo é **explicar detalhadamente** uma proposta de arquitetura para automação de testes End-to-End (E2E) em Salesforce utilizando Playwright.

O site **não possui finalidade comercial, promocional ou de venda**. Seu propósito é exclusivamente educacional, servindo como material de estudo para desenvolvedores, arquitetos de software, especialistas em QA, Tech Leads e líderes técnicos interessados em compreender como essa arquitetura foi concebida e quais decisões técnicas sustentam a solução.

O conteúdo deve transformar a especificação em uma narrativa clara, didática e agradável de navegar, sem simplesmente reproduzir o documento original.

## Público-alvo

Considere que o leitor possui conhecimento prévio em:

* Salesforce
* Lightning Web Components (LWC)
* CI/CD
* Testes Automatizados
* Arquitetura de Software
* Flosum

Explique os conceitos de forma aprofundada, porém objetiva, evitando marketing e simplificações excessivas ou expressões exageradas.

---

# Objetivos do site

O conteúdo deve responder às seguintes perguntas:

* Qual problema essa arquitetura resolve?
* Por que Playwright foi escolhido?
* Por que utilizar UTAM?
* Como ocorre a autenticação com Azure AD?
* Como os dados de teste são criados?
* Como funciona o pipeline E2E?
* Como os testes participam dos Quality Gates?
* Quais decisões arquiteturais foram tomadas?
* Quais riscos existem?
* Como cada risco foi mitigado?
* Quais são os limites da solução?
* Em quais cenários essa arquitetura é recomendada?

---

# Estrutura sugerida

## Hero

Apresentação da arquitetura em poucas linhas.

Resumo executivo.

Diagrama ilustrativo da solução.

---

## O Problema

Explique:

* dificuldades dos testes manuais
* baixa confiabilidade dos deploys
* custo de manutenção
* problemas de ambientes Salesforce Enterprise
* desafios de releases sazonais

---

## Visão Geral da Arquitetura

Elabore e apresente um diagrama mostrando como integrar Salesforce, Playwright, UTAM, Login com Azure AD, Flosum e Quality Gates.

Explique o papel de cada componente.

---

## Fluxo Completo

Mostre passo a passo:

Desenvolvimento

↓

Deploy via Flosum

↓

Execução Playwright

↓

Criação de massa de dados

↓

Execução dos testes

↓

Coleta de evidências

↓

Publicação dos resultados

↓

Quality Gate

↓

Aprovação ou bloqueio

---

## Decisões Arquiteturais

Crie uma seção para cada decisão importante explicando:

* problema existente
* alternativa considerada
* decisão adotada
* justificativa técnica
* benefícios
* trade-offs

Por exemplo:

* utilização do UTAM
* storageState
* autenticação única
* Smoke x Regression
* criação de dados via API
* paralelismo
* observabilidade
* rollback controlado

---

## Componentes da Solução

Explique individualmente:

* Playwright
* UTAM
* Azure AD
* Flosum
* REST API
* Composite API
* Browser Context
* storageState
* Workers
* Trace Viewer
* HTML Report

Cada componente deve possuir:

* objetivo
* funcionamento
* vantagens
* limitações
* integração com os demais componentes

---

## Estratégia de Dados

Explique detalhadamente:

* criação de dados efêmeros
* limpeza automática
* isolamento entre testes
* prevenção de UNABLE_TO_LOCK_ROW
* boas práticas

---

## Pipeline de Execução

Explique toda a esteira CI/CD.

Inclua um fluxograma.

Mostre:

* gatilhos
* validações
* execução paralela
* publicação de resultados
* aprovação
* rollback assistido

---

## Observabilidade

Explique:

* HTML Report
* Trace Viewer
* Screenshots
* Datadog

Quando utilizar cada ferramenta.

---

## Riscos Técnicos

Para cada risco apresente:

* descrição
* impacto
* probabilidade
* mitigação
* boas práticas

Inclua riscos relacionados a:

* releases Salesforce
* mudanças de DOM
* MFA
* Azure AD
* ambientes compartilhados
* integrações externas
* processamento assíncrono
* paralelismo
* Multiplos perfis de acesso

---

## Fora do Escopo

Explique por que esta arquitetura não contempla:

* testes unitários Apex
* Jest
* testes de performance
* DAST
* SAST
* acessibilidade
* testes de contrato

---

## Roadmap de Implementação

Apresente uma linha do tempo ilustrando:

Fase 1

Infraestrutura

↓

Fase 2

UTAM + Dados

↓

Fase 3

Smoke Tests

↓

Fase 4

Regression

↓

Fase 5

CI/CD

↓

Fase 6

Observabilidade

---

## Conclusões

Explique os ganhos esperados em termos de:

* confiabilidade dos deploys
* redução da manutenção
* padronização
* escalabilidade
* governança
* produtividade das equipes
* sustentabilidade da automação

---

# Diretrizes de UX

O site deve possuir características de documentação técnica moderna.

Inspirar-se em referências como:

* documentação do Playwright
* documentação da Salesforce
* Stripe Docs
* Vercel Docs
* Cloudflare Docs

Utilizar:

* navegação lateral fixa
* índice automático
* breadcrumbs
* diagramas explicativos
* fluxogramas
* caixas de destaque
* comparativos
* tabelas
* FAQs
* blocos de boas práticas
* blocos de atenção
* blocos de recomendações
* exemplos visuais

Cada seção deve ser autocontida, permitindo leitura independente.

---

# Linguagem

Utilize linguagem técnica, clara e objetiva.

Evite:

* marketing
* autopromoção
* frases de efeito
* exageros
* chamadas comerciais

Sempre explique o **porquê** das decisões arquiteturais, destacando benefícios, limitações e trade-offs. Quando pertinente, utilize analogias para facilitar a compreensão de conceitos complexos (por exemplo, descrever o UTAM como uma camada de abstração que funciona como um "adaptador" entre os testes e a interface, reduzindo o impacto de mudanças no DOM).

---

# Resultado esperado

Produza um site (podendo ter multiplos HTMLs) que funcione como uma **documentação técnica navegável**, capaz de servir como material de referência para estudos, discussões arquiteturais e processos de revisão técnica. O conteúdo deve ser suficientemente detalhado para que um profissional compreenda não apenas **como** a solução foi construída, mas principalmente **por que** cada decisão arquitetural foi adotada, seus benefícios, limitações e implicações práticas em ambientes Salesforce Enterprise.
