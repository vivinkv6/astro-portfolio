import { useEffect, useState } from "react";

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
  }, [roleIndex, roles]);

  return displayText;
}

export default function HeroRoleSwitcher({ roles }: { roles: string[] }) {
  const role = useEncryptionRoleSwitcher(roles);

  return <span className="hero-reveal hero-delay-2 text-accent block text-[1.75rem] font-bold">{role}</span>;
}
