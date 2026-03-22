import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import type { Project, ProjectTechnology } from "@/types/content";

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
  })
};

function byPriority(projects: Project[]) {
  return [...projects].sort((left, right) => {
    const priorityDiff = left.priority - right.priority;
    if (priorityDiff !== 0) return priorityDiff;

    return +new Date(right.createdAt || 0) - +new Date(left.createdAt || 0);
  });
}

function SkillIcons({ technologies }: { technologies?: ProjectTechnology[] }) {
  if (!technologies?.length) return null;

  return (
    <div className="mb-3 flex flex-wrap gap-x-1 gap-y-2">
      {technologies.map((tech) => (
        <span
          key={tech.name}
          title={tech.name}
          className="bg-primary/60 inline-flex h-9 w-9 items-center justify-center rounded-lg p-1.5 shadow-sm backdrop-blur-sm"
        >
          {tech.icon ? <img src={tech.icon} alt={tech.name} className="h-full w-full object-contain" /> : <span className="text-accent text-xs font-semibold">{tech.name.charAt(0)}</span>}
        </span>
      ))}
    </div>
  );
}

function ProjectCardExact({ data }: { data: Project }) {
  const { title, shortDescription, siteAge, cover, technologies } = data;

  return (
    <motion.article
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-secondary border-border flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
    >
      <a href={`/project/${data.slug}`} className="block">
        <div className="bg-primary/40 border-border flex aspect-[16/10] w-full flex-shrink-0 items-center justify-center overflow-hidden border-b p-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="flex h-full w-full items-center justify-center">
            <img src={cover} alt={title} loading="lazy" decoding="async" className="h-full w-full object-contain" />
          </motion.div>
        </div>
      </a>

      <div className="flex h-full flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-neutral group-hover:text-white mb-2 line-clamp-2 text-lg font-semibold transition-colors duration-300">{title}</h3>
            <SkillIcons technologies={technologies} />
          </div>
          {siteAge ? <span className="pill text-tertiary-content shrink-0 text-xs">{siteAge}</span> : null}
        </div>

        <p className="text-tertiary-content line-clamp-2 text-sm">{shortDescription}</p>

        <div className="mt-auto pt-4">
          <a href={`/project/${data.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:translate-x-1 hover:text-accent/80">
            View details
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectSectionExact({ projects, title = "Latest Projects", limit }: { projects: Project[]; title?: string; limit?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const orderedProjects = byPriority(projects);
  const displayProjects = typeof limit === "number" ? orderedProjects.slice(0, limit) : orderedProjects;
  const showViewMore = typeof limit === "number" && projects.length > limit;

  return (
    <section id="projects" className="overflow-hidden py-12">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.h2 initial={{ opacity: 1, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="text-neutral mb-8 text-2xl font-bold">
          <span className="text-accent mr-2">//</span>
          {title}
        </motion.h2>

        <motion.div ref={ref} className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, i) => (
            <motion.div key={project.slug} custom={i} variants={cardVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              <ProjectCardExact data={project} />
            </motion.div>
          ))}
        </motion.div>

        {showViewMore ? (
          <motion.div initial={{ opacity: 1 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <a href="/project" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:translate-x-1 hover:text-accent/80">
              View More Projects
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
