"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { saveContactAction, deleteContactAction, type ContactState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

type Row = { id: number; label: string; value: string; href: string; order: number };
type Draft = Partial<Row>;

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : editing ? "Update" : "Add"}</button>;
}
function DeleteButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? "…" : "Delete"}</button>;
}

export function ContactsClient({ rows }: { rows: Row[] }) {
  const [draft, setDraft] = useState<Draft>({});
  const [state, formAction] = useActionState<ContactState, FormData>(saveContactAction, {});
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) {
      setDraft({});
      setFlash("Saved.");
      const f = document.getElementById("contact-form") as HTMLFormElement | null;
      f?.reset();
    } else if (state.error) {
      setFlash(state.error);
    }
  }, [state]);

  const k = draft.id ?? "new";

  return (
    <>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />

      <form id="contact-form" className="dash-card" action={formAction}>
        <h3 style={{ margin: "0 0 12px" }}>{draft.id ? "Edit contact" : "Add contact"}</h3>
        <input type="hidden" name="id" value={draft.id ?? ""} />
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Label</label>
            <input type="text" name="label" required placeholder="Email / GitHub / LinkedIn" defaultValue={draft.label ?? ""} key={`label-${k}`} />
          </div>
          <div className="field" style={{ flex: "0 0 120px" }}>
            <label>Order</label>
            <input type="number" name="order" defaultValue={draft.order ?? 0} key={`order-${k}`} />
          </div>
        </div>
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Display value</label>
            <input type="text" name="value" required defaultValue={draft.value ?? ""} key={`value-${k}`} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Href <span className="hint">(mailto:, tel:, https://…)</span></label>
            <input type="text" name="href" required defaultValue={draft.href ?? ""} key={`href-${k}`} />
          </div>
        </div>
        <div className="row">
          <SubmitButton editing={!!draft.id} />
          {draft.id && <button type="button" className="btn btn-secondary" onClick={() => setDraft({})}>Cancel</button>}
        </div>
      </form>

      <div className="dash-list">
        {rows.map((r) => (
          <div key={r.id} className="dash-item">
            <div className="idx">·</div>
            <div>
              <div className="title">{r.label}</div>
              <div className="sub">{r.value} → {r.href}</div>
            </div>
            <div className="actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setDraft(r); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
              <form action={deleteContactAction} style={{ display: "inline" }}>
                <input type="hidden" name="id" value={r.id} />
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
