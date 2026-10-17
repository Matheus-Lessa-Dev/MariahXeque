"use client";

import { useEffect } from "react";
import { internalDestination } from "@/lib/internal-navigation";

/** Native scrolling, delegated anchor coordination and progressive effects. */
export function PageEffects() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const precise = matchMedia("(hover: hover) and (pointer: fine)");
    const desktop = matchMedia("(min-width: 960px)");
    const header = document.querySelector<HTMLElement>(".site-header");
    const links = [...document.querySelectorAll<HTMLAnchorElement>('.main-navigation a[href^="#"]')];
    const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
    const photos = [...document.querySelectorAll<HTMLElement>(".hero-detail, .process-detail")];
    const spotlights = [...document.querySelectorAll<HTMLElement>(".offer-panel, .audience-grid > article")];
    const animations = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let pointerFrame = 0;
    let navigationFrame = 0;
    let headerHeight = 95;
    let viewportHeight = innerHeight;
    let scrolled: boolean | undefined;
    let activeSection: string | undefined;
    const photoTranslations = new Map<HTMLElement, string>();
    let positions: { element: HTMLElement; top: number }[] = [];
    let photoPositions: { element: HTMLElement; center: number; range: number }[] = [];
    let activeSpot: HTMLElement | null = null;
    let spotRect: DOMRect | null = null;
    let pointer = { x: 0, y: 0 };

    function measure() {
      // Read the entire layout first; write styles only after the read phase.
      headerHeight = header?.offsetHeight || 95;
      viewportHeight = innerHeight;
      positions = sections.map(element => ({ element, top: element.getBoundingClientRect().top + scrollY }));
      photoPositions = photos.map((element, index) => {
        let top = 0;
        for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
        return { element, center: top + element.offsetHeight / 2, range: index ? 9 : 12 };
      });
      document.documentElement.style.setProperty("--anchor-offset", `${headerHeight + 16}px`);
      spotRect = null;
      update();
    }

    function update() {
      frame = 0;
      const y = scrollY;
      if (scrolled !== (y > 24)) {
        scrolled = y > 24;
        if (header) header.dataset.scrolled = String(scrolled);
      }
      const current = positions.filter(item => item.top <= y + headerHeight + viewportHeight * .18).at(-1)?.element.id;
      if (current !== activeSection) {
        activeSection = current;
        links.forEach(link => {
          if (link.hash === `#${current}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
      photoPositions.forEach(({ element, center, range }) => {
        if (reduced.matches || !desktop.matches || !precise.matches) {
          if (photoTranslations.has(element)) { element.style.removeProperty("translate"); photoTranslations.delete(element); }
        }
        else {
          const progress = Math.max(-1, Math.min(1, (y + viewportHeight / 2 - center) / viewportHeight));
          const translate = `0 ${Math.round(progress * range * 100) / 100}px`;
          if (photoTranslations.get(element) !== translate) { element.style.translate = translate; photoTranslations.set(element, translate); }
        }
      });
    }

    function onScroll() {
      // The cached pointer rectangle becomes stale when the document moves.
      clearSpot();
      if (!frame) frame = requestAnimationFrame(update);
    }

    function onResize() {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    function clearSpot() {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
      if (activeSpot) activeSpot.removeAttribute("data-spot-active");
      activeSpot = null;
      spotRect = null;
    }

    function onPointer(event: PointerEvent) {
      if (!precise.matches || reduced.matches || event.pointerType === "touch") return;
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-spotlight]") : null;
      if (target !== activeSpot) {
        clearSpot();
        if (target) { activeSpot = target; spotRect = target.getBoundingClientRect(); }
      }
      if (!activeSpot) return;
      if (!spotRect) spotRect = activeSpot.getBoundingClientRect();
      pointer = { x: event.clientX - spotRect.left, y: event.clientY - spotRect.top };
      if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!activeSpot) return;
        activeSpot.style.setProperty("--spot-x", `${pointer.x}px`);
        activeSpot.style.setProperty("--spot-y", `${pointer.y}px`);
        activeSpot.dataset.spotActive = "true";
      });
    }

    function reveal() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (reduced.matches || !("IntersectionObserver" in window) || !Element.prototype.animate) return;
      const selectors = [
        ".hero-copy > *", ".hero-frame", ".intro-grid > *", ".combo-top > *", ".combo-photo", ".topic",
        ".catalog-heading > *", ".catalog-note", ".course-card", ".gallery-heading > *", ".gallery-item",
        ".process-copy > *", ".process-photos", ".teacher-image", ".teacher-copy > *",
        ".audience-heading > *", ".audience-grid > article", ".learning-section h2", ".learning-grid > div",
        ".offer-editorial > *", ".offer-panel", ".faq-layout > .section-heading", ".faq-list",
      ];
      const elements = [...document.querySelectorAll<HTMLElement>(selectors.join(","))];
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer?.unobserve(entry.target);
          const element = entry.target as HTMLElement;
          if (element.dataset.revealed) return;
          element.dataset.revealed = "true";
          if (element.contains(document.activeElement)) return;
          const siblings = element.parentElement ? [...element.parentElement.children] : [];
          const delay = Math.max(0, siblings.indexOf(element) % 3) * 35;
          try {
            const animation = element.animate([
              { opacity: .72, transform: "translateY(10px)" },
              { opacity: 1, transform: "translateY(0)" },
            ], { duration: 420, delay, easing: "cubic-bezier(.2,.65,.3,1)", fill: "backwards" });
            animations.set(element, animation);
            animation.onfinish = () => { animations.delete(element); };
          } catch { /* The server-rendered content stays visible if animation fails. */ }
        });
      }, { threshold: .06, rootMargin: "0px 0px -24px 0px" });
      elements.filter(element => !element.dataset.revealed).forEach(element => observer?.observe(element));
    }

    function onPreference() { clearSpot(); reveal(); update(); }

    function cancelNavigation() { cancelAnimationFrame(navigationFrame); navigationFrame = 0; }

    function navigateAnchor(event: MouseEvent) {
      const destination = internalDestination(event);
      if (!destination) return;
      event.preventDefault();
      const { target, hash } = destination;
      // Preserve Next's history state and native back/forward restoration.
      if (location.hash !== hash) history.pushState(history.state, "", hash);
      cancelNavigation();
      navigationFrame = requestAnimationFrame(() => {
        navigationFrame = 0;
        if (header) delete header.dataset.navigating;
        animations.forEach((animation, element) => { if (target.contains(element)) { animation.cancel(); animations.delete(element); } });
        // Focus first, then make exactly one explicit browser scroll request.
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth", block: "start" });
      });
    }

    function onFocus(event: FocusEvent) {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) { animation.cancel(); animations.delete(element); }
      });
    }

    spotlights.forEach(element => { element.dataset.spotlight = ""; });
    measure();
    reveal();
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (header) resize?.observe(header);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pageshow", onResize);
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", clearSpot);
    document.addEventListener("click", navigateAnchor);
    window.addEventListener("popstate", cancelNavigation);
    document.addEventListener("focusin", onFocus);
    reduced.addEventListener("change", onPreference);
    precise.addEventListener("change", onPreference);
    desktop.addEventListener("change", onPreference);
    return () => {
      observer?.disconnect(); resize?.disconnect();
      cancelAnimationFrame(frame); clearSpot(); cancelNavigation();
      animations.forEach(animation => animation.cancel());
      photos.forEach(element => element.style.removeProperty("translate"));
      spotlights.forEach(element => { delete element.dataset.spotlight; element.style.removeProperty("--spot-x"); element.style.removeProperty("--spot-y"); });
      links.forEach(link => link.removeAttribute("aria-current"));
      if (header) delete header.dataset.scrolled;
      if (header) delete header.dataset.navigating;
      document.documentElement.style.removeProperty("--anchor-offset");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onResize);
      document.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", clearSpot);
      document.removeEventListener("click", navigateAnchor);
      window.removeEventListener("popstate", cancelNavigation);
      document.removeEventListener("focusin", onFocus);
      reduced.removeEventListener("change", onPreference);
      precise.removeEventListener("change", onPreference);
      desktop.removeEventListener("change", onPreference);
    };
  }, []);
  return null;
}
