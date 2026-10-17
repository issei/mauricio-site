# D — Plano de implementação: página do TGI sobre EDI

> Artefato D. Etapas pequenas, cada uma com entrega e verificação objetiva. Executar em ordem;
> uma fase só começa com a anterior verificada. Spec: [C](tgi-edi-portfolio-spec.md);
> matriz: [B](tgi-edi-content-traceability.md); inventário: [A](tgi-edi-import-inventory.md).
>
> **Esta etapa não implementa a página.** O plano começa quando o autor do site aprovar a spec.
> Merge em `main` dispara deploy de produção: cada PR de implementação fica aberto até revisão.

## Pré-requisitos

| # | Item | Responsável |
| :-- | :-- | :-- |
| PR-1 | Spec (A–D) aprovada no PR desta etapa | Autor do site |
| PR-2 | Resposta a Q-1 e Q-2 (consentimento dos coautores; figuras de terceiros) — **só bloqueia a Fase 7b** | Autor do site |
| PR-3 | Leitura de `AGENTS.md`, `mauricio-site-patterns`, `docs/a11y/A11Y.md` e do guia de componente aplicável | Implementador |

## Fase 1 — Importação e preservação do conteúdo

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T1.1 Conferir a integridade do original | — | `sha256sum` do ZIP em `/mnt/project-files/estudos/tgi-edi-2004/original/` = valor do inventário §1 |
| T1.2 Conferir os 14 `.doc` contra `SHA256SUMS-docs-no-zip.txt` | — | `sha256sum -c` sem falha |
| T1.3 Mapear as 24 imagens embutidas às figuras (18 ilustrações + tabelas 1 e 3) | Tabela no inventário §5.4 | Cada figura com legenda tem imagem(ns) atribuída(s); sobra nenhuma imagem sem destino |
| T1.4 Transcrever os rótulos das Ilustrações 1, 5, 6, 7, 10–13 (as 16–18 já estão no inventário) | Anexo do inventário | Rótulos conferidos contra o PDF renderizado em ≥ 130 dpi |
| T1.5 Gerar a lista de números esperados do TGI (48, 1,4 milhão, 1.200, 150, 4, 3, 5 mensagens, "cinco por cento", 844, 5.000, 13.000) com página | `tests/fixtures/tgi-edi.numbers.json` | Script confere cada número no texto extraído; falha se algum não for encontrado na página indicada |

Nada desta fase entra em `public/` ou `src/`.

## Fase 2 — Estrutura editorial

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T2.1 Redigir os blocos da camada A (seções 4.1–4.6 da spec), um bloco por ID da matriz | Rascunho em `docs/specs/pages/tgi-edi/copy/` (Markdown, um arquivo por seção) | Cada bloco começa com o ID da matriz; nenhum bloco sem ID |
| T2.2 Revisar a camada A com `ptbr-controlado` (perfil Técnico) e `scripts/verificar.py` | Relatório no PR | Zero pendência Crítica/Alta; descartes registrados |
| T2.3 Conferir números e citações da camada A contra o texto extraído | Checklist no PR | Teste da T1.5 verde contra o rascunho |
| T2.4 Revisão do autor do site sobre o tom e sobre D-3 (entrevistado pela função) | Comentário no PR | Aprovação registrada |

## Fase 3 — Integração com o site

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T3.1 Escrever o teste antes da página | `tests/tgi-gestao-de-pedidos-edi.spec.js` (carga 200, H1, ficha com 3 autores, seções do §4.0, selos, sem rolagem horizontal em 375 px) | Teste falha (página inexistente) |
| T3.2 Criar `src/tgi-gestao-de-pedidos-edi.html` e `.css` (namespace `.tgi-`), partindo da estrutura de `formulacao-de-problemas.html` (cabeçalho, rodapé, consentimento, `eco-nav`, marcador `<!-- AEO-BODY -->`) | Página com as seções 4.1–4.6 | T3.1 verde; nenhum hexadecimal novo fora da paleta Dark Tech |
| T3.3 Diagramas 1 e 2 em SVG inline com descrição textual | Dentro da página | Teste: `role="img"` + `aria-labelledby` + lista de passos; busca por "API", "nuvem", "ERP", "middleware" nos SVG = 0 |
| T3.4 Entrada em `scripts/seo/pages.mjs` (tipo `TechArticle`, tier S, `hasMd: true`, FAQ, termos) e nó `Thesis` (spec RS-5) | Bloco do slug | `node scripts/seo/build-aeo.mjs --check` verde; JSON-LD validado com três `author` no nó `Thesis` e `Person` do site no nó do artigo |
| T3.5 Extensão mínima em `scripts/seo/lib.mjs` se `extraGraph[]` não bastar para o nó `Thesis` | Diff pequeno + teste unitário | `node --test` verde; outras páginas com JSON-LD idêntico (diff do build) |
| T3.6 OG image | `public/og-tgi-gestao-de-pedidos-edi.png` via `scripts/seo/gen-og.mjs` | 1200 × 630; sem logotipo de terceiros |
| T3.7 Markdown companheiro | `public/tgi-gestao-de-pedidos-edi.md` | Gerado/conferido pelo pipeline AEO; selos de camada presentes |
| T3.8 Registros: `src/catalogo.html`, `specs/ecosystem.nav.yaml` (p5, bump de versão e changelog), `src/js/eco-nav.js`, `public/llms.txt`, `public/llms-full.txt`, `scripts/editorial/editorial.data.mjs` se a página receber a camada editorial | Diffs | Testes do ecossistema e do catálogo verdes; INV-1 e INV-2 do YAML válidos |
| T3.9 Verificar o impacto: só os arquivos de RF-13 mudam fora da página | `git diff --stat` no PR | Lista igual à esperada |

## Fase 4 — Sessões contemporâneas

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T4.1 Reabrir cada fonte F-01 a F-11 e H-02 e atualizar a data de acesso | Matriz B, Parte 3 | Cada URL responde e sustenta o texto da coluna "O que sustenta" |
| T4.2 Resolver os itens `V-fonte`: cronograma da NF-e em fonte oficial (portal nacional da NF-e ou CONFAZ); dado de adoção do EANCOM com ano; governança do EDIFACT (R-09) | Matriz atualizada | Item sem fonte oficial é removido da página, não suavizado |
| T4.3 Redigir as seções 4.7 e 4.8 (camadas B e C) | Rascunho em `copy/` | Cada parágrafo com ID da matriz; R-05 e R-07 em tom descritivo |
| T4.4 Revisão `ptbr-controlado` (Híbrido) e `tone-reviewer` | Relatório no PR | Zero pendência Crítica/Alta; nenhum adjetivo promocional |
| T4.5 Inserir na página | Seções 4.7, 4.8, 4.10, 4.11 | Teste: todo link externo da seção de referências pertence à Parte 3 da matriz |

## Fase 5 — Acessibilidade e SEO

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T5.1 Rodar axe na página | — | Zero `serious`/`critical`; `tests/a11y/baseline.json` não sobe |
| T5.2 Teclado, foco, zoom 200%, 320 px | Casos no spec Playwright | Verdes |
| T5.3 Selos sem dependência de cor | Teste | Todo `[data-camada]` tem texto de selo |
| T5.4 `translate="no"` nas citações | Teste | Todo `blockquote[data-camada="A"]` e `q[data-camada="A"]` tem `translate="no"` e `lang="pt-BR"` |
| T5.5 Título, descrição, canonical, OG | — | `audit-site.mjs` sem pendência para o slug |
| T5.6 Subagente `a11y-design-reviewer` | Relatório no PR | Sem pendência bloqueante |

## Fase 6 — Revisão de consistência

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T6.1 Guarda de rastreabilidade | `tests/tgi-edi.trace.test.mjs`: todo bloco tem `data-trace` com ID presente na matriz B; nenhum ID T5 publicado | Verde |
| T6.2 Guarda de afirmações | Mesmo teste: falha se "Makro" aparecer na mesma frase que "atualmente", "hoje", "ainda usa", "continua" no HTML, `.md` e `llms*.txt`; falha se a página tiver percentual diferente de "cinco por cento" atribuído ao TGI | Verde |
| T6.3 Guarda de autoria | Mesmo teste: a ficha tem exatamente os três nomes na ordem da capa; falha com "meu TGI", "desenvolvi o TGI", "meu trabalho de conclusão" | Verde |
| T6.4 Gêmeo em inglês | `npm run i18n:sync && npm run i18n:check` (local; o ambiente de nuvem bloqueia o host do Argos) | `src/en/tgi-gestao-de-pedidos-edi.html` gerado; citações em português intocadas |
| T6.5 Leitura integral comparada | Checklist CA-01 a CA-18 da spec no PR | Todos marcados |
| T6.6 `npm run gate` | — | Verde |

## Fase 7 — Publicação

| Tarefa | Entrega | Verificação |
| :-- | :-- | :-- |
| T7a.1 PR da página na variante "sem documento" | PR aberto, sem merge automático | CI verde; revisão do autor do site |
| T7a.2 Merge pelo autor do site | Deploy de produção | Página responde 200 em produção; `/en/` responde 200; `.md` servido como `text/markdown` |
| T7b.1 (após Q-1 e Q-2) Gerar o PDF consolidado (inventário §8) | `public/downloads/tgi-gestao-de-pedidos-edi-2004.pdf` | Conferência página a página contra o PDF renderizado, registrada no PR; SHA-256 calculado |
| T7b.2 Trocar a seção 4.9 para a variante "com documento" | Diff da seção + nó `Thesis` com `url` | Teste compara o SHA-256 exibido com o do arquivo |
| T7b.3 Verificar o serviço do PDF | — | Em produção: `Content-Type: application/pdf` (o `aws s3 sync` do deploy deduz pela extensão; nenhuma mudança de infraestrutura, logo nenhum script de CloudShell é necessário) |

## Riscos

| Risco | Efeito | Mitigação |
| :-- | :-- | :-- |
| Publicar o PDF sem consentimento dos coautores | Violação de coautoria | Fase 7b separada e bloqueada por Q-1 |
| Tradução automática de citações | Atribuir aos autores frases que não escreveram | RF-09 + T5.4 |
| Ampliar o resultado de "cinco por cento" | Distorção do estudo | CA-10 + T6.2 |
| Ler o caso de 2004 como presente | Informação falsa sobre empresa real | Aviso de contexto, regra §3.2.7, T6.2 |
| Camada C virar catálogo de tecnologia | Perda de foco | Seleção fechada C-01 a C-09; excluídos registrados na matriz |
| Extensão do gerador de JSON-LD afetar outras páginas | Regressão de SEO | T3.5 compara o build das demais páginas |

## Reversão

A página é aditiva. Reverter = reverter o PR da página (remove HTML, CSS, `.md`, entrada em
`pages.mjs`, registros de RF-13 e o espelho `/en/` regenerado). O PDF, se publicado, sai com o
mesmo revert; o original continua preservado na pasta do projeto.
