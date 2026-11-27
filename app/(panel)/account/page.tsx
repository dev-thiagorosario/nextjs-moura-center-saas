import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, MapPin, Scissors, ShoppingBag, UserRound } from "lucide-react";
import { requireAccount } from "@/lib/data-access/current-user";
import atelier from "@/app/(public)/(information)/about-us/_assets/dressmaking.webp";

export const metadata: Metadata = { title: "Minha conta | Moura Center" };

const sections = [
  { href: "/account/orders", title: "Meus pedidos", description: "Acompanhe suas compras e consulte o histórico.", icon: ShoppingBag },
  { href: "/account/favorites", title: "Lista de desejos", description: "Reencontre os produtos que você guardou.", icon: Heart },
  { href: "/account/addresses", title: "Meus endereços", description: "Consulte seus endereços de entrega.", icon: MapPin },
  { href: "/account/profile", title: "Meu perfil", description: "Atualize seus dados pessoais e sua senha.", icon: UserRound },
];

export default async function Account() {
  const user = await requireAccount();
  const name = user.name?.trim().split(/\s+/)[0];

  return (
    <div className="account-editorial account-enter">
      <header className="account-cover">
        <div className="account-cover-copy">
          <p className="account-eyebrow">Minha conta</p>
          <h1 className="account-title">Olá{name ? <>, <em>{name}</em></> : null}.</h1>
          <p className="account-lead">Acompanhe suas compras e cuide dos seus dados em um só lugar.</p>
        </div>
        <div className="account-cover-photo" aria-hidden="true">
          <Image
            src={atelier}
            alt=""
            fill
            sizes="(min-width: 1440px) 470px, (min-width: 960px) 36vw, (min-width: 560px) 48vw, 94vw"
          />
        </div>
      </header>

      <section className="account-directory" aria-labelledby="account-directory-title">
        <h2 id="account-directory-title">O que você procura?</h2>
        <ul className="account-shortcuts">
          {sections.map(({ href, title, description, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="account-shortcut">
                <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="account-atelier">
          <Scissors size={21} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h3>Ateliê &amp; Consultoria</h3>
            <p>Consultoria de moda e criação de peças sob medida.</p>
          </div>
          <span>Em breve</span>
        </div>
      </section>
    </div>
  );
}
