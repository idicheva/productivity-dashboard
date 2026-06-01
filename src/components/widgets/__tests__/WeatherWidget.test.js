import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherWidget from '../WeatherWidget.vue'
import { setActivePinia, createPinia } from 'pinia'

// Helper to fill input and submit
async function setInput(wrapper, value) {
  const input = wrapper.find('input')
  await input.setValue(value)
  await wrapper.find('form').trigger('submit.prevent')
}

describe('WeatherWidget', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-08T12:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders input and button', () => {
    const wrapper = mount(WeatherWidget)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows weather for a valid city', async () => {
    const wrapper = mount(WeatherWidget)
    await setInput(wrapper, 'London')
    expect(wrapper.text()).toContain('London')
    expect(wrapper.text()).toContain('Cloudy')
    expect(wrapper.text()).toContain('13 C°')
    expect(wrapper.text()).toContain('Humidity:')
    expect(wrapper.find('img').attributes('src')).toContain('cloudy.svg')
  })

  it('shows error for empty city', async () => {
    const wrapper = mount(WeatherWidget)
    await setInput(wrapper, '')
    expect(wrapper.text()).toContain('Enter a city to load weather data.')
  })

  it('shows error for unknown city', async () => {
    const wrapper = mount(WeatherWidget)
    await setInput(wrapper, 'Atlantis')
    expect(wrapper.text()).toContain('No weather data found for this city.')
  })

  it('refreshes weather on refresh icon click', async () => {
    const wrapper = mount(WeatherWidget)
    await setInput(wrapper, 'Tokyo')
    expect(wrapper.text()).toContain('Tokyo')
    // Simulate click on refresh icon
    await wrapper.find('[data-test="weather-last-updated"] .pi-refresh').trigger('click')
    expect(wrapper.text()).toContain('Tokyo')
  })
})
