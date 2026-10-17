# Pendências reais antes da publicação

O catálogo dos 11 cursos individuais está autorizado e implementado, com os destinos oficiais fornecidos. Sua apresentação não depende de nova confirmação. Os cursos não foram automaticamente incluídos no Super Combo.

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

A compra do combo permanece sem destino; o botão da oferta leva ao catálogo individual. O Club não é utilizado como compra. Os preços antigos estão em `historicalOffer` apenas como registro e ficam fora da interface.

## Demais dados

- Contato oficial de atendimento e Instagram: `contact`.
- Termos e política de privacidade aprovados: `legal.termsUrl`, `legal.privacyUrl`.
- Depoimentos reais autorizados: `testimonials`.
- URL de crédito NextWave, se desejada: `legal.creditUrl`.
- Para Bolsa Mikaela, nenhuma imagem local foi identificada com segurança; alternativa tipográfica já implementada, sem bloquear a apresentação do curso.
- Três HEIC preservados, mas sem decodificação disponível. As 40 imagens JPG/PNG foram examinadas visualmente.

A biografia da professora, os textos do catálogo e os links fornecidos já foram incorporados. A divergência histórica de Colares em Fios está documentada em `docs/FONTES.md`: a redação atual segue as seis variações informadas pelo usuário.

Não há pendência de canal para venda de peças físicas: essa frente foi removida do escopo. As etapas 2 e 3 adicionaram efeitos e revisão final sem preencher essas condições por suposição. Sem checkout confirmado, não há barra inferior de compra no mobile. O projeto foi entregue localmente; publicação depende de solicitação específica.


## Domínio e indexação

- Confirmar a URL final e preencher `site.seo.siteUrl`: isso fornece a base pública da imagem social e emite canonical/og:url. Enquanto nula, a base social é localhost, exclusivamente para revisão, sem canonical.
- Após aprovar dados e autorizar a publicação, ajustar `site.seo.indexable` para `true` e gerar novo build. Hoje permanece `noindex, nofollow`.
- Imagem de compartilhamento já entregue em `public/images/compartilhamento.jpg`, 1200 × 630, com fotografia real. Não há imagem ou domínio fictícios de publicação.

## Conferência externa dos destinos

As 11 URLs continuam exatamente como fornecidas. Na revisão final, a ferramenta de consulta voltou a identificar páginas de nove produtos (algumas com conteúdo parcial/em cache); Flowers e Karol retornaram falha de consulta, assim como o Club. Isso não confirma que os links estejam quebrados no navegador da aluna. Seus destinos autorizados foram preservados; recomenda-se a conferência manual nessas três páginas antes da divulgação. Não foi realizado login ou compra.
