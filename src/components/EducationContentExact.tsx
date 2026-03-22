import type { EducationItem } from "@/types/content";

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

export default function EducationContentExact({ items }: { items?: EducationItem[] }) {
  const source = items?.length
    ? items
    : educationData.map((item) => ({
        id: item.id,
        institution: item.name,
        location: item.location,
        title: item.course,
        period: item.year,
        description: item.course,
        link: item.link,
        logo: item.logo
      }));

  return (
    <div className="flex flex-col gap-6">
      {source.map((edu) => {
        const content = (
          <>
            <div className="text-accent text-5xl">
              {edu.logo ? <img src={edu.logo} alt={edu.institution} className="h-16 w-16 rounded-xl object-cover" /> : "🎓"}
            </div>
            <div>
              <h3 className="text-neutral group-hover:text-accent text-xl font-semibold transition-colors">{edu.institution}</h3>
              <p className="text-tertiary-content">{edu.location}</p>
              <p className="text-neutral mt-1">{edu.title}</p>
              <p className="text-tertiary-content mt-1 text-sm">{edu.period}</p>
            </div>
          </>
        );

        if (edu.link) {
          return (
            <a
              key={edu.id}
              href={edu.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary border-border group flex flex-col items-start gap-4 rounded-xl border p-6 transition-colors duration-300 hover:border-accent/50 md:flex-row md:items-center"
            >
              {content}
            </a>
          );
        }

        return (
          <div key={edu.id} className="bg-secondary border-border group flex flex-col items-start gap-4 rounded-xl border p-6 md:flex-row md:items-center">
            {content}
          </div>
        );
      })}
    </div>
  );
}
