"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { createSkill, updateSkill, deleteSkill } from "~/lib/mutations";

async function gate() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
function bust() {
  revalidatePath("/");
  revalidatePath("/dashboard/skills");
}

export type SkillState = { ok?: boolean; error?: string };

export async function saveSkillAction(_prev: SkillState | undefined, formData: FormData): Promise<SkillState> {
  await gate();
  const id = Number(formData.get("id") ?? 0) || undefined;
  const data = {
    letter: String(formData.get("letter") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
  try {
    if (id) await updateSkill(id, data);
    else await createSkill(data);
    bust();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}

export async function deleteSkillAction(formData: FormData) {
  await gate();
  const id = Number(formData.get("id") ?? 0);
  if (!id) return;
  await deleteSkill(id);
  bust();
}
