import type { CustomerFormType } from "@/validation/CustomerSchema";
import { validateField } from "@/validation/validate-field";
import { describe, expect, test } from "vitest";

describe("Function: validateField()", () => {
    test("return error on out of bound characters", () => {
        const errors: Record<string, string> = {};
        const formValues: CustomerFormType = {
            firstName: "J",
            lastName: "carlos asfasfasfhb kjahsfasfhasf ojhnajsfajsf jkajsfnasfbhabsf akjasjfbahsfahsbfahsb kjasfhabsfhabshfab kjahsfabsfhabskfha ajksfabshfbahsbfahsbfafbka abkjfbaskjfbasfbahsfb kajsbfkasbf",
            email: "asfa",
            phone: "123123412412412",
        };

        for (const field in formValues) {
            const error = validateField(formValues, field as keyof CustomerFormType);
            if (error) {
                errors[field] = error;
            }
            else {
                delete errors[field];
            }
        }

        expect(errors).toStrictEqual({
            firstName: "Pelo menos 2 caracteres",
            lastName: "Máximo de 150 caracteres",
            phone: "Máximo de 11 números",
            email: "Email inválido",
        });
    });

    test.todo("return error on invalid email");
    test.todo("return error for maximum character");
});