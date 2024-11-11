<script setup lang="ts">
import { DeleteCustomerUseCase } from '@/application/use-cases/DeleteCustomerUseCase';
import { GetAllCustomersUseCase } from '@/application/use-cases/GetAllCustomersUseCase';
import SimpleTable from '@/components/SimpleTable.vue';
import { CustomerApiRepository } from '@/infrastructure/repositories/CustomerApiRepository';
import type { CustomerData } from '@/types/CustomerData';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const repository = new CustomerApiRepository();
const getAllCustomersUseCase = new GetAllCustomersUseCase(repository);
const deleteCustomerUseCase = new DeleteCustomerUseCase(repository);
let customers = ref<CustomerData[]>([]);

onMounted(async () => {
  customers.value = await getAllCustomersUseCase.execute();
});

const onClickDeleteCustomer = async (customerId: string) => {
  try {
    await deleteCustomerUseCase.execute(customerId);
    customers.value = customers.value.filter(c => c.id !== customerId);
  } catch (error: any) {
    console.log(`Erro ao remover cliente com id ${customerId}.\nMensagem de erro: ${error.message}.\nDetalhes do erro: ${error.details}`);
  }
}
</script>

<template>
  <main class="customers">
    <h1 class="text-4xl font-bold">Clientes</h1>
    <div class="customers-menu flex w-full h-8">
      <RouterLink to="/customers/registration"
        class="text-indigo-400 underline hover:text-indigo-600"
        >Registrar cliente</RouterLink>
    </div>
    <SimpleTable @delete-customer="onClickDeleteCustomer" :table-data="customers as CustomerData[]" />
  </main>
</template>

<style>
</style>
