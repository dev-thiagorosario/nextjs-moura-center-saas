// Add only details published or confirmed by Moura Center.
type ContactDetails = {
  whatsapp?: string;
  supportEmail?: string;
  commercialEmail?: string;
  instagramUrl?: string;
  hours?: string;
  responseTime?: string;
  legalName?: string;
  taxId?: string;
  visit?: {
    address: string;
    hours?: string;
    mapEmbedUrl: string;
  };
};

export const contactDetails: ContactDetails = {};

export function whatsappConversation(number: string) {
  const message = "Olá, Moura Center! Gostaria de falar com a equipe de atendimento.";
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
