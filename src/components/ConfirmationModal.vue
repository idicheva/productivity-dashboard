<script setup>
const emit = defineEmits(['deleteWidget'])
defineProps({
  widgetLabel: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <dialog class="modal" id="confirmationModal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Delete {{ widgetLabel }}</h3>
      <p class="py-4">Are you sure that you want to delete this widget?</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-secondary mr-2" @click="emit('deleteWidget')">Continue</button>
          <button class="btn">Discard</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
