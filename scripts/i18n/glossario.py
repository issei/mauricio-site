"""
Glossário determinístico do gêmeo `/en/` — correções que o modelo erra sempre.

O Argos é um NMT genérico: não conhece o vocabulário do site e erra do mesmo
jeito toda vez. Medido nos espelhos publicados em 2026-11-13:

  * "engenharia agêntica" saía "Age Engineering" ou "agency engineering";
  * "Rede" (a empresa) saía "Network" no currículo e na home;
  * "llms.txt" saía "llms. txt" (o modelo trata o ponto como fim de frase);
  * "15 conteúdos" saía "15 content", e o "|" do título profissional sumia.

Nada aqui chama modelo nem rede. Três mecanismos, do mais estreito ao mais largo:

  * `SEGMENTOS` — o segmento INTEIRO (já sem espaço nas bordas) tem tradução
    fixa. Serve para rótulos curtos de interface que o modelo estraga.
  * `REGRAS` — regex sobre o segmento inteiro (plural com número).
  * `TERMOS` — expressão dentro da frase que vira um marcador protegido e volta
    já em inglês. É o mesmo caminho das siglas (`engine._SIGLA`): se o modelo
    perder o marcador, a contingência ainda devolve o termo em inglês.

Para incluir um termo: confira antes que a expressão em português não tem outro
sentido no site (`grep` em `src/*.html` e `public/*.md`).
"""

from __future__ import annotations

import re

#: Segmento inteiro → tradução fixa.
SEGMENTOS: dict[str, str] = {
    "Tech Lead | Especialista em Análise de Sistemas": "Tech Lead | Systems Analysis Specialist",
    "O que publico, por assunto. Cada tema leva aos seus conteúdos.":
        "What I publish, by subject. Each theme leads to its content.",
    "Explorar os conteúdos": "Explore the content",
    "Ver todos os conteúdos": "See all content",
    "Economia de aproximadamente": "Savings of approximately",
    "Economia de mais de": "Savings of more than",
    "Como o A11Y.md entrou no desenvolvimento deste site com agentes de IA: o fluxo real, os diffs, "
    "a catraca que só deixa a dívida cair e o que ainda não foi verificado.":
        "How A11Y.md entered the development of this site with AI agents: the real flow, the diffs, "
        "the ratchet that only lets the debt go down, and what has not been verified yet.",
    # Rótulos curtos do currículo e do catálogo.
    "Para": "To",
    "Ensaio": "Essay",
    "Ensaio com autodiagnóstico": "Essay with self-diagnosis",
    "Competências": "Skills",
    "Desenvolvimento": "Development",
    "Plataformas & APIs": "Platforms & APIs",
    "Plataformas &amp; APIs": "Platforms &amp; APIs",
    "Visualização de Dados": "Data Visualization",
    "Data Mesh": "Data Mesh",
    "CI/CD": "CI/CD",
    "Atuação atual": "Current role",
    "Analista Programador Java": "Java Programmer Analyst",
    "Analista de Desenvolvimento Java": "Java Development Analyst",
    "Economia": "Savings",
    "Economia de": "Savings of",
    # Os 10 temas (content/temas.yml): rótulos de navegação da home, do catálogo e de /temas.
    "Engenharia agêntica": "Agentic engineering",
    "Gestão e estratégia": "Management and strategy",
    "Especificação e desenvolvimento": "Specification and development",
    "Salesforce e vendas": "Salesforce and sales",
    "Cloud e confiabilidade": "Cloud and reliability",
    "Aprendizagem e mente": "Learning and mind",
    "Tecnologia e cultura": "Technology and culture",
    "Dados e decisão": "Data and decision-making",
    "Ferramentas de IA": "AI tools",
    "Acessibilidade e design": "Accessibility and design",
    # Políticas (termos, privacidade, cookies). O Argos errou estes rótulos nos
    # espelhos publicados em 2026-11-13 ("Registers", "Meet request", "meeting").
    "Cadastrais": "Registration data",
    "Cadastrais:": "Registration data:",
    "Cadastrais (cliente ativo)": "Registration data (active client)",
    "Cadastrais de cliente ativo": "Registration data of an active client",
    "Atender a solicitação": "Handle the request",
    "Titular:": "Data subject:",
    "Oposição": "Objection",
    "Conduta vedada": "Prohibited conduct",
    "sessão": "session",
    "Ícone 🍪 no canto inferior esquerdo reabre as preferências a qualquer momento.":
        "The 🍪 icon in the lower-left corner reopens the preferences at any time.",
}

#: Regex sobre o segmento inteiro → função que devolve a tradução.
REGRAS: list[tuple[re.Pattern[str], object]] = [
    (re.compile(r"^(\d+) conteúdos?$"), lambda m: f"{m.group(1)} item" + ("" if m.group(1) == "1" else "s")),
    (re.compile(r"^(\d+) vídeos?$"), lambda m: f"{m.group(1)} video" + ("" if m.group(1) == "1" else "s")),
]

#: Expressão dentro da frase → inglês. A chave é casada sem diferenciar
#: maiúscula; a primeira letra do inglês segue a da ocorrência.
TERMOS: dict[str, str] = {
    "engenharia agêntica": "agentic engineering",
    "IA agêntica": "agentic AI",
    "desenvolvimento agêntico": "agentic development",
    "sistemas agênticos": "agentic systems",
    "pipeline agêntico": "agentic pipeline",
    "entrega contínua agêntica": "agentic continuous delivery",
    "superfície agêntica": "agentic surface",
    "prontidão agêntica": "agentic readiness",
    "plataforma agêntica": "agentic platform",
    "jornada agêntica": "agentic journey",
    "execução agêntica": "agentic execution",
    "governança agêntica": "agentic governance",
    # Vocabulário jurídico das políticas. Medido errado em 2026-11-13: "violação"
    # saía "rape", "vedada" saía "sealed", "foro" saía "forum", "irrenunciáveis"
    # saía "irrefutable", "titular" saía "holder", "Encarregado" saía "Charged".
    "em caso de violação": "in case of breach",
    "violação destes Termos": "breach of these Terms",
    "vedado": "prohibited",
    "vedada": "prohibited",
    "Falsidade ideológica": "false identity",
    "direito de arrependimento": "right of withdrawal",
    "irrenunciáveis": "non-waivable",
    "limitação de responsabilidade": "limitation of liability",
    "foro da Comarca de São Paulo/SP": "courts of São Paulo/SP",
    "foro do domicílio do consumidor": "courts of the consumer's domicile",
    "foro do seu domicílio": "courts of their domicile",
    "foro de seu domicílio": "courts of their domicile",
    "foro do consumidor": "consumer's courts",
    "foro": "jurisdiction",
    "Comarca": "judicial district",
    "o titular": "the data subject",
    "titulares": "data subjects",
    "Encarregado": "Data Protection Officer",
    "oposição ao legítimo interesse": "objection to processing based on legitimate interest",
    "revisão humana de decisões automatizadas": "human review of automated decisions",
    "Coleta-se só o necessário": "Only what is necessary is collected",
    "e-mail enviado por ela": "an e-mail sent by the person",
    "Se tiver": "If it ever does",
    "Bloqueio na origem": "Blocking at source",
    "Leis 9.610/1998 e 9.279/1996": "Laws 9.610/1998 and 9.279/1996",
}

#: Nomes que não se traduzem. "Rede" é a empresa onde o autor trabalha desde
#: 2018; a única ocorrência com sentido de "rede" (camadas de zero trust:
#: "Dispositivo, Rede, Identidade e Aplicação") fica de fora pelo lookbehind.
#: Os demais também foram medidos errados nos espelhos de 2026-11-13.
NOMES: tuple[str, ...] = (
    r"(?<!Dispositivo, )\bRede\b",
    r"\bTelefônica\b",            # empresa; saía "Telephone"
    r"\bBoutique Empresarial\b",  # nome do projeto; saía "Business Boutique"
    r"\bCI/CD\b",                 # saía "IC/CD"
    r"(?<![\w.])\.NET\b",          # saía ". NET"
    r"\bEU AI Act\b",            # saía "I AI Act"
    r"\bDPO\b",                  # saía "PDO"
    r"\bNotice (?:&amp;|&) takedown\b",  # saía "News & takedown"
    r"\b_ga_[A-Z0-9]+\b",        # cookie do GA4; saía "_g_GEKLHZYVYX"
    # Domínio (mauricio.issei.com.br, .c.clarity.ms): o ponto não é fim de frase;
    # saía "Mauricio. issei.com.br", ".clarity. ms", ".c.bing. with". O lookbehind
    # deixa e-mail (mauricio@issei.com.br) e URL já protegida de fora.
    r"(?<![\w@/.])\.?(?:[a-z0-9-]+\.)+(?:com\.br|com|ms|org|net)\b",
)

#: Nome de arquivo (llms.txt, cv-for-ai.md, robots.txt): o ponto não é fim de frase.
ARQUIVO = r"\b[\w-]+(?:\.[\w-]+)*\.(?:txt|md|json|jsonld|html|xml|js|mjs|ya?ml|py|css|csv)\b"


def termos_regex() -> str:
    """Alternância dos TERMOS, da expressão mais longa para a mais curta."""
    chaves = sorted(TERMOS, key=len, reverse=True)
    return "|".join(rf"(?i:\b{re.escape(c)}\b)" for c in chaves)


def em_ingles(trecho: str, inicio: bool = False) -> str:
    """
    Valor de volta de um trecho protegido: o inglês do termo, ou o próprio trecho
    (nomes e arquivos). Maiúscula inicial só no começo do segmento ou quando a
    ocorrência a tem e o termo não começa por sigla ("IA agêntica" no meio da
    frase continua "agentic AI").
    """
    chave = next((k for k in TERMOS if k.lower() == trecho.lower()), None)
    if chave is None:
        return trecho
    en = TERMOS[chave]
    sobe = inicio or (trecho[:1].isupper() and not chave[:1].isupper())
    return en[0].upper() + en[1:] if sobe else en


def segmento_fixo(core: str) -> str | None:
    """Tradução fixa do segmento inteiro, se houver."""
    if core in SEGMENTOS:
        return SEGMENTOS[core]
    for padrao, f in REGRAS:
        m = padrao.match(core)
        if m:
            return f(m)  # type: ignore[operator]
    return None
