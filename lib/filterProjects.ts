import { ProjectType } from "@prisma/client";

export type Filter = "ALL" | ProjectType;

export interface ProjectLike {
  projectType: ProjectType;
}

export function filterProjects<T extends ProjectLike>(projects: T[], filter: Filter): T[] {
  if (filter === "ALL") return projects;
  return projects.filter((p) => p.projectType === filter);
}
