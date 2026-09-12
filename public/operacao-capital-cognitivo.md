# Operação Capital Cognitivo — Simulador de FinOps de IA

> Versão Markdown de <https://mauricio.issei.com.br/operacao-capital-cognitivo>. Autor: **Maurício Yokoyama Issei**. A página é um simulador interativo; este texto descreve a tese e o conteúdo, sem a mecânica do jogo.

Simulador executivo que ensina, por descoberta, a economia real da Inteligência Artificial nas empresas: por que a IA mais cara não é a que cobra mais por uso, e como medir o que ela de fato entrega. Não exige conhecimento prévio de IA — cada tela tem objetivo, passo a passo e glossário.

## A ideia central

Quem adota IA enxerga a ponta do iceberg: a fatura de uso da API. O custo real é dominado pelo que fica submerso — as horas humanas gastas revisando e corrigindo o que a IA produziu, a infraestrutura e a governança. Em pipelines de software de grandes empresas, a API costuma ser **menos de 10% do custo total**. Otimizar só o preço do token é discutir a parte errada do problema.

## O que se aprende

- Ler o custo total (TCO) de uma operação de IA, não só a fatura de API.
- Usar o **UI/$ (Useful Intelligence per Dollar)** para comparar decisões de arquitetura.
- Enxergar o custo humano não linear: a fadiga de verificar IA errada (**V_core**).
- Defender escolhas com evidência, inclusive em setores regulados (**Governed UI/$**).

## A jornada em 6 capítulos

1. **O Mistério** — a fatura da API foi de R$ 3.000, mas o custo de IA apurado é de R$ 40.000. A decomposição: tempo de desenvolvedor em revisão e verificação (R$ 28.800, 72%), infraestrutura, vector DB e observabilidade (R$ 4.800, 12%), governança e compliance (R$ 3.400, 8,5%) e API (R$ 3.000, 7,5%).
2. **A Armadilha** — por que migrar tudo para um modelo 90% mais barato por token pode sair caríssimo.
3. **A Invenção** — o jogador monta a fração que captura "trabalho útil por real investido".
4. **A Formalização** — as fórmulas por trás da intuição: Cost-of-Pass, UI/$ e Governed UI/$.
5. **O Laboratório** — operar a empresa de Q1 a Q4, configurando a arquitetura sob eventos de mercado.
6. **O Conselho** — defender cada decisão com um argumento e uma evidência.

## Rigor

11 evidências com fonte, nível epistemológico e limitações declaradas; 3 modelos formais; referências (RouteLLM, prompt caching, Context Rot e outras) no glossário.

**Nota de honestidade:** UI/$, V_core e afins são convenções operacionais de FinOps em consolidação — bússolas direcionais, não normas ISO/IEEE. Os números do simulador são parâmetros de ensino, não medições absolutas.

## Para quem é

Engenheiros que implementam IA e querem critério de custo; arquitetos e tech leads que precisam de padrões defensáveis; gestores e executivos que decidem orçamento sem entrar no código; estudantes que querem rigor e fontes verificáveis.
