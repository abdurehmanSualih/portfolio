import { getProjects } from "@/actions/projects";
import { getSkills } from "@/actions/skills";
import StatsCard from "@/components/admin/StatsCard";
import { FiFolderPlus, FiCode } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
        <StatsCard label="Total Projects" count={projects.length} icon={FiFolderPlus} />
        <StatsCard label="Total Skills" count={skills.length} icon={FiCode} />
      </div>
    </div>
  );
}
