<template>
    <div id="customer-view">
        <h1>{{ id }}</h1>
        <CustomerForm :initial-customer-data="customerData" @submit="registerCustomer" />
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { RegisterCustomer } from '@/application/use-cases/RegisterCustomer';
import CustomerForm from '@/components/CustomerForm/CustomerForm.vue';
import { Customer } from '@/domain/entities/Customer';
import { CustomerApiRepository } from '@/infrastructure/repositories/CustomerApiRepository';
import { onMounted, ref } from 'vue';

const route = useRoute();
const id = route.params.id;

const customerData = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
});

onMounted(() => {
    // Requisitar dados do cliente e armazenar em 'customerData.value'
})

const registerCustomer = async (values: any) => {
    customerData.value = {...values};
    const customerRepository = new CustomerApiRepository();
    const registerCustomerUseCase = new RegisterCustomer(customerRepository);
    const newCustomer: Customer = new Customer({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email
    });
    await registerCustomerUseCase.execute(newCustomer);
};
</script>
