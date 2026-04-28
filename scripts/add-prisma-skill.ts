import { PrismaClient, SkillCategory } from "@prisma/client";
const prisma = new PrismaClient();
prisma.skill
  .upsert({
    where: { name: "Prisma" },
    update: {},
    create: { name: "Prisma", category: SkillCategory.DATABASE },
  })
  .then((s) => {
    console.log(`✓ Skill added: ${s.name} (${s.category})`);
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
