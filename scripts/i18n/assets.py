"""
Mapa de ativos públicos PT-BR → /en/ — fonte única da verdade do i18n.

Existe porque três consumidores precisam do MESMO mapa e não podem divergir:
o tradutor (para reescrever links internos), o orquestrador Node
(`scripts/sync-i18n.mjs`, para saber o que está velho) e os testes de
invariantes. Duplicar a lista em JS e em Python garantiria que um dia elas
discordariam — então o Python é a fonte e o Node a lê via `--print-map`.

Contrato do escopo (SDD `docs/specs/pages/SDD-i18n-en.md` §2):
  * entra o que é servido ao público — página HTML, Markdown de ingestão por
    IA, dados estruturados;
  * NÃO entra governança interna (`.agents/`, `.claude/`, `docs/specs/`) nem
    ferramenta administrativa (`admin`, `diagnostic`, `test-github`, ...).
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "src"
PUBLIC = ROOT / "public"

SITE = "https://mauricio.issei.com.br"
EN_PREFIX = "/en"

#: Páginas fora do escopo público. Espelha `NAO_PUBLICAS` de
#: `scripts/audit-site.mjs` mais os utilitários internos listados na SDD §2.2.
#: Traduzir um painel administrativo não serve visitante nenhum e ainda cria
#: superfície indexável.
HTML_NAO_PUBLICAS = frozenset(
    {
        "404",
        "admin",
        "admin-editor",
        "diagnostic",
        "test-github",
        "exemplopdi",
        "mapmind",
        "vsl",
    }
)

#: Mesma exclusão de `vite.config.js`: arquivo de trabalho não é página.
NAO_CONSTRUIDOS = re.compile(r"(^|[.-])(bkp|backup|template)$", re.IGNORECASE)

#: Ativos AEO de nome fixo (não são `*.md`, mas são consumidos por agentes).
PUBLIC_AEO_FILES = ("llms.txt", "llms-full.txt")

#: Dados estruturados espelhados. `cv.json` é o currículo; `star.json` são os
#: casos STAR — ambos citados como fonte em `llms.txt`.
PUBLIC_JSON_FILES = ("cv.json", "star.json")


@dataclass(frozen=True)
class Asset:
    """Um ativo PT-BR e o seu espelho em inglês."""

    kind: str  #: "html" | "markdown" | "json" | "aeo"
    source: Path  #: caminho absoluto do original PT-BR
    target: Path  #: caminho absoluto do espelho /en/
    route_pt: str  #: rota pública canônica em PT-BR (ex.: "/proposta")
    route_en: str  #: rota pública canônica em EN (ex.: "/en/proposta")

    @property
    def rel_source(self) -> str:
        return self.source.relative_to(ROOT).as_posix()

    @property
    def rel_target(self) -> str:
        return self.target.relative_to(ROOT).as_posix()

    def as_dict(self) -> dict:
        return {
            "kind": self.kind,
            "source": self.rel_source,
            "target": self.rel_target,
            "routePt": self.route_pt,
            "routeEn": self.route_en,
        }


def _html_route(slug: str) -> str:
    """Rota canônica de uma página. A home é `/`, o resto é `/<slug>`."""
    return "/" if slug == "index" else f"/{slug}"


def html_assets() -> list[Asset]:
    out = []
    for path in sorted(SRC.glob("*.html")):
        slug = path.stem
        if slug in HTML_NAO_PUBLICAS or NAO_CONSTRUIDOS.search(slug):
            continue
        route = _html_route(slug)
        out.append(
            Asset(
                kind="html",
                source=path,
                target=SRC / "en" / path.name,
                route_pt=route,
                route_en=f"{EN_PREFIX}/" if slug == "index" else f"{EN_PREFIX}{route}",
            )
        )
    return out


def public_assets() -> list[Asset]:
    out = []
    for path in sorted(PUBLIC.glob("*.md")):
        route = f"/{path.name}"
        out.append(
            Asset(
                kind="markdown",
                source=path,
                target=PUBLIC / "en" / path.name,
                route_pt=route,
                route_en=f"{EN_PREFIX}{route}",
            )
        )
    for name in PUBLIC_AEO_FILES:
        path = PUBLIC / name
        if path.exists():
            out.append(
                Asset(
                    kind="aeo",
                    source=path,
                    target=PUBLIC / "en" / name,
                    route_pt=f"/{name}",
                    route_en=f"{EN_PREFIX}/{name}",
                )
            )
    for name in PUBLIC_JSON_FILES:
        path = PUBLIC / name
        if path.exists():
            out.append(
                Asset(
                    kind="json",
                    source=path,
                    target=PUBLIC / "en" / name,
                    route_pt=f"/{name}",
                    route_en=f"{EN_PREFIX}/{name}",
                )
            )
    return out


def all_assets() -> list[Asset]:
    return html_assets() + public_assets()


def mirror_index() -> dict[str, str]:
    """
    Índice `rota PT-BR → rota EN` usado para reescrever links internos.

    A chave é a rota *e* as suas variantes de escrita (`/proposta`,
    `/proposta.html`, `./proposta.html`). Só o que está aqui é reescrito: um
    link para `/aeo.css` ou `/og-index.png` aponta para o MESMO arquivo nas duas
    línguas e reescrevê-lo produziria um 404.
    """
    index: dict[str, str] = {}
    for asset in all_assets():
        index[asset.route_pt] = asset.route_en
        if asset.kind == "html":
            slug = asset.source.stem
            if slug == "index":
                index["/index.html"] = f"{EN_PREFIX}/index.html"
            else:
                index[f"/{slug}.html"] = f"{EN_PREFIX}/{slug}.html"
    return index


def mirrored_html_slugs() -> frozenset[str]:
    """Slugs com espelho em `src/en/` — quem tem irmão dentro de `en/`."""
    return frozenset(a.source.stem for a in html_assets())


def as_json() -> str:
    return json.dumps(
        {
            "root": ROOT.as_posix(),
            "site": SITE,
            "enPrefix": EN_PREFIX,
            "assets": [a.as_dict() for a in all_assets()],
        },
        ensure_ascii=False,
        indent=2,
    )
