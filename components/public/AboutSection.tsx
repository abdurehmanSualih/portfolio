import AnimatedSection from "@/components/ui/AnimatedSection";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiLaravel,
  SiFlutter,
} from "react-icons/si";

const techStack = [
  {
    category: "Frontend",
    items: [
      { icon: SiReact, label: "React", color: "text-cyan-400" },
      { icon: SiNextdotjs, label: "Next.js", color: "text-white" },
    ],
  },
  {
    category: "Backend",
    items: [
      { icon: SiNodedotjs, label: "Node.js", color: "text-green-400" },
      { icon: SiLaravel, label: "Laravel", color: "text-red-400" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { icon: SiFlutter, label: "Flutter", color: "text-sky-400" },
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-dark-surface py-24">
      <div className="mx-auto max-w-4xl px-6">
        <AnimatedSection>
          <h2 className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl">
            About{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          {/* Bio */}
          <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-relaxed text-gray-400 sm:text-lg">
            I&apos;m a passionate Full Stack &amp; Mobile App Developer with experience building
            modern, performant web and mobile applications. I love turning complex problems into
            clean, elegant solutions — from pixel-perfect UIs to robust backend APIs.
          </p>

          {/* Tech stack grid */}
          <div className="grid gap-8 sm:grid-cols-3">
            {techStack.map(({ category, items }) => (
              <div
                key={category}
                className="rounded-2xl border border-dark-border bg-dark-card p-6 text-center"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-400">
                  {category}
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {items.map(({ icon: Icon, label, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <Icon className={`text-3xl ${color}`} aria-hidden="true" />
                      <span className="text-xs text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
