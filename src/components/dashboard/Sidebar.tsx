"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "~/app/dashboard/actions";

const ITEMS = [
  { href: "/dashboard", label: "Overview", exact: true },
  { href: "/dashboard/hero", label: "Hero & About" },
  { href: "/dashboard/skills", label: "Skills" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/experience", label: "Experience" },
  { href: "/dashboard/stack", label: "Stack" },
  { href: "/dashboard/contacts", label: "Contacts" },
  { href: "/dashboard/seo", label: "SEO" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="dash-side">
      <div className="brand">
        <span className="dot" aria-hidden /> Portfolio admin
      </div>
      {ITEMS.map((i) => {
        const active = i.exact ? pathname === i.href : pathname.startsWith(i.href);
        return (
          <Link key={i.href} href={i.href} className={active ? "active" : ""}>
            {i.label}
          </Link>
        );
      })}
      <div className="spacer" />
      <a href="/" target="_blank" rel="noreferrer" className="view-site">View site ↗</a>
      <form action={logoutAction}>
        <button type="submit" className="logout" style={{ background: "none", border: 0, padding: 0, textAlign: "left", cursor: "pointer", color: "#78716c" }}>
          Sign out
        </button>
      </form>
    </aside>
  );
}
