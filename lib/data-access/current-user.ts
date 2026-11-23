import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = cache(async () => {
  await connection();
  const session = await auth();
  const id = session?.user?.id;

  if (!id) return null;

  return prisma.user.findUnique({
    where: { id },
    select: { id: true, role: true, name: true, email: true, phone: true, image: true },
  });
});

export function getAccountDestination(user: Awaited<ReturnType<typeof getCurrentUser>>) {
  if (!user) return "/login";
  return user.role === "ADMIN" ? "/dashboard" : "/account";
}

export async function requireAccount() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireAccount();
  if (user.role !== "ADMIN") redirect(getAccountDestination(user));
  return user;
}
