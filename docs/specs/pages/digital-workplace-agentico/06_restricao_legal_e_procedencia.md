# 06 — Restrição legal e procedência

> **Leia este documento antes de escrever qualquer linha da página.** Ele prevalece sobre todos os
> outros docs desta spec em caso de conflito.

## 1. A regra

Por decisão do dono do site, por razões legais, **a página não pode ser associada a nenhuma
organização real**. O estudo foi motivado por um caso de referência, e esse caso **não é citado,
referenciado nem sugerido** em nenhum artefato publicado.

O assunto da página é sempre genérico: "um portal corporativo de grande porte", "a organização",
"o colaborador".

## 2. O que é proibido

| # | Proibição | Exemplo do que **não** fazer |
| :-- | :-- | :-- |
| P1 | Nome, marca, sigla, domínio ou nome de produto da organização de referência ou do seu portal | qualquer termo da lista da guarda (§4) |
| P2 | Nome de assistente virtual, aplicativo, fundação ou entidade ligada a ela | idem |
| P3 | Links para páginas institucionais, lojas de aplicativo, políticas de privacidade ou estudos de caso de fornecedor sobre qualquer organização | "segundo a política de privacidade de…" |
| P4 | Pistas indiretas que identifiquem o caso: setor + porte + produto ("o maior banco do país", "o portal do banco X") | "um grande banco brasileiro com app de autosserviço" |
| P5 | Enquadramento autobiográfico: "no meu trabalho", "no projeto que conduzi", "na empresa onde atuo", ou qualquer ligação entre o estudo e empregadores/clientes do autor listados no `cv.json` | "esta arquitetura foi desenhada para…" |
| P6 | Capturas de tela, logotipos, paletas ou nomes de arquivo de imagem que remetam a um produto corporativo real | `og-portal-x.png` |
| P7 | Exemplos numéricos "reais" (quantidade de colaboradores, de sistemas, de chamados) que permitam identificar a organização | "para 90 mil colaboradores" |

**Permitido:** nomes de protocolos e padrões abertos (AG-UI, MCP, A2A, A2UI, MCP Apps, OAuth,
RFC 8693, OpenTelemetry), de normas e leis (LGPD, NIST AI RMF, OWASP), de projetos open source, e
fornecedores de tecnologia **somente** quando a frase é sobre a tecnologia (ex.: "o comitê técnico
do A2A inclui…", "plataformas SaaS de atendimento como…"), nunca como "a plataforma usada pelo caso".
Exemplos de jornada universais (férias, chamado de TI, reembolso, inclusão de dependente) são permitidos.

## 3. Onde a regra vale (escopo da guarda)

| Artefato | Caminho |
| :-- | :-- |
| Página | `src/digital-workplace-agentico.html` |
| Estilo e scripts | `src/digital-workplace-agentico.css`, `src/js/digital-workplace/**` |
| Markdown companheiro | `public/digital-workplace-agentico.md` |
| Gêmeo em inglês | `src/en/digital-workplace-agentico.html`, `public/en/digital-workplace-agentico.md` |
| Metadados AEO | bloco do slug em `scripts/seo/pages.mjs`; linha do slug em `public/llms.txt` e `public/llms-full.txt` |
| Ecossistema | nó do slug em `specs/ecosystem.nav.yaml`; cartão no `src/catalogo.html` |
| Fonte e spec | `docs/references/digital-workplace-agentico/**`, `docs/specs/pages/digital-workplace-agentico/**` |
| Testes da página | `tests/digital-workplace*.js`, `tests/digital-workplace*.mjs` (exceto a própria guarda, que guarda a lista codificada) |
| Páginas de destino dos crosslinks | os `href` internos que saem da página (doc 01 §7) também devem estar limpos |

## 4. Guarda automática

`tests/digital-workplace.legal.test.mjs` (já criado junto com esta spec; roda em
`node --test tests/*.test.mjs`, portanto no `npm run gate`):

- A lista de padrões proibidos fica **codificada em base64** dentro do teste, para que o próprio
  repositório não contenha o nome em texto puro. Para ver a lista: `node tests/digital-workplace.legal.test.mjs --print-terms`
  (não cole a saída em nenhum artefato).
- Varre os arquivos do §3 que existirem (arquivos ainda não criados são ignorados, então o teste já
  protege a fonte e a spec hoje e passa a proteger a página assim que ela nascer).
- Extrai o bloco do slug em `pages.mjs` e a linha do slug nos `llms*.txt`.
- Falha listando `arquivo:linha` de cada ocorrência.

**Cobertura que o teste não tem:** pistas indiretas (P4, P5, P7) não são detectáveis por regex.
Elas são responsabilidade da revisão humana e do checklist §5.

## 5. Critérios de aceite (bloqueiam o merge)

- [ ] `node --test tests/digital-workplace.legal.test.mjs` verde.
- [ ] Nenhuma frase autobiográfica (P5): busca manual por "meu", "minha", "conduzi", "atuo", "trabalho atual" no HTML e no `.md`.
- [ ] Nenhum número que caracterize uma organização (P7).
- [ ] A seção de fontes contém apenas especificações, RFCs, leis, documentação oficial e artigos técnicos.
- [ ] Nenhuma imagem raster além do OG gerado; o OG não tem logotipo.
- [ ] Revisão do dono do site registrada no PR (D-2 do doc 05).

## 6. Procedência do conteúdo

- **Fonte:** cópia neutra do estudo em `docs/references/digital-workplace-agentico/` (23 arquivos),
  produzida a partir do estudo original com a remoção de toda menção ao caso de referência. O
  arquivo de "evidências do caso" do estudo original **não** foi copiado e não deve ser recriado.
- **Lacunas:** sumário executivo, questões abertas e as análises por papel não estão na cópia; a
  síntese genérica delas está no doc 01 §3.
- **Rótulos epistêmicos** da fonte viram selos na página (doc 01 §6). Afirmações `[FATO]` mantêm o
  link da fonte primária.
- **Se o implementador encontrar** algo na fonte que pareça apontar para uma organização real,
  ele não usa o trecho, corrige a fonte (removendo a pista) e registra em `PROGRESS.md`.
