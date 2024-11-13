<template>
    <div id="customer-view">
        <h1 class="text-xl font-medium">{{ customerData ? `${customerData.firstName} ${customerData.lastName}` : customerId }}</h1>
        <CustomerForm v-if="customerData" :initial-customer-data="customerData" @submit-form="updateCustomer" :mode="mode" submit-button-text="Atualizar">
            <template #optionalButton>
                <Button type="button"
                    @click="toggleMode">{{ mode === "view" ? "Editar" : "Cancelar edição" }}</Button>
            </template>
        </CustomerForm>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import CustomerForm from '@/components/CustomerForm/CustomerForm.vue';
import { CustomerApiRepository } from '@/infrastructure/repositories/CustomerApiRepository';
import { onMounted, ref } from 'vue';
import { UpdateCustomerUseCase } from '@/application/use-cases/UpdateCustomerUseCase';
import { GetCustomerUseCase } from '@/application/use-cases/GetCustomerUseCase';
import { Button } from '@/components/ui/button';
import type { CustomerData } from '@/types/CustomerData';
import type { FormMode } from '@/types/FormMode';

const route = useRoute();
const customerId = route.params.id as string;
const customerData = ref<CustomerData | null>(null);
const mode = ref<FormMode>("view");

// Initialize Customer Repository
const repository = new CustomerApiRepository();

// Fetch Customer Data When Page Load
onMounted(async () => {
    const getCustomerUseCase = new GetCustomerUseCase(repository);
    const customer = await getCustomerUseCase.execute(customerId);
    customerData.value = customer.data();
});

const updateCustomer = async (values: any) => {
    toggleMode();
    const updateCustomerUseCase = new UpdateCustomerUseCase(repository);
    try {
        const response = await updateCustomerUseCase.execute({
            id: values.id,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email
        });
        customerData.value = response;
    } catch (error: any) {
        throw new Error("Erro ao enviar alterações dos dados do cliente");
    }
};

const toggleMode = () => {
    if (mode.value === "view") mode.value = "update";
    else if (mode.value === "update") mode.value = "view";
}
</script>
