export const dynamic = "force-dynamic";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { getSkills } from "@/actions/skills";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const skills = await getSkills();
  const skillOptions = skills.map((s) => ({ value: s.id, label: s.name }));

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
        Back to Projects
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Add Project</h1>
      <ProjectForm skillOptions={skillOptions} />
    </div>
  );
}
