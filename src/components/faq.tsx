"use client";

import { useEffect, useRef } from "react";
import { site } from "@/config/site";
import { SectionHeading } from "./ui";

export function Faq() {
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = list.current;
    if (!element || !Element.prototype.animate) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const running = new Map<HTMLDetailsElement, { animation: Animation; expanded: boolean }>();

    function settle(details: HTMLDetailsElement, expanded: boolean) {
      const current = running.get(details);
      running.delete(details);
      current?.animation.cancel();
      details.open = expanded;
      details.style.removeProperty("height");
      details.style.removeProperty("overflow");
    }

    function onClick(event: MouseEvent) {
      const summary = event.target instanceof Element ? event.target.closest("summary") : null;
      const details = summary?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || reduced.matches) return;
      event.preventDefault();
      const expanded = !(running.get(details)?.expanded ?? details.open);
      const start = details.getBoundingClientRect().height;
      running.get(details)?.animation.cancel();
      details.style.height = "auto";
      details.open = true;
      const end = expanded ? details.getBoundingClientRect().height : summary!.getBoundingClientRect().height + details.offsetHeight - details.clientHeight;
      details.style.height = `${start}px`;
      details.style.overflow = "hidden";
      try {
        const animation = details.animate([{ height: `${start}px` }, { height: `${end}px` }], {
          duration: 240, easing: "cubic-bezier(.2,.65,.3,1)", fill: "forwards",
        });
        running.set(details, { animation, expanded });
        animation.onfinish = () => settle(details, expanded);
      } catch { settle(details, expanded); }
    }

    function stop() { running.forEach(({ expanded }, details) => settle(details, expanded)); }
    element.addEventListener("click", onClick);
    reduced.addEventListener("change", stop);
    window.addEventListener("resize", stop);
    return () => {
      stop();
      element.removeEventListener("click", onClick);
      reduced.removeEventListener("change", stop);
      window.removeEventListener("resize", stop);
    };
  }, []);
  const answered = site.faq.items.filter(item => item.answer);
  if (!answered.length) return null;
  return <section className="section faq-section light" id="duvidas" tabIndex={-1} aria-labelledby="faq-title">
    <div className="container faq-layout">
      <SectionHeading eyebrow={site.faq.eyebrow} title={site.faq.title} headingId="faq-title"><p>{site.faq.description}</p></SectionHeading>
      <div className="faq-list" ref={list}>{answered.map((item, index) => <details className="faq-item" key={item.question}>
        <summary><span className="faq-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span><span className="faq-plus" aria-hidden="true" /></summary>
        <div className="faq-answer"><p>{item.answer}</p></div>
      </details>)}</div>
    </div>
  </section>;
}
