"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type GalleryCourse = { id: string; title: string; description: string; image: string | null };

export function Gallery({ items }: { items: GalleryCourse[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const isOpen = active !== null;
  const item = active === null ? null : items[active];

  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (element?.open) element.close();
      opener.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  function move(direction: number) {
    setActive(index => index === null ? null : (index + direction + items.length) % items.length);
  }

  return <div id="galeria" tabIndex={-1} aria-label="Galeria de aprendizado">
    <div className="combo-course-grid">
      {items.map((course, index) => <article className="combo-course" key={course.id} data-combo-course-id={course.id}>
        {course.image && <a href={course.image} className="combo-course__image" aria-label={`Ampliar imagem: ${course.title}`} aria-haspopup="dialog" onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
          event.preventDefault(); opener.current = event.currentTarget; setActive(index);
        }}>
          <Image src={course.image} alt={`Capa oficial: ${course.title}`} fill sizes="(max-width: 520px) 90vw, (max-width: 1000px) 45vw, 300px" draggable={false} />
          <span className="combo-course__expand" aria-hidden="true">↗</span>
        </a>}
        <div className="combo-course__info"><span className="combo-course__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><div><h4>{course.title}</h4><p>{course.description}</p></div></div>
      </article>)}
    </div>
    <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-help" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      if (event.key === "Tab") {
        const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
        const first = buttons[0]; const last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }}>
      <div className="lightbox-content">
        <div className="lightbox-heading"><h2 id="lightbox-title">{item?.title || "Galeria de aprendizado"}</h2><button type="button" aria-label="Fechar imagem ampliada" onClick={() => dialog.current?.close()}>Fechar ×</button></div>
        <div className="lightbox-stage" onPointerDown={event => { if (event.pointerType === "touch") swipe.current = { x: event.clientX, y: event.clientY }; }} onPointerCancel={() => { swipe.current = null; }} onPointerUp={event => {
          const start = swipe.current; swipe.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.3) move(dx < 0 ? 1 : -1);
        }}>
          {item?.image && <Image className="lightbox-photo" src={item.image} alt={`Capa oficial: ${item.title}`} width={1280} height={1280} sizes="(max-width: 700px) 90vw, 900px" />}
        </div>
        <div className="lightbox-controls"><button type="button" aria-label="Imagem anterior" onClick={() => move(-1)}>← Anterior</button><span role="status" aria-live="polite" aria-atomic="true">{active === null ? "" : `${active + 1} de ${items.length}`}</span><button type="button" aria-label="Próxima imagem" onClick={() => move(1)}>Próxima →</button></div>
        <p id="lightbox-help">Use as setas, deslize a imagem ou pressione Escape para fechar.</p>
      </div>
    </dialog>
  </div>;
}
