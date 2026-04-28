import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { getSkillById } from "@/actions/skills";
import SkillForm from "@/components/admin/SkillForm";

interface EditSkillPageProps {
  params: { id: string };
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const skill = await getSkillById(params.id);
  if (!skill) notFound();

  return (
    <div>
      <Link
        href="/admin/skills"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <FiChevronLeft className="w-4 h-4" />
        Back to Skills
      </Link>
      <h1 className="text-2xl font-bold text-white mb-8">Edit Skill</h1>
      <SkillForm
        skillId={skill.id}
        defaultValues={{ name: skill.name, category: skill.category }}
      />
    </div>
  );
}
