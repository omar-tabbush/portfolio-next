import type { MetadataRoute } from "next";
import { getSetting } from "~/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = (await getSetting("seoSiteUrl", "https://omartabboush.com")).replace(/\/$/, "");
  const lastModified = new Date();
  const paths = ["/", "/#about", "/#rescue", "/#skills", "/#work", "/#experience", "/#stack", "/#contact"];
  return paths.map((p) => ({
    url: `${site}${p}`,
    lastModified,
    changeFrequency: "monthly",
    priority: p === "/" ? 1.0 : 0.7,
  }));
}
