# Mariah Xeque — cursos de crochê

Projeto local em Next.js, React e TypeScript. O layout foi integralmente substituído pelo design de `mariah-independente.html`. A referência foi lida inteira e removida após a conversão, conforme solicitado. Sem publicação ou alteração do site original.

Atualização da cliente de 19/10: abertura e descrições revisadas, menu visual inicial, Super Combo em grade e encomendas separadas dos cursos. O catálogo geral mantém o carrossel e os 11 cursos anteriores, com a inclusão de Entre Fios e Cristais (primeiro, com o link enviado) e Blusa Atena (link ainda pendente). Conjunto Solare está cadastrado como peça física. Fotografias e capas são locais. Sem header tradicional ou FAQ acrescentado.

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
| Conjunto Solare, foto e preço | `site.physicalProducts` |
| Redes sociais e atendimento | `site.links.youtube`, `site.contact` |
| Âncoras e compensação do cabeçalho | `src/components/page-effects.tsx`, `src/lib/internal-navigation.ts` |
| Fotografias originais | `IMG/` |
| Otimização e manifesto | `scripts/prepare-images.mjs`, `public/images/manifest.json` |

`null` representa informação não confirmada. Os preços históricos não são uma oferta atual. O Club serve exclusivamente ao acesso das alunas. Sem checkout específico confirmado, o Super Combo informa a indisponibilidade da compra e não redireciona para outro produto. A grade demonstra técnicas, sem declarar inclusão dos cursos na oferta. Solare mantém preço próprio e não usa links dos cursos.

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

A auditoria usa Chrome/Edge local. Capturas e relatório em `.work/qa-reference/`. Verifica 360, 390, 768, 1024, 1440 e 1920 px, destinos, imagens, carrosséis, teclado, mouse, toque, galeria, encomendas, âncoras, histórico, movimento reduzido e conteúdo sem JavaScript. `QA_EVIDENCE_DIR` e `QA_BROWSER_PATH` permitem escolher pasta e navegador.

Entrega atual: [docs/ALTERACOES-CLIENTE-1910.md](docs/ALTERACOES-CLIENTE-1910.md). Evidências desta alteração em `.work/qa-cliente-1910/`. Os documentos das etapas anteriores registram o histórico e não descrevem o layout atual.
