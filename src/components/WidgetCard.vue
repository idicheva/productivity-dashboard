<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'
import ConfirmationModal from './ConfirmationModal.vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  widgetName: {
    type: String,
    required: true,
  },
})

const widgetsStore = useWidgetsStore()
const { widgets } = storeToRefs(widgetsStore)

const widget = widgets.value.find((widgetObj) => widgetObj.name === props.widgetName)

const removeWidget = () => {
  widgetsStore.changeWidgetActiveState(props.widgetName, false)
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
      <div>{{ widgetName }}</div>
    </div>
  </div>
  <ConfirmationModal :widgetLabel="widget.label" @deleteWidget="removeWidget" />
</template>
