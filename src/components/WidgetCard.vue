<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'

const props = defineProps({
  widgetName: {
    type: String,
    required: true,
  },
})

const widgetsStore = useWidgetsStore()

const removeWidget = () => {
  widgetsStore.changeWidgetActiveState(props.widgetName, false)
}
</script>

<template>
  <div class="card bg-base-100 h-80 w-80 shadow-lg">
    <div class="card-body">
      <div class="card-actions justify-end">
        <button @click="removeWidget">
          <i
            class="pi pi-times-circle text-secondary hover:cursor-pointer hover:text-secondary/50"
          ></i>
        </button>
      </div>
      <div>{{ widgetName }}</div>
    </div>
  </div>
</template>
