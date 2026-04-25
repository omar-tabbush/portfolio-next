import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  letter: text("letter").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  idx: text("idx").notNull(),
  name: text("name").notNull(),
  italic: text("italic").notNull().default(""),
  blurb: text("blurb").notNull(),
  year: text("year").notNull(),
  stack: text("stack").notNull(),
  tags: text("tags").notNull().default("[]"),
  accent: text("accent").notNull().default("lime"),
  order: integer("order").notNull().default(0),
});

export const experience = sqliteTable("experience", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  period: text("period").notNull(),
  isCurrent: integer("is_current", { mode: "boolean" }).notNull().default(false),
  role: text("role").notNull(),
  company: text("company").notNull(),
  notes: text("notes").notNull().default("[]"),
  order: integer("order").notNull().default(0),
});

export const stackCategories = sqliteTable("stack_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(),
  items: text("items").notNull().default("[]"),
  order: integer("order").notNull().default(0),
});

export const contacts = sqliteTable("contacts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  value: text("value").notNull(),
  href: text("href").notNull(),
  order: integer("order").notNull().default(0),
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ExperienceRow = typeof experience.$inferSelect;
export type StackCategory = typeof stackCategories.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
