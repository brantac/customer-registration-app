import { z } from "zod";
import { CustomerSchema } from "./CustomerSchema";

export function validateForm<FObj extends object, >(form: FObj): [boolean, Record<string, string>] {
    try {
        CustomerSchema.parse(form);
        return [true, {}];
    } catch (error) {
        if (error instanceof z.ZodError) {
            const newErrors: Record<string, string> = {};
            error.issues.forEach(err => {
                if (err.path[0]) {
                    newErrors[err.path[0].toString()] = err.message;
                }
            });
            return [false, newErrors];
        }
        return [false, {}];
    }
}