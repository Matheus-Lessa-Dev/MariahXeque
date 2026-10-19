import Image from "next/image";
import { site } from "@/config/site";
import { Catalog } from "@/components/catalog";
import { Combo } from "@/components/combo";
import { Offer } from "@/components/offer";
import { Footer } from "@/components/footer";
import { Atelier } from "@/components/atelier";
import { HeroVisual, Reveal } from "@/components/reference-effects";
import { UniverseMenu } from "@/components/universe-menu";

const benefits = [
  { title: "Aulas passo a passo", description: "Aprenda cada técnica de forma clara, acompanhando o processo do início ao fim.", icon: "M4 4h16v11H4z M8 20h8 M12 15v5" },
  { title: "Modelos exclusivos", description: "Modelos selecionados para explorar novas possibilidades e cuidar de cada detalhe.", icon: "M5 5h14v14H5z M8 9h8 M8 12h8 M8 15h5" },
  { title: "Atualizações futuras", description: site.combo.updates, icon: "M20 11a8 8 0 0 0-14.9-4 M4 5v5h5 M4 13a8 8 0 0 0 14.9 4 M20 19v-5h-5" },
  { title: "Orientação de materiais", description: "Conheça os materiais e os cuidados de acabamento para construir suas peças.", icon: "M6 3h12v18H6z M9 7h6 M9 11h6 M9 15h3" },
  { title: "Técnicas do básico ao avançado", description: "Desenvolva sua técnica e explore diferentes possibilidades, com prática e no seu ritmo.", icon: "M4 19V5 M4 19h16 m-13-4 4-4 3 2 5-6" },
];

export default function Home() {
  return <>
    <main id="conteudo" tabIndex={-1}>
      <section className="croche-hero" id="inicio" tabIndex={-1} aria-labelledby="hero-title">
        <div className="croche-hero__container">
          <div className="croche-hero__content">
            <div className="croche-hero__label"><span aria-hidden="true" />{site.hero.eyebrow}</div>
            <h1 id="hero-title">{site.hero.title} <em>{site.hero.highlight}</em></h1>
            <p>{site.hero.description}</p>
            <a href="#cursos" className="croche-hero__button">{site.hero.cta}<span aria-hidden="true">→</span></a>
          </div>
          <HeroVisual />
        </div>
      </section>
      <UniverseMenu />
      <Catalog />
      <Combo />
      <section className="access-section" aria-labelledby="access-title">
        <div className="access-container">
          <div className="access-header">
            <div className="access-heading"><span className="access-label">O QUE VOCÊ VAI RECEBER</span><h2 id="access-title">Tudo o que você precisa<span>para começar do zero.</span></h2></div>
            <p className="access-intro">Um método pensado para levar você da primeira peça até a criação de produtos que podem gerar renda.</p>
          </div>
          <div className="access-list">{benefits.map((benefit, index) => <Reveal className="access-item" key={benefit.title}>
            <div className="access-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="access-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d={benefit.icon} /></svg></div>
            <div className="access-content"><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
            <div className="access-arrow" aria-hidden="true">→</div>
          </Reveal>)}</div>
          <div className="access-footer"><span className="access-footer-line" aria-hidden="true" /><span>Conhecimento para criar. Técnica para vender.</span><span className="access-footer-line" aria-hidden="true" /></div>
        </div>
      </section>
      <section className="about-mariah" id="mariah" tabIndex={-1} aria-labelledby="teacher-title">
        <div className="about-mariah__container">
          <Reveal className="about-mariah__content">
            <div className="about-mariah__top"><span className="about-mariah__label">QUEM ESTÁ POR TRÁS DO MÉTODO</span></div>
            <h2 className="about-mariah__title" id="teacher-title">Quem<span>sou eu?</span></h2>
            <div className="about-mariah__intro"><p>Eu sou <strong>Mariah Xeque</strong>, artesã especializada em joias de crochê.</p></div>
            <div className="about-mariah__text"><p>Comecei com poucos materiais e transformei minha paixão pelo artesanal em um negócio.</p><p>Ao longo dos anos, desenvolvi técnicas próprias para criar brincos, colares e acessórios de crochê com acabamento delicado, estrutura firme e aparência sofisticada.</p><p>Hoje compartilho esse conhecimento de forma simples e prática para que você também possa criar peças exclusivas — seja para uso próprio, para presentear ou para transformar sua arte em uma fonte de renda.</p></div>
            <div className="about-mariah__quote"><span className="about-mariah__quote-line" aria-hidden="true" /><p>“Com as técnicas certas, qualquer pessoa pode criar peças que despertam desejo.”</p></div>
            <a href="#cursos" className="about-mariah__button"><span>Conheça meu trabalho</span><b aria-hidden="true">→</b></a>
          </Reveal>
          <Reveal className="about-mariah__visual">
            <div className="about-mariah__image-wrap"><Image src="/images/mariah-colares.webp" alt="Mariah Xeque sorrindo e segurando colares coloridos" className="about-mariah__image" width={1086} height={1448} sizes="(max-width: 700px) 90vw, 500px" /></div>
            <div className="about-mariah__badge"><span>ARTESÃ</span><i aria-hidden="true" /><span>EDUCADORA</span><i aria-hidden="true" /><span>EMPREENDEDORA</span></div>
            <span className="about-mariah__side-number" aria-hidden="true">M X</span>
          </Reveal>
        </div>
      </section>
      <Atelier />
      <Offer />
    </main>
    <Footer />
  </>;
}
