<template>
    <form @submit.prevent="onSubmit" class="h-full grid md:grid-cols-2 justify-center content-center gap-4">
        <template v-for="(value, key) in formValues" :key="key">
            <div v-if="key !== 'id'" class="form-field relative w-full flex flex-col">
                <label 
                :class="[!errors[key] ? 'tex-zinc-500' : 'text-red-500']"
                :for="key">{{ formDetails[key]?.label }}</label>
                <input
                :class="['px-4 py-2 border rounded', errors[key] ? 'border-red-500' : 'border-zinc-200']"
                v-model="formValues[key]"
                type="text"
                :id="key"
                :name="key"
                :placeholder="formDetails[key]?.placeholder" :disabled="isInputDisabled"
                @blur="validateFormField(key)"/>
                <span :data-test-error="key" class="text-red-500 text-sm">{{ errors[key] }}</span>
            </div>
        </template>
        <slot name="optionalButton"></slot>
        <Button
            :disabled="Object.keys(errors).length > 0 || isInputDisabled"
            class="bg-yellow-500 hover:bg-yellow-400" type="submit">{{ submitButtonText }}</Button>
    </form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { computed, ref, toRefs, watch } from "vue";
import type { CustomerFormType } from "@/validation/CustomerSchema";
import { validateForm } from "@/validation/validate-form";
import { validateField } from "@/validation/validate-field";
import type { FormMode } from "@/types/FormMode";

interface FieldDetails {
    placeholder: string;
    label: string;
}

type FormDetails = {
    [K in keyof CustomerFormType]: FieldDetails
}

// Props and Emits
const props = defineProps<{
    initialCustomerData?: CustomerFormType,
    submitButtonText: string,
    mode: FormMode
 }>();

 const emit = defineEmits<{
    submitForm: [value: CustomerFormType],
}>();

// Variables
const errors = ref<Record<string, string>>({});
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

// Turn each prop into a Ref, destructure initialCustomerData,
// and create a local copy of it
const { initialCustomerData } = toRefs(props);
const formValues = ref({
    id: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    ...initialCustomerData.value
});

// Reset initial values if user switch from 'update' to 'view' mode
watch(() => props.mode, (newValue) => resetInitialValues(newValue));

function resetInitialValues (newValue: FormMode): void {
    if (newValue === 'view') {
        formValues.value = {
            id: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            ...initialCustomerData.value
        };

        // reset errors
        const errorKeys = Object.keys(errors.value);
        if (errorKeys.length > 0) {
            errorKeys.forEach(val => {
                delete errors.value[val];
            });
        }
    }
}

const onSubmit = () => {
    if (isFormValid() && canSubmit()) {
        emit('submitForm', formValues.value);
    }
};

const validateFormField = (key: string) => {
    const error = validateField(formValues.value, key as keyof CustomerFormType);

    if (error) {
        errors.value[key] = error;
    }
    else {
        delete errors.value[key];
    }
};

const isFormValid = () => {
    const [isValid, formErrors] = validateForm(formValues.value);

    if (isValid) {
        return true;
    }
    else {
        errors.value = formErrors;
        return false;
    }
};

const isInputDisabled = computed(() => {
    return props.mode === "view";
});

const canSubmit = () => !isInputDisabled.value;
</script>
