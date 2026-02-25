import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductivityDashboard from '../ProductivityDashboard.vue'
import { useWidgetsStore } from '@/stores/widgetsStore'
import { nextTick } from 'vue'

describe('Productivity Dashboard', () => {
  let pinia

  const mountDashboard = () =>
    mount(ProductivityDashboard, {
      global: { plugins: [pinia] },
    })

  beforeEach(() => {
    vi.restoreAllMocks()

    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
    })

    pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders correctly when there are no widgets', () => {
    const wrapper = mountDashboard()

    expect(wrapper.get('h1').text()).toBe('No Widgets Yet')
    expect(wrapper.get('[aria-label="Open Add Widget Modal"]').text()).toBe('here')
  })

  it('renders widgets correctly', async () => {
    const wrapper = mountDashboard()

    const widgetsStore = useWidgetsStore()

    widgetsStore.changeWidgetActiveState('weather', true)

    await nextTick()

    expect(wrapper.get('.card')).toBeTruthy()
    expect(wrapper.get('.card-title').text()).toBe('Weather')
  })
})
