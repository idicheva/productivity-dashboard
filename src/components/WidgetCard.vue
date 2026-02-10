<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'
import RemoveWidgetModal from './RemoveWidgetModal.vue'
import { ref } from 'vue'

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})
const widgetsStore = useWidgetsStore()

const removeWidgetModal = ref(null)

const openDeleteWidgetModal = () => removeWidgetModal.value?.showModal()

const removeWidget = () => {
  widgetsStore.changeWidgetActiveState(props.widget.name, false)
}
</script>

<template>
  <div class="card bg-base-100 h-90 w-80 shadow-lg">
    <div class="card-body">
      <div class="card-actions justify-end">
        <button @click="openDeleteWidgetModal">
          <i
            class="pi pi-times-circle text-secondary hover:cursor-pointer hover:text-secondary/50"
          ></i>
        </button>
      </div>
      <h1 class="card-title">{{ widget.label }}</h1>
      <slot></slot>
    </div>
  </div>
  <RemoveWidgetModal
    :widgetLabel="widget.label"
    @removeWidget="removeWidget"
    ref="removeWidgetModal"
  />
</template>
