/**
 * Seeds the projects table with skill associations.
 * Run with: npx tsx scripts/seed-projects.ts
 *
 * Skills must already exist in the DB (run seed-skills.ts first).
 */
import { PrismaClient, ProjectType } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    title: "Issue Tracker",
    description:
      "A full-featured issue tracking application for managing bugs, tasks, and project workflows. Supports user assignment, priority levels, status tracking, and real-time updates.",
    projectType: ProjectType.WEB,
    githubUrl: "https://github.com/abdurehman-sualih/issue-tracker",
    skillNames: ["Next.js", "Prisma"],
  },
  {
    title: "School Management Dashboard",
    description:
      "A comprehensive school management system with dashboards for admins, teachers, and students. Features attendance tracking, grade management, timetable scheduling, and reporting.",
    projectType: ProjectType.WEB,
    githubUrl: "https://github.com/abdurehman-sualih/school-management",
    skillNames: ["Next.js"],
  },
  {
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with product listings, cart management, order processing, and an admin dashboard. Built with a REST API backend and a Next.js storefront.",
    projectType: ProjectType.FULLSTACK,
    githubUrl: "https://github.com/abdurehman-sualih/ecommerce",
    skillNames: ["Express", "Next.js"],
  },
  {
    title: "Quiz App",
    description:
      "A cross-platform mobile quiz application with multiple categories, timed questions, score tracking, and a leaderboard. Powered by a Node.js/Express backend API.",
    projectType: ProjectType.MOBILE,
    githubUrl: "https://github.com/abdurehman-sualih/quiz-app",
    skillNames: ["Flutter", "Express"],
  },
];

async function main() {
  console.log("Seeding projects...\n");

  for (const { skillNames, ...projectData } of projects) {
    // Resolve skill IDs from names
    const skills = await prisma.skill.findMany({
      where: { name: { in: skillNames } },
    });

    const missing = skillNames.filter((n) => !skills.find((s) => s.name === n));
    if (missing.length > 0) {
      console.warn(`  ⚠  Skills not found for "${projectData.title}": ${missing.join(", ")}`);
    }

    // Check if project already exists by title
    const existing = await prisma.project.findFirst({
      where: { title: projectData.title },
    });

    if (existing) {
      // Update skills only
      await prisma.projectSkill.deleteMany({ where: { projectId: existing.id } });
      await prisma.projectSkill.createMany({
        data: skills.map((s) => ({ projectId: existing.id, skillId: s.id })),
      });
      console.log(`  ↺ [${existing.projectType.padEnd(8)}] ${existing.title}  (updated)`);
    } else {
      const created = await prisma.project.create({
        data: {
          ...projectData,
          skills: { create: skills.map((s) => ({ skillId: s.id })) },
        },
      });
      console.log(
        `  ✓ [${created.projectType.padEnd(8)}] ${created.title}  (skills: ${skills.map((s) => s.name).join(", ") || "none"})`
      );
    }
  }

  console.log(`\nDone — ${projects.length} projects seeded.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
