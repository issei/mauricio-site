---
titulo: Front-end modular para Digital Workplace — micro-frontends, Module Federation, single-spa, design tokens, SSR, edge e CDN
modulo: Pilar 5.4 — Front-end Modular
nivel: Avançado
ultima_atualizacao: 2026-10-03
tags: [frontend, micro-frontends, module-federation, single-spa, design-system, design-tokens, ssr, edge, cdn, performance, acessibilidade, ag-ui]
---

# Front-end modular para Digital Workplace: micro-frontends, Module Federation, single-spa, design tokens, SSR, edge e CDN

Este arquivo analisa as opções de arquitetura de front-end para um Digital Workplace que precisa acomodar muitos domínios, vários canais e, agora, uma camada de agentes que compõe interfaces. O objetivo é explicar **quando** cada padrão faz sentido, e não recomendar um por padrão. Não se presume conhecimento da arquitetura de front-end atual da organização (ver `01_contexto/questoes_abertas_e_research_gaps.md`).

## 1. Que problema existe

Um portal corporativo grande enfrenta duas pressões opostas:

1. **Autonomia:** domínios diferentes (RH, TI, benefícios) querem entregar no próprio ritmo.
2. **Coerência:** o colaborador espera uma experiência única, rápida e acessível.

A camada de agentes acrescenta uma terceira pressão: a interface deixa de ser composta só por rotas e telas definidas em tempo de desenvolvimento e passa a ser composta também **em tempo de execução**, conforme a intenção.

## 2. Opções de composição

| Padrão | Como funciona | Faz sentido quando | Custo e riscos |
| --- | --- | --- | --- |
| **Monólito modular** | um app, módulos por domínio, um pipeline | poucos times; deploy coordenado aceitável | baixo; escala organizacional limitada |
| **Micro-frontends em build time** | pacotes publicados e importados pelo shell | times independentes, mas releases do shell coordenados | médio; "monólito distribuído" se as versões travarem |
| **Micro-frontends em runtime com [Module Federation](https://module-federation.io/)** | o shell carrega remotes em tempo de execução, compartilhando dependências | muitos times autônomos, mesmo ecossistema de framework | médio-alto: compatibilidade de dependências compartilhadas, testes de integração |
| **[single-spa](https://single-spa.js.org/)** | orquestrador que monta e desmonta apps de frameworks diferentes | migração gradual entre frameworks; convivência de legado | alto: consistência, bundle, depuração |
| **Composição no servidor ou na borda** | fragmentos montados no servidor (SSR) ou na CDN | conteúdo predominante, SEO, desempenho em primeira carga | médio; personalização dificulta cache |
| **Iframes** | isolamento total | legado ou terceiros não confiáveis | UX e acessibilidade ruins; comunicação limitada |

**[INFERÊNCIA]** Micro-frontends resolvem um problema **organizacional** (deploy independente de times), e não técnico. O artigo de referência de Cam Jackson em martinfowler.com descreve tanto os benefícios (deploys independentes, código menor por time) quanto os custos (tamanho do payload, complexidade operacional, divergência de experiência) ([martinfowler.com](https://martinfowler.com/articles/micro-frontends.html)).

### Critério de decisão sugerido

**[RECOMENDAÇÃO]** Adotar micro-frontends em runtime apenas se as três condições forem verdadeiras:

1. existem **pelo menos três times** entregando interfaces no mesmo shell, com ritmos diferentes;
2. o **custo de coordenação** de releases é um gargalo medido (não percebido);
3. existe uma **plataforma** (time e ferramentas) para cuidar do shell, das dependências compartilhadas e dos testes de integração.

Caso contrário, um monólito modular com fronteiras claras entre módulos entrega a maior parte do benefício.

## 3. Design System como plataforma

Independentemente do padrão de composição, o Design System é o que garante coerência:

| Camada | Conteúdo | Consumidor |
| --- | --- | --- |
| **Tokens** | cor, tipografia, espaçamento, movimento, temas | todos os canais |
| **Componentes base** | botão, campo, tabela, diálogo | times de domínio |
| **Padrões** | formulário de solicitação, confirmação, lista de pendências | times de domínio e agente |
| **Componentes de agente** | cartão de progresso, painel de fontes, confirmação de ação, handoff | runtime do agente |

**Tokens padronizados:** o formato do W3C Design Tokens Community Group alcançou a primeira versão estável (2025.10) em 28/10/2025, com temas, multi-marca, espaços de cor modernos e geração para iOS, Android, web e Flutter a partir de um mesmo arquivo. É um relatório de Community Group, não uma Recomendação W3C. **[FATO]** ([W3C CG](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/))

## 4. Component Registry e component federation

Duas ideias parecidas, com propósitos diferentes:

- **Component federation:** compartilhar componentes entre apps em runtime (ex.: Module Federation expondo componentes do Design System). Resolve **reuso técnico**.
- **Component Registry para agentes:** catálogo governado de componentes que o agente pode instanciar, com schema de props, contexto exigido e auditoria de acessibilidade. Resolve **governança da UI generativa**. Detalhado em `03_pilares/generative_ui_design_system_e_component_registry.md`.

**[RECOMENDAÇÃO]** O registro para agentes é um **subconjunto curado** do Design System, e não o Design System inteiro. O agente não precisa de um botão genérico; precisa de "confirmação de ação com resumo".

## 5. Onde o AG-UI vive no front-end

```text
Shell da aplicação
 ├─ Cliente AG-UI (conexão SSE, buffer de eventos, reconexão)
 ├─ Store de estado compartilhado (aplica snapshots e deltas JSON Patch)
 ├─ Renderer de componentes do registro (valida props → renderiza)
 ├─ Ferramentas de frontend registradas (por domínio ou micro-frontend)
 └─ Micro-frontends / módulos de domínio
```

- O cliente AG-UI deve ficar **no shell**, não em cada micro-frontend, para que haja um único estado de conversa e uma única conexão.
- Módulos de domínio podem **registrar ferramentas de frontend** (por exemplo, o módulo de benefícios registra `render_dependent_form`), o que mantém a autonomia dos times dentro do catálogo governado. **[RECOMENDAÇÃO]**
- O AG-UI exige **SSE** como transporte padrão sobre HTTP; WebSockets são permitidos como transporte customizado. **[FATO]** ([AG-UI Transports](https://docs.ag-ui.com/spec/1.0/basic/transports/index.md))

## 6. SSR, edge SSR, Jamstack e CDN

| Tipo de página | Estratégia | Justificativa |
| --- | --- | --- |
| Conteúdo editorial público interno (comunicados, políticas gerais) | geração estática ou SSR com cache em CDN | alto reuso, baixa personalização |
| Páginas personalizadas (home do colaborador) | SSR com cache por segmento ou renderização no cliente com dados por API | personalização limita cache compartilhado |
| Telas transacionais | renderização no cliente com APIs; shell em cache | interatividade, dados sensíveis |
| Interface do agente | shell em cache; conteúdo por streaming | conteúdo único por conversa |

### Cuidados com CDN em ambiente corporativo

- **Dados pessoais nunca em cache compartilhado.** Respostas personalizadas com `Cache-Control: private` ou sem cache.
- **Streaming:** proxies e CDNs precisam repassar SSE sem buffer e com timeouts compatíveis.
- **Edge SSR:** reduz latência, mas coloca lógica e possivelmente dados na borda; exige avaliação de residência de dados. **[INFERÊNCIA]**

## 7. Performance

- **Orçamentos de Core Web Vitals** valem também para telas compostas pelo agente.
- **Carregamento sob demanda** do renderer de componentes e dos componentes de agente.
- **Renderização progressiva:** mostrar componentes conforme os deltas de estado chegam, com esqueletos de carregamento estáveis para evitar mudanças de layout.
- **Tempo até o primeiro token** como métrica de percepção, ao lado de LCP e INP.

## 8. Acessibilidade e responsividade

- Componentes do registro certificados conforme [WCAG 2.2](https://www.w3.org/TR/WCAG22/) nível AA.
- Gestão de foco quando o agente insere ou substitui componentes.
- Regiões `aria-live` com moderação durante o streaming.
- Layouts responsivos por slots, para que a mesma composição funcione no celular e no desktop.
- Representação degradável de cada componente (rico na web, card em ferramenta de colaboração, texto em notificação).

## 9. Restrições de plataforma SaaS

Se parte da experiência roda sobre uma plataforma SaaS (situação comum em portais corporativos de grande porte), as decisões de front-end ficam condicionadas ao modelo de extensão da plataforma: componentes próprios da plataforma, limites de customização e ciclo de releases do fornecedor. **[INFERÊNCIA]** Nesse cenário, há duas estratégias:

| Estratégia | Vantagem | Desvantagem |
| --- | --- | --- |
| Construir a experiência agêntica **dentro** da plataforma | integração nativa, menor esforço inicial | acoplamento ao fornecedor; limites de UI generativa |
| Construir um **shell próprio** que consome a plataforma por API | controle total da experiência e do agente | maior esforço; duplicação de capacidades |

Não há resposta universal; a escolha depende do papel estratégico da plataforma (gap G14 em `01_contexto/questoes_abertas_e_research_gaps.md`).

## 10. Riscos e maturidade

| Item | Maturidade | Risco principal |
| --- | --- | --- |
| Monólito modular, SSR, CDN | maduro | — |
| Module Federation | maduro em produção, com complexidade conhecida | dependências compartilhadas |
| single-spa | maduro para migrações | complexidade de orquestração |
| Design tokens (formato W3C CG) | estável desde 2025.10 | adoção pelas ferramentas ainda em curso |
| Component Registry para agentes | emergente; sem padrão único | fragmentação entre especificações de UI generativa |

## Fontes

- Module Federation: https://module-federation.io/
- single-spa: https://single-spa.js.org/
- Cam Jackson, Micro Frontends (martinfowler.com): https://martinfowler.com/articles/micro-frontends.html
- W3C Design Tokens CG, versão estável 2025.10: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- AG-UI, Transports: https://docs.ag-ui.com/spec/1.0/basic/transports/index.md
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
