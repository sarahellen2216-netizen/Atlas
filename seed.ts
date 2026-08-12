import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@atlas.local" },
    update: { name: "Administrador", passwordHash, role: "ADMIN", status: "ACTIVE" },
    create: {
      name: "Administrador",
      email: "admin@atlas.local",
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE"
    }
  });

  console.log("Administrador criado/atualizado: admin@atlas.local / 123456");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
