import { site } from "@/config/site";

export function Atelier() {
  const contact = site.contact.url || (site.contact.email ? `mailto:${site.contact.email}` : null);
  const message = "Olá, Mariah! Gostaria de fazer uma encomenda personalizada. Podemos conversar sobre a minha ideia?";
  const orderContact = site.contact.url ? `${site.contact.url}?text=${encodeURIComponent(message)}` : contact;
  return <section className="atelier-orders" id="encomendas" tabIndex={-1} aria-labelledby="atelier-title">
    <div className="atelier-orders__container">
      <div className="atelier-orders__intro">
        <div className="atelier-orders__eyebrow"><span aria-hidden="true" />ATELIÊ MARIAH XEQUE</div>
        <h2 id="atelier-title">Encomendas personalizadas <em>com a Mariah.</em></h2>
        <p className="atelier-orders__description">Tem uma ideia em mente? Converse com a Mariah sobre modelos, cores e detalhes e combine uma peça personalizada, feita à mão para você.</p>
        {orderContact ? <>
          <a href={orderContact} className="atelier-orders__cta atelier-orders__cta--primary"><span>Pedir encomenda personalizada</span><strong aria-hidden="true">↗</strong></a>
          <p className="atelier-orders__personal">Atendimento direto com a Mariah, pelo WhatsApp.</p>
        </> : <p className="atelier-orders__contact-status">O contato para encomendas ainda não está disponível nesta página.</p>}
      </div>
    </div>
  </section>;
}
