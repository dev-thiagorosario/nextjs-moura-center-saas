import NextAuth, { CredentialsSignin } from "next-auth"
import { prisma } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Apple from "next-auth/providers/apple"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@/app/(public)/login/_components/login-schema"
import { verifyCredentials } from "@/app/(public)/login/_data-access/verify-credentials"

export const loginProviders = [
  ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? [{ id: "google", name: "Google" } as const]
    : []),
  ...(process.env.AUTH_APPLE_ID && process.env.AUTH_APPLE_SECRET
    ? [{ id: "apple", name: "Apple" } as const]
    : []),
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  pages: { signIn: "/login", error: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      return session
    },
  },
  providers: [
    Apple,
    Google,
    Credentials({
      credentials: { email: {}, password: { type: "password" } },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials)
        if (!result.success) return null

        try {
          return await verifyCredentials(result.data)
        } catch {
          console.error("Não foi possível verificar as credenciais no servidor.")
          throw new CredentialsUnavailable()
        }
      },
    }),
  ],
})

class CredentialsUnavailable extends CredentialsSignin {
  code = "unavailable"
}
