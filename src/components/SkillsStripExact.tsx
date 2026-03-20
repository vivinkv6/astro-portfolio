import { motion } from "framer-motion";
import MarqueeWrapper from "@/components/MarqueeWrapper";
import type { SkillItem } from "@/types/content";

type SkillsProps = {
  skills: SkillItem[];
  className?: string;
};

export default function SkillsStripExact({ skills, className = "py-8" }: SkillsProps) {
  return (
    <section id="skills" className={`overflow-hidden ${className}`}>
      <MarqueeWrapper className="from-primary to-primary via-marquee bg-linear-to-r" durationMs={32000}>
        <div className="flex gap-8 lg:gap-24">
          {skills.map(({ name, icon }, index) => (
            <motion.span key={index} whileHover={{ scale: 1.1 }} className="font-inter text-primary-content flex cursor-default items-center text-xs lg:text-base">
              {icon ? <img src={icon} alt={name} className="mx-2 size-11 lg:size-14" /> : null}
              {name}
            </motion.span>
          ))}
        </div>
      </MarqueeWrapper>
    </section>
  );
}
