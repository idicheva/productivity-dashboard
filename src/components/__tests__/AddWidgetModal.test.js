import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import AddWidgetModal from '../AddWidgetModal.vue'
import { useWidgetsStore } from '@/stores/widgetsStore'
import { nextTick } from 'vue'

describe('AddWidgetModal', () => {
  let pinia

  const mountAddWidgetModal = () =>
    mount(AddWidgetModal, {
      global: { plugins: [pinia] },
    })

  beforeEach(() => {
    localStorage.clear()
    pinia = createPinia()
    setActivePinia(pinia)

    HTMLDialogElement.prototype.showModal ??= vi.fn()
    HTMLDialogElement.prototype.close ??= vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mountAddWidgetModal()

    expect(wrapper.get('[data-test="title"]').text()).toBe('Add a Widget')
    expect(wrapper.find('[aria-label="Add Pomodoro Timer"]').exists()).toBe(true)
  })

  it('disables widgets that are already active', async () => {
    const wrapper = mountAddWidgetModal()
    const widgetsStore = useWidgetsStore()

    widgetsStore.changeWidgetActiveState('todo', true)
    await nextTick()

    const addTodoBtn = wrapper.get('[aria-label="Add To-Do List"]')
    expect(addTodoBtn.attributes('disabled')).toBeDefined()
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
    const wrapper = mountAddWidgetModal()

    const pomodoroButton = wrapper.get('[aria-label="Add Pomodoro Timer"]')
    await pomodoroButton.trigger('click')

    expect(wrapper.emitted('addWidget')).toHaveLength(1)
  })

  it('closes when closeModal function is called', () => {
    const closeModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'close')
    const wrapper = mountAddWidgetModal()

    wrapper.vm.close()

    expect(closeModalSpy).toHaveBeenCalledOnce()
  })
})
