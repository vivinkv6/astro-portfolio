import type { SkillsPageData } from "@/types/content";
import { getCollectionItems, getSingleItem, getStrapiClient, isStrapiConfigured, normalizeMedia, normalizeSeo, safeStrapi } from "@/lib/strapi";

export async function fetchSkillsPage(): Promise<SkillsPageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const [pageResponse, categoriesResponse] = await Promise.all([
    safeStrapi(
      () =>
        client.single("skill-page").find({
          populate: {
            seo: {
              populate: {
                og_image: true
              }
            }
          }
        }),
      null
    ),
    safeStrapi(
      () =>
        client.collection("skill-categories").find({
          sort: "name:asc",
          populate: {
            skills: {
              populate: {
                logo: true
              }
            }
          }
        }),
      null
    )
  ]);

  const page = getSingleItem(pageResponse);
  const categories = getCollectionItems(categoriesResponse).map((category: any) => ({
    category: category.name || "Skills",
    skills: Array.isArray(category.skills)
      ? category.skills.map((skill: any) => ({
          name: skill?.name || "",
          icon: normalizeMedia(skill?.logo)?.url,
          websiteUrl: skill?.website_url || undefined
        }))
      : []
  }));

  if (!page && categories.length === 0) return null;

  return {
    pageHeading: page?.page_heading || "Skills",
    categories,
    seo: normalizeSeo(page?.seo)
  };
}
