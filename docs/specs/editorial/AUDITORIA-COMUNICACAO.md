# AUDITORIA-COMUNICACAO — auditoria editorial do acervo (Fase 1)

> Metaprompt: "Auditoria editorial e otimização da comunicação" (Issei, 27/10/2026).
> Data: 2026-10-27. Status: **Fase 1 concluída (descoberta e inventário). Fases 2 a 12 não iniciadas.**
> Nenhuma página foi alterada. Este documento só registra o que foi medido.

## 1. Avaliação do metaprompt

**Pontos fortes.** O metaprompt separa profundidade de excesso (classes A–D), proíbe métricas
inventadas, trata a precisão como restrição e não como peso, e pede a intervenção menos complexa.
Essas regras protegem o que o site tem de melhor: ressalvas explícitas, hipóteses marcadas
como hipóteses e limitações declaradas.

**Lacunas no contexto deste repositório.**

1. **Ignora o trabalho anterior.** Já existem três camadas editoriais:
   [`EDITORIAL-AUDIT.md`](EDITORIAL-AUDIT.md) (08/10, inventário, classificação e catálogo),
   [`EDITORIAL-LAYER.md`](EDITORIAL-LAYER.md) (orientação aplicada a 12 páginas) e
   [`PTBR-CONTROLADO-PAGINAS.md`](PTBR-CONTROLADO-PAGINAS.md) (revisão de frase em 35 páginas).
   Refazer as Fases 1, 4 e 8 do zero contraria a regra 18 do próprio metaprompt. Ajuste aplicado:
   esta auditoria é **incremental**. Ela atualiza o inventário e concentra o esforço novo no que
   ninguém mediu: prolixidade no nível do argumento (Fases 2, 3, 5 e 9).
2. **O guia editorial (Fase 8) não pode ser um padrão paralelo.** Ele deve compor com a skill
   `ptbr-controlado` (frase), a camada editorial (orientação) e o `STYLE_GUIDE.md` (visual).
   Ajuste: a Fase 8 vai entregar só o que falta, como delta desses três.
3. **Fonte da verdade é o código, não o site publicado.** Parte do texto é gerada: blocos `AEO`
   (Em síntese + FAQ, fonte `scripts/seo/pages.mjs`), `EDITORIAL` (fonte
   `scripts/editorial/editorial.data.mjs`), `PF`/`CV` (fonte `public/cv.json`) e todo o `/en/`.
   Cada recomendação do backlog precisa apontar o arquivo-fonte, senão a edição é sobrescrita.
4. **Repetição deliberada.** O bloco "Em síntese" + FAQ repete o corpo de propósito (AEO/GEO).
   Ele deve ser avaliado como resumo, não contado como redundância.
5. **Escopo.** Ficam fora: páginas não listadas ou `noindex` (`/proposta`,
   `/entrevista-acessibilidade-streaming`), ferramentas internas, o espelho `/en/` e as
   narrativas pessoais (`life`, `life3d`, `terminal-evolutivo`), que o piloto recomendou não
   reescrever. A página `digital-workplace-agentico` não pode citar a empresa de referência;
   nenhuma sugestão pode reintroduzi-la.
6. **Rubrica com falsa precisão.** Uma nota 0–100 com seis pesos sobre 37 páginas tende a parecer
   mais exata do que é. Ajuste proposto: dar nota só às páginas lidas por inteiro e usar faixas
   (1–5 por dimensão, sem decimal na média).
7. **Volume de saída.** Três versões (conservadora, estrutural, executiva) para cinco páginas, mais
   onze seções de relatório, arriscam produzir o texto prolixo que a auditoria quer evitar.
   Ajuste proposto: versão executiva só na página executiva da amostra, e relatório final com
   sumário de uma tela.

## 2. Método e cobertura da Fase 1

- **Fontes:** `src/*.html` (47 arquivos), a lista de exclusão do sitemap em `vite.config.js`, o
  catálogo (`src/catalogo.html`), `scripts/seo/pages.mjs` (público e tese declarados) e
  `scripts/editorial/editorial.data.mjs` (formato).
- **Site publicado:** não consultado. O ambiente em nuvem bloqueia o domínio (CONNECT 403). Como o
  site é gerado deste repositório, o código-fonte na `main` (`906bcc9`, 25/10) é a fonte usada.
- **Páginas identificadas:** 37 públicas (as 36 do sitemap e `boutique-empresarial-showcase`, que o
  catálogo lista mas o sitemap exclui). Fora: 10 utilitárias ou não listadas.
- **Medição:** texto visível de cada página, sem `<header>`, `<nav>`, `<footer>`, código em `<pre>`,
  scripts e blocos gerados (AEO, EDITORIAL). Tempo = palavras / 200, o mesmo critério do gerador
  da camada editorial. Frases separadas por pontuação final seguida de maiúscula.
- **Inspeção:** nesta fase as páginas foram **medidas por inteiro**, não **lidas** com olhar
  editorial. As teses vêm do hero, da síntese ou do `pages.mjs`. Toda célula de "problema" abaixo
  é sinal métrico a confirmar na Fase 2, não diagnóstico.

**Limitações.** As métricas são heurísticas: listas e tabelas baixam a média de frase; conteúdo
dentro de `details` e abas conta como texto corrido; `life` e `life3d` têm o texto em JavaScript e
não foram medidas. Não há dados de audiência, tempo de leitura real nem testes com leitores.

## 3. O que a Fase 1 encontrou

**Observações (medidas):**

1. **O volume está concentrado.** Seis páginas passam de 5 500 palavras e somam 47 700 das cerca de
   112 000 do acervo (43%): `digital-workplace-agentico` (~70 min), `aprendizagem-autorregulada-artigo`
   (~50 min), `engenharia-confianca` (~34 min), `case-agents`, `agent-ready` e `devin` (~28–29 min).
2. **A frase, em geral, não é longa.** Nas 35 páginas com texto medível, a frase média fica entre 7 e 18 palavras
   em 33, e menos de 6% das frases passam de 35 palavras em 33. Exceções: `devops-salesforce` (21,7 palavras por
   frase; 14,4% acima de 35) e `curiosidade-e-investigacao` (9,7% acima de 35; parágrafo médio de
   32 palavras). O catálogo (20,1) é lista de descrições, não prosa.
3. **Não há cópia de texto entre páginas.** A sobreposição de sequências de 8 palavras é próxima de
   zero entre todos os pares. A única exceção é `index` × `curriculo` (77%), que é intencional: os
   dois são gerados do mesmo `cv.json`.
4. **A sobreposição é de conceitos, não de texto.** Os mesmos conceitos autorais aparecem em várias
   páginas: "Crash Silencioso" (34 vezes em `engenharia-confianca`, 11 em `case-agents`),
   "fail-closed" (25 em `engenharia-confianca`, 6 em `engenharia-agentes-ia`), "Cérebro × Vitrine"
   (18 e 16), "determinístico-primeiro" (10 e 7). Ver §5.
5. **O FAQ gerado não copia o corpo.** Entre 0% e 27% das sequências de 6 palavras do FAQ aparecem no
   corpo. Se há repetição, ela é de paráfrase; só a leitura da Fase 2 confirma.
6. **Estrutura muito fragmentada em poucas páginas.** `digital-workplace-agentico` tem 17 `h2` e
   102 `h3`; `devin` tem 61 `h3`; `knowledge-os-presentation`, 56.

**Achados de arquitetura (objetivos, independem de leitura):**

7. **O gêmeo Markdown do catálogo está desatualizado.** `/catalogo.md` não lista
   `develop-engineering` nem `boutique-empresarial-showcase` e não tem o "Comece por aqui" que o HTML
   tem. Fonte: `mdSections` do catálogo em `scripts/seo/pages.mjs` (data de atualização: 21/06).
   Agentes que leem o `.md` recebem um mapa diferente do que as pessoas veem.
8. **`boutique-empresarial-showcase` está em estado ambíguo.** O catálogo lista a página, ela tem
   `canonical` e JSON-LD de FAQ e não tem `noindex`, mas o sitemap a exclui.
9. **Rótulos do catálogo que não batem com o conteúdo.** `aprendizagem-autorregulada` está rotulada
   "Revisão científica", mas é a síntese; a revisão é a página `-artigo`. `devin`
   ("Apresentação · Engenharia agêntica") está no pilar Fundação/Mentalidade, ao lado de ensaios
   sobre pensamento, e não no pilar Método.
10. **Títulos longos.** O `<title>` de `curiosidade-e-investigacao` tem 88 caracteres e o de
    `case-agents` tem 84 (resultados de busca cortam perto de 60).
11. **Detalhe de configuração.** `vite.config.js` exclui `/proposta` do sitemap duas vezes.

**Inferência (a confirmar na Fase 2):** a percepção de prolixidade do autor parece vir menos do
tamanho da frase e mais de três fontes: volume total de algumas páginas, número de conceitos
autorais por página e o mesmo arcabouço reexplicado em páginas vizinhas.

## 4. Inventário editorial

IDs ordenados por extensão. "Lote de leitura" indica em que lote a página será lida na Fase 2;
"fora" marca páginas que não entram na análise de prolixidade (narrativa pessoal ou texto legal).
Intervenção e prioridade (P0–P3) só serão atribuídas depois da leitura; atribuí-las agora seria
avaliar por título e métrica, o que a regra 13 do metaprompt proíbe.

### 4.1 Identidade

| ID | Página | Categoria (pilar do catálogo) | Formato | Público principal | Objetivo | Tese (citação ou condensação da própria página) |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| ED-01 | [Digital Workplace agêntico](/digital-workplace-agentico) | Engenharia de Confiança | Estudo técnico | Arquitetura corporativa, produto, UX, segurança, SRE | Explicar e apoiar decisão | Um portal corporativo evolui para resolver intenções; o agente só é tão bom quanto as fundações que atravessa. |
| ED-02 | [Do resumo à nova pergunta: o que a ciência permite afirmar s](/aprendizagem-autorregulada-artigo) | fora do catálogo | Revisão científica | Pesquisa, educadores, pós-graduação | Informar com evidência | O ciclo é uma arquitetura plausível; cada elo tem evidência própria e o pacote completo não foi testado. |
| ED-03 | [A Engenharia da Confiança](/engenharia-confianca) | Engenharia de Confiança | Framework / jornada | Engenharia e gestão | Ensinar e posicionar | A capacidade vem do modelo; a confiança vem da engenharia. |
| ED-04 | [Case Agents](/case-agents) | Engenharia de Confiança | Case técnico | Engenheiros de IA, arquitetos, tech leads | Demonstrar com evidência | Escolher a tool certa é capacidade; saber quando não executar nenhuma é confiança. |
| ED-05 | [Agent Ready](/agent-ready) | Engenharia de Confiança | Tutorial + referência | Devs web, arquitetos, SRE, SEO técnico | Ensinar | Agent Readiness é tratar o agente como consumidor de primeira classe, não uma lista de arquivos. |
| ED-06 | [Vibe Coding com Devin](/devin) | Fundação | Apresentação / ensaio | Tech leads, engenheiros, líderes | Persuadir e ensinar | O humano passa de executor a orquestrador cognitivo; vibe coding maduro é intenção estruturada. |
| ED-07 | [Engenharia de Agentes de IA](/engenharia-agentes-ia) | Engenharia de Confiança | Material interativo | Líderes de engenharia, arquitetos, engenheiros de IA | Ensinar | Um sistema de IA confiável tem muito pouca IA no caminho crítico. |
| ED-08 | [Maurício Yokoyama Issei](/) | Soluções & Portfólio | Portfólio (home) | Recrutadores, contratantes | Apresentar o profissional | — (documento factual, gerado de cv.json) |
| ED-09 | [Formulação de Problemas](/formulacao-de-problemas) | Fundação | Artigo | Decisores, arquitetos, pesquisa | Explicar e apoiar decisão | Formular é engenharia da redução de incerteza, e essa engenharia precisa parar. |
| ED-10 | [Especificação Conversacional Estruturada](/especificacao-conversacional) | Engenharia de Confiança | Ensaio / proposta de método | Engenharia, requisitos, produto | Propor e explicar | Uma proposta de workflow em que a IA ajuda a elicitar requisitos e pessoas com autoridade decidem. |
| ED-11 | [Maurício Yokoyama Issei](/curriculo) | fora do catálogo | Referência pessoal | Recrutadores | Apresentar o profissional | — (documento factual, gerado de cv.json) |
| ED-12 | [Acessibilidade como requisito de engenharia](/acessibilidade) | Engenharia de Confiança | Case técnico verificável | Engenharia, design, acessibilidade | Demonstrar com evidência | Mostra o processo, o que foi medido e o que não foi; não afirma que o site é acessível. |
| ED-13 | [Knowledge OS Enterprise](/knowledge-os-presentation) | Engenharia de Confiança | Apresentação de plataforma | C-level, arquitetura, plataforma | Persuadir e apoiar decisão | Conhecimento corporativo como infraestrutura governada, não repositório passivo. |
| ED-14 | [Curiosidade e Investigação](/curiosidade-e-investigacao) | Fundação | Ensaio | Leitores gerais, aprendizes, educadores | Explicar | A curiosidade só vira conhecimento passando por pergunta, investigação e teste de explicação. |
| ED-15 | [Capacidade Antes do Acesso](/capacidade-antes-do-acesso) | Fundação | Estudo / ensaio de política | Gestão educacional, formação docente, política pública | Apoiar decisão | O que decide é a mediação adulta, não o acesso da criança à IA. |
| ED-16 | [Deterministic Grounding](/develop-engineering) | Engenharia de Confiança | Artigo técnico | Tech leads, arquitetos, engenheiros de IA | Explicar e propor | Código correto em isolamento ainda pode ser uma mudança errada no repositório. |
| ED-17 | [Agentic DevOps for Salesforce](/salesforce-agentic-dev) | Ecossistema Salesforce | Guia / treinamento | Devs Salesforce, tech leads | Ensinar | IA agêntica no Salesforce exige implementar contra especificação versionada e passar por governança. |
| ED-18 | [DevOps Salesforce](/devops-salesforce) | Ecossistema Salesforce | Guia prático | Devs, arquitetos e admins Salesforce | Ensinar | IA num org compartilhado só é segura em quatro camadas, na ordem. |
| ED-19 | [SocialSelling](/socialselling) | Soluções & Portfólio | Documentação de projeto | Vendas e engenharia de IA | Demonstrar e documentar | Um ranking explicável que responde “quem abordar primeiro?”. |
| ED-20 | [O Artífice Invisível](/artifice) | Fundação | Ensaio com autodiagnóstico | Engenheiros seniores, líderes | Explicar e provocar reflexão | A invisibilidade da maestria é um descompasso estrutural, não falha pessoal. |
| ED-21 | [Política de Privacidade](/privacidade) | fora do catálogo | Página legal | Visitantes | Informar (obrigação legal) | — |
| ED-22 | [Service Operations 2.0](/service-operations-2-0) | Sustentação & Resiliência | Apresentação executiva | C-level, operações | Persuadir e apoiar decisão | Proteger o “momento zero” da venda com resiliência sistêmica. |
| ED-23 | [Termos de Uso](/termos) | fora do catálogo | Página legal | Visitantes | Informar (obrigação legal) | — |
| ED-24 | [Arquitetura de IA auditável](/apresentacao) | Engenharia de Confiança | Apresentação executiva (hub) | Executivos, arquitetos | Apoiar decisão | Complexidade de IA estruturada em decisões auditáveis, em leitura executiva e de engenharia. |
| ED-25 | [Navegando na Complexidade](/know) | Fundação | Ensaio curto | Gestão | Explicar | Copiar a forma de quem tem sucesso não replica a função. |
| ED-26 | [Terminal Evolutivo](/terminal-evolutivo) | Soluções & Portfólio | Narrativa pessoal | Visitantes | Narrar | — (scrollytelling; não é argumento) |
| ED-27 | [Engenharia Reversa Assistida por IA](/proposta-engenharia-reversa) | Ecossistema Salesforce | Proposta técnica | Clientes Salesforce, arquitetos | Persuadir | Antes de modernizar, fotografar o As-Is por evidência. |
| ED-28 | [Quick Start: Salesforce + Devin + Flosum](/salesforce-agentic-quickstart) | Ecossistema Salesforce | Tutorial sequencial | Devs Salesforce | Ensinar (passo a passo) | — (imperativo por desenho) |
| ED-29 | [Catálogo de Conteúdos](/catalogo) | fora do catálogo | Mapa / catálogo | Todos os públicos | Orientar | Uma jornada em cinco pilares, da mentalidade ao resultado. |
| ED-30 | [Boutique Empresarial](/boutique-empresarial-showcase) | Soluções & Portfólio | Case de projeto | Devs, clientes | Demonstrar | Arquitetura, SDD e pipeline agêntico de um projeto real. |
| ED-31 | [Operação Capital Cognitivo](/operacao-capital-cognitivo) | Engenharia de Confiança | Simulador | Executivos | Demonstrar | A IA mais cara não é a que cobra mais por uso. |
| ED-32 | [O Ciclo da Aprendizagem Autorregulada](/aprendizagem-autorregulada) | Fundação | Síntese de revisão | Estudantes, autodidatas | Ensinar | Estudar bem não é reler: é alternar previsão, busca, recuperação, autoexplicação e espaçamento. |
| ED-33 | [Observabilidade SRE para Mobilidade](/proposta-observabilidade-mobile) | Sustentação & Resiliência | Proposta técnica | SRE, infraestrutura, TI | Persuadir | Correlacionar dispositivo, rede, identidade e aplicação para reduzir tempo de detecção. |
| ED-34 | [Política de Cookies](/cookies) | fora do catálogo | Página legal | Visitantes | Informar (obrigação legal) | — |
| ED-35 | [Do Caos à Resiliência](/sustentacao) | Sustentação & Resiliência | Landing de curso | Profissionais de operação | Persuadir (inscrição) | — |
| ED-36 | [Vida em 3D](/life3d) | Soluções & Portfólio | Narrativa interativa (3D) | Visitantes | Narrar | — |
| ED-37 | [A Jornada em Pixel Art](/life) | Soluções & Portfólio | Narrativa interativa (pixel art) | Visitantes | Narrar | — |

### 4.2 Extensão, estrutura e sinais

"Base" diz o que foi feito com a página: *medida* (texto contado por script) ou *auditada em 08/10*
(passou também pela auditoria de navegação de [`EDITORIAL-AUDIT.md`](EDITORIAL-AUDIT.md)).
Nenhuma foi lida nesta fase com os critérios de prolixidade.

| ID | Página | Palavras (~min) | Parágrafos | Palavras/parágrafo (média · p90) | Palavras/frase (média) | Frases > 35 palavras | h2 · h3 | Densidade técnica | Sinais métricos (não são diagnóstico) | Base | Lote de leitura |
| :-- | :-- | --: | --: | :-- | --: | --: | :-- | :-- | :-- | :-- | :-- |
| ED-01 | `digital-workplace-agentico` | 13919 (70) | 865 | 11.8 · 30 | 12.0 | 2.9% | 17 · 102 | Alta: 6 camadas, protocolos (AG-UI, MCP, A2A), IAM, LGPD | volume alto (~70 min); 17 h2 + 102 h3; 6 títulos em forma de pergunta | auditada em 08/10 + medida | L1 |
| ED-02 | `aprendizagem-autorregulada-artigo` | 10048 (50) | 172 | 20.7 · 65 | 14.2 | 2.8% | 10 · 41 | Alta: matriz de evidências e 103 referências | volume alto (~50 min); 10 h2 + 41 h3 | auditada em 08/10 + medida | L2 |
| ED-03 | `engenharia-confianca` | 6710 (34) | 222 | 24.4 · 59 | 15.7 | 5.6% | 10 · 27 | Alta: 4 módulos e conceitos autorais (Crash Silencioso, Limiar de 98%) | volume alto (~34 min); 2 parágrafos com mais de 100 palavras; 2 títulos em forma de pergunta | auditada em 08/10 + medida | L1 |
| ED-04 | `case-agents` | 5772 (29) | 226 | 18.0 · 52 | 13.2 | 2.3% | 15 · 22 | Alta: código Python/Rust, métricas, ADR, 72 testes | volume alto (~29 min); <title> com 84 caracteres | auditada em 08/10 + medida | L1 |
| ED-05 | `agent-ready` | 5728 (29) | 248 | 19.9 · 50 | 14.4 | 2.9% | 12 · 34 | Alta: RFCs, cabeçalhos HTTP, MCP, WebMCP | volume alto (~29 min) | auditada em 08/10 + medida | L2 |
| ED-06 | `devin` | 5567 (28) | 322 | 15.4 · 39 | 10.6 | 0.0% | 7 · 61 | Média: método e ferramenta, poucos detalhes de implementação | volume alto (~28 min); 7 h2 + 61 h3; 2 títulos em forma de pergunta | auditada em 08/10 + medida | L1 |
| ED-07 | `engenharia-agentes-ia` | 5024 (25) | 178 | 23.8 · 49 | 15.0 | 3.6% | 9 · 23 | Alta: 10 princípios, contratos, MCP, FinOps | volume alto (~25 min) | auditada em 08/10 + medida | L1 |
| ED-08 | `index` | 4922 (25) | 73 | 23.5 · 60 | 17.4 | 4.1% | 5 · 6 | Baixa: experiência e competências | nenhum sinal métrico | auditada em 08/10 + medida | L2 |
| ED-09 | `formulacao-de-problemas` | 4652 (23) | 288 | 14.1 · 43 | 14.5 | 4.4% | 13 · 32 | Alta: 6 incertezas, 6 estados, regra de parada, penalizador λ | nenhum sinal métrico | auditada em 08/10 + medida | L2 |
| ED-10 | `especificacao-conversacional` | 4308 (22) | 198 | 17.1 · 51 | 12.5 | 2.2% | 12 · 19 | Alta: matriz de autoridade, política de divergência, protocolo de avaliação | nenhum sinal métrico | medida | L2 |
| ED-11 | `curriculo` | 4136 (21) | 145 | 11.1 · 24 | 11.8 | 0.0% | 8 · 39 | Baixa: dados de carreira | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-12 | `acessibilidade` | 4086 (20) | 137 | 24.0 · 63 | 15.8 | 4.4% | 8 · 35 | Alta: WCAG 2.2, diffs, catraca de CI | nenhum sinal métrico | auditada em 08/10 + medida | L2 |
| ED-13 | `knowledge-os-presentation` | 3617 (18) | 245 | 7.4 · 18 | 7.6 | 0.0% | 14 · 56 | Média: grafo, RAG, governança em nível de visão | 14 h2 + 56 h3 | auditada em 08/10 + medida | L2 |
| ED-14 | `curiosidade-e-investigacao` | 3511 (18) | 91 | 32.4 · 67 | 15.7 | 9.7% | 11 · 7 | Média: conceitos de aprendizagem, pouco jargão técnico | 9.7% das frases com mais de 35 palavras; parágrafo médio 32.4 palavras; 2 parágrafos com mais de 100 palavras; <title> com 88 caracteres | auditada em 08/10 + medida | L1 |
| ED-15 | `capacidade-antes-do-acesso` | 3444 (17) | 179 | 17.4 · 43 | 15.6 | 5.6% | 12 · 23 | Média-alta: conceitos de educação e governança | nenhum sinal métrico | auditada em 08/10 + medida | L2 |
| ED-16 | `develop-engineering` | 3127 (16) | 193 | 13.7 · 34 | 11.6 | 0.9% | 10 · 2 | Alta: Snapshot Capsule, Action Gateway, oráculos | nenhum sinal métrico | auditada em 08/10 + medida | L1 |
| ED-17 | `salesforce-agentic-dev` | 2769 (14) | 188 | 9.3 · 29 | 9.4 | 0.6% | 15 · 45 | Alta: SDD, Devin, Flosum, pipeline | 15 h2 + 45 h3 | auditada em 08/10 + medida | L2 |
| ED-18 | `devops-salesforce` | 2685 (13) | 61 | 32.0 · 58 | 21.7 | 14.4% | 7 · 9 | Alta: org, metadata, pipeline, governança | frase média 21.7 palavras; 14.4% das frases com mais de 35 palavras; parágrafo médio 32.0 palavras | auditada em 08/10 + medida | L1 |
| ED-19 | `socialselling` | 2504 (13) | 164 | 11.3 · 26 | 9.7 | 0.5% | 14 · 44 | Média-alta: produto + referência técnica (§11–14) | 14 h2 + 44 h3 | auditada em 08/10 + medida | L2 |
| ED-20 | `artifice` | 1754 (9) | 76 | 19.8 · 53 | 14.6 | 4.9% | 5 · 9 | Baixa-média: conceitual, pouco jargão | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-21 | `privacidade` | 1594 (8) | 109 | 9.3 · 26 | 9.2 | 1.9% | 16 · 8 | Baixa | nenhum sinal métrico | medida | fora |
| ED-22 | `service-operations-2-0` | 1408 (7) | 49 | 23.2 · 45 | 15.2 | 0.0% | 8 · 15 | Média: SRE em linguagem executiva | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-23 | `termos` | 1334 (7) | 29 | 24.8 · 46 | 15.6 | 4.3% | 20 · 7 | Baixa | nenhum sinal métrico | medida | fora |
| ED-24 | `apresentacao` | 1314 (7) | 95 | 12.5 · 28 | 12.5 | 1.1% | 6 · 26 | Média: 3 sistemas em duas leituras | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-25 | `know` | 1102 (6) | 39 | 22.1 · 41 | 11.4 | 0.0% | 5 · 19 | Baixa-média: Cynefin | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-26 | `terminal-evolutivo` | 1019 (5) | 31 | 27.4 · 59 | 12.6 | 0.0% | 8 · 0 | Baixa | nenhum sinal métrico | auditada em 08/10 + medida | fora |
| ED-27 | `proposta-engenharia-reversa` | 844 (4) | 30 | 20.9 · 35 | 13.6 | 0.0% | 6 · 14 | Média | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-28 | `salesforce-agentic-quickstart` | 834 (4) | 96 | 7.9 · 18 | 7.8 | 0.0% | 9 · 7 | Média: comandos e configuração | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-29 | `catalogo` | 791 (4) | 33 | 20.7 · 30 | 20.1 | 0.0% | 0 · 31 | Baixa | frase média 20.1 palavras; meta description com 192 caracteres | auditada em 08/10 + medida | L1 |
| ED-30 | `boutique-empresarial-showcase` | 693 (3) | 29 | 18.2 · 37 | 15.1 | 0.0% | 5 · 10 | Média | <title> com 66 caracteres; meta description com 161 caracteres | auditada em 08/10 + medida | L3 |
| ED-31 | `operacao-capital-cognitivo` | 681 (3) | 63 | 8.9 · 28 | 9.4 | 1.8% | 16 · 1 | Média: FinOps de IA, UI/$ | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-32 | `aprendizagem-autorregulada` | 628 (3) | 30 | 17.6 · 26 | 14.5 | 0.0% | 6 · 17 | Baixa-média | 3 títulos em forma de pergunta | auditada em 08/10 + medida | L3 |
| ED-33 | `proposta-observabilidade-mobile` | 583 (3) | 40 | 9.7 · 14 | 9.2 | 0.0% | 8 · 29 | Média-alta: Datadog, Azure, Android Enterprise | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-34 | `cookies` | 481 (2) | 43 | 7.7 · 18 | 9.2 | 3.1% | 7 · 3 | Baixa | nenhum sinal métrico | medida | fora |
| ED-35 | `sustentacao` | 264 (1) | 14 | 15.3 · 24 | 10.7 | 0.0% | 4 · 7 | Baixa | nenhum sinal métrico | auditada em 08/10 + medida | L3 |
| ED-36 | `life3d` | 48 (0) | 3 | 14 · 18 | 10.5 | 0.0% | 1 · 0 | — | nenhum sinal métrico | texto em JS; não medido | fora |
| ED-37 | `life` | 1 (0) | 0 | 0 · 0 | 0 | 0% | 0 · 0 | — | nenhum sinal métrico | texto em JS; não medido | fora |

## 5. Agrupamentos e sobreposições candidatas

Nenhuma fusão é recomendada nesta fase. A tabela só indica onde a Fase 5 deve comparar tese,
público e finalidade antes de decidir entre referência cruzada, consolidação ou nada.

| Grupo | Páginas | Por que comparar | Hipótese a testar |
| :-- | :-- | :-- | :-- |
| G1 · Engenharia da Confiança | `engenharia-confianca`, `engenharia-agentes-ia`, `case-agents`, `develop-engineering` | mesmos conceitos autorais (Crash Silencioso, fail-closed, Cérebro × Vitrine, determinístico-primeiro, "a confiança vem da engenharia") explicados em mais de uma página | o hub reexplica os princípios por inteiro em vez de resumir e apontar para a página de cada princípio |
| G2 · Salesforce agêntico | `devops-salesforce`, `salesforce-agentic-dev`, `salesforce-agentic-quickstart`, `proposta-engenharia-reversa`, `devin` | Devin, Flosum e SDD nas cinco | as três primeiras são guia, curso e tutorial do mesmo fluxo; falta dizer ao leitor qual ler primeiro |
| G3 · Aprendizagem | `aprendizagem-autorregulada`, `aprendizagem-autorregulada-artigo`, `curiosidade-e-investigacao` | síntese × revisão completa (par deliberado) e ensaio vizinho | par deliberado; verificar só se a síntese promete o que a revisão entrega |
| G4 · Perfil | `index`, `curriculo` | 77% do texto em comum, gerado do `cv.json` | duplicação intencional ("formato clássico"); avaliar só se a home precisa de ~25 min de texto |
| G5 · Executivas | `apresentacao`, `service-operations-2-0`, `knowledge-os-presentation`, `operacao-capital-cognitivo` | formato executivo | aplicar o teste BLUF (problema → impacto → recomendação → evidência → risco → ação) |

## 6. Próximos lotes

A ordem segue o volume e os sinais, não a suspeita de qualidade. Cada lote termina com as
páginas lidas por inteiro, as notas da rubrica e os itens de backlog com evidência.

- **Lote 1 (Fases 2 e 3, 9 páginas, ~237 min de leitura):** `digital-workplace-agentico`,
  `engenharia-confianca`, `case-agents`, `devin`, `engenharia-agentes-ia`, `develop-engineering`,
  `devops-salesforce`, `curiosidade-e-investigacao` e `catalogo`. Cobre o G1 inteiro, os dois
  desvios de frase e o mapa.
- **Lote 2 (10 páginas):** as marcadas L2 no inventário.
- **Lote 3 (12 páginas):** as marcadas L3. Páginas curtas: leitura rápida, nota provável sem
  intervenção.

**Amostra proposta para a Fase 9** (um formato de cada, sem escolher só as piores):
`service-operations-2-0` (executiva), `case-agents` (técnica extensa), `formulacao-de-problemas`
(ensaio conceitual), `devops-salesforce` (guia prático) e `catalogo` (catálogo).

## 7. Decisões pendentes do autor

Nenhuma bloqueia o Lote 1.

1. **`boutique-empresarial-showcase`:** deve entrar no sitemap (é pública e está no catálogo) ou
   receber `noindex` (não deve ser encontrada por busca)?
2. **Rubrica:** aceita notas só nas páginas lidas por inteiro, em faixas sem decimal (§1, item 6)?
3. **Versão executiva na Fase 9:** só na página executiva da amostra, ou em todas as cinco?
