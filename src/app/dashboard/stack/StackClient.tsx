"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { saveStackAction, deleteStackAction, type StackState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

type Row = { id: number; category: string; items: string; order: number };
type Draft = Partial<Row> & { itemsRaw?: string };

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : editing ? "Update" : "Add"}</button>;
}
function DeleteButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? "…" : "Delete"}</button>;
}

function rowToDraft(r: Row): Draft {
  let items: string[] = [];
  try { items = JSON.parse(r.items); } catch { /* ignore */ }
  return { ...r, itemsRaw: items.join(", ") };
}

export function StackClient({ rows }: { rows: Row[] }) {
  const [draft, setDraft] = useState<Draft>({});
  const [state, formAction] = useActionState<StackState, FormData>(saveStackAction, {});
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) {
      setDraft({});
      setFlash("Saved.");
      const f = document.getElementById("stack-form") as HTMLFormElement | null;
      f?.reset();
    } else if (state.error) {
      setFlash(state.error);
    }
  }, [state]);

  const k = draft.id ?? "new";

  return (
    <>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />

      <form id="stack-form" className="dash-card" action={formAction}>
        <h3 style={{ margin: "0 0 12px" }}>{draft.id ? "Edit category" : "Add category"}</h3>
        <input type="hidden" name="id" value={draft.id ?? ""} />
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Category</label>
            <input type="text" name="category" required placeholder="Backend" defaultValue={draft.category ?? ""} key={`cat-${k}`} />
          </div>
          <div className="field" style={{ flex: "0 0 120px" }}>
            <label>Order</label>
            <input type="number" name="order" defaultValue={draft.order ?? 0} key={`order-${k}`} />
          </div>
        </div>
        <div className="field">
          <label>Items <span className="hint">(comma-separated)</span></label>
          <input type="text" name="itemsRaw" placeholder="Express.js, Nest.js, Node" defaultValue={draft.itemsRaw ?? ""} key={`items-${k}`} />
        </div>
        <div className="row">
          <SubmitButton editing={!!draft.id} />
          {draft.id && <button type="button" className="btn btn-secondary" onClick={() => setDraft({})}>Cancel</button>}
        </div>
      </form>

      <div className="dash-list">
        {rows.map((r) => {
          let items: string[] = [];
          try { items = JSON.parse(r.items); } catch { /* ignore */ }
          return (
            <div key={r.id} className="dash-item">
              <div className="idx">·</div>
              <div>
                <div className="title">{r.category}</div>
                <div className="sub">{items.join(" · ")}</div>
              </div>
              <div className="actions">
                <button type="button" className="btn btn-secondary" onClick={() => { setDraft(rowToDraft(r)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
                <form action={deleteStackAction} style={{ display: "inline" }}>
                  <input type="hidden" name="id" value={r.id} />
                  <DeleteButton />
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
