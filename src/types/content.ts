export interface MediaAsset {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  extraJs?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterGroup {
  label: string;
  menu: NavItem[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface ThemeOption {
  name: string;
  label: string;
  colors: string[];
  isDefault?: boolean;
  tokens?: {
    primary: string;
    primaryContent: string;
    secondary: string;
    secondaryContent: string;
    tertiaryContent: string;
    accent: string;
    neutral: string;
    border: string;
    marquee: string;
    gradientStart: string;
    gradientMid: string;
    gradientEnd: string;
  };
}

export interface SiteConfig {
  siteName: string;
  personName: string;
  jobTitle: string;
  tagline: string;
  email?: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  favicon?: string;
  socialImage?: string;
  headerLinks: NavItem[];
  footerGroups: FooterGroup[];
  footerContent?: string;
  socials: SocialLink[];
  themes: ThemeOption[];
  defaultSeo: SeoData;
  gtm?: {
    headScript?: string;
    bodyScript?: string;
    otherScript?: string;
  };
}

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroData {
  title: string;
  roles: string[];
  shortDescription: string;
  image?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
}

export interface StatItem {
  count: string;
  shortTitle: string;
}

export interface AboutPageData {
  pageHeading: string;
  image?: string;
  content: string[];
  stats: StatItem[];
  seo?: SeoData;
}

export interface HomePageData {
  pageHeading: string;
  hero: HeroData;
  seo?: SeoData;
}

export interface AcademicJourneyItem {
  title: string;
  date: string;
  description: string;
}

export interface AcademicPageData {
  pageHeading: string;
  journey: AcademicJourneyItem[];
  seo?: SeoData;
}

export interface ListingPageData {
  pageHeading: string;
  seo?: SeoData;
}

export interface SkillItem {
  name: string;
  icon?: string;
  websiteUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface SkillsPageData extends ListingPageData {
  categories: SkillCategory[];
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  date: string;
  link: string;
  responsibilities: string[];
}

export interface ExperiencePageData extends ListingPageData {
  experiences: ExperienceItem[];
}

export interface EducationItem {
  id: number;
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  link?: string;
  logo?: string;
}

export interface EducationPageData extends ListingPageData {
  items: EducationItem[];
}

export interface BlogSection {
  title?: string;
  contentHtml: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  published: string;
  content: string;
  contentHtml?: string;
  sections?: BlogSection[];
  labels?: string[];
  coverImage?: string;
  bannerImage?: string;
  seo?: SeoData;
}

export interface Project {
  id: string;
  priority: number;
  title: string;
  shortDescription: string;
  longDescription?: string;
  cover: string;
  livePreview?: string;
  githubLink?: string;
  visitors?: string;
  earned?: string;
  githubStars?: string;
  ratings?: string;
  numberOfSales?: string;
  type: string;
  siteAge?: string;
  technologies?: string[];
  slug: string;
  seo?: SeoData;
}

export interface Testimonial {
  name: string;
  title?: string;
  feedback: string;
  image: string;
  stars: number;
  createdAt: string;
}
