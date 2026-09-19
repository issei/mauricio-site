# i18n — terminologia técnica no Argos Translate (estudo, sem solução adotada)

**Status:** estudo concluído em 2026-09-19. **Nenhuma mudança foi adotada.** A abordagem
testada (glossário por marcador) foi avaliada pelo autor como **não eficaz o bastante** para
justificar a manutenção. Este documento registra o problema, o que foi investigado e testado,
e o que ficou por avaliar, para uma reavaliação futura com outra abordagem ou ferramenta.

Contexto do pipeline: [`scripts/i18n/README.md`](../scripts/i18n/README.md) ·
[`scripts/i18n/engine.py`](../scripts/i18n/engine.py) ·
[`docs/specs/pages/SDD-i18n-en.md`](specs/pages/SDD-i18n-en.md).

---

## 1. O problema

O gêmeo `/en/` é gerado por tradução automática neural local (Argos Translate 1.11.0 sobre
CTranslate2 4.8.2, modelo `pt → en`). O modelo é pequeno e genérico: **não conhece o vocabulário
técnico do site** e escolhe a palavra mais frequente da língua comum.

Erros observados na **primeira geração** do `/en/` a partir de `src/case-agents.html` (seção
«Estatística no Código», adicionada em 2026-09-19), com o PT-BR de origem na última coluna. O
estado depois de reescrever o PT está na §5:

| Saída do Argos | Deveria ser | Origem |
| :--- | :--- | :--- |
| `steering guard` | `direction guard` | «guarda de direção» |
| `Vector recovery` | `Vector retrieval` | «Recuperação vetorial» |
| `outside the warp` / `out of warp` | `out-of-fold` | «fora da dobra» (validação cruzada) |
| `20 of the 20 issues` | `20 of the 20 queries/messages` | «20 das 20 queries» |
| `(167, 285)` | `(167 of 285)` | «(167 de 285)»: o «de» virou vírgula |
| `A accuracy It's about the total` | `Accuracy is the proportion…` | «A acurácia é acertos sobre o total» |

Os mesmos erros de vocabulário já existiam nas páginas anteriores. No `/en/case-agents.html`
anterior à seção nova: `Steering Guard` no JSON-LD e nos cards, `Queries routing` nas
`keywords`, e `<meta property="article:tag" content="Guarda de Direção">` sem tradução nenhuma.
**O problema não é da seção nova; ela só o tornou visível.**

Restrições do projeto que limitam as soluções (ver `AGENTS.md`):

- tradução **local e sem LLM** (custo de token zero é o ponto da arquitetura);
- **nunca editar `src/en/**` nem `public/en/**` à mão** (são gerados e sobrescritos);
- a estrutura (código, URLs, tags) é preservada por **marcadores** `zzph{n}zz`, conferidos na volta,
  com contingência determinística se o modelo os destruir (`engine.py`, `translate_with_slots`);
- cache por segmento em `scripts/i18n/.cache/segments.json` (não versionado).

---

## 2. O que o Argos oferece (verificado no código instalado e por teste)

O Argos **não tem glossário, lista de termos fixos nem restrição lexical**. Inventário dos
recursos que existem em `argostranslate` 1.11.0:

| Recurso | O que é | Resultado |
| :--- | :--- | :--- |
| `ITranslation.hypotheses(texto, n)` | n-best: devolve as *n* melhores traduções com score | **Testado, não resolve.** «direction guard» não aparece entre as 4 melhores (§3). Reordenar por termo esperado não tem o que escolher |
| `settings.beam_size` (`ARGOS_BEAM_SIZE`, padrão 4) | Largura da busca no decodificador | **Não testado isoladamente.** O n-best com o feixe padrão (4) não contém o termo; um feixe maior poderia trazê-lo, mas a evidência sugere que o modelo simplesmente não o conhece |
| `fewshot.py`, `model_provider`, `openai_api_key`, `ARGOS_EXPERIMENTAL_ENABLED` | Caminho experimental que chama um **LLM** | **Descartado:** viola a regra «sem LLM». O `fewshot.py` também parece inacabado: `parse_inference` devolve um único caractere (`output[end_index]`) |
| `argostranslate/tags.py` | Tratamento de tags de marcação | Sem ganho: o repositório já protege HTML e código com marcadores |
| Treinar ou ajustar o modelo (OpenNMT) | Ensinar o vocabulário ao modelo | **Não testado.** Custo desproporcional para um site |

---

## 3. Experimento

Ambiente: `.venv-i18n` do repositório (Argos 1.11.0). Nenhum arquivo do projeto foi alterado.

### 3.1 n-best (4 hipóteses por frase)

```text
PT: A guarda de direção não é uma medida de similaridade.
  -2.53  The steering guard is not a measure of similarity.
  -2.79  Steering guard is not a measure of similarity.
  -3.28  The driving guard is not a measure of similarity.
  -3.45  The steering guard isn't a measure of similarity.

PT: Recuperação vetorial: similaridade de cosseno e colapso por capacidade
  -1.49  Vector recovery: Cosine similarity and capacity collapse
  -2.38  Vector recovery: cosine similarity and capacity collapse
  -2.67  Vetorial recovery: Cosine similarity and capacity collapse
  -2.87  Vector recovery: Cosine similarity and capacity breakdown

PT: Estimadas em previsões fora da dobra, sem embaralhar.
  -5.55  Estimated in predictions outside the warp, no shuffle.
  -5.59  Estimated in forecasts outside the warp, no shuffle.
  -5.63  Estimated in forecasts outside the warp, without shuffle.
  -5.63  Estimated in predictions outside the warp, without shuffle.
```

Conclusão: o termo correto **não está no espaço de busca do modelo**. Reordenar hipóteses ou
alargar o feixe não o produziria.

### 3.2 Glossário por marcador (a proposta testada)

Mesmo mecanismo dos marcadores do `engine.py`: o termo do glossário é trocado por um marcador
antes do modelo e restaurado com a tradução correta depois.

| PT | Sem glossário | Com glossário | Marcadores íntegros |
| :--- | :--- | :--- | :--- |
| A guarda de direção não é… | The steering guard… | The **direction guard** is not a measure of similarity. | sim |
| Recuperação vetorial: … | Vector recovery: … | **Vector retrieval**: Cosine similarity and capacity collapse | sim |
| …previsões fora da dobra… | …outside the warp… | Estimated in **out-of-fold** predictions, no shuffle. | sim |

Tecnicamente funcionou nos 3 casos. Esboço de implementação (**não implementado**):

- `scripts/i18n/glossary.json` com pares PT→EN, aplicado em `BaseEngine.translate` (ponto único
  por onde todo texto passa);
- prefixo de marcador distinto (`zzgl`) para não colidir com os de código;
- o conteúdo do glossário entra na **chave do cache**, senão `segments.json` devolveria as
  traduções antigas;
- um `i18n:sync:all` refaria todos os espelhos (também corrigiria o `Steering Guard` antigo).

### 3.3 Limites da abordagem (por que não foi adotada)

- **Só corrige o que já se viu errado.** O glossário é mantido à mão e cresce por tentativa e
  erro; um termo novo continua saindo errado até alguém notar.
- **Não corrige a frase.** Resolve o termo, não a gramática nem a ordem: `A accuracy It's about
  the total` e `(167, 285)` continuam iguais. Esses erros são do modelo, não do vocabulário.
- **Flexão e caixa.** Plural e início de frase exigem variantes de cada entrada.
- **Termos ambíguos.** Uma palavra solta («recuperação») trocada por marcador afeta também os
  usos legítimos.
- **Custo de manutenção** contínuo sobre um modelo cuja qualidade de base não muda.

Não foi testada a **pós-edição por regex** (ex.: `steering guard` → `direction guard`). Ela é
mais barata, mas só conserta erros já vistos e pode atingir usos legítimos de «steering».

---

## 4. O que ficou por avaliar (candidatos para a reavaliação)

Nenhum dos itens abaixo foi testado. Marcados **(verificar)** onde a afirmação depende de
documentação que não foi conferida neste estudo.

1. **Outro modelo NMT local, no mesmo runtime.** O CTranslate2 (já instalado) roda vários
   modelos de tradução, como NLLB-200, M2M100, Opus-MT e MADLAD-400 **(verificar quais têm
   conversão suportada e qualidade em pt→en técnico)**. Trocaria a qualidade de base sem mudar
   a arquitetura. Verificar também se o CTranslate2 oferece restrição lexical no decodificador
   **(verificar)**.
2. **LLM local (Ollama, llama.cpp) com glossário no prompt.** Custo de token zero, mas contraria
   a regra atual «não usar LLM para traduzir». Exigiria uma **decisão explícita** de rever a regra
   (o que está em jogo é custo e determinismo, não o LLM em si).
3. **Memória de tradução com revisão humana.** Versionar um arquivo de segmentos aprovados
   (`PT → EN`), aplicado antes do modelo, só para as páginas de maior valor. Hoje o cache não é
   versionado e é descartável. Custo: revisão manual, mas o resultado é fixo e auditável.
4. **Anotação na fonte PT, por ocorrência.** Um atributo no HTML de origem, por exemplo
   `<span data-en="direction guard">guarda de direção</span>`, tratado pelo `html_tx.py`. O autor
   controla cada caso, sem glossário global.
5. **Serviço de MT com glossário nativo** (DeepL, Google Cloud Translation, AWS Translate com
   *custom terminology*) **(verificar preços e termos atuais)**. Resolve terminologia por
   contrato, mas tem custo e envia conteúdo a terceiro (o conteúdo é público). O site já vive
   na AWS.
6. **Retradução (en → pt) como verificação.** Não corrige, mas **detecta**: comparar a
   retradução com a fonte e sinalizar segmentos que divergem muito, para revisão. Poderia
   virar uma etapa do `i18n:check`.
7. **Escrever o PT já pensando na tradução.** Frases curtas, sem elisão, sem jargão solto e sem
   «queries» onde «mensagens» serve. É o único item aplicado neste estudo (§5).

Perguntas para decidir a reavaliação:

- Qual é o nível de qualidade aceitável para o `/en/`? (indexação e legibilidade por agente,
  ou texto editorial revisado?)
- Vale reabrir a regra «sem LLM» para um modelo **local**?
- Quantas páginas realmente importam em inglês? Se poucas, a memória de tradução (item 3) ou a
  revisão manual pode ser mais barata do que qualquer automação.

---

## 5. Estado do código

- **`scripts/i18n/` não foi alterado.** Sem glossário, sem mudança em `engine.py`, sem novo
  motor. Os experimentos rodaram em script avulso.
- **Único efeito no conteúdo:** seis trechos do PT de `src/case-agents.html` foram reescritos
  para traduzir melhor, e o `/en/` foi regenerado com o motor atual. Resultado, conferido em
  `src/en/case-agents.html`:
  - **Resolvidos pela reescrita:** `outside the warp` (agora `out-of-fold: predictions about the
    part of the data left out in each round`), `(167, 285)` (agora `167 out of 285 tools`) e
    `A accuracy It's about the total`.
  - **Continuam errados:** `steering guard` / `Steering Guard` (várias ocorrências, incluindo
    JSON-LD, cards e títulos) e `Vector recovery` (título da técnica 3). Nenhum deles se resolve
    reescrevendo o PT sem trocar o próprio termo.
  - **Erro novo, causado por reescrever:** `20 of the 20 messages AGENT Benchmark is below 0.75`.
    O `<code>` no meio da frase embaralhou a ordem das palavras. Reescrever o PT reduz alguns
    erros e introduz outros, e não é um método previsível.
  - **Pré-existentes, fora da seção nova:** `issues` para «queries» (`three real issues`,
    `transactional issues`) e `Queries routing` nos metadados.
- **Como reproduzir o experimento** (na raiz do repositório):

```bash
PYTHONIOENCODING=utf-8 .venv-i18n/Scripts/python.exe - <<'EOF'
from argostranslate import translate
langs = {l.code: l for l in translate.get_installed_languages()}
tr = langs['pt'].get_translation(langs['en'])
for h in tr.hypotheses("A guarda de direção não é uma medida de similaridade.", num_hypotheses=4):
    print("%.2f  %s" % (h.score, h.value))
EOF
```
