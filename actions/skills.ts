"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { SkillCategory } from "@prisma/client";

// Types
type ActionResult = { success: boolean; error?: string };

// Zod schema
const SkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.nativeEnum(SkillCategory, { errorMap: () => ({ message: "Invalid category" }) }),
});

export type SkillFormData = z.infer<typeof SkillSchema>;

// Create
export async function createSkill(data: SkillFormData): Promise<ActionResult> {
  const parsed = SkillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await prisma.skill.create({ data: parsed.data });
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to create skill";
    return { success: false, error: msg };
  }
}

// Update
export async function updateSkill(id: string, data: SkillFormData): Promise<ActionResult> {
  const parsed = SkillSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    await prisma.skill.update({ where: { id }, data: parsed.data });
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update skill";
    return { success: false, error: msg };
  }
}

// Delete
export async function deleteSkill(id: string): Promise<ActionResult> {
  try {
    await prisma.skill.delete({ where: { id } });
    return { success: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to delete skill";
    return { success: false, error: msg };
  }
}

// Get all
export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { category: "asc" } });
}

// Get by ID
export async function getSkillById(id: string) {
  return prisma.skill.findUnique({ where: { id } });
}
