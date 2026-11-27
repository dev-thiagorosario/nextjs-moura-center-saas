"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  contactSchema, contactTopics, isOrderTopic, messageLimit, replyChannels, type ContactMessage,
} from "../contact-schema";
import { ContactField } from "./contact-field";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ContactForm() {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [review, setReview] = useState<ContactMessage | null>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const reviewButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const { control, register, handleSubmit, trigger, formState: { errors, isSubmitted, isSubmitting } } = useForm<ContactMessage>({
    resolver: zodResolver(contactSchema),
    shouldUnregister: true,
    defaultValues: { name: "", email: "", whatsapp: "", message: "" },
  });

  const [channel, topic, message] = useWatch({ control, name: ["replyChannel", "topic", "message"] });
  const showOrderNumber = isOrderTopic(topic);

  useEffect(() => {
    if (review) {
      reviewHeading.current?.focus();
    } else if (restoreFocus.current) {
      reviewButton.current?.focus();
      restoreFocus.current = false;
    }
  }, [review]);

  function field(name: keyof ContactMessage, hint = false) {
    const id = `contact-${name}`;
    const error = errors[name]?.message;

    return {
      id,
      labelProps: { id, error },
      inputProps: {
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined,
      },
    };
  }

  const nameField = field("name");
  const channelField = field("replyChannel");
  const emailField = field("email");
  const whatsappField = field("whatsapp");
  const topicField = field("topic");
  const orderField = field("orderNumber", true);
  const messageField = field("message", true);

  return (
    <section id="mensagem" tabIndex={-1} className="contact-form-panel" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">Conte pra gente</h2>
      <p className="contact-form-note" id="contact-form-note">
        Você pode preencher e revisar sua mensagem aqui. O envio pelo site ainda está indisponível.
      </p>
      <noscript><p>Ative o JavaScript para usar o formulário.</p></noscript>
      <form
        aria-describedby="contact-form-note"
        noValidate
        onSubmit={handleSubmit((data) => {
          setReview(data);
        })}
      >
        <fieldset hidden={Boolean(review)} disabled={!ready} aria-busy={isSubmitting}>
          <legend className="sr-only">Dados da mensagem</legend>
          <p className="contact-required">* Campo obrigatório</p>
          <div className="contact-fields">
            <ContactField {...nameField.labelProps} label="Nome completo" required>
              <input {...nameField.inputProps} {...register("name")} autoComplete="name" maxLength={120} required />
            </ContactField>
            <ContactField {...channelField.labelProps} label="Canal de retorno preferencial" required>
              <div className="contact-select">
                <select
                  {...channelField.inputProps}
                  {...register("replyChannel", {
                    onChange: () => {
                      if (isSubmitted) void trigger(["email", "whatsapp"]);
                    },
                  })}
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Selecione um canal</option>
                  {Object.entries(replyChannels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
                <ChevronDown size={16} aria-hidden="true" />
              </div>
            </ContactField>
            <ContactField {...emailField.labelProps} label="E-mail" required={channel === "email"}>
              <input {...emailField.inputProps} {...register("email")} type="email" autoComplete="email" maxLength={254} required={channel === "email"} />
            </ContactField>
            <ContactField {...whatsappField.labelProps} label="WhatsApp" required={channel === "whatsapp"}>
              <input {...whatsappField.inputProps} {...register("whatsapp")} type="tel" autoComplete="tel" maxLength={30} placeholder="DDD + número" required={channel === "whatsapp"} />
            </ContactField>
            <div className="contact-wide">
              <ContactField {...topicField.labelProps} label="Assunto" required>
                <div className="contact-select">
                  <select {...topicField.inputProps} {...register("topic")} defaultValue="" required>
                    <option value="" disabled>Selecione o assunto</option>
                    {Object.entries(contactTopics).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <ChevronDown size={16} aria-hidden="true" />
                </div>
              </ContactField>
            </div>
            {showOrderNumber ? (
              <div className="contact-wide contact-conditional">
                <ContactField {...orderField.labelProps} label="Número do pedido" hint="Você encontra o número na confirmação da compra.">
                  <input {...orderField.inputProps} {...register("orderNumber")} maxLength={40} />
                </ContactField>
              </div>
            ) : null}
            <div className="contact-wide">
              <ContactField {...messageField.labelProps} label="Mensagem" required hint={
                <>
                  <span>Até {messageLimit.toLocaleString("pt-BR")} caracteres.</span>
                  <span className="contact-count" aria-hidden="true">{message?.length ?? 0} / {messageLimit.toLocaleString("pt-BR")}</span>
                </>
              }>
                <textarea {...messageField.inputProps} {...register("message")} rows={5} maxLength={messageLimit} required />
              </ContactField>
            </div>
          </div>
          <div className="contact-form-actions">
            <button ref={reviewButton} type="submit" className="contact-button" disabled={isSubmitting}>
              {isSubmitting ? "Validando…" : "Revisar mensagem"}
              {isSubmitting ? <LoaderCircle className="contact-spinner" size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
            </button>
            <p className="contact-error" role="alert">
              {Object.keys(errors).length > 0 ? "Confira os campos destacados para revisar sua mensagem." : ""}
            </p>
          </div>
        </fieldset>
      </form>

      {review ? (
        <div className="contact-review">
          <Check size={22} aria-hidden="true" />
          <h3 ref={reviewHeading} tabIndex={-1}>Mensagem pronta para revisão</h3>
          <p>Sua mensagem ainda não foi enviada.</p>
          <dl>
            <div><dt>Nome completo</dt><dd>{review.name}</dd></div>
            <div><dt>Canal de retorno</dt><dd>{replyChannels[review.replyChannel]}</dd></div>
            {review.email ? <div><dt>E-mail</dt><dd>{review.email}</dd></div> : null}
            {review.whatsapp ? <div><dt>WhatsApp</dt><dd>{review.whatsapp}</dd></div> : null}
            <div><dt>Assunto</dt><dd>{contactTopics[review.topic]}</dd></div>
            {review.orderNumber ? <div><dt>Número do pedido</dt><dd>{review.orderNumber}</dd></div> : null}
            <div><dt>Mensagem</dt><dd className="contact-review-message">{review.message}</dd></div>
          </dl>
          <button className="contact-button" type="button" onClick={() => {
            restoreFocus.current = true;
            setReview(null);
          }}>Editar mensagem</button>
        </div>
      ) : null}
    </section>
  );
}
