"use client";

import { useEffect } from "react";

/**
 * Adds `dashboard` class to <html> on mount so dashboard.css's
 * `html.dashboard` rules apply. Restored to portfolio mode on unmount.
 */
export function DashboardClass() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("dashboard");
    html.classList.remove("portfolio", "no-js");
    return () => {
      html.classList.remove("dashboard");
    };
  }, []);
  return null;
}
