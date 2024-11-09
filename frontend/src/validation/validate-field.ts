import { z } from "zod";
import { CustomerSchema, type CustomerFormType } from "./CustomerSchema";

type CustomerShape = typeof CustomerSchema.shape;

export function validateField(form: CustomerFormType, field: keyof CustomerFormType): string | null {
    try {
        const fieldSchema = CustomerSchema.shape[field];
        fieldSchema.parse(form[field]);
        return null;
    } catch (error) {
        if (error instanceof z.ZodError) {
            return error.issues[0].message;
        }
        else {
            return "Erro de validação";
        }
    }
}