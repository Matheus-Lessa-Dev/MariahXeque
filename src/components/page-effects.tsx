"use client";

import { useEffect } from "react";
import { internalDestination } from "@/lib/internal-navigation";

/** Um único controlador de âncoras; o navegador controla a animação e o histórico. */
export function PageEffects() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const navigate = (event: MouseEvent) => {
      const destination = internalDestination(event);
      if (!destination) return;
      event.preventDefault();
      const { target, hash } = destination;
      if (location.hash !== hash) history.pushState(history.state, "", hash);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth", block: "start" });
      });
    };
    const cancel = () => cancelAnimationFrame(frame);
    document.addEventListener("click", navigate);
    window.addEventListener("popstate", cancel);
    return () => {
      cancel();
      document.removeEventListener("click", navigate);
      window.removeEventListener("popstate", cancel);
    };
  }, []);
  return null;
}
