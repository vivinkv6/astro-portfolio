import type { BlogPost, ListingPageData, PaginatedResult } from "@/types/content";
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

const BLOGS_FETCH_PAGE_SIZE = 6;

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

  const blogs: BlogPost[] = [];
  let page = 1;
  let pageCount = 1;

  do {
    const response = await safeStrapi(
      () =>
        client.collection("blogs").find({
          filters: {
            publishedAt: {
              $notNull: true
            }
          },
          sort: ["published_date:desc", "createdAt:desc"],
          pagination: {
            page,
            pageSize: BLOGS_FETCH_PAGE_SIZE
          },
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

    if (!response) break;

    blogs.push(
      ...getCollectionItems(response)
        .filter((post: any) => Boolean(post?.publishedAt))
        .map(mapBlog)
    );
    const meta = (response as any)?.meta?.pagination;
    pageCount = meta?.pageCount || 1;
    page += 1;
  } while (page <= pageCount);

  return byNewest(blogs);
}

export async function fetchBlogBySlug(slug: string) {
  const blogs = await fetchBlogs();
  return blogs.find((blog) => blog.slug === slug) ?? null;
}

export async function fetchBlogsPaginated(page: number, pageSize: number): Promise<PaginatedResult<BlogPost> | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.collection("blogs").find({
        filters: {
          publishedAt: {
            $notNull: true
          }
        },
        sort: ["published_date:desc", "createdAt:desc"],
        pagination: {
          page,
          pageSize
        },
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

  if (!response) return null;

  const items = getCollectionItems(response)
    .filter((post: any) => Boolean(post?.publishedAt))
    .map(mapBlog);
  const meta = (response as any)?.meta?.pagination;

  return {
    items,
    pagination: {
      page: meta?.page || page,
      pageSize: meta?.pageSize || pageSize,
      total: meta?.total || items.length,
      pageCount: meta?.pageCount || 1
    }
  };
}
