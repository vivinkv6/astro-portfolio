import { useEffect, useState } from "react";
import { personalInfo } from "@/data/site";

const roles = ["FULL STACK DEVELOPER", "Vibe Coder", "REACT NATIVE DEV", "TECHNICAL SEO"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero-glow min-h-[calc(100dvh-4rem)] bg-primary">
      <div className="section-shell grid min-h-[calc(100dvh-4rem)] grid-cols-1 items-center gap-8 py-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="text-neutral mb-3 text-3xl font-bold">Hi - I&apos;m {personalInfo.name}</p>
          <h1 className="text-accent text-[1.75rem] font-bold md:text-[2rem]">{roles[index]}</h1>
          <p className="text-primary-content mt-4 max-w-2xl leading-8">{personalInfo.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="/project" className="bg-accent rounded-lg px-[14px] py-[10px] text-sm font-medium text-[#00071E]">
              View Projects
            </a>
            <a href="/blogs" className="bg-secondary text-neutral rounded-lg px-[14px] py-[10px] text-sm">
              View Blogs
            </a>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="relative h-72 w-72 md:h-[25.75rem] md:w-[25.75rem]">
            <div className="absolute inset-0 rounded-full border border-[color:var(--color-border)] opacity-70" />
            <div className="absolute inset-3 rounded-full border border-[color:var(--color-accent)]/40" />
            <div className="absolute inset-6 rounded-full border border-[color:var(--color-neutral)]/15" />
            <img
              src="/assets/images/hero-image.png"
              alt={`${personalInfo.name} - Full Stack Developer`}
              className="absolute inset-0 h-full w-full object-contain p-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
