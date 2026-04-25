import { asc } from "drizzle-orm";
import { db, schema } from "~/lib/db/client";
import { ExperienceClient } from "./ExperienceClient";

export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const rows = await db.select().from(schema.experience).orderBy(asc(schema.experience.order));
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Experience</h1>
          <div className="dash-sub">Work history entries.</div>
        </div>
      </div>
      <ExperienceClient rows={rows} />
    </>
  );
}
