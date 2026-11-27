import { ArrowUpRight, Camera, Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";

import dressmaking from "../../about-us/_assets/dressmaking.webp";
import { contactDetails, whatsappConversation } from "../contact-details";

const { whatsapp, supportEmail, commercialEmail, instagramUrl, hours, responseTime, legalName, taxId, visit } = contactDetails;

const channels = [
  { label: "WhatsApp", icon: MessageCircle, href: whatsapp && whatsappConversation(whatsapp), description: "Abrir conversa", external: true },
  { label: "E-mail de atendimento", icon: Mail, href: supportEmail && `mailto:${supportEmail}`, description: supportEmail },
  ...(commercialEmail ? [{ label: "E-mail comercial", icon: Mail, href: `mailto:${commercialEmail}`, description: commercialEmail }] : []),
  { label: "Instagram", icon: Camera, href: instagramUrl, description: "Abrir perfil oficial", external: true },
];

export function ContactChannels() {
  return (
    <aside className="contact-sidebar" aria-label="Canais e informações da loja">
      <section className="contact-channels" aria-labelledby="contact-channels-title">
        <h2 id="contact-channels-title">Canais diretos</h2>
        <ul>
          {channels.map(({ label, icon: Icon, href, description, external }) => (
            <li key={label}>
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              {href ? (
                <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                  <span><strong>{label}</strong><small>{description}{external ? " (nova aba)" : ""}</small></span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <div><strong>{label}</strong><small>A divulgar</small></div>
              )}
            </li>
          ))}
        </ul>
        <div className="contact-hours">
          <Clock3 size={20} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h3>Horários e prazo de resposta</h3>
            {hours ? <p>{hours}</p> : null}
            {responseTime ? <p>{responseTime}</p> : null}
            {!hours || !responseTime ? <p>{hours ? "Prazo a divulgar" : responseTime ? "Horários a divulgar" : "A divulgar"}</p> : null}
          </div>
        </div>
      </section>

      <section className="contact-location" aria-labelledby="contact-location-title">
        <div className="contact-location-image" data-moment="picture-develops">
          <Image src={dressmaking} alt="" fill sizes="(min-width: 1050px) 400px, (min-width: 790px) 36vw, 95vw" />
        </div>
        <div className="contact-location-copy">
          <MapPin size={21} strokeWidth={1.5} aria-hidden="true" />
          <div>
            <h2 id="contact-location-title">Salvador, Bahia</h2>
            <p>Moura Center</p>
            {legalName || taxId ? (
              <dl>
                {legalName ? <div><dt>Razão social</dt><dd>{legalName}</dd></div> : null}
                {taxId ? <div><dt>CNPJ</dt><dd>{taxId}</dd></div> : null}
              </dl>
            ) : null}
            {visit ? <p>{visit.address}{visit.hours ? <><br />{visit.hours}</> : null}</p> : null}
          </div>
        </div>
        {visit ? <iframe title="Localização da Moura Center" src={visit.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer" /> : null}
      </section>
    </aside>
  );
}
