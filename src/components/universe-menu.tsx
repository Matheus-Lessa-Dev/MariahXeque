import { site } from "@/config/site";
import { Icon } from "./icon";

export function UniverseMenu() {
  const entries = [
    { icon: "courses" as const, title: "Cursos de crochê", description: "Aprenda novas técnicas e crie peças autorais.", href: "#cursos" },
    { icon: "jewel" as const, title: "Encomende suas peças", description: "Conheça as joias artesanais e solicite sua encomenda.", href: "#encomendas" },
    { icon: "youtube" as const, title: "Meu canal no YouTube", description: "Inspire-se com tutoriais, dicas e conteúdos criativos.", href: site.links.youtube },
    { icon: "instagram" as const, title: "Acompanhe meu trabalho", description: "Veja novidades, lançamentos e bastidores do ateliê.", href: site.contact.instagram },
  ];
  return <nav className="universe-menu" aria-labelledby="universe-title">
    <div className="universe-menu__container">
      <h2 id="universe-title">EXPLORE O UNIVERSO MARIAH XEQUE</h2>
      <div className="universe-menu__grid">{entries.map(entry => {
        const content = <><Icon name={entry.icon} /><span className="universe-menu__copy"><strong>{entry.title}</strong><span>{entry.description}</span>{!entry.href && <small>Link oficial ainda não informado.</small>}</span><span className="universe-menu__arrow" aria-hidden="true">{entry.href ? "↗" : "—"}</span></>;
        return entry.href ? <a className="universe-menu__item" href={entry.href} key={entry.title}>{content}</a> : <div className="universe-menu__item universe-menu__item--unavailable" key={entry.title}>{content}</div>;
      })}</div>
    </div>
  </nav>;
}
