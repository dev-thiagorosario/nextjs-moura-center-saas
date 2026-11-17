"use client";

import { ArrowUpRight, Heart, House, MapPin, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/account", label: "Minha conta", description: "Visão geral da sua conta", icon: House },
  { href: "/account/orders", label: "Meus Pedidos", description: "Acompanhe suas compras", icon: ShoppingBag },
  { href: "/account/addresses", label: "Meus Endereços", description: "Seus lugares de entrega", icon: MapPin },
  { href: "/account/favorites", label: "Lista de Desejos", description: "Guarde seus favoritos", icon: Heart },
  { href: "/account/profile", label: "Meu Perfil", description: "Suas informações pessoais", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="border-b border-[#ecdfe4] pb-6 lg:border-r lg:border-b-0 lg:pr-8 lg:pb-0">
      <div className="mb-6 hidden lg:block">
        <p className="text-xl font-medium tracking-tight">Minha conta</p>
        <p className="mt-2 text-sm leading-6 text-[#74616a]">Um espaço para cuidar do que é seu.</p>
      </div>
      <nav aria-label="Minha conta" className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3">
        {navigation.map(({ href, label, description, icon: Icon }) => {
          const selected = pathname === href || (href !== "/account" && pathname.startsWith(`${href}/`));
          return (
            <Link key={href} href={href} aria-current={selected ? "page" : undefined}
              className={`flex min-h-14 items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-colors lg:px-4 lg:py-4 ${selected ? "border-[#e9c4d1] bg-[#f8e9ef] text-[#92304f]" : "border-transparent hover:border-[#ecdfe4] hover:bg-white"}`}>
              <Icon className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <span className="min-w-0"><span className="block font-medium">{label}</span><span className="mt-1 hidden text-xs text-[#74616a] lg:block">{description}</span></span>
            </Link>
          );
        })}
      </nav>
      <Link href="/" className="mt-10 hidden min-h-11 items-center justify-between border-t border-[#ecdfe4] pt-6 text-sm text-[#74616a] hover:text-[#a7365b] lg:flex">Continuar comprando <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
    </aside>
  );
}
