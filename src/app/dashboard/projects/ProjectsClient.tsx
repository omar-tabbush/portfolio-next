"use client";

import { useActionState, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { saveProjectAction, deleteProjectAction, type ProjectState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

type Row = {
  id: number; idx: string; name: string; italic: string; blurb: string;
  year: string; stack: string; tags: string; accent: string; order: number;
};
type Draft = Partial<Row> & { tagsRaw?: string };

function SubmitButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : editing ? "Update" : "Add"}</button>;
}
function DeleteButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-danger" disabled={pending}>{pending ? "…" : "Delete"}</button>;
}

function rowToDraft(r: Row): Draft {
  let tags: string[] = [];
  try { tags = JSON.parse(r.tags); } catch { /* ignore */ }
  return { ...r, tagsRaw: tags.join(", ") };
}

export function ProjectsClient({ rows }: { rows: Row[] }) {
  const [draft, setDraft] = useState<Draft>({});
  const [state, formAction] = useActionState<ProjectState, FormData>(saveProjectAction, {});
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) {
      setDraft({});
      setFlash("Saved.");
      const f = document.getElementById("project-form") as HTMLFormElement | null;
      f?.reset();
    } else if (state.error) {
      setFlash(state.error);
    }
  }, [state]);

  const k = draft.id ?? "new";

  return (
    <>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />

      <form id="project-form" className="dash-card" action={formAction}>
        <h3 style={{ margin: "0 0 12px" }}>{draft.id ? "Edit project" : "Add project"}</h3>
        <input type="hidden" name="id" value={draft.id ?? ""} />
        <div className="row">
          <div className="field" style={{ flex: "0 0 100px" }}>
            <label>Index</label>
            <input type="text" name="idx" required placeholder="001" defaultValue={draft.idx ?? ""} key={`idx-${k}`} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Name</label>
            <input type="text" name="name" required defaultValue={draft.name ?? ""} key={`name-${k}`} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Italic suffix</label>
            <input type="text" name="italic" placeholder=" / Enterprise SaaS" defaultValue={draft.italic ?? ""} key={`italic-${k}`} />
          </div>
        </div>
        <div className="field">
          <label>Blurb</label>
          <textarea name="blurb" required defaultValue={draft.blurb ?? ""} key={`blurb-${k}`} />
        </div>
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Year</label>
            <input type="text" name="year" required placeholder="2024–25" defaultValue={draft.year ?? ""} key={`year-${k}`} />
          </div>
          <div className="field" style={{ flex: 2 }}>
            <label>Stack summary</label>
            <input type="text" name="stack" required placeholder="NestJS · TypeScript · Prisma" defaultValue={draft.stack ?? ""} key={`stack-${k}`} />
          </div>
        </div>
        <div className="field">
          <label>Tags <span className="hint">(comma-separated)</span></label>
          <input type="text" name="tagsRaw" placeholder="Backend, Payments, Architecture" defaultValue={draft.tagsRaw ?? ""} key={`tags-${k}`} />
        </div>
        <div className="row">
          <div className="field" style={{ flex: "0 0 200px" }}>
            <label>Accent color</label>
            <select name="accent" defaultValue={draft.accent ?? "lime"} key={`accent-${k}`}>
              <option value="lime">Lime</option>
              <option value="amber">Amber</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </div>
          <div className="field" style={{ flex: "0 0 120px" }}>
            <label>Order</label>
            <input type="number" name="order" defaultValue={draft.order ?? 0} key={`order-${k}`} />
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
            <div className="idx">{r.idx}</div>
            <div>
              <div className="title">{r.name}<span style={{ color: "#a8a29e", fontWeight: 400 }}>{r.italic}</span></div>
              <div className="sub">{r.year} · {r.stack}</div>
            </div>
            <div className="actions">
              <button type="button" className="btn btn-secondary" onClick={() => { setDraft(rowToDraft(r)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
              <form action={deleteProjectAction} style={{ display: "inline" }}>
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
