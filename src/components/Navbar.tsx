import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Academics", href: "/academics" },
  { label: "Experience", href: "/experience" },
  { label: "Project", href: "/project" },
  { label: "Skills", href: "/skills" },
  { label: "Blogs", href: "/blogs" }
];

function LogoMark() {
  return (
    <svg width="28" height="24" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M29.2323 29.9192C30.0404 29.9192 30.8283 29.5354 31.3333 28.9091L39.2121 18.8687C40.2626 17.5151 40.2626 15.6364 39.2121 14.2828L31.3333 4.24242C30.8283 3.59596 30.0606 3.23232 29.2323 3.23232H26.5455L25.0101 6.92929H26.9697C27.5556 6.92929 28.1212 7.19192 28.4848 7.65656L34.1818 14.9293C34.9495 15.899 34.9495 17.2727 34.1818 18.2424L28.4848 25.5151C28.1212 25.9798 27.5556 26.2424 26.9697 26.2424H15.697L14.1414 29.9192H29.2323Z" fill="url(#n0)" />
      <path d="M10.7677 0C9.9596 0 9.17172 0.383838 8.66667 1.0101L0.787879 11.0505C-0.262626 12.404 -0.262626 14.2828 0.787879 15.6364L8.66667 25.6768C9.17172 26.3232 9.93939 26.6869 10.7677 26.6869H13.4545L14.9899 22.9899H13.0303C12.4444 22.9899 11.8788 22.7273 11.5152 22.2626L5.81818 14.9899C5.0505 14.0202 5.0505 12.6465 5.81818 11.6768L11.5152 4.40404C11.8788 3.93939 12.4444 3.67677 13.0303 3.67677H24.303L25.8586 0H10.7677Z" fill="url(#n1)" />
      <defs>
        <linearGradient id="n0" x1="41" y1="16.5" x2="21" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--gradient-start)" />
          <stop offset="1" stopColor="var(--gradient-mid)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="n1" x1="-1" y1="13.3" x2="18" y2="13.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--gradient-start)" />
          <stop offset="1" stopColor="var(--gradient-mid)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar({ pathname }: { pathname: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <nav className="border-border bg-primary sticky top-0 z-40 h-16 border-b backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="text-primary-content font-semibold whitespace-nowrap">Vivin KV</span>
        </a>

        <button
          type="button"
          className="text-primary-content md:hidden"
          onClick={() => setIsVisible((value) => !value)}
          aria-expanded={isVisible}
          aria-label="Toggle navigation"
        >
          {isVisible ? "Close" : "Menu"}
        </button>

        <ul
          className={`${isVisible ? "flex" : "hidden"} bg-primary absolute inset-x-0 top-16 z-40 min-h-[calc(100dvh-4rem)] flex-col md:static md:flex md:min-h-0 md:flex-row md:items-center md:gap-6`}
        >
          {navItems.map((item) => (
            <li key={item.href} className="border-border border-b px-6 py-4 md:border-none md:px-0 md:py-0">
              <a
                href={item.href}
                onClick={() => setIsVisible(false)}
                className={`${pathname === item.href ? "text-neutral" : "text-primary-content"} hover:text-neutral block`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
