/**
 * - Adds "Blade" as a FRONTEND skill (Laravel already exists as BACKEND)
 * - Adds "Workopia" project (WEB, Laravel + Blade)
 * - Renames "E-Commerce Platform" → "Nihal Electronics E-Commerce"
 *
 * Run with: npx tsx scripts/seed-update.ts
 */
import { PrismaClient, SkillCategory, ProjectType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ── 1. Ensure Blade skill exists ──────────────────────────────────────────
  const blade = await prisma.skill.upsert({
    where: { name: "Blade" },
    update: {},
    create: { name: "Blade", category: SkillCategory.FRONTEND },
  });
  console.log(`✓ Skill: ${blade.name} (${blade.category})`);

  // Laravel should already exist as BACKEND
  const laravel = await prisma.skill.findFirst({ where: { name: "Laravel" } });
  if (!laravel) throw new Error("Laravel skill not found — run seed-skills.ts first");
  console.log(`✓ Skill: ${laravel.name} (${laravel.category})`);

  // ── 2. Add Workopia project ───────────────────────────────────────────────
  const existing = await prisma.project.findFirst({ where: { title: "Workopia" } });

  if (existing) {
    await prisma.projectSkill.deleteMany({ where: { projectId: existing.id } });
    await prisma.projectSkill.createMany({
      data: [
        { projectId: existing.id, skillId: laravel.id },
        { projectId: existing.id, skillId: blade.id },
      ],
    });
    console.log(`↺ Project updated: ${existing.title}`);
  } else {
    const created = await prisma.project.create({
      data: {
        title: "Workopia",
        description:
          "A full-featured job listing platform built with Laravel and Blade templates. Employers can post jobs, manage listings, and applicants can browse and apply. Features authentication, role-based access, and a clean responsive UI.",
        projectType: ProjectType.WEB,
        githubUrl: "https://github.com/abdurehmanSualih/workopia",
        skills: {
          create: [
            { skillId: laravel.id },
            { skillId: blade.id },
          ],
        },
      },
    });
    console.log(`✓ Project created: ${created.title} [${created.projectType}]`);
  }

  // ── 3. Rename E-Commerce Platform → Nihal Electronics E-Commerce ─────────
  const ecommerce = await prisma.project.findFirst({
    where: { title: "E-Commerce Platform" },
  });

  if (ecommerce) {
    await prisma.project.update({
      where: { id: ecommerce.id },
      data: {
        title: "Nihal Electronics E-Commerce",
        description:
          "A full-stack e-commerce platform for Nihal Electronics, featuring product listings, cart management, order processing, and an admin dashboard. Built with an Express.js REST API backend and a Next.js storefront.",
      },
    });
    console.log(`✓ Project renamed: E-Commerce Platform → Nihal Electronics E-Commerce`);
  } else {
    console.warn("⚠  'E-Commerce Platform' not found — skipping rename");
  }

  console.log("\nDone.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
