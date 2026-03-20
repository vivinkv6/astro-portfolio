import { AnimatePresence, motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { GithubIcon, PreviewIcon, CloseIcon } from "@/utils/icons";
import { getTechIcon } from "@/utils/techIcons";
import type { Project } from "@/types/content";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
  })
};

function ProjectCardExact({ data }: { data: Project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, shortDescription, longDescription, livePreview, githubLink, siteAge, type, cover, technologies } = data;

  return (
    <>
      <motion.div
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="group bg-secondary border-border flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
      >
        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="h-full w-full">
            <img src={cover} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </motion.div>
        </div>
        <div className="p-4">
          {type ? <span className="bg-accent/10 text-accent mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium">{type}</span> : null}
          <h3 className="text-neutral group-hover:text-white mb-2 line-clamp-2 text-lg font-semibold transition-colors duration-300">{title}</h3>
          <p className="text-tertiary-content mb-3 line-clamp-2 text-sm">{shortDescription}</p>
          {technologies?.length ? (
            <div className="mt-3 flex flex-wrap gap-x-1 gap-y-3">
              {technologies.slice(0, 5).map((tech) => {
                const TechIcon = getTechIcon(tech);
                return (
                  <span key={tech} title={tech}>
                    <TechIcon className="h-6 w-6 text-accent transition-colors hover:text-accent/80" />
                  </span>
                );
              })}
              {technologies.length > 5 ? <span className="text-tertiary-content flex items-center text-xs">+{technologies.length - 5}</span> : null}
            </div>
          ) : null}
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="bg-secondary border-border relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-primary/80 text-neutral hover:bg-accent hover:text-primary absolute top-4 right-4 z-20 rounded-full p-2 transition-colors"
              >
                <CloseIcon className="size-5" />
              </button>

              <div className="relative h-56 w-full">
                <img src={cover} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="from-secondary absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              </div>

              <div className="relative -mt-12 p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="text-neutral text-xl font-semibold">{title}</h3>
                  {type ? <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium">{type}</span> : null}
                </div>
                {siteAge ? <p className="text-tertiary-content mb-4 text-sm">{siteAge}</p> : null}
                <p className="text-neutral mb-5 leading-relaxed">{longDescription || shortDescription}</p>

                {technologies?.length ? (
                  <div className="mb-5">
                    <h4 className="text-neutral mb-3 text-sm font-semibold">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech) => {
                        const TechIcon = getTechIcon(tech);
                        return (
                          <div key={tech} className="group/tech flex flex-col items-center gap-1" title={tech}>
                            <div className="bg-accent/10 rounded-lg p-2 transition-colors group-hover/tech:bg-accent/20">
                              <TechIcon className="h-8 w-8 text-accent" />
                            </div>
                            <span className="text-tertiary-content max-w-[80px] truncate text-center text-xs">{tech}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <div className="border-border flex gap-4 border-t pt-4">
                  {livePreview ? (
                    <a href={livePreview} target="_blank" rel="noreferrer" className="bg-accent text-primary hover:bg-accent/90 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all hover:scale-105">
                      <PreviewIcon className="size-4" />
                      Live Demo
                    </a>
                  ) : null}
                  {githubLink ? (
                    <a href={githubLink} target="_blank" rel="noreferrer" className="border-border text-neutral hover:text-accent flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm transition-all hover:scale-105">
                      <GithubIcon className="size-4" />
                      Source Code
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default function ProjectSectionExact({ projects, title = "Latest Projects", limit }: { projects: Project[]; title?: string; limit?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const displayProjects = typeof limit === "number" ? projects.slice(0, limit) : projects;
  const showViewMore = typeof limit === "number" && projects.length > limit;

  return (
    <section id="projects" className="overflow-hidden py-12">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.h2 initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="text-neutral mb-8 text-2xl font-bold">
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
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <a href="/project" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:translate-x-1 hover:text-accent/80">
              View More Projects →
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
