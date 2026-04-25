"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { createExperience, updateExperience, deleteExperience } from "~/lib/mutations";

async function gate() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
function bust() {
  revalidatePath("/");
  revalidatePath("/dashboard/experience");
}

export type ExperienceState = { ok?: boolean; error?: string };

export async function saveExperienceAction(_prev: ExperienceState | undefined, formData: FormData): Promise<ExperienceState> {
  await gate();
  const id = Number(formData.get("id") ?? 0) || undefined;
  const data = {
    period: String(formData.get("period") ?? "").trim(),
    isCurrent: formData.get("isCurrent") === "on",
    role: String(formData.get("role") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    notesRaw: String(formData.get("notesRaw") ?? ""),
    order: Number(formData.get("order") ?? 0) || 0,
  };
  try {
    if (id) await updateExperience(id, data);
    else await createExperience(data);
    bust();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}

export async function deleteExperienceAction(formData: FormData) {
  await gate();
  const id = Number(formData.get("id") ?? 0);
  if (!id) return;
  await deleteExperience(id);
  bust();
}
