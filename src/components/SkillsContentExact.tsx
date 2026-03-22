import { skillCategories } from "@/data/site";
import type { SkillCategory, SkillItem } from "@/types/content";

function SkillCardContent({ skill }: { skill: SkillItem }) {
  return (
    <>
      <div className="text-accent mb-3 text-4xl">
        {skill.icon ? <img src={skill.icon} alt={skill.name} className="size-12" /> : <span className="text-4xl font-bold">{skill.name.charAt(0)}</span>}
      </div>
      <p className="text-neutral text-sm font-medium">{skill.name}</p>
    </>
  );
}

function SkillCard({ skill }: { skill: SkillItem }) {
  const className = `bg-secondary border-border flex flex-col items-center justify-center rounded-xl border p-6 transition-colors duration-300 hover:border-accent/50 ${skill.websiteUrl ? "cursor-pointer" : ""}`;

  if (skill.websiteUrl) {
    return (
      <a href={skill.websiteUrl} target="_blank" rel="noreferrer noopener" aria-label={skill.name} className={className}>
        <SkillCardContent skill={skill} />
      </a>
    );
  }

  return (
    <div className={className}>
      <SkillCardContent skill={skill} />
    </div>
  );
}

export default function SkillsContentExact({ categories }: { categories?: SkillCategory[] }) {
  const source = categories?.length ? categories : skillCategories;

  return (
    <div className="space-y-16">
      {source.map((category) => (
        <div key={category.category}>
          <h3 className="text-neutral mb-8 text-xl font-semibold">
            <span className="text-accent mr-2">//</span>
            {category.category}
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {category.skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
