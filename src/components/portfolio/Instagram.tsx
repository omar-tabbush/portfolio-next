import { Section } from "./Section";
import { InstagramPosts } from "./InstagramPosts";

export function Instagram({ variant }: { variant?: "grid" | "featured" }) {
  return (
    <Section title="Instagram" titleEm="/ building in public" id="instagram">
      <InstagramPosts variant={variant} />
    </Section>
  );
}
