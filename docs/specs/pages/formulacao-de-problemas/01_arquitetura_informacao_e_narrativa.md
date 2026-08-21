# 01 — Arquitetura de informação e narrativa

## 1. Princípio de recorte

O artigo tem 10 seções e ~11 mil palavras. A página **não** é a transcrição do artigo: é a sua
versão navegável, com a mesma espinha argumentativa e a densidade redistribuída — o que é
argumento vira prosa curta; o que é estrutura (dimensões, estados, matrizes, curvas) vira
visualização; o que é catálogo (referências, tabelas longas) vira bloco recolhível.

**Regra de fidelidade:** nenhuma afirmação da página pode ser mais forte que a do artigo. Onde o
artigo diz "proposta original, ainda não validada", a página diz o mesmo — em selo visível.

## 2. Mapa de seções (ordem de leitura)

| # | Âncora | Seção | Origem no artigo | Visualização |
| :-- | :-- | :-- | :-- | :-- |
| 0 | `#hero` | Hero — "A engenharia que sabe parar" | Título + Resumo | **V1** Arco Refinar → Parar |
| 1 | `#tese` | A tese e o que ela **não** afirma | §1.4 (H₁ e as cinco negações) | — (lista de negações) |
| 2 | `#pergunta` | A pergunta de pesquisa e as quatro subperguntas | §1.2 | — |
| 3 | `#incertezas` | Seis incertezas, não uma | §2.4 | **V2** Rosácea das seis incertezas |
| 4 | `#estados` | Do desagregado à decisão: seis estados | §5.2, §5.3 | **V3** Máquina de estados S₀–S₅ |
| 4.5 | `#pipeline` | Da Teoria à Prática: o Pipeline da Decisão Computacional | complemento em vídeo (fora do artigo) | — (embed 16:9) |
| 5 | `#parada` | A regra de parada | §5.5, §6.3, §6.4 | **V4** Curva de parada interativa |
| 6 | `#hiper-resolucao` | O paradoxo da sobreinformação e o penalizador λ | §5.6, §7.1 | **V5** Confiança × acurácia (Slovic) |
| 7 | `#metricas` | Painel, não índice único | §5.4, §6.5 | **V6** Painel de dez dimensões |
| 8 | `#tradicoes` | Sete tradições, sete fronteiras | §3, §4.2 | **V7** Mapa das tradições |
| 9 | `#limites` | Onde isto não se aplica | §7.2, §7.3, §7.4 | — (cards de contraindicação) |
| 10 | `#falseabilidade` | Como refutar esta hipótese | §8.4 | — (oito critérios numerados) |
| 11 | `#etica` | O direito de formular | §9 | — |
| 12 | `#veredito` | Veredito: sustentação parcial | §10 | — (selo de status) |
| 13 | `#aeo` | Em síntese + Perguntas frequentes | gerado por `build-aeo.mjs` | — |
| 14 | rodapé | Referências e procedência | §Referências | — |

## 3. Jornada de leitura (três velocidades)

1. **90 segundos** — Hero → V1 → "Em síntese". Sai com a tese e o gesto central (refinar e parar).
2. **8 minutos** — acrescenta V2, V4 e o Veredito. Sai com o critério de parada operável.
3. **~25 minutos** — página inteira. Sai com o programa de pesquisa e os critérios de refutação.

A navegação de topo (`.fp-nav`) expõe seis marcos, não quinze: *Tese · Incertezas · Estados ·
Pipeline · Parada · Limites*. O marco `Pipeline` existe porque uma seção de vídeo que ninguém
encontra é uma seção que não existe. Trilha completa fica no índice lateral recolhível dentro de `#tese`.

## 4. Entradas por dor (padrão da casa)

Cartões de entrada logo abaixo do hero, no molde de `engenharia-confianca.html`:

| Pergunta do leitor | Destino |
| :-- | :-- |
| "Minha equipe refina requisitos sem nunca decidir." | `#parada` |
| "Cada área descreve um problema diferente." | `#incertezas` |
| "Quanto mais estudamos, mais confiantes e menos certos ficamos." | `#hiper-resolucao` |
| "Como sei que este framework não é papelada nova?" | `#falseabilidade` |

## 5. Selos de status epistêmico

Componente `.fp-selo`, obrigatório em todo bloco derivado do artigo:

| Selo | Significado | Onde aparece |
| :-- | :-- | :-- |
| `SÍNTESE` | Consolidação de literatura existente | §3, §4, V7, V2 |
| `PROPOSTA` | Contribuição original do artigo | V3, V6, suficiência negociada |
| `NÃO VALIDADO` | Proposta sem validação empírica | V4 (λ), V5, PFQI, benchmark |
| `EVIDÊNCIA` | Achado empírico de terceiro, com fonte | Slovic (1974), Peng et al. |

Contraste e forma: texto `#c9d1d9` sobre `#1c2230`, borda `1px` na cor semântica, `letter-spacing`
alto, `font-size` 0.72rem. Nunca depende só de cor — o rótulo textual é o portador do significado.

## 6. Crosslinks internos (materializados no corpo)

| De | Para | Racional |
| :-- | :-- | :-- |
| `#parada` | `/engenharia-agentes-ia` | Regra de parada é o *fail-closed* na escala da investigação. |
| `#hiper-resolucao` | `/engenharia-confianca` | Confiança que cresce mais rápido que acurácia é o Crash Silencioso do processo decisório. |
| `#estados` | `/proposta-engenharia-reversa` | S₀→S₂ é o mesmo movimento do As-Is → To-Be em legado. |
| rodapé | `/catalogo` | Retorno ao hub (evita página órfã — `audit-site.mjs`). |

## 6.5. Conteúdo que não vem do artigo

A seção `#pipeline` é a única da página cujo conteúdo **não** deriva do artigo: é a ponte para o
complemento em vídeo (YouTube `lhEdMm7qvAU`), que trata da execução do que o texto formula em
teoria. Três amarras a mantêm coerente com o resto:

1. a **Armadilha do Solucionismo** do vídeo é a mesma `solutioneering` do portão S₃→S₄ — a seção
   linka para a entrada do glossário, não cria vocabulário paralelo;
2. o **PFQi** é apresentado com a ressalva de `#metricas` ao lado (painel, não índice único) — sem
   isso a página passaria a defender exatamente o que o artigo critica;
3. o **limite da supervisão humana** é ancorado no *fail-closed* de `/engenharia-agentes-ia`.

Nenhuma afirmação sobre o conteúdo do vídeo vai além desses três pontos: descrever cenas que não
foram verificadas seria inventar evidência numa página cujo tema é não inventar evidência.

## 7. Mapeamento de perdas (o que sai do artigo e por quê)

| Conteúdo do artigo | Tratamento na página | Motivo |
| :-- | :-- | :-- |
| §4.1 tabela de 12 autores | Recolhida em `<details>` dentro de `#tradicoes` | Catálogo; interrompe a leitura corrida. |
| §6.1–6.2 álgebras de informação (⊗, ↓) | Dois cartões formais dentro de `#estados` | Formalismo necessário, mas secundário à tese. |
| §8.2 benchmark de 10 casos | Tabela recolhida em `#falseabilidade` | Instrumento de pesquisa, não argumento. |
| Referências completas | Rodapé, em colunas, com links externos `rel="noopener"` | Procedência exigida pela casa. |
| Metadados de autoria do original (`[Nome do autor]`) | Substituídos pela autoria do site | O artigo é publicado como texto próprio do portfólio. |
