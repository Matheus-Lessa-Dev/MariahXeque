import { site } from "@/config/site";
import { Offer } from "./offer";

export function Combo() {
  const courses = site.combo.confirmedCourses;
  return <section className="combo-section combo-reference" id="combo" tabIndex={-1} aria-labelledby="combo-title">
    <svg className="combo-reference__ribbons" viewBox="0 0 1400 1800" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="combo-ribbon-gold" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#795027" stopOpacity=".03" /><stop offset=".5" stopColor="#bd8a42" stopOpacity=".16" /><stop offset="1" stopColor="#1b160e" stopOpacity=".05" /></linearGradient>
        <linearGradient id="combo-ribbon-line"><stop stopColor="#8c6634" stopOpacity="0" /><stop offset=".5" stopColor="#d5a65e" stopOpacity=".6" /><stop offset="1" stopColor="#9d7135" stopOpacity=".1" /></linearGradient>
      </defs>
      <path d="M900-80C1050 160 1200 220 1470 240L1480 340C1190 290 1000 180 900-80Z" fill="url(#combo-ribbon-gold)" />
      <path d="M920-40C1070 170 1220 220 1460 235" fill="none" stroke="url(#combo-ribbon-line)" strokeWidth="2" />
      <path d="M-190 40C420 440 230 720-120 1020L-160 1210C500 780 400 440-190 40Z" fill="url(#combo-ribbon-gold)" />
      <path d="M-100 140C360 490 200 760-90 1030" fill="none" stroke="url(#combo-ribbon-line)" />
      <path d="M-150 1430C350 1860 1050 1610 1470 1220L1510 1400C1020 1870 290 1940-150 1430Z" fill="url(#combo-ribbon-gold)" />
      <path d="M-100 1490C350 1870 1080 1690 1470 1330M-100 1535C410 1920 1140 1680 1460 1400" fill="none" stroke="url(#combo-ribbon-line)" strokeWidth="1.5" />
    </svg>
    <div className="combo-reference__container">
      <header className="combo-reference__hero">
        <p className="combo-reference__brand">MARIAH XEQUE ATELIÊ<span aria-hidden="true" /></p>
        <h2 className="combo-reference__title" id="combo-title"><span>SUPER</span><span>COMBO</span><span className="combo-reference__subtitle">DE CROCHÊ</span></h2>
        <p className="combo-reference__count">{courses.length} CURSOS INCLUSOS</p>
        <p className="combo-reference__intro">{site.combo.description}</p>
      </header>
      <div className="combo-reference__curriculum" aria-labelledby="combo-courses-title">
        <div className="combo-reference__divider"><span aria-hidden="true" /><h3 id="combo-courses-title">CONHEÇA OS {courses.length} CURSOS INCLUSOS</h3><span aria-hidden="true" /></div>
        <p className="combo-reference__explanation">Confira os cursos que fazem parte do Super Combo de Crochê<br className="combo-reference__desktop-break" /> e descubra novas possibilidades para transformar fios em peças artesanais únicas.</p>
        <ol className="combo-reference__courses">{courses.map((course, index) => <li className="combo-reference__course" key={course.title}>
          <span className="combo-reference__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <div><h4>{course.title}</h4><p>{course.description}</p></div>
        </li>)}</ol>
      </div>
      <Offer />
    </div>
  </section>;
}
