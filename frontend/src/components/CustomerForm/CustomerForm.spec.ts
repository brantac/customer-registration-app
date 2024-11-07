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
                isInputDisabled: true
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
                isInputDisabled: false
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
                isInputDisabled: false
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

        await wrapper.find('button').trigger('click');

        const emittedData = wrapper.emitted('submitForm')[0][0];
        expect(emittedData).toStrictEqual({
            firstName: "joao",
            lastName: "carlos marinho",
            email: "aasr@asfa.com",
            id: "",
            phone: "123456789"
        });
    })

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
                isInputDisabled: false
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

        expect(wrapper.find('button').exists()).toBe(true);
        await wrapper.find('button').trigger('click');

        expect(wrapper.emitted()).toHaveProperty('submitForm');

        expect(wrapper.emitted('submitForm')[0][0]).toStrictEqual({
            firstName: "joao",
            lastName: "carlos marinho",
            email: "joao@email.com",
            id: "das12341das",
            phone: "1234567891"
        });
    });
    
});
