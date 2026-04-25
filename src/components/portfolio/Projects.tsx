import { Section } from "./Section";
import { ProjectsList } from "./ProjectsList";
import type { PortfolioContent } from "~/lib/content";

export function Projects({ projects }: { projects: PortfolioContent["projects"] }) {
  return (
    <Section idx="04" title="Selected work" titleEm="/ shipped in production" id="work">
      <ProjectsList projects={projects} />
    </Section>
  );
}
