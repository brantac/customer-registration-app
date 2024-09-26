<script setup lang="ts">
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
</script>

<template>
    <Table>
      <TableCaption>Lista de clientes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[200px]">Id</TableHead>
          <TableHead>Nome completo</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
</template>