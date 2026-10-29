// Posts shown in the Instagram section. Posters are stored in /public/instagram
// because Instagram's own image URLs are signed and expire.
export const INSTAGRAM_HANDLE = "otabbush";
export const INSTAGRAM_PROFILE = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export type InstagramPost = {
  code: string;
  kind: "reel" | "carousel";
  title: string;
  points?: string[];
  meta: string;
  posters: string[];
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    code: "DfACsyiA2cb",
    kind: "reel",
    title: "You built an app with AI in a weekend. Then real users showed up, and it broke.",
    points: [
      "You take the AI’s first answer for every feature",
      "You trust it because the demo works",
      "You never read the AI’s plan",
    ],
    meta: "1:14",
    posters: ["/instagram/DfACsyiA2cb.webp"],
  },
  {
    code: "DebVMrjDc19",
    kind: "carousel",
    title: "You vibe it till you made it… what’s next?",
    meta: "3 slides",
    posters: [
      "/instagram/DebVMrjDc19-1.webp",
      "/instagram/DebVMrjDc19-2.webp",
      "/instagram/DebVMrjDc19-3.webp",
    ],
  },
];

export function postUrl(p: InstagramPost) {
  return `https://www.instagram.com/${p.kind === "reel" ? "reel" : "p"}/${p.code}/`;
}

export function embedUrl(p: InstagramPost) {
  return `${postUrl(p)}embed/`;
}
