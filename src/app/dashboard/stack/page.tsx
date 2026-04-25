import { asc } from "drizzle-orm";
import { db, schema } from "~/lib/db/client";
import { StackClient } from "./StackClient";

export const dynamic = "force-dynamic";

export default async function StackPage() {
  const rows = await db.select().from(schema.stackCategories).orderBy(asc(schema.stackCategories.order));
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Stack</h1>
          <div className="dash-sub">Tool categories &amp; chips.</div>
        </div>
      </div>
      <StackClient rows={rows} />
    </>
  );
}
