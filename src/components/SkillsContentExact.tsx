import { motion, type Variants } from "framer-motion";
import { skillCategories } from "@/data/site";

const skillCardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" }
  })
};

function SkillCard({ skill, index }: { skill: { name: string; icon?: string }; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={skillCardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-secondary border-border flex flex-col items-center justify-center rounded-xl border p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
    >
      <div className="text-accent mb-3 text-4xl">
        {skill.icon ? <img src={skill.icon} alt={skill.name} className="size-12" /> : <span className="text-4xl font-bold">{skill.name.charAt(0)}</span>}
      </div>
      <p className="text-neutral text-sm font-medium">{skill.name}</p>
    </motion.div>
  );
}

export default function SkillsContentExact() {
  return (
    <div className="space-y-16">
      {skillCategories.map((category) => (
        <div key={category.category}>
          <h3 className="text-neutral mb-8 text-xl font-semibold">
            <span className="text-accent mr-2">//</span>
            {category.category}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {category.skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
