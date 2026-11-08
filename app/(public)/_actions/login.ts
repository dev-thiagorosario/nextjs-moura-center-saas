"use server"

import { signIn } from "@/lib/auth"


export async function handleRegister(provider: string) {
  await signIn(provider, { redirectTo: "/api/auth/redirect" })
}
