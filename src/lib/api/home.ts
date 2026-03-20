import type { HomePageData } from "@/types/content";
import { getSingleItem, getStrapiClient, isStrapiConfigured, normalizeButtons, normalizeMedia, normalizeSeo, safeStrapi, splitRoles } from "@/lib/strapi";

export async function fetchHomePage(): Promise<HomePageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.single("home").find({
        populate: {
          hero_section: {
            populate: {
              image: true,
              button1: true,
              button2: true
            }
          },
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

  const hero = page.hero_section || {};
  const heroImage = normalizeMedia(hero.image);
  const [primaryButton] = normalizeButtons(hero.button1 ? [hero.button1] : []);
  const [secondaryButton] = normalizeButtons(hero.button2 ? [hero.button2] : []);

  return {
    pageHeading: page.page_heading || "Home",
    hero: {
      title: hero.title || "",
      roles: splitRoles(hero.roles),
      shortDescription: hero.short_description || "",
      image: heroImage?.url,
      primaryButton,
      secondaryButton
    },
    seo: normalizeSeo(page.seo)
  };
}
