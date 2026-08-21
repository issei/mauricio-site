# Formulação de Problemas — Engenharia Interrompida

> Versão Markdown (GEO/AEO) de <https://mauricio.issei.com.br/formulacao-de-problemas>. Autor: **Maurício Yokoyama Issei** · pt-BR · Publicado: 2026-08-20 · Atualizado: 2026-08-20.

## Em síntese

Formular um problema complexo é **engenharia da redução de incerteza orientada à decisão** — e essa engenharia precisa ser **interrompida**. Sem regra de parada explícita, o refinamento contínuo deixa de reduzir incerteza relevante e passa a produzir custo, viés de confirmação e confiança injustificada. A hipótese é sustentada **parcialmente**: a redução de incerteza não é monotônica, não é universal e não basta sozinha.

- **Seis incertezas, não uma** — aleatória, epistêmica, estrutural, semântica, de fronteira e de valores; quatro delas nenhuma distribuição de probabilidade resolve.
- **Seis estados de conhecimento (S₀–S₅)** — da situação desagregada à decisão e aprendizagem, com um portão de qualidade antes de derivar qualquer solução.
- **Regra de parada** — pare quando EVSI + ganho decisório + valor de novo enquadramento ficarem abaixo de custo + custo de atraso + custo cognitivo.
- **Penalidade de hiper-resolução (λ)** — quando a confiança cresce mais rápido que a acurácia, refinar piora a decisão; λ é variável experimental, não constante conhecida.

## A tese e sua condição

A formulação estruturada produz decisões mais robustas que formulações ad hoc quando reduz incertezas relevantes para a ação, explicita premissas, preserva rastreabilidade, testa enquadramentos concorrentes e atinge suficiência antes que custo, viés e complexidade superem o benefício esperado da informação. A palavra que carrega o argumento é "quando": a hipótese é condicional e sustentada apenas parcialmente. Ela não afirma que toda informação adicional melhora a decisão, que toda incerteza deve ser eliminada, que existe uma formulação verdadeira e única, nem que a parada admite métrica universal.

## O que é síntese e o que é proposta não validada

São síntese da literatura: a ponte entre Problem Structuring Methods e Decision Analysis, o uso de EVSI para raciocinar sobre investigação adicional, os atributos de qualidade da Engenharia de Requisitos, os limites cognitivos documentados por Slovic e Kahneman, a separação entre incerteza paramétrica e estrutural, e o uso de ontologias para representação. São propostas originais ainda não validadas: a ontologia de estados de formulação, a incerteza de fronteira como dimensão de primeira classe, o modelo de regressão da formulação, a penalidade de hiper-resolução λ, a suficiência negociada, o benchmark de dez casos e o protocolo experimental.

## Onde a abordagem não se aplica

Problemas rotineiros, crises táticas, ambientes caóticos e não ergódicos, conflitos políticos profundos e decisões com urgência extrema. Em problemas wicked, reduzir incerteza factual não resolve o desacordo, porque o desacordo é normativo: forçar a matematização de valores incomensuráveis dá aparência de objetividade a uma escolha que não é factual. O framework precisa nomear o estado "desacordo normativo não resolvido" em vez de tratá-lo como falha a eliminar.

## Perguntas frequentes

**O que é formulação de problemas?**

É o processo de construir uma representação suficientemente explícita de uma situação para apoiar raciocínio, comparação, investigação ou ação — objetivos, alternativas, restrições, evidências, valores, incertezas e atores. Não é etapa preliminar à análise: é objeto de engenharia por direito próprio, com artefatos versionados, rastreabilidade e critérios de qualidade.

**O que significa "engenharia interrompida" da incerteza?**

Significa tratar a formulação como processo de engenharia deliberadamente sujeito a regras de parada. A redução de incerteza é meio para melhorar a decisão, nunca fim autônomo: sem interrupção explícita, o refinamento adicional produz complexidade, viés de confirmação e falsa confiança em vez de decisão melhor.

**Quando parar de investigar um problema?**

Quando o que a próxima investigação promete — valor esperado da amostra de informação (EVSI), ganho de utilidade decisória e chance de descobrir um enquadramento novo — for menor que o que ela cobra: custo direto, custo de decidir mais tarde e custo cognitivo da complexidade adicional. Em problemas com conflito de valores, aplica-se a suficiência negociada em vez de um critério matemático.

**O que é suficiência decisional?**

É uma propriedade contextual, não absoluta: objetivos críticos explícitos, alternativas principais identificáveis, restrições relevantes representadas, incertezas de alto impacto tratadas, decisão robusta a variações plausíveis dos pressupostos, perspectivas dos stakeholders consideradas e ganho esperado de investigação adicional já não compensando o custo.

**O que é a penalidade de hiper-resolução (λ)?**

É um construto proposto para penalizar o crescimento de confiança desproporcional ao crescimento de acurácia. Quando adicionar variáveis eleva a convicção do decisor sem elevar o acerto — efeito documentado por Slovic (1974) —, λ aumenta e torna negativa a utilidade da próxima investigação. O artigo é explícito: λ deve começar como variável experimental calibrada em estudo controlado, não ser embutido em sistemas de decisão de alto risco.

**Quando este framework não se aplica?**

Em cinco famílias de situação: problemas rotineiros e bem definidos, em que formalizar gera burocracia; crises táticas, em que o tempo de modelar excede o tempo disponível; ambientes caóticos e não ergódicos; conflitos políticos profundos, em que o problema é de poder e não de conhecimento; e decisões com urgência extrema, em que o custo do atraso domina qualquer valor de informação adicional.

## Glossário

- **Formulação** — Construir uma representação explícita o bastante para apoiar raciocínio, investigação ou ação; é transformação, não etapa preliminar.
- **Engenharia interrompida** — Engenharia da formulação sujeita a regras de parada, para que o refinamento não degenere em custo, viés e falsa confiança.
- **Suficiência decisional** — Condição contextual em que a formulação já sustenta a decisão e investigar mais não compensa o custo.
- **Suficiência negociada** — Critério de parada quando não há regra matemática: acordo provisório sobre o que decidir, o que fica aberto e quando revisar.
- **EVSI** — Valor esperado de uma investigação específica e parcial; pressupõe alternativas, estados e utilidade já especificados.
- **Penalidade de hiper-resolução (λ)** — Penalidade que cresce quando a confiança sobe mais rápido que a acurácia; proposta experimental, não validada.
- **Incerteza de fronteira** — Incerteza sobre a adequação do escopo e dos stakeholders identificados; medida por omissões descobertas após a decisão.
- **Validade ecológica** — Grau em que a formulação corresponde ao funcionamento relevante do domínio real, distinta de validade interna e preditiva.

*© 2026 Maurício Yokoyama Issei. Conteúdo citável com atribuição (fair use educacional).*
