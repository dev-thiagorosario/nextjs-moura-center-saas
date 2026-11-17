import Image from "next/image";
import { ShieldCheck, UserRound } from "lucide-react";
import type { UserProfile } from "../_data-access/get-info-user";
import { ProfileForm } from "./profile-form";

export default function Profile({ user }: { user: UserProfile }) {
  const initials = user.name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase("pt-BR");
  const image = user.image?.startsWith("https://") ? user.image : null;

  return (
    <div className="max-w-[860px]">
      <header className="mb-8 border-b border-[#ecdfe4] pb-8 sm:mb-10 sm:pb-10">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Meu perfil</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#74616a] sm:text-base">Cuide das suas informações pessoais e mantenha seus dados atualizados na Moura Center.</p>
      </header>

      <section aria-label="Resumo do perfil" className="mb-8 flex flex-col gap-5 rounded-lg border border-[#ecdfe4] bg-[#f8e9ef] p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e9c4d1] bg-white text-xl font-medium text-[#92304f]">
          {image ? <Image src={image} alt="Foto do perfil" fill sizes="64px" unoptimized referrerPolicy="no-referrer" className="object-cover" />
            : initials || <UserRound className="size-7" strokeWidth={1.5} aria-hidden="true" />}
        </div>
        <div className="min-w-0">
          <h2 className="break-words text-lg font-medium tracking-tight">{user.name || "Sua conta Moura Center"}</h2>
          <p className="mt-1 break-all text-sm leading-6 text-[#74616a]">{user.email || "E-mail não informado"}</p>
          <p className="mt-2 text-xs leading-5 text-[#74616a]">A foto é fornecida pela sua conta de acesso.</p>
        </div>
      </section>

      <section aria-label="Editar perfil" className="rounded-lg border border-[#ecdfe4] bg-white p-5 sm:p-8">
        <ProfileForm name={user.name} phone={user.phone} email={user.email} />
      </section>

      <aside className="mt-6 flex items-start gap-3 px-1 text-[#74616a]">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#a7365b]" strokeWidth={1.5} aria-hidden="true" />
        <div>
          <h2 className="text-sm font-medium text-[#30242a]">Acesso à sua conta</h2>
          <p className="mt-1 text-sm leading-6">Seu acesso é feito pelo Google ou pela Apple. Gerencie a senha e a segurança diretamente no serviço utilizado para entrar.</p>
        </div>
      </aside>
    </div>
  );
}
