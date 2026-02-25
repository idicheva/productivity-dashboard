import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RemoveWidgetModal from '../RemoveWidgetModal.vue'

describe('RemoveWidgetModal', () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal ??= () => {}
    HTMLDialogElement.prototype.close ??= () => {}
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mount(RemoveWidgetModal, {
      props: { widgetLabel: 'Test' },
    })

    expect(wrapper.get('[data-test="title"]').text()).toBe('Remove Test Widget')
    expect(wrapper.get('p').text()).toBe('Are you sure that you want to remove this widget?')
  })

  it('opens when showModal is called', () => {
    const showModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')
    const wrapper = mount(RemoveWidgetModal)

    wrapper.vm.showModal()

    expect(showModalSpy).toHaveBeenCalledOnce()
  })

  it('emits "removeWidget"', async () => {
    const wrapper = mount(RemoveWidgetModal)

    const removeWidgetButton = wrapper.findAll('button').find((btn) => btn.text() === 'Continue')

    expect(removeWidgetButton).toBeTruthy()

    removeWidgetButton.trigger('click')

    expect(wrapper.emitted('removeWidget')).toHaveLength(1)
  })
})
