# Desenvolvimento Spec-Driven do Portal "O Artífice Invisível"
# Repositório: mauricio-yokoyama-issei-site
# Fonte da Verdade (SSOT): docs/specs/pages/artife/

Você é o **Agente Orquestrador de Engenharia, UX e Otimização Semântica** do ecossistema de Maurício Yokoyama Issei.
Sua missão é implementar a página **"O Artífice Invisível: O Paradoxo da Maestria no Trabalho Tecnológico"** (`src/artifice.html`). O site deve oferecer uma experiência premium para humanos (baixa carga cognitiva) e ser perfeitamente legível para agentes de IA e LLMs (Machine-Readable).

---

## 🏛️ 1. ARQUITETURA, ACESSIBILIDADE E LLM OPTIMIZATION (AEO)

A página não deve apenas ser visualmente "Dark Tech", mas também estruturalmente rica para motores de busca e IAs (Answer Engine Optimization - AEO).

1. **Semântica HTML5 Estrita**: Use `<article>`, `<section>`, `<aside>` e `<details>` para estruturar o conteúdo logicamente.
2. **Dados Estruturados (JSON-LD)**: Injete um bloco de `application/ld+json` do tipo `Article` ou `TechArticle`, sumarizando a tese do site, listando os conceitos-chave (Paradoxos) e as referências acadêmicas para que IAs possam extrair o conhecimento.
3. **Tech Stack**: HTML5 nativo, Vite 6, Tailwind CSS v4, Vanilla JS. Injeção do `<eco-nav>` obrigatória antes do fechamento do `<body>`.

---

## ⚖️ 2. DIRETRIZES DE CONTEÚDO E TOM (GUARDRAILS)

O texto deve diagnosticar o problema de forma cirúrgica e emancipatória. Siga estas restrições absolutas de Copywriting:

1. **O Silêncio do Recomeço (Sem vitimismo ou datas)**:
   - **Proibido**: Usar datas específicas (ex: "Em 2007 fui promovido...").
   - **Diretriz**: Descreva a jornada como: *"Anos atrás, a promoção a sênior parecia o início de uma progressão contínua. Após muito tempo sustentando sistemas críticos e desenvolvendo pessoas, o profissional se vê estagnado. Isso não é uma falha pessoal, mas um descompasso estrutural."*
2. **Maestria Responsável vs. Over-Engineering**: Deixe claro que a busca pela excelência não deve virar um encastelamento técnico. O artífice resolve problemas de negócios de forma sustentável, não apenas "coda por codar".
3. **O Papel da IA (Equilíbrio)**: Ao citar o *Ironicismo da Automação*, mencione o risco da atrofia cognitiva (*deskilling*), mas introduza a IA como ferramenta de **Maestria Aumentada**, onde o sênior atua como curador e arquiteto de alto nível.
4. **Política Corporativa vs. Liderança de Influência**: Diferencie claramente "politicagem superficial" da habilidade genuína e necessária de um *Staff Engineer* de alinhar times, comunicar decisões e exercer influência técnica (este último é positivo e essencial).

---

## 🎥 3. LAYOUT, CARGA COGNITIVA & INTEGRAÇÃO DE VÍDEO

O layout deve aplicar **Revelação Progressiva** (Progressive Disclosure) para manter a carga cognitiva baixa.

**Posicionamento do Vídeo (YouTube ID: `FJ4NEOgw_SY`)**:
O vídeo atuará como uma **Síntese Executiva** (Trilha de 2 Minutos) e deve ser posicionado imediatamente após o manifesto inicial (Hero), servindo como ponte antes da explicação aprofundada dos 5 Paradoxos.

```text
[ HERO & MANIFESTO ]
Tese central sobre a invisibilidade e o resgate do ofício técnico.
         ↓
[ 🎬 VÍDEO-SÍNTESE ]
Player 16:9 responsivo embebedado (iframe-nocookie)
com botões abaixo para pular (seek) para capítulos específicos:
⏱️ 00:00 O Paradoxo | ⏱️ 01:21 Lógicas | ⏱️ 02:04 Refinamento Tácito | ⏱️ 04:41 Caminhos
         ↓
[ OS 5 PARADOXOS ]
Cards expansíveis (Accordion) detalhando a teoria e a prática.

```

---

## 📋 4. PLANO DE EXECUÇÃO (WORK UNITS)

Execute as tarefas abaixo de forma sequencial. Não invente jargões marqueteiros.

### 🔹 WU-01: HTML Shell, SEO e LLM Optimization

1. Altere `src/artifice.html` com metadados completos.
2. Adicione o bloco `<script type="application/ld+json">` contendo o resumo estruturado da página para consumo por LLMs.
3. Garanta marcações WAI-ARIA (`aria-expanded`, `role="region"`) para total acessibilidade.

### 🔹 WU-02: Hero Section & Manifesto (Ajustado)

1. Título H1: *"Sua maestria técnica virou sua prisão silenciosa?"*.
2. Redija o manifesto focando na passagem do tempo desde a promoção a sênior, removendo a ideia de "culpa individual" e focando no diagnóstico da estrutura corporativa. Sem referências ao ano de 2007.

### 🔹 WU-03: Hub Multimídia (Vídeo-Síntese)

1. Crie um componente de cartão (`bg-[#16181E] border border-[#262933]`) para o vídeo de síntese.
2. Insira o Iframe de `https://www.youtube.com/watch?v=FJ4NEOgw_SY` com `loading="lazy"`.
3. Adicione a lista de marcadores de tempo (Timecodes) via Vanilla JS, permitindo que cliques avancem o vídeo para os pontos-chave.

### 🔹 WU-04: Os 5 Paradoxos (Refinados)

1. Implemente os 5 cartões sanfona (*accordion*).
2. **Atualização de Conteúdo**:
* No paradoxo de *Isomorfismo Hierárquico*, valide a importância da "Liderança de Influência" contrapondo-a aos jogos puramente políticos.
* No paradoxo da IA, adicione o viés de "Maestria Aumentada" vs. *Deskilling*.


3. Inclua a tabela comparativa (Lógica do Artífice vs. Corporativa) com contrastes de cores claros (AA).

### 🔹 WU-05: Antídotos & Widget Autodiagnóstico

1. Construa as abas (Tabs) com as soluções corporativas (MCSR, ISOM, AEGW, casos 37signals e GitLab).
2. Implemente o questionário de autodiagnóstico em `src/js/artifice/diagnostic.js`. O resultado deve apontar caminhos para a **Emancipação Positiva** do profissional.

### 🔹 WU-06: Acervo Acadêmico & Quality Gate

1. Estruture as referências em tabela ou lista limpa no final da página (Sennett, Dejours, Han, Berlant).
2. Invoque o Quality Gate: `node scripts/quality-gate.mjs` para validar build, Playwright (Testes E2E) e falhas do Axe-core (Acessibilidade).
3. Atualize o arquivo `PROGRESS.md`.

```

---
