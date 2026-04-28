import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import SkillForm from "@/components/admin/SkillForm";

export default function NewSkillPage() {
  return (
    <div>
      <Link
        href="/admin/skills"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
        Back to Skills
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Add Skill</h1>
      <SkillForm />
    </div>
  );
}
