import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "~/lib/auth";
import { Sidebar } from "~/components/dashboard/Sidebar";
import { DashboardClass } from "~/components/dashboard/DashboardClass";
import "./dashboard.css";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s — Dashboard" },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) redirect("/login");
  return (
    <>
      <DashboardClass />
      <div className="dash-shell">
        <Sidebar />
        <main className="dash-main">{children}</main>
      </div>
    </>
  );
}
