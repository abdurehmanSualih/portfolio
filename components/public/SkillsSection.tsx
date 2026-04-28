import { getSkills } from "@/actions/skills";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SkillCategory } from "@prisma/client";
import { groupSkills, CATEGORY_ORDER } from "@/lib/groupSkills";
import SkillBadge from "./SkillBadge";

const categoryLabels: Record<SkillCategory, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  MOBILE: "Mobile",
  DATABASE: "Database",
};

export default async function SkillsSection() {
  const skills = await getSkills();

  // Group skills by category
  const grouped = groupSkills(skills);

  return (
    <section id="skills" className="bg-dark-bg py-24">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection>
          <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
            My{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {CATEGORY_ORDER.map((cat) => {
              const items = grouped[cat];
              if (items.length === 0) return null;
              return (
                <div
                  key={cat}
                  className="rounded-2xl border border-dark-border bg-dark-card p-6"
                >
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-400">
                    {categoryLabels[cat]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <SkillBadge key={skill.id} name={skill.name} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
