import { asc } from "drizzle-orm";
import { db, schema } from "~/lib/db/client";
import { SkillsClient } from "./SkillsClient";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const rows = await db.select().from(schema.skills).orderBy(asc(schema.skills.order));
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Skills</h1>
          <div className="dash-sub">The expertise grid — 8 cells look best, but any count works.</div>
        </div>
      </div>
      <SkillsClient rows={rows} />
    </>
  );
}
