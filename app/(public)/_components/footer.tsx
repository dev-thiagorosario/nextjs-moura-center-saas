import Image from "next/image";
import Link from "next/link";
import logoWordmark from "../_assets/logo-wordmark-dark.png";

const navigation = [
  { label: "Sobre Nós", href: "/?categoria=moda-fitness" },
  { label: "Atendimento", href: "/?categoria=moda-praia" },
  { label: "Troca e Devoluções", href: "/?categoria=cosmeticos" },
  { label: "Perguntas frequentes", href: "/?categoria=acessorios" },
  { label: "Nossas clientes", href: "/?categoria=acessorios" },
  { label: "Fale Conosco", href: "/?categoria=acessorios" },
];

// Replace these destinations with the store's official profiles when available.
const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/", icon: TikTokIcon },
  { label: "WhatsApp", href: "https://www.whatsapp.com/", icon: WhatsAppIcon },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 3c.3 2.1 1.5 3.5 3.4 3.9v3.3a8.2 8.2 0 0 1-3.4-1.1v6.5a6.1 6.1 0 1 1-5.3-6v3.3a2.8 2.8 0 1 0 2 2.7V3h3.3Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.7-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="m8.5 7.5 1.5 3-1 1a8 8 0 0 0 3 3l1-1 3 1.5c0 1.5-1 2.5-2.5 2-3.5-1-6.5-4-7.5-7.5-.5-1.5.5-2.5 2-2Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#b96a83]/40 bg-[#100d0f] text-[#d5cfd2]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-10 xl:px-16">
        <div className="flex flex-col items-center gap-8 py-10 lg:flex-row lg:justify-between lg:gap-10 lg:py-9">
          <Link
            href="/"
            aria-label="Moura Center — página inicial"
            className="relative block h-11 w-40 shrink-0 overflow-hidden rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-[#df92ae]"
          >
            <Image
              src={logoWordmark}
              alt="Moura Center"
              sizes="228px"
              className="absolute -top-[144%] -left-[21.25%] h-auto w-[142.5%] max-w-none contrast-150 mix-blend-screen"
            />
          </Link>

          <nav aria-label="Navegação do rodapé" className="w-full border-y border-[#b96a83]/20 py-6 lg:w-auto lg:flex-1 lg:border-y-0 lg:border-l lg:py-1 lg:pl-10">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-center sm:flex sm:flex-wrap sm:justify-center sm:gap-x-7 lg:justify-start">
              {navigation.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center rounded-sm text-sm transition-colors hover:text-[#df92ae] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#df92ae]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 flex-col items-center gap-3 lg:items-end">
            <p className="text-xs tracking-[0.16em] text-[#bfb0b7] uppercase">Siga a Moura Center</p>
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (abre em nova aba)`}
                  className="flex size-11 items-center justify-center rounded-full border border-[#b96a83]/35 bg-[#df92ae]/5 text-[#df92ae] transition-colors hover:border-[#df92ae] hover:bg-[#df92ae]/15 hover:text-[#f5c5d1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#df92ae]"
                >
                  <Icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#b96a83]/20 py-5 text-center text-xs leading-relaxed text-[#bfb0b7] sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} Moura Center. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <span className="font-medium text-[#df92ae]">@dev-thiagorosario</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
