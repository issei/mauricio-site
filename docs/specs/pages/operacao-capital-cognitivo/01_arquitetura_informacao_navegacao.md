# 01 — Arquitetura de Informação e Navegação

> Cobre o entregável **4 (Arquitetura de informação e fluxo de navegação)**.

---

## 1. Estrutura macro da página

A página é um **simulador de capítulo único** — uma `div` raiz com múltiplas seções que entram
e saem de cena conforme o progresso do usuário. Não há sub-rotas nem SPA routing; toda a
navegação é gerida via JS que controla `display` / `opacity` de seções.

```
src/operacao-capital-cognitivo.html
├── <head>              SEO, meta OG, Google Fonts, Tailwind
├── <body>
│   ├── #hud            HUD persistente (sempre visível)
│   ├── #scene-intro    Tela de entrada / briefing inicial
│   ├── #scene-cap1     Capítulo 1 — O Mistério dos R$ 37k
│   ├── #scene-cap2     Capítulo 2 — A Armadilha da IA Barata
│   ├── #scene-cap3     Capítulo 3 — A Invenção da Métrica
│   ├── #scene-cap4     Capítulo 4 — Formalização Matemática
│   ├── #scene-cap5     Capítulo 5 — Laboratório "E Se?"
│   ├── #scene-cap6     Capítulo 6 — O Conselho de Administração
│   ├── #scene-transfer Caso de Transferência (pós-vitória)
│   ├── #scene-victory  Tela de vitória
│   └── #scene-failure  Tela de falha / game over
│
└── <script type="module" src="./js/operacao-capital-cognitivo/main.js">
```

### Arquivos JS (ES6 modules)

```
src/js/operacao-capital-cognitivo/
├── main.js               Ponto de entrada; orquestra a state machine
├── digital-twin.js       DigitalTwinEngine: estado e equações
├── evidence-board.js     EvidenceBoardManager: cards e grafo
├── board-engine.js       StatefulBoardEngine: diálogos adaptativos
├── event-engine.js       RandomEventEngine: eventos estocásticos
├── hud.js                Atualização do HUD persistente
├── chapter-1.js          Mecânicas específicas do Cap. 1
├── chapter-2.js          Mecânicas específicas do Cap. 2
├── chapter-3.js          Canvas de montagem de fórmula
├── chapter-4.js          Bloco matemático e quiz
├── chapter-5.js          Sandbox sliders + Sankey + CLD
└── chapter-6.js          Diálogo do Board + anexação de evidências
```

---

## 2. Fluxo de navegação

```
[INTRO / BRIEFING]
      │ "Aceitar o cargo" (CTA)
      ▼
[CAPÍTULO 1 — O Mistério dos R$ 37k]
      │ Fatura completamente investigada
      ▼
[CAPÍTULO 2 — A Armadilha da IA Barata]
      │ Protocolo Predição-Experimentação concluído
      ▼
[CAPÍTULO 3 — A Invenção da Métrica]
      │ Fórmula montada + nomeada + revelada
      ▼
[CAPÍTULO 4 — Formalização Matemática]
      │ Quiz Cost-of-Pass aprovado
      ▼
[CAPÍTULO 5 — Laboratório "E Se?" (Q1 → Q4)]
      │ 4 trimestres simulados
      ▼
[CAPÍTULO 6 — O Conselho de Administração]
      │
      ├─ Confiança ≥ 70% + Caixa > 0 + SLA ≥ 90%
      │   ▼
      │  [VITÓRIA] → [CASO DE TRANSFERÊNCIA] → Score Final
      │
      └─ Veto do CFO ou demissão pela VP Ops
          ▼
         [FALHA / GAME OVER] → Replay desde o capítulo crítico
```

---

## 3. O HUD Persistente

O HUD é a âncora visual da experiência — sempre visível no topo, atualizado em tempo real pelo
motor do Gêmeo Digital.

### Dados exibidos no HUD

| Campo | ID do elemento | Formato |
| :-- | :-- | :-- |
| Trimestre atual | `#hud-quarter` | `Q1` / `Q2` / `Q3` / `Q4` |
| Caixa disponível | `#hud-cash` | `R$ 850.000` |
| UI/$ Global | `#hud-ui-dollar` | `7,82` (2 casas decimais) |
| Capital Cognitivo | `#hud-capital` | `82/100` |
| Moral da equipe | `#hud-morale` | barra de progresso 0–100% |
| Débito técnico | `#hud-debt` | barra de progresso 0–100% |
| Carga de Verificação | `#hud-vcore` | `68` + mini-barra (verde/âmbar/vermelho) |
| SLA Compliance | `#hud-sla` | `96,3%` |

> **Nota para o desenvolvedor:** O HUD usa `aria-live="polite"` em todos os contadores numéricos para
> compatibilidade com leitores de tela. Ver [09_acessibilidade_seo_metricas.md](09_acessibilidade_seo_metricas.md).

### Comportamento do HUD por fase

- **Intro:** HUD oculto; exibe apenas após iniciar Capítulo 1.
- **Cap. 1–4:** HUD exibe Caixa e Moral; a Carga de Verificação ($V_{core}$) desbloqueia no Cap. 2, e UI/$ no Cap. 3 (outros campos revelam progressivamente).
- **Cap. 5:** Todos os campos visíveis; valores mudam em tempo real com sliders.
- **Cap. 6:** HUD congela em modo "snapshot Q4" para referência durante arguição.
- **Vitória/Falha:** HUD exibe score final estilizado.

---

## 4. Navegação por progresso e restrições

- **Linearidade forçada:** O usuário não pode pular capítulos. Cada capítulo só destrava quando o anterior atinge seu critério de conclusão.
- **Replay granular:** Em caso de falha, o usuário pode retornar ao início do capítulo crítico (não obrigatoriamente ao Cap. 1).
- **Breadcrumb de capítulos:** Indicador visual fixo abaixo do HUD mostrando os 6 capítulos como passos, com ícone de estado (✓ concluído / ● atual / ○ bloqueado).

---

## 5. SEO e metadados

```html
<title>Operação Capital Cognitivo — Simulador Executivo de FinOps & IA | Maurício Issei</title>
<meta name="description"
  content="Simulador executivo interativo: domine FinOps de IA e o framework Useful Intelligence per Dollar (UI/$) investigando uma crise financeira corporativa real.">
<meta property="og:title" content="Operação Capital Cognitivo — Simulador de FinOps & IA">
<meta property="og:description"
  content="Descubra por que a IA mais cara não é a que cobra mais por token. Simule, investigue, defenda suas decisões.">
<meta property="og:image" content="https://mauricio.issei.com.br/og-operacao-capital-cognitivo.png">
<link rel="canonical" href="https://mauricio.issei.com.br/operacao-capital-cognitivo.html">
```

---

### Referências cruzadas

- Conteúdo de cada capítulo → [02](02_jornada_6_capitulos.md)
- Especificação do HUD como componente → [08](08_wireframes_catalogo_componentes.md)
- Requisitos de acessibilidade do HUD → [09](09_acessibilidade_seo_metricas.md)
