<template>
    <form @submit.prevent="onSubmit" class="h-full grid grid-cols-2 justify-center content-center gap-4">
        <template v-for="(value, key) in formValues" :key="key">
            <div v-if="key !== 'id'" class="form-field">
                <label :for="key">{{ formDetails[key]?.label }}</label>
                <input v-model="formValues[key]" type="text" :id="key" :name="key" :placeholder="formDetails[key]?.placeholder" :disabled="isInputDisabled" class="px-4 py-2" />
            </div>
        </template>
        <Button class="col-start-1 col-end-2" type="submit">Registrar</Button>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ref, toRefs } from "vue";
import type { CustomerFormType } from "@/validation/CustomerSchema";

interface FieldDetails {
    placeholder: string;
    label: string;
}

type FormDetails = {
    [K in keyof CustomerFormType]: FieldDetails
}

const formDetails  = ref<FormDetails>({
    firstName: {
        placeholder: "Escreva seu primeiro",
        label: "Primeiro nome"
    },
    lastName: {
        placeholder: "Escreva seu sobrenome",
        label: "Sobrenome"
    },
    phone: {
        placeholder: "Escreva o número do celular",
        label: "Celular"
    },
    email: {
        placeholder: "Escreva seu email",
        label: "Email"
    },
});

// Props and Emits
const props = defineProps<{
    initialCustomerData: CustomerFormType,
    isInputDisabled: boolean
 }>();

 const emit = defineEmits<{
    submitForm: [value: CustomerFormType],
}>();

// Turn each prop into a Ref, destructure initialCustomerData,
// and create a local copy of it
const { initialCustomerData } = toRefs(props);
const formValues = ref({...initialCustomerData.value});

const onSubmit = () => {
    emit('submitForm', formValues.value);
}
</script>
