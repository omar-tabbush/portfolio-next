"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveSeoAction, type SeoState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : "Save"}</button>;
}

export function SeoClient({ initial }: { initial: Record<string, string> }) {
  const [state, formAction] = useActionState<SeoState, FormData>(saveSeoAction, {});
  const [flash, setFlash] = useState<string | null>(null);
  const [title, setTitle] = useState(initial.seoTitle ?? "");
  const [desc, setDesc] = useState(initial.seoDescription ?? "");

  useEffect(() => {
    if (state.ok) setFlash("Saved.");
    else if (state.error) setFlash(state.error);
  }, [state]);

  return (
    <>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />
      <form action={formAction} className="dash-card">
        <div className="field">
          <label>Site URL <span className="hint">(canonical — used in sitemap, OG, JSON-LD)</span></label>
          <input type="url" name="seoSiteUrl" defaultValue={initial.seoSiteUrl} placeholder="https://omartabboush.com" />
        </div>
        <div className="field">
          <label>Page title <span className="hint">(50–60 chars for best SERP display)</span></label>
          <input type="text" name="seoTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="hint">{title.length} characters</div>
        </div>
        <div className="field">
          <label>Meta description <span className="hint">(150–160 chars)</span></label>
          <textarea rows={3} name="seoDescription" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="hint">{desc.length} characters</div>
        </div>
        <div className="row"><SubmitButton /></div>
      </form>

      <div className="dash-card">
        <h3 style={{ margin: "0 0 12px" }}>Ranking tips for &ldquo;Omar Tabboush&rdquo;</h3>
        <ul style={{ paddingLeft: 18, margin: 0, color: "#57534e", lineHeight: 1.7 }}>
          <li>After deploying, verify your domain in <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer">Google Search Console</a> and submit <code>/sitemap.xml</code>.</li>
          <li>Get one or two backlinks from places you already exist: GitHub profile README, LinkedIn &ldquo;Featured&rdquo;, dev.to, Stack Overflow.</li>
          <li>Use your full name consistently &mdash; &ldquo;Omar Tabboush&rdquo; &mdash; everywhere online (the JSON-LD already aliases common misspellings).</li>
          <li>Keep the description punchy: &ldquo;software developer&rdquo; + &ldquo;Beirut&rdquo; + &ldquo;hire&rdquo;.</li>
        </ul>
      </div>
    </>
  );
}
