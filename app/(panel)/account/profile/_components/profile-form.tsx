"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, ChevronDown, LockKeyhole } from "lucide-react";
import { updateProfile } from "../_actions/update-profile";
import { profilePhotoMaxBytes, validateProfile, type ProfileFieldErrors, type ProfileFormData } from "./profile-schema";

interface ProfileFormProps {
  name: string | null;
  phone: string | null;
  email: string | null;
  hasPassword: boolean;
  identity: ReactNode;
}

const passwordFields = [
  { name: "currentPassword", label: "Senha atual", autoComplete: "current-password" },
  { name: "newPassword", label: "Nova senha", autoComplete: "new-password" },
  { name: "confirmPassword", label: "Confirme a nova senha", autoComplete: "new-password" },
];

export function ProfileForm({ name, phone, email, hasPassword, identity }: ProfileFormProps) {
  const [saved, setSaved] = useState<ProfileFormData>({ name: name ?? "", phone: phone ?? "" });
  const [values, setValues] = useState(saved);
  const [errors, setErrors] = useState<ProfileFieldErrors>({});
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [photoName, setPhotoName] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [hasPasswordChanges, setHasPasswordChanges] = useState(false);
  const serverErrorsRef = useRef<ProfileFieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const dirty = values.name !== saved.name || values.phone !== saved.phone || Boolean(photoName) || hasPasswordChanges;

  function changeExtras() {
    if (!formRef.current) return;
    const form = new FormData(formRef.current);
    const photo = form.get("photo");
    setPhotoName(photo instanceof File ? photo.name : "");
    setHasPasswordChanges(passwordFields.some(({ name }) => Boolean(form.get(name))));
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

  useEffect(() => {
    if (!pending && serverErrorsRef.current) {
      focusError(serverErrorsRef.current);
      serverErrorsRef.current = null;
    }
  }, [pending]);

  function discard() {
    formRef.current?.reset();
    setPhotoName("");
    setPhotoError("");
    setHasPasswordChanges(false);
    setValues(saved);
    setErrors({});
    setFeedback(null);
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
      setPhotoError("Escolha uma foto de até 900 KB.");
      form.querySelector<HTMLInputElement>("#profile-photo")?.focus();
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
          setPhotoName("");
          setPhotoError("");
          setHasPasswordChanges(false);
          setSaved(result.data);
          setValues(result.data);
        } else if (result.errors) {
          setErrors(result.errors);
          serverErrorsRef.current = result.errors;
        }
      } catch {
        setFeedback({ success: false, message: "Não foi possível salvar. Confira sua conexão e tente novamente." });
      }
    });
  }

  return (
    <form ref={formRef} method="post" onSubmit={submit} noValidate aria-busy={pending} className="account-profile-form">
      <fieldset disabled={pending} className="account-profile-portrait">
        <legend className="sr-only">Identidade do perfil</legend>
        {identity}
        <div className="account-profile-photo">
          <label htmlFor="profile-photo" className="account-profile-label">Foto de perfil</label>
          <div className="account-profile-upload">
            <input id="profile-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp"
              onChange={() => {
                changeExtras();
                setPhotoError("");
              }}
              aria-invalid={Boolean(photoError)}
              aria-describedby={photoError ? "profile-photo-error" : "profile-photo-hint"} />
            <span aria-hidden="true">Escolher foto</span>
            <span aria-hidden="true" title={photoName || undefined}>{photoName || "Nenhum arquivo"}</span>
          </div>
          {photoError
            ? <p id="profile-photo-error" role="alert" className="account-profile-error">{photoError}</p>
            : <p id="profile-photo-hint" className="account-profile-hint">JPG, PNG ou WebP de até 900 KB.</p>}
        </div>
      </fieldset>

      <section className="account-profile-section" aria-labelledby="profile-contact-title">
        <div>
          <h2 id="profile-contact-title" className="account-profile-section-title">Dados pessoais</h2>
          <p className="account-profile-section-lead">Mantenha seus dados de contato atualizados.</p>
        </div>
        <fieldset disabled={pending} aria-labelledby="profile-contact-title" className="account-profile-fields">
          <div className="account-profile-full-width">
            <label htmlFor="profile-name" className="account-profile-label">Nome completo <span aria-hidden="true">*</span></label>
            <input ref={nameRef} id="profile-name" name="name" autoComplete="name" required minLength={2} maxLength={100}
              value={values.name} onChange={(event) => change("name", event.target.value)}
              aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "profile-name-error" : undefined} />
            {errors.name && <p id="profile-name-error" className="account-profile-error" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="profile-email" className="account-profile-label">E-mail da conta</label>
            <input id="profile-email" type="email" autoComplete="email" value={email ?? ""} readOnly aria-describedby="profile-email-hint" />
            <p id="profile-email-hint" className="account-profile-hint">O e-mail de acesso não pode ser alterado aqui.</p>
          </div>
          <div>
            <label htmlFor="profile-phone" className="account-profile-label">Telefone <span className="account-profile-optional">(opcional)</span></label>
            <input ref={phoneRef} id="profile-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={25}
              value={values.phone} onChange={(event) => change("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "profile-phone-error" : "profile-phone-hint"} />
            {errors.phone ? <p id="profile-phone-error" role="alert" className="account-profile-error">{errors.phone}</p>
              : <p id="profile-phone-hint" className="account-profile-hint">Inclua o DDD e, se necessário, o código do país.</p>}
          </div>
        </fieldset>
      </section>

      <section className="account-profile-section" aria-labelledby="profile-security-title">
        <div>
          <h2 id="profile-security-title" className="account-profile-section-title">Segurança</h2>
          <p className="account-profile-section-lead">Gerencie sua senha de acesso.</p>
        </div>
        {hasPassword ? (
          <details className="account-profile-password">
            <summary className="account-profile-password-toggle">
              <LockKeyhole size={17} strokeWidth={1.5} aria-hidden="true" />
              <span>Alterar senha</span>
              {hasPasswordChanges && <span className="account-profile-password-draft">Alteração pendente</span>}
              <ChevronDown size={17} strokeWidth={1.5} className="account-profile-chevron" aria-hidden="true" />
            </summary>
            <fieldset disabled={pending} className="account-profile-password-fields">
              <legend className="sr-only">Alterar senha</legend>
              <p id="profile-password-hint" className="account-profile-hint">Use entre 12 e 256 caracteres na nova senha.</p>
              {passwordFields.map(({ name, label, autoComplete }) => (
                <div key={name}>
                  <label htmlFor={name} className="account-profile-label">{label}</label>
                  <input id={name} name={name} type="password" autoComplete={autoComplete}
                    maxLength={256} onChange={changeExtras}
                    aria-describedby={name === "newPassword" ? "profile-password-hint" : undefined} />
                </div>
              ))}
            </fieldset>
          </details>
        ) : (
          <p className="account-profile-social">Sua conta usa login social. Para trocar a senha, acesse as configurações do Google ou da Apple.</p>
        )}
      </section>

      <div className="account-profile-footer">
        {feedback && (
          <p role={feedback.success ? "status" : "alert"} className="account-profile-feedback" data-success={feedback.success}>
            {feedback.success && <Check size={17} aria-hidden="true" />}
            {feedback.message}
          </p>
        )}
        <div className="account-profile-actions">
          <button type="button" disabled={!dirty || pending} onClick={discard} className="account-button">
            Descartar alterações
          </button>
          <button type="submit" disabled={!dirty || pending} className="account-button account-button-primary account-profile-save">
            {pending ? "Salvando alterações…" : "Salvar alterações"}
            {!pending && <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </form>
  );
}
