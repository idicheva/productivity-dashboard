import { describe, it, expect, vi } from 'vitest'
import { useModal } from '../useModal'
import { isRef } from 'vue'

describe('useModal', () => {
  it('returns a modal ref initialized to null', () => {
    const { modal } = useModal()

    expect(isRef(modal)).toBe(true)
    expect(modal.value).toBe(null)
  })

  it('calls showModal() on the component instance', () => {
    const { modal, showModal } = useModal()

    const showModalSpy = vi.fn()
    modal.value = { showModal: showModalSpy }

    showModal()

    expect(showModalSpy).toHaveBeenCalledTimes(1)
  })

  it('calls close() on the component instance', () => {
    const { modal, close } = useModal()

    const closeModalSpy = vi.fn()
    modal.value = { close: closeModalSpy }

    close()

    expect(closeModalSpy).toHaveBeenCalledTimes(1)
  })
})
