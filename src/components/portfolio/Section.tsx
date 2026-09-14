import type { ReactNode } from "react";

export function Section({
  title, titleEm, id, children,
}: {
  title: string;
  titleEm: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-heading`}>
      <div className="section-head">
        <h2 className="reveal-mask" id={`${id}-heading`}>
          <span>{title} <em>{titleEm}</em></span>
        </h2>
      </div>
      {children}
    </section>
  );
}
