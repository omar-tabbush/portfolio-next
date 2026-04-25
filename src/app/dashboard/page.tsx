import { loadContent } from "~/lib/content";

export default async function DashboardOverview() {
  const c = await loadContent();
  return (
    <>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Overview</h1>
          <div className="dash-sub">Manage what visitors see on your portfolio.</div>
        </div>
      </div>

      <div className="dash-grid-stats">
        <div className="dash-stat"><div className="k">Skills</div><div className="v">{c.skills.length}</div></div>
        <div className="dash-stat"><div className="k">Projects</div><div className="v">{c.projects.length}</div></div>
        <div className="dash-stat"><div className="k">Experience</div><div className="v">{c.experience.length}</div></div>
        <div className="dash-stat"><div className="k">Contacts</div><div className="v">{c.contacts.length}</div></div>
      </div>

      <div className="dash-card">
        <h3 style={{ margin: "0 0 8px" }}>Quick tips</h3>
        <ul style={{ paddingLeft: 18, margin: 0, color: "#57534e", lineHeight: 1.7 }}>
          <li>Use the left nav to edit each section of your portfolio.</li>
          <li>Saves trigger an instant cache refresh — visitors see changes on the next page load.</li>
          <li>Keep your SEO title/description punchy and keyword-rich on the SEO tab.</li>
          <li>Orders: lower numbers come first.</li>
        </ul>
      </div>
    </>
  );
}
