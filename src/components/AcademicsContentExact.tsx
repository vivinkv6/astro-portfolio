import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
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

const cardVariants: Variants = {
  hidden: { opacity: 1, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
  })
};

export default function AcademicsContentExact({ journey }: { journey?: AcademicJourneyItem[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const source = journey?.length ? journey : academicsData.map((item) => ({ title: item.title, date: item.date, description: item.description }));

  return (
    <div ref={ref} className="relative">
      <div className="bg-border absolute top-0 left-4 h-full w-0.5 md:left-1/2" />

      {source.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`relative mb-8 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
          <div className={`ml-12 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
            <motion.div whileHover={{ scale: 1.02 }} className="bg-secondary border-border rounded-xl border p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <span className="text-accent text-sm">{item.date}</span>
              <h3 className="text-neutral mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="text-tertiary-content mt-3 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          </div>
          <div className="bg-accent absolute top-5 left-4 flex size-8 items-center justify-center rounded-full md:left-1/2 md:-translate-x-1/2">
            <div className="bg-primary size-3 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
