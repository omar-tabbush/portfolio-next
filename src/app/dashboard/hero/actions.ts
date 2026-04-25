"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticated } from "~/lib/auth";
import { updateSettings } from "~/lib/mutations";

const HERO_KEYS = [
  "heroVariant", "theme", "accent",
  "availableText", "heroKickerVersion", "heroLocation",
  "heroRoleBlurb", "heroFocusBlurb", "heroExperienceBlurb",
  "aboutParagraph1", "aboutParagraph2",
  "aboutBased", "aboutRole", "aboutWorking", "aboutStatus", "aboutLangs", "aboutEdu",
  "contactHeadline",
] as const;

export type HeroState = { ok?: boolean; error?: string };

export async function saveHeroAction(_prev: HeroState | undefined, formData: FormData): Promise<HeroState> {
  if (!(await isAuthenticated())) return { error: "Unauthorized" };
  const pairs: Record<string, string> = {};
  for (const k of HERO_KEYS) {
    const v = formData.get(k);
    if (v != null) pairs[k] = String(v);
  }
  try {
    await updateSettings(pairs);
    revalidatePath("/");
    revalidatePath("/dashboard/hero");
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Save failed." };
  }
}
