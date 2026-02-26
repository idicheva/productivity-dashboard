import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RemoveWidgetModal from '../RemoveWidgetModal.vue'

describe('RemoveWidgetModal', () => {
  const mountRemoveWidgetModal = () =>
    mount(RemoveWidgetModal, {
      props: { widgetLabel: 'Test' },
    })

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal ??= vi.fn()
    HTMLDialogElement.prototype.close ??= vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders correctly', () => {
    const wrapper = mountRemoveWidgetModal()

    expect(wrapper.get('[data-test="title"]').text()).toBe('Remove Test Widget')
    expect(wrapper.get('p').text()).toBe('Are you sure that you want to remove this widget?')
  })

  it('opens when showModal is called', () => {
    const showModalSpy = vi.spyOn(HTMLDialogElement.prototype, 'showModal')
    const wrapper = mountRemoveWidgetModal()

    wrapper.vm.showModal()

    expect(showModalSpy).toHaveBeenCalledOnce()
  })

  it('emits "removeWidget"', async () => {
    const wrapper = mountRemoveWidgetModal()

    const removeWidgetButton = wrapper.find('[aria-label="Continue"]')

    expect(removeWidgetButton).toBeTruthy()

    removeWidgetButton.trigger('click')

    expect(wrapper.emitted('removeWidget')).toHaveLength(1)
  })
})
