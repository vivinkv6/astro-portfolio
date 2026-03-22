import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import type { AboutPageData } from "@/types/content";

const fadeInUp: Variants = {
  hidden: { opacity: 1, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutSectionExact({ about }: { about?: AboutPageData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const content =
    about?.content?.length
      ? about.content
      : [
          "I'm a Full Stack Developer at SpiderWorks Technologies, working with Next.js, NestJS, PostgreSQL, and Strapi to build production-ready web applications and internal tools.",
          "I actively explore AI-powered development and use AI tools in my daily workflow to improve productivity, learn faster, and prototype ideas quickly.",
          "Beyond development, I'm interested in technical SEO, system optimization, and modern deployment strategies, including self-hosted platforms like Coolify."
        ];
  const stats =
    about?.stats?.length
      ? about.stats
      : [
          { count: "2+", shortTitle: "Years Experience" },
          { count: "10+", shortTitle: "Projects Completed" }
        ];

  return (
    <section id="about" className="bg-secondary overflow-hidden py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.h2
          initial={{ opacity: 1, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-neutral mb-8 text-3xl font-bold"
        >
          <span className="text-accent mr-2">//</span>
          {about?.pageHeading || "About Me"}
        </motion.h2>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2"
        >
          <motion.div variants={fadeInUp} className="order-2 space-y-6 text-lg leading-relaxed text-neutral md:order-1">
            {content.map((paragraph) => (
              <motion.p key={paragraph} variants={fadeInUp} className="hover:text-white">
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="order-1 flex flex-col items-center gap-6 md:order-2">
            <motion.div className="relative aspect-square w-full max-w-sm" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <img
                src={about?.image || "/assets/images/profile-image.png"}
                alt="Vivin KV - Profile"
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-lg object-contain"
              />
            </motion.div>

            <motion.div variants={staggerContainer} className="grid w-full max-w-sm grid-cols-2 gap-4">
              {stats.slice(0, 2).map((item) => (
                <motion.div key={item.shortTitle} variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }} className="bg-primary border-border rounded-lg p-4 text-center">
                  <h3 className="text-accent text-3xl font-bold">{item.count}</h3>
                  <p className="text-tertiary-content text-sm">{item.shortTitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
