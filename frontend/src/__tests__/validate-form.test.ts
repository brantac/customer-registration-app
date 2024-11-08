import type { CustomerFormType } from "@/validation/CustomerSchema";
import { validateForm } from "@/validation/validate-form";
import { describe, expect, test } from "vitest";

describe("Function: validateForm()", () => {
    test("return errors for empty fields", () => {
        let formErrors: Record<string, string> = {};
        let isFormValid: boolean = false;
        const formValues: CustomerFormType = {
            firstName: "",
            lastName: "carlos",
            email: "",
            phone: "123",
        };

        [isFormValid, formErrors] = validateForm(formValues);

        expect(formErrors).toStrictEqual({
            firstName: "Pelo menos 2 caracteres",
            email: "Email inválido",
        });
    });

    test("return errors for minimum and maximum characters on fields", () => {
        let formErrors: Record<string, string> = {};
        let isFormValid: boolean = false;
        const formValues: CustomerFormType = {
            firstName: "j",
            lastName: "carlos asfasfasfhb kjahsfasfhasf ojhnajsfajsf jkajsfnasfbhabsf akjasjfbahsfahsbfahsb kjasfhabsfhabshfab kjahsfabsfhabskfha ajksfabshfbahsbfahsbfafbka abkjfbaskjfbasfbahsfb kajsbfkasbf",
            email: "afsa@asfa.com",
            phone: "123",
        };

        [isFormValid, formErrors] = validateForm(formValues);

        expect(isFormValid).toBeFalsy();

        expect(formErrors).toStrictEqual({
            firstName: "Pelo menos 2 caracteres",
            lastName: "Máximo de 150 caracteres"
        });
    });

    test("return error for invalid email", () => {
        let formErrors: Record<string, string> = {};
        let isFormValid: boolean = false;
        const formValues: CustomerFormType = {
            firstName: "joao",
            lastName: "carlos",
            email: "afsa@",
            phone: "123",
        };

        [isFormValid, formErrors] = validateForm(formValues);

        expect(isFormValid).toBeFalsy();

        expect(formErrors).toStrictEqual({
            email: "Email inválido"
        });
    });

    test("no errors returned when fields are valid", () => {
        let formErrors: Record<string, string> = {};
        let isFormValid: boolean = false;
        const formValues: CustomerFormType = {
            firstName: "joao",
            lastName: "carlos",
            email: "afsa@asfa.com",
            phone: "123",
        };

        [isFormValid, formErrors] = validateForm(formValues);

        expect(isFormValid).toBeTruthy();

        expect(formErrors).toStrictEqual({});
    });
});
