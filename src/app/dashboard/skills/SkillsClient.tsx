"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { saveSkillAction, deleteSkillAction, type SkillState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

type Row = { id: number; letter: string; title: string; description: string; order: number };

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : editing ? "Update" : "Add"}</button>;
}

function DeleteButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? "…" : "Delete"}</button>;
}

export function SkillsClient({ rows }: { rows: Row[] }) {
  const [draft, setDraft] = useState<Partial<Row>>({});
  const [state, formAction] = useActionState<SkillState, FormData>(saveSkillAction, {});
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) {
      setDraft({});
      setFlash("Saved.");
      const f = document.getElementById("skill-form") as HTMLFormElement | null;
      f?.reset();
    } else if (state.error) {
      setFlash(state.error);
    }
  }, [state]);

  function startEdit(r: Row) {
    setDraft(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />

      <form id="skill-form" className="dash-card" action={formAction}>
        <h3 style={{ margin: "0 0 12px" }}>{draft.id ? "Edit skill" : "Add skill"}</h3>
        <input type="hidden" name="id" value={draft.id ?? ""} />
        <div className="row">
          <div className="field" style={{ flex: "0 0 80px" }}>
            <label>Letter</label>
            <input
              type="text" name="letter" maxLength={2} required
              defaultValue={draft.letter ?? ""}
              key={`letter-${draft.id ?? "new"}`}
              onChange={(e) => (e.currentTarget.value = e.currentTarget.value.toUpperCase())}
            />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Title</label>
            <input type="text" name="title" required defaultValue={draft.title ?? ""} key={`title-${draft.id ?? "new"}`} />
          </div>
          <div className="field" style={{ flex: "0 0 100px" }}>
            <label>Order</label>
            <input type="number" name="order" defaultValue={draft.order ?? 0} key={`order-${draft.id ?? "new"}`} />
          </div>
        </div>
        <div className="field">
          <label>Description</label>
          <textarea name="description" required defaultValue={draft.description ?? ""} key={`desc-${draft.id ?? "new"}`} />
        </div>
        <div className="row">
          <SubmitButton editing={!!draft.id} />
          {draft.id && <button type="button" className="btn btn-secondary" onClick={() => setDraft({})}>Cancel</button>}
        </div>
      </form>

      <div className="dash-list">
        {rows.map((r, i) => (
          <div key={r.id} className="dash-item">
            <div className="idx">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="title">{r.letter} · {r.title}</div>
              <div className="sub">{r.description}</div>
            </div>
            <div className="actions">
              <button type="button" className="btn btn-secondary" onClick={() => startEdit(r)}>Edit</button>
              <form action={deleteSkillAction} style={{ display: "inline" }}>
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
