import type { BlogPost, ListingPageData } from "@/types/content";
import {
  byNewest,
  getCollectionItems,
  getSingleItem,
  getStrapiClient,
  isStrapiConfigured,
  normalizeMedia,
  normalizeSeo,
  normalizeTags,
  plainText,
  safeStrapi
} from "@/lib/strapi";

function mapBlog(post: any): BlogPost {
  const featuredImage = normalizeMedia(post.featured_image);
  const bannerImage = normalizeMedia(post.banner_image);

  return {
    id: String(post.documentId || post.id || post.slug || post.title),
    slug: post.slug,
    title: post.title || "Untitled",
    published: post.published_date || post.publishedAt || post.createdAt || new Date().toISOString(),
    content: plainText(post.short_description || post.content || ""),
    contentHtml: post.is_section ? undefined : post.content || undefined,
    sections: Array.isArray(post.sections)
      ? post.sections.map((section: any) => ({
          title: section?.title || undefined,
          contentHtml: section?.content || "",
          image: normalizeMedia(section?.image)?.url
        }))
      : [],
    labels: normalizeTags(post.tags),
    coverImage: featuredImage?.url,
    bannerImage: bannerImage?.url || featuredImage?.url,
    seo: normalizeSeo(post.seo)
  };
}

export async function fetchBlogPage(): Promise<ListingPageData | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.single("blog-page").find({
        populate: {
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
    pageHeading: page.page_heading || "Blogs",
    seo: normalizeSeo(page.seo)
  };
}

export async function fetchBlogs(): Promise<BlogPost[]> {
  if (!isStrapiConfigured) return [];

  const client = getStrapiClient();
  if (!client) return [];

  const response = await safeStrapi(
    () =>
      client.collection("blogs").find({
        sort: ["published_date:desc", "createdAt:desc"],
        populate: {
          featured_image: true,
          banner_image: true,
          sections: {
            populate: {
              image: true
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

  return byNewest(getCollectionItems(response).map(mapBlog));
}

export async function fetchBlogBySlug(slug: string) {
  const blogs = await fetchBlogs();
  return blogs.find((blog) => blog.slug === slug) ?? null;
}
