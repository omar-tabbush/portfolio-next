export function BigFooter() {
  return (
    <footer className="footer-block">
      <div className="big-mark">
        OMAR<span style={{ color: "var(--accent)" }}>.</span>
      </div>
      <div style={{ display: "grid", gap: 6, textAlign: "right" }}>
        <span>© 2026 — Omar Tabboush</span>
        <span>Designed &amp; built from Beirut</span>
        <span>v04 / last shipped · today</span>
      </div>
    </footer>
  );
}
