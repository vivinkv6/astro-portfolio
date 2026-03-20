import type { AcademicPageData } from "@/types/content";
import { formatDateRange, formatMonthYear, getSingleItem, getStrapiClient, isStrapiConfigured, normalizeSeo, safeStrapi } from "@/lib/strapi";

export async function fetchAcademicPage(): Promise<AcademicPageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.single("academic-page").find({
        populate: {
          journey: true,
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

  return {
    pageHeading: page.page_heading || "Academic Journey",
    journey: Array.isArray(page.journey)
      ? page.journey.map((item: any) => ({
          title: item?.title || "",
          date: item?.end_date ? formatDateRange(item?.start_date, item?.end_date) : formatMonthYear(item?.start_date) || item?.start_date || "",
          description: item?.content || ""
        }))
      : [],
    seo: normalizeSeo(page.seo)
  };
}
