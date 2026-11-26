---
id: prototipo-nova-home
titulo: Protótipo local da nova home "O pensamento em prática"
data: 2026-11-26
leitor: Issei e quem implementar a home a partir do SDD
padrao_de_redacao: ptbr-controlado (perfil Técnico)
---

# Protótipo local da nova home

## O que é

Este é o protótipo da nova página inicial descrita no
[SDD da nova home](../SDD-nova-home.md). Ele serve para validar a rolagem, as
passagens entre as cenas e a navegação antes de implementar a página de
verdade. **Não é a página final.**

- **Estado:** revisão 7, a clareza para a primeira visita
  ([SDD, §13](../SDD-nova-home.md)). A revisão 6 está no commit `01de3fd8`
  desta pasta, que copia o commit local `f23794b9` da branch `local/nova-home`.
- **Tecnologia:** só HTML e CSS. As animações usam CSS ligado à rolagem
  (`animation-timeline`). Não há JavaScript de animação nem de conteúdo. O
  único `<script>` da página vem do cabeçalho do site.
- **Por que fica em `docs/` e não em `src/`:** o Vite publica todo `.html` de
  `src/`. Um merge na `main` não pode levar o protótipo para produção.

## O que a revisão 7 mudou

- **Abertura:** a frase-mestra agora é "Da incerteza à especificação. Da
  especificação à produção.", com o subtítulo "Engenharia de software,
  arquitetura em produção e agentes de IA.". O retrato aparece uma vez na S01.
- **S01 com 5 cenas, em 300vh** no computador e no celular:

  | Cena | Faixa | Em M1 | Ouro |
  | :-- | :-- | :-- | :-- |
  | 01 | 0–12 % | Retrato | O fio ao lado do nome |
  | 02 | 12–41 % | A pergunta em três partes; depois as partes somem e fica a síntese | O sublinhado da síntese |
  | 03 | 41–62 % | O diagrama do Agent Ready; depois, no canto, a saída do `npm run gate` | Nenhum |
  | 04 | 62–82 % | A noite cai; os estados de um incidente, em texto | O divisor que racha e é reparado |
  | 05 | 82–100 % | Os títulos dos dez princípios de `/engenharia-agentes-ia.html`; a moldura viaja até o retrato da S02 | Nenhum |

  As faixas são porcentagens da rolagem útil da S01: a altura menos uma tela
  e menos os 30vh em que a S02 entra por cima.
- **Interface:** saíram os 12 símbolos e os 9 pontos. O menu "Sessões" ganhou
  uma barra fina de progresso, em grafite, sob "Apresentação".
- **Sessões 02–04:** os marcos têm a mesma forma ("1997: Curso técnico…"), e
  "2024–hoje" ganhou destaque leve, sem ouro. A mesa de ideias usa recortes
  legíveis. Cada projeto tem uma linha de tese, e o cartão inteiro é o link. A
  cantoneira dourada só aparece no ponteiro ou no foco. O CTA final aponta para
  `/catalogo.html#projetos`, uma âncora que o catálogo ainda não tem (D-H3).
- **Correções:** nenhuma cor literal fora do `:root`. O CSS da faixa "Por que
  falhou?" saiu. As sessões aceitam clique a partir de 55 % da dissolução.
  Quando o foco está nos caminhos da abertura, as cenas saem da frente. O
  rodapé ganhou uma frase de convite. `translate="no"` fica só no nome
  (`.sh-marca`).
- **Nenhuma imagem gerada por IA**, nem no protótipo. As variantes
  `data-noite="corte"` e `data-ouro="dois"` saíram junto com o que comparavam.

## Arquivos

| Arquivo | O que é |
| :-- | :-- |
| `nova-home.template.html` | A página. É gerada por `scripts/gen.cjs`; não edite à mão. |
| `home.css` | Todo o estilo e todas as animações. As cores ficam só no `:root`. |
| `home-proto/` | Imagens: capturas do próprio site. Só o retrato não é versionado. |
| `scripts/gen.cjs` | Gera o HTML. Copia o cabeçalho do site de `src/index.html`. |
| `scripts/crops.cjs` | Gera os recortes 16:10 das páginas do site (placares, pilares, títulos). Precisa do site rodando. |
| `scripts/val7.cjs` | Faz capturas de cada cena e sessão em 1440×900 e 390×844 e conta os elementos dourados por quadro. Também confere o foco nos caminhos, o modo de movimento reduzido e as cores literais fora do `:root`. |
| `scripts/med7.cjs` | Mede a constância da rolagem: uma captura a cada toque de 40 px, comparada com a anterior. Abaixo de 0,15 conta como toque "morto"; acima de 6, como "brusco". |
| `scripts/trace6.cjs` | Grava um trace do Chromium da primeira rolagem, para achar tarefas longas e decodificação de imagem. As portas estão no próprio script. |

## Como rodar

1. Gere o retrato (próxima seção).
2. Na raiz do repositório, suba o servidor:

   ```powershell
   npx vite docs/specs/pages/portfolio/prototipo --port 5183 --host 127.0.0.1
   ```

3. Abra `http://127.0.0.1:5183/nova-home.template.html`.

O servidor serve só esta pasta, então os links para outras páginas do site
(`/curriculo.html`, `/videos.html` etc.) não abrem.

Os scripts de verificação esperam o servidor na porta 5183. Eles usam o
Playwright e o `sharp` do `node_modules` da raiz e gravam o resultado em
`tmp/`, que não é versionado:

```powershell
node docs/specs/pages/portfolio/prototipo/scripts/val7.cjs
```

```powershell
node docs/specs/pages/portfolio/prototipo/scripts/med7.cjs
```

Para gerar o HTML de novo depois de mudar `scripts/gen.cjs`:

```powershell
node docs/specs/pages/portfolio/prototipo/scripts/gen.cjs
```

Para refazer os recortes, suba o site (`npx vite --port 5184 --host 127.0.0.1`)
e rode:

```powershell
node docs/specs/pages/portfolio/prototipo/scripts/crops.cjs
```

## Imagens

Só o retrato fica fora do repositório (`.gitignore` de `home-proto/`), porque
é uma cópia de `assets-fonte/retrato.jpg`, que já está versionado. O
`.gitignore` também barra os nomes das antigas fotos geradas por IA, para que
não voltem por engano. Para gerar o retrato, rode na raiz do repositório:

```powershell
node -e "require('sharp')('assets-fonte/retrato.jpg').resize(1200,1500).webp({quality:82}).toFile('docs/specs/pages/portfolio/prototipo/home-proto/retrato.webp')"
```

As outras imagens são capturas do próprio site:

| Arquivo | De onde vem | Onde aparece |
| :-- | :-- | :-- |
| `diagrama.webp` | Diagrama das cinco camadas de `/agent-ready` | Cena 03 |
| `estados.webp` | Figura 3 de `/formulacao-de-problemas` | Minhas ideias |
| `estudo.webp` | Título de `/curiosidade-e-investigacao` | Minhas ideias |
| `videos.webp` | Título de `/videos` (sem a miniatura do vídeo em destaque) | Minhas ideias |
| `acessibilidade.webp` | Placar 207 → 0 de `/acessibilidade` | Meus projetos |
| `case-agents.webp` | Métricas do benchmark de `/case-agents` | Meus projetos |
| `agent-ready.webp` | Placar do IsItAgentReady de `/agent-ready` | Meus projetos |
| `boutique.webp` | Os 4 pilares de `/boutique-empresarial-showcase` | Meus projetos |

> [!NOTE]
> A saída do gate na cena 03 é texto real: os nomes das etapas de
> `scripts/quality-gate.mjs` que passaram numa execução de `npm run gate`
> neste repositório. O recorte mostra só etapas que passaram e não mostra
> tempos.
