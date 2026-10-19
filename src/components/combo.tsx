import { site } from "@/config/site";
import { Icon } from "./icon";
import { Gallery } from "./gallery";

export function Combo() {
  const included = site.combo.confirmedCourses;
  const cards = included.length ? included.map((course, index) => ({ id: `included-${index}`, title: course.title, description: course.description, image: course.image || null })) : site.combo.previewCourseIds.flatMap(id => {
    const course = site.catalog.find(item => item.id === id);
    return course ? [{ id: course.id, title: course.title, description: course.description, image: course.image }] : [];
  });
  const benefits = [
    { icon: "play" as const, text: "Aulas passo a passo" },
    { icon: "jewel" as const, text: "Modelos selecionados" },
    { icon: "materials" as const, text: "Orientação de materiais" },
    ...(site.combo.updates ? [{ icon: "updates" as const, text: "Atualizações futuras" }] : []),
    ...(site.learning.access ? [{ icon: "play" as const, text: site.learning.access }] : []),
    ...(site.learning.support ? [{ icon: "materials" as const, text: site.learning.support }] : []),
  ];
  return <section className="combo-section combo-showcase" id="combo" tabIndex={-1} aria-labelledby="combo-title">
    <div className="combo-container">
      <header className="combo-header"><span className="combo-eyebrow">SUPER COMBO DE CROCHÊ</span><h2 id="combo-title">Muito além do crochê.<br />Um universo de <em>possibilidades.</em></h2><p>{site.combo.description}</p></header>
      <div className="combo-showcase__benefits">{benefits.map(benefit => <div key={benefit.text}><Icon name={benefit.icon} /><span>{benefit.text}</span></div>)}</div>
      <div className="combo-showcase__divider"><span /><h3>{included.length ? "Conheça os cursos incluídos" : "Técnicas e criações para explorar"}</h3><span /></div>
      {!included.length && <p className="combo-showcase__notice">Os cursos abaixo ilustram as técnicas de Mariah e têm ofertas individuais. A composição do Super Combo ainda não foi confirmada.</p>}
      <Gallery items={cards} />
    </div>
  </section>;
}
