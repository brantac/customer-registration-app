import { mount } from "@vue/test-utils"
import { describe, expect, test } from "vitest"
import CustomerForm from "./CustomerForm.vue";

describe("Customer form", () => {
    describe("Rendering", () => {
        test("render existing customer data inside input fields", () => {
            const wrapper = mount(CustomerForm, {
                props: {
                    initialCustomerData: {
                        firstName: "joao",
                        lastName: "carlos",
                        email: "joao@email.com",
                        id: "das12341das",
                        phone: "1234"
                    },
                    submitButtonText: "Salvar",
                    mode: "view",
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

        test("render empty input fields on create mode", () => {
            const wrapper = mount(CustomerForm, {
                props: {
                    mode: "create",
                    submitButtonText: "Registrar",
                }
            });
    
            const firstName = wrapper.find("input[name='firstName']");
            const lastName = wrapper.find("input[name='lastName']");
            const email = wrapper.find("input[name='email']");
            const phone = wrapper.find("input[name='phone']");
    
            expect(firstName.element.value).contains("");
            expect(lastName.element.value).contains("");
            expect(email.element.value).contains("");
            expect(phone.element.value).contains("");
        });

        test("render errors on invalid input fields", async () => {
            const wrapper = mount(CustomerForm, {
                props: {
                    mode: "create",
                    submitButtonText: "Registrar cliente",
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
    });
    
    describe("User Interactions", () => {
        test("emit new cutomer data on submit", async () => {
            const wrapper = mount(CustomerForm, {
                props: {
                    submitButtonText: "Registrar cliente",
                    mode: "create",
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
    
        test("emit updated customer data on submit", async () => {
            const wrapper = mount(CustomerForm, {
                props: {
                    initialCustomerData: {
                        firstName: "joao",
                        lastName: "carlos",
                        email: "joao@email.com",
                        id: "das12341das",
                        phone: "1234"
                    },
                    submitButtonText: "Atualizar",
                    mode: "update"
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
    
        test("prevent submit on invalid inputs", async () => {
            const wrapper = mount(CustomerForm, {
                props: {
                    submitButtonText: "Registrar cliente",
                    mode: "create",
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

        test.todo("block update when edit is disabled");
    });
});
