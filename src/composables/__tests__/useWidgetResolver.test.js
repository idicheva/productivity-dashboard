import { beforeEach, describe, expect, it } from 'vitest'
import { useWidgetResolver } from '@/composables/useWidgetResolver.js'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

describe('useWidgetResolver', () => {
  let pinia
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
  })
  it('returns the ToDoWidget component correctly', () => {
    const { resolve } = useWidgetResolver()
    const TodoComponent = resolve('todo')

    const wrapper = mount(TodoComponent, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.get('input[placeholder="What needs to be done?"]')).not.toBe(null)
    expect(wrapper.html()).toContain('No tasks yet')
  })
})
