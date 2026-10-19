import { site } from "@/config/site";

export function Offer() {
  const offer = site.offer;
  const benefits = [
    ["Liberação após a compra", site.learning.release],
    ["Aprenda no seu ritmo", site.learning.format],
    ["Plataforma de aulas", site.learning.platform],
    ["Rever e praticar", site.learning.consultation],
    ["Prazo de acesso", site.learning.access],
    ["Dispositivos", site.learning.devices],
    ["Suporte", site.learning.support],
  ].filter(([, description]) => description);
  return <section className="mw-final-cta" id="mw-final-cta" tabIndex={-1} aria-labelledby="offer-title">
    <div className="mw-cta-container" id="oferta" tabIndex={-1}>
      <div className="mw-eyebrow"><span aria-hidden="true" />ACESSO AO SUPER COMBO<span aria-hidden="true" /></div>
      <h2 id="offer-title">Comece hoje a transformar<br /><em>seu crochê em renda.</em></h2>
      <p className="mw-cta-subtitle">Tenha acesso a um método completo para aprender, criar peças valorizadas e desenvolver sua própria fonte de renda.</p>
      <div className="mw-offer">
        <div className="mw-offer-info">
          <div className="mw-offer-tag">SUPER COMBO</div>
          <h3>Tudo o que você precisa<br />para começar do zero.</h3>
          <p>Cursos completos, técnicas, modelos e conteúdos para você aprender no seu ritmo e transformar conhecimento em peças que podem ser vendidas.</p>
          <div className="mw-benefits">{benefits.map(([title, description]) => <div className="mw-benefit" key={title}><div className="mw-check" aria-hidden="true">✓</div><div><strong>{title}</strong><span>{description}</span></div></div>)}</div>
          {site.combo.lessonCount !== null && <p className="mw-conditional">{site.combo.lessonCount} aulas</p>}
          {site.combo.modelCount !== null && <p className="mw-conditional">{site.combo.modelCount} modelos</p>}
          {site.combo.materials && <div className="mw-conditional"><h4>Materiais</h4><ul>{site.combo.materials.map(material => <li key={material}>{material}</li>)}</ul></div>}
          {site.combo.prerequisites && <p className="mw-conditional">{site.combo.prerequisites}</p>}
        </div>
        <div className="mw-price">
          <span className="mw-price-label">{offer.checkoutUrl ? "SUA PRÓXIMA CRIAÇÃO" : "SUPER COMBO"}</span>
          {offer.promotion && <p className="mw-availability">{offer.promotion.text} <time dateTime={offer.promotion.endsAt}>{new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "long" }).format(new Date(offer.promotion.endsAt))}</time></p>}
          {offer.price && <p className="mw-cash">{offer.price} <span>à vista</span></p>}
          {offer.installments && <p className="mw-price-intro">{offer.installments}</p>}
          {offer.interest && <p className="mw-availability">{offer.interest}</p>}
          {offer.paymentMethods && <p className="mw-availability">{offer.paymentMethods}</p>}
          {!offer.checkoutUrl && <p className="mw-availability" id="checkout-status">{offer.unavailableMessage}</p>}
          <div className="mw-price-line" aria-hidden="true" />
          {offer.checkoutUrl ? <a href={offer.checkoutUrl} className="mw-cta-button"><span>{offer.cta}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg></a> : <p className="mw-offer-unavailable">Inscrições do Super Combo indisponíveis nesta página.</p>}
          {offer.guarantee && <p className="mw-availability">Garantia: {offer.guarantee}</p>}
          {offer.refund && <p className="mw-availability">Reembolso: {offer.refund}</p>}
        </div>
      </div>
      <div className="mw-final-message"><span className="mw-final-line" aria-hidden="true" /><p>Seu próximo passo começa com uma decisão.</p><span className="mw-final-line" aria-hidden="true" /></div>
    </div>
  </section>;
}
