"use server"

import { signOut } from "@/lib/auth"
import { RedirectType, redirect } from "next/navigation"

export async function handleLogout(): Promise<string> {
  try {
    await signOut({
      redirect: false,
      redirectTo: "/"
    })
  } catch {
    return "Não foi possível sair da conta. Tente novamente"
  }

  redirect("/", RedirectType.replace)
}
