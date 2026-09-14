import { Section } from "./Section";
import type { PortfolioContent } from "~/lib/content";

export function Skills({ skills }: { skills: PortfolioContent["skills"] }) {
  return (
    <Section title="Expertise" titleEm="/ what I do well" id="skills">
      <div className="skills-grid">
        {skills.map((s, i) => (
          <div key={s.id} className="reveal skill-cell" data-delay={(i % 4) * 70}>
            <div className="num">{s.letter}</div>
            <div className="title">{s.title}</div>
            <div className="desc">{s.description}</div>
            <div className="arrow" aria-hidden>↗</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
