"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { Eyebrow } from "./ui";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const isOpen = active !== null;
  const item = active === null ? null : site.gallery.items[active];

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
    setActive(index => index === null ? null : (index + direction + site.gallery.items.length) % site.gallery.items.length);
  }

  return <section id="galeria" tabIndex={-1} className="section gallery-section dark" aria-labelledby="gallery-title">
    <div className="container">
      <div className="gallery-heading"><div><Eyebrow>{site.gallery.eyebrow}</Eyebrow><h2 id="gallery-title" className="preserve-lines">{site.gallery.title}</h2></div><p>{site.gallery.description}</p></div>
      <div className="gallery-grid">{site.gallery.items.map((photo, index) => <figure className={`gallery-item gallery-item-${index + 1}`} key={photo.image}>
        <a href={photo.image} className="gallery-image gallery-trigger" aria-label={`Ampliar imagem: ${photo.label}`} aria-haspopup="dialog" onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.current?.showModal) return;
          event.preventDefault(); opener.current = event.currentTarget; setActive(index);
        }}>
          <Image src={photo.image} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 600px) 90vw, (max-width: 960px) 44vw, 30vw" />
          <span className="gallery-expand" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></svg></span>
        </a>
        <figcaption><div><span className="gallery-category">{photo.category}</span><h3>{photo.label}</h3></div><span className="gallery-index" aria-hidden="true">0{index + 1}</span></figcaption>
      </figure>)}</div>
      <p className="gallery-note">{site.gallery.note}</p>
    </div>
    <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" aria-describedby="lightbox-help" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
      if (event.key === "Tab") {
        const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
        const first = buttons[0];
        const last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }}>
      <div className="lightbox-content">
        <div className="lightbox-heading"><h2 id="lightbox-title">{item?.label || "Galeria de aprendizado"}</h2><button type="button" className="lightbox-close" aria-label="Fechar imagem ampliada" onClick={() => dialog.current?.close()}>Fechar <span aria-hidden="true">×</span></button></div>
        <div className="lightbox-stage" onPointerDown={event => { if (event.pointerType === "touch") swipe.current = { x: event.clientX, y: event.clientY }; }} onPointerCancel={() => { swipe.current = null; }} onPointerUp={event => {
          const start = swipe.current;
          swipe.current = null;
          if (!start) return;
          const dx = event.clientX - start.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(event.clientY - start.y) * 1.3) move(dx < 0 ? 1 : -1);
        }}>
          {item && <Image className="lightbox-photo" src={item.image} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 700px) 90vw, 900px" />}
        </div>
        <div className="lightbox-controls"><button type="button" aria-label="Imagem anterior" onClick={() => move(-1)}>← <span>Anterior</span></button><span className="lightbox-count" role="status" aria-live="polite" aria-atomic="true">{active === null ? "" : `${active + 1} de ${site.gallery.items.length}`}</span><button type="button" aria-label="Próxima imagem" onClick={() => move(1)}><span>Próxima</span> →</button></div>
        <p id="lightbox-help">Use as setas, deslize a imagem ou pressione Escape para fechar.</p>
      </div>
    </dialog>
  </section>;
}
