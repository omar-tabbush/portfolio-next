"use client";

import { useEffect, useState } from "react";

export function Flash({
  message, variant = "ok", autoHideMs = 3000,
}: {
  message?: string | null;
  variant?: "ok" | "err";
  autoHideMs?: number;
}) {
  const [visible, setVisible] = useState(!!message);
  useEffect(() => {
    setVisible(!!message);
    if (!message) return;
    const id = setTimeout(() => setVisible(false), autoHideMs);
    return () => clearTimeout(id);
  }, [message, autoHideMs]);
  if (!visible || !message) return null;
  return <div className={`flash ${variant === "err" ? "err" : ""}`}>{message}</div>;
}
