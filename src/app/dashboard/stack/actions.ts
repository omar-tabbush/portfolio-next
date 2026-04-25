"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { createStack, updateStack, deleteStack } from "~/lib/mutations";

async function gate() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
function bust() {
  revalidatePath("/");
  revalidatePath("/dashboard/stack");
}

export type StackState = { ok?: boolean; error?: string };

export async function saveStackAction(_prev: StackState | undefined, formData: FormData): Promise<StackState> {
  await gate();
  const id = Number(formData.get("id") ?? 0) || undefined;
  const data = {
    category: String(formData.get("category") ?? "").trim(),
    itemsRaw: String(formData.get("itemsRaw") ?? ""),
    order: Number(formData.get("order") ?? 0) || 0,
  };
  try {
    if (id) await updateStack(id, data);
    else await createStack(data);
    bust();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}

export async function deleteStackAction(formData: FormData) {
  await gate();
  const id = Number(formData.get("id") ?? 0);
  if (!id) return;
  await deleteStack(id);
  bust();
}
