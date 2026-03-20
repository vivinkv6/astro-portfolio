import type { SeoData, SiteConfig } from "@/types/content";

export function resolveSeo(
  site: SiteConfig,
  pageSeo?: SeoData,
  fallback?: {
    title?: string;
    description?: string;
    image?: string;
  }
) {
  return {
    title: pageSeo?.title || fallback?.title || site.defaultSeo.title || site.siteName,
    description: pageSeo?.description || fallback?.description || site.defaultSeo.description || "",
    image: pageSeo?.ogImage || fallback?.image || site.defaultSeo.ogImage || site.socialImage,
    keywords: pageSeo?.keywords?.length ? pageSeo.keywords : site.defaultSeo.keywords,
    extraJs: pageSeo?.extraJs || site.defaultSeo.extraJs,
    ogTitle: pageSeo?.ogTitle || pageSeo?.title || fallback?.title || site.defaultSeo.ogTitle || site.defaultSeo.title || site.siteName,
    ogDescription:
      pageSeo?.ogDescription ||
      pageSeo?.description ||
      fallback?.description ||
      site.defaultSeo.ogDescription ||
      site.defaultSeo.description ||
      "",
    twitterTitle: pageSeo?.ogTitle || pageSeo?.title || fallback?.title || site.defaultSeo.title || site.siteName,
    twitterDescription:
      pageSeo?.ogDescription ||
      pageSeo?.description ||
      fallback?.description ||
      site.defaultSeo.description ||
      ""
  };
}
