<script setup lang="ts">
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { GetAllCustomersResponse } from '@/types/CustomerApiResponse';

defineProps<{
  tableData?: GetAllCustomersResponse
}>();
</script>

<template>
      <Table>
        <TableCaption>Lista de clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[200px]">Id</TableHead>
            <TableHead>Nome completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="customer in tableData" :key="customer.id">
            <TableCell>{{ customer.id }}</TableCell>
            <TableCell>{{ customer.firstName + " " + customer.lastName }}</TableCell>
            <TableCell>{{ customer.email }}</TableCell>
            <TableCell>{{ customer.phone }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
</template>