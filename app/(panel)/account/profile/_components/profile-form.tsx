"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { Check, LoaderCircle, Save } from "lucide-react";
import { updateProfile } from "../_actions/update-profile";
import { profilePhotoMaxBytes, validateProfile, type ProfileFieldErrors, type ProfileFormData } from "./profile-schema";

interface ProfileFormProps {
  name: string | null;
  phone: string | null;
  email: string | null;
  hasPassword: boolean;
}

const passwordFields = [
  { name: "currentPassword", label: "Senha atual", autoComplete: "current-password" },
  { name: "newPassword", label: "Nova senha", autoComplete: "new-password" },
  { name: "confirmPassword", label: "Confirme a nova senha", autoComplete: "new-password" },
];

export function ProfileForm({ name, phone, email, hasPassword }: ProfileFormProps) {
  const [saved, setSaved] = useState<ProfileFormData>({ name: name ?? "", phone: phone ?? "" });
  const [values, setValues] = useState(saved);
  const [errors, setErrors] = useState<ProfileFieldErrors>({});
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [hasExtras, setHasExtras] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dirty = values.name !== saved.name || values.phone !== saved.phone || hasExtras;

  function changeExtras() {
    if (!formRef.current) return;
    const form = new FormData(formRef.current);
    const photo = form.get("photo");
    setHasExtras((photo instanceof File && photo.size > 0) || passwordFields.some(({ name }) => Boolean(form.get(name))));
    setFeedback(null);
  }

  function change(field: keyof ProfileFormData, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  function focusError(fieldErrors: ProfileFieldErrors) {
    if (fieldErrors.name) nameRef.current?.focus();
    else if (fieldErrors.phone) phoneRef.current?.focus();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !dirty) return;
    const parsed = validateProfile(values);
    if (!parsed.success) {
      setErrors(parsed.errors);
      setFeedback(null);
      focusError(parsed.errors);
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    const photo = data.get("photo");
    if (photo instanceof File && photo.size > profilePhotoMaxBytes) {
      setFeedback({ success: false, message: "Escolha uma foto de até 900 KB." });
      return;
    }

    setErrors({});
    setFeedback(null);
    startTransition(async () => {
      try {
        const result = await updateProfile(data);
        setFeedback(result);
        if (result.success) {
          form.reset();
          setHasExtras(false);
          setSaved(result.data);
          setValues(result.data);
        } else if (result.errors) {
          setErrors(result.errors);
          focusError(result.errors);
        }
      } catch {
        setFeedback({ success: false, message: "Não foi possível salvar. Confira sua conexão e tente novamente." });
      }
    });
  }

  return (
    <form ref={formRef} method="post" onSubmit={submit} noValidate aria-busy={pending} className="min-w-0">
      <fieldset disabled={pending} className="min-w-0 space-y-6 disabled:opacity-70">
        <legend className="text-xl font-medium tracking-tight">Informações pessoais</legend>
        <p className="text-sm leading-6 text-[#74616a]">Mantenha seus dados de contato atualizados. O campo de nome é obrigatório.</p>
        <div>
          <label htmlFor="profile-name" className="mb-2 block text-sm font-medium">Nome completo <span className="text-[#92304f]" aria-hidden="true">*</span></label>
          <input ref={nameRef} id="profile-name" name="name" autoComplete="name" required minLength={2} maxLength={100}
            value={values.name} onChange={(event) => change("name", event.target.value)}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "profile-name-error" : undefined} />
          {errors.name ? <p id="profile-name-error" className="mt-2 text-sm text-red-700" role="alert">{errors.name}</p> : null}
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="profile-email" className="mb-2 block text-sm font-medium">E-mail da conta</label>
            <input id="profile-email" type="email" autoComplete="email" value={email ?? ""} readOnly aria-describedby="profile-email-hint" className="!bg-[#faf5f7]" />
            <p id="profile-email-hint" className="mt-2 text-xs leading-5 text-[#74616a]">Vinculado à sua conta de acesso. Não pode ser alterado aqui.</p>
          </div>
          <div className="min-w-0">
            <label htmlFor="profile-phone" className="mb-2 block text-sm font-medium">Telefone <span className="font-normal text-[#74616a]">(opcional)</span></label>
            <input ref={phoneRef} id="profile-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={25}
              value={values.phone} onChange={(event) => change("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "profile-phone-error" : "profile-phone-hint"} />
            {errors.phone ? <p id="profile-phone-error" role="alert" className="mt-2 text-sm text-red-700">{errors.phone}</p>
              : <p id="profile-phone-hint" className="mt-2 text-xs leading-5 text-[#74616a]">Inclua o DDD e, se necessário, o código do país.</p>}
          </div>
        </div>
        <div>
          <label htmlFor="profile-photo" className="mb-2 block text-sm font-medium">Foto de perfil</label>
          <input id="profile-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"
            onChange={changeExtras} aria-describedby="profile-photo-hint"
            className="file:mr-3 file:cursor-pointer file:font-medium file:text-[#92304f]" />
          <p id="profile-photo-hint" className="mt-2 text-xs leading-5 text-[#74616a]">JPG, PNG ou WebP de até 900 KB.</p>
        </div>
      </fieldset>

      <fieldset disabled={pending} className="mt-8 min-w-0 space-y-4 disabled:opacity-70">
        <legend className="text-xl font-medium tracking-tight">Senha</legend>
        {hasPassword ? (
          <>
            <p id="profile-password-hint" className="text-sm leading-6 text-[#74616a]">Preencha os campos abaixo se quiser trocar sua senha. Use de 12 a 256 caracteres na nova senha.</p>
            <div className="grid gap-4 xl:grid-cols-3">
              {passwordFields.map(({ name, label, autoComplete }) => (
                <div key={name} className="min-w-0">
                  <label htmlFor={name} className="mb-2 block text-sm font-medium">{label}</label>
                  <input id={name} name={name} type="password" autoComplete={autoComplete}
                    maxLength={256} onChange={changeExtras} aria-describedby="profile-password-hint" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm leading-6 text-[#74616a]">Sua conta usa login social. Para trocar a senha, acesse as configurações do Google ou da Apple.</p>
        )}
      </fieldset>

      <div className="mt-8 border-t border-[#ecdfe4] pt-6">
        {feedback ? <p role={feedback.success ? "status" : "alert"} className={`mb-5 flex items-start gap-2 rounded-md p-3 text-sm leading-6 ${feedback.success ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {feedback.success ? <Check className="mt-1 size-4 shrink-0" aria-hidden="true" /> : null}{feedback.message}
        </p> : null}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" disabled={!dirty || pending} onClick={() => {
            formRef.current?.reset();
            setHasExtras(false);
            setValues(saved);
            setErrors({});
            setFeedback(null);
          }}
            className="min-h-12 rounded-md border border-[#ecdfe4] px-5 text-sm font-medium transition-colors hover:bg-[#f8e9ef] disabled:cursor-not-allowed disabled:opacity-50">Descartar alterações</button>
          <button type="submit" disabled={!dirty || pending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#a7365b] px-6 text-sm font-medium text-white transition-colors hover:bg-[#92304f] active:bg-[#7d2944] disabled:cursor-not-allowed disabled:opacity-50">
            {pending ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Save className="size-4" aria-hidden="true" />}
            {pending ? "Salvando alterações…" : "Salvar alterações"}
          </button>
        </div>
      </div>
    </form>
  );
}
