"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { saveHeroAction, type HeroState } from "./actions";
import { Flash } from "~/components/dashboard/Flash";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn" disabled={pending}>{pending ? "Saving…" : "Save all"}</button>;
}

export function HeroClient({ initial }: { initial: Record<string, string> }) {
  const [state, formAction] = useActionState<HeroState, FormData>(saveHeroAction, {});
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) setFlash("Saved.");
    else if (state.error) setFlash(state.error);
  }, [state]);

  return (
    <form action={formAction}>
      <Flash message={flash} variant={state.error ? "err" : "ok"} />

      <div className="dash-card">
        <h3 style={{ margin: "0 0 12px" }}>Appearance</h3>
        <div className="row">
          <div className="field" style={{ flex: 1 }}>
            <label>Hero variant</label>
            <select name="heroVariant" defaultValue={initial.heroVariant || "cycle"}>
              <option value="cycle">Role cycler</option>
              <option value="marquee">Marquee</option>
              <option value="boot">Terminal boot</option>
            </select>
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Theme</label>
            <select name="theme" defaultValue={initial.theme || "dark"}>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>Accent</label>
            <select name="accent" defaultValue={initial.accent || "lime"}>
              <option value="lime">Lime</option>
              <option value="amber">Amber</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dash-card">
        <h3 style={{ margin: "0 0 12px" }}>Hero copy</h3>
        <div className="row">
          <div className="field" style={{ flex: 1 }}><label>Availability text</label><input type="text" name="availableText" defaultValue={initial.availableText} /></div>
          <div className="field" style={{ flex: 1 }}><label>Kicker version</label><input type="text" name="heroKickerVersion" defaultValue={initial.heroKickerVersion} /></div>
          <div className="field" style={{ flex: 1 }}><label>Location</label><input type="text" name="heroLocation" defaultValue={initial.heroLocation} /></div>
        </div>
        <div className="row">
          <div className="field" style={{ flex: 1 }}><label>Role blurb</label><input type="text" name="heroRoleBlurb" defaultValue={initial.heroRoleBlurb} /></div>
          <div className="field" style={{ flex: 1 }}><label>Focus blurb</label><input type="text" name="heroFocusBlurb" defaultValue={initial.heroFocusBlurb} /></div>
          <div className="field" style={{ flex: 1 }}><label>Experience blurb</label><input type="text" name="heroExperienceBlurb" defaultValue={initial.heroExperienceBlurb} /></div>
        </div>
      </div>

      <div className="dash-card">
        <h3 style={{ margin: "0 0 12px" }}>About section</h3>
        <div className="field"><label>Paragraph 1</label><textarea rows={3} name="aboutParagraph1" defaultValue={initial.aboutParagraph1} /></div>
        <div className="field"><label>Paragraph 2</label><textarea rows={3} name="aboutParagraph2" defaultValue={initial.aboutParagraph2} /></div>
        <div className="row">
          <div className="field" style={{ flex: 1 }}><label>Based</label><input type="text" name="aboutBased" defaultValue={initial.aboutBased} /></div>
          <div className="field" style={{ flex: 1 }}><label>Role</label><input type="text" name="aboutRole" defaultValue={initial.aboutRole} /></div>
          <div className="field" style={{ flex: 1 }}><label>Working</label><input type="text" name="aboutWorking" defaultValue={initial.aboutWorking} /></div>
        </div>
        <div className="row">
          <div className="field" style={{ flex: 1 }}><label>Status</label><input type="text" name="aboutStatus" defaultValue={initial.aboutStatus} /></div>
          <div className="field" style={{ flex: 1 }}><label>Languages</label><input type="text" name="aboutLangs" defaultValue={initial.aboutLangs} /></div>
          <div className="field" style={{ flex: 1 }}><label>Education</label><input type="text" name="aboutEdu" defaultValue={initial.aboutEdu} /></div>
        </div>
      </div>

      <div className="dash-card">
        <h3 style={{ margin: "0 0 12px" }}>Contact headline</h3>
        <div className="field"><label>Big contact headline</label><input type="text" name="contactHeadline" defaultValue={initial.contactHeadline} /></div>
      </div>

      <div className="row"><SubmitButton /></div>
    </form>
  );
}
