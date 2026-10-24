# SPEC — Entrevista por escrito sobre acessibilidade em streaming

| Campo | Valor |
| :-- | :-- |
| Arquivo | `src/entrevista-acessibilidade-streaming.html` (+ `.css`, `src/js/entrevista/`) |
| URL | `https://mauricio.issei.com.br/entrevista-acessibilidade-streaming` |
| Fonte do conteúdo | [`roteiro.md`](roteiro.md) (roteiro enviado pelo autor em 24/10/2026, cópia fiel) |
| Pedido | Issei, 24/10/2026: "elabore uma página para realizar a entrevista", considerando o DA11Y.md e o A11Y.md, "totalmente acessível" |
| Público | **A pessoa entrevistada** (Issei, 24/10/2026: "O público da página é o entrevistado") |
| Modo de uso | **A pessoa responde sozinha, por escrito** (escolha de Issei em 24/10/2026) |
| Perfil de conformidade | WCAG 2.2 AA, perfil **Standard** (`A11Y-DECISIONS.md`) |
| Status | Implementada no PR desta spec; não publicada até o merge |

## 1. Problema e público

O roteiro foi escrito para quem entrevista. Esta página o transforma numa **entrevista por escrito**: a pessoa entrevistada lê as perguntas, responde no próprio ritmo, salva, volta outro dia, baixa um arquivo com as respostas e o envia a quem a convidou, pelo canal que preferir.

Quem responde pode usar leitor de tela, ampliação, teclado, voz ou toque, e pode sentir fadiga visual, auditiva ou cognitiva. Por isso a página inteira segue o A11Y.md e é escrita em PT-BR controlado, em segunda pessoa ("você").

### O que muda em relação ao roteiro

| Roteiro (para quem entrevista) | Página (para quem responde) |
| :-- | :-- |
| Fala de abertura e combinados | Texto de boas-vindas e combinados, em segunda pessoa |
| "Pode me contar…", "Conte-me…" | "Conte…" (a pergunta não muda de sentido) |
| Perguntas de aprofundamento com "[o que a pessoa descreveu]" | Lista "Se ajudar, conte também" no início de cada parte, sem colchetes |
| Notas ao entrevistador, Orientações (seção 6), regra "Ao registrar" | Fora da página: são instruções para quem entrevista |
| Origem do impedimento (ausência × interação) | Fora da página: é a interpretação de quem entrevista, e o roteiro proíbe sugerir a causa |
| Episódio registrado por quem entrevista | "Situação" opcional que a própria pessoa detalha, com os campos do relato direto |
| Cronômetro e pausas aos 35 e 60 min | Fora da página. O texto diz que a pessoa pode parar e voltar quando quiser |
| Anexo (lista de tópicos para envio prévio) | Vira o índice "Partes da entrevista" |
| Bloco 4 (barreiras pouco evidentes) | Parte 7, **opcional**, em seis blocos recolhidos |
| Autorização pedida de viva voz | Parte 9, em campos de opção, gravada no arquivo com a data da exportação |

## 2. Decisões (tomadas pelo agente; o autor pode rever no PR)

| # | Decisão | Motivo |
| :-- | :-- | :-- |
| D-1 | **Página não listada:** `noindex, nofollow`, fora do sitemap, do `catalogo` e do `<eco-nav>`. Mesmo padrão da `/proposta`. | Quem chega é quem recebeu o convite. A página não é conteúdo para busca. |
| D-2 | **Sem gêmeo `/en/`** (`HTML_NAO_PUBLICAS` em `scripts/i18n/assets.py`). | As entrevistas são em português, no Brasil. |
| D-3 | **Sem analítica e sem banner de cookies.** Não carrega GTM, Clarity nem `cookie-consent.js`. | A página recebe dados sensíveis. Sem analítica, não há o que consentir. |
| D-4 | **Respostas só no navegador.** `localStorage` (chave `entrevista-streaming:v1`) e arquivos que a pessoa baixa. Nenhuma requisição leva o que foi digitado (teste dedicado). A página **não envia** as respostas: a pessoa baixa o arquivo e o manda pelo canal combinado. | Dados de saúde e deficiência, e sigilo de fonte. Não existe servidor para guardar respostas, e criar um traria risco e custo sem pedido. |
| D-5 | **Salvamento automático ligado por padrão**, com caixa para desligar. Desligar apaga o que estava gravado. | Perder respostas longas é o maior risco para quem responde em partes. Quem usa aparelho compartilhado desliga. |
| D-6 | **Página única com âncoras, não um assistente em etapas.** | A pessoa pode responder em qualquer ordem e pular partes. Não exige lembrar nada entre telas (SC 3.3.7/3.3.8 n/a) e funciona com a busca do navegador. |
| D-7 | **Nenhum campo obrigatório.** Nenhuma opção vem marcada. | O roteiro garante que a pessoa pode pular qualquer pergunta. Opção pré-marcada decidiria pela pessoa (em especial na autorização). |
| D-8 | **Arquivo de leitura em texto simples (`.txt`)**, sem símbolos de Markdown, além do `.json` para continuar em outro aparelho. Botão para copiar as respostas e colar numa mensagem. | Texto simples abre em qualquer aparelho e é lido sem ruído pelo leitor de tela (mesmo princípio do Anexo do roteiro). |
| D-9 | **Situações detalhadas dentro das Partes 2 a 6**, opcionais, com os campos do relato direto da seção 6 do roteiro. | O roteiro pede episódios concretos. Os campos ajudam a pessoa a lembrar o que importa (aparelho, passos, resultado), sem pedir interpretação de causa. |
| D-10 | **Parte 7 recolhida em `<details>`**; um bloco com resposta salva abre sozinho ao carregar. | Reduz a carga de quem já respondeu muito. Resposta salva nunca fica escondida. |

## 3. Estrutura (ordem de leitura e de foco)

Ordem do DOM = ordem visual. Um `<h1>`; partes em `<h2>`; blocos internos em `<h3>`.

1. Skip link → `<main id="conteudo">`
2. `#inicio`: H1, boas-vindas, combinados, índice (`<nav>` rotulado pelo H2 "Partes da entrevista")
3. `#privacidade`: onde ficam as respostas, aviso `<noscript>`, caixa "Salvar automaticamente", estado do salvamento
4. `#antes`: nome para identificar as respostas, adaptações ou outro formato, dúvidas
5. `#rotina` (Parte 1, Bloco 2 do roteiro): seis perguntas, duas extras, como a pessoa se descreve
6. `#escolha`, `#comecar`, `#controle`, `#continuidade`, `#contornos` (Partes 2 a 6, Eixos A a E): "Se ajudar, conte também", cinco perguntas, situações
7. `#extras` (Parte 7, Bloco 4): seis `<details>` com as perguntas
8. `#final` (Parte 8, Bloco 5): cinco perguntas
9. `#autorizacao` (Parte 9): uso de trechos, identificação, restrições, revisão
10. `#enviar`: baixar `.txt`, copiar, continuar em outro aparelho (`.json`), apagar
11. Rodapé

## 4. Componentes e papéis (leitura proposta para o leitor de tela)

| Elemento | Papel e nome | Estado e teclado |
| :-- | :-- | :-- |
| Pergunta | área de texto; nome = texto da pergunta (`<label>` visível) | Tab entra; texto livre, sem limite |
| Opções da autorização | grupo de botões de opção (`fieldset`/`legend`) | Setas movem e selecionam; nenhuma pré-marcada |
| Situação | grupo "Parte 3, situação 2" (`fieldset`/`legend`) | Adicionar: foco vai ao primeiro campo e o status anuncia "Parte 3, situação 2 adicionada." Remover: diálogo de confirmação; ao confirmar, foco volta a "Adicionar uma situação à Parte 3" e as legendas são renumeradas |
| Diálogo de confirmação | diálogo modal (`<dialog>` + `showModal()`), nome no título, descrição no texto | Foco inicial no título; Esc, Cancelar ou clique no fundo fecham e devolvem o foco ao gatilho (padrão do `A11Y-DECISIONS.md`) |
| Blocos extras | `<details>`/`<summary>` | Enter/Espaço abrem e fecham |
| Anúncios | uma região `role="status"` (`#anuncio`) | Adicionar, remover, copiar, baixar, importar, apagar. Salvamento automático **não** é anunciado (seria ruído a cada tecla); aparece em texto visível |
| Erro de importação | texto visível "Erro: …" ligado ao campo por `aria-describedby`, `aria-invalid="true"`, foco volta ao campo | A mensagem diz a saída |

## 5. Dados

Formato (versão 1), definido em `src/js/entrevista/modelo.js`:

```json
{ "versao": 1, "atualizadoEm": "ISO-8601",
  "campos": { "<name do controle>": "texto" },
  "situacoes": [ { "id": "1", "parte": "A–E",
                   "aparelho": "", "servico": "", "recurso": "", "controle": "", "quando": "", "versao": "",
                   "objetivo": "", "passos": "", "resultado": "", "desfecho": "", "porque": "" } ] }
```

- A importação descarta chave fora de `^[a-z0-9-]{1,64}$`, valor que não seja texto, parte desconhecida e campo de situação desconhecido. Nada importado vira HTML (só `textContent`/`value`).
- O `.txt` exportado lista só o que foi respondido, na ordem da página, com o texto visível de cada pergunta ("Pergunta:" / "Resposta:"), e as situações dentro da parte a que pertencem. Traz a data da exportação, que vale como data da autorização.

## 6. Requisitos de acessibilidade (A11Y.md 2.2.0, perfil Standard)

1. Todo campo tem `<label>` visível fora do campo. Nenhum placeholder.
2. Alvos: botões, rótulos de opção, `summary` e campos com ≥ 44 px de altura (teste).
3. Foco: anel de 2 px `#58a6ff` do plugin `a11y-focus-base` (7,49:1 sobre o fundo). Nenhum `outline: none`.
4. Sem JavaScript: todas as perguntas e campos aparecem; o aviso em `<noscript>` diz que nada será salvo e pede para copiar as respostas; os controles que dependem de script (situações, salvar, enviar) ficam ocultos (`html:not(.js) .et-js`).
5. Movimento: só o deslocamento de 1 px no hover dos botões; zerado sob `prefers-reduced-motion`, que também desliga a rolagem suave.
6. Reflow: sem rolagem horizontal a 320 px, inclusive com situação aberta (teste).
7. Texto corrido limitado a 72ch, entrelinha 1,5–1,6, alinhado à esquerda.
8. Nenhum hexadecimal no HTML além do `theme-color`; cores só no CSS da página.
9. Sem limite de tempo em nenhuma parte (SC 2.2.1).

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

- `tests/entrevista-acessibilidade-streaming.spec.js` (Chromium): estrutura, não listada e sem terceiros, nenhuma requisição com o texto digitado, salvar/recuperar, desligar o salvamento, situação (foco, diálogo, renumeração), bloco extra com resposta abre sozinho, exportar `.txt`/`.json` e reimportar, erro de importação, axe sem serious/critical (página, situação aberta, diálogo), alvos ≥ 44 px, 320 px.
- `tests/entrevista.nojs.spec.js` (projeto `no-js`).
- `tests/entrevista.model.test.mjs` (`node:test`): partes iguais aos eixos do roteiro, número de perguntas de cada parte igual ao do bloco do roteiro, nenhuma nota ao entrevistador na página, validação da importação, texto exportado.

## 9. Fora do escopo e pendências

- **Leitor de tela real:** não testado (nenhum par leitor + navegador). Quem deve: pessoa com leitor de tela, antes de enviar o convite. Roteiro mínimo: Tab da página inteira; responder uma pergunta, recarregar e conferir; adicionar e remover situação; baixar o `.txt` e abri-lo.
- **Verificação independente:** self-reported ⚠️; status no máximo CONDICIONAL.
- **Envio automático das respostas:** fora do escopo (D-4). Exige servidor e política de dados próprios.
- **Respostas em áudio ou em Libras:** fora da página. O texto orienta a pessoa a combinar outro formato com quem a convidou.
- **Várias pessoas no mesmo navegador:** uma por vez; depois de enviar, a pessoa apaga.
