import "server-only";

import { requireAccount } from "@/lib/data-access/current-user";
import { prisma } from "@/lib/prisma";

export async function getUserData() {
  const { id, name, email, phone } = await requireAccount();
  const profile = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: { image: true, passwordHash: true },
  });
  return { name, email, phone, image: profile.image, hasPassword: Boolean(profile.passwordHash) };
}

export type UserProfile = Awaited<ReturnType<typeof getUserData>>;
