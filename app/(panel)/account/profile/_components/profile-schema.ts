import { z } from "zod";

export const profileSchema = z.object({
  image: z.string().nullable(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  phone: z.string().nullable(),
  password: z.string().nullable(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
