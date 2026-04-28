export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { getProjectById } from "@/actions/projects";
import { getSkills } from "@/actions/skills";
import ProjectForm from "@/components/admin/ProjectForm";

interface EditProjectPageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const [project, skills] = await Promise.all([
    getProjectById(params.id),
    getSkills(),
  ]);

  if (!project) notFound();

  const skillOptions = skills.map((s) => ({ value: s.id, label: s.name }));
  const skillIds = project.skills.map(({ skill }) => skill.id);

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
        Back to Projects
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Edit Project</h1>
      <ProjectForm
        projectId={project.id}
        skillOptions={skillOptions}
        defaultValues={{
          title: project.title,
          description: project.description,
          projectType: project.projectType,
          githubUrl: project.githubUrl ?? "",
          demoUrl: project.demoUrl ?? "",
          imageUrl: project.imageUrl ?? "",
          skillIds,
        }}
      />
    </div>
  );
}
