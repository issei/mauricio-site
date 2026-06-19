# 00 — Visão do Produto, Personas e Objetivos Pedagógicos

> Cobre **visão do produto**, **personas** e **objetivos pedagógicos** do site
> "A Engenharia da Confiança: Da Intenção à Execução Agêntica".
> Base: [`docs/references/site.md`](../../../references/site.md) e os três pilares-fonte
> (ver [`README.md`](README.md)).

---

## 1. Visão do Produto

### 1.1 Tese central

> **A capacidade vem do modelo; a confiança vem da engenharia.** Um sistema de IA bem-sucedido tem
> muito pouca IA no caminho crítico — o resto é engenharia disciplinada ao redor de um componente
> estocástico. É essa disciplina que separa um protótipo encantador de um produto que aguenta produção.

O site existe para conduzir um profissional (ou líder) **do encantamento para a disciplina**: sair de
tratar a IA como mágica e passar a tratá-la como engenharia. A travessia é narrada em quatro módulos
que reaproveitam três corpos de conteúdo já produzidos — Engenharia Reversa, Engenharia de Agentes e
Vibe Coding com Devin — costurando-os numa única jornada coerente.

### 1.2 Declaração de produto (elevator pitch)

> Uma jornada educacional em quatro módulos que transforma três documentos técnicos densos numa
> narrativa única e progressiva. O leitor entra ouvindo "por que minha IA falha?" e sai sabendo
> diagnosticar o **Crash Silencioso**, mapear a verdade de um sistema legado, arquitetar confiança com
> princípios determinísticos e operar como **Orquestrador Cognitivo** via Spec-Driven Development.
> Cada módulo é uma porta de entrada curada para a página-fonte correspondente — o site novo dá a
> narrativa; as páginas existentes dão a profundidade interativa.

### 1.3 O arco narrativo (do Caos à Governança)

```
  CAOS                                                              GOVERNANÇA
  IA como Mágica  ───────────────────────────────────────────►  IA como Engenharia

  [M0] Despertar      [M1] Mapear           [M2] Arquitetar       [M3] Orquestrar
  "por que falha?"    o Implícito→Explícito  a Confiança           a Intenção
  Crash Silencioso    As-Is → To-Be          Determinismo + MCP    SDD + Skills/Knowledge
       │                   │                       │                     │
       └─ reconhece o ─────┴─ revela a verdade ────┴─ governa o ─────────┴─ escala a
          problema            do legado               comportamento          intencionalidade
```

### 1.4 Princípio de produto (dogfooding)

O site **pratica o que ensina**. Isto é estratégia de credibilidade, não coincidência:

| Princípio ensinado | Como o site o aplica em si mesmo |
| :-- | :-- |
| Determinístico-primeiro | Conteúdo e navegação são estáticos e determinísticos; nada depende de chamar um LLM em runtime. |
| Pouca IA no caminho crítico | O site não executa modelos ao vivo; é conteúdo curado e referenciado. |
| Reaproveitamento sobre reinvenção | A jornada referencia páginas existentes em vez de duplicar conteúdo — espelha a regra "não pague duas vezes pelo mesmo processamento". |
| Rastreabilidade | Todo conceito técnico tem um link para o arquivo-fonte no repositório (ver 05). |
| Open-World / honestidade | Onde uma transição é hipótese editorial e não vem de uma fonte, isso é sinalizado como `Nota editorial`. |

### 1.5 Proposta de valor por resultado de aprendizagem

Ao final, o leitor consegue:

1. **Reconhecer** o Crash Silencioso e o Vazamento de Modo num sistema real.
2. **Mapear** a verdade de um legado: tornar o implícito explícito antes de modernizar (As-Is → To-Be).
3. **Justificar** uma arquitetura confiável: determinístico-primeiro, Cérebro × Vitrine, contratos
   rígidos, MCP como fronteira.
4. **Operar** como Orquestrador Cognitivo: escrever a especificação como fonte da verdade (SDD) e
   acumular inteligência organizacional (Skills, Playbooks, Knowledge).

### 1.6 Não-objetivos (o que o site **não** é)

- Não é um curso de prompt engineering nem de uma ferramenta específica.
- Não duplica o conteúdo das três páginas-fonte — é a **camada narrativa** que as conecta.
- Não executa LLMs ao vivo.
- Não promete "construir o agente para você" — ensina a *pensar* o sistema confiável.

---

## 2. Personas

> Cinco personas, cada uma com **dores · objetivos · objeções · fluxo ideal**. O fluxo referencia os
> módulos (02) e as páginas-fonte.

### Persona 1 — Líder técnico / Tech Lead · "Camila"

- **Perfil:** lidera squad que usa IA sem padrão comum; cada dev "vibe coda" de um jeito.
- **Dores:** PRs com alucinações; custo imprevisível; falta de vocabulário para padronizar; sente que
  a IA "amplifica a confusão" do time em vez da clareza.
- **Objetivos:** sair com um modelo mental e um vocabulário (Crash Silencioso, contratos, SDD) para
  alinhar o time.
- **Objeções:** "não tenho tempo para um curso longo"; "preciso de algo acionável".
- **Fluxo ideal:** M0 (o despertar) → M2 (arquitetura) → M3 (SDD e governança). **Entra pela dor de
  liderança.**

### Persona 2 — Arquiteto / Enterprise Architect · "Daniel"

- **Perfil:** desenha modernização de sistemas legados (ex.: ecossistema Salesforce maduro).
- **Dores:** conhecimento tribal preso em milhares de linhas de Apex e Flows; medo de perder regra
  crítica na migração; pressão por modernizar sem mapa.
- **Objetivos:** método para congelar o As-Is com fidelidade e embasar decisões To-Be auditáveis.
- **Objeções:** "preciso de profundidade e trade-off, não de slogan".
- **Fluxo ideal:** M1 (mapear a verdade) em profundidade → M2 (arquitetura) → página
  `proposta-engenharia-reversa.html`. **Entra pela Fundação.**

### Persona 3 — Dev migrando para IA · "Rafael"

- **Perfil:** back-end clássico, encantado e ameaçado pela IA; fez demos que "funcionaram na minha
  máquina".
- **Dores:** demos viram bugs irreprodutíveis; medo de obsolescência; trata o modelo como mágica.
- **Objetivos:** aplicar a engenharia que já domina (contratos, testes, idempotência) ao componente
  estocástico.
- **Objeções:** "isso não é só hype reembalado?".
- **Fluxo ideal:** jornada linear completa M0 → M1 → M2 → M3, com mergulho em cada página-fonte.
  **Aprende fazendo a trilha inteira.**

### Persona 4 — Executivo avaliando adoção de IA · "Sr. Tanaka"

- **Perfil:** diretor/C-level; decide investir ou não; pensa em ROI, risco e reputação.
- **Dores:** "conta de nuvem-surpresa"; medo de decisão de negócio errada tomada com falsa confiança.
- **Objetivos:** sair com 3–4 frases defensáveis sobre por que a disciplina reduz risco e viabiliza ROI.
- **Objeções:** "não vou ler documentação técnica; mostre por que importa pro negócio".
- **Fluxo ideal:** M0 completo → blocos "Benefício para o Negócio" de cada módulo → sai. **Experiência
  curta, alto impacto, zero exercício obrigatório.**

### Persona 5 — Estudante avançado / curioso disciplinado · "Bianca"

- **Perfil:** quer profundidade real e gratuita; explora todas as referências.
- **Dores:** material acadêmico desatualizado; tutoriais superficiais.
- **Objetivos:** dominar os conceitos a fundo, percorrer todas as páginas-fonte e o glossário.
- **Fluxo ideal:** jornada 100% + todos os links cruzados + glossário. **Completista.**

### 2.1 Matriz persona × modo de entrada

| Persona | Entrada dominante | Profundidade | Página-fonte mais relevante |
| :-- | :-- | :-- | :-- |
| Camila (tech lead) | M0 → M2 → M3 | Média | `engenharia-agentes-ia.html`, `devin.html` |
| Daniel (arquiteto) | M1 em profundidade | Muito alta | `proposta-engenharia-reversa.html` |
| Rafael (dev migrando) | Trilha linear completa | Alta | Todas |
| Sr. Tanaka (executivo) | M0 + benefícios | Baixa | Nenhuma (fica na camada narrativa) |
| Bianca (estudante) | Completista | Máxima | Todas + glossário |

> **Implicação de design (crítica).** O site serve **dois modos**: **trilha linear** (Rafael, Bianca)
> e **entrada por módulo/dor** (Camila, Daniel, executivo). Isso define a **navegação dual** em
> [01](01_arquitetura_informacao_e_sitemap.md).

---

## 3. Objetivos Pedagógicos

### 3.1 Modelo de Maturidade (Da Mágica ao Governado)

Eixo pedagógico mestre do site. Cada módulo move o leitor um degrau acima. O CTA de reflexão ao final
de cada página pergunta: **"Em que estágio está o seu sistema/time hoje?"**

| Estágio | Nome | Sintoma | Módulo que ataca |
| :-: | :-- | :-- | :-- |
| 1 | **Mágica** | "Funcionou na demo." Confia no resultado bonito sem entender por quê. | M0 |
| 2 | **Consciência** | Reconhece o Crash Silencioso e o resíduo interpretativo; sabe o que não sabe. | M0 → M1 |
| 3 | **Mapeado** | Tornou o implícito explícito; tem inventário de comportamentos do As-Is. | M1 |
| 4 | **Arquitetado** | Comportamento governado por contratos, determinismo e fronteiras (MCP). | M2 |
| 5 | **Governado / Intencional** | Especificação é a fonte da verdade; inteligência organizacional acumula em Skills/Knowledge. | M3 |

### 3.2 Objetivos de aprendizagem por módulo (mensuráveis)

Cada objetivo é redigido como "o leitor consegue…" e tem um **gate de reflexão** correspondente.

| Módulo | Objetivo de aprendizagem | Gate de reflexão (CTA) |
| :-: | :-- | :-- |
| M0 | Distinguir falha *com* erro de código de falha *sem* erro (Crash Silencioso) e nomear a falha de intenção. | "Aponte um Crash Silencioso que você viveu: que valor se perdeu sem nenhum alerta vermelho?" |
| M1 | Separar o que é regra de negócio *explícita* do que é conhecimento *implícito* (tácito) num legado. | "Quanto da lógica crítica do seu sistema vive só na cabeça de poucas pessoas?" |
| M2 | Justificar por que determinismo, contratos e a separação Cérebro × Vitrine aumentam a confiança. | "Onde, no seu sistema, a saída de um LLM toca dados sem passar por um contrato?" |
| M3 | Explicar a transição de Executor para Orquestrador Cognitivo e o papel da spec como fonte da verdade. | "Sua intenção vive num prompt efêmero ou numa especificação versionada?" |

### 3.3 Objetivo terminal (capstone narrativo)

Ao concluir os quatro módulos, o leitor consegue **contar a história inteira com vocabulário próprio**:
por que a IA falha silenciosamente, como revelar a verdade de um sistema, como arquitetar confiança e
como escalar a intencionalidade — e localizar o próprio time no Modelo de Maturidade, com um próximo
passo concreto.

### 3.4 Princípio pedagógico mestre

> **Tudo que aparece ensina ou conecta; nada é decorativo.** Cada elemento visual (analogia, diagrama
> Mermaid, faixa de referência cruzada) precisa mover o leitor um passo na maturidade ou encaminhá-lo
> à fonte. Toda visualização tem equivalente textual — a narrativa funciona mesmo sem o "show"
> (ver 03 e 04).

---

### Referências cruzadas

- Navegação dual e sitemap → [01](01_arquitetura_informacao_e_sitemap.md)
- Detalhamento dos 4 módulos e CTAs → [02](02_jornada_de_aprendizagem.md)
- Glossário e links conceito→arquivo → [05](05_glossario_e_referencias_cruzadas.md)
- Faseamento e riscos → [06](06_estilo_roadmap_esforco_riscos.md)
