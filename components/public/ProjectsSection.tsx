import { getProjects } from "@/actions/projects";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsSection() {
  const projects = await getProjects();

  return (
    <section id="projects" className="bg-dark-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <h2 className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl">
            My{" "}
            <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </AnimatedSection>

        <ProjectsClient projects={projects} />
      </div>
    </section>
  );
}
