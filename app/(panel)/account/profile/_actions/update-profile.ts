"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/data-access/current-user";
import { revalidatePath } from "next/cache";
import { hashPassword, verifyPassword } from "@/lib/hashPassword";
import { profilePhotoMaxBytes, validateProfile, type ProfileResult } from "../_components/profile-schema";

async function readPhoto(file: File) {
  if (file.size > profilePhotoMaxBytes) return null;

  const bytes = Buffer.from(await file.arrayBuffer());
  const jpeg = bytes.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"));
  const png = bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"));
  const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  const type = jpeg ? "image/jpeg" : png ? "image/png" : webp ? "image/webp" : null;

  return type && file.type === type ? `data:${type};base64,${bytes.toString("base64")}` : null;
}

export async function updateProfile(form: FormData): Promise<ProfileResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "Sua sessão expirou. Entre novamente para salvar." };
  }

  if (!(form instanceof FormData)) {
    return { success: false, message: "Não foi possível ler os dados do formulário." };
  }

  const parsed = validateProfile({ name: form.get("name"), phone: form.get("phone") });
  if (!parsed.success) {
    return { success: false, message: "Revise os campos indicados.", errors: parsed.errors };
  }

  const photo = form.get("photo");
  if (photo !== null && !(photo instanceof File)) {
    return { success: false, message: "Escolha um arquivo de imagem válido." };
  }
  const currentPassword = form.get("currentPassword") ?? "";
  const newPassword = form.get("newPassword") ?? "";
  const confirmation = form.get("confirmPassword") ?? "";
  const changePassword = Boolean(currentPassword || newPassword || confirmation);

  if (changePassword && (
    typeof currentPassword !== "string" || !currentPassword || currentPassword.length > 256 ||
    typeof newPassword !== "string" || newPassword.length < 12 || newPassword.length > 256 ||
    newPassword !== confirmation || newPassword === currentPassword
  )) {
    return { success: false, message: "Informe a senha atual e confirme uma nova senha diferente, com 12 a 256 caracteres." };
  }

  try {
    let image: string | undefined;
    if (photo instanceof File && photo.size > 0) {
      const uploadedImage = await readPhoto(photo);
      if (!uploadedImage) {
        return { success: false, message: "Escolha uma foto JPG, PNG ou WebP de até 900 KB." };
      }
      image = uploadedImage;
    }

    let previousHash: string | undefined;
    let passwordHash: string | undefined;
    if (changePassword && typeof currentPassword === "string" && typeof newPassword === "string") {
      const credentials = await prisma.user.findUnique({
        where: { id: user.id },
        select: { passwordHash: true },
      });
      if (!credentials?.passwordHash) {
        return { success: false, message: "Esta conta usa login social. Altere a senha no provedor de acesso." };
      }
      if (!(await verifyPassword(currentPassword, credentials.passwordHash))) {
        return { success: false, message: "A senha atual está incorreta." };
      }
      previousHash = credentials.passwordHash;
      passwordHash = await hashPassword(newPassword);
    }

    const { count } = await prisma.user.updateMany({
      where: { id: user.id, ...(previousHash ? { passwordHash: previousHash } : {}) },
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone || null,
        ...(image ? { image } : {}),
        ...(passwordHash ? { passwordHash } : {}),
      },
    });
    if (!count) {
      return { success: false, message: "Não foi possível salvar. Confira a senha atual ou entre novamente." };
    }
  } catch {
    return { success: false, message: "Não foi possível salvar seu perfil. Tente novamente." };
  }

  revalidatePath("/account/profile");
  return { success: true, message: "Perfil atualizado com sucesso.", data: parsed.data };
}
