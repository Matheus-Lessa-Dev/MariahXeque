import type { ReactNode } from "react";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function Action({ href, children, variant = "gold", className = "", unavailableLabel, descriptionId }: {
  href?: string | null; children: ReactNode; variant?: "gold" | "outline" | "text"; className?: string; unavailableLabel?: string; descriptionId?: string;
}) {
  const classes = `button button-${variant} ${className}`;
  if (!href) return <button type="button" className={classes} disabled aria-describedby={descriptionId}>{unavailableLabel || children}<Arrow diagonal /></button>;
  return <a className={classes} href={href} aria-describedby={descriptionId}>{children}<Arrow diagonal /></a>;
}

export function SectionHeading({ eyebrow, title, children, className = "", headingId }: { eyebrow: string; title: string; children?: ReactNode; className?: string; headingId?: string }) {
  return <div className={`section-heading ${className}`}><Eyebrow>{eyebrow}</Eyebrow><h2 id={headingId} className="preserve-lines">{title}</h2>{children}</div>;
}
