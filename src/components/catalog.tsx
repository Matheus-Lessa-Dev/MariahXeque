import Image from "next/image";
import { site } from "@/config/site";
import { Arrow, Eyebrow } from "./ui";

export function Catalog() {
  return <section id="cursos" tabIndex={-1} className="section catalog-section light" aria-labelledby="catalog-title">
    <div className="container">
      <div className="catalog-heading"><div><Eyebrow>Cursos individuais</Eyebrow><h2 id="catalog-title">Aprenda a criar.<br /><em>Transforme sua criatividade.</em></h2></div><p>Escolha seu próximo projeto e descubra técnicas para transformar fios em peças únicas, com personalidade e cuidado em cada detalhe.</p></div>
      <p className="catalog-note">Cada curso tem sua própria apresentação na Hotmart. A seleção abaixo é independente da composição do Super Combo.</p>
      <div className="catalog-grid">{site.catalog.map((course, index) => <article className="course-card" key={course.id} data-course-id={course.id}>
        {course.image ? <div className="course-cover"><Image src={course.image} alt={`Capa oficial: ${course.title}`} width={1280} height={720} sizes="(max-width: 600px) 92vw, (max-width: 1100px) 45vw, 390px" /></div> : <div className="course-placeholder" aria-hidden="true"><span>Curso de bolsa em crochê</span><span className="placeholder-title">Bolsa<br /><em>Mikaela</em></span><span>Mariah Xeque · Crochê</span></div>}
        <div className="course-meta"><span>{course.category}</span><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
        <h3>{course.title}</h3><p className="course-description">{course.description}</p>
        <a className="course-link" href={course.url} aria-label={`Conhecer curso na Hotmart: ${course.title}`}>Conhecer curso na Hotmart<Arrow diagonal /></a>
      </article>)}</div>
    </div>
  </section>;
}
