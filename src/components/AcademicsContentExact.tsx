import type { AcademicJourneyItem } from "@/types/content";

const academicsData = [
  {
    title: "Joining College",
    date: "November 2021",
    description:
      "Joined Sri C Achutha Menon Government College, Thrissur through second allotment under University of Calicut. The eco-friendly campus and vibrant atmosphere provided the perfect environment to explore academic interests."
  },
  {
    title: "TinkerHub GCT - Technical Lead",
    date: "2022 - 2023",
    description:
      "Working as Technical Lead for TinkerHub GCT, a campus chapter of TinkerHub. Guiding students in mastering cutting-edge technologies while enhancing teaching and leadership abilities."
  },
  {
    title: "Trebuchet Systems Internship",
    date: "July - September 2022",
    description:
      "Completed a two-month internship as Front End Developer at Trebuchet Systems, Kochi. Refined React.js skills by contributing to real-world projects."
  },
  {
    title: "Tech Fest Achievements",
    date: "2023",
    description:
      "Participated in several tech fests organized by colleges in Thrissur. Won prizes in multiple coding categories, boosting confidence and helping grow as a developer."
  },
  {
    title: "iGEN Event Coordinator",
    date: "March 2023",
    description:
      "Served as event coordinator for coding and debugging program. Developed a dedicated website for event registration, making the process seamless for participants."
  },
  {
    title: "Industrial Visit",
    date: "2023",
    description:
      "Visited Cybrosys Technologies in Calicut, an official Odoo partner. Gained insights into ERP solutions and interacted with senior IT professionals."
  },
  {
    title: "Final Year Project",
    date: "2024",
    description:
      "Built Tech Connect Hub - a web application connecting technical communities and event participants. Features role-based access control for Admin, Publisher, Verifier, and Participant."
  },
  {
    title: "Farewell",
    date: "2024",
    description:
      "Completed three years of B.Sc. Computer Science. Reflected on memories, friendships, and experiences that shaped academic and personal growth."
  }
];

export default function AcademicsContentExact({ journey }: { journey?: AcademicJourneyItem[] }) {
  const source = journey?.length ? journey : academicsData.map((item) => ({ title: item.title, date: item.date, description: item.description }));

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="bg-border absolute top-3 bottom-3 left-4 w-px md:left-1/2 md:-translate-x-1/2" />

      {source.map((item, index) => (
        <article key={index} className={`relative pb-7 last:pb-0 md:pb-10 ${index % 2 === 0 ? "md:flex md:flex-row" : "md:flex md:flex-row-reverse"}`}>
          <div className={`pl-14 pr-1 sm:pl-16 sm:pr-2 md:w-1/2 md:px-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
            <div className="glow-panel bg-secondary border-border rounded-2xl border px-4 py-4 shadow-sm sm:px-5 sm:py-5">
              <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.16em] text-accent uppercase sm:text-xs">
                {item.date}
              </span>
              <h3 className="text-neutral mt-3 text-base leading-snug font-semibold sm:text-lg">{item.title}</h3>
              <p className="text-tertiary-content mt-3 text-sm leading-7 sm:text-[0.95rem]">{item.description}</p>
            </div>
          </div>

          <div className="absolute top-4 left-4 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border border-accent/25 bg-secondary shadow-[0_0_0_6px_color-mix(in_oklab,var(--color-primary)_88%,transparent)] md:left-1/2">
            <div className="size-3 rounded-full bg-accent shadow-[0_0_18px_color-mix(in_oklab,var(--color-accent)_45%,transparent)]" />
          </div>
        </article>
      ))}
    </div>
  );
}
