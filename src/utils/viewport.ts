export function isInViewport(element: HTMLElement, callback: () => void, threshold = 0.4) {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) callback();
    },
    { threshold }
  );

  observer.observe(element);
  return observer;
}
