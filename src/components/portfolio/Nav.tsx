export function Nav() {
  const items = [
    { href: "#about", label: "About" },
    { href: "#rescue", label: "Rescue" },
    { href: "#skills", label: "Expertise" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#stack", label: "Stack" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <nav className="nav" aria-label="Primary">
      <a href="#top" className="brand" data-text-hover>
        <span className="dot" aria-hidden /> OMAR<span style={{ opacity: 0.5 }}>/TABBOUSH</span>
      </a>
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href}><span className="label">{i.label}</span></a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
