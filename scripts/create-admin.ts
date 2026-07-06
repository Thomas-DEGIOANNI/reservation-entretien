import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("Admin123!", 10);

  await prisma.admin.upsert({
    where: {
      email: "admin@smdea.fr",
    },
    update: {
      password,
    },
    create: {
      email: "admin@smdea.fr",
      password,
    },
  });

  console.log("✅ Administrateur créé ou mis à jour !");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });