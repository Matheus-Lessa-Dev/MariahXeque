# Mariah Xeque — cursos de crochê

Projeto local em Next.js, React e TypeScript. O layout foi integralmente substituído pelo design de `mariah-independente.html`. A referência foi lida inteira e removida após a conversão, conforme solicitado. Sem publicação ou alteração do site original.

Atualização da cliente de 19/10: abertura e descrições revisadas, menu visual inicial, Super Combo em grade e encomendas separadas dos cursos. O catálogo geral mantém o carrossel, com Entre Fios e Cristais em primeiro, Coleção Imperatriz em segundo e Colares em Fios em terceiro. O menu “Explore o universo Mariah Xeque” tem acesso direto à seção do Super Combo. Após a exclusão de Bolsa Mikaela e inclusão de Imperatriz solicitadas em 03/11/2026, são 13 cursos e 11 links individuais; Imperatriz e Blusa Atena têm link ainda pendente. O ateliê recebe encomendas personalizadas pelo WhatsApp, sem catálogo de produtos ou preços. Fotografias e capas são locais. Sem header tradicional ou FAQ acrescentado.

## Executar

```powershell
npm run dev
```

Abra http://localhost:3000. Para outra porta: `npm run dev -- --port 3100`.

Para produção local:

```powershell
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

Em outra máquina, execute `npm ci` primeiro. Este workspace também tem cache em `.work/npm-cache`.

## Manutenção

| Conteúdo | Local |
| --- | --- |
| 13 cursos, descrições, capas e URLs | `src/config/courses.ts` |
| Menu visual inicial | `src/components/universe-menu.tsx` |
| Biografia, galeria, acesso e condições | `src/config/site.ts` |
| Composição e checkout do Super Combo | `site.combo.confirmedCourses`, `site.offer.checkoutUrl` |
| Grade do Super Combo e benefícios | `src/components/combo.tsx` |
| Layout convertido | `src/app/page.tsx`, `src/app/globals.css` |
| Carrosséis e galeria | `src/components/carousel.tsx`, `src/components/gallery.tsx` |
| Encomendas personalizadas | `src/components/atelier.tsx` |
| Redes sociais e atendimento | `site.links.youtube`, `site.contact` |
| Âncoras e compensação do cabeçalho | `src/components/page-effects.tsx`, `src/lib/internal-navigation.ts` |
| Fotografias originais | `IMG/` |
| Otimização e manifesto | `scripts/prepare-images.mjs`, `public/images/manifest.json` |

O Super Combo foi recriado em 03/11/2026 conforme `IMG/ReferenciaSuperCombo.jpeg`, com título dourado e creme, 12 cursos em duas colunas, 21 modelos de brincos, 5 de colares e investimento de 12x de R$ 67,21 ou R$ 649,90 à vista. O botão usa o checkout Hotmart fornecido pelo usuário, com todos os parâmetros preservados. A oferta está integrada à seção do combo, sem repetição no fim da página. `null` representa informação ainda não informada. O Club serve ao acesso das alunas.

O domínio público continua não preenchido e a página permanece `noindex, nofollow`. As pendências comerciais e de conteúdo constam em [PENDENCIAS.md](PENDENCIAS.md).

## Validação

```powershell
npm run assets
npm run check
npm run lint
npm run build
```

Com o servidor em execução:

```powershell
$env:QA_URL='http://127.0.0.1:3100'
npm run qa
```

A auditoria usa Chrome/Edge local. Capturas e relatório em `.work/qa-reference/`. Verifica 360, 390, 768, 1024, 1440 e 1920 px, textos e preços exatos do Super Combo, checkout, ordem dos cursos, imagens, carrossel, teclado, mouse, toque, encomendas, âncoras, histórico, movimento reduzido e conteúdo sem JavaScript. `QA_EVIDENCE_DIR` e `QA_BROWSER_PATH` permitem escolher pasta e navegador.

Entrega atual: [docs/ALTERACOES-CLIENTE-1910.md](docs/ALTERACOES-CLIENTE-1910.md). Evidências desta alteração em `.work/qa-cliente-1910/`. Os documentos das etapas anteriores registram o histórico e não descrevem o layout atual.
