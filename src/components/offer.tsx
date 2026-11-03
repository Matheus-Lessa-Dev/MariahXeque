import { site } from "@/config/site";

export function Offer() {
  const { offer, combo } = site;
  const buttonContent = <><span>{offer.cta}</span><span className="combo-investment__arrow" aria-hidden="true">›</span></>;

  return <div className="combo-investment" id="oferta" tabIndex={-1} aria-labelledby="combo-investment-title">
    <div className="combo-investment__panel">
      <div className="combo-investment__summary">
        <h3 id="combo-investment-title">SUPER COMBO DE CROCHÊ</h3>
        <ul><li>{combo.confirmedCourses.length} cursos inclusos</li><li>{combo.earringModelCount} modelos de brincos</li><li>{combo.necklaceModelCount} modelos de colares em crochê</li></ul>
      </div>
      <div className="combo-investment__price">
        <p className="combo-investment__label">INVESTIMENTO</p>
        <p className="combo-investment__installments"><span>{offer.installmentCount}x de</span> <strong>{offer.installmentAmount}</strong></p>
        <p className="combo-investment__cash">ou {offer.price} à vista</p>
      </div>
    </div>
    {offer.checkoutUrl ? <a className="combo-investment__button" href={offer.checkoutUrl}>{buttonContent}</a> : <button className="combo-investment__button" type="button" disabled aria-describedby="combo-checkout-status">{buttonContent}</button>}
    {!offer.checkoutUrl && <p className="combo-investment__status" id="combo-checkout-status">Link de inscrição em breve.</p>}
  </div>;
}
