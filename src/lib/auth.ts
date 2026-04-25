import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "dash_session";
const MAX_AGE_SECS = 60 * 60 * 24 * 7;

function secret(): string {
  return process.env.DASHBOARD_SECRET ?? "dev-insecure-secret-change-me";
}

function dashboardPassword(): string {
  return process.env.DASHBOARD_PASSWORD ?? "";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

function token(issuedAt: number): string {
  const payload = String(issuedAt);
  return `${payload}.${sign(payload)}`;
}

function verify(raw: string): boolean {
  const [payload, sig] = raw.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;
  const issued = Number(payload);
  if (!Number.isFinite(issued)) return false;
  const ageSecs = (Date.now() - issued) / 1000;
  return ageSecs >= 0 && ageSecs < MAX_AGE_SECS;
}

export function verifyPassword(candidate: string): boolean {
  const expected = dashboardPassword();
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function login(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, token(Date.now()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECS,
  });
}

export async function logout(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  return verify(raw);
}
