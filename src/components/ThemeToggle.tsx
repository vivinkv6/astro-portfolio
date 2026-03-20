import { useEffect, useRef, useState } from "react";
import type { ThemeOption } from "@/types/content";
import { CheckIcon, CloseIcon } from "@/utils/icons";

type ThemeToggleProps = {
  themes: ThemeOption[];
  defaultTheme?: string;
};

export default function ThemeToggle({ themes, defaultTheme = "dark" }: ThemeToggleProps) {
  const [theme, setTheme] = useState(defaultTheme);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") || defaultTheme;
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, [defaultTheme]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function changeTheme(nextTheme: string) {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    setOpen(false);
  }

  return (
    <div ref={ref} className="fixed right-6 bottom-4 z-50 md:right-11 md:bottom-11">
      <div onClick={() => setOpen((value) => !value)} className="bg-neutral cursor-pointer rounded-full p-1.5 md:p-2" aria-label="Choose theme" role="button" tabIndex={0}>
        <div className="bg-primary grid grid-cols-2 place-content-center gap-0.5 rounded-full p-1.5 md:p-2">
          <div className="size-[7px] rounded-t-full rounded-bl-full bg-[#B13753] md:size-[10px]" />
          <div className="size-[7px] rounded-t-full rounded-br-full bg-[#BAA32B] md:size-[10px]" />
          <div className="size-[7px] rounded-tl-full rounded-b-full bg-[#3178C6] md:size-[10px]" />
          <div className="size-[7px] rounded-tr-full rounded-b-full bg-[#50B359] md:size-[10px]" />
        </div>
      </div>

      {open ? (
        <div className="bg-secondary animate-fade-in border-border absolute right-0 bottom-full mb-5 space-y-3 rounded-xl border p-3 md:space-y-4 md:p-5">
          <div className="text-primary-content border-border flex items-center justify-between border-b pb-3 md:pb-4">
            <span className="text-sm md:text-base">_select-theme</span>
            <CloseIcon onClick={() => setOpen(false)} className="h-3 w-3 cursor-pointer md:h-4 md:w-4" />
          </div>
          {themes.map((item) => (
            <div
              key={item.name}
              onClick={() => changeTheme(item.name)}
              className="flex min-w-48 cursor-pointer items-center justify-between rounded-lg p-2 md:min-w-60 md:rounded-xl md:p-4"
              style={{ background: item.colors[0], color: item.colors[1] }}
            >
              <div className="flex items-end gap-1.5">
                <CheckIcon className={item.name === theme ? "block" : "hidden"} />
                <span className="text-sm md:text-base">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.colors.slice(1).map((color) => (
                  <div key={`${item.name}-${color}`} className="size-2 rounded-full md:size-3" style={{ background: color }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
