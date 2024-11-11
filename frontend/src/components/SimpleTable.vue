<script setup lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button as ShadcnButton} from '@/components/ui/button'
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';
import { customRef } from 'vue';
import type { CustomerData } from '@/types/CustomerData';

defineProps<{
  tableData?: CustomerData[]
}>();

const emit = defineEmits(['deleteCustomer']);

const clickDeleteButton = (customerId: string) => {
  emit('deleteCustomer', customerId);
};
</script>

<template>
      <Table class="text-zinc-500">
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px]">Id</TableHead>
            <TableHead>Nome completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="customer in tableData" :key="customer.id">
            <TableCell>{{ customer.id }}</TableCell>
            <TableCell>{{ customer.firstName + " " + customer.lastName }}</TableCell>
            <TableCell>{{ customer.email }}</TableCell>
            <TableCell>{{ customer.phone }}</TableCell>
            <TableCell>
              <ShadcnButton class=""><RouterLink :to="{name: 'customer', params: {id: customer.id}}"><EditIcon class="w-6 h-6" /></RouterLink></ShadcnButton>
              <ShadcnButton @click="clickDeleteButton(customer.id)" class="ml-2"><DeleteIcon class="w-6 h-6" /></ShadcnButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
</template>