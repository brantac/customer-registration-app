<template>
    <div class="customer-registration">
        <CustomerForm @submitForm="registerCustomer" mode="create" submit-button-text="Registrar" />
    </div>
</template>

<script setup lang="ts">
import { RegisterCustomer } from '@/application/use-cases/RegisterCustomer';
import CustomerForm from '@/components/CustomerForm/CustomerForm.vue';
import { CustomerApiRepository } from '@/infrastructure/repositories/CustomerApiRepository';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const registerCustomer = async (values: any) => {
    const customerRepository = new CustomerApiRepository();
    const registerCustomerUseCase = new RegisterCustomer(customerRepository);
    try {
        await registerCustomerUseCase.execute({
            id: '',
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email
        });
        router.push('/customers');
    } catch (error: unknown) {
        console.log("Erro ao registrar cliente");
    }
};
</script>
