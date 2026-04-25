import type { MetadataRoute } from "next";
import { getSetting } from "~/lib/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = (await getSetting("seoSiteUrl", "https://omartabboush.com")).replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/login"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
  };
}
