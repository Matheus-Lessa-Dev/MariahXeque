/** Shared eligibility check for the header and the single anchor controller. */
export function internalDestination(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null;
  const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
  if (!link || link.hasAttribute("download") || (link.target && link.target.toLowerCase() !== "_self")) return null;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return null;
  let id;
  try { id = decodeURIComponent(url.hash.slice(1)); } catch { return null; }
  const target = document.getElementById(id);
  return target ? { link, target, hash: url.hash } : null;
}
