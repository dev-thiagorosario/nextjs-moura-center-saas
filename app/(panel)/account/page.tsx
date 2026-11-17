import { ArrowRight, Heart, MapPin, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const sections = [
  { href: "/account/orders", title: "Meus Pedidos", description: "Consulte seu histórico de compras e acompanhe seus pedidos.", action: "Ver meus pedidos", icon: ShoppingBag },
  { href: "/account/addresses", title: "Meus Endereços", description: "Encontre os endereços cadastrados para suas entregas.", action: "Ver meus endereços", icon: MapPin },
  { href: "/account/favorites", title: "Lista de Desejos", description: "Revisite os produtos que você guardou para depois.", action: "Ver meus favoritos", icon: Heart },
  { href: "/account/profile", title: "Meu Perfil", description: "Acesse seu nome, e-mail e demais informações pessoais.", action: "Acessar meu perfil", icon: UserRound },
];

export default async function Account() {

  const session = await getSession();

  if(!session) {
    redirect("/")
  }

  return (
    <div className="max-w-[860px]">
      <header className="mb-8 border-b border-[#ecdfe4] pb-8 sm:mb-10 sm:pb-10">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Minha conta</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#74616a] sm:text-base">
          Bem-vinda ao seu espaço na Moura Center. Acesse suas compras, seus favoritos e suas informações pessoais.
        </p>
      </header>

      <section aria-labelledby="account-sections-title">
        <h2 id="account-sections-title" className="mb-6 text-xl font-medium tracking-tight">O que você deseja acessar?</h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          {sections.map(({ href, title, description, action, icon: Icon }) => (
            <Link key={href} href={href} className="group flex flex-col rounded-lg border border-[#ecdfe4] bg-white p-6 transition-colors hover:border-[#d5a3b4] hover:bg-[#fdf5f8] sm:p-7">
              <Icon className="mb-5 size-6 text-[#a7365b]" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="text-lg font-medium tracking-tight">{title}</h3>
              <p className="mt-2 mb-6 text-sm leading-6 text-[#74616a]">{description}</p>
              <span className="mt-auto flex min-h-11 items-center justify-between gap-3 text-sm font-medium text-[#92304f]">
                {action}
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
