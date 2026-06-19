# 06 — Tom, Estilo, Roadmap, Esforço e Riscos

> Cobre as **diretrizes de conteúdo e estilo** ([`site.md`](../../../references/site.md) §2), os
> **design tokens** alinhados ao Dark Tech, o **roadmap incremental**, a **estimativa de esforço**, os
> **riscos** e as **recomendações finais**.

---

## 1. Tom de voz e diretrizes de conteúdo

### 1.1 Tom

**Conversacional, inteligente, provocativo e técnico-disciplinado.** Fala com um par, não com um
aluno. Provoca ("a IA não falha; ela mente com confiança"), mas sempre ancora a provocação em
engenharia.

### 1.2 Léxico — engenharia, não marketing

| Prefira (engenharia) | Evite (marketing) |
| :-- | :-- |
| Idempotência, rastreabilidade, camadas epistêmicas | "revolucionário", "disruptivo" |
| Determinismo, contrato, fail-closed | "mágico", "poderoso", "next-gen" |
| Resíduo interpretativo, Crash Silencioso | "solução completa", "turbinado" |
| "reduz risco auditável" | "muda o jogo" |

### 1.3 Regras de escrita

- Prosa em parágrafos; listas só quando a estrutura é genuinamente uma lista.
- Cada conceito técnico tem link para a fonte (ver 05).
- Cada módulo fecha com **CTA de reflexão** baseado no Modelo de Maturidade (00 §3.1).
- `Nota editorial` sinaliza transições escritas do zero (não vindas de fonte); `Nota para o
  desenvolvedor` sinaliza decisão de implementação.
- Toda visualização tem equivalente textual (00 §3.4, 04 §7).

---

## 2. Direção de arte e design tokens

Herdado do [`STYLE_GUIDE.md`](../../STYLE_GUIDE.md) e [`AGENTS.md`](../../../../AGENTS.md) — **não desviar**.

| Token | Valor | Uso |
| :-- | :-- | :-- |
| Fundo base | `#0d1117` | Pure dark mode; nunca fundo claro. |
| Texto | `#e6edf3` / cinza claro | Corpo. |
| Borda / linha | `#30363d` | Divisores, bordas de card, diagramas. |
| Acento primário | `#007bff` | Links, CTA primário, início do gradiente. |
| Acento secundário | `#8a2be2` | Fim do gradiente, destaques cognitivos. |
| Gradiente | `#007bff → #8a2be2` | Hero, CTAs, títulos de módulo. |
| Tipografia | `Inter` (Google Fonts) | Tudo. |
| Micro-interações | hover elevation + glow (`box-shadow`) | Cards, botões. |

### 2.1 Sistema de animações (disciplinado)

- **Hero:** gradiente animado Caos → Governança (suave, lento). Desliga em `prefers-reduced-motion`.
- **Scroll reveal:** módulos entram com fade/slide curto via `IntersectionObserver`.
- **ProgressBar:** transição do marcador ao mudar de módulo.
- **Regra:** animação que não muda o entendimento é cortada. Nada decorativo.

---

## 3. Roadmap incremental (MVP → V1 → V2)

O site **pratica o que ensina**: escopo fechado por fase, fail-closed (00 §1.4).

### MVP — a narrativa completa, estática

- Hero + 4 módulos (texto integral) + régua de maturidade (estática) + glossário (sidebar/acordeão).
- Diagramas Mermaid renderizados (5 fluxos do doc 04) com equivalentes textuais.
- Links "Explore o pilar completo" para as 3 páginas-fonte e faixas de referência cruzada.
- ProgressBar de jornada + navegação dual.
- **Critério de pronto:** um leitor percorre a jornada inteira e chega às páginas-fonte sem becos sem saída.

### V1 — interatividade leve

- `MaturityRuler` interativa (marcar estágio → próximo passo concreto).
- Prática educativa de M0 (classificar cenários) e M2 (decisões "e se eu não fizer?").
- Glossário com destaque inline clicável em todas as ocorrências.
- Bloco de dogfooding ("este site foi construído com os princípios que ensina").

### V2 — aprofundamento opcional

- Persistência da maturidade entre visitas (avaliar `localStorage` — fora do MVP por disciplina).
- Versão "para o time" exportável (resumo de cada módulo + CTAs para daily).
- Trilhas filtradas por persona (executivo / arquiteto / dev).
- Atualização do `README.md` do repo como portal (especificado em 01 §5).

---

## 4. Estimativa qualitativa de esforço

| Item | Complexidade | Observação |
| :-- | :-- | :-- |
| Conteúdo dos 4 módulos | Média | Maior parte é curadoria/transição; fontes já existem. |
| Diagramas Mermaid (5) | Baixa-Média | Código pronto em 04; ajustar tema dark. |
| Navegação dual + ProgressBar | Média | `IntersectionObserver` + sticky. |
| Glossário sidebar/drawer | Média | Responsivo é o ponto de atenção. |
| Régua de maturidade interativa | Baixa (V1) | Estado em memória de sessão. |
| Analogias (Chef/F1/Amplificador) | Baixa | Ícones/SVG + legenda. |
| Acessibilidade (AA) + testes Playwright | Média | Smoke test obrigatório por `AGENTS.md`. |

> **Maior alavanca de esforço economizado:** reaproveitar as páginas-fonte em vez de reescrevê-las. O
> trabalho é narrativo e de costura, não de produção de conteúdo técnico do zero.

---

## 5. Riscos e mitigação

| Risco | Impacto | Mitigação |
| :-- | :-- | :-- |
| Duplicar conteúdo das páginas-fonte (divergência futura) | Alto | Site é só a camada narrativa; encaminha à fonte. Uma verdade por pilar. |
| Página longa desorienta | Médio | ProgressBar fixa + navegação por módulo + recap em uma frase. |
| Diagrama Mermaid falha ao renderizar | Médio | `altText` textual obrigatório como fallback visível. |
| Tom marketing vaza no texto | Médio | Léxico do §1.2 como checklist de revisão. |
| Glossário compete por espaço no mobile | Médio | Drawer/acordeão; termos-âncora priorizados. |
| Links para `.html`-fonte quebram se a página for renomeada | Baixo | Centralizar URLs em 05 §2; checar no smoke test. |
| Escopo inchar (V2 entrando no MVP) | Médio | Faseamento fail-closed (§3); feature pesada não entra "porque seria legal". |

---

## 6. Recomendações finais

1. **Construa o MVP estático primeiro.** A narrativa coesa e os links corretos já entregam ~80% do
   valor. Interatividade é incremento, não pré-requisito.
2. **Trate as páginas-fonte como cidadãs intocáveis.** O ganho do site é conectar, não reescrever.
3. **Use o próprio site como prova.** Tornar o dogfooding explícito (V1) fecha o ciclo pedagógico e
   aumenta credibilidade.
4. **Valide com uma persona por extremo.** Teste a trilha linear com um "Rafael" e a entrada por dor
   com um "executivo Tanaka" antes de polir.
5. **Mantenha a spec como fonte da verdade.** Se a narrativa evoluir, atualize estes documentos *antes*
   do código — coerente com o Módulo 3 que o próprio site ensina.

> **Fecho.** Este conjunto de specs é, ele mesmo, um exemplo do Módulo 3: a intenção do site vive aqui,
> versionada e referenciável — não num prompt efêmero. A confiança escala quando o contexto sai da
> cabeça e entra no repositório.

---

### Referências cruzadas

- Personas a testar → [00](00_visao_personas_objetivos.md) §2
- Conteúdo dos módulos → [02](02_jornada_de_aprendizagem.md)
- Tokens aplicados aos componentes → [03](03_wireframes_e_catalogo_de_componentes.md)
