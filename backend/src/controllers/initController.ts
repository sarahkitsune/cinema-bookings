// Create admin user for testing
import bcrypt from "bcrypt";
import { PrismaClient } from "../db/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function createAdminUser() {
  const hashedPassword = await bcrypt.hash("password", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Sarah Kitsune",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user created: admin@example.com`);
}

export { createAdminUser };