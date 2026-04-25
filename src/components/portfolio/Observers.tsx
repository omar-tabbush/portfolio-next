"use client";

import { useEffect } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#_0123456789ABCDEF";

function runScramble(el: HTMLElement, finalText: string) {
  const from = el.textContent ?? "";
  const length = Math.max(from.length, finalText.length);
  type Q = { fromCh: string; toCh: string; start: number; end: number; char: string };
  const queue: Q[] = [];
  for (let i = 0; i < length; i++) {
    const fromCh = from[i] ?? "";
    const toCh = finalText[i] ?? "";
    const start = Math.floor(Math.random() * 20);
    const end = start + Math.floor(Math.random() * 20) + 10;
    queue.push({ fromCh, toCh, start, end, char: "" });
  }
  let frame = 0;
  let raf = 0;
  const update = () => {
    let output = "";
    let complete = 0;
    for (const q of queue) {
      if (frame >= q.end) {
        complete++;
        output += q.toCh;
      } else if (frame >= q.start) {
        if (!q.char || Math.random() < 0.28) {
          q.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        output += q.char;
      } else {
        output += q.fromCh;
      }
    }
    el.textContent = output;
    if (complete === queue.length) return;
    frame++;
    raf = requestAnimationFrame(update);
  };
  update();
  return () => cancelAnimationFrame(raf);
}

/**
 * Single client island that handles the three "magic" effects of the design:
 *
 * 1. Strips `no-js` from <html> so reveal animations engage.
 * 2. Observes every `.reveal` and `.reveal-mask` once and toggles `.in`
 *    when they enter the viewport — replaces dozens of per-component
 *    useEffects with a single observer.
 * 3. Delegates a `mouseover` listener that triggers the scramble effect on
 *    elements with `data-scramble="<final text>"`.
 *
 * Everything stays server-rendered; this component just upgrades it.
 */
export function Observers() {
  useEffect(() => {
    document.documentElement.classList.remove("no-js");

    const elements = document.querySelectorAll(".reveal, .reveal-mask");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? "0");
            if (delay > 0) {
              setTimeout(() => el.classList.add("in"), delay);
            } else {
              el.classList.add("in");
            }
            io.unobserve(el);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of elements) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        const delay = Number((el as HTMLElement).dataset.delay ?? "0");
        if (delay > 0) setTimeout(() => el.classList.add("in"), delay);
        else el.classList.add("in");
      } else {
        io.observe(el);
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-scramble]");
      if (!target) return;
      runScramble(target, target.dataset.scramble ?? target.textContent ?? "");
    };
    document.addEventListener("mouseover", onMouseOver);

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: y, behavior: "smooth" });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      io.disconnect();
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return null;
}
