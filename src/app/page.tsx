import type { Metadata } from "next";
import { loadContent } from "~/lib/content";
import { Cursor } from "~/components/portfolio/Cursor";
import { Observers } from "~/components/portfolio/Observers";
import { HtmlAttrs } from "~/components/portfolio/HtmlAttrs";
import { StatusBar } from "~/components/portfolio/StatusBar";
import { Nav } from "~/components/portfolio/Nav";
import { Hero } from "~/components/portfolio/Hero";
import { About } from "~/components/portfolio/About";
import { Rescue } from "~/components/portfolio/Rescue";
import { Skills } from "~/components/portfolio/Skills";
import { Projects } from "~/components/portfolio/Projects";
import { Experience } from "~/components/portfolio/Experience";
import { Stack } from "~/components/portfolio/Stack";
import { Contact } from "~/components/portfolio/Contact";
import { BigFooter } from "~/components/portfolio/BigFooter";
import { StructuredData } from "~/components/portfolio/StructuredData";

// Static + ISR. Mutations call revalidatePath('/') so the page updates
// instantly when dashboard saves; otherwise the cached HTML is served from
// Vercel's edge (huge perf win — no DB hit per visit).
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent();
  const s = content.settings;
  const title = s.seoTitle || "Omar Tabboush — Senior Full-Stack Software Developer";
  const description = s.seoDescription || "Senior full-stack software developer in Beirut. Backend architecture, scalable systems, LLM integration.";
  const url = s.seoSiteUrl || "https://omartabboush.com";
  return {
    title,
    description,
    authors: [{ name: "Omar Tabboush" }],
    keywords: [
      "Omar Tabboush", "software developer", "full-stack developer Beirut",
      "backend architect", "NestJS", "Next.js", "hire software developer",
      "LLM integration", "SaaS developer",
    ],
    robots: { index: true, follow: true, "max-image-preview": "large" },
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Omar Tabboush",
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage() {
  const content = await loadContent();
  const { settings } = content;
  return (
    <>
      <HtmlAttrs theme={settings.theme || "dark"} accent={settings.accent || "lime"} />
      <Observers />
      <StructuredData content={content} />
      <Cursor />
      <Nav />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Rescue />
        <Skills skills={content.skills} />
        <Projects projects={content.projects} />
        <Experience experience={content.experience} />
        <Stack stack={content.stack} />
        <Contact contacts={content.contacts} settings={settings} />
      </main>
      <BigFooter />
      <div className="bottom-spacer" />
      <StatusBar />
    </>
  );
}
