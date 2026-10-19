import Image from "next/image";
import { site } from "@/config/site";

export function Atelier() {
  const contact = site.contact.url || (site.contact.email ? `mailto:${site.contact.email}` : null);
  return <section className="atelier-orders atelier-pieces" id="encomendas" tabIndex={-1} aria-labelledby="atelier-title">
    <div className="atelier-orders__container">
      <div className="atelier-orders__intro">
        <div className="atelier-orders__eyebrow"><span aria-hidden="true" />ATELIÊ MARIAH XEQUE</div>
        <h2 id="atelier-title">As queridinhas das nossas <em>clientes.</em></h2>
        <p className="atelier-orders__description">Conheça as joias artesanais que conquistaram corações e descubra seus próximos acessórios favoritos.</p>
        {contact ? <a href={contact} className="atelier-orders__cta"><span>Consultar encomendas</span><strong aria-hidden="true">↗</strong></a> : <p className="atelier-orders__contact-status">O contato para encomendas ainda não está disponível nesta página.</p>}
      </div>
      <div className="atelier-orders__catalog" id="catalogo" tabIndex={-1}>
        {site.physicalProducts.map(product => <article className={`atelier-piece${product.image ? " atelier-piece--with-photo" : ""}`} key={product.id} data-physical-product={product.id}>
          {product.image && <div className="atelier-piece__image"><Image src={product.image} alt={product.alt} width={1080} height={1350} sizes="(max-width: 700px) 90vw, 600px" /></div>}
          <div className="atelier-piece__details"><span className="atelier-orders__catalog-label">JOIAS ARTESANAIS</span><h3>{product.name}</h3><p className="atelier-piece__price">{product.price}</p>{contact && <a href={contact} className="atelier-orders__cta">Consultar este conjunto <span aria-hidden="true">↗</span></a>}</div>
        </article>)}
      </div>
    </div>
  </section>;
}
