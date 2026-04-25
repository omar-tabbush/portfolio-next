import { RoleCycler } from "./RoleCycler";
import { BeirutTime } from "./BeirutTime";
import { HeroBoot } from "./HeroBoot";

type Settings = Record<string, string>;

export function Hero({ settings }: { settings: Settings }) {
  const variant = settings.heroVariant || "cycle";
  if (variant === "marquee") return <HeroMarquee settings={settings} />;
  if (variant === "boot") return <HeroBoot settings={settings} />;
  return <HeroCycle settings={settings} />;
}

function HeroFoot({ settings }: { settings: Settings }) {
  return (
    <div className="hero-foot">
      <div className="reveal" data-delay="200">
        <span className="label">Role</span>
        {settings.heroRoleBlurb}
      </div>
      <div className="reveal" data-delay="320">
        <span className="label">Focus</span>
        {settings.heroFocusBlurb}
      </div>
      <div className="reveal" data-delay="440">
        <span className="label">Experience</span>
        {settings.heroExperienceBlurb}
      </div>
      <div className="reveal" data-delay="560">
        <span className="label">Local time</span>
        <BeirutTime /><br />
        GMT+3 · Beirut
      </div>
    </div>
  );
}

function HeroCycle({ settings }: { settings: Settings }) {
  return (
    <section className="hero" data-variant="cycle" id="top">
      <div className="available" aria-label="Availability">
        <span className="live" aria-hidden /> {settings.availableText}
      </div>
      <div className="hero-stack">
        <div className="hero-kicker reveal in">
          <span className="line" aria-hidden />
          <span>{settings.heroKickerVersion}</span>
          <span className="line" aria-hidden />
          <span>{settings.heroLocation}</span>
        </div>
        <h1 className="hero-name">
          <span className="reveal-mask"><span>Omar</span></span><br />
          <span className="reveal-mask" data-delay="120"><span>Tabboush<span className="fade">.</span></span></span>
        </h1>
        <div className="hero-roles hero-roles-inline">
          <span className="prompt">~/</span>
          <span>whoami</span>
          <span style={{ color: "var(--fg-3)" }}>→</span>
          <RoleCycler />
          <span className="caret" aria-hidden />
        </div>
      </div>
      <HeroFoot settings={settings} />
    </section>
  );
}

function HeroMarquee({ settings }: { settings: Settings }) {
  const row = [
    "Senior Full-Stack Developer",
    "Omar Tabboush",
    "Backend Architecture",
    "LLM Integrations",
    "SaaS Platforms",
    "Beirut → Remote",
  ];
  const track = [...row, ...row];
  return (
    <section className="hero" data-variant="marquee" id="top">
      <div className="available">
        <span className="live" aria-hidden /> {settings.availableText}
      </div>
      <div className="hero-stack">
        <div className="hero-kicker reveal in">
          <span className="line" aria-hidden />
          <span>{settings.heroKickerVersion}</span>
          <span className="line" aria-hidden />
          <span>{settings.heroLocation}</span>
        </div>
        <h1 className="hero-name" style={{ position: "absolute", left: "-9999px" }}>
          Omar Tabboush
        </h1>
        <div className="marquee-wrap">
          <div className="marquee">
            <div className="marquee-track">
              {track.map((t, i) => (
                <span key={i}>{t}<span className="dot" aria-hidden /></span>
              ))}
            </div>
          </div>
          <div className="marquee" style={{ opacity: 0.35, marginTop: 8 }}>
            <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "60s" }}>
              {track.map((t, i) => (
                <span key={i}>{t}<span className="dot" aria-hidden /></span>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-roles" style={{ marginTop: 40 }}>
          <span className="prompt">~/</span>
          <span>whoami</span>
          <span style={{ color: "var(--fg-3)" }}>→</span>
          <RoleCycler />
          <span className="caret" aria-hidden />
        </div>
      </div>
      <HeroFoot settings={settings} />
    </section>
  );
}
