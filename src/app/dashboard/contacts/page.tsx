import { asc } from "drizzle-orm";
import { db, schema } from "~/lib/db/client";
import { ContactsClient } from "./ContactsClient";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const rows = await db.select().from(schema.contacts).orderBy(asc(schema.contacts.order));
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Contacts</h1>
          <div className="dash-sub">Email, phone, socials — shown in the contact block.</div>
        </div>
      </div>
      <ContactsClient rows={rows} />
    </>
  );
}
