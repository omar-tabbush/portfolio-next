"use client";

import { useEffect, useState } from "react";
import { BeirutTime } from "./BeirutTime";

export function StatusBar() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="statusbar" role="status" aria-live="off">
      <div className="left">
        <span className="tag"><span className="live" aria-hidden /> Online</span>
        <span className="tag">Beirut · <BeirutTime /></span>
      </div>
      <div className="right">
        <span>Scroll · {scroll.toFixed(0).padStart(2, "0")}%</span>
        <span>v04.26</span>
      </div>
    </div>
  );
}
