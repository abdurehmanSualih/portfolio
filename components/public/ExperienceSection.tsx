import AnimatedSection from "@/components/ui/AnimatedSection";
import { FaGraduationCap, FaBriefcase, FaLaptopCode } from "react-icons/fa";

type TimelineEntry = {
  icon: React.ElementType;
  iconColor: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
};

const timeline: TimelineEntry[] = [
  {
    icon: FaGraduationCap,
    iconColor: "text-primary-400",
    period: "2020 – 2024",
    title: "Bachelor's in Computer Science",
    subtitle: "University Name",
    description:
      "Studied software engineering, algorithms, databases, and mobile development. Graduated with honors.",
  },
  {
    icon: FaLaptopCode,
    iconColor: "text-accent-400",
    period: "2022 – Present",
    title: "Open Source & Personal Projects",
    subtitle: "Self-directed",
    description:
      "Built and shipped multiple full-stack web and mobile applications using Next.js, Laravel, and Flutter. Contributed to open-source projects on GitHub.",
  },
  {
    icon: FaBriefcase,
    iconColor: "text-sky-400",
    period: "2023 – Present",
    title: "Freelance Developer",
    subtitle: "Remote",
    description:
      "Delivered web and mobile solutions for clients across various industries. Specialized in Next.js frontends, Node.js/Laravel APIs, and Flutter mobile apps.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-dark-surface py-24">
      <div className="mx-auto max-w-3xl px-6">
        <AnimatedSection>
          <h2 className="mb-14 text-center text-3xl font-bold text-white sm:text-4xl">
            Experience &amp;{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          {/* Timeline */}
          <ol className="relative border-l border-dark-border">
            {timeline.map(({ icon: Icon, iconColor, period, title, subtitle, description }, idx) => (
              <li key={idx} className="mb-10 ml-6 last:mb-0">
                {/* Dot */}
                <span
                  className={`absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border border-dark-border bg-dark-card ${iconColor}`}
                  aria-hidden="true"
                >
                  <Icon className="text-xs" />
                </span>

                <div className="rounded-2xl border border-dark-border bg-dark-card p-5">
                  <time className="mb-1 block text-xs font-medium text-gray-500">{period}</time>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mb-2 text-sm text-primary-400">{subtitle}</p>
                  <p className="text-sm leading-relaxed text-gray-400">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </AnimatedSection>
      </div>
    </section>
  );
}
