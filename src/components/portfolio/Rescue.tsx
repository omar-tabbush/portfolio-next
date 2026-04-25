import { Section } from "./Section";

const RESCUE_ITEMS = [
  { n: "01", t: "Security audit", d: "Find and patch the holes AI coding tools love to ship: exposed secrets, missing auth checks, SQL injection surface, unvalidated inputs, leaky CORS, insecure direct object refs.", tags: ["OWASP", "Auth", "Secrets"] },
  { n: "02", t: "Production bug triage", d: "Your app works on localhost, crashes in prod. I reproduce, isolate, and fix the race conditions, N+1 queries, memory leaks, and silent failures that only appear under real load.", tags: ["Debugging", "Perf", "Observability"] },
  { n: "03", t: "Codebase cleanup", d: "Duplicated logic, dead routes, copy-pasted components, inconsistent patterns. I extract, consolidate, and document so the next feature doesn't break three others.", tags: ["Refactor", "DX", "Docs"] },
  { n: "04", t: "Re-architecture", d: "When the app outgrew its first draft. Schema redesign, service boundaries, async workflows, queue introduction — done incrementally, never big-bang.", tags: ["Scale", "Schema", "Queues"] },
];
const SIGNALS = [
  "Cursor / Copilot wrote most of the backend",
  "Nobody's touched the DB migrations in months",
  ".env is in the repo (or was)",
  "Shipping new features keeps breaking old ones",
  "Mystery 500s you can't reproduce locally",
  "Auth logic is scattered across 12 files",
  "One endpoint takes 14 seconds",
  "PR reviews are 'LGTM' with zero comments",
];
const PROCESS = [
  { k: "Audit", v: "2–3 days", d: "Full walkthrough: repo, infra, DB, auth, logs. Written report." },
  { k: "Triage", v: "ongoing", d: "Prioritize by blast radius — security first, stability second, debt third." },
  { k: "Fix", v: "1–6 weeks", d: "Incremental PRs. Every change reviewed, tested, shipped safely." },
  { k: "Handoff", v: "1 week", d: "Documentation, runbooks, and a plan your team can keep executing." },
];

export function Rescue() {
  return (
    <Section idx="02" title="Rescue work" titleEm="/ for vibe-coded apps" id="rescue">
      <div className="reveal">
        <div className="rescue-intro">
          <div></div>
          <p>
            Shipped fast with AI tools and now something&apos;s{" "}
            <span className="hl">on fire</span>? I come in, stabilize the
            codebase, close the security gaps, and hand it back in a state
            you&apos;d actually want to hire a team around.
          </p>
        </div>
      </div>

      <div className="rescue-grid">
        {RESCUE_ITEMS.map((r, i) => (
          <div key={r.n} className="reveal skill-cell" data-delay={(i % 2) * 80} style={{ minHeight: 220 }}>
            <div className="num">{r.n} · service</div>
            <div className="title">{r.t}</div>
            <div className="desc">{r.d}</div>
            <div className="rescue-tags">
              {r.tags.map((t) => <span key={t} className="rescue-tag">{t}</span>)}
            </div>
            <div className="arrow" aria-hidden>↗</div>
          </div>
        ))}
      </div>

      <div className="reveal">
        <div className="signals-wrap">
          <div>
            <div className="signals-label">You probably need this if…</div>
            <p>Any of these feel familiar? The longer they sit, the more expensive they get.</p>
          </div>
          <ul className="signals-list">
            {SIGNALS.map((s, i) => (
              <li key={i}>
                <span className="sig-idx">[{String(i + 1).padStart(2, "0")}]</span>
                <span className="sig-tick" aria-hidden>▸</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="reveal">
        <div className="process-strip">
          {PROCESS.map((p, i) => (
            <div key={p.k}>
              <div className="k">{String(i + 1).padStart(2, "0")} · {p.k}</div>
              <div className="v">{p.v}</div>
              <div className="d">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
