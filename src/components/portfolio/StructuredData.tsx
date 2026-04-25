import type { PortfolioContent } from "~/lib/content";

/**
 * JSON-LD structured data — what makes the site rank for "Omar Tabboush" and
 * appear with rich SERP features. Renders as inline <script> tags during SSR.
 */
export function StructuredData({ content }: { content: PortfolioContent }) {
  const s = content.settings;
  const url = s.seoSiteUrl || "https://omartabboush.com";
  const email = content.contacts.find((c) => c.label.toLowerCase() === "email")?.value;
  const sameAs = content.contacts
    .filter((c) => c.href.startsWith("http"))
    .map((c) => c.href);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Omar Tabboush",
    alternateName: ["Omar Tabbouche", "Omar Tabbush"],
    url,
    email: email ? `mailto:${email}` : undefined,
    jobTitle: "Senior Full-Stack Software Developer",
    description: s.seoDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beirut",
      addressCountry: "LB",
    },
    knowsAbout: [
      "Backend architecture", "NestJS", "Node.js", "TypeScript",
      "Next.js", "React", "PostgreSQL", "LLM integration", "OpenAI",
      "Stripe", "SaaS platforms",
    ],
    sameAs,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Omar Tabboush",
    url,
    author: { "@type": "Person", name: "Omar Tabboush" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
