"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ProjectType } from "@prisma/client";

// Types
type ActionResult = { success: boolean; error?: string };

export type ProjectWithSkills = {
  id: string;
  title: string;
  description: string;
  projectType: ProjectType;
  githubUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  skills: {
    projectId: string;
    skillId: string;
    skill: {
      id: string;
      name: string;
      category: string;
    };
  }[];
};

// Zod schema
const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectType: z.nativeEnum(ProjectType, { errorMap: () => ({ message: "Invalid project type" }) }),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  demoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  skillIds: z.array(z.string()).optional(),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;

// Create
export async function createProject(data: ProjectFormData): Promise<ActionResult> {
  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    const { skillIds, ...projectData } = parsed.data;
    
    // Convert empty strings to null for optional URLs
    const cleanedData = {
      ...projectData,
      githubUrl: projectData.githubUrl || null,
      demoUrl: projectData.demoUrl || null,
      imageUrl: projectData.imageUrl || null,
    };

    await prisma.project.create({
      data: {
        ...cleanedData,
        skills: skillIds && skillIds.length > 0
          ? {
              create: skillIds.map((skillId) => ({
                skillId,
              })),
            }
          : undefined,
      },
    });

    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create project";
    return { success: false, error: msg };
  }
}

// Update
export async function updateProject(id: string, data: ProjectFormData): Promise<ActionResult> {
  const parsed = ProjectSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    const { skillIds, ...projectData } = parsed.data;
    
    // Convert empty strings to null for optional URLs
    const cleanedData = {
      ...projectData,
      githubUrl: projectData.githubUrl || null,
      demoUrl: projectData.demoUrl || null,
      imageUrl: projectData.imageUrl || null,
    };

    // Update project and handle skill associations
    await prisma.project.update({
      where: { id },
      data: {
        ...cleanedData,
        skills: {
          // Delete all existing associations
          deleteMany: {},
          // Create new associations
          create: skillIds && skillIds.length > 0
            ? skillIds.map((skillId) => ({
                skillId,
              }))
            : [],
        },
      },
    });

    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update project";
    return { success: false, error: msg };
  }
}

// Delete
export async function deleteProject(id: string): Promise<ActionResult> {
  try {
    await prisma.project.delete({ where: { id } });
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to delete project";
    return { success: false, error: msg };
  }
}

// Get all projects with skills
export async function getProjects(): Promise<ProjectWithSkills[]> {
  return prisma.project.findMany({
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// Get project by ID with skills
export async function getProjectById(id: string): Promise<ProjectWithSkills | null> {
  return prisma.project.findUnique({
    where: { id },
    include: {
      skills: {
        include: {
          skill: true,
        },
      },
    },
  });
}
