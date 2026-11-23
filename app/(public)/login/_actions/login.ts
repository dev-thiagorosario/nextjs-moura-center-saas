"use server";

import { AuthError, CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { loginProviders, signIn } from "@/lib/auth";
import { loginSchema } from "../_components/login-schema";

export async function login(values: unknown) {
  const result = loginSchema.safeParse(values);
  if (!result.success) {
    return { message: "Revise os campos indicados.", errors: result.error.flatten().fieldErrors };
  }

  try {
    await signIn("credentials", { ...result.data, redirectTo: "/api/auth/redirect" });
  } catch (error) {
    if (error instanceof CredentialsSignin && error.code === "credentials") {
      return { message: "E-mail ou senha incorretos." };
    }
    if (error instanceof AuthError) {
      return { message: "Não foi possível entrar. Tente novamente." };
    }
    throw error;
  }
}

export async function loginWithProvider(formData: FormData) {
  const provider = loginProviders.find(({ id }) => id === formData.get("provider"));

  if (!provider) {
    redirect("/login?error=Unavailable");
  }

  try {
    await signIn(provider.id, { redirectTo: "/api/auth/redirect" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=SignIn");
    }

    throw error;
  }
}
