import { useEffect, useRef, useState } from "react";
import { themes } from "@/data/site";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

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
    <div ref={ref} className="fixed right-6 bottom-5 z-50 md:right-10 md:bottom-10">
      <button type="button" onClick={() => setOpen((value) => !value)} className="bg-neutral rounded-full p-1.5" aria-label="Choose theme">
        <div className="bg-primary grid grid-cols-2 gap-1 rounded-full p-2">
          <span className="h-2.5 w-2.5 rounded-t-full rounded-bl-full bg-[#B13753]" />
          <span className="h-2.5 w-2.5 rounded-t-full rounded-br-full bg-[#BAA32B]" />
          <span className="h-2.5 w-2.5 rounded-tl-full rounded-b-full bg-[#3178C6]" />
          <span className="h-2.5 w-2.5 rounded-tr-full rounded-b-full bg-[#50B359]" />
        </div>
      </button>

      {open ? (
        <div className="bg-secondary border-border absolute right-0 bottom-16 min-w-56 space-y-3 rounded-xl border p-4">
          <div className="text-primary-content border-border flex items-center justify-between border-b pb-3">
            <span>_select-theme</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close theme picker">
              x
            </button>
          </div>
          {themes.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => changeTheme(item.name)}
              className="flex w-full items-center justify-between rounded-xl p-3 text-left"
              style={{ background: item.colors[0], color: item.colors[1] }}
            >
              <span>{theme === item.name ? `✓ ${item.label}` : item.label}</span>
              <span className="flex gap-1">
                {item.colors.slice(1).map((color) => (
                  <span key={`${item.name}-${color}`} className="h-3 w-3 rounded-full" style={{ background: color }} />
                ))}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
