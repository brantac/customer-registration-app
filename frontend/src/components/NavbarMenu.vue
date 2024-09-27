<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
</script>

<template>
    <NavigationMenu class="w-full h-full" orientation="vertical">
        <NavigationMenuList class="flex-col items-start w-full">
            <NavigationMenuItem class="w-full">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()" class="mb-4" as-child>
                    <RouterLink to="/">Home</RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink :class="navigationMenuTriggerStyle()" class="mb-4" as-child>
                    <RouterLink to="/customers">Customers</RouterLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>