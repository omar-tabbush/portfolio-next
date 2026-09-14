import { BeirutTime } from "./BeirutTime";

// ponytail: scroll progress is the CSS scroll-driven bar on .statusbar::before.
// No scroll listener, no per-frame React state (taste-skill 5.D hard ban).
export function StatusBar() {
  return (
    <div className="statusbar">
      <div className="left">
        <span className="tag"><span className="live" aria-hidden /> Available for work</span>
      </div>
      <div className="right">
        <span className="tag">Beirut · <BeirutTime /></span>
      </div>
    </div>
  );
}
