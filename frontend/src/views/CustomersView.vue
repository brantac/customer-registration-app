<script setup lang="ts">
import { GetAllCustomers } from '@/application/use-cases/GetAllCustomers';
import SimpleTable from '@/components/SimpleTable.vue';
import { CustomerApiRepository } from '@/infrastructure/repositories/CustomerApiRepository';
import type { GetAllCustomersResponse } from '@/types/CustomerApiResponse';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const repository = new CustomerApiRepository();
const getAllCustomersUseCase = new GetAllCustomers(repository);
let customers = ref<GetAllCustomersResponse>([]);

onMounted(async () => {
  customers.value = await getAllCustomersUseCase.execute();
})
</script>

<template>
  <main class="customers">
    <h1 class="text-4xl font-bold">Clientes</h1>
    <div class="customers-menu flex w-full h-8">
      <RouterLink to="/customers/registration"
        class="text-indigo-400 underline hover:text-indigo-600"
        >Registrar cliente</RouterLink>
    </div>
    <SimpleTable :table-data="customers as GetAllCustomersResponse" />
  </main>
</template>

<style>
</style>
