import type { FooterGroup, SiteConfig, SocialLink, ThemeOption } from "@/types/content";
import { getSingleItem, getStrapiClient, isStrapiConfigured, normalizeButtons, normalizeMedia, safeStrapi } from "@/lib/strapi";

const fallbackThemes: ThemeOption[] = [
  { name: "light", label: "Light", colors: ["#fff", "#0d1a3b", "#dbe3f7", "#0d1a3b", "#5565e8"] },
  { name: "dark", label: "Dark", colors: ["#011627", "#607b96", "#062b48", "#5565e8", "#18f2e5"] },
  { name: "aqua", label: "Aqua", colors: ["#345da7", "#d4deef", "#062b48", "#5565e8", "#38ccb2"] },
  { name: "retro", label: "Retro", colors: ["#fff3e0", "#6d4c41", "#ffcc80", "#5d4037", "#f35248"] }
];

const themePresets: Record<
  string,
  Pick<NonNullable<ThemeOption["tokens"]>, "tertiaryContent" | "gradientStart" | "gradientMid" | "gradientEnd">
> = {
  light: {
    tertiaryContent: "#6b7c93",
    gradientStart: "#5565e8",
    gradientMid: "#18f2e5",
    gradientEnd: "#dbe3f7"
  },
  dark: {
    tertiaryContent: "#99a1af",
    gradientStart: "#18f2e5",
    gradientMid: "#5cc0fe",
    gradientEnd: "#4ea7ff"
  },
  aqua: {
    tertiaryContent: "#d4deef",
    gradientStart: "#00c1d4",
    gradientMid: "#18f2e5",
    gradientEnd: "#ff6f61"
  },
  retro: {
    tertiaryContent: "#8c6b5e",
    gradientStart: "#ffab40",
    gradientMid: "#f8d5a0",
    gradientEnd: "#6d4c41"
  }
};

function mapSocials(value: any): SocialLink[] {
  if (!value) return [];

  const candidates = [
    ["GitHub", value.github_link],
    ["LinkedIn", value.linkedin_url],
    ["Facebook", value.facebook_url],
    ["X", value.twitter_link],
    ["Instagram", value.instagram_link],
    ["Email", value.gmail ? `mailto:${value.gmail}` : ""]
  ];

  return candidates
    .filter(([, href]) => typeof href === "string" && href.length > 0)
    .map(([label, href]) => ({ label, href: href as string }));
}

function mapFooterGroups(value: any): FooterGroup[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((group) => ({
      label: group?.label || "Links",
      menu: normalizeButtons(group?.menu)
    }))
    .filter((group) => group.menu.length > 0);
}

function mapTheme(theme: any): ThemeOption | null {
  const name = theme?.slug || theme?.name;
  if (!name) return null;
  const normalizedName = String(name).toLowerCase();
  const preset = themePresets[normalizedName] || themePresets.dark;

  const primary = theme?.primary || "#011627";
  const primaryContent = theme?.primary_content || "#607b96";
  const secondary = theme?.secondary || "#011221";
  const secondaryContent = theme?.secondary_content || theme?.accent || "#5565e8";
  const accent = theme?.accent || "#18f2e5";
  const neutral = theme?.neutral || "#ffffff";
  const border = theme?.border || "#1e2d3d";
  const marquee = theme?.marquee || secondary;

  return {
    name: normalizedName,
    label: theme?.name || normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1),
    colors: [primary, primaryContent, marquee, secondaryContent, accent],
    isDefault: Boolean(theme?.is_default),
    tokens: {
      primary,
      primaryContent,
      secondary,
      secondaryContent,
      tertiaryContent: preset.tertiaryContent,
      accent,
      neutral,
      border,
      marquee,
      gradientStart: preset.gradientStart,
      gradientMid: preset.gradientMid,
      gradientEnd: preset.gradientEnd
    }
  };
}

export async function fetchSiteConfig(): Promise<Partial<SiteConfig> | null> {
  if (!isStrapiConfigured) return null;

  const client = getStrapiClient();
  if (!client) return null;

  const [generalResponse, menuResponse, themesResponse] = await Promise.all([
    safeStrapi(
      () =>
        client.single("general-setting").find({
          populate: {
            favicon: true,
            small_image: true,
            social_media: true,
            gtm: true
          }
        }),
      null
    ),
    safeStrapi(
      () =>
        client.single("menu").find({
          populate: {
            header: true,
            footer: {
              populate: {
                menu: true
              }
            }
          }
        }),
      null
    ),
    safeStrapi(
      () =>
        client.collection("color-themes").find({
          sort: "name:asc"
        }),
      null
    )
  ]);

  const general = getSingleItem(generalResponse);
  const menu = getSingleItem(menuResponse);
  const themes = Array.isArray(themesResponse?.data)
    ? themesResponse.data
        .filter((theme: any) => theme?.hide_theme !== true)
        .map(mapTheme)
        .filter((theme): theme is ThemeOption => theme !== null)
    : [];

  if (!general && !menu && themes.length === 0) return null;

  const favicon = normalizeMedia(general?.favicon);
  const socialImage = normalizeMedia(general?.small_image);
  const headerLinks = normalizeButtons(menu?.header);
  const footerGroups = mapFooterGroups(menu?.footer);

  return {
    siteName: general?.sitename || undefined,
    location: general?.location || undefined,
    favicon: favicon?.url,
    socialImage: socialImage?.url,
    headerLinks,
    footerGroups,
    footerContent: general?.footer_content || undefined,
    socials: mapSocials(general?.social_media),
    themes: themes.length ? themes : fallbackThemes,
    email: general?.social_media?.gmail || undefined,
    gtm: general?.gtm
      ? {
          headScript: general.gtm.head_script || undefined,
          bodyScript: general.gtm.body_script || undefined,
          otherScript: general.gtm.other_script || undefined
        }
      : undefined
  };
}
