"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { createContact, updateContact, deleteContact } from "~/lib/mutations";

async function gate() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
function bust() {
  revalidatePath("/");
  revalidatePath("/dashboard/contacts");
}

export type ContactState = { ok?: boolean; error?: string };

export async function saveContactAction(_prev: ContactState | undefined, formData: FormData): Promise<ContactState> {
  await gate();
  const id = Number(formData.get("id") ?? 0) || undefined;
  const data = {
    label: String(formData.get("label") ?? "").trim(),
    value: String(formData.get("value") ?? "").trim(),
    href: String(formData.get("href") ?? "").trim(),
    order: Number(formData.get("order") ?? 0) || 0,
  };
  try {
    if (id) await updateContact(id, data);
    else await createContact(data);
    bust();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}

export async function deleteContactAction(formData: FormData) {
  await gate();
  const id = Number(formData.get("id") ?? 0);
  if (!id) return;
  await deleteContact(id);
  bust();
}
