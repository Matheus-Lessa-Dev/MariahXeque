"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { site } from "@/config/site";
import { internalDestination } from "@/lib/internal-navigation";
import { Arrow } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    }
    function onPointer(event: PointerEvent) {
      if (open && !header.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 960px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
      if (navigation.current) navigation.current.inert = !desktop.matches && !open;
    };
    closeOnDesktop();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", closeOnDesktop);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); desktop.removeEventListener("change", closeOnDesktop); };
  }, [open]);

  function closeForNavigation(event: ReactMouseEvent<HTMLElement>) {
    if (!internalDestination(event.nativeEvent)) return;
    // Hide the absolute menu before scrolling, without waiting or moving layout.
    if (open) {
      if (navigation.current) navigation.current.inert = true;
      if (header.current) header.current.dataset.navigating = "true";
    }
    setOpen(false);
  }

  return <header className="site-header" ref={header} onClick={closeForNavigation}>
    <div className="container header-inner">
      <a href="#inicio" className="brand" aria-label={`${site.brand} — início`}>
        <span>{site.brand}</span><span className="brand-subtitle">A arte de criar à mão</span>
      </a>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
        <span className={open ? "menu-lines is-open" : "menu-lines"}><span /><span /></span>
      </button>
      <nav ref={navigation} id="main-navigation" className={open ? "main-navigation is-open" : "main-navigation"} aria-label="Navegação principal" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node) && event.relatedTarget !== toggle.current) setOpen(false); }}>
        {site.navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
        <a className="header-cta" href={site.links.studentAccess}>Já sou aluna — acessar meus cursos <Arrow diagonal /></a>
      </nav>
    </div>
    <noscript><style>{`@media(max-width:959px) { .site-header { position:relative; } .header-inner { flex-wrap: wrap; } .menu-toggle { display:none; } .main-navigation { position:static; display:flex; visibility:visible; opacity:1; transform:none; flex-wrap:wrap; padding:0 0 20px; pointer-events:auto; } }`}</style></noscript>
  </header>;
}
