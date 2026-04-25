// Standalone seed script. Doesn't import client.ts because that file uses
// `server-only`, which throws when invoked outside an RSC context (tsx runs
// in plain Node).
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import {
  DEFAULT_SKILLS, DEFAULT_PROJECTS, DEFAULT_EXPERIENCE,
  DEFAULT_STACK, DEFAULT_CONTACTS, DEFAULT_SETTINGS,
} from "./defaults";

const url = process.env.TURSO_DATABASE_URL ?? "file:./local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;
const db = drizzle(createClient({ url, authToken }), { schema });

async function main() {
  console.log("[seed] starting…");

  await db.delete(schema.skills);
  await db.delete(schema.projects);
  await db.delete(schema.experience);
  await db.delete(schema.stackCategories);
  await db.delete(schema.contacts);
  await db.delete(schema.settings);

  await db.insert(schema.skills).values(
    DEFAULT_SKILLS.map((s, i) => ({ ...s, order: i })),
  );
  await db.insert(schema.projects).values(
    DEFAULT_PROJECTS.map((p, i) => ({
      ...p, tags: JSON.stringify(p.tags), order: i,
    })),
  );
  await db.insert(schema.experience).values(
    DEFAULT_EXPERIENCE.map((e, i) => ({
      ...e, notes: JSON.stringify(e.notes), order: i,
    })),
  );
  await db.insert(schema.stackCategories).values(
    DEFAULT_STACK.map((s, i) => ({
      category: s.category, items: JSON.stringify(s.items), order: i,
    })),
  );
  await db.insert(schema.contacts).values(
    DEFAULT_CONTACTS.map((c, i) => ({ ...c, order: i })),
  );
  await db.insert(schema.settings).values(
    Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value })),
  );

  console.log("[seed] done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
