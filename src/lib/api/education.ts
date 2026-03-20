import type { EducationItem, EducationPageData } from "@/types/content";
import {
  formatDateRange,
  getCollectionItems,
  getSingleItem,
  getStrapiClient,
  isStrapiConfigured,
  normalizeMedia,
  normalizeSeo,
  sortByPriority,
  safeStrapi
} from "@/lib/strapi";

function mapEducation(item: any, index: number): EducationItem {
  return {
    id: index,
    title: item.course || item.name || "",
    institution: item.name || "",
    location: item.location || "",
    period: formatDateRange(item.start_date, item.end_date),
    description: item.course || item.name || "",
    logo: normalizeMedia(item.logo)?.url
  };
}

export async function fetchEducationPage(): Promise<EducationPageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const [pageResponse, collectionResponse] = await Promise.all([
    safeStrapi(
      () =>
        client.single("education-page").find({
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
        client.collection("educations").find({
          sort: ["priority:asc", "start_date:desc"],
          populate: {
            logo: true
          }
        }),
      null
    )
  ]);

  const page = getSingleItem(pageResponse);
  const items = sortByPriority(getCollectionItems<any>(collectionResponse)).map(mapEducation);

  if (!page && items.length === 0) return null;

  return {
    pageHeading: page?.page_heading || "Education",
    items,
    seo: normalizeSeo(page?.seo)
  };
}
