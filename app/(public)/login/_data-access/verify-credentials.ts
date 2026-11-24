import "server-only";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/hashPassword";
import type { LoginValues } from "../_components/login-schema";

export async function verifyCredentials({ email, password }: LoginValues) {
  const users = await prisma.user.findMany({
    where: { email: { equals: email, mode: "insensitive" } },
    select: { id: true, name: true, email: true, passwordHash: true },
    take: 2,
  });

  const user = users.length === 1 ? users[0] : undefined;
  const validPassword = await verifyPassword(password, user?.passwordHash ?? null);

  if (!user || !validPassword) return null;

  return { id: user.id, name: user.name, email: user.email };
}
