import { useEffect, useState } from "react";
import { personalInfo } from "@/data/site";
import Ellipse from "@/components/Ellipse";
import type { HeroData } from "@/types/content";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

function useEncryptionRoleSwitcher(roles: string[]): string {
  const [displayText, setDisplayText] = useState(roles[0] || "");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let iteration = 0;
    let frameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const currentRole = roles[roleIndex];
    const nextRole = roles[(roleIndex + 1) % roles.length];
    const maxLength = Math.max(currentRole.length, nextRole.length);

    const animate = () => {
      const revealedChars = nextRole.slice(0, Math.floor(iteration));
      const hiddenChars = nextRole.slice(Math.floor(iteration));
      const scrambled = hiddenChars
        .split("")
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("");

      setDisplayText(revealedChars + scrambled);

      if (iteration < maxLength) {
        iteration += 0.2;
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayText(nextRole);
        timeoutId = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    };

    timeoutId = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [roleIndex]);

  return displayText;
}

export default function HeroExact({ hero }: { hero?: HeroData }) {
  const roles = hero?.roles?.length ? hero.roles : ["FULL STACK DEVELOPER", "Vibe Coder", "REACT NATIVE DEV", "TECHNICAL SEO"];
  const role = useEncryptionRoleSwitcher(roles);
  const title = hero?.title || `Hi - I'm ${personalInfo.name}`;
  const description = hero?.shortDescription || personalInfo.tagline;
  const image = hero?.image || "/assets/images/hero-image.png";
  const primaryButton = hero?.primaryButton || { label: "View Projects", href: "/project" };
  const secondaryButton = hero?.secondaryButton || { label: "View Blogs", href: "/blogs" };

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow flex min-h-[calc(100dvh-4rem)] flex-col justify-center bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 px-4 pt-8 pb-10 md:grid-cols-2 md:items-center lg:p-4">
        <div className="hero-reveal order-2 flex min-h-48 flex-col justify-between md:order-1 lg:min-h-56 lg:max-w-[33.75rem]">
          <h1>
            <span className="hero-reveal hero-delay-1 text-neutral mb-2 block text-3xl font-bold">
              {title}
            </span>
            <span className="hero-reveal hero-delay-2 text-accent block text-[1.75rem] font-bold">
              {role}
            </span>
          </h1>

          <h2 className="hero-reveal hero-delay-3 text-neutral mt-3">
            {description}
          </h2>

          <div className="hero-reveal hero-delay-4 mt-6 flex flex-wrap gap-6">
            <a
              href={primaryButton.href}
              aria-label={primaryButton.label}
              className="bg-accent min-w-32 cursor-pointer rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E] transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {primaryButton.label}
            </a>
            <a
              href={secondaryButton.href}
              aria-label={secondaryButton.label}
              className="text-neutral bg-secondary cursor-pointer rounded-lg px-[14px] py-[10px] text-sm transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {secondaryButton.label}
            </a>
          </div>
        </div>

        <div className="hero-visual-reveal order-1 flex min-h-[18.75rem] items-center justify-center md:order-2 lg:min-h-[35rem]">
          <div className="text-accent relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <img
              src={image}
              alt={`${personalInfo.name} - Full Stack Developer`}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              className="absolute inset-0 h-full w-full object-contain p-7"
            />
            <Ellipse className="hero-orbit absolute top-0 left-0 size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
