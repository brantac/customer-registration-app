<template>
    <div class="customer-registration">
        <CustomerForm :initial-customer-data="customerData" @submitForm="registerCustomer" />
    </div>
</template>

<script setup lang="ts">
import { RegisterCustomer } from '@/application/use-cases/RegisterCustomer';
import CustomerForm from '@/components/CustomerForm/CustomerForm.vue';
import { Customer } from '@/domain/entities/Customer';
import { CustomerApiRepository } from '@/infrastructure/repositories/CustomerApiRepository';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const customerData = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
});

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
    router.push('/customers');
};
</script>
