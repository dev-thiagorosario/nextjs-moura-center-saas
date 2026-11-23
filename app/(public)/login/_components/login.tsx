"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { login } from "../_actions/login";
import { loginSchema, type LoginValues } from "./login-schema";

export function Login() {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const VisibilityIcon = visible ? EyeOff : Eye;

  const submit = handleSubmit(async (values) => {
    const result = await login(values);
    if (!result) return;

    const emailError = result.errors?.email?.[0];
    const passwordError = result.errors?.password?.[0];
    if (emailError) setError("email", { message: emailError }, { shouldFocus: true });
    if (passwordError) setError("password", { message: passwordError }, { shouldFocus: !emailError });
    if (!emailError && !passwordError) setError("root", { message: result.message });
  });

  return (
    <form method="post" onSubmit={submit} noValidate className="grid gap-5" aria-busy={isSubmitting}>
      <div>
        <label htmlFor={emailId} className="mb-2 block text-sm font-medium">E-mail</label>
        <input
          {...register("email")}
          id={emailId}
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          placeholder="voce@exemplo.com"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          className="aria-invalid:border-[#a7365b]"
        />
        {errors.email && (
          <p id={`${emailId}-error`} role="alert" className="mt-2 text-sm text-[#862744]">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={passwordId} className="mb-2 block text-sm font-medium">Senha</label>
        <div className="relative">
          <input
            {...register("password")}
            id={passwordId}
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            required
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? `${passwordId}-error` : undefined}
            className="pr-14! aria-invalid:border-[#a7365b]"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            aria-controls={passwordId}
            onClick={() => setVisible((current) => !current)}
            className="absolute top-0.5 right-0.5 size-11 rounded-md text-[var(--shop-muted)] hover:bg-[#fff4f7]"
          >
            <VisibilityIcon aria-hidden="true" />
          </Button>
        </div>
        {errors.password && (
          <p id={`${passwordId}-error`} role="alert" className="mt-2 text-sm text-[#862744]">
            {errors.password.message}
          </p>
        )}
      </div>
      {errors.root?.message && (
        <p role="alert" className="rounded-md bg-[#fff0f4] p-3 text-sm text-[#862744]">
          {errors.root.message}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full cursor-pointer rounded-md bg-[var(--shop-brand)] text-white hover:bg-[#862744]"
      >
        {isSubmitting ? "Entrando…" : "Entrar"}
        <ArrowRight aria-hidden="true" />
      </Button>
    </form>
  );
}
