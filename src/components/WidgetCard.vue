<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'
import ConfirmationModal from './ConfirmationModal.vue'

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const widgetsStore = useWidgetsStore()

const removeWidget = () => {
  widgetsStore.changeWidgetActiveState(props.widget.name, false)
}
const openConfirmationModal = () => document.getElementById('confirmationModal').showModal()
</script>

<template>
  <div class="card bg-base-100 h-80 w-80 shadow-lg">
    <div class="card-body">
      <div class="card-actions justify-end">
        <button @click="openConfirmationModal">
          <i
            class="pi pi-times-circle text-secondary hover:cursor-pointer hover:text-secondary/50"
          ></i>
        </button>
      </div>
      <h1 class="card-title">{{ widget.label }}</h1>
      <slot></slot>
    </div>
  </div>
  <ConfirmationModal :widgetLabel="widget.label" @deleteWidget="removeWidget" />
</template>
