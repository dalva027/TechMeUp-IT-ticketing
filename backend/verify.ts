import { PrismaClient } from "@prisma/client";
const p = new PrismaClient();
const users = await p.user.findMany({ select: { email: true, role: true } });
const tickets = await p.ticket.count();
const comments = await p.comment.count();
console.log("Users:", JSON.stringify(users, null, 2));
console.log("Tickets:", tickets);
console.log("Comments:", comments);
await p.$disconnect();