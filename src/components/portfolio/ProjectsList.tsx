"use client";

import { useState } from "react";
import type { PortfolioContent } from "~/lib/content";

type Project = PortfolioContent["projects"][number];

const PALETTES: Record<string, [string, string]> = {
  lime:  ["oklch(0.86 0.17 120)", "oklch(0.25 0.01 60)"],
  amber: ["oklch(0.80 0.16 60)",  "oklch(0.22 0.01 60)"],
  blue:  ["oklch(0.74 0.17 240)", "oklch(0.20 0.01 60)"],
  red:   ["oklch(0.68 0.22 25)",  "oklch(0.20 0.01 60)"],
};

function ProjectPreview({ project, x, y }: { project: Project | null; x: number; y: number }) {
  if (!project) return null;
  const [c1, c2] = PALETTES[project.accent] ?? PALETTES.lime;
  return (
    <div className="proj-preview show" style={{ left: x, top: y }} aria-hidden>
      <svg viewBox="0 0 260 180" preserveAspectRatio="none">
        <defs>
          <pattern id={`p-${project.idx}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill={c2} />
            <line x1="0" y1="8" x2="8" y2="0" stroke={c1} strokeWidth="0.6" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="260" height="180" fill={`url(#p-${project.idx})`} />
        <rect x="16" y="16" width="60" height="8" fill={c1} opacity="0.9" />
        <rect x="16" y="32" width="120" height="4" fill={c1} opacity="0.5" />
        <circle cx="230" cy="28" r="6" fill={c1} />
        <text x="16" y="162" fontFamily="monospace" fontSize="10" fill={c1} opacity="0.85" letterSpacing="1">
          {project.name.toUpperCase()} — PREVIEW
        </text>
      </svg>
    </div>
  );
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<Project | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <>
      <div className="projects" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
        {projects.map((p) => (
          <article
            key={p.id}
            className="reveal project"
            onMouseEnter={() => setHover(p)}
            onMouseLeave={() => setHover(null)}
          >
            <div className="idx">{p.idx}</div>
            <div>
              <h3 className="name">
                <span data-scramble={p.name}>{p.name}</span>
                <span className="italic">{p.italic}</span>
              </h3>
              <div className="tags">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="blurb">{p.blurb}</div>
            <div className="meta">
              {p.year}<br />
              <span style={{ opacity: 0.6 }}>{p.stack}</span>
            </div>
            <div
              className="arrow"
              aria-hidden
              style={{
                opacity: hover === p ? 1 : 0,
                transform: `translateY(-50%) translateX(${hover === p ? 0 : -6}px)`,
              }}
            >↗</div>
          </article>
        ))}
      </div>
      <ProjectPreview project={hover} x={pos.x} y={pos.y} />
    </>
  );
}
