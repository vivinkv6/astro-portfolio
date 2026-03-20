import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { experiences } from "@/data/site";

type ExperienceSectionExactProps = {
  limit?: number;
  title?: string;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" }
  })
};

export default function ExperienceSectionExact({ limit, title = "Experience" }: ExperienceSectionExactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const displayExperiences = typeof limit === "number" ? experiences.slice(0, limit) : experiences;
  const showViewMore = typeof limit === "number" && experiences.length > limit;

  return (
    <section id="experience" className="overflow-hidden py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-neutral mb-12 text-3xl font-bold"
        >
          <span className="text-accent mr-2">//</span>
          {title}
        </motion.h2>

        <div ref={ref} className="space-y-8">
          {displayExperiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.01, y: -3 }}
              className="bg-secondary border-border group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="bg-accent absolute top-0 left-0 h-full w-1 -translate-x-full transform transition-transform duration-300 group-hover:translate-x-0" />
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-accent text-xl font-semibold transition-colors duration-300 group-hover:text-white">{exp.role}</h3>
                  <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-primary-content hover:text-accent inline-block text-lg transition-colors duration-300">
                    {exp.company}
                  </a>
                  <p className="text-tertiary-content mt-1 text-sm">{exp.date}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-tertiary-content hover:text-white flex items-start gap-3 text-sm leading-relaxed transition-colors duration-200">
                    <span className="bg-accent mt-2 block size-2 flex-shrink-0 rounded-full shadow-[0_0_10px_rgba(24,242,229,0.4)]" />
                    <span className="flex-1">{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {showViewMore ? (
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <a href="/experience" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all hover:translate-x-1 hover:text-accent/80">
              View More Experience →
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
