<script setup lang="ts">
import SimpleTable from '@/components/SimpleTable.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="clients">
    <h1 class="text-4xl font-bold">Clientes</h1>
    <div class="customers-menu flex w-full h-8">
      <RouterLink to="/customers/registration"
        class="text-indigo-400 underline hover:text-indigo-600"
        >Registrar cliente</RouterLink>
    </div>
    <SimpleTable />
  </div>
</template>

<style>
</style>
