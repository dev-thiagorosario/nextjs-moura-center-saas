import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import type { ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import logo from "@/app/(public)/_assets/logo-wordmark-light.png";
import { shopNavigation } from "@/app/(public)/_components/nav-bar";
import { Sheet, SheetClose, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import "./account-header.css";

function HeaderPanel({ title, side, children }: {
  title: string;
  side: "left" | "right";
  children: ReactNode;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="account-header-backdrop" />
      <Dialog.Popup className="account-header-panel" data-side={side} lang="pt-BR">
        <div className="account-header-panel-top">
          <SheetTitle>{title}</SheetTitle>
          <SheetClose className="account-header-icon" aria-label="Fechar">
            <X size={21} strokeWidth={1.5} aria-hidden="true" />
          </SheetClose>
        </div>
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

export function AccountHeader({ name }: { name: string | null }) {
  const accountName = name?.trim() || "Minha conta";

  return (
    <header className="account-header">
      <div className="account-header-inner">
        <div className="account-header-store">
          <Link href="/" className="account-header-return">
            <ArrowLeft size={17} strokeWidth={1.5} aria-hidden="true" />
            Voltar à loja
          </Link>
          <Sheet>
            <SheetTrigger type="button" className="account-header-icon account-header-menu" aria-label="Abrir menu da loja">
              <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
            </SheetTrigger>
            <HeaderPanel side="left" title="Navegue pela loja">
              <SheetDescription className="sr-only">Categorias da loja e acesso à sua conta.</SheetDescription>
              <nav aria-label="Menu da loja" className="account-header-panel-links">
                <SheetClose nativeButton={false} render={<Link href="/" />}>
                  Página inicial <ArrowUpRight size={16} aria-hidden="true" />
                </SheetClose>
                {shopNavigation.map(({ href, label }) => (
                  <SheetClose key={href} nativeButton={false} render={<Link href={href} />}>
                    {label} <ArrowUpRight size={16} aria-hidden="true" />
                  </SheetClose>
                ))}
                <SheetClose nativeButton={false} render={<Link href="/account" />}>
                  Minha conta <UserRound size={17} strokeWidth={1.5} aria-hidden="true" />
                </SheetClose>
              </nav>
            </HeaderPanel>
          </Sheet>
        </div>

        <Link href="/" className="account-header-wordmark" aria-label="Moura Center — página inicial">
          <Image src={logo} alt="" loading="eager" sizes="(min-width: 1024px) 232px, 166px" />
        </Link>

        <div className="account-header-tools">
          <div className="account-header-actions" role="group" aria-label="Atalhos da conta e da loja">
            <Link href="/account" className="account-header-icon account-header-user" aria-label={`Minha conta — ${accountName}`}>
              <UserRound size={20} strokeWidth={1.5} aria-hidden="true" />
              <span>{accountName}</span>
            </Link>
            <Link href="/account/favorites" className="account-header-icon" aria-label="Meus favoritos">
              <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
            </Link>
            <Sheet>
              <SheetTrigger type="button" className="account-header-icon account-header-bag" aria-label="Sacola de compras, 0 itens">
                <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
                <span aria-hidden="true">0</span>
              </SheetTrigger>
              <HeaderPanel side="right" title="Sua sacola">
                <SheetDescription className="account-header-panel-description">Sua sacola está vazia.</SheetDescription>
                <SheetClose nativeButton={false} render={<Link href="/" />} className="account-header-panel-cta">
                  Explorar a loja <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                </SheetClose>
              </HeaderPanel>
            </Sheet>
          </div>

          <form action="/" method="get" role="search" aria-label="Busca na loja" className="account-header-search">
            <label htmlFor="account-header-search" className="sr-only">Busque por produtos, marcas ou categorias</label>
            <input id="account-header-search" type="search" name="q" placeholder="Buscar na loja" />
            <button type="submit" className="account-header-icon" aria-label="Buscar">
              <Search size={19} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
