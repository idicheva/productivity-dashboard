<script setup>
import { useModal } from '@/composables/useModal'
import RemoveWidgetModal from './RemoveWidgetModal.vue'

const emit = defineEmits(['removeWidget'])

const props = defineProps({
  widget: {
    type: Object,
    required: true,
  },
})

const { modal: removeWidgetModal, showModal } = useModal()

const handleRemoveWidget = () => {
  emit('removeWidget', props.widget.name)
}
</script>

<template>
  <div class="card bg-base-100 w-80 shadow-lg h-90 flex-auto m-5">
    <div class="card-body">
      <div class="flex items-start justify-between gap-3">
        <div
          class="widget-drag-handle flex items-center gap-2 text-secondary hover:text-secondary/50 cursor-grab active:cursor-grabbing"
          :aria-label="`Drag ${widget.label}`"
          :title="`Drag ${widget.label}`"
        >
          <i class="pi pi-bars text-sm"></i>
          <h1 class="card-title">{{ widget.label }}</h1>
        </div>
        <button @click="showModal" :aria-label="`Remove ${widget.label}`">
          <i
            class="pi pi-times-circle text-secondary hover:cursor-pointer hover:text-secondary/50"
          ></i>
        </button>
      </div>
      <slot></slot>
    </div>
  </div>
  <RemoveWidgetModal
    :widgetLabel="widget.label"
    @removeWidget="handleRemoveWidget"
    ref="removeWidgetModal"
  />
</template>
