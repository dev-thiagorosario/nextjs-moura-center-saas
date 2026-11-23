import "server-only";

import { requireAccount } from "@/lib/data-access/current-user";

export async function getUserData() {
  const { name, email, phone, image } = await requireAccount();
  return { name, email, phone, image };
}

export type UserProfile = Awaited<ReturnType<typeof getUserData>>;
