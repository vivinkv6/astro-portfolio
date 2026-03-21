import type { ErrorPageContent } from "@/types/content";
import { getSingleItem, getStrapiClient, isStrapiConfigured, normalizeHref, safeStrapi } from "@/lib/strapi";

type ErrorPageKind = "404" | "500";

function mapAction(button: any, variant: "primary" | "secondary") {
  if (!button?.label || !button?.link) return null;

  return {
    label: button.label,
    href: normalizeHref(button.link),
    variant
  } as const;
}

function mapErrorBlock(block: any, fallback: ErrorPageContent): ErrorPageContent {
  if (!block) return fallback;

  const actions = [mapAction(block.button1, "primary"), mapAction(block.button2, "secondary")].filter(
    (item): item is NonNullable<typeof item> => Boolean(item)
  );

  return {
    code: String(block.status_code || fallback.code),
    eyebrow: block.tag || fallback.eyebrow,
    title: block.title || fallback.title,
    description: block.short_description || fallback.description,
    actions: actions.length ? actions : fallback.actions
  };
}

export async function fetchErrorPage(kind: ErrorPageKind): Promise<ErrorPageContent | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const response = await safeStrapi(
    () =>
      client.single("error-page").find({
        populate: {
          not_found_page: {
            populate: {
              button1: true,
              button2: true
            }
          },
          server_error_page: {
            populate: {
              button1: true,
              button2: true
            }
          }
        }
      }),
    null
  );

  const page = getSingleItem(response);
  if (!page) return null;

  const fallback =
    kind === "404"
      ? {
          code: "404",
          eyebrow: "Route not found",
          title: "Page not found.",
          description: "The page you are looking for does not exist or may have moved.",
          actions: [
            { label: "Go Home", href: "/", variant: "primary" as const },
            { label: "View Projects", href: "/project", variant: "secondary" as const }
          ]
        }
      : {
          code: "500",
          eyebrow: "Internal server error",
          title: "Something went wrong.",
          description: "An unexpected error occurred while loading this page. Please try again in a moment.",
          actions: [
            { label: "Go Home", href: "/", variant: "primary" as const },
            { label: "About Me", href: "/about", variant: "secondary" as const }
          ]
        };

  return mapErrorBlock(kind === "404" ? page.not_found_page : page.server_error_page, fallback);
}
