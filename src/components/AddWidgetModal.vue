<script setup>
import { useWidgetsStore } from '@/stores/widgetsStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const emit = defineEmits(['addWidget'])

const addWidgetModalRef = ref(null)

defineExpose({
  showModal: () => addWidgetModalRef.value?.showModal(),
  closeModal: () => addWidgetModalRef.value?.close(),
})

const widgetsStore = useWidgetsStore()

const { widgets, activeWidgets } = storeToRefs(widgetsStore)

const addWidget = (widgetName) => {
  widgetsStore.changeWidgetActiveState(widgetName, true)
  emit('addWidget')
}
</script>

<template>
  <dialog class="modal" ref="addWidgetModalRef">
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Close Modal Button"
        >
          <i class="pi pi-times"></i>
        </button>

        <h3 class="text-lg font-bold mb-5" data-test="title">Add a Widget</h3>
        <div class="flex flex-col">
          <button
            v-for="widget in widgets"
            class="btn btn-soft btn-secondary mb-2"
            :aria-label="`Add ${widget.label}`"
            :key="widget.name"
            :disabled="activeWidgets.includes(widget.name)"
            @click="addWidget(widget.name)"
          >
            <i class="pi pi-plus"></i>
            {{ widget.label }}
            <div class="badge badge-secondary badge-soft"><i :class="`pi ${widget.icon}`"></i></div>
          </button>
        </div>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button aria-label="Close Backdrop Button">Close</button>
    </form>
  </dialog>
</template>
