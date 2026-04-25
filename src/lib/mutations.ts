import "server-only";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "./db/client";

function parseList(raw: string): string[] {
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}
function parseNotes(raw: string): string[] {
  return raw.split("\n").map((s) => s.trim()).filter(Boolean);
}

// ── Skills ──
export const skillInput = z.object({
  letter: z.string().min(1).max(2),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  order: z.number().int().default(0),
});
export type SkillInput = z.infer<typeof skillInput>;
export async function createSkill(data: SkillInput) {
  await db.insert(schema.skills).values(skillInput.parse(data));
}
export async function updateSkill(id: number, data: SkillInput) {
  await db.update(schema.skills).set(skillInput.parse(data)).where(eq(schema.skills.id, id));
}
export async function deleteSkill(id: number) {
  await db.delete(schema.skills).where(eq(schema.skills.id, id));
}

// ── Projects ──
export const projectInput = z.object({
  idx: z.string().min(1).max(10),
  name: z.string().min(1).max(200),
  italic: z.string().max(200).default(""),
  blurb: z.string().min(1).max(2000),
  year: z.string().min(1).max(20),
  stack: z.string().min(1).max(500),
  tagsRaw: z.string().default(""),
  accent: z.enum(["lime", "amber", "blue", "red"]).default("lime"),
  order: z.number().int().default(0),
});
export type ProjectInput = z.infer<typeof projectInput>;
export async function createProject(data: ProjectInput) {
  const p = projectInput.parse(data);
  await db.insert(schema.projects).values({
    idx: p.idx, name: p.name, italic: p.italic, blurb: p.blurb,
    year: p.year, stack: p.stack, accent: p.accent, order: p.order,
    tags: JSON.stringify(parseList(p.tagsRaw)),
  });
}
export async function updateProject(id: number, data: ProjectInput) {
  const p = projectInput.parse(data);
  await db.update(schema.projects).set({
    idx: p.idx, name: p.name, italic: p.italic, blurb: p.blurb,
    year: p.year, stack: p.stack, accent: p.accent, order: p.order,
    tags: JSON.stringify(parseList(p.tagsRaw)),
  }).where(eq(schema.projects.id, id));
}
export async function deleteProject(id: number) {
  await db.delete(schema.projects).where(eq(schema.projects.id, id));
}

// ── Experience ──
export const experienceInput = z.object({
  period: z.string().min(1).max(100),
  isCurrent: z.boolean().default(false),
  role: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  notesRaw: z.string().default(""),
  order: z.number().int().default(0),
});
export type ExperienceInput = z.infer<typeof experienceInput>;
export async function createExperience(data: ExperienceInput) {
  const e = experienceInput.parse(data);
  await db.insert(schema.experience).values({
    period: e.period, isCurrent: e.isCurrent, role: e.role,
    company: e.company, order: e.order,
    notes: JSON.stringify(parseNotes(e.notesRaw)),
  });
}
export async function updateExperience(id: number, data: ExperienceInput) {
  const e = experienceInput.parse(data);
  await db.update(schema.experience).set({
    period: e.period, isCurrent: e.isCurrent, role: e.role,
    company: e.company, order: e.order,
    notes: JSON.stringify(parseNotes(e.notesRaw)),
  }).where(eq(schema.experience.id, id));
}
export async function deleteExperience(id: number) {
  await db.delete(schema.experience).where(eq(schema.experience.id, id));
}

// ── Stack ──
export const stackInput = z.object({
  category: z.string().min(1).max(80),
  itemsRaw: z.string().default(""),
  order: z.number().int().default(0),
});
export type StackInput = z.infer<typeof stackInput>;
export async function createStack(data: StackInput) {
  const s = stackInput.parse(data);
  await db.insert(schema.stackCategories).values({
    category: s.category, order: s.order,
    items: JSON.stringify(parseList(s.itemsRaw)),
  });
}
export async function updateStack(id: number, data: StackInput) {
  const s = stackInput.parse(data);
  await db.update(schema.stackCategories).set({
    category: s.category, order: s.order,
    items: JSON.stringify(parseList(s.itemsRaw)),
  }).where(eq(schema.stackCategories.id, id));
}
export async function deleteStack(id: number) {
  await db.delete(schema.stackCategories).where(eq(schema.stackCategories.id, id));
}

// ── Contacts ──
export const contactInput = z.object({
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(300),
  href: z.string().min(1).max(500),
  order: z.number().int().default(0),
});
export type ContactInput = z.infer<typeof contactInput>;
export async function createContact(data: ContactInput) {
  await db.insert(schema.contacts).values(contactInput.parse(data));
}
export async function updateContact(id: number, data: ContactInput) {
  await db.update(schema.contacts).set(contactInput.parse(data)).where(eq(schema.contacts.id, id));
}
export async function deleteContact(id: number) {
  await db.delete(schema.contacts).where(eq(schema.contacts.id, id));
}

// ── Settings ──
export async function updateSettings(pairs: Record<string, string>) {
  for (const [key, value] of Object.entries(pairs)) {
    const existing = await db.select().from(schema.settings).where(eq(schema.settings.key, key));
    if (existing.length > 0) {
      await db.update(schema.settings).set({ value }).where(eq(schema.settings.key, key));
    } else {
      await db.insert(schema.settings).values({ key, value });
    }
  }
}
