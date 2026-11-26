"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
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
    <form method="post" onSubmit={submit} noValidate className="moura-login-form" aria-busy={isSubmitting}>
      <div>
        <label htmlFor={emailId} className="moura-login-field-label">E-mail</label>
        <input
          {...register("email")}
          id={emailId}
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="voce@exemplo.com"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
        />
        {errors.email && (
          <p id={`${emailId}-error`} role="alert" className="moura-login-field-error">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor={passwordId} className="moura-login-field-label">Senha</label>
        <div className="relative">
          <input
            {...register("password")}
            id={passwordId}
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            required
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? `${passwordId}-error` : undefined}
            className="moura-login-password"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            aria-controls={passwordId}
            onClick={() => setVisible((current) => !current)}
            className="moura-login-visibility"
          >
            <VisibilityIcon aria-hidden="true" />
          </Button>
        </div>
        {errors.password && (
          <p id={`${passwordId}-error`} role="alert" className="moura-login-field-error">
            {errors.password.message}
          </p>
        )}
      </div>
      {errors.root?.message && (
        <p role="alert" className="moura-login-alert">
          {errors.root.message}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="moura-login-submit"
      >
        {isSubmitting ? "Entrando…" : "Entrar"}
        <ArrowUpRight size={17} aria-hidden="true" />
      </Button>
    </form>
  );
}
