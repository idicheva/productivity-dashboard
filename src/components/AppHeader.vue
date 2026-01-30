<script setup>
import AddWidgetModal from './AddWidgetModal.vue'

const openWidgetModal = () => document.getElementById('addWidgetModal').showModal()
</script>

<template>
  <div class="navbar shadow-sm">
    <div class="navbar-start">
      <RouterLink :to="{ name: 'dashboard' }" class="btn btn-ghost md:text-xl lg:text-xl"
        >Productivity Dashboard</RouterLink
      >
    </div>
    <div class="navbar-end">
      <button @click="openWidgetModal" class="btn btn-sm md:btn-md lg:btn-md">
        <i class="pi pi-plus"></i>Add Widget
      </button>
    </div>
  </div>

  <AddWidgetModal id="addWidgetModal" />
</template>
