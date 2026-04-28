import { SkillCategory } from "@prisma/client";

export interface SkillLike {
  id: string;
  category: SkillCategory;
}

export const CATEGORY_ORDER: SkillCategory[] = ["FRONTEND", "BACKEND", "MOBILE", "DATABASE"];

export function groupSkills<T extends SkillLike>(skills: T[]): Record<SkillCategory, T[]> {
  return CATEGORY_ORDER.reduce<Record<SkillCategory, T[]>>(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<SkillCategory, T[]>
  );
}
