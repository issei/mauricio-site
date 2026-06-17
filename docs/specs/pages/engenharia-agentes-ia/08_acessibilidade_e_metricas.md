# 08 — Acessibilidade e Métricas de Experiência

> Cobre os entregáveis **15 (Acessibilidade)** e **16 (Métricas e observabilidade da experiência)**.
> Acessibilidade é projetada **desde o início**, não retrofit. As visualizações complexas têm
> **versões textuais equivalentes obrigatórias** — coerente com o princípio XAI (mostrar o conteúdo,
> não esconder atrás do "show").

---

## Parte A — Acessibilidade

### A.1 Meta e padrão

- **Alvo: WCAG 2.1 AA** em toda a experiência. Componentes interativos pesados (Simulador,
  Playground, BPMN) miram **equivalência funcional**, não só conformidade formal.
- Princípio: **a experiência funciona sem o "show"**. Removendo animação, cor e mouse, o conteúdo e a
  avaliação continuam acessíveis.

### A.2 Navegação por teclado

- Todo controle (links, botões, sliders, toggles, peças do playground, nós BPMN) **focável e operável
  por teclado**, em ordem lógica (`tab`/`shift+tab`).
- **Sliders do simulador:** setas ajustam valor; `Home/End` para mín/máx; valor anunciado.
- **Drag-and-drop (Playground):** alternativa por teclado obrigatória — selecionar peça (`Enter`),
  mover/posicionar via menu ou setas, conectar via seleção de origem→destino. Nunca só arrastar.
- **BPMN:** navegação entre elementos por teclado; overlays/hotspots abríveis por foco.
- **Skip links** ("pular para conteúdo", "pular para a trilha"); foco visível sempre (anel de foco de
  alto contraste, não removido).
- **Sem armadilhas de foco;** modais/abas devolvem foco corretamente.

### A.3 ARIA e semântica

- HTML semântico primeiro (`nav`, `main`, `section`, `article`, `button`, headings em ordem).
- **Trilha/progresso:** `aria-current` no capítulo atual; estado bloqueado/concluído anunciado
  (`aria-disabled`, texto em vez de só cadeado).
- **Quizzes:** `role="radiogroup"`/`group`, feedback com `aria-live="polite"` (acerto/erro lido).
- **Medidores (simulador):** `role="meter"`/`progressbar` com `aria-valuenow/min/max/text`
  (rótulo qualitativo, não só número).
- **Visualizações:** o `eai-viz-panel` expõe `role="img"`/`figure` com `aria-label` + `figcaption`,
  e um `aria-live` para narrar mudanças de estado quando o usuário interage.
- **SVG:** `<title>`/`<desc>` em cada gráfico; elementos decorativos `aria-hidden`.

### A.4 Contraste e cor

- Texto e UI atingem AA (4.5:1 corpo; 3:1 texto grande/ícones) em **ambos os temas** — verificar
  cada token de [07](07_direcao_de_arte_e_animacoes.md).
- **Cor nunca é o único portador de significado.** As cores semânticas (verde/âmbar/vermelho/humano/
  incerteza) sempre acompanham **ícone + rótulo de texto** (ex.: ❌ "fronteira sem contrato", não só
  vermelho). Incerteza usa padrão tracejado além de cor.
- Modo de alto contraste respeitado (`forced-colors`/`prefers-contrast`): bordas e foco não somem.

### A.5 Movimento

- `prefers-reduced-motion: reduce` → fallbacks de [07 §B.5](07_direcao_de_arte_e_animacoes.md)
  (passo-a-passo, estado final estático).
- Toggle manual `eai-motion-toggle` independente da preferência do SO.
- Nenhum conteúdo essencial depende de autoplay; nada pisca > 3×/s (risco de convulsão).

### A.6 Equivalentes textuais das visualizações (obrigatório)

Cada visualização de [04](04_visualizacoes_interativas.md), cada diagrama BPMN de
[05](05_bpmn_diagramas_executaveis.md) e o Hero têm **versão textual equivalente** que transmite a
mesma lição:

| Visualização | Equivalente textual |
| :-- | :-- |
| Hero caos×disciplina | parágrafo "À esquerda, agentes livres entram em loop e o custo sobe…; à direita, um pipeline fixo dá sempre o mesmo resultado." |
| DAG × agentes (V1) | descrição do fluxo M1→M5 + nota de reprodutibilidade; tabela de etapas |
| Firewall de contratos (V4) | lista: payload válido passa; campo-extra/score 1.7/tipo errado são barrados, com o motivo |
| Ledger + ondas (V7) | texto: "ao bater o teto, o restante fica pendente; no dia seguinte a onda retoma; itens em cache são pulados" |
| Desmontagem XAI (V9) | lista de drivers +/−, lacunas e fontes em texto |
| BPMN (cada fluxo) | `figcaption` em prosa descrevendo nós e ligações; tabela origem→destino |

- **Implementação:** toda visualização tem um botão/disclosure **"ver descrição"** que revela o
  equivalente textual inline (também serve a leitores de tela via `aria-describedby`).

### A.7 Conteúdo e legibilidade

- Idioma `lang="pt-BR"`; medida de leitura ~68ch; suporte a zoom 200% sem perda de conteúdo
  (layout fluido).
- Código com rótulo de linguagem; tabelas com `<th scope>`; nada de texto em imagem.
- Mobile (< 768px): alvos de toque ≥ 44px; sem scroll horizontal; tabelas largas viram cards
  (regra de [03](03_wireframes_e_catalogo_de_componentes.md)).

### A.8 Checklist de QA de acessibilidade (gate de DoD da página)

- [ ] Navegação 100% por teclado (incl. DnD do Playground e BPMN)
- [ ] Foco visível em todos os controles; skip links funcionam
- [ ] Todas as visualizações têm `<title>/<desc>` + equivalente textual revelável
- [ ] `aria-live` anuncia resultado de quiz e mudança de medidores
- [ ] Contraste AA verificado nos dois temas (ferramenta automatizada + spot-check manual)
- [ ] `prefers-reduced-motion` testado em todas as animações de [07 §B.4](07_direcao_de_arte_e_animacoes.md)
- [ ] Cor + ícone + texto em todo significado semântico
- [ ] Zoom 200% sem perda; mobile com alvos ≥44px
- [ ] Teste com leitor de tela (NVDA/VoiceOver) nos fluxos-chave: trilha, quiz, simulador

---

## Parte B — Métricas e Observabilidade da Experiência

### B.1 Princípio (honestidade Open-World aplicada às métricas)

> O site **só afirma o que mediu**. Métrica não coletada aparece como "—" (desconhecido), nunca como
> zero inventado — o mesmo Open-World que ensinamos. Tudo **client-side, anônimo, sem PII** (não há
> backend; respeitar consentimento/LGPD).

### B.2 Métricas educacionais

| Métrica | Como medir | O que revela |
| :-- | :-- | :-- |
| **Tempo por capítulo** | timestamps de entrada/saída por capítulo | capítulos longos/confusos |
| **Taxa de abandono** | último capítulo alcançado / total | onde a trilha "perde" gente |
| **Funil de conclusão** | % que conclui cada capítulo | gargalos de progressão |
| **Acertos por avaliação** | tentativas até acertar o gate | exercícios mal calibrados |
| **Interações realizadas** | nº de manipulações por visualização | engajamento vs. passividade |
| **Conceitos revisitados** | reaberturas de capítulo/visualização | conceitos difíceis |
| **Uso de ferramentas** | sessões de Simulador/Playground, arquiteturas montadas | valor das features pesadas |
| **Modo de entrada** | trilha linear vs. exploração livre | qual persona predomina |
| **Caminho percorrido** | sequência de seções visitadas | navegação real vs. projetada |
| **Conclusão do capstone** | % que zera os achados altos no Playground | sucesso do objetivo terminal |
| **Tema / reduced-motion** | preferências escolhidas | decisões de acessibilidade reais |

### B.3 Instrumentação (sem backend)

- **Camada de eventos:** um wrapper `eai-track(evento, props)` que despacha para o analytics já usado
  no site (verificar [SEO_ANALYTICS.md](../../SEO_ANALYTICS.md) do repo) — provável GA4/Plausible.
  Eventos custom: `chapter_start/complete`, `quiz_attempt`, `viz_interact`, `sim_change`,
  `playground_evaluate`, `theme_change`, etc.
- **Progresso local:** `localStorage` guarda estado do usuário (sem login); base para "continue de
  onde parou" e para o funil local.
- **Privacidade:** anônimo, agregável; banner/respeito a consentimento; nada de gravação de conteúdo
  digitado.

### B.4 Dashboard de aprendizagem (esboço)

Painel (interno, fora do site público) que consome o analytics:

```
┌─ FUNIL DA TRILHA ────────────┐  ┌─ DIFICULDADE POR CAPÍTULO ───┐
│ Cap1 ████████████ 100%       │  │ tentativas médias até o gate │
│ Cap2 █████████ 78%           │  │ Cap6 ▆▆▆▆ (mais difícil)     │
│ …                            │  │ Cap1 ▆ (fácil)               │
└──────────────────────────────┘  └──────────────────────────────┘
┌─ ENGAJAMENTO COM FERRAMENTAS ┐  ┌─ MODO DE ENTRADA ────────────┐
│ Simulador: N sessões         │  │ linear 55% · livre 45%       │
│ Playground: N arquiteturas   │  │ (— se amostra insuficiente)  │
└──────────────────────────────┘  └──────────────────────────────┘
```

- **Leitura acionável:** queda forte entre Cap N e N+1 → revisar gate/comprimento; muitas tentativas
  num quiz → revisar enunciado; baixo uso de uma visualização → revisar valor (candidata a corte).
- **Honestidade:** células com amostra insuficiente mostram "—", não 0%.

### B.5 Ficha técnica

- **Objetivo:** entender e melhorar a aprendizagem com dados, sem violar privacidade nem a infra
  estática.
- **UX:** invisível ao usuário final (exceto consentimento); dashboard é ferramenta de produto.
- **Componentes:** wrapper `eai-track`, `localStorage` de progresso, dashboard externo.
- **Tecnologias:** analytics client-side existente do site + eventos custom; sem backend novo.
- **Complexidade:** **Baixa-Média.**
- **Riscos:** privacidade/consentimento; métricas enganosas com amostra pequena. **Mitigação:**
  anonimato, consentimento, regra "— quando não medido", agregação mínima antes de concluir.

---

### Referências cruzadas

- Animações e reduced-motion → [07 §B.5](07_direcao_de_arte_e_animacoes.md)
- Equivalentes textuais das visualizações → [04](04_visualizacoes_interativas.md), [05](05_bpmn_diagramas_executaveis.md)
- Analytics/SEO do repo → [../../SEO_ANALYTICS.md](../../SEO_ANALYTICS.md)
- Gates da trilha (acessíveis por teclado) → [02](02_jornada_de_aprendizagem.md)
