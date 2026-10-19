"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export function Carousel({ variant, id, label, count, children }: { variant: "courses" | "combo" | "atelier"; id: string; label: string; count: number; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ start: true, end: false, progress: 8, current: 1 });

  const update = useCallback(() => {
    const element = track.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    const step = (element.firstElementChild?.getBoundingClientRect().width || 1) + (parseFloat(getComputedStyle(element).gap) || 0);
    const current = Math.min(count, Math.round(element.scrollLeft / step) + 1);
    setPosition({ start: element.scrollLeft < 5, end: max <= 5 || element.scrollLeft >= max - 5, progress: max <= 5 ? 100 : Math.max(8, Math.min(100, element.scrollLeft / max * 100)), current });
  }, [count]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const resize = new ResizeObserver(update);
    resize.observe(element);
    return () => resize.disconnect();
  }, [update]);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const step = (element.firstElementChild?.getBoundingClientRect().width || 300) + (parseFloat(getComputedStyle(element).gap) || 0);
    element.scrollBy({ left: direction * step, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function stopDrag() {
    if (drag.current?.moved && track.current) {
      const element = track.current;
      const step = (element.firstElementChild?.getBoundingClientRect().width || 300) + (parseFloat(getComputedStyle(element).gap) || 0);
      element.scrollTo({ left: Math.round(element.scrollLeft / step) * step, behavior: "instant" });
    }
    drag.current = null;
    setDragging(false);
  }

  const atelier = variant === "atelier";
  const previous = <button className={atelier ? "atelier-orders__arrow atelier-orders__prev" : `${variant}-arrow ${variant}-arrow--prev${position.start ? " is-disabled" : ""}`} type="button" aria-label={`${label} — anteriores`} aria-controls={id} disabled={position.start} onClick={() => move(-1)}><span aria-hidden="true">←</span></button>;
  const next = <button className={atelier ? "atelier-orders__arrow atelier-orders__next" : `${variant}-arrow ${variant}-arrow--next${position.end ? " is-disabled" : ""}`} type="button" aria-label={`${label} — próximos`} aria-controls={id} disabled={position.end} onClick={() => move(1)}><span aria-hidden="true">→</span></button>;

  return <>
    {atelier && <div className="atelier-orders__catalog-head"><div><span className="atelier-orders__catalog-label">ATELIER MARIAH</span><h3>Peças em destaque</h3></div><div className="atelier-orders__controls">{previous}{next}</div></div>}
    <div className={atelier ? "atelier-orders__slider" : `${variant}-slider`}>
      {!atelier && previous}
      <div ref={track} className={`${atelier ? "atelier-orders__viewport" : `${variant}-track`}${dragging ? " is-dragging" : ""}`} id={id} role="region" aria-roledescription="carrossel" aria-label={label} tabIndex={0}
        onScroll={update}
        onKeyDown={event => { if (event.target === event.currentTarget && (event.key === "ArrowRight" || event.key === "ArrowLeft")) { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
        onPointerDown={event => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          suppressClick.current = false;
          drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={event => {
          const start = drag.current;
          if (!start) return;
          const distance = event.clientX - start.x;
          if (Math.abs(distance) > 6) {
            start.moved = true; suppressClick.current = true; setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          if (start.moved) { event.preventDefault(); event.currentTarget.scrollLeft = start.scroll - distance; }
        }}
        onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag}
        onPointerLeave={() => { if (!drag.current?.moved) stopDrag(); }}
        onDragStart={event => event.preventDefault()}
        onClickCapture={event => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); } suppressClick.current = false; }}>
        {children}
      </div>
      {!atelier && next}
    </div>
    {atelier ? <div className="atelier-orders__catalog-footer"><div className="atelier-orders__progress"><span className="atelier-orders__progress-current" role="status" aria-live="polite">{String(position.current).padStart(2, "0")}</span><div className="atelier-orders__progress-line" aria-hidden="true"><span style={{ width: `${position.progress}%` }} /></div><span className="atelier-orders__progress-total">{String(count).padStart(2, "0")}</span></div><span className="atelier-orders__drag">DESLIZE PARA EXPLORAR</span></div> : <div className={variant === "courses" ? "courses-footer" : "combo-bottom"}>
      <div className={`${variant}-progress`} aria-hidden="true"><div className={`${variant}-progress__bar`} style={{ width: `${position.progress}%` }} /></div>
      <span className={variant === "courses" ? "courses-footer__hint" : undefined}>{variant === "courses" ? "Arraste para explorar" : "Deslize para conhecer todos"}</span>
    </div>}
  </>;
}
