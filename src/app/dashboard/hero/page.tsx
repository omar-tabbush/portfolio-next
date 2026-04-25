import { db, schema } from "~/lib/db/client";
import { DEFAULT_SETTINGS } from "~/lib/db/defaults";
import { HeroClient } from "./HeroClient";

const HERO_KEYS = [
  "heroVariant", "theme", "accent",
  "availableText", "heroKickerVersion", "heroLocation",
  "heroRoleBlurb", "heroFocusBlurb", "heroExperienceBlurb",
  "aboutParagraph1", "aboutParagraph2",
  "aboutBased", "aboutRole", "aboutWorking", "aboutStatus", "aboutLangs", "aboutEdu",
  "contactHeadline",
];

export const dynamic = "force-dynamic";

export default async function HeroPage() {
  const rows = await db.select().from(schema.settings);
  const map: Record<string, string> = { ...DEFAULT_SETTINGS };
  for (const r of rows) map[r.key] = r.value;
  const initial = Object.fromEntries(HERO_KEYS.map((k) => [k, map[k] ?? ""]));

  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Hero &amp; About</h1>
          <div className="dash-sub">Top-of-page content and global appearance.</div>
        </div>
      </div>
      <HeroClient initial={initial} />
    </>
  );
}
