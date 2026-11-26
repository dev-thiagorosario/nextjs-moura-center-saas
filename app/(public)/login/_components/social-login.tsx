"use client";

import { useId } from "react";
import { useFormStatus } from "react-dom";
import { loginWithProvider } from "../_actions/login";

type LoginProvider = {
  id: "google" | "apple";
  name: string;
};


function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5 shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.24 5.48-4.76 7.18l7.73 6C44.42 38.02 46.98 31.89 46.98 24.55Z" />
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  );
}

function ProviderButton({ id, name }: LoginProvider) {
  const { pending, data } = useFormStatus();

  return (
    <button
      type="submit"
      name="provider"
      value={id}
      disabled={pending}
      className="moura-login-provider"
    >
      {id === "google" && <GoogleIcon />}
      {pending && data?.get("provider") === id ? `Conectando com ${name}…` : `Continuar com ${name}`}
    </button>
  );
}

export function SocialLogin({ providers }: { providers: LoginProvider[] }) {
  const previewId = useId();
  const showGooglePreview = !providers.some(({ id }) => id === "google");

  return (
    <div className="moura-login-providers">
      {showGooglePreview && (
        <div className="grid gap-2">
          <button type="button" disabled aria-describedby={previewId} className="moura-login-provider">
            <GoogleIcon />
            Continuar com Google
          </button>
          <p id={previewId} className="moura-login-provider-note">
            O acesso com Google ainda está indisponível.
          </p>
        </div>
      )}
      {providers.length > 0 && (
        <form action={loginWithProvider} className="moura-login-providers">
          {providers.map((provider) => <ProviderButton key={provider.id} {...provider} />)}
        </form>
      )}
    </div>
  );
}
