import { site } from "@/config/site";

export function Footer() {
  const contact = site.contact.url || (site.contact.email ? `mailto:${site.contact.email}` : null);
  return <footer className="mw-footer" id="contato" tabIndex={-1}>
    <div className="mw-footer-inner">
      <div className="mw-footer-brand"><span className="mw-footer-logo">MARIAH XEQUE</span><span className="mw-footer-description">Crochê que se transforma em arte, técnica e oportunidade.</span></div>
      <div className="mw-footer-links"><a href="#cursos">Cursos</a><a href="#encomendas">Encomendas</a><a href={site.links.studentAccess}>Já sou aluna — acessar meus cursos</a>{contact && <a href={contact}>Atendimento</a>}{site.contact.instagram && <a href={site.contact.instagram}>Instagram</a>}<a href="#inicio">Voltar ao início ↑</a></div>
    </div>
    <div className="mw-footer-bottom"><span>© {new Date().getFullYear()} {site.legal.copyright}</span><div className="mw-footer-links">{site.legal.termsUrl && <a href={site.legal.termsUrl}>Termos de uso</a>}{site.legal.privacyUrl && <a href={site.legal.privacyUrl}>Política de privacidade</a>}</div><span className="mw-developed">{site.legal.creditUrl ? <a href={site.legal.creditUrl}>{site.legal.credit}</a> : site.legal.credit}</span></div>
  </footer>;
}
