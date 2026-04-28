"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SkillCategory } from "@prisma/client";
import { createSkill, updateSkill } from "@/actions/skills";

const SkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.nativeEnum(SkillCategory, { errorMap: () => ({ message: "Category is required" }) }),
});

type SkillFormValues = z.infer<typeof SkillSchema>;

const CATEGORY_OPTIONS: { value: SkillCategory; label: string }[] = [
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "MOBILE", label: "Mobile" },
  { value: "DATABASE", label: "Database" },
];

interface SkillFormProps {
  skillId?: string;
  defaultValues?: Partial<SkillFormValues>;
}

export default function SkillForm({ skillId, defaultValues }: SkillFormProps) {
  const router = useRouter();
  const isEdit = Boolean(skillId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(SkillSchema),
    defaultValues,
  });

  async function onSubmit(data: SkillFormValues) {
    const result = isEdit
      ? await updateSkill(skillId!, data)
      : await createSkill(data);

    if (result.success) {
      toast.success(isEdit ? "Skill updated" : "Skill created");
      router.push("/admin/skills");
      router.refresh();
    } else {
      toast.error(result.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="e.g. React"
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Category
        </label>
        <select
          {...register("category")}
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        >
          <option value="">Select a category</option>
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1.5 text-sm text-red-400">{errors.category.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {isSubmitting ? "Saving…" : isEdit ? "Update Skill" : "Create Skill"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/skills")}
          className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
