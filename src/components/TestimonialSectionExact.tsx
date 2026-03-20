import { useEffect, useRef, useState } from "react";
import { CloseIcon, StarIcon } from "@/utils/icons";
import { isInViewport } from "@/utils/viewport";
import type { Testimonial } from "@/types/content";

function TestimonialCardExact({
  testimonial,
  handleActiveCard
}: {
  testimonial: Testimonial;
  handleActiveCard: () => void;
}) {
  const { name, title, feedback, image, stars, createdAt } = testimonial;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (cardRef.current) observer = isInViewport(cardRef.current, handleActiveCard);
    return () => observer?.disconnect();
  }, [handleActiveCard]);

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setIsModalOpen(true)}
        className="bg-secondary border-border hover:border-accent/50 flex max-w-full shrink-0 cursor-pointer flex-col items-center justify-between gap-4 rounded-2xl border p-4 text-center transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 sm:max-w-[425px]"
      >
        <p className="text-neutral line-clamp-3 text-center leading-8 before:content-['\201C'] after:content-['\201D']">{feedback}</p>
        <div>
          <div className="mb-4 flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }, (_, idx) => (
              <StarIcon key={idx} className={idx < stars ? "text-tag" : "text-transparent"} />
            ))}
          </div>
          <div>
            <img src={image} alt={name} className="mx-auto h-[50px] w-[50px] rounded-full object-cover" />
            <p className="text-neutral text-lg font-semibold">{name}</p>
            <p className="text-neutral/60 text-sm">{title}</p>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-secondary border-border relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-primary/80 text-neutral hover:bg-accent hover:text-primary absolute top-4 right-4 z-20 rounded-full p-2 transition-colors"
            >
              <CloseIcon className="size-5" />
            </button>

            <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
              <img src={image} alt={name} className="h-full w-full object-cover" />
              <div className="from-secondary absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
            </div>

            <div className="relative -mt-12 p-6">
              <div className="mb-6 flex items-center gap-4">
                <img src={image} alt={name} className="h-16 w-16 rounded-full border-2 border-accent object-cover" />
                <div>
                  <h3 className="text-neutral text-xl font-semibold">{name}</h3>
                  <p className="text-neutral/60 text-sm">{title}</p>
                </div>
              </div>

              <div className="mb-6 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }, (_, idx) => (
                  <StarIcon key={idx} className={`size-6 ${idx < stars ? "text-tag" : "text-gray-600"}`} />
                ))}
              </div>

              <blockquote className="mb-6">
                <p className="text-neutral text-lg leading-relaxed before:content-['\201C'] after:content-['\201D']">{feedback}</p>
              </blockquote>

              {createdAt ? (
                <div className="border-border border-t pt-4">
                  <p className="text-neutral/60 text-sm">
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function TestimonialSectionExact({
  testimonials,
  isListingPage = false
}: {
  testimonials: Testimonial[];
  isListingPage?: boolean;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const limit = isListingPage ? undefined : 3;
  const displayTestimonials = limit ? testimonials.slice(0, limit) : testimonials;
  const showViewMore = !isListingPage && testimonials.length > (limit || 0);

  return (
    <section id="testimonials" className="mx-auto max-w-[1200px] px-4 py-16">
      {!isListingPage ? (
        <div className="lg:max-w-[50dvw]">
          <h2 className="text-primary-content text-2xl font-bold tracking-wider">// Testimonials</h2>
          <p className="text-tertiary-content mt-5 text-lg text-pretty">
            Don&apos;t just take the visuals for granted - these sections are meant to carry the same mood, interaction, and rhythm as the original portfolio.
          </p>
        </div>
      ) : null}

      {isListingPage ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayTestimonials.map((testimonial, idx) => (
            <TestimonialCardExact key={idx} testimonial={testimonial} handleActiveCard={() => setActiveCard(idx)} />
          ))}
        </div>
      ) : (
        <>
          <div className="hide-scrollbar my-8 flex gap-8 overflow-x-auto">
            {displayTestimonials.map((testimonial, idx) => (
              <TestimonialCardExact key={idx} testimonial={testimonial} handleActiveCard={() => setActiveCard(idx)} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 sm:hidden">
            {displayTestimonials.map((_, idx) => (
              <div key={idx} className={`${idx === activeCard ? "bg-accent size-[12px]" : "size-[10px] bg-white/50"} rounded-full`} />
            ))}
          </div>

          {showViewMore ? (
            <div className="mt-8 text-center">
              <a href="/testimonials" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80">
                View More Testimonials
              </a>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
