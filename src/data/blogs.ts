import type { BlogPost } from "@/types/content";

export const sampleBlogs: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs-14-and-typescript",
    title: "Getting Started with Next.js 14 and TypeScript",
    published: "2024-01-15",
    content:
      "Learn how to build modern web applications with Next.js 14 and TypeScript. This guide walks through setup, architecture choices, typing patterns, and shipping a maintainable frontend.",
    labels: ["Next.js", "TypeScript", "React"],
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop"
  },
  {
    id: "2",
    slug: "building-responsive-uis-with-tailwind-css",
    title: "Building Responsive UIs with Tailwind CSS",
    published: "2024-01-10",
    content:
      "A practical walkthrough of utility-first CSS, responsive layout patterns, and a workflow for building polished interfaces quickly with Tailwind CSS.",
    labels: ["Tailwind CSS", "CSS", "Web Design"],
    coverImage:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&auto=format&fit=crop"
  },
  {
    id: "3",
    slug: "understanding-react-hooks-in-depth",
    title: "Understanding React Hooks in Depth",
    published: "2024-01-05",
    content:
      "A concise but deep guide to hooks, effect timing, state modeling, and how to avoid the common edge cases that show up in larger React codebases.",
    labels: ["React", "JavaScript", "Hooks"],
    coverImage:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&auto=format&fit=crop"
  },
  {
    id: "4",
    slug: "mern-stack-development-best-practices",
    title: "MERN Stack Development Best Practices",
    published: "2023-12-28",
    content:
      "Patterns for building scalable MERN applications, from API contracts to deployment hygiene, with a focus on maintainability and team velocity.",
    labels: ["MERN", "Node.js", "MongoDB"],
    coverImage:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&auto=format&fit=crop"
  }
];
