<script setup>
import AddWidgetModal from './AddWidgetModal.vue'

const openWidgetModal = () => document.getElementById('addWidgetModal').showModal()
</script>

<template>
  <div class="navbar shadow-sm">
    <div class="navbar-start">
      <RouterLink
        :to="{ name: 'dashboard' }"
        class="text-secondary font-bold md:text-xl lg:text-2xl"
        >Productivity Dashboard</RouterLink
      >
    </div>
    <div class="navbar-end">
      <button
        @click="openWidgetModal"
        class="btn btn-soft btn-secondary btn-sm md:btn-md lg:btn-md"
      >
        <i class="pi pi-plus"></i>Add Widget
      </button>
    </div>
  </div>

  <AddWidgetModal />
</template>
