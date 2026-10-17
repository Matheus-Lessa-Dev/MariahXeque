import Image from "next/image";
import { site } from "@/config/site";
import { Catalog } from "@/components/catalog";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Action, Arrow, Eyebrow } from "@/components/ui";
import { ConfirmedCurriculum, LearningDetails, Testimonials } from "@/components/conditional-content";
import { Faq } from "@/components/faq";
import { Offer } from "@/components/offer";
import { Footer } from "@/components/footer";

export default function Home() {
  return <>
    <Header />
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" tabIndex={-1} className="hero dark" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy"><Eyebrow>{site.hero.eyebrow}</Eyebrow><h1 id="hero-title">{site.hero.title} <em>{site.hero.highlight}</em></h1><p>{site.hero.description}</p><div className="hero-actions"><Action href="#combo">{site.hero.cta}</Action><a className="text-link" href="#cursos">{site.hero.secondaryCta}<Arrow /></a></div><div className="hero-note"><span aria-hidden="true" />{site.hero.note}</div></div>
          <div className="hero-visual"><div className="hero-frame"><Image className="hero-portrait" src="/images/mariah-brincos.webp" alt="Mariah Xeque com blusa verde e brincos artesanais dourados, mostrando os detalhes da peça em uso" width={1086} height={1448} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 480px" preload /><span className="photo-side-label" aria-hidden="true">MARIAH XEQUE · FEITO À MÃO</span></div><figure className="hero-detail"><Image src="/images/brinco-iris.webp" alt="Detalhe dos brincos de crochê em círculos sobrepostos, em vermelho e mostarda" width={1086} height={1448} sizes="(max-width: 700px) 140px, 180px" /><figcaption>{site.hero.caption}</figcaption></figure><span className="hero-edition" aria-hidden="true">Um universo de fios<br />e possibilidades.</span></div>
        </div>
        <div className="container hero-bottom"><span>Cursos de crochê</span><a href="#combo" aria-label="Continuar para conhecer o combo">Descubra o que você pode criar <span aria-hidden="true">↓</span></a><span>Por {site.brand}</span></div>
      </section>

      <section className="intro-section light" aria-labelledby="intro-title"><div className="container intro-grid"><Eyebrow>{site.introduction.eyebrow}</Eyebrow><h2 id="intro-title" className="preserve-lines">{site.introduction.title}</h2><p>{site.introduction.description}</p></div></section>

      <section id="combo" tabIndex={-1} className="section combo-section light" aria-labelledby="combo-title"><div className="container"><div className="combo-top"><div><Eyebrow>{site.combo.eyebrow}</Eyebrow><h2 id="combo-title" className="preserve-lines">{site.combo.title}</h2></div><p>{site.combo.description}</p></div><div className="combo-grid"><figure className="combo-photo"><Image src="/images/brincos-artesanais.webp" width={1086} height={1448} alt="Brincos em tons de marrom e mostarda em cartelas sobre uma bancada de trabalho, ao lado de uma planta e bolsa" sizes="(max-width: 700px) 90vw, 48vw" /><figcaption>{site.combo.imageCaption}</figcaption></figure><div className="combo-topics"><div className="topic-intro"><span>O universo do combo</span><span aria-hidden="true">↙</span></div>{site.combo.topics.map(topic => <article className="topic" key={topic.number}><span className="topic-number">{topic.number}</span><div><h3>{topic.title}</h3><p>{topic.description}</p></div></article>)}<Action href="#oferta" variant="text">Conhecer a oferta</Action></div></div><ConfirmedCurriculum /></div></section>

      <Catalog />

      <Gallery />

      <section className="section process-section light" aria-labelledby="process-title"><div className="container process-layout"><div className="process-copy"><Eyebrow>{site.process.eyebrow}</Eyebrow><h2 id="process-title" className="preserve-lines">{site.process.title}</h2><p>{site.process.description}</p><p className="process-aside preserve-lines">{site.process.aside}</p></div><figure className="process-photos"><Image className="process-main" src="/images/brinco-iris.webp" alt="Uma mão apresenta os brincos de crochê em cartela, no ambiente do ateliê" width={1086} height={1448} sizes="(max-width: 700px) 74vw, 34vw" /><Image className="process-detail" src="/images/brincos-flores.webp" alt="Apresentação de brincos florais de crochê em cartelas seguradas pelas mãos" width={1086} height={1448} sizes="(max-width: 700px) 39vw, 20vw" /><figcaption>{site.process.caption}</figcaption></figure></div></section>

      <section id="mariah" tabIndex={-1} className="teacher-section light" aria-labelledby="teacher-title"><div className="container teacher-layout"><div className="teacher-image"><Image src="/images/mariah-colares.webp" width={1086} height={1448} alt="Mariah Xeque sorrindo, com blusa laranja e colares coloridos em suas mãos" sizes="(max-width: 700px) 90vw, 48vw" /></div><div className="teacher-copy"><Eyebrow>{site.teacher.eyebrow}</Eyebrow><h2 id="teacher-title" className="preserve-lines">{site.teacher.title}</h2><p>{site.teacher.description}</p><p>{site.teacher.secondParagraph}</p><div className="teacher-signature">{site.brand}</div><Action href="#cursos" variant="text">{site.teacher.linkLabel}</Action></div></div></section>

      <section className="section audience-section dark" aria-labelledby="audience-title"><div className="container"><div className="audience-heading"><Eyebrow>{site.audience.eyebrow}</Eyebrow><h2 id="audience-title" className="preserve-lines">{site.audience.title}</h2></div><div className="audience-grid">{site.audience.items.map((item, index) => <article key={item.title}><span className="audience-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></div></section>

      <LearningDetails /><Testimonials /><Offer /><Faq />

    </main><Footer />
  </>;
}
