import Image from "next/image";
import imageManifest from "../../public/images/manifest.json";
import { site } from "@/config/site";
import { Carousel } from "./carousel";

const imageSizes = new Map(imageManifest.map(image => [image.output.replace(/^public/, ""), image]));

export function Catalog() {
  return <section className="courses-section" id="cursos" tabIndex={-1} aria-labelledby="catalog-title">
    <div className="courses-container">
      <div className="courses-header">
        <div className="courses-header__left"><span className="courses-eyebrow">CURSOS &amp; TÉCNICAS</span><h2 id="catalog-title">Aprenda a criar.<em>Transforme sua criatividade.</em></h2></div>
        <div className="courses-header__right"><p>Explore os cursos e descubra técnicas para transformar fios em peças únicas, sofisticadas e cheias de personalidade.</p></div>
      </div>
      <Carousel variant="courses" id="coursesTrack" label="Cursos individuais" count={site.catalog.length}>
        {site.catalog.map((course, index) => {
          const imageSize = course.image ? imageSizes.get(course.image) : undefined;
          const content = <>
            <div className="course-card__image">
              {course.image && imageSize ? <Image src={course.image} alt={`Capa oficial: ${course.title}`} width={imageSize.width} height={imageSize.height} sizes="(max-width: 700px) 78vw, (max-width: 1000px) 45vw, 400px" draggable={false} /> : <div className="course-card__typography"><span>CURSO DE CROCHÊ</span><strong>{course.title}</strong><span>MARIAH XEQUE</span></div>}
              {course.url && <div className="course-card__overlay"><span>VER CURSO NA HOTMART</span><strong aria-hidden="true">→</strong></div>}
            </div>
            <div className="course-card__content"><span className="course-card__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h3>{course.title}</h3><p>{course.description}</p></div></div>
          </>;
          return <article className="course-card" key={course.id} data-course-id={course.id}>{course.url ? <a href={course.url} className="course-card__link" aria-label={`Conhecer curso na Hotmart: ${course.title}`}>{content}</a> : <div className="course-card__link">{content}<p className="course-card__availability">Link de inscrição ainda não informado.</p></div>}</article>;
        })}
      </Carousel>
    </div>
  </section>;
}
