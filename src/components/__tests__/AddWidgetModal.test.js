import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AddWidgetModal from '../AddWidgetModal.vue'

describe('AddWidgetModal', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)

    HTMLDialogElement.prototype.showModal ??= () => {}
    HTMLDialogElement.prototype.close ??= () => {}
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mount(AddWidgetModal, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.get('[data-test="title"]').text()).toBe('Add a Widget')
    expect(wrapper.html()).toContain('Pomodoro Timer')
  })

  it('opens when showModal is called', () => {
    const showModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')
    const wrapper = mount(AddWidgetModal, {
      global: {
        plugins: [pinia],
      },
    })

    wrapper.vm.showModal()

    expect(showModalSpy).toHaveBeenCalledOnce()
  })

  it('emits "addWidget"', async () => {
    const wrapper = mount(AddWidgetModal, {
      global: {
        plugins: [pinia],
      },
    })

    const pomodoroButton = wrapper.get('[data-test="pomodoro"]')
    await pomodoroButton.trigger('click')

    expect(wrapper.emitted('addWidget')).toHaveLength(1)
  })

  it('closes when closeModal function is called', () => {
    const closeModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const wrapper = mount(AddWidgetModal, {
      global: { plugins: [pinia] },
    })

    wrapper.vm.closeModal()

    expect(closeModalSpy).toHaveBeenCalledOnce()
  })
})
