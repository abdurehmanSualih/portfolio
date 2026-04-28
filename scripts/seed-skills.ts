/**
 * Seeds the skills table.
 * Run with: npx tsx scripts/seed-skills.ts
 */
import { PrismaClient, SkillCategory } from "@prisma/client";

const prisma = new PrismaClient();

const skills: { name: string; category: SkillCategory }[] = [
  // Frontend
  { name: "React.js",  category: SkillCategory.FRONTEND },
  { name: "Next.js",   category: SkillCategory.FRONTEND },

  // Backend
  { name: "Node.js",   category: SkillCategory.BACKEND },
  { name: "Express",   category: SkillCategory.BACKEND },
  { name: "Laravel",   category: SkillCategory.BACKEND },

  // Database
  { name: "MySQL",     category: SkillCategory.DATABASE },
  { name: "MongoDB",   category: SkillCategory.DATABASE },

  // Mobile
  { name: "Flutter",   category: SkillCategory.MOBILE },
];

async function main() {
  console.log("Seeding skills...");

  for (const skill of skills) {
    const result = await prisma.skill.upsert({
      where: { name: skill.name },
      update: { category: skill.category },
      create: skill,
    });
    console.log(`  ✓ ${result.category.padEnd(10)} ${result.name}`);
  }

  console.log(`\nDone — ${skills.length} skills seeded.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
