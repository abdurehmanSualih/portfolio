"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiExternalLink, FiGithub } from "react-icons/fi";
import { deleteProject } from "@/actions/projects";
import { ProjectWithSkills } from "@/actions/projects";

const TYPE_LABELS: Record<string, string> = {
  WEB: "Web",
  MOBILE: "Mobile",
  FULLSTACK: "Fullstack",
};

const TYPE_COLORS: Record<string, string> = {
  WEB: "bg-blue-600/20 text-blue-400",
  MOBILE: "bg-green-600/20 text-green-400",
  FULLSTACK: "bg-purple-600/20 text-purple-400",
};

interface ProjectsTableProps {
  projects: ProjectWithSkills[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const result = await deleteProject(id);
    setDeletingId(null);
    if (result.success) {
      toast.success("Project deleted");
      router.refresh();
    } else {
      toast.error(result.error ?? "Failed to delete project");
    }
  }

  if (projects.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
        No projects yet. Add your first project.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400 text-left">
            <th className="px-6 py-4 font-medium">Project</th>
            <th className="px-6 py-4 font-medium">Type</th>
            <th className="px-6 py-4 font-medium">Skills</th>
            <th className="px-6 py-4 font-medium">Links</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {project.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-white font-medium">{project.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1 max-w-xs">
                      {project.description}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    TYPE_COLORS[project.projectType] ?? "bg-gray-700 text-gray-300"
                  }`}
                >
                  {TYPE_LABELS[project.projectType] ?? project.projectType}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                  {project.skills.slice(0, 3).map(({ skill }) => (
                    <span
                      key={skill.id}
                      className="px-2 py-0.5 bg-gray-800 text-gray-400 rounded text-xs"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-800 text-gray-500 rounded text-xs">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-500 hover:text-white transition-colors"
                      title="GitHub"
                    >
                      <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-500 hover:text-white transition-colors"
                      title="Demo"
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deletingId === project.id}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
