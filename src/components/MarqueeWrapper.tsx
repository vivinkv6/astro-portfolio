import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type MarqueeWrapperProps = {
  children: ReactNode;
  className?: string;
};

const marqueeAnimation = (element: HTMLElement, elementWidth: number, windowWidth: number) => {
  return element.animate([{ transform: "translateX(0)" }, { transform: `translateX(${windowWidth - elementWidth}px)` }], {
    duration: 20000,
    easing: "linear",
    direction: "alternate",
    iterations: Infinity
  });
};

export default function MarqueeWrapper({ children, className = "" }: MarqueeWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animation: Animation | null = null;
    const runAnimation = () => {
      animation?.cancel();
      const elementWidth = element.getBoundingClientRect().width;
      animation = marqueeAnimation(element, elementWidth, window.innerWidth);
    };

    runAnimation();
    const handleResize = () => runAnimation();
    window.addEventListener("resize", handleResize);
    return () => {
      animation?.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative overflow-x-hidden ${className}`}>
      <div className="inter w-max whitespace-nowrap p-5 lg:p-7" ref={elementRef}>
        {children}
      </div>
    </div>
  );
}
