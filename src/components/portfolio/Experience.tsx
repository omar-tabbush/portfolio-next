import { Section } from "./Section";
import type { PortfolioContent } from "~/lib/content";

export function Experience({ experience }: { experience: PortfolioContent["experience"] }) {
  return (
    <Section idx="05" title="Experience" titleEm="/ track record" id="experience">
      <div className="timeline">
        {experience.map((e, i) => (
          <article key={e.id} className="reveal exp" data-delay={i * 60}>
            <div className="when">
              {e.isCurrent ? <span className="now">{e.period}</span> : e.period}
            </div>
            <h3 className="role">
              {e.role}<br />
              <span className="at">{e.company}</span>
            </h3>
            <div className="notes">
              <ul>
                {e.notes.map((n, j) => <li key={j}>{n}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
