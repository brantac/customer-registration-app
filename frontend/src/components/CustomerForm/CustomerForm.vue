<template>
    <form @submit="onSubmit" class="h-full grid grid-cols-2 justify-center content-center gap-4">
        <FormField v-slot="{ componentField }" name="firstName">
            <FormItem class="flex flex-col">
                <FormLabel>Primeiro Nome</FormLabel>
                <FormControl>
                    <input type="text" placeholder="Escreva o seu primeiro nome" v-bind="componentField"
                        class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        
        <FormField v-slot="{ componentField }" name="lastName">
            <FormItem class="flex flex-col">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                    <input type="text" placeholder="Escreva seu sobrenome" v-bind="componentField"
                        class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        
        <FormField v-slot="{ componentField }" name="phone">
            <FormItem class="flex flex-col">
                <FormLabel>Celular</FormLabel>
                <FormControl>
                    <input type="text" placeholder="Escreva o número do seu celular" v-bind="componentField"
                        class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        
        <FormField v-slot="{ componentField }" name="email">
            <FormItem class="flex flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <input type="text" placeholder="Escreva seu email" v-bind="componentField"
                        class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button class="col-start-1 col-end-2" type="submit">Registrar</Button>
    </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CustomerApiRepository } from "@/infrastructure/repositories/CustomerApiRepository";
import { RegisterCustomer } from "@/application/use-cases/RegisterCustomer";
import { useRouter } from "vue-router";

const router = useRouter();

const customerSchema = toTypedSchema(z.object({
    firstName: z.string().min(2, "Primeiro nome deve ter no mínimo 2 caracteres").max(20),
    lastName: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres").max(150),
    phone: z.string().min(11).max(11),
    email: z.string().email("Email inválido"),
}));

const form = useForm({
    validationSchema: customerSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    const customerRepository = new CustomerApiRepository();
    const registerCustomer = new RegisterCustomer(customerRepository);
    await registerCustomer.execute(values.firstName, values.lastName, values.email);
    router.push('/customers');
})
</script>
