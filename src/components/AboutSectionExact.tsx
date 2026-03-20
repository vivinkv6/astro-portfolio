import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function AboutSectionExact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-secondary overflow-hidden py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-neutral mb-8 text-3xl font-bold"
        >
          <span className="text-accent mr-2">//</span>
          About Me
        </motion.h2>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-2"
        >
          <motion.div variants={fadeInUp} className="order-2 space-y-6 text-lg leading-relaxed text-neutral md:order-1">
            <motion.p variants={fadeInUp} className="hover:text-white">
              I&apos;m a Full Stack Developer at SpiderWorks Technologies, working with Next.js, NestJS, PostgreSQL, and Strapi to build production-ready web applications and internal tools.
            </motion.p>
            <motion.p variants={fadeInUp} className="hover:text-white">
              I actively explore AI-powered development and use AI tools in my daily workflow to improve productivity, learn faster, and prototype ideas quickly.
            </motion.p>
            <motion.p variants={fadeInUp} className="hover:text-white">
              Beyond development, I&apos;m interested in technical SEO, system optimization, and modern deployment strategies, including self-hosted platforms like Coolify.
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className="order-1 flex flex-col items-center gap-6 md:order-2">
            <motion.div className="relative aspect-square w-full max-w-sm" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <img
                src="/assets/images/profile-image.png"
                alt="Vivin KV - Profile"
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-lg object-contain"
              />
            </motion.div>

            <motion.div variants={staggerContainer} className="grid w-full max-w-sm grid-cols-2 gap-4">
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }} className="bg-primary border-border rounded-lg p-4 text-center">
                <h3 className="text-accent text-3xl font-bold">2+</h3>
                <p className="text-tertiary-content text-sm">Years Experience</p>
              </motion.div>
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }} className="bg-primary border-border rounded-lg p-4 text-center">
                <h3 className="text-accent text-3xl font-bold">10+</h3>
                <p className="text-tertiary-content text-sm">Projects Completed</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
