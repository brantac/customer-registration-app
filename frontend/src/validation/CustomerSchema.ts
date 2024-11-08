import { z } from "zod";

export const CustomerSchema = z.object({
    id: z.string().optional(),
    firstName: z.string().min(2, "Pelo menos 2 caracteres").max(30, "Máximo de 30 caracteres"),
    lastName: z.string().min(2, "Pelo menos 2 caracteres").max(150, "Máximo de 150 caracteres").optional(),
    phone: z.string().max(11, "Máximo de 11 números"),
    email: z.string().email("Email inválido"),
});

export type CustomerFormType = z.infer<typeof CustomerSchema>;