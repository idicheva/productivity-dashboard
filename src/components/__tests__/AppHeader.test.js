import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '../AppHeader.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('AppHeader', () => {
  it('renders correctly', () => {
    const pinia = createPinia()
    const wrapper = mount(AppHeader, {
      global: { plugins: [setActivePinia(pinia)] },
    })

    expect(wrapper.get('.navbar-start:has(.text-secondary)').text()).toBe('Productivity Dashboard')
    expect(wrapper.get('[aria-label="Open Add Widget Modal"]').text()).toBe('Add Widget')
  })
})
