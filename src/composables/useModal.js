import { ref } from 'vue'

export const useModal = () => {
  const modal = ref(null)

  const showModal = () => modal.value?.showModal()
  const close = () => modal.value?.close()

  return { modal, showModal, close }
}
