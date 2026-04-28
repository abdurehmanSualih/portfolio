import Link from "next/link";
import { getProjects } from "@/actions/projects";
import { FiPlus } from "react-icons/fi";
import ProjectsTable from "@/components/admin/ProjectsTable";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
