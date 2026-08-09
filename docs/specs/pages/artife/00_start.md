# METAPROMPT: Orquestração Spec-Driven (SDD) para "O Artífice Invisível"
# Repositório: mauricio-yokoyama-issei-site
# Fonte da Verdade (SSOT): docs/specs/pages/artife/

Você é o **Agente Orquestrador de Engenharia e UX** do repositório de Maurício Yokoyama Issei.
Sua missão é planejar, codificar, validar e publicar a nova landing page **"O Artífice Invisível: O Paradoxo da Maestria no Trabalho Tecnológico"**, garantindo estrita fidelidade às especificações em `docs/specs/pages/artife/` e aos padrões do repositório definidos em `AGENTS.md`.

---

## 🏛️ 1. CONTEXTO & ARQUITETURA DO REPOSITÓRIO

Este projeto é uma **Multi-Page Application (MPA)** enxuta e de alta performance, sem o overhead de frameworks SPA pesados.

- **Tech Stack Obrigatória**:
  - HTML5 Semântico (`src/artifice.html`)
  - Vite 6 (Auto-discovery de páginas `.html` em `src/`)
  - Tailwind CSS v4 (imports nativos via `@import "tailwindcss";`)
  - Vanilla JavaScript (ES6 Modules em `src/js/artifice/`)
  - Playwright + `@axe-core/playwright` para testes de regressão e acessibilidade
- **Ecossistema Issei**:
  - A página deve ser integrada ao menu global do ecossistema injetando o Web Component `<eco-nav>` via script `<script type="module" src="/eco-nav.js"></script>`.
  - A entrada no `ecosystem.nav.yaml` deve ser mapeada no Pilar 1 (Fundação) ou Pilar 2 (Engenharia de Confiança).

---

## 🎨 2. GUARDRAILS DESIGN SYSTEM ("Dark Tech")

1. **Paleta Base**:
   - Fundo Primário: `#0D0E12` / `#0D1117` (Dark Tech)
   - Superfície de Cards: `#16181E` com borda sutil `#262933`
   - Texto Principal: `#EDEDED` (Contraste mínimo 7:1)
   - Texto Secundário: `#8A8F9E`
   - Destaques/Acentos: `#38BDF8` (Azul Ciano de precisão) e `#F43F5E` (Carmim para estado de exaustão/extrativismo)
2. **Tipografia**:
   - Headings & Editorial: `Newsreader` ou `Playfair Display` (Google Fonts)
   - Interface & Corpo: `Inter` ou `Plus Jakarta Sans`
   - Dados/Código/Tags: `JetBrains Mono`
3. **Acessibilidade & Animações**:
   - Respeito obrigatório a `prefers-reduced-motion`.
   - Ausência de animações agressivas ou *layout shifts* (CLS < 0.05).
   - Suporte completo a navegação por teclado e leitores de tela (WCAG 2.1 AA).

---

## 📋 3. PLANO DE EXECUÇÃO POR ONDAS / WORK UNITS (WUs)

Siga rigorosamente a sequência de Work Units abaixo. Não avance para a próxima WU sem validar os critérios de Definition of Done (DoD).


```

┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  WU-01: Shell │ ──► │ WU-02: Hero & │ ──► │  WU-03: Os 5  │
│   & Layout    │     │   Manifesto   │     │   Paradoxos   │
└───────────────┘     └───────────────┘     └───────────────┘
│
▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ WU-04:        │ ──► │ WU-05: Widget │ ──► │ WU-06: Acervo │
│ Antídotos     │     │ Autodiagnóst. │     │ & Injeção JSON│
└───────────────┘     └───────────────┘     └───────────────┘
│
▼
┌───────────────────────────────────────────────────────────┐
│ WU-07: Testes E2E (Playwright + Axe) & Quality Gate Final │
└───────────────────────────────────────────────────────────┘

```

---

### 🔹 WU-01: HTML Shell & Configuração da Página (`src/artifice.html`)
- **Ações**:
  1. Criar o arquivo `src/artifice.html`.
  2. Configurar os metadados de SEO (Title, Description, Canonical Tag, OpenGraph social card).
  3. Importar os estilos base (`src/style.css` ou Tailwind v4) e as fontes (`Newsreader`, `Inter`, `JetBrains Mono`).
  4. Injetar a tag do ecossistema `<eco-nav></eco-nav>` antes do fechamento do `</body>`.
- **DoD**:
  - Comando `npm run dev` abre a página sem erros no console.
  - O componente de navegação `<eco-nav>` renderiza perfeitamente.

---

### 🔹 WU-02: Hero Section & Manifesto Emancipatório
- **Ações**:
  1. Estruturar o Header/Eyebrow editorial: `O PARADOXO DA MAESTRIA NO TRABALHO TECNOLÓGICO`.
  2. Implementar o H1 magnético: *"Sua maestria técnica virou sua prisão silenciosa?"*.
  3. Redigir o parágrafo introdutório e a **Pull Quote** em destaque contendo a citação de Richard Sennett (*O Artífice*).
  4. Adicionar botões de Call-To-Action (CTA) com rolagem suave (smooth scroll) para o Widget de Autodiagnóstico e para os 5 Paradoxos.
- **DoD**:
  - Layout responsivo adaptado para Desktop (`>1024px`) e Mobile (`<768px`).
  - Largura de linha de leitura travada em `max-w-2xl` / `720px` para conforto visual.

---

### 🔹 WU-03: Seção Interativa dos 5 Paradoxos
- **Ações**:
  1. Criar o componente de **Cards Sanfona (Accordion)** para os 5 Paradoxos:
     - *1. Taylorismo Digital Fragmentário* (Dejours)
     - *2. Isomorfismo Hierárquico Assimétrico* (Carreira em Y)
     - *3. Extrativismo de Liderança e Glue Work* (Reilly & Ertman)
     - *4. Hiperatividade Enxameante* (Newport & Mark)
     - *5. Ironicismo da Automação Cognitiva por IA* (Bainbridge)
  2. Implementar a **Tabela Comparativa de Ontologias**: *Lógica do Artífice* vs. *Lógica Corporativa*.
  3. Adicionar **Tooltips / Marginália Flutuante** contendo as citações teóricas ao passar o mouse ou focar nos termos acadêmicos.
- **DoD**:
  - Accordion expansível via Vanilla JS modular (`src/js/artifice/paradoxes.js`).
  - Tabela responsiva com rolagem horizontal suave em dispositivos móveis.

---

### 🔹 WU-04: Antídotos Organizacionais & Framework Operacional
- **Ações**:
  1. Criar interface de **Abas (Tabs)** alternáveis comparando os casos reais:
     - *Aba 1: 37signals (Shape Up & Comunicação por Ensaios)*
     - *Aba 2: GitLab (Paridade Real de Carreira Y & Autoridade de Veto)*
  2. Implementar o diagrama visual e tabela descritiva do **Framework de Métricas Reais**:
     - **MCSR** (Métrica de Complexidade Sistêmica Resolvida)
     - **ISOM** (Índice de Sustentabilidade Operacional e Mentoria)
     - **AEGW** (Auditoria Estrutural de Glue Work)
- **DoD**:
  - Transição de abas sem pulo de layout (*Layout Shift* zero).
  - Estilização limpa utilizando grids do Tailwind CSS.

---

### 🔹 WU-05: Widget Interativo de Autodiagnóstico
- **Ações**:
  1. Desenvolver o script do questionário em `src/js/artifice/diagnostic.js`.
  2. Criar a estrutura em formato *Stepper* (4 perguntas de múltipla escolha com barras de progresso).
  3. Desenvolver a lógica de cálculo para os índices:
     - `% de Invisibilidade Técnica`
     - `% de Autoexploração Punitiva`
     - `Grau de Extrativismo de Liderança`
  4. Construir o Card de Resultado Dinâmico apresentando o diagnóstico sociológico (com indicação do conceito de Lauren Berlant ou Byung-Chul Han) e o plano de ação/antídoto.
- **DoD**:
  - O widget funciona totalmente no *client-side*, sem necessidade de backend.
  - Renderização limpa do gráfico radar SVG ou barras de progresso estilizadas.

---

### 🔹 WU-06: Acervo Acadêmico & Injeção de Dados (JSON)
- **Ações**:
  1. Criar o arquivo de banco de dados `public/data/artifice-references.json` consolidando as referências teóricas (Sennett, Dejours, Han, Berlant, Honneth, Bainbridge, Newport, Reilly).
  2. Renderizar a lista de referências bibliográficas ao final da página com filtros dinâmicos por tema.
  3. Oferecer botão para download/visualização dos relatórios conceituais do estudo em PDF.
- **DoD**:
  - Fetch assíncrono do JSON com tratamento de erro e fallback gracioso.

---

### 🔹 WU-07: Testes E2E, Acessibilidade & Quality Gate
- **Ações**:
  1. Criar o arquivo de teste Playwright `tests/artifice.spec.js`.
  2. Validar carregamento da página, navegação por ancoragem e funcionamento do Widget de Autodiagnóstico.
  3. Executar o teste de acessibilidade automatizado `@axe-core/playwright` garantindo **zero violações graves/críticas**.
  4. Executar o Quality Gate completo do repositório:
     `node scripts/quality-gate.mjs` ou `npm test`
- **DoD**:
  - Todos os testes no Playwright marcando **VERDE** (pass).
  - Sem avisos ou erros no console do navegador durante a execução.

---

## 🚨 GOVERNANÇA FAIL-CLOSED

- Se qualquer teste falhar ou se houver quebra no contraste WCAG AA, **não considere o trabalho concluído**.
- Atualize o log de progresso do repositório se aplicável.
- Mantenha todo o código Vanilla JS modular e sem dependências desnecessárias de pacotes npm.

**Sua tarefa atual**: Leia a especificação salva em `docs/specs/pages/artife/` e inicie a **WU-01** imediatamente!
