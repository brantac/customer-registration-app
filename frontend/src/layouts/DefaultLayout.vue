<script setup lang="ts">
import NavbarMenu from '@/components/NavbarMenu.vue';

</script>
<template>
    <div class="flex h-screen">
        <header class="w-1/4 p-4 border-r-2">
            <NavbarMenu />
        </header>
        <RouterView class="flex-grow p-8" />
    </div>
</template>