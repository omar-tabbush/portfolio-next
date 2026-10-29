// Single source for section order — drives the side index and the
// numbered card headers so the two never drift apart.
export const SECTIONS = [
  { id: "about", label: "About", sub: "the developer" },
  { id: "rescue", label: "Rescue", sub: "vibe-coded apps" },
  { id: "skills", label: "Expertise", sub: "what I do well" },
  { id: "work", label: "Work", sub: "shipped in production" },
  { id: "experience", label: "Experience", sub: "track record" },
  { id: "stack", label: "Stack", sub: "tools of the trade" },
  { id: "instagram", label: "Instagram", sub: "building in public" },
  { id: "contact", label: "Contact", sub: "make something" },
] as const;

export function sectionNum(id: string) {
  const i = SECTIONS.findIndex((s) => s.id === id);
  return String(i + 1).padStart(2, "0");
}
