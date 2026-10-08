"use client";

import { useEffect, useRef, useState } from "react";
import { SECTIONS } from "./sections";

/**
 * Catalog-style scroller: a sticky numbered index on desktop, a horizontal
 * chip strip on mobile. One IntersectionObserver marks the section crossing
 * the middle of the viewport as current; the progress rail is CSS
 * scroll-driven (no scroll listener).
 */
export function SectionIndex() {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  // Keep the active chip visible in the mobile strip. Scrolls only the strip,
  // never the page, so it can't fight an in-flight smooth page scroll.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    const chip = list.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!chip) return;
    list.scrollTo({
      left: chip.offsetLeft - list.clientWidth / 2 + chip.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <aside className="index" aria-label="Sections">
      <div className="index-label">Index</div>
      <div className="index-track">
        <span className="index-rail" aria-hidden />
        <ol ref={listRef}>
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-id={s.id}
                aria-current={active === s.id ? "true" : undefined}
              >
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{s.label}</span>
                <span className="d">{s.sub}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}
