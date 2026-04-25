"use client";

import { useEffect, useState } from "react";

export const ROLES = [
  "Developer.",
  "Architect.",
  "Builder.",
  "Problem-solver.",
  "Systems thinker.",
  "API whisperer.",
];

export function RoleCycler({ roles = ROLES, interval = 2200 }: { roles?: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), interval);
    return () => clearInterval(id);
  }, [roles.length, interval]);
  return (
    <span className="role-track" aria-live="polite">
      <span
        className="role-inner"
        style={{
          display: "block",
          transform: `translateY(-${i * 1.2}em)`,
          transition: "transform 0.7s cubic-bezier(.7,0,.2,1)",
        }}
      >
        {roles.map((r, idx) => (
          <span key={idx} className="role-item">{r}</span>
        ))}
      </span>
    </span>
  );
}
