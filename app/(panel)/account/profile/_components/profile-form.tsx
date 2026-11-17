"use client";

import { useSession } from "next-auth/react";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="max-w-[860px]">
      <header className="mb-8 sm:mb-10">
        <p className="mb-3 text-sm text-[#74616a]">Minha conta / Meu Perfil</p>
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">Meu Perfil</h1>
        <p className="mt-3 text-sm leading-6 text-[#74616a] sm:text-base">Suas informações, em um só lugar.</p>
      </header>

      <section aria-label="Identificação" className="flex items-center gap-5 border-y border-[#ecdfe4] py-6 sm:gap-6 sm:py-8">
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e9c4d1] bg-[#f8e9ef] text-[#a7365b] sm:size-24">
          {user?.image ? <Image src={user.image} alt="Sua foto de perfil" fill sizes="96px" unoptimized className="object-cover" /> : <UserRound className="size-9" strokeWidth={1.25} aria-hidden="true" />}
        </div>
        <div className="min-w-0">
          <h2 className="break-words text-xl font-medium tracking-tight sm:text-2xl">{user?.name || "Seu perfil"}</h2>
          <p className="mt-1 break-all text-sm text-[#74616a]">{user?.email || "Seus dados aparecerão aqui ao entrar na conta."}</p>
          <span className="mt-3 inline-block rounded-full bg-[#f8e9ef] px-3 py-1 text-xs font-medium text-[#92304f]">Minha conta Moura Center</span>
        </div>
      </section>

      <section aria-labelledby="personal-info-title" className="py-8 sm:py-10">
        <h2 id="personal-info-title" className="text-xl font-medium tracking-tight">Informações pessoais</h2>
        <p id="profile-preview" className="mt-2 max-w-xl text-sm leading-6 text-[#74616a]">Prévia de edição. As alterações ainda não podem ser salvas. Os exemplos nos campos vazios são apenas ilustrativos.</p>
        <form aria-describedby="profile-preview" className="mt-7" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="profile-name" className="mb-2 block text-sm font-medium">Nome completo</label>
              <input key={user?.name || "name"} id="profile-name" name="name" autoComplete="name" defaultValue={user?.name || ""} placeholder="Ex.: Mariana Souza" />
            </div>
            <div>
              <label htmlFor="profile-email" className="mb-2 block text-sm font-medium">E-mail</label>
              <input key={user?.email || "email"} id="profile-email" name="email" type="email" autoComplete="email" defaultValue={user?.email || ""} placeholder="Ex.: mariana@example.com" />
            </div>
            <div>
              <label htmlFor="profile-phone" className="mb-2 block text-sm font-medium">Telefone</label>
              <input id="profile-phone" name="phone" type="tel" autoComplete="tel" placeholder="Ex.: (DDD) 00000-0000" />
              <p className="mt-2 text-xs leading-5 text-[#74616a]">Nenhum telefone disponível nesta prévia.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#ecdfe4] pt-6 sm:flex-row sm:justify-end">
            <Button type="reset" variant="outline" className="h-12 border-[#ecdfe4] bg-white px-6 text-[#30242a] hover:bg-[#f8e9ef]">Cancelar edição</Button>
            <Button type="button" disabled className="h-12 bg-[#a7365b] px-6 text-white disabled:opacity-60">Salvar alterações</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
