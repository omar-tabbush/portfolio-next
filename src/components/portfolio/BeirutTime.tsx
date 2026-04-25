"use client";

import { useEffect, useState } from "react";

export function BeirutTime({ fallback = "00:00:00" }: { fallback?: string }) {
  const [t, setT] = useState(fallback);
  useEffect(() => {
    const fmt = () => {
      const s = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Beirut",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
      });
      setT(s);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{t}</span>;
}
