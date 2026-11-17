"use server";

import { prisma } from "@/lib/prisma";
import { ProfileFormData, profileSchema } from "../_components/profile-schema";
import getSession from "@/lib/getSession";
import { revalidatePath } from "next/cache";
import { hashPassword } from "@/lib/hashPassword";


export async function updateProfile(values: ProfileFormData) {

  const session = await getSession();

  if (!session?.user?.id) return {
    success: false,
    message: "Sua sessão expirou. Por favor, faça login novamente.",
  }

  const parsed = profileSchema.safeParse(values);
  if (!parsed.success)
  return {
   success: false,
   message: "Revise os dados do formulário."
};

const { image, name, email, phone, password } = parsed.data;

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        image,
        name,
        email,
        phone,
        password: password ? await hashPassword(password) : undefined,
      },
    });
  } catch {
    return {
      success: false,
      message: "Ocorreu um erro ao atualizar o perfil. Tente novamente.",
    };
  }

  revalidatePath("/account/profile");
  return {
    success: true,
    message: "Perfil atualizado com sucesso.",
  };
}
