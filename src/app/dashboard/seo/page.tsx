import { db, schema } from "~/lib/db/client";
import { DEFAULT_SETTINGS } from "~/lib/db/defaults";
import { SeoClient } from "./SeoClient";

const SEO_KEYS = ["seoTitle", "seoDescription", "seoSiteUrl"];

export const dynamic = "force-dynamic";

export default async function SeoPage() {
  const rows = await db.select().from(schema.settings);
  const map: Record<string, string> = { ...DEFAULT_SETTINGS };
  for (const r of rows) map[r.key] = r.value;
  const initial = Object.fromEntries(SEO_KEYS.map((k) => [k, map[k] ?? ""]));
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">SEO</h1>
          <div className="dash-sub">Page title, description, canonical URL. These feed the &lt;title&gt;, meta tags, Open Graph, and structured data.</div>
        </div>
      </div>
      <SeoClient initial={initial} />
    </>
  );
}
