"use server";

import { redirect } from "next/navigation";
import { login, verifyPassword } from "~/lib/auth";

export type LoginState = { error?: string };

export async function attemptLogin(_prev: LoginState | undefined, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Password is required." };
  if (!verifyPassword(password)) return { error: "Incorrect password." };
  await login();
  redirect("/dashboard");
}
