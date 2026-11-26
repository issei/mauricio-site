---
id: prototipo-nova-home
titulo: Protótipo local da nova home "O pensamento em prática"
data: 2026-11-26
leitor: Issei e quem implementar a home a partir do SDD
padrao_de_redacao: ptbr-controlado (perfil Técnico)
---

# Protótipo local da nova home

## O que é

Este é o protótipo da nova página inicial descrita no
[SDD da nova home](../SDD-nova-home.md). Ele serve para validar a rolagem, as
passagens entre as cenas e a navegação antes de implementar a página de
verdade. **Não é a página final.**

- **Estado:** revisão 6, igual ao commit local `f23794b9` da branch
  `local/nova-home`, que existe só na máquina do Issei. As revisões 5 e 6
  estão no [SDD, §12](../SDD-nova-home.md).
- **Tecnologia:** só HTML e CSS. As animações usam CSS ligado à rolagem
  (`animation-timeline`). Não há JavaScript de animação.
- **Por que fica em `docs/` e não em `src/`:** o Vite publica todo `.html` de
  `src/`. Um merge na `main` não pode levar o protótipo para produção.

## Arquivos

| Arquivo | O que é |
| :-- | :-- |
| `nova-home.template.html` | A página. É gerada por `scripts/gen.cjs`; não edite à mão. |
| `home.css` | Todo o estilo e todas as animações. |
| `home-proto/` | Imagens. Quatro não são versionadas (veja abaixo). |
| `scripts/gen.cjs` | Gera o HTML. Copia os blocos `PF:*` de `src/index.html`. |
| `scripts/val5.cjs` | Faz capturas em pontos da rolagem e confere o cabeçalho, o menu e os pontos de progresso. Também captura o mosaico de movimento reduzido. |
| `scripts/med6.cjs`, `scripts/med6m.cjs` | Medem a rolagem no computador e no celular (390×844). Capturam a tela a cada toque de seta e comparam com a captura anterior. Uma diferença abaixo de 0,15 conta como toque "morto". |
| `scripts/trace6.cjs` | Grava um trace do Chromium da primeira rolagem, para achar tarefas longas e decodificação de imagem. |

## Como rodar

1. Crie as imagens que faltam (próxima seção).
2. Na raiz do repositório, suba o servidor:

   ```powershell
   npx vite docs/specs/pages/portfolio/prototipo --port 5180 --host 127.0.0.1
   ```

3. Abra `http://127.0.0.1:5180/nova-home.template.html`.

O servidor serve só esta pasta, então os links para outras páginas do site
(`/curriculo.html`, `/videos.html` etc.) não abrem.

Os scripts de medição esperam o servidor na porta 5180. Eles usam o
Playwright e o `sharp` do `node_modules` da raiz e gravam o resultado em
`tmp/`, que não é versionado. Exemplo:

```powershell
node docs/specs/pages/portfolio/prototipo/scripts/med6.cjs
```

Para comparar as variantes, adicione o atributo no elemento `.hm-s01` pelo
DevTools:

- `data-noite="corte"`: a passagem para a noite volta a ser um corte seco.
- `data-ouro="dois"`: o símbolo da cena (`.hm-sim--c`) também fica dourado.

Para gerar o HTML de novo depois de mudar `scripts/gen.cjs`:

```powershell
node docs/specs/pages/portfolio/prototipo/scripts/gen.cjs
```

## Imagens que faltam

Estes quatro arquivos estão no `.gitignore` de `home-proto/`. Crie-os com
exatamente estes nomes:

| Arquivo | Origem | Tamanho |
| :-- | :-- | :-- |
| `retrato.webp` | Foto real, feita de `assets-fonte/retrato.jpg`, que já está no repositório. Use o comando abaixo. | 1200×1500 |
| `teclado.webp` | **Foto gerada por IA.** Mãos num teclado (cena 04). | 960×640 |
| `teste.webp` | **Foto gerada por IA.** Duas telas de teste (cena 04). | 960×640 |
| `operacao.webp` | **Foto gerada por IA.** Monitor de operação à noite (cena 05). | 1600×1066 |

Para gerar o retrato, rode na raiz do repositório:

```powershell
node -e "require('sharp')('assets-fonte/retrato.jpg').resize(1200,1500).webp({quality:82}).toFile('docs/specs/pages/portfolio/prototipo/home-proto/retrato.webp')"
```

> [!WARNING]
> **As fotos geradas por IA são só para o protótipo.** Elas não entram no
> repositório nem na página publicada. Na página real, elas são trocadas
> pelas fotos 4, 6 e 7 da lista de fotos do SDD (§8). Enquanto essas fotos
> não existirem, vale o plano B do SDD.

Sem essas imagens, a página abre, mas elas não carregam.

As oito imagens versionadas são capturas do próprio site, cerca de 430 KB no
total. `diagrama.webp` é o diagrama do Agent Ready, `estados.webp` é a
Figura 3 de `formulacao-de-problemas`, e as outras seis são as capas dos
cards.
