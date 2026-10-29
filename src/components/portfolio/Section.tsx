import type { ReactNode } from "react";
import { sectionNum } from "./sections";

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
        <span className="section-num" aria-hidden>{sectionNum(id)}</span>
        <h2 className="reveal-mask" id={`${id}-heading`}>
          <span>{title} <em>{titleEm}</em></span>
        </h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
