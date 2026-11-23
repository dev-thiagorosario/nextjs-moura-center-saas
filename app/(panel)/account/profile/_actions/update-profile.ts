"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/data-access/current-user";
import { revalidatePath } from "next/cache";
import { validateProfile, type ProfileResult } from "../_components/profile-schema";

export async function updateProfile(values: unknown): Promise<ProfileResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "Sua sessão expirou. Entre novamente para salvar." };
  }

  const parsed = validateProfile(values);
  if (!parsed.success) {
    return { success: false, message: "Revise os campos indicados.", errors: parsed.errors };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name: parsed.data.name, phone: parsed.data.phone || null },
      select: { id: true },
    });
  } catch {
    return { success: false, message: "Não foi possível salvar seu perfil. Tente novamente." };
  }

  revalidatePath("/account/profile");
  return { success: true, message: "Perfil atualizado com sucesso.", data: parsed.data };
}
