# SPEC — Página de condução da entrevista sobre acessibilidade em streaming

| Campo | Valor |
| :-- | :-- |
| Arquivo | `src/entrevista-acessibilidade-streaming.html` (+ `.css`, `src/js/entrevista/`) |
| URL | `https://mauricio.issei.com.br/entrevista-acessibilidade-streaming` |
| Fonte do conteúdo | [`roteiro.md`](roteiro.md) (roteiro enviado pelo autor em 24/10/2026, cópia fiel) |
| Pedido | Issei, 24/10/2026: "elabore uma página para realizar a entrevista", considerando o DA11Y.md e o A11Y.md, "totalmente acessível" |
| Perfil de conformidade | WCAG 2.2 AA, perfil **Standard** (`A11Y-DECISIONS.md`) |
| Status | Implementada no PR desta spec; não publicada até o merge |

## 1. Problema e público

O roteiro é um documento para quem **entrevista** (traz "Nota ao entrevistador", "Fala sugerida", "Como registrar"). A página serve a essa pessoa durante a conversa: guia os blocos, registra o que a pessoa entrevistada contar e exporta o registro. A pessoa entrevistada só recebe a **lista simplificada de tópicos** (Anexo), que a página gera como texto simples.

Quem entrevista também pode ser uma pessoa com deficiência, e a página pode ser compartilhada em tela numa chamada de vídeo. Por isso a página inteira segue o A11Y.md, e não só o Anexo.

## 2. Decisões (tomadas pelo agente; o autor pode rever no PR)

| # | Decisão | Motivo |
| :-- | :-- | :-- |
| D-1 | **Página não listada:** `noindex, nofollow`, fora do sitemap, do `catalogo` e do `<eco-nav>`. Mesmo padrão da `/proposta`. | É uma ferramenta de trabalho, não conteúdo para busca. |
| D-2 | **Sem gêmeo `/en/`** (`HTML_NAO_PUBLICAS` em `scripts/i18n/assets.py`). | As entrevistas são em português, no Brasil. Também evita depender do Argos, que não roda na nuvem. |
| D-3 | **Sem analítica e sem banner de cookies.** Não carrega GTM, Clarity nem `cookie-consent.js`. | A página recebe dados sensíveis de entrevista. Sem analítica, não há o que consentir. |
| D-4 | **Dados só no navegador.** `localStorage` (chave `entrevista-streaming:v1`) e arquivos que a pessoa baixa. Nenhuma requisição leva o que foi digitado (teste dedicado). | Dados de saúde/deficiência e opinião de fonte jornalística: LGPD e sigilo de fonte. |
| D-5 | **Salvamento automático ligado por padrão**, com caixa para desligar. Desligar apaga o que estava gravado. | Perder anotações no meio da entrevista é o risco maior; quem usa aparelho compartilhado desliga. A página recomenda aparelho próprio, exportar e apagar. |
| D-6 | **Página única com âncoras, não um assistente em etapas.** | O roteiro diz "não é preciso seguir a ordem". Página única não exige lembrar nada entre telas (SC 3.3.7/3.3.8 n/a) e funciona com a busca do navegador. |
| D-7 | **Episódios dentro de cada eixo** (A–E), com o campo "Origem do impedimento" em todos os eixos e destacado nas notas de B e C. Nenhuma opção vem marcada. | O roteiro pede o campo para B e C; registrar nos outros eixos não custa e evita perder um caso. Opção pré-marcada sugeriria a causa, o que o roteiro proíbe. |
| D-8 | **Identificador da entrevista em vez do nome real.** O nome usado no cumprimento do Anexo não é salvo. | Minimiza dado pessoal no aparelho. |
| D-9 | **Cronômetro opcional**, parado até a pessoa iniciar, com Pausar e Zerar. Avisa por `role="status"` aos 35 e aos 60 minutos. | Pausas formais do roteiro. Atualização automática tem controle de pausa (SC 2.2.2). |

## 3. Estrutura (ordem de leitura e de foco)

Ordem do DOM = ordem visual = ordem do roteiro. Um `<h1>`; blocos em `<h2>`; eixos em `<h3>`; subtítulos em `<h4>`.

1. Skip link → `<main id="conteudo">`
2. `#inicio`: H1, uso e duração, aviso "Fadiga e carga cognitiva", índice (`<nav>` rotulado pelo H2 "Blocos do roteiro")
3. `#privacidade`: onde ficam os dados, caixa "Salvar automaticamente", estado do salvamento, cronômetro (grupo rotulado)
4. `#abertura` (Bloco 1): fala sugerida (`<blockquote>`), envio prévio, grupo "Registro da abertura"
5. `#contexto` (Bloco 2): perguntas (checkbox "já fiz"), aprofundamento, nota, "Termos que a pessoa usa", anotações
6. `#principal` (Bloco 3): regra "Ao registrar"; eixos A–E, cada um com perguntas, aprofundamento, nota, episódios, anotações
7. `#barreiras` (Bloco 4): seis grupos de perguntas, nota, anotações
8. `#final` (Bloco 5): perguntas, anotações, roteiro de encerramento, grupo "Registro da autorização"
9. `#orientacoes` (Seção 6): quatro `<details>`
10. `#topicos` (Anexo): nome no cumprimento, texto, Copiar, Baixar
11. `#exportar`: exportar `.md` e `.json`, importar `.json`, apagar
12. Rodapé

## 4. Componentes e papéis (leitura proposta para o leitor de tela)

| Elemento | Papel e nome | Estado e teclado |
| :-- | :-- | :-- |
| Pergunta do roteiro | caixa de seleção; nome = texto da pergunta; grupo = legenda "Perguntas principais (marque as que você já fez)" | Espaço marca; marcada também muda a borda e o tom do texto (não só cor: o próprio controle mostra o visto) |
| Opções de registro | grupo de botões de opção (`fieldset`/`legend`) | Setas movem e selecionam; nenhuma pré-marcada |
| Episódio | grupo "Eixo B, episódio 2" (`fieldset`/`legend`), com subgrupos "Origem do impedimento", "Relato direto", "Interpretações", "Lacunas" | Adicionar: foco vai ao campo "Aparelho" e o status anuncia "Eixo B, episódio 2 adicionado." Remover: diálogo de confirmação; ao confirmar, foco volta a "Adicionar episódio ao Eixo B" e as legendas são renumeradas |
| Diálogo de confirmação | diálogo modal (`<dialog>` + `showModal()`), nome no título, descrição no texto | Foco inicial no título; Esc, Cancelar ou clique no fundo fecham e devolvem o foco ao gatilho (padrão do `A11Y-DECISIONS.md`) |
| Cronômetro | grupo "Cronômetro da entrevista"; tempo em texto, **fora** de região viva | Iniciar → foco em Pausar; Pausar → foco em Iniciar/Retomar; botão indisponível usa `disabled` nativo e borda tracejada |
| Anúncios | uma região `role="status"` (`#anuncio`) | Adicionar, remover, copiar, baixar, importar, apagar, marcos de 35 e 60 min. Salvamento automático **não** é anunciado (seria ruído a cada tecla); aparece em texto visível |
| Erro de importação | texto visível "Erro: …" ligado ao campo por `aria-describedby`, `aria-invalid="true"`, foco volta ao campo | A mensagem diz a saída ("Exporte de novo pela página atual") |
| Orientações | `<details>`/`<summary>` | Enter/Espaço abrem e fecham |

## 5. Dados

Formato (versão 1), definido em `src/js/entrevista/modelo.js`:

```json
{ "versao": 1, "atualizadoEm": "ISO-8601",
  "campos": { "<name do controle>": "texto" | true | false },
  "episodios": [ { "id": "1", "eixo": "A–E", "origem": "ausencia|interacao|indefinido|sem-impedimento|",
                   "aparelho": "", "servico": "", "recurso": "", "controle": "", "quando": "", "versao": "",
                   "sequencia": "", "resultado": "", "palavras": "", "tempo": "",
                   "interpretacaoPessoa": "", "interpretacaoEntrevistador": "", "lacunas": "" } ],
  "cronometro": { "acumuladoMs": 0, "iniciadoEm": null } }
```

- A importação descarta chave fora de `^[a-z0-9-]{1,64}$`, valor que não seja texto ou booleano, eixo desconhecido e origem fora da lista. Nada importado vira HTML (só `textContent`/`value`).
- Um cronômetro importado volta parado.
- O `.md` exportado lista só o que foi preenchido, com os rótulos visíveis da tela, e os episódios por eixo com a origem.

## 6. Requisitos de acessibilidade (A11Y.md 2.2.0, perfil Standard)

1. Todo campo tem `<label>` visível fora do campo; formato de data visível antes do campo ("Formato: DD/MM/AAAA"). Nenhum placeholder.
2. Alvos: botões, rótulos de opção, linhas de pergunta, `summary` e campos com ≥ 44 px de altura (teste).
3. Foco: anel de 2 px `#58a6ff` do plugin `a11y-focus-base` (7,49:1 sobre o fundo). Nenhum `outline: none`.
4. Sem JavaScript: o roteiro inteiro e os campos aparecem; o aviso em `<noscript>` diz que nada será salvo; os controles que dependem de script (episódios, cronômetro, exportar) ficam ocultos (`html:not(.js) .et-js`).
5. Movimento: só o deslocamento de 1 px no hover dos botões; zerado sob `prefers-reduced-motion`, que também desliga a rolagem suave.
6. Reflow: sem rolagem horizontal a 320 px, inclusive com episódio aberto (teste).
7. Texto corrido limitado a 72ch, entrelinha 1,5–1,6, alinhado à esquerda.
8. Nenhum hexadecimal no HTML além do `theme-color`; cores só no CSS da página (teste).

## 7. Contraste (calculado com `tools/a11y/contrast-check.py`)

| Par | Frente | Fundo | Razão | Piso |
| :-- | :-- | :-- | --: | --: |
| texto | `#e6edf3` | `#0d1117` | 16,02:1 | 4,5:1 |
| texto em card | `#e6edf3` | `#161b22` | 14,64:1 | 4,5:1 |
| título | `#ffffff` | `#161b22` | 17,30:1 | 4,5:1 |
| texto de apoio | `#9da7b3` | `#0d1117` | 7,76:1 | 4,5:1 |
| texto de apoio em card | `#9da7b3` | `#161b22` | 7,09:1 | 4,5:1 |
| link e borda de botão | `#58a6ff` | `#161b22` | 6,85:1 | 4,5:1 |
| botão primário | `#0d1117` | `#58a6ff` | 7,49:1 | 4,5:1 |
| botão de perigo e erro | `#ff7b72` | `#161b22` | 6,86:1 | 4,5:1 |
| título de aviso | `#f0b44c` | `#161b22` | 9,34:1 | 4,5:1 |
| borda de campo (componente) | `#8b949e` | `#161b22` | 5,62:1 | 3:1 |
| borda de campo (componente) | `#8b949e` | `#0d1117` | 6,15:1 | 3:1 |

`#30363d` aparece só como divisória decorativa, nunca como borda de controle.

## 8. Testes

- `tests/entrevista-acessibilidade-streaming.spec.js` (Chromium): estrutura, não listada e sem terceiros, nenhuma requisição com o texto digitado, salvar/recuperar, desligar o salvamento, episódio (foco, origem sem pré-seleção, diálogo, renumeração), cronômetro com relógio simulado (aviso dos 35 min), lista de tópicos, exportar `.md`/`.json` e reimportar, erro de importação, axe sem serious/critical (página, episódio aberto, diálogo), alvos ≥ 44 px, 320 px.
- `tests/entrevista.nojs.spec.js` (projeto `no-js`).
- `tests/entrevista.model.test.mjs` (`node:test`): eixos e origens iguais ao roteiro, campos de "Como registrar", validação da importação, cronômetro, Anexo idêntico ao roteiro e ao texto estático do HTML, todas as perguntas numeradas do roteiro presentes na página, relatório Markdown.

## 9. Fora do escopo e pendências

- **Leitor de tela real:** não testado (nenhum par leitor + navegador). Quem deve: pessoa com leitor de tela, antes do uso em entrevista real. Roteiro mínimo: Tab da página inteira; adicionar e remover episódio; ouvir o aviso dos 35 min; importar um arquivo inválido.
- **Verificação independente:** self-reported ⚠️; status no máximo CONDICIONAL.
- **Gravação de áudio/vídeo:** fica fora da página (a página só registra o consentimento e a marcação de tempo).
- **Várias entrevistas no mesmo navegador:** uma por vez; para a próxima, exporte e apague.
