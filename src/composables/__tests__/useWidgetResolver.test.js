import { beforeEach, describe, expect, it } from 'vitest'
import { useWidgetResolver } from '@/composables/useWidgetResolver.js'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

describe('useWidgetResolver', () => {
  let pinia

  beforeEach(() => {
    localStorage.clear()
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

  it('returns the PomodoroWidget component correctly', () => {
    const { resolve } = useWidgetResolver()
    const PomodoroComponent = resolve('pomodoro')

    const wrapper = mount(PomodoroComponent, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.get('[data-test="pomodoro-mode"]').text()).toBe('Focus')
    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe('25:00')
  })
})
