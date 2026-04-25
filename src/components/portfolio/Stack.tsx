import { Section } from "./Section";
import type { PortfolioContent } from "~/lib/content";

export function Stack({ stack }: { stack: PortfolioContent["stack"] }) {
  return (
    <Section idx="06" title="Stack" titleEm="/ tools of the trade" id="stack">
      <div>
        {stack.map((s, i) => (
          <div key={s.id} className="reveal stack" data-delay={i * 50}>
            <div className="cat">{s.category}</div>
            <div className="chips">
              {s.items.map((it) => <span key={it} className="chip">{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
