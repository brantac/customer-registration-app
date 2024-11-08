import { z } from "zod";

export const CustomerSchema = z.object({
    id: z.string().optional(),
    firstName: z.string().min(2, "Pelo menos 2 caracteres").max(30),
    lastName: z.string().min(2, "Pelo menos 2 caracteres").max(150).optional(),
    phone: z.string().max(11),
    email: z.string().email("Email inválido"),
});

export type CustomerFormType = z.infer<typeof CustomerSchema>;