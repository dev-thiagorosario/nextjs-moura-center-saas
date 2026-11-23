import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { loginProviders } from "@/lib/auth";
import { getAccountDestination, getCurrentUser } from "@/lib/data-access/current-user";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { Login } from "./_components/login";
import { SocialLogin } from "./_components/social-login";
import "@/components/storefront.css";

export const metadata: Metadata = {
  title: "Entrar | Moura Center",
};

async function LoginContent({ searchParams }: PageProps<"/login">) {
  const [user, { error }] = await Promise.all([getCurrentUser(), searchParams]);

  if (user) {
    redirect(getAccountDestination(user));
  }

  const errorMessage = error === "OAuthAccountNotLinked"
    ? "Use o mesmo provedor com que você criou sua conta."
    : "Não foi possível entrar. Tente novamente.";

  return (
    <section aria-labelledby="login-title" className="w-full max-w-md">
      <Link
        href="/"
        className="mb-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-[var(--shop-brand)] hover:underline"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Voltar à loja
      </Link>
      <div className="rounded-2xl border border-[var(--shop-line)] border-t-[3px] border-t-[var(--shop-brand)] bg-white p-6 shadow-[0_12px_40px_#30242a08] sm:p-9">
        <h1 id="login-title" className="text-3xl font-semibold tracking-tight">
          Entre na sua conta
        </h1>
        <p className="mt-2 text-sm leading-6 text-[var(--shop-muted)]">
          Acesse sua conta para acompanhar seus pedidos e gerenciar seu perfil.
        </p>
        <div className="mt-7 grid gap-4">
          {error && (
            <p role="alert" className="rounded-md bg-[#fff0f4] p-3 text-sm text-[#862744]">
              {errorMessage}
            </p>
          )}
          <Login />
          {loginProviders.length > 0 && (
            <>
              <div className="flex items-center gap-3 py-1 text-sm text-[var(--shop-muted)] before:h-px before:flex-1 before:bg-[var(--shop-line)] after:h-px after:flex-1 after:bg-[var(--shop-line)]">
                ou
              </div>
              <SocialLogin providers={loginProviders} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <div className="storefront flex min-h-screen flex-col" lang="pt-BR">
      <Header />
      <main className="grid flex-1 place-items-center px-4 py-12 sm:px-6 sm:py-20">
        <Suspense fallback={<p role="status">Carregando opções de acesso…</p>}>
          <LoginContent {...props} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
