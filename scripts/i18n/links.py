"""
Reescrita de rotas internas para o gêmeo `/en/`.

A regra é uma só e vale para HTML e Markdown: **só se reescreve o link cujo
alvo tem espelho**. `/proposta` vira `/en/proposta` porque `public/en/` e
`src/en/` guardam esse arquivo; `/aeo.css`, `/og-index.png` e `/favicon.svg`
não viram nada, porque existe um único arquivo desses servindo as duas línguas
— reescrevê-los produziria 404 no idioma novo.

Por isso o mapa vem de `assets.mirror_index()`, derivado dos arquivos reais, e
não de uma lista escrita à mão que envelhece em silêncio.
"""

from __future__ import annotations

import re

from assets import EN_PREFIX, SITE, mirror_index, mirrored_html_slugs

#: Esquemas que nunca são rota deste site.
_OPACOS = re.compile(r"^(?:[a-z][a-z0-9+.-]*:|//|#)", re.IGNORECASE)

#: Extensões de ativo compartilhado: existe UM arquivo, servido às duas
#: línguas. Um link relativo para eles, dentro de `en/`, precisa subir um nível.
_ATIVOS_COMPARTILHADOS = re.compile(
    r"\.(css|js|mjs|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf|pdf|mp4|webm|json|txt|md)$",
    re.IGNORECASE,
)


def _split(url: str) -> tuple[str, str]:
    """Separa o caminho do sufixo (`?query` / `#hash`), que nunca é reescrito."""
    for i, ch in enumerate(url):
        if ch in "?#":
            return url[:i], url[i:]
    return url, ""


def rewrite_route(url: str, *, relative_base: str | None = None) -> str:
    """
    Devolve a rota equivalente para um documento que vive em `/en/`.

    `relative_base` diz de que diretório o documento em inglês é servido —
    `"src/en"` ou `"public/en"`. Ele decide o que fazer com caminhos
    relativos; passe `None` para tratar só os absolutos.
    """
    if not url:
        return url

    caminho, sufixo = _split(url)
    if not caminho:
        return url  # âncora pura (`#secao`)

    # 1. URL absoluta do próprio site: reescreve o caminho e recompõe.
    if caminho.startswith(SITE):
        resto = caminho[len(SITE) :] or "/"
        alvo = mirror_index().get(resto)
        return f"{SITE}{alvo}{sufixo}" if alvo else url

    # 2. Externo, `mailto:`, `data:`, protocolo-relativo: intocado.
    if _OPACOS.match(caminho):
        return url

    # 3. Raiz do site.
    if caminho.startswith("/"):
        alvo = mirror_index().get(caminho)
        return f"{alvo}{sufixo}" if alvo else url

    # 4. Relativo. Sem base declarada não há como decidir — devolve intacto.
    if relative_base is None:
        return url
    return _rewrite_relativo(caminho, sufixo, relative_base)


def _rewrite_relativo(caminho: str, sufixo: str, base: str) -> str:
    """
    Um caminho relativo dentro de `en/` resolve a partir de `en/`, não da raiz
    antiga. Ou o alvo tem irmão ali dentro (mantém), ou está um nível acima
    (ganha `../`).
    """
    nu = caminho[2:] if caminho.startswith("./") else caminho

    if nu.startswith("../"):
        # Já saía de `src/`; de `src/en/` precisa subir mais um degrau.
        return f"../{caminho}{sufixo}"

    if base == "src/en":
        if nu.endswith(".html") and nu[:-5] in mirrored_html_slugs():
            return f"{caminho}{sufixo}"  # irmão traduzido, mesma pasta
    elif base == "public/en":
        alvo = mirror_index().get(f"/{nu}")
        if alvo:
            return f"{caminho}{sufixo}"  # idem, dentro de public/en/

    if _ATIVOS_COMPARTILHADOS.search(nu) or "/" in nu:
        # `../x` já é inequívoco; o `./` de origem não precisa sobreviver.
        return f"../{nu}{sufixo}"

    # Nome sem extensão e sem barra (`href="proposta"`) é rota de página: de
    # dentro de `en/` ela já resolve para `/en/proposta`.
    return f"{caminho}{sufixo}"


def en_route(route_pt: str) -> str:
    """Rota EN de uma rota PT-BR conhecida (usada em canonical e hreflang)."""
    return mirror_index().get(route_pt, f"{EN_PREFIX}{route_pt}")
