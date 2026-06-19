# 03 — Wireframes Conceituais e Catálogo de Componentes

> Cobre os **wireframes conceituais por seção** e o **catálogo de componentes reutilizáveis** que
> renderizam o gabarito de módulo de [02](02_jornada_de_aprendizagem.md).
> Diagramas em ASCII; a implementação usa Tailwind v4 + Vanilla JS (ver [`AGENTS.md`](../../../../AGENTS.md)).

---

## 1. Layout-mestre (desktop)

```
┌───────────────────────────────────────────────────────────────────────┐
│ [ProgressBar fixa]  ● M0 ─ ○ M1 ─ ○ M2 ─ ○ M3   │ Maturidade: ◔ nível 2 │
├──────────────┬────────────────────────────────────────────────────────┤
│              │                                                          │
│  Glossário   │   ÁREA DE CONTEÚDO (scroll)                              │
│  (sidebar    │   ┌────────────────────────────────────────────────┐   │
│   sticky)    │   │ HERO — arco "do Caos à Governança"              │   │
│              │   │  Tese + 4 PainEntryCards                        │   │
│  • Crash     │   └────────────────────────────────────────────────┘   │
│    Silencioso│   ┌────────────────────────────────────────────────┐   │
│  • Resíduo   │   │ MÓDULO N (gabarito — ver §3)                    │   │
│    Interp.   │   └────────────────────────────────────────────────┘   │
│  • Vazam.Modo│            …                                            │
│  • Sist.     │   ┌────────────────────────────────────────────────┐   │
│    Intencional│  │ FECHO — Régua de Maturidade interativa          │   │
│  • [+termos] │   └────────────────────────────────────────────────┘   │
└──────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Wireframes por seção

### 2.1 Hero

```
┌──────────────────────────────────────────────────────────┐
│  A ENGENHARIA DA CONFIANÇA                                │
│  Da Intenção à Execução Agêntica                          │
│                                                            │
│  "A capacidade vem do modelo; a confiança vem da          │
│   engenharia."                                            │
│                                                            │
│  [ gradiente animado: CAOS ───────────► GOVERNANÇA ]      │
│                                                            │
│  Por onde você entra?                                     │
│  ┌────────────┐┌────────────┐┌────────────┐┌───────────┐ │
│  │ Minha IA   ││ Tenho um   ││ Não confio ││ Quero      │ │
│  │ falha sem  ││ legado que ││ na saída   ││ escalar    │ │
│  │ avisar →M0 ││ ninguém →M1││ →M2        ││ com método→M3│ │
│  └────────────┘└────────────┘└────────────┘└───────────┘ │
│            [ Iniciar a jornada do início ▾ ]              │
└──────────────────────────────────────────────────────────┘
```

### 2.2 Gabarito de Módulo (aplica-se a M0–M3)

```
┌──────────────────────────────────────────────────────────┐
│ ‹recap em uma frase: "de onde viemos"›        [badge Mód.] │
│                                                            │
│ CONCEITO CENTRAL  (tipografia grande, destaque)            │
│ ──────────────────────────────────────────────            │
│ Narrativa (prosa, 3–5 parágrafos)                          │
│                                                            │
│ ┌── Elemento visual ──────────────────────────┐           │
│ │  [Diagrama Mermaid]   +   [analogia]         │           │
│ └──────────────────────────────────────────────┘          │
│                                                            │
│ ┌── Prática educativa ────────────────────────┐           │
│ │  cards interativos / classificação           │           │
│ └──────────────────────────────────────────────┘          │
│                                                            │
│ ┌─ 💡 Benefício para o Negócio ───────────────┐ (callout)  │
│ └──────────────────────────────────────────────┘          │
│                                                            │
│ ── Faixa de referência cruzada ──                          │
│   📄 conceito → arquivo.md   ·   📄 …                       │
│                                                            │
│ [ ► Explore o pilar completo → /pagina-fonte ]             │
│                                                            │
│ ┌─ CTA de reflexão ───────────────────────────┐           │
│ │ "pergunta de maturidade?"   (Maturidade N→N+1)│          │
│ └──────────────────────────────────────────────┘          │
└──────────────────────────────────────────────────────────┘
```

### 2.3 Régua de Maturidade (fecho)

```
┌──────────────────────────────────────────────────────────┐
│  Onde está o seu sistema/time hoje?                        │
│  ①Mágica ─ ②Consciência ─ ③Mapeado ─ ④Arquitetado ─ ⑤Gov. │
│   ▲ clique para marcar seu estágio                         │
│  → próximo passo concreto exibido para o estágio escolhido │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Catálogo de componentes

Ficha por componente: **Função · Props/conteúdo · Estados · Notas**.

### `ProgressBar` (jornada)
- **Função:** mostrar progresso linear nos 4 módulos + estágio de maturidade atual.
- **Conteúdo:** 4 marcadores + indicador de maturidade.
- **Estados:** módulo pendente / atual / concluído (visto). Atualiza via `IntersectionObserver`.
- **Notas:** `position: sticky` no topo; vira barra fina no mobile.

### `PainEntryCards` (hero)
- **Função:** entrada por dor → salto ao módulo correspondente.
- **Conteúdo:** 4 cards (título-dor + seta para `#modulo-N`).
- **Estados:** hover com elevação + glow neon (design system).

### `ModuleSection`
- **Função:** renderiza o gabarito de módulo (§2.2).
- **Props:** `numero`, `titulo`, `recap`, `conceito`, `narrativa`, `visual`, `pratica`, `beneficio`,
  `refsCruzadas[]`, `linkPilar`, `ctaReflexao`, `maturidadeDe`, `maturidadePara`.
- **Notas:** componente-base; tudo herda dele para consistência.

### `ConceptHighlight`
- **Função:** destacar a tese do módulo (blockquote grande, borda de gradiente).

### `MermaidDiagram`
- **Função:** renderizar diagrama Mermaid com fallback textual.
- **Props:** `definicao` (código Mermaid), `altText` (equivalente textual obrigatório — ver 00 §3.4).
- **Notas:** tema dark configurado no init do Mermaid (ver 04 §7).

### `AnalogyBlock`
- **Função:** apresentar analogia (Chef / Freio de F1) com ícone e legenda.
- **Variantes:** `chef`, `f1`, `amplificador`.

### `BusinessBenefitCallout`
- **Função:** bloco 💡 "Benefício para o Negócio" — ponte para a persona executiva.
- **Estilo:** callout com fundo sutil de destaque, ícone.

### `CrossRefStrip`
- **Função:** faixa de referências cruzadas conceito → arquivo do repo.
- **Conteúdo:** lista de pares (rótulo, caminho/URL) com ícone 📄.

### `PillarLinkCTA`
- **Função:** botão "Explore o pilar completo →" para a página-fonte.
- **Estados:** primário com gradiente azul→roxo.

### `ReflectionCTA`
- **Função:** pergunta de reflexão + badge de transição de maturidade.
- **Props:** `pergunta`, `maturidadeDe`, `maturidadePara`.

### `GlossarySidebar`
- **Função:** glossário persistente (4 termos-âncora + termos de engenharia).
- **Interação:** clicar num termo no texto rola/destaca o verbete; verbete linka à fonte.
- **Responsivo:** drawer/acordeão no mobile (ver §4).

### `MaturityRuler`
- **Função:** régua interativa 1→5; clique marca estágio e revela próximo passo.
- **Estado:** estágio selecionado (em memória da sessão; sem `localStorage` no MVP).

### `MaturityBadge`
- **Função:** selo compacto do estágio (usado na ProgressBar e nos CTAs).

---

## 4. Comportamento responsivo

| Breakpoint | Layout |
| :-- | :-- |
| ≥ 1024px | Sidebar de glossário fixa à esquerda + conteúdo + ProgressBar no topo. |
| 768–1023px | Glossário recolhe em botão flutuante (drawer). ProgressBar mantém. |
| < 768px | Glossário vira acordeão no fim de cada módulo + drawer por botão; PainEntryCards empilham; diagramas Mermaid com scroll horizontal e fallback textual em destaque. |

---

## 5. Acessibilidade (resumo; alinhar a WCAG 2.1 AA)

- Todo `MermaidDiagram` tem `altText` textual equivalente — a narrativa funciona sem o diagrama.
- Contraste mínimo AA sobre fundo `#0d1117` (validar tokens em 06 §2).
- Navegação por teclado: ProgressBar e ModuleNav focáveis; ordem de tab segue a leitura.
- `prefers-reduced-motion`: desliga o gradiente animado do hero e transições.
- Termos do glossário: `<abbr>`/`<button>` com `aria-describedby` para o verbete.

---

### Referências cruzadas

- Conteúdo que preenche cada componente → [02](02_jornada_de_aprendizagem.md)
- Specs dos diagramas Mermaid → [04](04_visualizacoes_e_diagramas_mermaid.md)
- Tokens visuais e tom → [06](06_estilo_roadmap_esforco_riscos.md)
