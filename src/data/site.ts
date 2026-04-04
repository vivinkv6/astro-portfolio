import type { ComponentType, SVGProps } from "react";
import type { EducationItem, ExperienceItem, SkillCategory } from "@/types/content";
import { Codepen, Facebook, GithubIcon, Instagram, LinkedIn, XIcon } from "@/utils/icons";

export const personalInfo = {
  name: "Vivin KV",
  title: "Full-Stack Developer",
  tagline: "Building production-ready systems with Next.js, NestJS, and AI-powered workflows.",
  email: "vivinkv6@gmail.com",
  phone: "+91 6238574146",
  location: "Thrissur, Kerala, India",
  resumeUrl: "#"
};

type SocialLink = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const socials: SocialLink[] = [
  { href: "https://github.com/vivinkv6", label: "GitHub", icon: GithubIcon },
  { href: "https://linkedin.com/in/vivin-kv-6b449b259", label: "LinkedIn", icon: LinkedIn },
  { href: "https://codepen.io/vivinkv6", label: "CodePen", icon: Codepen },
  { href: "https://x.com/vivinkv6", label: "X", icon: XIcon },
  { href: "https://instagram.com/vivin_kv_", label: "Instagram", icon: Instagram },
  { href: "https://facebook.com/vivin.kv.7", label: "Facebook", icon: Facebook }
];

export const footerLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Education", href: "/education" },
  { title: "Academics", href: "/academics" },
  { title: "Experience", href: "/experience" },
  { title: "Project", href: "/project" },
  { title: "Skills", href: "/skills" },
  { title: "Blogs", href: "/blogs" },
  { title: "Testimonials", href: "/testimonials" }
];

export const themes = [
  { name: "light", label: "Light", colors: ["#ffffff", "#17305b", "#dfe7fb", "#3347b8", "#5565e8"] },
  { name: "dark", label: "Dark", colors: ["#011627", "#7f93ad", "#062b48", "#7b8cff", "#18f2e5"] }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Language and Frameworks",
    skills: [
      { name: "JavaScript", icon: "/assets/icons/javascript.svg" },
      { name: "TypeScript", icon: "/assets/icons/typescript.svg" },
      { name: "React.js", icon: "/assets/icons/react.svg" },
      { name: "Next.js", icon: "/assets/icons/nextjs.svg" },
      { name: "Node.js", icon: "/assets/icons/nodejs.svg" },
      { name: "Nest.js", icon: "/assets/icons/nest.svg" },
      { name: "Express.js", icon: "/assets/icons/express.svg" },
      { name: "React Native", icon: "/assets/icons/react.svg" },
      { name: "Tailwind CSS", icon: "/assets/icons/tailwind-css.svg" }
    ]
  },
  {
    category: "Backend and CMS",
    skills: [
      { name: "Strapi CMS", icon: "/assets/icons/nodejs.svg" },
      { name: "PostgreSQL", icon: "/assets/icons/nodejs.svg" },
      { name: "MongoDB", icon: "/assets/icons/nodejs.svg" }
    ]
  },
  {
    category: "AI and Productivity",
    skills: [
      { name: "AI-Powered Dev", icon: "/assets/icons/socket.svg" },
      { name: "Git and GitHub", icon: "/assets/icons/socket.svg" },
      { name: "VS Code", icon: "/assets/icons/nodejs.svg" }
    ]
  },
  {
    category: "Deployment and Infrastructure",
    skills: [
      { name: "Coolify", icon: "/assets/icons/nextjs.svg" },
      { name: "Vercel", icon: "/assets/icons/nextjs.svg" },
      { name: "Netlify", icon: "/assets/icons/nextjs.svg" }
    ]
  }
];

export const skillList = skillCategories.flatMap((category) => category.skills);

export const experiences: ExperienceItem[] = [
  {
    id: 0,
    company: "SpiderWorks Technologies",
    date: "July 2024 - Present",
    role: "Next JS Developer",
    link: "https://www.spiderworks.in/",
    responsibilities: [
      "Integrated RESTful APIs into Next.js applications, ensuring smooth data flow and robust functionality across the platform.",
      "Collaborated with back-end developers to define API requirements and troubleshoot integration issues.",
      "Optimized API requests and responses to improve application performance and reduce latency.",
      "Debugged and resolved front-end and API-related issues for a consistent user experience.",
      "Implemented reusable components and utilities for efficient API handling."
    ]
  },
  {
    id: 1,
    company: "Trebuchet Systems",
    date: "July 2022 - September 2022",
    role: "Front End Intern",
    link: "https://trebuchet.one/",
    responsibilities: [
      "Redesigned the front-end user interface to improve usability and enhance user satisfaction.",
      "Successfully integrated the front-end application with the back-end system.",
      "Implemented version control practices using Git for efficient team collaboration.",
      "Assisted in debugging and troubleshooting front-end issues."
    ]
  },
  {
    id: 2,
    company: "TinkerHub GCT",
    date: "March 2022 - April 2023",
    role: "Technical Lead",
    link: "https://www.tinkerhub.org/",
    responsibilities: [
      "Organized and led technology workshops and seminars for students.",
      "Developed and delivered comprehensive training materials.",
      "Facilitated hands-on sessions for real-world skill application."
    ]
  }
];

export const education: EducationItem[] = [
  {
    id: 0,
    title: "BSc Computer Science",
    institution: "Sri C Achutha Menon Government College, Thrissur",
    location: "Thrissur, Kerala",
    period: "2021 - 2024",
    description: "Focused on programming fundamentals, systems thinking, software engineering, and practical web development."
  },
  {
    id: 1,
    title: "Higher Secondary in Commerce",
    institution: "CNN Higher Secondary School",
    location: "Thrissur, Kerala",
    period: "2019 - 2021",
    description: "Built the academic foundation that later transitioned into product, systems, and development work."
  }
];

export const academics = [
  {
    title: "Core Areas",
    points: [
      "Data structures and algorithms",
      "Database fundamentals",
      "Object-oriented programming",
      "Web technologies and software engineering"
    ]
  },
  {
    title: "Learning Style",
    points: [
      "Project-based experimentation",
      "Fast adoption of modern tooling",
      "Strong interest in architecture, SEO, and deployment"
    ]
  }
];
