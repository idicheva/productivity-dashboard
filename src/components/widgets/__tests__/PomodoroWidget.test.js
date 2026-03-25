import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import PomodoroWidget from '../PomodoroWidget.vue'

describe('PomodoroWidget', () => {
  let pinia

  const mountPomodoroWidget = () =>
    mount(PomodoroWidget, {
      global: { plugins: [pinia] },
    })

  beforeEach(() => {
    localStorage.clear()
    pinia = createPinia()
    setActivePinia(pinia)
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-16T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders default timer state', () => {
    const wrapper = mountPomodoroWidget()

    expect(wrapper.get('[data-test="pomodoro-mode"]').text()).toBe('Focus')
    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe('25:00')
    expect(wrapper.get('[data-test="pomodoro-sessions"]').text()).toContain('0')
  })

  it('starts and pauses timer', async () => {
    const wrapper = mountPomodoroWidget()

    await wrapper.get('[aria-label="Start Timer"]').trigger('click')
    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe('24:59')

    await wrapper.get('[aria-label="Pause Timer"]').trigger('click')
    const pausedValue = wrapper.get('[data-test="pomodoro-time"]').text()

    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe(pausedValue)
  })

  it('switches mode from controls', async () => {
    const wrapper = mountPomodoroWidget()

    await wrapper.get('[aria-label="Switch to Short Break"]').trigger('click')

    expect(wrapper.get('[data-test="pomodoro-mode"]').text()).toBe('Short Break')
    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe('05:00')
  })

  it('resets timer to current mode duration', async () => {
    const wrapper = mountPomodoroWidget()

    await wrapper.get('[aria-label="Start Timer"]').trigger('click')
    vi.advanceTimersByTime(4000)
    await nextTick()

    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe('24:56')

    await wrapper.get('[aria-label="Reset Timer"]').trigger('click')

    expect(wrapper.get('[data-test="pomodoro-time"]').text()).toBe('25:00')
    expect(wrapper.get('[aria-label="Start Timer"]').exists()).toBe(true)
  })
})
