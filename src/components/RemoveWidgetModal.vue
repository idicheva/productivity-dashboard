<script setup>
import { ref } from 'vue'

const emit = defineEmits(['removeWidget'])

defineProps({
  widgetLabel: {
    type: String,
    required: true,
  },
})

const removeWidgetModalRef = ref(null)

defineExpose({
  showModal: () => removeWidgetModalRef.value?.showModal(),
})
</script>

<template>
  <dialog class="modal" ref="removeWidgetModalRef">
    <div class="modal-box">
      <h3 class="text-lg font-bold" data-test="title">Remove {{ widgetLabel }} Widget</h3>
      <p class="py-4">Are you sure that you want to remove this widget?</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-secondary mr-2" @click="emit('removeWidget')">Continue</button>
          <button class="btn">Discard</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
