/**
 * Run once to create the admin account:
 *   npx tsx scripts/seed-admin.ts
 *
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env before running.
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`Admin upserted: ${admin.email} (id: ${admin.id})`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
