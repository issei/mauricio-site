# 04 — Visualizações Interativas e Diagramas Mermaid

> Cobre os **diagramas Mermaid** (instrução explícita de [`site.md`](../../../references/site.md):
> *"use Mermaid.js para os diagramas de fluxo, especialmente o pipeline determinístico"*) e as
> **analogias visuais** (Chef de Cozinha e Freio de F1).
> Cada bloco traz a ficha-padrão e o **código Mermaid pronto para colar**.

> **Nota para o desenvolvedor.** Todo diagrama deve vir acompanhado de seu **equivalente textual**
> (atributo `altText` do componente `MermaidDiagram`, 03 §3). O diagrama é reforço, não pré-requisito.

---

## 1. Módulo 0 — Falha clássica × Crash Silencioso

**Objetivo:** mostrar que a ausência de erro não é ausência de falha.
**Complexidade:** Baixa. **Risco:** o verde "enganoso" pode confundir → legenda explícita.

```mermaid
flowchart LR
    A[Tarefa entregue à IA] --> B{O código quebra?}
    B -- Sim --> C[🔴 Erro visível<br/>stack trace, alerta]
    C --> C1[Você conserta. Barulhento, mas seguro.]
    B -- Não --> D[✅ Demo encanta<br/>resultado parece perfeito]
    D --> E{A intenção foi cumprida?}
    E -- Não, mas ninguém percebe --> F[☠️ CRASH SILENCIOSO<br/>valor perdido sem alerta]
    E -- Sim --> G[Sucesso real]
    style F fill:#3a0d0d,stroke:#ff5555,color:#ffd5d5
    style C fill:#1a2733,stroke:#007bff,color:#cfe8ff
```

**Equivalente textual:** uma tarefa entregue à IA segue dois caminhos. Se o código quebra, há erro
visível — barulhento, mas seguro de corrigir. Se não quebra, a demo encanta; aí a pergunta decisiva é
se a *intenção* foi cumprida. Quando não foi e ninguém percebe, ocorre o Crash Silencioso: perda de
valor sem nenhum alerta.

---

## 2. Módulo 1 — Descoberta guiada por jornadas críticas (As-Is)

**Objetivo:** ilustrar a estratégia top-down: partir da jornada de negócio, seguir o call stack e
isolar o código morto. **Complexidade:** Média.

```mermaid
flowchart TD
    J[Jornada crítica de negócio<br/>ex.: Lead-to-Cash] --> T[Gatilho inicial]
    T --> S[Seguir a trilha de execução / call stack]
    S --> C1[Apex Classes]
    S --> C2[Flows]
    S --> C3[Integrações / ERP]
    C1 & C2 & C3 --> INV[Inventário de Comportamentos]
    INV --> R1[Regras de Negócio Core]
    INV --> R2[Efeitos Colaterais]
    INV --> R3[Workarounds & Exceções]
    Z[Código morto / zumbi<br/>fora de toda jornada] -. isolado e descartado .-> X((✂))
    style Z fill:#2a2a2a,stroke:#888,color:#bbb
    style INV fill:#1a2733,stroke:#8a2be2,color:#e6d5ff
```

**Equivalente textual:** a descoberta parte de uma jornada crítica de negócio, segue o gatilho pelo
call stack e mapeia todos os componentes que ela toca (classes, flows, integrações), produzindo o
Inventário de Comportamentos (regras core, efeitos colaterais, workarounds). O código que não pertence
a jornada alguma é identificado como morto e isolado.

---

## 3. Módulo 2 — Pipeline determinístico (DAG) · diagrama-chave

**Objetivo:** mostrar que o LLM é chamado *dentro* de uma etapa fixa e nunca decide a próxima — o
oposto do "agente livre". É o diagrama central pedido por `site.md`. **Complexidade:** Média.

```mermaid
flowchart LR
    IN[Entrada] --> V1[Validação determinística<br/>regras + dados]
    V1 --> P[Poda precoce<br/>filtro barato primeiro]
    P --> RES[Resíduo interpretativo]
    RES --> LLM[[LLM<br/>chamado DENTRO da etapa]]
    LLM --> CT{Contrato rígido<br/>schema valida a saída}
    CT -- inválido --> REJ[🚫 Rejeita / degrada para incerteza]
    CT -- válido --> OUT[Saída confiável]
    LED[(Ledger de quota)] -. governa custo .-> LLM
    style LLM fill:#2a1a3a,stroke:#8a2be2,color:#e6d5ff
    style CT fill:#1a2733,stroke:#007bff,color:#cfe8ff
    style REJ fill:#3a0d0d,stroke:#ff5555,color:#ffd5d5
```

**Equivalente textual:** a entrada passa por validação determinística e poda precoce; só o resíduo
interpretativo chega ao LLM, que é invocado dentro de uma etapa fixa. A saída do modelo é validada por
um contrato rígido: se inválida, é rejeitada ou degradada para incerteza; se válida, vira saída
confiável. Um ledger de quota governa o custo da chamada. O LLM nunca decide qual é a próxima etapa.

### 3.1 Cérebro × Vitrine (complementar)

```mermaid
flowchart LR
    subgraph Vitrine [Vitrine — leve, exposta]
        UI[Interface / API pública]
    end
    subgraph Cerebro [Cérebro — pesado, sensível]
        ENG[Motor cognitivo]
        DB[(Dados)]
    end
    UI <-->|contrato estreito / HTTP| ENG
    ENG --- DB
    style Cerebro fill:#1a2733,stroke:#007bff,color:#cfe8ff
    style Vitrine fill:#2a1a3a,stroke:#8a2be2,color:#e6d5ff
```

**Equivalente textual:** a Vitrine (interface exposta, leve) e o Cérebro (motor cognitivo pesado com
acesso a dados) são sistemas separados, ligados por um contrato estreito. A Vitrine nunca toca os dados
diretamente.

---

## 4. Módulo 3 — Fluxo Spec-Driven Development

**Objetivo:** mostrar a spec como fonte da verdade e o ciclo Spec → Retrieve → Refatorar → Validar com
loop de feedback. **Complexidade:** Baixa.

```mermaid
flowchart LR
    SPEC[📜 SPEC<br/>definição SDD = fonte da verdade] --> RET[🔍 RETRIEVE<br/>descoberta autônoma do contexto]
    RET --> REF[✏️ REFATORAR<br/>edição guiada pela spec]
    REF --> VAL{✅ VALIDAR<br/>testes BDD / Apex Tests}
    VAL -- falha --> REF
    VAL -- passa --> DONE[Comportamento provado = intenção cumprida]
    DONE -. lições .-> KN[(Knowledge<br/>ativo que cresce)]
    style SPEC fill:#1a2733,stroke:#007bff,color:#cfe8ff
    style VAL fill:#2a1a3a,stroke:#8a2be2,color:#e6d5ff
```

**Equivalente textual:** a spec SDD é a fonte da verdade; a partir dela a IA descobre o contexto
(retrieve), refatora guiada pela spec e valida com testes. Se falha, volta a refatorar; se passa, a
intenção está cumprida e as lições alimentam o Knowledge organizacional.

---

## 5. Régua do Modelo de Maturidade (fecho)

**Objetivo:** visualizar a progressão 1→5 e mapear cada módulo ao degrau que ele ataca.
**Complexidade:** Baixa.

```mermaid
flowchart LR
    M1[①Mágica] --> M2[②Consciência] --> M3[③Mapeado] --> M4[④Arquitetado] --> M5[⑤Governado]
    Mod0([Módulo 0]) -.-> M2
    Mod1([Módulo 1]) -.-> M3
    Mod2([Módulo 2]) -.-> M4
    Mod3([Módulo 3]) -.-> M5
    style M5 fill:#0d3a1a,stroke:#55ff99,color:#d5ffe6
    style M1 fill:#2a2a2a,stroke:#888,color:#bbb
```

---

## 6. Analogias visuais (não-Mermaid)

### 6.1 O Chef de Cozinha (julgamento humano × execução da máquina) — Módulo 3

| Papel | Quem | O que faz |
| :-- | :-- | :-- |
| O cliente | A intenção / o negócio | Define o que precisa ser entregue. |
| O cozinheiro | A IA (ferramenta) | Executa com velocidade e técnica. |
| **O chef executivo** | **Você** | Não cozinha cada prato — **garante que cada prato saia certo**. Julgamento, padrão, contexto. |

- **Ficha:** ilustração em 3 camadas (SVG ou ícones). **Objetivo:** explicar que a maestria é
  julgamento, não digitação. **Complexidade:** Baixa.

### 6.2 O Freio de F1 (restrições aumentam a velocidade segura) — Módulo 2

> Um carro de F1 não anda rápido *apesar* dos freios — anda rápido **por causa** deles. É o freio
> potente que dá ao piloto a coragem de chegar voando na curva. Contratos, determinismo e fail-closed
> são os freios que permitem inovar com IA em alta velocidade sem sair da pista.

- **Ficha:** imagem/ícone + legenda. **Objetivo:** desarmar a objeção "rigor atrasa a inovação".
  **Complexidade:** Baixa.

### 6.3 O Amplificador (clareza × confusão) — Módulo 0

> A IA é um amplificador: mesmo sinal, ganho alto. Clareza organizacional sai amplificada; confusão
> também — só que mais rápido e com cara de competência.

---

## 7. Configuração técnica do Mermaid

- **Lib:** Mermaid.js via CDN (`https://cdnjs.cloudflare.com/ajax/libs/mermaid/...`), `startOnLoad: false`,
  render manual após o conteúdo carregar.
- **Tema:** `theme: 'base'` com `themeVariables` ajustadas ao Dark Tech (fundo `#0d1117`, linhas
  `#30363d`, destaque `#007bff`/`#8a2be2`, texto claro).
- **Acessibilidade:** cada bloco renderiza dentro de `MermaidDiagram` com `altText` (equivalentes
  textuais acima). Em `prefers-reduced-motion`, sem animação de entrada.
- **Fallback:** se o render falhar, exibir o `altText` em destaque (nunca deixar área vazia).

---

### Referências cruzadas

- Onde cada diagrama aparece na narrativa → [02](02_jornada_de_aprendizagem.md)
- Componente `MermaidDiagram` e `AnalogyBlock` → [03](03_wireframes_e_catalogo_de_componentes.md)
- Tokens de cor do tema → [06](06_estilo_roadmap_esforco_riscos.md) §2
