# 01 — Arquitetura da Informação e Sitemap

> Cobre a **estrutura de navegação**, o **sitemap completo**, a **navegação dual**, a integração com
> as páginas existentes e a especificação do **README como portal de entrada**.
> Base: [`site.md`](../../../references/site.md) §1.

---

## 1. Página-alvo e contexto técnico

- **Arquivo:** `src/engenharia-confianca.html` (Vite detecta `src/*.html` automaticamente).
- **URL final:** `mauricio.issei.com.br/engenharia-confianca`
- **Natureza:** MPA estática (Vite 6, Tailwind v4, Vanilla JS ES6), **sem backend**, alinhada ao
  [`AGENTS.md`](../../../../AGENTS.md). Diagramas via **Mermaid.js**.
- **Identidade visual:** base **"Dark Tech"** do site ([`STYLE_GUIDE.md`](../../STYLE_GUIDE.md) — Inter,
  fundo `#0d1117`, gradientes azul `#007bff` → roxo `#8a2be2`). Detalhes em 06.
- **Idioma:** Português do Brasil.

> **Decisão de arquitetura.** O site novo é uma **página de jornada única, longa, em scroll**, dividida
> em quatro seções-módulo, **mais** uma sidebar de glossário persistente. Ele **não reimplementa** o
> conteúdo das páginas-fonte: cada módulo termina encaminhando para a página existente correspondente.
> Isso mantém uma única fonte da verdade por pilar e respeita o princípio de reaproveitamento.

---

## 2. Arquitetura da informação

### 2.1 Camadas de conteúdo

```
┌──────────────────────────────────────────────────────────────────┐
│  CAMADA NARRATIVA (este site novo — engenharia-confianca.html)     │
│  • Hero + arco "do Caos à Governança"                              │
│  • 4 módulos sequenciais (conceito-âncora + ponte + CTA reflexão)  │
│  • Sidebar de glossário persistente                                │
│  • Modelo de Maturidade como fio condutor                          │
└───────────────┬───────────────┬───────────────┬───────────────────┘
                │ encaminha p/   │ encaminha p/   │ encaminha p/
                ▼                ▼                ▼
   ┌────────────────────┐ ┌──────────────────┐ ┌──────────────────┐
   │ proposta-          │ │ engenharia-      │ │ devin.html        │
   │ engenharia-        │ │ agentes-ia.html  │ │ (Vibe Coding)     │
   │ reversa.html (M1)  │ │ (M2)             │ │ (M3)              │
   └────────────────────┘ └──────────────────┘ └──────────────────┘
   CAMADA DE PROFUNDIDADE (páginas-fonte existentes, intactas)
```

### 2.2 Tipos de link (taxonomia de referência cruzada)

| Tipo | Rótulo na UI | Destino | Quando usar |
| :-- | :-- | :-- | :-- |
| **Aprofundar** | "Explore o pilar completo →" | página-fonte (`.html`) | fim de cada módulo |
| **Fonte** | ícone 📄 + nome do arquivo | guia em `docs/references/` ou `docs/specs/` | ao lado de cada conceito técnico |
| **Glossário** | termo sublinhado pontilhado | abre verbete na sidebar | inline no texto |
| **Maturidade** | badge de estágio | âncora para a régua de maturidade | em cada CTA de reflexão |

> **Nota para o desenvolvedor.** Links "Aprofundar" para as páginas-fonte abrem em **mesma aba** (são
> conteúdo do próprio site). Links "Fonte" para arquivos `.md` do repo podem abrir em nova aba.

---

## 3. Sitemap

```
/engenharia-confianca  (página de jornada única, scroll longo)
│
├── #hero ............... Arco "do Caos à Governança" + tese + CTA "Iniciar a jornada"
│
├── #modulo-0 .......... O Despertar da Liderança
│      └─► CTA reflexão (maturidade nível 1→2)  ·  ponte para os 3 pilares
│
├── #modulo-1 .......... Mapeando a Verdade  (As-Is → To-Be)
│      ├─ diagrama Mermaid: descoberta guiada por jornadas críticas
│      ├─► "Explore o pilar completo" → /proposta-engenharia-reversa
│      └─► CTA reflexão (maturidade nível 2→3)
│
├── #modulo-2 .......... Arquitetando a Confiança
│      ├─ diagrama Mermaid: pipeline determinístico  ·  Cérebro × Vitrine
│      ├─► "Explore o pilar completo" → /engenharia-agentes-ia
│      └─► CTA reflexão (maturidade nível 3→4)
│
├── #modulo-3 .......... A Nova Maestria  (Orquestrador Cognitivo)
│      ├─ diagrama Mermaid: fluxo SDD (Spec → Retrieve → Refatorar → Validar)
│      ├─► "Explore o pilar completo" → /devin
│      └─► CTA reflexão (maturidade nível 4→5)
│
├── #maturidade ........ Régua interativa do Modelo de Maturidade (1→5)
│
└── [sidebar fixa] ..... Glossário unificado (4 termos-âncora + termos de engenharia)
```

### 3.1 Mapa de URLs

| Seção | Âncora | Página-fonte vinculada |
| :-- | :-- | :-- |
| Hero | `/engenharia-confianca#hero` | — |
| Módulo 0 | `#modulo-0` | (ponte para os três) |
| Módulo 1 | `#modulo-1` | `/proposta-engenharia-reversa` |
| Módulo 2 | `#modulo-2` | `/engenharia-agentes-ia` |
| Módulo 3 | `#modulo-3` | `/devin` |
| Maturidade | `#maturidade` | — |

---

## 4. Navegação dual

O site atende dois modos simultâneos (ver personas em 00 §2.1):

### 4.1 Modo trilha linear (Rafael, Bianca)

- Scroll contínuo M0 → M1 → M2 → M3 → Maturidade.
- **Barra de progresso de jornada** fixa no topo, com 4 marcadores de módulo + ícone do estágio de
  maturidade atual. Atualiza por `IntersectionObserver` conforme a seção entra na viewport.
- Botão "Próximo módulo" ao fim de cada seção.

### 4.2 Modo entrada por dor/módulo (Camila, Daniel, executivo)

- **Menu de navegação** (header) com salto direto a qualquer módulo + "Modelo de Maturidade".
- **Cartões de entrada** no hero rotulados por dor ("Minha IA falha sem avisar" → M0; "Tenho um legado
  que ninguém entende" → M1; "Não confio na saída do modelo" → M2; "Quero escalar com método" → M3).
- Cada módulo é **autossuficiente**: abre recapitulando em uma frase o que veio antes.

---

## 5. O README do repositório como portal de entrada

> [`site.md`](../../../references/site.md) instrui: *"garanta que o `README.md` do repositório sirva
> como o portal de entrada desta jornada"*. Esta seção **especifica** o que deve ser adicionado ao
> README. A edição do README em si está **fora do escopo deste entregável** (decisão do solicitante:
> "só especificar").

**Bloco a inserir no `README.md` (especificação):**

- **Título da seção:** "🧭 Comece por aqui: A Engenharia da Confiança".
- **Pitch (1 parágrafo):** a jornada de quatro módulos que conecta os três pilares — Engenharia
  Reversa, Engenharia de Agentes e Vibe Coding — numa narrativa do Caos à Governança.
- **Tabela de portal:** quatro linhas (um módulo por linha) com: conceito central · link para a seção
  (`/engenharia-confianca#modulo-N`) · link para a página-fonte.
- **Posição:** logo após o cabeçalho/descrição do projeto, antes das instruções de build.
- **Aceite:** um leitor que abre o README entende, em 30 segundos, qual é a jornada e por onde entrar.

---

## 6. Ficha de funcionalidade — Navegação

| Campo | Conteúdo |
| :-- | :-- |
| **Objetivo** | Permitir trilha linear e entrada por dor, mantendo orientação (onde estou na jornada e na maturidade). |
| **Experiência** | Barra de progresso fixa + menu de salto + cartões de dor no hero + sidebar de glossário. |
| **Componentes** | `ProgressBar`, `ModuleNav`, `PainEntryCards`, `GlossarySidebar`, `MaturityBadge` (catálogo em 03). |
| **Tecnologias** | Vanilla JS + `IntersectionObserver`; CSS `position: sticky`. Sem framework. |
| **Complexidade** | Média. |
| **Riscos** | Página longa pode desorientar; sidebar competir por espaço no mobile. |
| **Mitigação** | Barra de progresso sempre visível; sidebar vira drawer/acordeão no mobile (ver 03 §responsivo). |

---

### Referências cruzadas

- Conteúdo de cada módulo → [02](02_jornada_de_aprendizagem.md)
- Componentes e wireframes → [03](03_wireframes_e_catalogo_de_componentes.md)
- Diagramas Mermaid de cada módulo → [04](04_visualizacoes_e_diagramas_mermaid.md)
