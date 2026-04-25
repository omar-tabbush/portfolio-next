"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { saveExperienceAction, deleteExperienceAction, type ExperienceState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

type Row = {
  id: number; period: string; isCurrent: boolean;
  role: string; company: string; notes: string; order: number;
};
type Draft = Partial<Row> & { notesRaw?: string };

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : editing ? "Update" : "Add"}</button>;
}
function DeleteButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? "…" : "Delete"}</button>;
}

function rowToDraft(r: Row): Draft {
  let notes: string[] = [];
  try { notes = JSON.parse(r.notes); } catch { /* ignore */ }
  return { ...r, notesRaw: notes.join("\n") };
}

export function ExperienceClient({ rows }: { rows: Row[] }) {
  const [draft, setDraft] = useState<Draft>({});
  const [state, formAction] = useActionState<ExperienceState, FormData>(saveExperienceAction, {});
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) {
      setDraft({});
      setFlash("Saved.");
      const f = document.getElementById("exp-form") as HTMLFormElement | null;
      f?.reset();
    } else if (state.error) {
      setFlash(state.error);
    }
  }, [state]);

  const k = draft.id ?? "new";

  return (
    <>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />

      <form id="exp-form" className="dash-card" action={formAction}>
        <h3 style={{ margin: "0 0 12px" }}>{draft.id ? "Edit entry" : "Add entry"}</h3>
        <input type="hidden" name="id" value={draft.id ?? ""} />
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Period</label>
            <input type="text" name="period" required placeholder="Feb 2024 — Present" defaultValue={draft.period ?? ""} key={`period-${k}`} />
          </div>
          <div className="field" style={{ flex: "0 0 200px", flexDirection: "row", alignItems: "center", gap: 8 }}>
            <input id="isCurrent" type="checkbox" name="isCurrent" defaultChecked={draft.isCurrent ?? false} key={`current-${k}`} />
            <label htmlFor="isCurrent" style={{ margin: 0 }}>Currently here</label>
          </div>
        </div>
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Role</label>
            <input type="text" name="role" required defaultValue={draft.role ?? ""} key={`role-${k}`} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Company</label>
            <input type="text" name="company" required placeholder="@ Acme" defaultValue={draft.company ?? ""} key={`co-${k}`} />
          </div>
        </div>
        <div className="field">
          <label>Notes <span className="hint">(one per line)</span></label>
          <textarea rows={5} name="notesRaw" defaultValue={draft.notesRaw ?? ""} key={`notes-${k}`} />
        </div>
        <div className="field" style={{ maxWidth: 120 }}>
          <label>Order</label>
          <input type="number" name="order" defaultValue={draft.order ?? 0} key={`order-${k}`} />
        </div>
        <div className="row">
          <SubmitButton editing={!!draft.id} />
          {draft.id && <button type="button" className="btn btn-secondary" onClick={() => setDraft({})}>Cancel</button>}
        </div>
      </form>

      <div className="dash-list">
        {rows.map((r) => (
          <div key={r.id} className="dash-item">
            <div className="idx">{r.isCurrent ? "●" : "·"}</div>
            <div>
              <div className="title">{r.role} <span style={{ color: "#a8a29e", fontWeight: 400 }}>{r.company}</span></div>
              <div className="sub">{r.period}</div>
            </div>
            <div className="actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setDraft(rowToDraft(r)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
              <form action={deleteExperienceAction} style={{ display: "inline" }}>
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
