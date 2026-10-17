import { site } from "@/config/site";
import { Eyebrow } from "./ui";

/** Blocos prontos, exibidos apenas quando o conteúdo foi confirmado. */
export function ConfirmedCurriculum() {
  const { confirmedCourses, lessonCount, modelCount, materials, prerequisites, updates } = site.combo;
  // Atualizações já constam entre os benefícios; não criar uma seção duplicada
  // quando ainda não há currículo, quantidades ou materiais confirmados.
  if (!confirmedCourses.length && lessonCount === null && modelCount === null && !materials?.length && !prerequisites) return null;
  return <div className="confirmed-content">
    {confirmedCourses.length > 0 && <div><h3>Cursos incluídos</h3><ul className="content-list">{confirmedCourses.map(course => <li key={course.title}><strong>{course.title}</strong><p>{course.description}</p></li>)}</ul></div>}
    {(lessonCount !== null || modelCount !== null) && <p>{[lessonCount !== null && `${lessonCount} aulas`, modelCount !== null && `${modelCount} modelos`].filter(Boolean).join(" · ")}</p>}
    {materials && materials.length > 0 && <div><h3>Lista de materiais</h3><ul className="content-list">{materials.map(material => <li key={material}>{material}</li>)}</ul></div>}
    {prerequisites && <div><h3>Antes de começar</h3><p>{prerequisites}</p></div>}
    {updates && <div><h3>Atualizações</h3><p>{updates}</p></div>}
  </div>;
}

export function LearningDetails() {
  const labels = { platform: "Plataforma", format: "Formato das aulas", release: "Liberação das aulas", access: "Tempo de acesso", devices: "Onde assistir", support: "Suporte", consultation: "Rever e praticar" };
  const items = Object.entries(labels).flatMap(([key, label]) => {
    const value = site.learning[key as keyof typeof labels];
    return value ? [{ label, value }] : [];
  });
  if (!items.length) return null;
  return <section className="section learning-section dark" aria-labelledby="learning-title"><div className="container"><Eyebrow>Como funciona</Eyebrow><h2 id="learning-title">{site.learning.title}</h2><dl className="learning-grid">{items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></div></section>;
}

export function Testimonials() {
  const authorized = site.testimonials.filter(item => item.authorized && item.quote && item.author);
  if (!authorized.length) return null;
  return <section className="section light" aria-labelledby="testimonials-title"><div className="container"><Eyebrow>Quem aprende, conta</Eyebrow><h2 id="testimonials-title">Palavras de quem cria.</h2><div className="testimonial-grid">{authorized.map((item, index) => <figure key={`${item.author}-${index}`}><blockquote><p>{item.quote}</p></blockquote><figcaption>{item.author}</figcaption></figure>)}</div></div></section>;
}
