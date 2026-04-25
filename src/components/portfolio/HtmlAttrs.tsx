"use client";

import { useEffect } from "react";

/**
 * Sets data-theme / data-accent on <html> after mount. Doing it client-side
 * means the SSR'd HTML doesn't depend on these attrs (avoiding a mismatch),
 * but the visual switch happens before paint via the CSS variables.
 */
export function HtmlAttrs({
  theme,
  accent,
  density = "default",
}: {
  theme: string;
  accent: string;
  density?: string;
}) {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("portfolio");
    html.setAttribute("data-theme", theme);
    html.setAttribute("data-accent", accent);
    html.setAttribute("data-density", density);
    return () => {
      html.classList.remove("portfolio");
      html.removeAttribute("data-theme");
      html.removeAttribute("data-accent");
      html.removeAttribute("data-density");
    };
  }, [theme, accent, density]);
  return null;
}
