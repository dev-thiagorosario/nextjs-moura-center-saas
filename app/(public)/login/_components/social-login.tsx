"use client";

import { useFormStatus } from "react-dom";
import { loginWithProvider } from "../_actions/login";

type LoginProvider = {
  id: "google" | "apple";
  name: string;
};

function LoginButtons({ providers }: { providers: LoginProvider[] }) {
  const { pending, data } = useFormStatus();
  const selectedProvider = data?.get("provider");

  return providers.map(({ id, name }) => (
    <button
      key={id}
      type="submit"
      name="provider"
      value={id}
      disabled={pending}
      className="min-h-12 w-full cursor-pointer rounded-md border border-[var(--shop-line)] bg-white px-4 py-3 text-sm font-semibold transition-colors hover:border-[var(--shop-brand)] hover:bg-[#fff4f7] disabled:cursor-wait disabled:opacity-60"
    >
      {pending && selectedProvider === id ? `Conectando com ${name}…` : `Continuar com ${name}`}
    </button>
  ));
}

export function SocialLogin({ providers }: { providers: LoginProvider[] }) {
  return (
    <form action={loginWithProvider} className="grid gap-3">
      <LoginButtons providers={providers} />
    </form>
  );
}
