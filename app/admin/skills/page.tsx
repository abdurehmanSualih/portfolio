import Link from "next/link";
import { getSkills } from "@/actions/skills";
import { FiPlus } from "react-icons/fi";
import SkillsTable from "@/components/admin/SkillsTable";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          Add Skill
        </Link>
      </div>

      <SkillsTable skills={skills} />
    </div>
  );
}
