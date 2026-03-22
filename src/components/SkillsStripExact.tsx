import type { SkillItem } from "@/types/content";

type SkillsProps = {
  skills: SkillItem[];
  className?: string;
};

export default function SkillsStripExact({ skills, className = "py-8" }: SkillsProps) {
  const repeatedSkills = [...skills, ...skills];

  return (
    <section id="skills" className={`overflow-hidden ${className}`}>
      <div className="from-primary to-primary via-marquee bg-linear-to-r skills-marquee-shell">
        <div className="skills-marquee-track">
          {repeatedSkills.map(({ name, icon }, index) => (
            <span key={`${name}-${index}`} className="skills-marquee-item font-inter text-primary-content flex cursor-default items-center text-xs lg:text-base">
              {icon ? <img src={icon} alt={name} className="mx-2 size-11 lg:size-14" loading="lazy" decoding="async" /> : null}
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
