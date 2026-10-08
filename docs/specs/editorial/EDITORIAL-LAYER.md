# EDITORIAL-LAYER — especificação da camada editorial

> Fases 2–4 do metaprompt "Camada editorial concisa e navegação didática".
> Diagnóstico que fundamenta esta spec: [`EDITORIAL-AUDIT.md`](EDITORIAL-AUDIT.md).
> Status: **piloto em 3 páginas, aguardando validação do autor antes da Fase 5.**

## 1. O problema que a camada resolve

O conteúdo do site é bom e longo. O que custa caro ao visitante não é a quantidade de texto,
é a quantidade que ele precisa atravessar até saber (1) o que a página é, (2) qual é a ideia
central, (3) quanto precisa ler para obtê-la e (4) onde está o aprofundamento. Hoje a resposta
para (2) costuma estar no bloco "Em síntese", que em 21 de 24 páginas fica **no fim**.

A camada não resume o artigo nem substitui nada. Ela acrescenta, logo após o hero, uma
orientação de 100–200 palavras e, quando falta, uma continuação no fim.

```text
ANTES                                  DEPOIS
Entrada                                Entrada (hero, intacto)
  ↓                                      ↓
conteúdo → conteúdo → conteúdo         Em uma frase · Formato · Profundidade (~N min / ~M min)
  ↓                                      ↓
conclusão + Em síntese (no fim)        O que você vai encontrar: rotas por modo
                                         Entender → Aplicar → Aprofundar → Verificar → Consultar
                                         ↓                         └ atalho: "Ler a síntese"
                                       Conteúdo (intacto, na mesma ordem)
                                         ↓
                                       Em síntese + FAQ (intactos, agora com âncora)
                                         ↓
                                       Se este tema interessa a você → 2–3 páginas
```

## 2. Princípios

1. **Reutilizar antes de criar.** A camada é renderizada pelo mesmo modelo do bloco AEO
   (dados num SSOT, gerador idempotente com `--check`, marcadores no HTML) e estilizada no
   mesmo `public/aeo.css`. Nenhuma dependência, nenhum JavaScript no navegador.
2. **Não uniformizar.** Página que já orienta (portas de entrada, síntese no topo, "Como ler
   esta página") **não** recebe a camada. Ausência no SSOT = nenhuma alteração.
3. **Não inventar.** Todo texto da camada é citação ou condensação do que a página já diz;
   o campo `source` registra de onde veio. Se a tese não está clara na página, ela fica
   registrada como lacuna no audit, nunca preenchida pela camada.
4. **Não estimar.** Tempo de leitura é calculado do texto, nunca digitado.
5. **Ocultar complexidade, não informação.** Nada é recolhido em `details` pela camada.
   O conteúdo segue linear e completo; a camada só diz onde está cada parte.

## 3. Arquitetura

| Peça | Arquivo | Papel |
| :--- | :--- | :--- |
| SSOT | `scripts/editorial/editorial.data.mjs` | uma entrada por página; taxonomias `KINDS`, `DEPTHS`, `MODES` |
| Gerador | `scripts/gen-editorial.mjs` | mede tempos, renderiza, injeta entre marcadores; `--check` no gate |
| Estilo | `public/aeo.css` (seção "Camada editorial", namespace `.ed-*`) | mesmos tokens do bloco AEO; servido igual em PT e EN |
| Âncora da síntese | `scripts/seo/lib.mjs` › `buildBody` | emite `id="em-sintese"` só nas páginas com camada |
| Contrato | `tests/editorial-layer.test.mjs` | concisão, taxonomia, âncoras, ausência de headings, HTML em dia |
| Gate | `scripts/quality-gate.mjs` | `gen-editorial.mjs --check` junto dos outros artefatos gerados |

`scripts/gen-hub-data.mjs` passou a descontar a camada da contagem de palavras: um mapa de
entrada não é leitura e não deve subir o tempo exibido no Hub.

### 3.1 Marcadores

O autor posiciona; o gerador só preenche. Marcadores **nunca** são consumidos (lição do
`build-aeo.mjs`, cujo marcador consumido fazia a posição se perder na regeneração seguinte).

```html
<!-- EDITORIAL:START -->
<!-- EDITORIAL:END -->

<!-- EDITORIAL-NEXT:START -->
<!-- EDITORIAL-NEXT:END -->
```

- Orientação: logo após o hero. `placement: 'inline'` quando o ponto de inserção já está
  dentro de um contêiner com margem (hero, `<main>` com padding); `'section'` quando é irmão
  das `<section>` da página.
- Continuação: depois do bloco "Em síntese", antes de `</main>`.

## 4. Padrão semântico

```html
<div class="ed ed--section" data-editorial="case-agents">
  <dl class="ed-facts">
    <div class="ed-fact ed-fact--wide"><dt>Em uma frase</dt><dd>…</dd></div>
    <div class="ed-fact"><dt>Formato</dt><dd>Case técnico</dd></div>
    <div class="ed-fact"><dt>Profundidade</dt><dd>Leitura aprofundada · ~3 min para a ideia central · ~31 min completo</dd></div>
  </dl>
  <nav class="ed-routes" aria-labelledby="ed-routes-label">
    <p class="ed-label" id="ed-routes-label">O que você vai encontrar</p>
    <ul>
      <li><span class="ed-mode">Entender</span> <a href="#problema">O problema</a>, …: nota.</li>
    </ul>
  </nav>
  <p class="ed-shortcut">Prefere o essencial antes? <a href="#em-sintese">Ler a síntese (~1 min)</a></p>
</div>
```

Decisões e motivo:

- **`<dl>`** para os pares rótulo/valor: o leitor de tela anuncia "Em uma frase" como termo,
  não como texto solto colado à frase seguinte.
- **Nenhum heading.** A camada não entra na lista de títulos nem desloca a hierarquia
  `h1 → h2` da página (testado).
- **Rotas em `<nav>` rotulado**, distinto do `<nav>` de trilha da página; um landmark por
  função, cada um com nome próprio.
- **Listas com marcador visível** (`list-style: square`, `::marker` em cor neutra): sem
  `list-style:none`, o VoiceOver continua anunciando "lista, N itens" sem `role="list"` — que
  aumentaria o teto do gate estático (`A11Y-DECISIONS.md`).
- **Links sublinhados** com especificidade acima do `a { text-decoration:none }` das páginas
  (WCAG 1.4.1), na cor `#58a6ff` (7,49:1 sobre `#0d1117`).
- **Sem `aria-*`** além do `aria-labelledby` que dá nome ao `<nav>`.

### 4.1 Formatos (`KINDS`)

Artigo · Ensaio · Ensaio com autodiagnóstico · Estudo técnico · Case técnico · Guia prático ·
Tutorial · Documentação de projeto · Revisão científica · Apresentação · Proposta técnica ·
Simulador · Narrativa pessoal · Referência.

### 4.2 Profundidades (`DEPTHS`)

Leitura rápida · Leitura aprofundada · Guia prático · Referência técnica.

### 4.3 Modos de rota (`MODES`)

| Modo | Responde | Exemplo |
| :--- | :--- | :--- |
| **Entender** | qual é a ideia e por quê | problema, tese, conceito central |
| **Aplicar** | como usar isso | método, casos, ferramenta, autodiagnóstico |
| **Aprofundar** | o detalhe para quem quer mais | código, matemática, arquitetura completa |
| **Verificar** | como sei que é verdade | testes, evidência, limitações declaradas |
| **Consultar** | onde acho quando precisar | referência, glossário, bibliografia |

"Verificar" existe para cumprir o "separar narrativa de evidência" sem mover conteúdo:
a evidência fica onde está, e a rota diz que ela é evidência.

## 5. Regras de concisão (aplicadas pelo teste)

| Elemento | Limite |
| :--- | :--- |
| Em uma frase | 1–2 frases |
| A tese | 1–3 frases (omitir se o h1/hero já é a tese) |
| Para quem é | 1–2 frases, só quando há leitores distintos |
| Rotas | ≤ 5 itens |
| Continuações | ≤ 3, cada uma com justificativa |
| Bloco de entrada inteiro | ≤ 200 palavras |

## 6. Tempo de leitura

- Régua: 200 ppm, a mesma do Hub (`gen-hub-data.mjs`).
- Base: prosa visível de `<main>`; ficam de fora `<pre>`, `<script>`, `<style>`, `<svg>`,
  comentários e a própria camada. Código não se lê em palavras por minuto.
- "Ideia central" = soma das seções listadas em `core`. "Completo" = todo o `<main>`.
- Síntese = palavras do bloco `.aeo-tldr`.
- Se o tempo central não for menor que o completo, só o completo é exibido.

## 7. Quando usar e quando não usar

**Usar** quando a página tem pelo menos um destes sintomas (ver audit §4):
- a tese aparece depois de vários parágrafos de narrativa ou retórica;
- mais de ~8 seções sem indicação do que é essencial;
- leitores com objetivos diferentes (produto × engenharia, executivo × técnico);
- síntese só no fim e nenhuma porta de entrada no hero.

**Não usar** quando:
- a página já tem portas de entrada, síntese no topo ou "Como ler esta página";
- é curta (≲ 6 min) e o hero já diz o que é;
- é narrativa pessoal, tutorial imperativo ou proposta curta;
- seria só para "ficar igual às outras".

**Continuação (`next`)** só quando a página não tem uma e existe relação semântica
declarável (crosslink do `eco-nav`, mesmo pilar com tese vizinha, referência mútua). Nada de
"artigos relacionados" por categoria.

## 8. Comportamento responsivo e acessível

- Desktop: "Em uma frase" em largura total; Formato e Profundidade lado a lado; rótulo do
  modo em coluna fixa de 6,2 rem. Largura de texto limitada a 80 ch.
- ≤ 640 px: o rótulo do modo vai para a linha de cima; nada de rolagem horizontal
  (medido: `scrollWidth` = viewport em 390 px nas três páginas).
- Foco: herda o anel global `2px #58a6ff` do plugin `a11y-focus-base`.
- Sem animação; `prefers-reduced-motion` não tem o que reduzir.
- Funciona sem JavaScript: é HTML estático gerado no build.
- Ordem do DOM = ordem visual. Leitura linear preservada: a camada vem antes do conteúdo e
  não o interrompe.

## 9. Piloto (Fase 3)

| Página | Tipo | Por que foi escolhida | O que recebeu |
| :--- | :--- | :--- | :--- |
| `artifice` | conceitual (ensaio) | h1 retórico; tese no 4º parágrafo do hero | Em uma frase, formato, profundidade, 3 rotas, atalho à síntese, 2 continuações |
| `case-agents` | técnico (case) | 15 seções; narrativa e evidência intercaladas | Em uma frase, formato, profundidade, 4 rotas (com "Verificar"), atalho à síntese |
| `socialselling` | longo/documental | 2 audiências; mapa só no desktop | Para quem é, formato, profundidade, 4 rotas por audiência, atalho, 2 continuações |

Avaliação do piloto:
- **Consistência:** os três blocos usam a mesma estrutura e os mesmos rótulos; variam só nos
  campos que cada página precisa (`oneLiner` em dois, `audience` no terceiro).
- **Clareza:** a ideia central passou a estar a 92–160 palavras do h1 nas três (audit §5).
- **Impacto visual:** régua lateral e tipografia do próprio site; sem card, sombra ou ícone.
- **Texto acrescentado:** 126–172 palavras de orientação por página, mais 39–48 de continuação onde ela entrou (≈ 2,8% da prosa de `case-agents`).
- **Implementação:** acrescentar uma página = uma entrada no SSOT + dois marcadores + rodar o
  gerador. O teste pega âncora quebrada, frase a mais e HTML fora de dia.
- **Reutilização:** CSS, tokens, padrão de gerador e âncora da síntese vêm do bloco AEO.

O que o piloto **não** fez, de propósito: a parte "B" de `case-agents` (recolher o Python das
técnicas estatísticas em `details`). Ela altera a leitura da evidência e merece a validação
do autor antes.

## 10. Validação (Fase 4)

| Teste | `artifice` | `case-agents` | `socialselling` |
| :--- | :--- | :--- | :--- |
| 10 s — sabe sobre o que é? | sim (formato + frase) | sim (formato + frase) | sim (hero + formato) |
| 30 s — entende a tese? | sim, "Em uma frase" | sim, "Em uma frase" | sim, hero (inalterado) |
| 60 s — sabe se deve continuar? | sim: ~6 min para a ideia, ~13 completo | sim: ~3 / ~31 min, e sabe que 9 seções são opcionais | sim: rota por objetivo |
| 3 min — consegue explicar? | sim, com os 5 padrões | sim, com problema → crash → barreira | sim, §1–3 |
| Escaneabilidade (só títulos + camada) | rotas reconstroem o arco tese → padrões → antídotos → teste | rotas separam narrativa de evidência | rotas separam produto de método e de referência |

Verificação técnica feita nesta entrega:
- `node --test tests/*.test.mjs`: 18 testes novos verdes; o único vermelho do conjunto é o
  espelho `/en/` ainda não regenerado (ver §11).
- `scripts/a11y-sweep.mjs --only artifice,case-agents,socialselling`: sem regressão (axe WCAG
  2.2 AA + sondas da catraca, PT).
- Playwright (`artifice`, `case-agents`, `eco-nav`, `hreflang`, chromium): 43/43.
- `perf-budget`, `optimize-critical-path --check`, `audit-site --strict`, `gen-hub-data --check`: verdes.

Não verificado: leitor de tela real, controle por voz, Safari. Ver `REPORT.md`, nota 9.

## 11. Pendências antes do merge

- **Espelhos `/en/`:** a tradução é local (Argos) e o modelo não está disponível no ambiente
  de nuvem. `npm run i18n:sync && npm run i18n:check` precisa rodar numa máquina com o modelo.

## 12. Fase 5 (só depois da validação)

Ordem sugerida pelo audit §7: `knowledge-os-presentation`, `devin`, depois as de prioridade
média. O catálogo passa a ler formato e profundidade deste SSOT.
