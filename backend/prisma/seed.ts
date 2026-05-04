import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const techPassword = await bcrypt.hash("tech123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@techmeup.com" },
    update: {},
    create: { name: "Admin User", email: "admin@techmeup.com", password: adminPassword, role: "ADMIN" },
  });

  const tech = await prisma.user.upsert({
    where: { email: "tech@techmeup.com" },
    update: {},
    create: { name: "Tech Support", email: "tech@techmeup.com", password: techPassword, role: "TECHNICIAN" },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@techmeup.com" },
    update: {},
    create: { name: "John Doe", email: "user@techmeup.com", password: userPassword, role: "REQUESTER" },
  });

  const ticket1 = await prisma.ticket.create({
    data: {
      title: "Cannot access email",
      description: "I have been unable to log into my email account since this morning.",
      priority: "HIGH",
      requesterId: user.id,
      assigneeId: tech.id,
    },
  });

  await prisma.comment.create({
    data: { ticketId: ticket1.id, userId: tech.id, content: "Hi John, I am looking into this now." },
  });

  await prisma.comment.create({
    data: { ticketId: ticket1.id, userId: user.id, content: "Thank you, please let me know." },
  });

  console.log("Seed data created");
  console.log({ admin: admin.email, tech: tech.email, user: user.email });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
