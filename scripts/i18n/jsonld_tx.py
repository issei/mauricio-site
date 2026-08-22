"""
Tradução de dados estruturados — JSON-LD (AEO) e JSON de conteúdo (`cv.json`).

Um esquema JSON-LD é contrato, não prosa: a CHAVE é vocabulário do schema.org e
traduzi-la destrói o dado; o VALOR, às vezes, é texto para humano. Então o
tratamento é por chave, com lista fechada — o que não está na lista passa
intacto. É a escolha conservadora de propósito: um `@type` traduzido faz o
Google descartar o bloco inteiro em silêncio.

Ajustes de idioma exigidos pela SDD §6.2:
  * `inLanguage` → `"en-US"`;
  * `@id` e `url` do próprio site → rota `/en/` (o `@id` é a identidade do nó
    no grafo; PT-BR e EN precisam ser nós distintos, senão um sobrescreve o
    outro).
"""

from __future__ import annotations

import json
import re

from assets import SITE
from links import rewrite_route

#: Valores destas chaves são texto de leitura humana.
CHAVES_DE_TEXTO = frozenset(
    {
        "name",
        "alternateName",
        "headline",
        "alternativeHeadline",
        "description",
        "disambiguatingDescription",
        "abstract",
        "text",
        "articleSection",
        "keywords",
        "jobTitle",
        "caption",
        "about",
        "audience",
        "audienceType",
        "learningResourceType",
        "teaches",
        "skills",
        "knowsAbout",
        "slogan",
        "award",
        "responsibilities",
        "qualifications",
    }
)

#: Valores destas chaves são rota do próprio site.
CHAVES_DE_ROTA = frozenset({"@id", "url", "mainEntityOfPage", "sameAs", "target", "item"})

#: Nunca traduzir: identificadores, datas, códigos, mídia.
CHAVES_INTOCAVEIS = frozenset(
    {
        "@context",
        "@type",
        "@graph",
        "email",
        "telephone",
        "image",
        "logo",
        "contentUrl",
        "thumbnailUrl",
        "embedUrl",
        "datePublished",
        "dateModified",
        "dateCreated",
        "uploadDate",
        "duration",
        "identifier",
        "isbn",
        "encodingFormat",
        "position",
        "ratingValue",
        "price",
        "priceCurrency",
    }
)

_URL_DO_SITE = re.compile(rf"^{re.escape(SITE)}(/|$)")
#: Uma string que já é URL, e-mail ou código ISO não é prosa.
_NAO_E_PROSA = re.compile(
    r"^(?:https?://|mailto:|tel:|[\w.+-]+@[\w-]+\.[\w.]+$|[a-z]{2}(?:-[A-Z]{2})?$|\d[\d\s.,:/-]*$)"
)


def _traduz_valor(valor, engine):
    if isinstance(valor, str):
        if not valor.strip() or _NAO_E_PROSA.match(valor.strip()):
            return valor
        return engine.translate(valor)
    if isinstance(valor, list):
        return [_traduz_valor(v, engine) for v in valor]
    return valor


def _rota_valor(valor):
    if isinstance(valor, str) and _URL_DO_SITE.match(valor):
        return rewrite_route(valor)
    if isinstance(valor, list):
        return [_rota_valor(v) for v in valor]
    return valor


def transforma_no(no, engine):
    """Percorre o grafo aplicando as regras por chave."""
    if isinstance(no, list):
        return [transforma_no(x, engine) for x in no]
    if not isinstance(no, dict):
        return no

    saida = {}
    for chave, valor in no.items():
        if chave == "inLanguage":
            saida[chave] = "en-US"
        elif chave in CHAVES_INTOCAVEIS:
            saida[chave] = transforma_no(valor, engine) if isinstance(valor, (dict, list)) else valor
        elif chave in CHAVES_DE_ROTA:
            # `sameAs` costuma ser lista de URLs; `item` (breadcrumb) costuma
            # ser objeto. Lista de strings é rota; o resto desce no grafo.
            if _lista_de_strings(valor) or isinstance(valor, str):
                saida[chave] = _rota_valor(valor)
            else:
                saida[chave] = transforma_no(valor, engine)
        elif isinstance(valor, (dict, list)) and not _lista_de_strings(valor):
            saida[chave] = transforma_no(valor, engine)
        elif chave in CHAVES_DE_TEXTO:
            saida[chave] = _traduz_valor(valor, engine)
        else:
            saida[chave] = valor
    return saida


def _lista_de_strings(valor) -> bool:
    return isinstance(valor, list) and all(isinstance(v, str) for v in valor)


def translate_jsonld(bruto: str, engine, route_en: str) -> str:
    """
    Reprocessa o conteúdo de um `<script type="application/ld+json">`.

    JSON inválido é devolvido intacto e em silêncio: a página em PT-BR já
    estava assim, e não é papel do tradutor decidir consertá-la — o
    `audit-site.mjs` é quem cobra isso do original.
    """
    texto = bruto.strip()
    if not texto:
        return bruto
    try:
        dado = json.loads(texto)
    except json.JSONDecodeError:
        return bruto
    convertido = transforma_no(dado, engine)
    indent = 2 if "\n" in bruto else None
    corpo = json.dumps(convertido, ensure_ascii=False, indent=indent)
    return f"\n{corpo}\n" if indent else corpo


#: Chaves de `cv.json` / `star.json` cujo valor é dado, não prosa.
CV_CHAVES_INTOCAVEIS = frozenset(
    {
        "Email",
        "LinkedIn",
        "LinkedInUser",
        "GitHub",
        "youtube",
        "instagram",
        "url",
        "link",
        "Link",
        "Icone",
        "icon",
        "id",
        "slug",
        "Data",
        "DataInicio",
        "DataFim",
        "Periodo",
        "Ano",
        "Credencial",
        "CredentialId",
        "Imagem",
        "image",
        "Telefone",
        "Nome",
    }
)

#: Valor que é claramente identificador/técnico, mesmo sob chave de prosa.
_CV_NAO_E_PROSA = re.compile(
    r"^(?:https?://|mailto:|[\w.+-]+@[\w-]+\.[\w.]+$|[\d/\-.\s]+$|[A-Z0-9_-]{2,12}$)"
)


def translate_json_data(bruto: str, engine) -> str:
    """
    `cv.json` / `star.json`: traduz VALORES de texto, preserva CHAVES e tipos.

    Chave preservada porque `src/js/cv-renderer.js` lê `dado.Resumo` — renomear
    para `Summary` quebraria o renderizador nas duas línguas.
    """
    dado = json.loads(bruto)
    convertido = _cv_no(dado, engine)
    return json.dumps(convertido, ensure_ascii=False, indent=4) + "\n"


def _cv_no(no, engine, chave_pai: str = ""):
    if isinstance(no, list):
        return [_cv_no(x, engine, chave_pai) for x in no]
    if isinstance(no, dict):
        return {k: _cv_no(v, engine, k) for k, v in no.items()}
    if isinstance(no, str):
        if chave_pai in CV_CHAVES_INTOCAVEIS:
            return no
        if not no.strip() or _CV_NAO_E_PROSA.match(no.strip()):
            return no
        return engine.translate(no)
    return no  # int, float, bool, None: tipo preservado
