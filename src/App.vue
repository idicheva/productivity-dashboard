<script setup>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <header>
    <AppHeader></AppHeader>
  </header>

  <RouterView />
</template>
