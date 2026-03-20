export interface Project {
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
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  published: string;
  content: string;
  labels?: string[];
  coverImage?: string;
}

export interface Testimonial {
  name: string;
  title?: string;
  feedback: string;
  image: string;
  stars: number;
  createdAt: string;
}

export interface SkillItem {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  date: string;
  link: string;
  responsibilities: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  description: string;
}
