import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { loginProviders } from "@/lib/auth";
import { getAccountDestination, getCurrentUser } from "@/lib/data-access/current-user";
import { Login } from "./_components/login";
import { SocialLogin } from "./_components/social-login";
import "@/components/storefront.css";
import "./login.css";

export const metadata: Metadata = {
  title: "Entrar | Moura Center",
};

async function LoginContent({ searchParams }: PageProps<"/login">) {
  const [user, { error }] = await Promise.all([getCurrentUser(), searchParams]);

  if (user) redirect(getAccountDestination(user));

  const errorMessage = error === "OAuthAccountNotLinked"
    ? "Entre pelo mesmo método que você usou para criar sua conta."
    : "Não foi possível entrar. Tente novamente.";

  return (
    <section aria-labelledby="login-title" className="moura-login-content">
      <span className="moura-login-brand">Moura Center</span>
      <h1 id="login-title">Entre na sua conta</h1>
      <p className="moura-login-description">
        Acompanhe seus pedidos, reveja seus favoritos e gerencie seu perfil.
      </p>

      <div className="mt-8 grid gap-5">
        {error && (
          <p role="alert" className="rounded-md bg-[#fff0f4] p-3 text-sm text-[#862744]">
            {errorMessage}
          </p>
        )}
        <Login />
        <div className="moura-login-divider">ou</div>
        <SocialLogin providers={loginProviders} />
      </div>
    </section>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  return (
    <main className="storefront moura-login-page" lang="pt-BR">
      <div className="moura-login-shell">
        <div className="moura-login-access">
          <Link href="/" className="moura-login-back">
            <ArrowLeft size={17} aria-hidden="true" />
            Voltar à loja
          </Link>
          <Suspense fallback={<p className="moura-login-content" role="status">Carregando opções de acesso…</p>}>
            <LoginContent {...props} />
          </Suspense>
        </div>
        <div className="moura-login-photo" aria-hidden="true">
          <Image
            src="/images/products/makeup.jpg"
            alt=""
            fill
            sizes="(min-width: 1280px) 544px, (min-width: 900px) 46vw, 1px"
            className="object-cover object-[70%_center]"
          />
        </div>
      </div>
    </main>
  );
}
