import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAuthenticated } from "~/lib/auth";
import { LoginForm } from "./LoginForm";
import "../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Sign in — Dashboard",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  if (await isAuthenticated()) redirect("/dashboard");
  return <LoginForm />;
}
