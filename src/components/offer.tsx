import Image from "next/image";
import { site } from "@/config/site";
import { Action, Eyebrow } from "./ui";

export function Offer() {
  const offer = site.offer;
  const promotion = offer.promotion;
  return <section id="oferta" tabIndex={-1} className="section offer-section dark" aria-labelledby="offer-title">
    <div className="container offer-layout">
      <div className="offer-editorial"><Eyebrow>{offer.eyebrow}</Eyebrow><h2 id="offer-title" className="preserve-lines">{offer.title}</h2><p>{offer.description}</p></div>
      <div className="offer-panel">
        <Image src="/images/brincos-artesanais.webp" width={1086} height={1448} alt="Brincos artesanais em tons terrosos apresentados em cartelas de Mariah Xeque" className="offer-photo" sizes="(max-width: 700px) 90vw, 460px" />
        <div className="offer-details"><Eyebrow>Aprenda com Mariah Xeque</Eyebrow><h3>{site.product}</h3>
          {promotion && <p className="promotion">{promotion.text} <time dateTime={promotion.endsAt}>{new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "long" }).format(new Date(promotion.endsAt))}</time></p>}
          {offer.price && <p className="price">{offer.price}<span>à vista</span></p>}
          {offer.installments && <p>{offer.installments}</p>}
          {offer.interest && <p className="small-print">{offer.interest}</p>}
          {offer.paymentMethods && <p>{offer.paymentMethods}</p>}
          <Action href={offer.checkoutUrl || "#cursos"} descriptionId={!offer.checkoutUrl ? "checkout-status" : undefined}>{offer.checkoutUrl ? offer.cta : offer.fallbackCta}</Action>
          {!offer.checkoutUrl && <p className="availability-note" id="checkout-status">{offer.unavailableMessage}</p>}
          {offer.guarantee && <div className="guarantee"><h4>Garantia</h4><p>{offer.guarantee}</p></div>}
          {offer.refund && <div className="guarantee"><h4>Reembolso</h4><p>{offer.refund}</p></div>}
          <p className="offer-footnote">{offer.footnote}</p>
        </div>
      </div>
    </div>
  </section>;
}
