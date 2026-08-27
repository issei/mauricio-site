# Plano de revisão — `capacidade-antes-do-acesso`

**Origem:** análise crítica externa da página publicada (revisão editorial, argumentativa e
metodológica), recebida em 2026-08-27.
**Status:** fases 1–3 **executadas** em 2026-08-27. Pendentes: P1-1 e P3-1 (egresso bloqueado)
e P3-2 (decisão do usuário).
**Página:** `src/capacidade-antes-do-acesso.html` · SSOT de conteúdo: `scripts/seo/pages.mjs`.

---

## 0. Como este plano trata a crítica

A crítica é boa e majoritariamente procedente. Não é aceita no atacado: cada item foi conferido
contra o que a página **de fato** diz. O resultado é 11 itens aceitos, 3 reformulados e 3 recusados
com justificativa.

Dois achados não estavam na crítica e entram por leitura própria do diff (item **A5** e a natureza
**gerada** de metade das correções). Duas fontes citadas pela crítica **não puderam ser
verificadas** neste ambiente e por isso não viram ação, apenas pendência (**P3-1**, **P1-1**).

> **Princípio que ordena as prioridades.** Esta página argumenta que a literatura da área afirma
> mais do que sustenta. Todo defeito em que a *própria página* afirma mais do que sustenta é P0 —
> não por gravidade factual, mas porque contradiz a tese que ela defende.

---

## 1. Aceitos — P0 · a página afirma o que não sustenta

Quatro defeitos. Três deles são **inconsistências internas**: o corpo do artigo já está calibrado e
o cartão de entrada ou a legenda não está. Isto é, a correção não exige nova pesquisa — exige
alinhar o resumo ao que o próprio texto já diz.

### A1 · "a Noruega legisla" → orientação, não legislação

| Onde | Texto atual |
|---|---|
| `src/…html:483` (cartão Domínio B) | "É aqui que a Noruega legisla." |
| `pages.mjs` → FAQ (gera `…html:204` JSON-LD e `:1291` FAQ visível) | "…é onde a política norueguesa de 2026 legisla…" |

O Udir publicou **råd** (orientações/recomendações). A própria Tabela 3 da página chama a fonte de
"Diretriz oficial" — ou seja, **a página se contradiz**: usa a palavra precisa na tabela e a
imprecisa no cartão. Pior, a mesma página cita "Lei nº 15.100/2025" para o Brasil, provando que
distingue os instrumentos quando quer.

Recomendação administrativa, diretriz curricular e lei têm força jurídica e mecanismos de
implementação diferentes — a distinção é material num artigo sobre desenho de política.

**Ação:** trocar por "publicou orientações oficiais por etapa escolar".
**Atenção:** duas das três ocorrências são **geradas**. Editar `scripts/seo/pages.mjs` e rodar
`node scripts/seo/build-aeo.mjs capacidade-antes-do-acesso --md`. Editar o HTML à mão nessas linhas
é perda de trabalho: a próxima regeneração sobrescreve.

### A2 · "o único experimento causal forte disponível"

`src/…html:430`, cartão de entrada. O corpo do artigo (`#offloading`) já escreve a versão
calibrada — "a evidência causal mais robusta **de toda a matriz revisada**". O cartão perdeu o
escopo pelo caminho.

**Ação:** alinhar o cartão à formulação do corpo.

### A3 · "−17% e +127%" como par comparável

Mesmo cartão. Os dois números vêm de **momentos de medição diferentes**: −17% é o teste final sem
IA; +127% é o desempenho durante a prática. Justapostos, sugerem um contraste que o experimento não
mediu assim. A Figura 3 acerta ("+48% (Base) · +127% (Tutor)" separado de "ganho mantido"); o
cartão não.

*Este item não está na crítica externa — entra por releitura adversarial do próprio diff.*

**Ação:** no cartão, contrastar o que é comparável (teste final: −17% × ganho mantido) e deixar os
números de prática para a Figura 3.

### A4 · "a mesma ferramenta, o mesmo aluno"

`src/…html:403`, legenda da Figura 1. O estudo de Bastani é **entre grupos**; não acompanha o mesmo
aluno sob os dois tratamentos. A Figura 1 é conceitual, não é o experimento — mas a legenda importa
a autoridade do experimento para uma ilustração.

**Ação:** "o mesmo modelo, desenhos de uso diferentes, resultados contrastantes".

---

## 2. Aceitos — P1 · a página pede rastreabilidade e não a pratica

### P1-1 · Link do Udir aponta para a home  ⚠️ bloqueado

`src/…html:1355` referencia `https://www.udir.no` — a home institucional. A Tabela 3 inteira
depende dessa fonte e o leitor não chega até ela.

A crítica fornece o link direto. **Não consegui verificá-lo:** `www.udir.no` está bloqueado pelo
proxy de egresso deste ambiente (`EGRESS_BLOCKED`).

**Ação:** trocar pelo link direto **após** alguém abrir a URL e confirmar que ela resolve e contém
a orientação por etapa. Publicar um link não verificado numa página sobre calibragem de evidência
seria repetir o defeito que ela denuncia.

### P1-2 · Duas linhas da matriz sem autoria

"Estudo quasi-experimental (Noruega, smartphones)" e "Revisão rápida PRISMA (5 estudos)" aparecem na
matriz de evidências **sem autor, ano, periódico ou DOI** — as únicas duas linhas nessa condição.
Numa matriz cuja função é permitir auditoria, é um buraco real.

**Ação (uma das duas):** (a) fixar as citações completas; ou (b) marcar explicitamente as linhas
como *citação não fixada*, no mesmo espírito da nota de "referência não verificada" que a página já
carrega. A opção (b) é honesta e imediata; a (a) depende de pesquisa com rede liberada.

### P1-3 · Rubrica A–D implícita

A escala tem legenda de uma linha. Falta o critério que separa um B de um C.

**Ação:** rubrica explícita de quatro linhas junto à Tabela 4. Ex.: **A** = ensaio randomizado com
desfecho comportamental e teste sem IA; **B** = quasi-experimental ou síntese com limitações;
**C** = descritivo, amostra pequena ou sem controle; **D** = norma, framework ou validação de
construto.

### P1-4 · Nota metodológica nos percentuais

Os números de Bastani aparecem sem unidade da métrica, n por braço, duração da intervenção nem o
que significa o "teste final sem IA". "Cerca de mil estudantes" é o total, não o braço.

**Ação:** nota curta ancorada na Figura 3 com métrica, n por braço, duração e natureza do teste.

### P1-5 · Âncoras da matriz para as referências

Hoje as referências vivem só no rodapé (convenção da casa, igual a `formulacao-de-problemas`).
Meio-termo barato: cada linha da Tabela 4 linka para a entrada correspondente do rodapé.

---

## 3. Aceitos com reformulação — P2 · experiência de leitura

### P2-1 · O resumo executivo já existe — está no lugar errado

A crítica pede "inserir um resumo executivo de cinco a oito linhas". **A página já tem um**: o bloco
"Em síntese" gerado pelo `build-aeo`, com lede e quatro pontos.

O problema é a posição: ele é injetado no marcador `<!-- AEO-BODY -->`, que está **depois de
`</main>`**, na linha 1268 de 1424. O leitor só encontra o resumo depois de atravessar o artigo
inteiro.

**Ação:** mover o marcador `<!-- AEO-BODY -->` para logo após o herói. Não é escrever resumo novo —
é mover uma linha.

> **Achado durante a execução — o marcador não sobrevivia à regeneração.**
> `build-aeo` consome o `<!-- AEO-BODY -->` na primeira injeção (ele *vira* o bloco) e, na limpeza
> da execução seguinte, apagava o bloco sem deixar nada no lugar. Sem marcador, caía no fallback
> "antes do último `<footer>`" — devolvendo ao rodapé um resumo deliberadamente posicionado no topo,
> **em silêncio**. A posição sobrevivia a uma execução e se perdia na próxima.
>
> Vale para qualquer página, não só esta. Corrigido em `scripts/seo/build-aeo.mjs`: a limpeza agora
> repõe o marcador no lugar do bloco. Verificado com duas regenerações consecutivas.
>
> Quem pegou foi o teste de posição escrito para P2-1 — que existia justamente porque uma guarda de
> existência não teria pego nada: o bloco continuava lá, só que no lugar errado.

### P2-2 · Rótulos de status epistêmico

A crítica pede rótulos "dado direto / inferência / hipótese / norma oficial / proposta do autor".
A página **já tem esse sistema** — os selos (Síntese, Proposta original, Evidência causal A,
Evidência comparativa, Não sustentada), aplicados por seção.

**Reformulação:** não criar um segundo vocabulário concorrente. Descer a granularidade dos selos
existentes de *seção* para *afirmação* nos pontos onde a página mistura os registros — sobretudo
`#noruega` e `#offloading`.

### P2-3 · Tom: superlativos sem base

"um revisor identificaria de imediato" (`:460`) e "o erro metodológico mais recorrente neste campo"
(FAQ, gerada). São generalizações não demonstradas e levemente combativas — contra a voz da casa
("engenharia, não marketing", ver o agente `tone-reviewer`).

**Ação:** "essa mistura compromete a validade da inferência, porque a política norueguesa não cobre
o domínio ECEC" — demonstrável e menos personalista. Lembrar que a ocorrência da FAQ é **gerada**.

### P2-4 · Operacionalizar o continuum

O continuum de governança é conceitual. Uma tabela compacta o tornaria acionável:
etapa → finalidade permitida → papel do professor → salvaguarda → critério de retirada do apoio.

**Reformulação:** aceito a tabela compacta. **Recusada** a lista ampliada da crítica (privacidade,
NEE, equidade de acesso, carga docente, accountability) — ver §4.

---

## 4. Recusados, com justificativa

### R1 · Protocolo completo de revisão sistemática

A crítica pede bases consultadas, strings de busca, critérios de inclusão/exclusão e período.

**Recusa:** isso converteria uma **revisão crítica** numa **revisão sistemática** — outro gênero,
com outro contrato com o leitor. A página nunca se anuncia como sistemática; o subtítulo diz
"revisão crítica de literatura e desenho de política". A rubrica A–D (P1-3) captura o ganho real
sem trocar o gênero do texto.

### R2 · Remover o vocabulário em inglês

**Recusa:** a crítica trata *capacity*, *judgment*, *scaffold*, *guardrails*, *offloading* como
barreira. Mas a página já apresenta **o português primeiro e o inglês entre parênteses** —
"Capacidade (*capacity*)". O termo em inglês é a alça pela qual o leitor encontra a literatura;
removê-lo custa mais do que economiza. Se a densidade incomodar, o caminho é o glossário na página,
não a de-anglicização.

### R3 · Módulo ampliado de implementação

Privacidade, acessibilidade, NEE, equidade, carga docente e accountability são temas legítimos —
e são **outro artigo**. Enxertá-los aqui diluiria a tese (quem medeia, com que função cognitiva)
numa revisão geral de política educacional. A tabela compacta de P2-4 entrega a operacionalização
que falta sem esse custo.

---

## 5. Pendentes de decisão — P3

### P3-1 · Correção do PNAS  ⚠️ não verificável aqui

A crítica afirma que o artigo de Bastani tem correção posterior
(`10.1073/pnas.2518204122`), relativa a **afiliação institucional de autor**, não a resultados.

**Não consegui verificar:** `www.pnas.org` está bloqueado pelo proxy de egresso (`EGRESS_BLOCKED`).

**Recomendação:** **não** acrescentar a citação antes de verificar. Adicionar uma referência não
conferida a uma página cuja tese é calibragem de evidência seria o defeito que ela denuncia,
cometido por ela. Verificado, entra — a transparência bibliográfica é ganho real.

### P3-2 · Segunda camada de leitura para gestores

Uma página-resumo com tese, riscos e checklist de decisão, mantendo a atual como aprofundamento.
**É uma página nova, não um ajuste** — decisão sua. Note que P2-1 (subir o "Em síntese") entrega
parte do benefício a custo quase zero; vale medir se ainda falta.

---

## 6. Ordem de execução sugerida

| Fase | Itens | Natureza | Bloqueio |
|---|---|---|---|
| 1 | A1 · A2 · A3 · A4 | Correção factual e de escopo | — |
| 2 | P1-2 · P1-3 · P1-4 · P1-5 | Rastreabilidade | P1-2(a) precisa de rede |
| 3 | P2-1 · P2-2 · P2-3 · P2-4 | Leitura e operacionalização | — |
| 4 | P1-1 · P3-1 | Fontes externas | **egresso bloqueado** |
| 5 | P3-2 | Página nova | decisão do usuário |

**Fases 1 a 3 são executáveis agora e não dependem de rede.**

### Notas de execução

- Metade das correções de texto vive em `scripts/seo/pages.mjs`, não no HTML. Fluxo:
  editar o SSOT → `node scripts/seo/build-aeo.mjs capacidade-antes-do-acesso --md` → conferir o
  diff nas três saídas (head JSON-LD, FAQ visível, `public/*.md`).
- **Uma asserção de teste colide com P2-3, não com a fase 1.** Conferido: a fase 1 não toca
  nenhuma string asserta. Já `tests/…spec.js:49` exige que `#dominios` contenha
  `'não é uma política de ECEC'` — e essa é justamente a oração final da frase que P2-3 reescreve
  (`src/…html:460`). Ou a nova redação preserva esse trecho, ou a asserção muda junto, no mesmo
  commit. Reescrever a frase e descobrir isso no gate é desperdício evitável.
- Fechar com `npm run gate`. A suíte cross-browser completa só fecha no CI.
