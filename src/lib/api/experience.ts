import type { ExperienceItem, ExperiencePageData } from "@/types/content";
import {
  formatDateRange,
  getCollectionItems,
  getSingleItem,
  getStrapiClient,
  isStrapiConfigured,
  normalizeSeo,
  richTextToList,
  sortByPriority,
  safeStrapi
} from "@/lib/strapi";

function mapExperience(item: any, index: number): ExperienceItem {
  return {
    id: index,
    role: item.designation || "",
    company: item.company?.name || "",
    date: formatDateRange(item.start_date, item.end_date),
    link: item.company?.website_url || "#",
    responsibilities: richTextToList(item.responsibilities)
  };
}

export async function fetchExperiencePage(): Promise<ExperiencePageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const [pageResponse, collectionResponse] = await Promise.all([
    safeStrapi(
      () =>
        client.single("experience-page").find({
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
        client.collection("experiences").find({
          sort: ["priority:asc", "start_date:desc"],
          populate: {
            company: {
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
  const experiences = sortByPriority(getCollectionItems<any>(collectionResponse)).map(mapExperience);

  if (!page && experiences.length === 0) return null;

  return {
    pageHeading: page?.page_heading || "Experience",
    experiences,
    seo: normalizeSeo(page?.seo)
  };
}
