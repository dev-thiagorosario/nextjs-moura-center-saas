import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { loginProviders } from "@/lib/auth";
import { getAccountDestination, getCurrentUser } from "@/lib/data-access/current-user";
import logo from "../_assets/logo-wordmark-light.png";
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
    <div className="moura-login-methods">
      {error && <p role="alert" className="moura-login-alert">{errorMessage}</p>}
      <Login />
      <div className="moura-login-divider">ou</div>
      <SocialLogin providers={loginProviders} />
    </div>
  );
}

export default function LoginPage(props: PageProps<"/login">) {
  const { props: campaign } = getImageProps({
    src: "/images/hero/campanha-moura-mobile.webp",
    alt: "",
    width: 790,
    height: 1024,
    sizes: "(min-width: 1500px) 740px, 53vw",
  });
  const { props: landscape } = getImageProps({
    src: "/images/hero/campanha-moura.webp",
    alt: "",
    width: 1536,
    height: 1024,
    sizes: "94vw",
  });

  return (
    <main className="storefront moura-login-page" lang="pt-BR">
      <header className="moura-login-header">
        <Link href="/" className="moura-login-back">
          <ArrowLeft size={17} strokeWidth={1.5} aria-hidden="true" />
          Voltar à loja
        </Link>
        <Link href="/" className="moura-login-wordmark" aria-label="Moura Center — página inicial">
          <Image src={logo} alt="" sizes="260px" />
        </Link>
      </header>
      <div className="moura-login-shell">
        <section aria-labelledby="login-title" className="moura-login-content">
          <div className="moura-login-intro" data-enter>
            <p className="moura-login-label">Minha conta</p>
            <h1 id="login-title">Entre na <em>sua conta.</em></h1>
            <p className="moura-login-description">
              Acompanhe seus pedidos, reveja seus favoritos e gerencie seu perfil.
            </p>
          </div>
          <Suspense fallback={<p className="moura-login-loading" role="status">Carregando opções de acesso…</p>}>
            <LoginContent {...props} />
          </Suspense>
        </section>
        <figure className="moura-login-campaign" aria-hidden="true">
          <picture>
            <source media="(max-width: 799px)" srcSet={landscape.srcSet} sizes={landscape.sizes} />
            {/* Next.js generates the sources for this art-directed picture. */}
            <img {...campaign} alt="" />
          </picture>
          <figcaption className="moura-login-caption" data-enter>
            <span className="moura-login-label">Coleção fitness</span>
            <span>Vista o <em>seu ritmo.</em></span>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
