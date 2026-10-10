# Kit de artefatos — Especificação Conversacional Estruturada

> Material de apoio da página <https://mauricio.issei.com.br/especificacao-conversacional>.
> Autor: Maurício Yokoyama Issei · 2026-10-10.
>
> **Status: proposta, não método validado.** O workflow completo ainda não foi comparado a uma
> linha de base; os componentes têm evidência parcial (ver §5). Os modelos abaixo são pontos de
> partida para adaptar à estrutura de responsabilidade da sua organização. Nenhum deles é
> exigência de norma, e nenhum garante completude, ausência de erro do modelo ou fim da divergência
> entre artefatos.
>
> Os exemplos usam o **cenário ilustrativo** da página: modernização de um sistema comercial com
> mais de 15 anos, fluxo "aprovação de proposta com desconto excepcional". É um exemplo
> construído, não um caso real nem um resultado. Nenhum valor de regra foi inventado: onde as
> fontes divergem, o modelo registra `nao_conhecido`.

## Conteúdo

1. Matriz de autoridade (com revisão obrigatória)
2. Registro de afirmação
3. Registro de divergência, estados e roteamento
4. Checklist mínimo de divergência (drift)
5. Protocolo de avaliação resumido: baseline, métricas, hipóteses e escada de evidência

---

## 1. Matriz de autoridade

Separa **autoridade** (quem decide) de **assistência** (o que a IA pode fazer). É uma política de
governança proposta: ajuste a coluna "Autoridade primária" aos papéis que existem na sua
organização. Quando o agente também executa ferramentas, altera arquivos ou aciona pipelines,
acrescente controles de permissão, escopo de execução, revisão de mudanças e condição de
interrupção: gerar uma sugestão e executar uma ação são níveis diferentes de autonomia.

| Decisão | Autoridade primária | Contribuição possível da IA | Revisão obrigatória |
|---|---|---|---|
| Valor e prioridade de negócio | Produto e negócio | Comparar alternativas e impactos | Engenharia (esforço e risco) |
| Preservar ou alterar regras comerciais | Responsáveis pelo domínio | Identificar ambiguidades e casos-limite | Produto e conformidade |
| Critérios de aceitação | Negócio e engenharia | Propor formulações e exemplos de teste | QA / testes |
| Arquitetura | Engenharia responsável | Sugerir alternativas e trade-offs | Segurança e operação |
| Compatibilidade de integrações | Engenharia e responsáveis pelas integrações | Mapear contratos e possíveis impactos | Donos dos sistemas integrados |
| Aceitação de risco residual | Responsáveis formalmente designados | Identificar cenários e apoiar a análise | Engenharia (quantificação técnica) |
| Redação da especificação | Equipe responsável, com revisão | Estruturar e reformular conteúdo | Dono do requisito |
| Oráculo de teste (o resultado esperado) | Negócio e engenharia | Gerar candidatos para validação | Validação humana antes de o teste ser gerado |
| Código de teste | Engenharia e QA | Escrever o código; o oráculo vem da linha acima | Revisão do oráculo e da cobertura |
| Link de rastreabilidade | Engenharia (manutenção) | Propor candidatos a link, com status `inferido` | Auditoria periódica de precisão e recall |
| Classificação de uma divergência | Responsável pelo artefato afetado | Detectar possíveis conflitos | Decisão humana formal |
| **Modelo / agente** | **Nenhuma autoridade substantiva por padrão** | Propor, recuperar, transformar; executar só no escopo autorizado | — |

Termo: **oráculo** é a fonte do resultado esperado com que um teste compara o comportamento
observado.

---

## 2. Registro de afirmação

Uma afirmação é qualquer enunciado sobre o sistema que alguém pode vir a tratar como regra.
Registre uma por bloco. As cinco práticas da página aparecem como `[1]` a `[5]`.

```yaml
# Modelo — copie e preencha
id: AF-000                          # identificador estável
afirmacao: >
  <enunciado, em uma ou duas frases>
status: hipotese                    # [2] fato | hipotese | proposta | decisao
origens:                            # [1] ao menos uma; quanto mais independentes, melhor
  - entrevista: <quem / área>
  - inspecao_de_codigo: <rotina, arquivo, versão>
  - documento: <nome e data; indique se está desatualizado>
  - observacao_operacional: <o que foi visto, por quem>
  - inferencia: <de quê, feita por quem; marque se foi o modelo>
parametros_em_aberto: nao_conhecido # [3] liste o que as fontes não resolvem
exemplos: []                        # [4] ids de exemplos: normal, limite, exceção
sugerido_pela_ia: []                # [4] candidatos; não são regra aprovada
risco: medio                        # [5] baixo | medio | alto; define a revisão exigida
decide: <papel com autoridade, conforme a matriz da §1>
pendencia: aberta                   # aberta | resolvida | risco_aceito
```

```yaml
# Exemplo — cenário ilustrativo: aprovação de proposta com desconto excepcional
id: AF-012
afirmacao: >
  Proposta com desconto acima do limite exige aprovação
  de pessoa autorizada e registro da justificativa.
status: hipotese
origens:
  - entrevista: operação comercial
  - inspecao_de_codigo: rotina de aprovação do legado
  - documento: manual de procedimentos (desatualizado)
limite_de_desconto: nao_conhecido   # as fontes divergem
exemplos: [EX-01, EX-02, EX-03]
sugerido_pela_ia: [EX-03]
risco: alto
decide: responsável pela política comercial
pendencia: aberta
```

Regras de uso:

- **Fato** exige ao menos uma fonte que não seja o modelo. Uma resposta plausível do modelo não
  é evidência de que a regra existe.
- **Hipótese** passa a **decisão** só por alguém com autoridade (§1), com data e justificativa.
- O modelo pode sugerir exemplos e afirmações; não promove nenhuma delas a regra aprovada.
- Mantenha a pendência visível até ser resolvida ou aceita como risco, com responsável.
- Revisão proporcional ao risco: decisões comerciais, regulatórias e de integração crítica passam
  por quem tem autoridade.

---

## 3. Registro de divergência

Não há fonte universal de verdade: intenção, especificação, testes, código e produção são
artefatos com papéis diferentes. Quando dois deles entram em conflito, registre o conflito, não
só a correção.

### 3.1 Modelo

```yaml
# Modelo — copie e preencha
id: DIV-000
estado: nao_conhecido               # ver §3.2
artefatos_em_conflito:
  - <artefato A e o que ele diz>
  - <artefato B e o que ele diz>
comportamento_divergente: >
  <o que difere, em termos observáveis>
causa_provavel: informacao_incompleta   # informacao_incompleta | defeito | mudanca_de_regra
                                        # | obsolescencia | erro_de_implementacao
roteamento: <quem decide, conforme §3.3>
gatilho_ou_evidencia: <o que revelou o conflito>
alternativas: []
decisao: <preencher só quando decidida>
decisao_ref: DEC-000
autoridade: <papel>
impacto: <o que muda e o que não muda>
artefatos_afetados: []
aprovadores: []
verificacao_posterior: <teste ou revisão que confirma a resolução>
```

```yaml
# Exemplo — cenário ilustrativo
id: DIV-007
estado: resolvido
artefatos_em_conflito:
  - teste de caracterização: o legado aprova desconto acima do limite sem aprovação
  - regra de negócio AF-012: acima do limite, exige pessoa autorizada e justificativa
comportamento_divergente: >
  A mesma proposta é aprovada direto pelo legado e deveria aguardar aprovação pela política atual.
causa_provavel: defeito
roteamento: responsável pela política comercial
decisao_ref: DEC-031
autoridade: responsável pela política comercial
impacto: o sistema novo não reproduz o comportamento do legado; o teste de caracterização fica
  como evidência sobre o legado, não como obrigação
verificacao_posterior: teste de aceitação cujo oráculo vem de AF-012 e DEC-031
```

### 3.2 Estados

| Estado | Quando usar |
|---|---|
| `nao_conhecido` | O conflito existe, mas ainda não se sabe qual artefato está certo, nem se algum está. |
| `ambiguo` | Há mais de uma interpretação plausível e nenhuma foi escolhida. |
| `spec_desatualizada` | A especificação diz uma coisa; teste e código concordam em outra, e a decisão vigente é a deles. |
| `teste_sem_requisito` | Existe um teste, e nenhuma regra registrada o justifica. |
| `requisito_sem_teste` | Existe uma regra aprovada, e nenhum teste a verifica. |
| `codigo_fora_da_spec` | O código faz algo que nenhuma regra registrada prevê. |
| `producao_divergente` | O comportamento em produção difere do que spec, testes e código afirmam. |
| `risco_aceito` | A divergência permanece, por decisão formal de quem tem autoridade, com responsável. |
| `bloqueado` | Falta decisão, informação ou acesso; registre de quem. |
| `resolvido` | Há decisão registrada e a verificação posterior passou. |

O agente nunca harmoniza silenciosamente versões conflitantes. Se não puder demonstrar a relação
entre dois artefatos, registra `nao_conhecido` ou propõe o link com status `inferido`.

### 3.3 Roteamento por tipo de conflito

| Tipo de conflito | Quem decide |
|---|---|
| Valor ou escopo | Dono de produto |
| Domínio ou regulação | Especialista autorizado |
| Implementação | Engenharia |
| Oráculo (resultado esperado de um teste) | Engenharia e domínio |
| Segurança | Função independente de segurança ou risco |

### 3.4 Tratamento por situação

| Situação identificada | Tratamento proposto |
|---|---|
| Comportamento intencional e ainda válido | Preservar e documentar |
| Defeito conhecido | Corrigir com aprovação e testes |
| Regra obsoleta | Descontinuar mediante decisão explícita |
| Informação insuficiente | Investigar e manter a pendência visível |
| Dependência de integração | Definir compatibilidade e estratégia de transição |

Duas consequências práticas:

- Um **teste de caracterização** registra o que o legado faz hoje, inclusive defeitos e regras
  obsoletas. É evidência sobre o legado, não obrigação para o sistema novo.
- Se o código novo não satisfaz um critério aprovado, **alterar o critério exige decisão
  explícita**. Editar o teste para ele passar é uma decisão sem registro.

### 3.5 Os artefatos, sua responsabilidade e seu limite

| Artefato | Responsabilidade | Limite |
|---|---|---|
| Contexto e objetivos | Registrar o problema e os resultados esperados | Não comprova que a solução alcançará os resultados |
| Regras de negócio | Registrar políticas aprovadas | Não garante a implementação correta |
| Exemplos e critérios de aceitação | Expressar comportamentos esperados | Não garantem a completude do domínio |
| Testes de caracterização | Registrar comportamentos observados no legado | Podem capturar defeitos e regras obsoletas |
| Testes de aceitação e regressão | Verificar comportamentos selecionados | Não comprovam todas as propriedades do sistema |
| Contratos de integração | Definir compatibilidade esperada | Não eliminam todos os riscos de evolução |
| Registros de decisão | Preservar justificativas e alternativas consideradas | Não garantem que uma decisão continuará adequada |
| Código | Implementar o comportamento em uma versão específica | Não comprova, por si só, aderência à intenção |

---

## 4. Checklist mínimo de divergência (drift)

Use a cada release, ou a cada mudança de regra relevante. Marque o que se aplica; o que não se
aplica fica registrado como tal, não em branco.

- [ ] Toda regra crítica tem id estável, dono e status (§2).
- [ ] Toda regra crítica aprovada tem ao menos um teste de aceitação.
- [ ] Cada critério crítico tem ao menos um teste que **não** nasceu do mesmo prompt nem do mesmo
      contexto da especificação.
- [ ] O oráculo de cada teste de aceitação foi definido ou validado por quem tem autoridade, antes
      de o teste ser gerado.
- [ ] Nenhum teste foi alterado para passar sem uma decisão registrada.
- [ ] Os testes de caracterização estão rotulados como evidência sobre o legado.
- [ ] Todo conflito aberto tem estado (§3.2), roteamento (§3.3) e responsável.
- [ ] Links de rastreabilidade propostos pelo modelo estão marcados como `inferido` até revisão.
- [ ] A especificação, os testes e o comportamento observado foram comparados neste ciclo.
- [ ] Decisões antigas conseguem ser explicadas: fonte, autor, data e justificativa estão no
      registro.
- [ ] Houve revisão por pessoa com autoridade nas regras de risco alto.

---

## 5. Protocolo de avaliação resumido

Objetivo: tornar a proposta **falsificável** no seu contexto. Nada aqui prevê um resultado.

### 5.1 Protocolo mínimo, em seis passos

1. Montar um **pacote de referência independente** (necessidades, regras, restrições e casos de
   fronteira) antes ou em paralelo à elicitação assistida por IA.
2. Conduzir a elicitação registrando a fonte de cada afirmação e separando fato, inferência e
   proposta.
3. Fazer **revisão cega** por pelo menos duas pessoas do domínio.
4. Medir depois da definição, da especificação, da implementação e da operação.
5. Publicar prompts, versões de modelo, artefatos e decisões de adjudicação, respeitando a
   privacidade.
6. Tratar qualquer melhoria como **evidência local**, não como validação geral do workflow.

### 5.2 Linha de base

Um processo humano ou híbrido alinhado ao que a ISO/IEC/IEEE 29148 e o SWEBOK descrevem, com o
mesmo contexto, as mesmas partes interessadas, o mesmo tempo e a mesma exigência de revisão, mas
sem a interface conversacional estruturada. Comparar apenas com "um prompt sem estrutura" é
secundário e não substitui essa linha de base. Fixe e registre: modelo e versão, prompts,
ferramentas, permissões, contexto, política de revisão, custo de inferência e tempo humano.

### 5.3 Hipóteses a testar (H1–H4)

Cada uma está formulada como pergunta aberta; resultado nulo ou negativo é resultado.

| Id | Tema | Hipótese |
|---|---|---|
| H1 | Qualidade da especificação | O workflow pode aumentar o recall de necessidades, restrições e exceções sem perder precisão, contra uma linha de base equivalente. |
| H2 | Ambiguidade e adjudicação | Pode reduzir a ambiguidade residual ou o tempo até uma decisão autorizada, mas pode aumentar ancoragem, falsa concordância ou custo de revisão. |
| H3 | Rastreabilidade | Pode aumentar a cobertura e/ou a precisão dos links antes e depois da especificação; o resultado não é presumido. |
| H4 | Implementação | Critérios produzidos pelo workflow podem melhorar a detecção de defeitos por testes ocultos, e não apenas fazer passar os testes escolhidos pelo próprio agente. |

### 5.4 Métricas, com definição

Toda métrica precisa de definição operacional, linha de base e período de observação. Mais
documentos ou mais testes não provam, sozinhos, que o sistema ficou mais sustentável.

**Processo de requisitos**

| Métrica | Definição |
|---|---|
| Recall de requisitos | Proporção dos itens aplicáveis do pacote de referência independente que foram cobertos por requisitos ou critérios formalizados. |
| Ambiguidade residual | Número de requisitos com mais de uma interpretação plausível após revisão independente, por 100 requisitos. |
| Divergências por release | Divergências detectadas entre especificação, testes e comportamento observado (produção ou testes de caracterização), por release ou por unidade de tempo, com a gravidade. |
| Precisão dos links de rastreabilidade | Links corretos recuperados ÷ links recuperados, contra um conjunto de referência. |
| Recall dos links de rastreabilidade | Links corretos recuperados ÷ todos os links corretos do conjunto de referência. |
| Cobertura por testes independentes | Proporção dos critérios de aceitação com ao menos um teste que não nasceu do mesmo prompt nem do mesmo contexto da especificação. |
| Proveniência completa | Proporção das afirmações e decisões com registro de agente, data, fonte e justificativa. |
| Tempo de reconstrução | Tempo necessário para reconstruir a justificativa de uma decisão antiga. |

**Resultado operacional**

| Métrica | Definição |
|---|---|
| Tempo de mudança de regra | Tempo para entender e implementar uma mudança de regra de negócio representativa. |
| Incidentes e regressões | Incidentes, regressões e correções emergenciais após a liberação, com a gravidade e o vínculo (ou não) com omissão ou ambiguidade de requisito. |
| Retrabalho por divergência | Retrabalho atribuído a divergência entre intenção e implementação; só é mensurável se a causa da divergência é classificada (§3.1). |
| Métricas DORA | Frequência de implantação, tempo de entrega de mudanças, taxa de falha de mudança e tempo de recuperação, como indicadores de capacidade de evolução. |

### 5.5 Escada de evidência

Subir um degrau exige evidência nova; o degrau de baixo não prova o de cima.

1. Capacidade do agente (a tarefa isolada)
2. Qualidade do artefato produzido
3. Resultado da tarefa
4. Resultado operacional
5. Resultado de negócio

Estado hoje: componentes do workflow foram estudados nos degraus 1 e 2, em tarefas isoladas e
majoritariamente de laboratório. Não foi localizado estudo controlado ou longitudinal do workflow
completo frente a uma linha de base alinhada à 29148 e ao SWEBOK.

---

## Referências

- ISO/IEC/IEEE 29148:2018 — *Systems and software engineering — Life cycle processes —
  Requirements engineering*.
- IEEE Computer Society. *Guide to the Software Engineering Body of Knowledge (SWEBOK Guide),
  Version 4.0a*, área de Requisitos de Software.
- NIST. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, função *Govern*.
- Autio, C. et al. (2024). *AI RMF: Generative AI Profile*. NIST AI 600-1.
  DOI 10.6028/NIST.AI.600-1.
- W3C. *PROV-DM: The PROV Data Model*.
- ISO/IEC/IEEE 15939:2017 e ISO/IEC 25010:2023 (medição e qualidade); DORA (métricas de entrega).
- Feathers, M. C. (2004). *Working Effectively with Legacy Code*. Prentice Hall.
- Beck, K. (2002). *Test-Driven Development: By Example*. Addison-Wesley.

As normas e guias citados são **fundamento** para o desenho dos modelos, não validação do
workflow: este kit é *compatível com* as atividades que a 29148 e o SWEBOK descrevem e
*inspirado em* a função *Govern* do NIST, sem reivindicar conformidade com nenhum deles.

*Procedência: síntese de documentos de pesquisa do autor (2026), conferidos contra as fontes
acima. Licença de uso: livre para adaptar, com atribuição.*
