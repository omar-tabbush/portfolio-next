"use client";

import { useEffect, useState } from "react";
import { RoleCycler } from "./RoleCycler";
import { BeirutTime } from "./BeirutTime";

const LINES = [
  { t: "fade", text: "$ portfolio --boot --user omar" },
  { t: "ok", text: "✓ env loaded · Node 22 · pnpm 9" },
  { t: "ok", text: "✓ identity verified · Omar Tabboush" },
  { t: "ok", text: "✓ services online · 10+ production systems" },
  { t: "ok", text: "✓ focus set · backend architecture + LLM tooling" },
  { t: "warn", text: "⚠ coffee supply: low" },
  { t: "fade", text: "rendering portfolio…" },
] as const;

export function HeroBoot({ settings }: { settings: Record<string, string> }) {
  const [shown, setShown] = useState<number>(LINES.length);
  useEffect(() => { setShown(0); }, []);
  useEffect(() => {
    if (shown >= LINES.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 320);
    return () => clearTimeout(id);
  }, [shown]);

  return (
    <section className="hero" data-variant="boot" id="top">
      <div className="available">
        <span className="live" aria-hidden /> {settings.availableText}
      </div>
      <h1 style={{ position: "absolute", left: "-9999px" }}>Omar Tabboush</h1>
      <div className="boot-seq">
        {LINES.map((l, i) => (
          <div key={i} className={`row ${i < shown ? "show" : ""}`}>
            <span className="fade">[{String(i).padStart(2, "0")}]</span>
            <span className={l.t}>{l.text}</span>
          </div>
        ))}
        {shown >= LINES.length && (
          <>
            <div className="big">
              Omar Tabboush<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <div className="hero-roles" style={{ marginTop: 24 }}>
              <span className="prompt">~/</span>
              <span>whoami</span>
              <span style={{ color: "var(--fg-3)" }}>→</span>
              <RoleCycler />
              <span className="caret" aria-hidden />
            </div>
          </>
        )}
      </div>
      <div className="hero-foot">
        <div><span className="label">Role</span>{settings.heroRoleBlurb}</div>
        <div><span className="label">Focus</span>{settings.heroFocusBlurb}</div>
        <div><span className="label">Experience</span>{settings.heroExperienceBlurb}</div>
        <div><span className="label">Local time</span><BeirutTime /><br />GMT+3 · Beirut</div>
      </div>
    </section>
  );
}
