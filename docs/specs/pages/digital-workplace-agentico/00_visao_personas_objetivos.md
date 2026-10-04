# 00 — Visão, personas e objetivos

## 1. Problema que a página resolve

Quem conduz um portal corporativo hoje ouve duas promessas contraditórias: "coloque um agente de
IA na frente de tudo" e "primeiro arrume a casa". Falta um mapa que mostre, camada por camada, **o
que precisa existir antes** de um agente poder agir em nome de um colaborador, e **por que** pular
etapas produz incidentes. A página publica esse mapa como peça editorial navegável.

## 2. O que a página precisa provar (objetivos)

| # | Objetivo | Como a página demonstra | Evidência de sucesso |
| :-- | :-- | :-- | :-- |
| O1 | Portal que **apresenta** é diferente de plataforma que **resolve** | Hero (V1) + modelo de maturidade (V2) | leitor consegue nomear o estágio do próprio portal |
| O2 | Agentes dependem de fundações; autonomia sobe com evidência | Arquitetura de referência (V3), escada de autonomia (V6) | seção `#confianca` lida (scroll depth) |
| O3 | AG-UI e UI generativa são **transporte e catálogo**, não mágica | Fluxo ponta a ponta (V4) com famílias de eventos | FAQ AEO sobre AG-UI citada por answer engines |
| O4 | Não existe arquitetura ideal única: há trade-offs explícitos | Trade-offs, anti-patterns e matriz tecnológica | tempo na seção `#decisoes` |
| O5 | Existe um caminho incremental, jornada por jornada | Roadmap (V7) + índice de prontidão interativo (V8) | interações com V8 |

## 3. Personas

| Persona | Pergunta que traz | Seção de entrada |
| :-- | :-- | :-- |
| **Arquiteta corporativa / de solução** | "Onde ficam regra, estado, autorização e auditoria quando o agente age?" | `#arquitetura`, `#fluxo` |
| **Product manager de experiência do colaborador** | "Por qual jornada começo e como meço?" | `#roadmap`, `#prontidao` |
| **UX / service designer** | "Como o agente compõe tela sem destruir o design system?" | `#pilares` (UI generativa), `#fluxo` |
| **Especialista em IA** | "O que meu RAG precisa antes de ir para produção?" | `#conhecimento` |
| **Segurança e compliance** | "Com que identidade o agente age? Quem aprova?" | `#confianca` |
| **SRE / plataforma** | "O que é um SLO de qualidade para um agente?" | `#decisoes`, `#roadmap` |
| **Liderança executiva** | "Em que estágio estamos e qual o próximo passo seguro?" | `#maturidade`, "Em síntese" |

## 4. Escopo

**Dentro:**
- Síntese editorial das seções do estudo (doc 01 §2), com selos epistêmicos.
- Oito visualizações (doc 02), todas legíveis sem JavaScript.
- Índice de prontidão agêntica interativo (cálculo local, sem envio de dados).
- Markdown companheiro `public/digital-workplace-agentico.md`, AEO (TechArticle, FAQPage, DefinedTermSet).
- Gêmeo em inglês gerado (`/en/`), nunca editado à mão.
- Guarda legal automatizada (doc 06).

**Fora (não-escopo):**
- Qualquer estudo de caso, menção a organização real como exemplo, logotipo, captura de tela de produto corporativo.
- Narrativa autobiográfica que relacione o estudo a empregadores ou clientes do autor (o `cv.json` lista empregadores; a página não pode apontar para eles nem ser lida como relato de projeto interno).
- Publicação dos 23 arquivos da fonte como páginas separadas (decisão D-3).
- Recomendações de fornecedor como "a escolha certa": a matriz compara, não elege.
- Demo funcional de agente ou de AG-UI ao vivo (sem backend; o fluxo é ilustrado, não executado).

## 5. Princípios editoriais

1. **Engenharia, não marketing** (agente `tone-reviewer`): proibido "revolucionário", "disruptivo",
   "transforma", "garante".
2. **A página não afirma mais que a fonte.** Um `[HIPÓTESE]` não vira fato no texto corrido.
3. **Genérico por construção.** O sujeito das frases é "um portal corporativo de grande porte",
   "a organização", "o colaborador". Exemplos de jornada (férias, chamado de TI, reembolso,
   inclusão de dependente) são universais de RH e TI.
4. **Sem prazos inventados.** O roadmap tem fases e critérios de passagem, não datas.
