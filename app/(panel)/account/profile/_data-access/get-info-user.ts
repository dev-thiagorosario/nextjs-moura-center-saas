import "server-only";

import getSession from "@/lib/getSession";
import { prisma } from "@/lib/prisma";

/** Only the authenticated user's public profile fields leave the data layer. */
export async function getUserData() {
  const session = await getSession();
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true, image: true },
  });
}

export type UserProfile = NonNullable<Awaited<ReturnType<typeof getUserData>>>;
