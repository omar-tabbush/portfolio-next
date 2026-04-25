import { asc } from "drizzle-orm";
import { db, schema } from "~/lib/db/client";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const rows = await db.select().from(schema.projects).orderBy(asc(schema.projects.order));
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Projects</h1>
          <div className="dash-sub">Selected work list.</div>
        </div>
      </div>
      <ProjectsClient rows={rows} />
    </>
  );
}
