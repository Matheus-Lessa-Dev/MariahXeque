# Pendências reais antes da publicação

Atualização visual de 19/10/2026: o layout de `mariah-independente.html` foi implementado e a referência removida conforme solicitado. As pendências abaixo continuam válidas. A galeria é referência de aprendizado, não uma lista de cursos incluídos no Super Combo. Entrega atual em `docs/SUBSTITUICAO-VISUAL.md`.

## Alterações da cliente — 19/10 (estado atual)

- Fotografia correspondente ao Conjunto Solare: ausente nos arquivos disponíveis. O nome e o preço fornecidos estão na seção física, sem atribuir uma fotografia de outro produto.
- Contato oficial para encomendas: ainda não informado. Encomendas permanecem sem CTA de contato ativo. YouTube e Instagram foram fornecidos pelo usuário e adicionados ao menu: `https://www.youtube.com/@mariahxeque` e `https://www.instagram.com/mariahxeque/`.
- Link de inscrição da Blusa Atena: não localizado. O curso tem capa e descrição autorizadas e permanece visível sem botão de compra.
- A pasta `referencias` contém somente as capturas do menu e do Super Combo. Não contém novas capas finais, foto do Solare ou referência da abertura. Foram usadas as capas oficiais visualmente identificadas de `IMG`, incluindo Entre Fios e Cristais e Blusa Atena.
- Das oito frases sem curso indicado, duas tiveram associação segura: dois modelos → Eloá/Camélia; três modelos → Folha/Esther/Elo. As outras seis continuam sem associação: cinco modelos metalizados; pedrarias que iluminam; mais vendido; cara do verão; elegantes e estilosos; conjunto mais queridinho. Os demais cursos mantêm suas descrições anteriores ou as frases explicitamente atribuídas no prompt.
- A arte do Combo não confirma sua composição nem condições comerciais: “12 cursos inclusos”, apostilas, listas, acesso vitalício e suporte continuam sem comprovação. As categorias ilustrativas, Bolsa Sofia e contagens da arte não foram cadastradas como produtos. A grade demonstra técnicas de cursos reais, com aviso de que não confirma inclusão.

O catálogo agora tem 13 cursos: os 11 anteriores, Entre Fios e Cristais e Blusa Atena. Os 11 destinos antigos foram preservados. Entre Fios e Cristais usa o link prioritário `https://go.hotmart.com/W107711262G`, cujo redirecionamento GET foi identificado em 19/10/2026 para `https://hotmart.com/pt-br/marketplace/produtos/curso-entre-fios-e-cristais/W107711262G`. Nenhum curso foi automaticamente incluído no Super Combo.

## Super Combo

| Informação pendente | Configuração |
| --- | --- |
| Composição específica de cursos e técnicas | `combo.confirmedCourses` |
| Quantidade de aulas e modelos | `combo.lessonCount`, `combo.modelCount` |
| Lista exata de materiais e pré-requisitos | `combo.materials`, `combo.prerequisites` |
| Destino oficial específico para compra | `offer.checkoutUrl` |
| Preços atuais, parcelas, juros e meios de pagamento | `offer.price`, `offer.installments`, `offer.interest`, `offer.paymentMethods` |
| Prazo e condições exatas de acesso | `learning.access` |
| Dispositivos compatíveis | `learning.devices` |
| Canal, duração e regras do suporte | `learning.support` |
| Garantia e procedimento de reembolso | `offer.guarantee`, `offer.refund` |
| Promoção real e encerramento, se houver | `offer.promotion` |

Benefícios recuperados e autorizados: aulas passo a passo, modelos exclusivos selecionados, atualizações futuras, orientação de materiais e técnicas do básico ao avançado. A programação de atualizações não foi informada. Funcionamento recuperado: Hotmart, liberação após confirmação da compra, aprendizado no próprio ritmo e conteúdo para consulta. Isso não confirma acesso vitalício ou suporte.

A compra do combo permanece sem destino e sem CTA ativo; a oferta não redireciona para um curso individual ou para o Club. Os preços antigos estão em `historicalOffer` apenas como registro e ficam fora da interface.

## Demais dados

- Contato oficial de atendimento: `contact.url` ou `contact.email`. Instagram já preenchido com o perfil fornecido.
- Termos e política de privacidade aprovados: `legal.termsUrl`, `legal.privacyUrl`.
- Depoimentos reais autorizados: `testimonials`.
- URL de crédito NextWave, se desejada: `legal.creditUrl`.
- Para Bolsa Mikaela, nenhuma imagem local foi identificada com segurança; alternativa tipográfica já implementada, sem bloquear a apresentação do curso.
- Três HEIC preservados, mas sem decodificação disponível. As 40 imagens JPG/PNG foram examinadas visualmente.

A biografia da professora, os textos do catálogo e os links fornecidos já foram incorporados. A divergência histórica de Colares em Fios está documentada em `docs/FONTES.md`; a frase exata enviada pela cliente em 19/10 não anuncia quantidade de modelos e substitui a descrição anterior.

Encomendas de peças físicas foram reincluídas expressamente pela cliente em 19/10. A foto do Solare e o canal oficial de atendimento continuam pendentes. Sem checkout confirmado, não há barra inferior de compra no mobile. O projeto permanece local e não foi publicado.


## Domínio e indexação

- Confirmar a URL final e preencher `site.seo.siteUrl`: isso fornece a base pública da imagem social e emite canonical/og:url. Enquanto nula, a base social é localhost, exclusivamente para revisão, sem canonical.
- Após aprovar dados e autorizar a publicação, ajustar `site.seo.indexable` para `true` e gerar novo build. Hoje permanece `noindex, nofollow`.
- Imagem de compartilhamento já entregue em `public/images/compartilhamento.jpg`, 1200 × 630, com fotografia real. Não há imagem ou domínio fictícios de publicação.

## Conferência externa dos destinos

As 11 URLs continuam exatamente como fornecidas. Na revisão final, a ferramenta de consulta voltou a identificar páginas de nove produtos (algumas com conteúdo parcial/em cache); Flowers e Karol retornaram falha de consulta, assim como o Club. Isso não confirma que os links estejam quebrados no navegador da aluna. Seus destinos autorizados foram preservados; recomenda-se a conferência manual nessas três páginas antes da divulgação. Não foi realizado login ou compra.
