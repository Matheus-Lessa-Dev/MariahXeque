"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export function HeroVisual() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return <div className="croche-hero__image" onPointerMove={event => {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: (event.clientX - rect.left) / rect.width - .5, y: (event.clientY - rect.top) / rect.height - .5 });
  }} onPointerLeave={() => setOffset({ x: 0, y: 0 })} style={{ "--hero-x": `${offset.x * -5}px`, "--hero-y": `${offset.y * -5}px` } as CSSProperties}>
    <Image src="/images/mariah-abertura.webp" alt="Mariah Xeque com blusa preta e brincos de crochê em tons terrosos" width={1086} height={1448} sizes="(max-width: 767px) 90vw, (max-width: 1000px) 42vw, 520px" preload draggable={false} />
    <div className="croche-hero__image-border" aria-hidden="true" />
    <div className="croche-hero__image-caption"><span>CRIATIVIDADE</span><strong>Feita à mão.</strong></div>
  </div>;
}

export function Reveal({ className, children }: { className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !element.animate || !window.IntersectionObserver) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (reduced.matches) return;
      try {
        animation = element.animate([{ opacity: .65, translate: "0 20px" }, { opacity: 1, translate: "0 0" }], { duration: 800, easing: "cubic-bezier(.2,.7,.2,1)" });
      } catch { /* O conteúdo renderizado no servidor permanece visível. */ }
    }, { threshold: .08 });
    const stop = () => { if (reduced.matches) animation?.cancel(); };
    observer.observe(element);
    reduced.addEventListener("change", stop);
    return () => { observer.disconnect(); animation?.cancel(); reduced.removeEventListener("change", stop); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
