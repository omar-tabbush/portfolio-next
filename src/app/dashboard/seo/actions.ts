"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { updateSettings } from "~/lib/mutations";

const SEO_KEYS = ["seoTitle", "seoDescription", "seoSiteUrl"] as const;

export type SeoState = { ok?: boolean; error?: string };

export async function saveSeoAction(_prev: SeoState | undefined, formData: FormData): Promise<SeoState> {
  if (!(await isAuthenticated())) return { error: "Unauthorized" };
  const pairs: Record<string, string> = {};
  for (const k of SEO_KEYS) {
    const v = formData.get(k);
    if (v != null) pairs[k] = String(v);
  }
  try {
    await updateSettings(pairs);
    revalidatePath("/");
    revalidatePath("/dashboard/seo");
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}
