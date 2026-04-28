"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import { CldUploadWidget } from "next-cloudinary";
import { ProjectType } from "@prisma/client";
import { createProject, updateProject } from "@/actions/projects";
import { FiUploadCloud, FiX } from "react-icons/fi";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectType: z.nativeEnum(ProjectType, {
    errorMap: () => ({ message: "Project type is required" }),
  }),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  demoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
  imageUrl: z.string().optional(),
  skillIds: z.array(z.string()).optional(),
});

type ProjectFormValues = z.infer<typeof ProjectSchema>;

const TYPE_OPTIONS = [
  { value: ProjectType.WEB, label: "Web" },
  { value: ProjectType.MOBILE, label: "Mobile" },
  { value: ProjectType.FULLSTACK, label: "Fullstack" },
];

interface SkillOption {
  value: string;
  label: string;
}

interface ProjectFormProps {
  projectId?: string;
  defaultValues?: Partial<ProjectFormValues>;
  skillOptions: SkillOption[];
}

export default function ProjectForm({
  projectId,
  defaultValues,
  skillOptions,
}: ProjectFormProps) {
  const router = useRouter();
  const isEdit = Boolean(projectId);
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultValues?.imageUrl ?? null
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      ...defaultValues,
      skillIds: defaultValues?.skillIds ?? [],
    },
  });

  async function onSubmit(data: ProjectFormValues) {
    const result = isEdit
      ? await updateProject(projectId!, data)
      : await createProject(data);

    if (result.success) {
      toast.success(isEdit ? "Project updated" : "Project created");
      router.push("/admin/projects");
      router.refresh();
    } else {
      toast.error(result.error ?? "Something went wrong");
    }
  }

  const selectedSkillValues = skillOptions.filter((opt) =>
    (defaultValues?.skillIds ?? []).includes(opt.value)
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          {...register("title")}
          type="text"
          placeholder="e.g. E-commerce Platform"
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        {errors.title && (
          <p className="mt-1.5 text-sm text-red-400">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Describe the project..."
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
        {errors.description && (
          <p className="mt-1.5 text-sm text-red-400">{errors.description.message}</p>
        )}
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Project Type <span className="text-red-400">*</span>
        </label>
        <select
          {...register("projectType")}
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        >
          <option value="">Select a type</option>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p className="mt-1.5 text-sm text-red-400">{errors.projectType.message}</p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          GitHub URL
        </label>
        <input
          {...register("githubUrl")}
          type="url"
          placeholder="https://github.com/..."
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        {errors.githubUrl && (
          <p className="mt-1.5 text-sm text-red-400">{errors.githubUrl.message}</p>
        )}
      </div>

      {/* Demo URL */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Demo / APK URL
        </label>
        <input
          {...register("demoUrl")}
          type="url"
          placeholder="https://..."
          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        {errors.demoUrl && (
          <p className="mt-1.5 text-sm text-red-400">{errors.demoUrl.message}</p>
        )}
      </div>

      {/* Skills multi-select */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Skills
        </label>
        <Controller
          name="skillIds"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={skillOptions}
              defaultValue={selectedSkillValues}
              onChange={(selected) =>
                field.onChange(selected.map((s) => s.value))
              }
              placeholder="Select skills..."
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                  color: "white",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#6366f1" },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#374151" : "#1f2937",
                  color: "white",
                  cursor: "pointer",
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#312e81",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "#a5b4fc",
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: "#a5b4fc",
                  "&:hover": { backgroundColor: "#4338ca", color: "white" },
                }),
                input: (base) => ({ ...base, color: "white" }),
                placeholder: (base) => ({ ...base, color: "#6b7280" }),
              }}
            />
          )}
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          Project Image
        </label>

        {imagePreview ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-lg border border-gray-700"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setValue("imageUrl", "");
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors"
              title="Remove image"
            >
              <FiX className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result) => {
              if (
                result.info &&
                typeof result.info === "object" &&
                "secure_url" in result.info
              ) {
                const url = result.info.secure_url as string;
                setValue("imageUrl", url);
                setImagePreview(url);
                toast.success("Image uploaded");
              }
            }}
            onError={() => toast.error("Image upload failed")}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-dashed border-gray-600 hover:border-indigo-500 text-gray-400 hover:text-indigo-400 rounded-lg transition-colors text-sm"
              >
                <FiUploadCloud className="w-5 h-5" />
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {isSubmitting ? "Saving…" : isEdit ? "Update Project" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
