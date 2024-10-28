<template>
    <form @submit="onSubmit" class="h-full grid grid-cols-2 justify-center content-center gap-4">
        <FormField v-slot="{ componentField }" name="firstName">
            <FormItem class="flex flex-col">
                <FormLabel>Primeiro Nome</FormLabel>
                <FormControl>
                    <input :disabled="isInputDisabled" v-model="formValues.firstName" type="text" placeholder="Escreva o seu primeiro nome" v-bind="componentField"
                        class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        
        <FormField v-slot="{ componentField }" name="lastName">
            <FormItem class="flex flex-col">
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                    <input :disabled="isInputDisabled" v-model="formValues.lastName" type="text" placeholder="Escreva seu sobrenome" v-bind="componentField" class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        
        <FormField v-slot="{ componentField }" name="phone">
            <FormItem class="flex flex-col">
                <FormLabel>Celular</FormLabel>
                <FormControl>
                    <input :disabled="isInputDisabled" v-model="formValues.phone" type="text" placeholder="Escreva o número do seu celular" v-bind="componentField" class="px-4 py-2" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        
        <FormField v-slot="{ componentField }" name="email">
            <FormItem class="flex flex-col">
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <input :disabled="isInputDisabled" v-model="formValues.email" type="text" placeholder="Escreva seu email" v-bind="componentField" class="px-4 py-2" />
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
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRoute } from "vue-router";
import { computed, ref, toRefs, watch } from "vue";

const route = useRoute();

const isInputDisabled = computed(() => route.name !== 'customer-registration');

const CustomerSchema = z.object({
    firstName: z.string().min(2, "Pelo menos 2 caracteres").max(30),
    lastName: z.string().min(2, "Pelo menos 2 caracteres").max(150).optional(),
    phone: z.string().max(11),
    email: z.string().email("Email inválido").optional(),
});
const customerFormSchema = toTypedSchema(CustomerSchema);
const form = useForm({
    validationSchema: customerFormSchema,
});

// Get the typescript type from zod schema
type CustomerFormType = z.infer<typeof CustomerSchema>;
// Define the component props
const props = defineProps<{ initialCustomerData: CustomerFormType }>();
// Turn all the props properties into ref properties
const { initialCustomerData } = toRefs(props);
// Set the props passed as the inital value of the inputs
const formValues = ref({...initialCustomerData.value});
// Watch for updates on customer data
watch(initialCustomerData, (newData) => {
    formValues.value = { ...newData };
});

const emit = defineEmits<{
    submitForm: [value: CustomerFormType]
}>();

const onSubmit = form.handleSubmit(async (values) => {
    emit('submitForm', formValues.value);
});
</script>
