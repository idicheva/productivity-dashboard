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
  <div class="card bg-base-100 h-90 w-80 shadow-lg">
    <div class="card-body">
      <div class="card-actions justify-end">
        <button @click="showModal" :aria-label="`Remove ${widget.label}`">
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
    @removeWidget="handleRemoveWidget"
    ref="removeWidgetModal"
  />
</template>
