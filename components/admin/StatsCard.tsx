import { IconType } from "react-icons";

interface StatsCardProps {
  label: string;
  count: number;
  icon: IconType;
}

export default function StatsCard({ label, count, icon: Icon }: StatsCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-5">
      <div className="p-3 bg-indigo-600/20 rounded-xl">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div>
        <p className="text-3xl font-bold text-white">{count}</p>
        <p className="text-sm text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
