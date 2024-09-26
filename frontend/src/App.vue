<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="text-green-500 underline">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/clients">Clientes</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
