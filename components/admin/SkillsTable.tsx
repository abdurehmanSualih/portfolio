"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteSkill } from "@/actions/skills";
import { Skill } from "@prisma/client";

interface SkillsTableProps {
  skills: Skill[];
}

const CATEGORY_LABELS: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  MOBILE: "Mobile",
  DATABASE: "Database",
};

export default function SkillsTable({ skills }: SkillsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const result = await deleteSkill(id);
    setDeletingId(null);
    if (result.success) {
      toast.success("Skill deleted");
      router.refresh();
    } else {
      toast.error(result.error ?? "Failed to delete skill");
    }
  }

  if (skills.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center text-gray-500">
        No skills yet. Add your first skill.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400 text-left">
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Category</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr
              key={skill.id}
              className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-6 py-4 text-white font-medium">{skill.name}</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-medium">
                  {CATEGORY_LABELS[skill.category] ?? skill.category}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/skills/${skill.id}/edit`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(skill.id, skill.name)}
                    disabled={deletingId === skill.id}
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
