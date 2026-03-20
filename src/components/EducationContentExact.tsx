import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const educationData = [
  {
    id: 1,
    name: "Sri C Achutha Menon Government College",
    location: "Thrissur, Kerala",
    course: "BSc Computer Science",
    year: "2021 - 2024",
    link: "https://govtcollegethrissur.ac.in/",
    logo: "🎓"
  },
  {
    id: 2,
    name: "CNN Higher Secondary School",
    location: "Thrissur, Kerala",
    course: "Commerce",
    year: "2019 - 2021",
    link: "https://www.facebook.com/p/CNN-Higher-Secondary-Schoolcherpu-100066789380754/",
    logo: "📚"
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" }
  })
};

export default function EducationContentExact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div ref={ref} className="flex flex-col gap-6">
      {educationData.map((edu, index) => (
        <motion.a
          key={edu.id}
          href={edu.link}
          target="_blank"
          rel="noopener noreferrer"
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ scale: 1.01, y: -3 }}
          className="bg-secondary border-border group flex flex-col items-start gap-4 rounded-xl border p-6 transition-all duration-300 hover:border-accent/50 md:flex-row md:items-center"
        >
          <div className="text-accent text-5xl">{edu.logo}</div>
          <div>
            <h3 className="text-neutral group-hover:text-accent text-xl font-semibold transition-colors">{edu.name}</h3>
            <p className="text-tertiary-content">{edu.location}</p>
            <p className="text-neutral mt-1">{edu.course}</p>
            <p className="text-tertiary-content mt-1 text-sm">{edu.year}</p>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}
