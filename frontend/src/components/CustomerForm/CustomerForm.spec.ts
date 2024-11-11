import { mount } from "@vue/test-utils"
import { describe, expect, test } from "vitest"
import CustomerForm from "./CustomerForm.vue";

describe("Customer form", () => {
    test("fill input values coming from props", () => {
        const wrapper = mount(CustomerForm, {
            props: {
                initialCustomerData: {
                    firstName: "joao",
                    lastName: "carlos",
                    email: "joao@email.com",
                    id: "das12341das",
                    phone: "1234"
                },
                isInputDisabled: true,
                submitButtonText: "Registrar cliente"
            }
        });

        const inputs = wrapper.findAll("input");

        const firstName = wrapper.find('input[name="firstName"]');
        const lastName = wrapper.get('input[name="lastName"]');
        const phone = wrapper.get('input[name="phone"]');
        const email = wrapper.get('input[name="email"]');

        expect(firstName.element.value).toBe("joao");
        expect(lastName.element.value).toBe("carlos");
        expect(email.element.value).toBe("joao@email.com");
        expect(phone.element.value).toBe("1234");

        inputs.forEach((input) => {
            expect(input.attributes("disabled")).toBe("");
        });
    });
    
    test("input fields are disabled", () => {
        const wrapper = mount(CustomerForm, {
            props: {
                initialCustomerData: {
                    firstName: "joao",
                    lastName: "carlos",
                    email: "joao@email.com",
                    id: "das12341das",
                    phone: "1234"
                },
                isInputDisabled: false,
                submitButtonText: "Atualizar"
            }
        });

        const inputs = wrapper.findAll("input");

        const firstName = wrapper.find('input[name="firstName"]');
        const lastName = wrapper.get('input[name="lastName"]');
        const phone = wrapper.get('input[name="phone"]');
        const email = wrapper.get('input[name="email"]');

        inputs.forEach((input) => {
            expect(input.attributes("disabled")).toBe(undefined);
        });
    });

    test("emit new cutomer data", async () => {
        const wrapper = mount(CustomerForm, {
            props: {
                // all initial customer data is empty
                initialCustomerData: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    id: "",
                    phone: ""
                },
                isInputDisabled: false,
                submitButtonText: "Registrar cliente"
            }
        });

        const firstName = wrapper.find('input[name="firstName"]');
        const lastName = wrapper.find('input[name="lastName"]');
        const phone = wrapper.find('input[name="phone"]');
        const email = wrapper.find('input[name="email"]');

        await lastName.setValue("carlos marinho");
        await phone.setValue("123456789");
        await firstName.setValue("joao");
        await email.setValue("aasr@asfa.com");

        await wrapper.find('form').trigger('submit.prevent');

        const emittedData = wrapper.emitted('submitForm')[0][0];
        expect(emittedData).toStrictEqual({
            firstName: "joao",
            lastName: "carlos marinho",
            email: "aasr@asfa.com",
            id: "",
            phone: "123456789"
        });
    });

    test("emit updated customer data", async () => {
        const wrapper = mount(CustomerForm, {
            props: {
                initialCustomerData: {
                    firstName: "joao",
                    lastName: "carlos",
                    email: "joao@email.com",
                    id: "das12341das",
                    phone: "1234"
                },
                isInputDisabled: false,
                submitButtonText: "Atualizar"
            }
        });

        const firstName = wrapper.find('input[name="firstName"]');
        const lastName = wrapper.find('input[name="lastName"]');
        const phone = wrapper.find('input[name="phone"]');
        const email = wrapper.find('input[name="email"]');

        await lastName.setValue("carlos marinho");
        await phone.setValue("1234567891");

        expect(lastName.element.value).toBe("carlos marinho");
        expect(phone.element.value).toBe("1234567891");

        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.emitted()).toHaveProperty('submitForm');

        expect(wrapper.emitted('submitForm')[0][0]).toStrictEqual({
            firstName: "joao",
            lastName: "carlos marinho",
            email: "joao@email.com",
            id: "das12341das",
            phone: "1234567891"
        });
    });
    
    test("show errors on invalid input", async () => {
        const wrapper = mount(CustomerForm, {
            props: {
                // all initial customer data is empty
                initialCustomerData: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    id: "",
                    phone: ""
                },
                isInputDisabled: false,
                submitButtonText: "Registrar cliente"
            }
        });

        const firstName = wrapper.find('input[name="firstName"]');
        const lastName = wrapper.find('input[name="lastName"]');
        const phone = wrapper.find('input[name="phone"]');
        const email = wrapper.find('input[name="email"]');

        await firstName.setValue("carlos asfasfasfhb kjahsfasfhasf ojhnajsfajsf jkajsfnasfbhabsf akjasjfbahsfahsbfahsb kjasfhabsfhabshfab kjahsfabsfhabskfha ajksfabshfbahsbfahsbfafbka abkjfbaskjfbasfbahsfb kajsbfkasbf");
        await lastName.setValue("c");
        await phone.setValue("1234567892412412");
        await email.setValue("aasr@");

        await firstName.trigger("blur");
        await lastName.trigger("blur");
        await email.trigger("blur");
        await phone.trigger("blur");

        // Look for error messages displayed
        const firstNameError = wrapper.find("span[data-test-error='firstName'");
        const lastNameError = wrapper.find("span[data-test-error='lastName'");
        const phoneError = wrapper.find("span[data-test-error='phone'");
        const emailError = wrapper.find("span[data-test-error='email'");

        expect(firstNameError.text()).toContain("Máximo de 30 caracteres");
        expect(lastNameError.text()).toContain("Pelo menos 2 caracteres");
        expect(emailError.text()).toContain("Email inválido");
        expect(phoneError.text()).toContain("Máximo de 11 números");
    });

    test("dont allow submit form on invalid inputs", async () => {
        const wrapper = mount(CustomerForm, {
            props: {
                initialCustomerData: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                },
                isInputDisabled: true,
                submitButtonText: "Registrar cliente"
            }
        });

        // Write input values
        const firstName = wrapper.find("input[name='firstName']");
        const lastName = wrapper.find("input[name='lastName']");
        const email = wrapper.find("input[name='email']");
        const phone = wrapper.find("input[name='phone']");

        firstName.setValue("maria");
        lastName.setValue("clara");
        email.setValue("");
        phone.setValue("231215467897456");

        // Try to submit form
        await wrapper.find('form').trigger('submit');

        expect(wrapper.emitted()).not.toHaveProperty("submitForm");
    });

    test.todo("dont allow update when edit is disabled");
});
