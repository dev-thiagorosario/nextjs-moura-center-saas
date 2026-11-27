import { z } from "zod";

export const contactTopics = {
  products: "Dúvidas sobre produtos e tamanhos",
  order: "Meu pedido",
  returns: "Trocas e devoluções",
  atelier: "Ateliê e Consultoria de Moda",
  partnerships: "Parcerias e influenciadoras",
  wholesale: "Atacado e revenda",
  feedback: "Elogios e sugestões",
  other: "Outros assuntos",
};

export const replyChannels = { email: "E-mail", whatsapp: "WhatsApp" };

export const messageLimit = 2000;

export function isOrderTopic(topic?: string) {
  return topic === "order" || topic === "returns";
}

const contactFields = z.object({
  name: z.string().trim().min(1, "Informe seu nome completo.").max(120),
  email: z.string().trim().max(254),
  whatsapp: z.string().trim().max(30),
  replyChannel: z.enum(["email", "whatsapp"], { error: "Escolha como prefere receber o retorno." }),
  topic: z.enum(["products", "order", "returns", "atelier", "partnerships", "wholesale", "feedback", "other"], {
    error: "Selecione o assunto da sua mensagem.",
  }),
  orderNumber: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1, "Escreva sua mensagem.").max(messageLimit),
});

const emailInput = contactFields.pick({ email: true });
const whatsappInput = contactFields.pick({ whatsapp: true });
const emailFormat = z.email();

export const contactSchema = contactFields
  .refine(({ email, replyChannel }) => !email ? replyChannel !== "email" : emailFormat.safeParse(email).success, {
    path: ["email"],
    error: ({ input }) => emailInput.safeParse(input).data?.email ? "Informe um e-mail válido." : "Informe seu e-mail para receber o retorno.",
    when: ({ value }) => emailInput.safeParse(value).success,
  })
  .refine(({ whatsapp, replyChannel }) => {
    if (!whatsapp) return replyChannel !== "whatsapp";
    return /^\+?[\d().\s-]+$/.test(whatsapp) && /^\d{10,15}$/.test(whatsapp.replace(/\D/g, ""));
  }, {
    path: ["whatsapp"],
    error: ({ input }) => whatsappInput.safeParse(input).data?.whatsapp ? "Informe um número válido, com DDD." : "Informe seu WhatsApp para receber o retorno.",
    when: ({ value }) => whatsappInput.safeParse(value).success,
  })
  .transform((data): z.input<typeof contactFields> => ({
    ...data,
    orderNumber: isOrderTopic(data.topic) ? data.orderNumber : undefined,
  }));

export type ContactMessage = z.infer<typeof contactSchema>;
