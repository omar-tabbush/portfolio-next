import { Section } from "./Section";

type Settings = Record<string, string>;

export function About({ settings }: { settings: Settings }) {
  return (
    <Section idx="01" title="About" titleEm="/ the developer" id="about">
      <div className="about">
        <div></div>
        <div className="body">
          <div className="reveal">{settings.aboutParagraph1}</div>
          <div className="reveal" data-delay="120" style={{ marginTop: 24 }}>
            {settings.aboutParagraph2}
          </div>
        </div>
        <div className="reveal meta">
          <div className="row"><span className="k">Based</span><span>{settings.aboutBased}</span></div>
          <div className="row"><span className="k">Role</span><span>{settings.aboutRole}</span></div>
          <div className="row"><span className="k">Working</span><span>{settings.aboutWorking}</span></div>
          <div className="row"><span className="k">Status</span><span style={{ color: "var(--accent)" }}>{settings.aboutStatus}</span></div>
          <div className="row"><span className="k">Langs</span><span>{settings.aboutLangs}</span></div>
          <div className="row"><span className="k">Edu</span><span>{settings.aboutEdu}</span></div>
        </div>
      </div>
    </Section>
  );
}
