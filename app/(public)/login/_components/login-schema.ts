import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Informe seu e-mail.")
    .max(254, "Informe um e-mail válido.")
    .pipe(z.email("Informe um e-mail válido.")),
  password: z.string().min(1, "Informe sua senha.")
    .max(256, "A senha deve ter até 256 caracteres."),
});

export type LoginValues = z.infer<typeof loginSchema>;
