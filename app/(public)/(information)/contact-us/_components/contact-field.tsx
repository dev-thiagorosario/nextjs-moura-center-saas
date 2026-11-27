import type { ReactNode } from "react";

export function ContactField({
  id, label, error, hint, required, children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="contact-field">
      <label htmlFor={id}>{label} <span>{required ? "*" : "(opcional)"}</span></label>
      {children}
      {hint ? <p id={`${id}-hint`} className="contact-hint">{hint}</p> : null}
      {error ? <p id={`${id}-error`} className="contact-error">{error}</p> : null}
    </div>
  );
}
