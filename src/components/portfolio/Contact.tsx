import { Section } from "./Section";
import type { PortfolioContent } from "~/lib/content";

export function Contact({
  contacts, settings,
}: {
  contacts: PortfolioContent["contacts"];
  settings: Record<string, string>;
}) {
  const headlineFirst = (settings.contactHeadline || "Have a system that needs rearchitecting?").split("?")[0] + "?";
  const parts = headlineFirst.split(/\s+/);
  const midIdx = Math.ceil(parts.length / 2);
  const line1 = parts.slice(0, midIdx).join(" ");
  const line2 = parts.slice(midIdx).join(" ");
  return (
    <Section idx="07" title="Let's talk" titleEm="/ make something" id="contact">
      <div className="contact">
        <h3 className="contact big">
          <span className="reveal-mask"><span>{line1}</span></span><br />
          <span className="reveal-mask" data-delay="80"><span><em>{line2}</em></span></span><br />
          <span className="reveal-mask" data-delay="160">
            <span>Let&apos;s <span className="arrow">→</span> <span data-scramble="talk.">talk.</span></span>
          </span>
        </h3>
        <div className="contact-grid">
          {contacts.map((c) => (
            <a
              key={c.id}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              className="contact-row"
            >
              <span className="k">{c.label}</span>
              <span className="v"><span data-scramble={c.value}>{c.value}</span></span>
              <span className="arr" aria-hidden>↗</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
