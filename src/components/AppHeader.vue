<script setup>
import { useModal } from '@/composables/useModal'
import AddWidgetModal from './AddWidgetModal.vue'

const { modal: addWidgetModal, showModal, close } = useModal()
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
        @click="showModal"
        class="btn btn-soft btn-secondary btn-sm md:btn-md lg:btn-md"
        aria-label="Open Add Widget Modal"
      >
        <i class="pi pi-plus"></i>Add Widget
      </button>
    </div>
  </div>

  <AddWidgetModal @addWidget="close" ref="addWidgetModal" />
</template>
