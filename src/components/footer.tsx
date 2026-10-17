import { site } from "@/config/site";
import { Arrow } from "./ui";

export function Footer() {
  const contactHref = site.contact.url || (site.contact.email ? `mailto:${site.contact.email}` : null);
  return <footer className="site-footer dark" id="contato" tabIndex={-1}>
    <div className="container"><div className="footer-top"><div><a className="footer-brand" href="#inicio">{site.brand}</a><p>A arte de criar, ponto a ponto.</p></div><div className="footer-contact"><p className="eyebrow">Continue aprendendo</p><a className="text-link" href={site.links.studentAccess}>Já sou aluna — acessar meus cursos<Arrow diagonal /></a><a className="text-link" href={site.links.creatorProfile}>Perfil oficial na Hotmart<Arrow diagonal /></a>{contactHref ? <a className="text-link" href={contactHref}>{site.contact.email || "Fale com Mariah"}<Arrow diagonal /></a> : null}{site.contact.instagram && <a className="text-link" href={site.contact.instagram}>Instagram<Arrow diagonal /></a>}</div><a href="#inicio" className="back-top">Voltar ao início <Arrow diagonal /></a></div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} {site.legal.copyright}</small><div className="legal-links">{site.legal.termsUrl && <a href={site.legal.termsUrl}>Termos de uso</a>}{site.legal.privacyUrl && <a href={site.legal.privacyUrl}>Política de privacidade</a>}</div>{site.legal.creditUrl ? <a href={site.legal.creditUrl}>{site.legal.credit}</a> : <span>{site.legal.credit}</span>}</div>
    </div>
  </footer>;
}
