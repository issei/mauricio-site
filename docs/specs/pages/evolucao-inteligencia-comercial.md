# Spec — Evolução Sistêmica da Inteligência Comercial

> **Status:** especificação. Nenhum código escrito.
> **Origem:** ideia elaborada em conversa externa (proposta executiva + metaprompt de landing page), analisada em 2026-10-09.
> **Decisões do dono (2026-10-09):** página **não listada**; nomes internos **genéricos**;
> **substitui `src/proposta.html` e assume a URL `/proposta`** (D-4).

---

## 0. Análise da ideia

**O que é:** uma landing page pessoal que apresenta à liderança comercial e ao CIO uma proposta de
evolução da plataforma comercial. Dados de prospects, regras de negócio e o fluxo do comercial
passam a ser conectados para reduzir o tempo de pesquisa e de preparação de propostas.

**Pontos fortes (manter):**
- O pedido é pequeno e defensável: patrocínio para um diagnóstico, não aprovação de arquitetura ou de ML.
- A ideia separa fato, hipótese e resultado esperado, e não inventa números.
- Tem uma métrica primária clara: o tempo mediano para reunir o contexto de um prospect.
- Diz explicitamente que não vai duplicar regras de negócio nem criar uma "plataforma de IA". É esse o argumento que convence um CIO.

**Problemas (corrigidos nesta spec):**
| # | Problema | Correção |
| :-- | :-- | :-- |
| A1 | São 9 seções. Contexto, oportunidade e experiência se repetem, e o próprio metaprompt avisa da redundância | Consolidar em **7 seções** (§3) |
| A2 | O pedido só aparece no fim, mas executivo lê o topo | O pedido entra no hero, e o fim vira o detalhamento |
| A3 | Como quase tudo é hipótese, o texto corre o risco de soar vago | O piloto concreto (linha de base → piloto → comparação → critério de decisão) é a âncora de credibilidade |
| A4 | Assunto interno do empregador publicado num site público, com AEO, `/en/` e `llms.txt` | Página não listada, com termos genéricos e uma guarda automática (§2 e §5) |
| A5 | O nome da plataforma interna, "credenciamento", "superintendente" e a lista de capacidades internas identificam o empregador | Vocabulário genérico obrigatório (§5.1) |

---

## 1. Informações básicas

| Campo | Valor |
| :-- | :-- |
| Arquivo | `src/proposta.html` + `src/proposta.css`, com o **conteúdo inteiramente substituído** (§9) |
| URL | `mauricio.issei.com.br/proposta` (circula só por link direto) |
| Title | `Inteligência comercial orientada por contexto` (sem o nome do autor: o domínio já identifica) |
| Description | `Proposta de diagnóstico para conectar dados, regras de negócio e o fluxo comercial, com piloto mensurável antes de qualquer investimento maior.` (≤160) |
| Público | Liderança comercial e CIO/liderança de tecnologia. Uma narrativa única, sem duas propostas |
| Tom | Engenharia, não marketing. Sem frases de efeito de IA. O jargão é explicado na primeira ocorrência |

## 2. Visibilidade: página não listada

Só acessa quem recebe o link. Nada no site aponta para ela. Como `/proposta` já é pública e
indexada, a não listagem exige **desmontar** o que existe, não só deixar de cadastrar.

| Superfície | Ação |
| :-- | :-- |
| `<meta name="robots">` | `noindex, nofollow`. É o primeiro uso no repositório, então precisa de teste próprio |
| `robots.txt` | **Não** listar. O `Disallow` impediria o Google de ler o `noindex` e manteria a URL indexada |
| Sitemap | Incluir `/proposta` em `exclude` de `vite.config.js` |
| Gêmeo `/en/` | Incluir `proposta` em `HTML_NAO_PUBLICAS` (`scripts/i18n/assets.py`); **apagar** `src/en/proposta.html`, `public/en/proposta.md` e as entradas de `scripts/i18n/i18n-manifest.json` |
| Auditoria | Incluir `proposta` em `NAO_PUBLICAS` de `scripts/audit-site.mjs` |
| AEO | **Remover** o bloco `slug: 'proposta'` e a linha do catálogo em `scripts/seo/pages.mjs`; **apagar** `public/proposta.md` e `public/og-proposta.png` (o OG atual exibe "SFDC" e "AWS") |
| `llms.txt` / `llms-full.txt` | Remover a linha `proposta.md` |
| Catálogo | Remover o cartão de `src/catalogo.html` (e regenerar `public/catalogo.md`) |
| Ecossistema | Remover o nó `proposta.html` de `specs/ecosystem.nav.yaml` (bump de `meta.version`) e a linha N12 de `specs/RESEARCH_MAPPING.md` |
| Links internos | Remover o item de hub `./proposta.html` em `src/apresentacao.html` |
| Docs | Atualizar `README.md` (árvore) e os exemplos `src/proposta.html` em `scripts/i18n/README.md` e `.claude/skills/sync-i18n/SKILL.md` |
| Imagem externa | Remover a referência a `static/images/arq-proposta.png` |
| OG da nova | Só `og:title`/`og:description` (preview no chat corporativo), **sem imagem** |
| Canonical | Auto-referente (`/proposta`) |
| Google (manual, dono) | Após o deploy, pedir a remoção da URL no Search Console para acelerar a saída do índice e do snippet antigo |

**Risco aceito pelo dono:** quem tiver o link antigo, ou o resultado ainda no índice antes do
recrawl, cai na proposta nova.

**Limite da genericidade:** `cv.json` e `star.json` são públicos e descrevem o domínio do
empregador. Quem cruzar as fontes deduz o contexto. A proteção real é a não listagem; os termos
genéricos evitam a identificação explícita.

**Verificar na implementação:** os plugins `hreflangPt()` e `webmcp()` do `vite.config.js` não podem
injetar `hreflang`/`/en/` nem anunciar a página.

## 3. Narrativa (7 seções)

Uma mensagem por seção. Os títulos expressam conclusões. O texto final é escrito na fase 1 da
implementação, a partir deste roteiro.

| # | Seção | Objetivo narrativo | Conteúdo-chave | Visual conceitual |
| :-- | :-- | :-- | :-- | :-- |
| 1 | **Hero: o problema e o pedido** | O executivo entende a dor e o que se pede em 10 s | Título curto sobre o esforço de reunir contexto; subtítulo com a tese; **pedido em uma linha** (diagnóstico conjunto + piloto mensurável) | Nenhum |
| 2 | **Onde o esforço acontece** (une as seções 2 e 3 do original) | Reconhecer o problema antes da solução | O que já existe (base de prospects, filtros dinâmicos, priorização, roteiro e tarefas, regras de validação, elegibilidade, risco e produto) e as 3 dimensões do atrito: dados dispersos, regras difíceis de interpretar, informação fora do fluxo | Três colunas: dimensão → efeito no comercial |
| 3 | **A proposta: contexto no fluxo** (une as seções 4 e 5 do original) | Mostrar a mudança sem prometer funcionalidade | Hoje → direção proposta → efeito esperado (*a validar no piloto*). A relação prospect + regras + oportunidade → abordagem. Preserva fontes oficiais e quem é dono das regras | Comparativo "hoje / direção" + diagrama de conexão |
| 4 | **Evolução em etapas, não em cronograma** | Mostrar a visão de longo prazo sem comprometer entrega | 1 Integrar o contexto → 2 Apoiar a atuação → 3 Inteligência baseada em dados. Cada passagem depende de resultado comprovado. A etapa 3 depende da qualidade dos dados | Trilha de 3 etapas com "portões" entre elas |
| 5 | **Como provar valor** | Mostrar que a validação faz parte da proposta e não é burocracia | Linha de base → piloto delimitado → comparação. Métrica primária: tempo mediano para reunir o contexto. Complementares: consultas por caso, tempo de preparação, completude do contexto, adoção. A conversão só entra depois, e sem atribuição presumida | Tabela de indicadores (sem metas numéricas) |
| 6 | **Princípios** | Dar ao CIO motivos para confiar | Reutilizar antes de construir; não duplicar regras; fontes oficiais decidem; qualidade e acesso como pré-condição; validar antes de expandir; IA/ML só com justificativa demonstrada | Lista curta (≤6 itens) |
| 7 | **Próximo passo** | Encerrar com um pedido concreto | Os 3 pedidos: patrocinar o diagnóstico (Comercial + Tecnologia + donos das regras), ceder usuários e um fluxo real, autorizar a definição do piloto. Entregáveis do diagnóstico: mapa de fontes e regras, fluxo prioritário, escopo do piloto, critérios de decisão | **Sem botão nem link de contato** (D-1): o pedido termina em texto |

**Proibido no conteúdo:** métricas, percentuais, ROI, prazos, depoimentos, histórias de usuário,
incidentes inventados, nomes de ferramentas ou arquitetura, e "IA" como argumento de autoridade.
Cenário ilustrativo só com o rótulo *hipotético*.

### 3.1 Inventário epistêmico (não vai para a página)

| Fatos relatados | Hipóteses a validar | A verificar no diagnóstico |
| :-- | :-- | :-- |
| Existe base de prospects; filtros dinâmicos são bem avaliados; existe priorização, roteiro e tarefas; há equipe de visitas em campo, e priorizar o roteiro (potencial × deslocamento) é dor real; existem regras de validação, elegibilidade, risco e produto; atritos nas 3 dimensões; dor prioritária = tempo de pesquisa e preparação | Integração reduz tempo e consultas; reduz divergências; habilita recomendação por dados | Fontes e donos; chave confiável do prospect; regras consultáveis por sistema; atualidade e qualidade; perfis de acesso; APIs reutilizáveis; capacidade da plataforma de incorporar contexto |

Esta tabela é a lista de checagem da revisão: nenhuma frase da página pode exceder a coluna 1 sem
o rótulo de hipótese.

## 4. Layout e estilo

- Dark Tech padrão (`#0d1117`, acentos `#007bff`→`#8a2be2`, Inter). Não precisa de exceção de paleta.
- Header minimalista, sem nome do autor e sem menu de navegação do site. Footer simples: nome (D-3) e ano.
- Leitura executiva: coluna de texto estreita, seções curtas, sem animação além do hover padrão.
- Visuais só em CSS e SVG inline. Nenhuma imagem raster. Nenhum JS de página.
- Precisa funcionar em celular, porque o link tende a ser aberto no chat corporativo.

## 5. Confidencialidade

### 5.1 Vocabulário obrigatório

| Não usar | Usar |
| :-- | :-- |
| Nome da plataforma comercial interna | "a plataforma comercial" |
| Credenciamento / abertura de conta | "entrada e habilitação de clientes" |
| Superintendente / cargos nominais | "liderança comercial", "liderança de tecnologia" |
| Nome do empregador, áreas, sistemas, números | (omitir) |
| Nome de pessoas | (omitir). Só o nome do autor é permitido |
| As palavras "banco" e "rede", **em qualquer sentido** | "instituição", "base de dados", "conexão", "malha" |

O veto das duas palavras em qualquer sentido mantém a guarda simples: ela não precisa distinguir
"banco de dados" de uma instituição, nem "rede" de uma marca.

Também é proibido o enquadramento que permita deduzir o empregador combinando setor, porte e
produto, e qualquer ligação explícita com os empregadores listados no `cv.json`.

### 5.2 Guarda automática

Criar `tests/proposta.legal.test.mjs` no mesmo padrão de
`tests/digital-workplace.legal.test.mjs`: termos em base64 e varredura de `src/proposta.html`,
`src/proposta.css` e `tests/proposta.spec.js`. Esta spec fica **fora** da varredura, porque cita
as duas palavras genéricas para descrever a regra. Os nomes próprios vetados também não aparecem nela.

**Termos (D-2, fornecidos pelo dono em 2026-10-09).** Esta restrição vale **só para esta página**;
o resto do site, inclusive o CV, não muda.
- As palavras genéricas "banco" e "rede" (case-insensitive, com limite de palavra).
- O nome da instituição, o nome da marca de adquirência e o nome antigo dela, além do nome da
  plataforma comercial interna. Ficam **só em base64 no teste**, nunca em texto puro no repositório,
  inclusive nesta spec.

Nomes de pessoas não são detectáveis por regex. A revisão humana confere que o único nome próprio de
pessoa é o do autor, e também as pistas indiretas.

## 6. Testes e aceite

- [ ] `tests/proposta.spec.js` (Playwright): carrega; H1 único; 7 seções em ordem; `meta robots` = `noindex, nofollow`; ausência de `hreflang`/link `/en/`; ausência de JSON-LD.
- [ ] O build não gera `/proposta` no `sitemap.xml` nem `src/en/proposta.html`; nenhum `src/*.html` linka `proposta.html`.
- [ ] Os testes que usam `/proposta` como página-exemplo trocam de alvo: `tests/i18n.test.mjs` (rota com espelho) e `tests/a11y/reflow-zoom.spec.js`. O `tests/a11y/tasks.spec.js` é revisto para o conteúdo novo. Em `tests/a11y/baseline.json`, remover `en/proposta.html` e zerar `proposta.html` (a catraca só desce).
- [ ] Guarda legal verde.
- [ ] Catraca a11y (WCAG 2.2 AA) sem regressão. A página é estática: hierarquia de headings, contraste, foco visível e SVG com `<title>`/`aria-hidden` conforme o papel.
- [ ] `tone-reviewer` sem apontamentos de hype.
- [ ] Revisão do dono: nenhuma frase excede o inventário §3.1 e não há pistas indiretas (§5.1).
- [ ] `npm run gate` verde.

## 7. Plano

1. **Texto:** escrever a copy final das 7 seções a partir do §3. O dono revisa antes de qualquer HTML.
2. **Página:** reescrever `src/proposta.html` + `src/proposta.css` do zero, com base estrutural em `src/service-operations-2-0.html`.
3. **Desmontagem e não listagem:** todas as linhas do §2, no **mesmo PR** da página nova. Nunca publicar a página nova com AEO, catálogo ou `/en/` ainda ativos.
4. **Guarda e testes:** §5.2 e §6.

## 8. Pendências do dono

| ID | Decisão |
| :-- | :-- |
| ~~D-1~~ | **Decidido:** sem botão, só o texto do pedido |
| ~~D-2~~ | **Decidido:** veto a "banco", "rede", nomes da instituição e da adquirência e nomes de pessoas, só nesta página (§5) |
| ~~D-3~~ | **Decidido:** assinatura com o nome do autor |
| ~~D-4~~ | **Decidido (2026-10-09):** a nova página substitui `src/proposta.html` e assume `/proposta` (§2) |
| D-5 | **Tarefa do dono, aberta e sem prioridade:** pedir a remoção da URL `/proposta` no Google Search Console após o deploy (§2). Não bloqueia o merge |

**Fora do escopo** (adicionar se pedirem): versão para impressão/PDF, versão em inglês, analytics de acesso.

## 9. Relação com `src/proposta.html` (página antiga, pública)

A página antiga ("Inteligência de Vendas em Tempo Real — Salesforce + AWS") trata da mesma área,
mas pelo lado oposto: **começa pela solução**. Ela serve de referência do que **não** fazer, e
algumas ideias dela são aproveitáveis.

**Anti-padrões (proibidos nesta página):**
| Na página antiga | Por que falha aqui |
| :-- | :-- |
| Abre com arquitetura (EventBridge, Lambda, S3, Bedrock) e fornecedores | O CIO recebe uma arquitetura prematura, e a nova tese adia essa decisão para o diagnóstico |
| O problema é custo computacional de eventos ("ruído × sinal") | A dor real é o **esforço do comercial** para pesquisar e preparar a abordagem |
| "Revolucionando", "sussurros em um show de rock", "não fervemos o oceano", "lógica do entregador da Amazon" | Floreio de marketing e de IA, contra o tom da casa |
| "Reduzindo custos drasticamente", "mais conversão", "Oportunidade > 500k" | Ganhos e números sem evidência |
| Exemplo da "Rua Augusta" e regras criadas automaticamente por LLM | Cenário inventado sem rótulo de hipotético; IA como argumento |
| Nenhuma regra de negócio, governança, linha de base ou pedido | Faltam justamente os pilares da nova proposta |
| Podcast gerado por IA, "© 2024 Solução Enterprise" | Autoria e data inconsistentes |

**Ideias reaproveitáveis, reenquadradas como hipóteses das etapas 2 e 3 (§3, seção 4):**
- *Priorizar pelo custo de atender*, não só pelo potencial (potencial × deslocamento) → etapa 2, apoiar a priorização.
- *O comercial alimenta o sistema* (o motivo de uma recusa vira dado) → etapa 3, aprender com uso e resultado.
- *Sinal, não tudo* → princípio do **contexto mínimo**: entregar ao fluxo só o que aquela atividade precisa, sem centralizar tudo.
- *Texto livre do vendedor interpretado por LLM* → só como exemplo de "IA com justificativa demonstrada", rotulado hipotético.

**Destino (D-4, decidido):** o conteúdo antigo sai por completo. Não fica arquivado no site nem
migra para outra URL. A remoção está detalhada no §2. Roteirização e priorização de visitas
**entram** na página nova (dono, 2026-10-09: dor real da equipe de campo), mas sem citar
fornecedores nem arquitetura.
