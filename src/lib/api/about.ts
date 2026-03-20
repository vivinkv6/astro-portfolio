import type { AboutPageData } from "@/types/content";
import { getSingleItem, getStrapiClient, htmlBlocksToParagraphs, isStrapiConfigured, normalizeMedia, normalizeSeo, safeStrapi } from "@/lib/strapi";

export async function fetchAboutPage(): Promise<AboutPageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.single("about").find({
        populate: {
          image: true,
          content: true,
          stats: true,
          seo: {
            populate: {
              og_image: true
            }
          }
        }
      }),
    null
  );

  const page = getSingleItem(response);
  if (!page) return null;

  const image = normalizeMedia(page.image);

  return {
    pageHeading: page.page_heading || "About",
    image: image?.url,
    content: htmlBlocksToParagraphs(page.content),
    stats: Array.isArray(page.stats)
      ? page.stats.map((item: any) => ({
          count: item?.count || "",
          shortTitle: item?.short_title || ""
        }))
      : [],
    seo: normalizeSeo(page.seo)
  };
}
