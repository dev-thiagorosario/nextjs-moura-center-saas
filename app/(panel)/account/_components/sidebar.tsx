"use client";

import { ArrowUpRight, ChevronDown, Heart, House, LogOut, MapPin, Scissors, ShoppingBag, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActionState, useId, useRef, useState } from "react";
import { handleLogout } from "../profile/_actions/logout";
import "./sidebar.css";

const navigation = [
  { href: "/account", label: "Minha conta", icon: House },
  { href: "/account/orders", label: "Meus pedidos", icon: ShoppingBag },
  { href: "/account/addresses", label: "Meus endereços", icon: MapPin },
  { href: "/account/favorites", label: "Lista de desejos", icon: Heart },
  { href: "/account/profile", label: "Meu perfil", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [openOn, setOpenOn] = useState<string | null>(null);
  const [logoutError, logoutAction, isLoggingOut] = useActionState(handleLogout, "");
  const open = openOn !== null && openOn === pathname;
  const active = navigation.find(({ href }) => pathname === href || (href !== "/account" && pathname?.startsWith(`${href}/`)));
  const ActiveIcon = active?.icon ?? House;

  return (
    <aside
      className="account-nav-sidebar"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpenOn(null);
          triggerRef.current?.focus();
        }
      }}
    >
      <p className="account-nav-heading">Área da cliente</p>
      <button
        type="button"
        className="account-nav-trigger"
        ref={triggerRef}
        aria-controls={menuId}
        aria-expanded={open}
        aria-label={`Menu da conta, ${active?.label ?? "Área da cliente"}`}
        onClick={() => setOpenOn(open ? null : pathname)}
      >
        <ActiveIcon size={19} strokeWidth={1.5} aria-hidden="true" />
        <span>{active?.label ?? "Área da cliente"}</span>
        <ChevronDown className="account-nav-chevron" size={18} strokeWidth={1.5} aria-hidden="true" />
      </button>
      <div id={menuId} className="account-nav-panel" data-open={open}>
        <nav aria-label="Minha conta">
          <ul className="account-nav-list">
            {navigation.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active?.href === href ? (pathname === href ? "page" : "location") : undefined}
                  className="account-nav-item"
                  onNavigate={() => {
                    if (!open) return;
                    setOpenOn(null);
                    if (pathname === href) triggerRef.current?.focus();
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
            <li className="account-nav-service">
              <Scissors size={18} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <span>Ateliê &amp; Consultoria</span>
                <span className="account-nav-availability">Em breve</span>
              </div>
            </li>
          </ul>
        </nav>
        <div className="account-nav-utilities">
          <Link href="/" className="account-nav-utility">
            Continuar comprando <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <form action={logoutAction}>
            <button type="submit" disabled={isLoggingOut} className="account-nav-utility">
              {isLoggingOut ? "Saindo…" : "Sair da conta"}
              <LogOut size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <p role="status" className="account-nav-error">{logoutError}</p>
          </form>
        </div>
      </div>
    </aside>
  );
}
