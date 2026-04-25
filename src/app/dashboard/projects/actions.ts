"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { createProject, updateProject, deleteProject } from "~/lib/mutations";

async function gate() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
function bust() {
  revalidatePath("/");
  revalidatePath("/dashboard/projects");
}

export type ProjectState = { ok?: boolean; error?: string };

export async function saveProjectAction(_prev: ProjectState | undefined, formData: FormData): Promise<ProjectState> {
  await gate();
  const id = Number(formData.get("id") ?? 0) || undefined;
  const accent = String(formData.get("accent") ?? "lime");
  const data = {
    idx: String(formData.get("idx") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    italic: String(formData.get("italic") ?? ""),
    blurb: String(formData.get("blurb") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    stack: String(formData.get("stack") ?? "").trim(),
    tagsRaw: String(formData.get("tagsRaw") ?? ""),
    accent: (["lime", "amber", "blue", "red"].includes(accent) ? accent : "lime") as "lime" | "amber" | "blue" | "red",
    order: Number(formData.get("order") ?? 0) || 0,
  };
  try {
    if (id) await updateProject(id, data);
    else await createProject(data);
    bust();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}

export async function deleteProjectAction(formData: FormData) {
  await gate();
  const id = Number(formData.get("id") ?? 0);
  if (!id) return;
  await deleteProject(id);
  bust();
}
