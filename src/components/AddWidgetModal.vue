<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'
import { storeToRefs } from 'pinia'

const widgetsStore = useWidgetsStore()

const { widgets, activeWidgets } = storeToRefs(widgetsStore)

const addWidget = (widgetName) => {
  widgetsStore.changeWidgetActiveState(widgetName, true)
}
</script>

<template>
  <dialog class="modal" id="addWidgetModal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          <i class="pi pi-times"></i>
        </button>
      </form>
      <h3 class="text-lg font-bold mb-5">Add a Widget</h3>
      <div class="flex flex-col">
        <button
          class="btn btn-soft btn-secondary mb-2"
          v-for="widget in widgets"
          :key="widget.name"
          :disabled="activeWidgets.includes(widget.name)"
          @click="addWidget(widget.name)"
        >
          <i class="pi pi-plus"></i>
          {{ widget.label }}
          <div class="badge badge-secondary badge-soft"><i :class="`pi ${widget.icon}`"></i></div>
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
