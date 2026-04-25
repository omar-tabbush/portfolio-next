import "server-only";
import { asc, eq } from "drizzle-orm";
import { db, schema } from "./db/client";
import {
  DEFAULT_SKILLS, DEFAULT_PROJECTS, DEFAULT_EXPERIENCE,
  DEFAULT_STACK, DEFAULT_CONTACTS, DEFAULT_SETTINGS,
} from "./db/defaults";

export type PortfolioContent = {
  skills: { id: number; letter: string; title: string; description: string }[];
  projects: { id: number; idx: string; name: string; italic: string; blurb: string; year: string; stack: string; tags: string[]; accent: string }[];
  experience: { id: number; period: string; isCurrent: boolean; role: string; company: string; notes: string[] }[];
  stack: { id: number; category: string; items: string[] }[];
  contacts: { id: number; label: string; value: string; href: string }[];
  settings: Record<string, string>;
};

function parseJSON<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function defaultsAsContent(): PortfolioContent {
  return {
    skills: DEFAULT_SKILLS.map((s, i) => ({ id: i + 1, ...s })),
    projects: DEFAULT_PROJECTS.map((p, i) => ({ id: i + 1, ...p })),
    experience: DEFAULT_EXPERIENCE.map((e, i) => ({ id: i + 1, ...e })),
    stack: DEFAULT_STACK.map((s, i) => ({ id: i + 1, ...s })),
    contacts: DEFAULT_CONTACTS.map((c, i) => ({ id: i + 1, ...c })),
    settings: { ...DEFAULT_SETTINGS },
  };
}

export async function loadContent(): Promise<PortfolioContent> {
  try {
    const [skillsRows, projectsRows, expRows, stackRows, contactsRows, settingsRows] = await Promise.all([
      db.select().from(schema.skills).orderBy(asc(schema.skills.order)),
      db.select().from(schema.projects).orderBy(asc(schema.projects.order)),
      db.select().from(schema.experience).orderBy(asc(schema.experience.order)),
      db.select().from(schema.stackCategories).orderBy(asc(schema.stackCategories.order)),
      db.select().from(schema.contacts).orderBy(asc(schema.contacts.order)),
      db.select().from(schema.settings),
    ]);

    if (skillsRows.length === 0 && projectsRows.length === 0) {
      return defaultsAsContent();
    }

    return {
      skills: skillsRows.map((r) => ({ id: r.id, letter: r.letter, title: r.title, description: r.description })),
      projects: projectsRows.map((r) => ({
        id: r.id, idx: r.idx, name: r.name, italic: r.italic, blurb: r.blurb,
        year: r.year, stack: r.stack, accent: r.accent,
        tags: parseJSON<string[]>(r.tags, []),
      })),
      experience: expRows.map((r) => ({
        id: r.id, period: r.period, isCurrent: r.isCurrent,
        role: r.role, company: r.company,
        notes: parseJSON<string[]>(r.notes, []),
      })),
      stack: stackRows.map((r) => ({
        id: r.id, category: r.category,
        items: parseJSON<string[]>(r.items, []),
      })),
      contacts: contactsRows.map((r) => ({
        id: r.id, label: r.label, value: r.value, href: r.href,
      })),
      settings: Object.fromEntries(settingsRows.map((r) => [r.key, r.value])),
    };
  } catch (err) {
    console.error("[content] load failed, serving defaults:", err);
    return defaultsAsContent();
  }
}

export async function getSetting(key: string, fallback = ""): Promise<string> {
  try {
    const [row] = await db.select().from(schema.settings).where(eq(schema.settings.key, key));
    return row?.value ?? DEFAULT_SETTINGS[key] ?? fallback;
  } catch {
    return DEFAULT_SETTINGS[key] ?? fallback;
  }
}
