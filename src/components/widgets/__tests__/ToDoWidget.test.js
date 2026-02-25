import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ToDoWidget from '../ToDoWidget.vue'

describe('ToDoWidget', () => {
  let pinia

  const mountWidget = () =>
    mount(ToDoWidget, {
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

  it('renders correctly when there are no tasks', () => {
    const wrapper = mountWidget()

    expect(wrapper.get('[placeholder="What needs to be done?"]')).toBeTruthy()
    expect(wrapper.html()).toContain('No tasks yet')
  })

  it('adds a task', async () => {
    const wrapper = mountWidget()

    const input = wrapper.get('input[type="text"]')
    await input.setValue('Test Task')

    const form = wrapper.get('form')
    await form.trigger('submit')

    expect(wrapper.get('li span').text()).toBe('Test Task')
  })

  it('removes a task', async () => {
    const wrapper = mountWidget()

    const input = wrapper.get('input[type="text"]')
    await input.setValue('Task to remove')

    const addTaskButton = wrapper.get('button[type=submit]')
    await addTaskButton.trigger('submit')

    const removeButton = wrapper.get('button:has(.pi-times)')
    await removeButton.trigger('click')

    expect(wrapper.html()).toContain('No tasks yet')
  })

  it('toggles a task', async () => {
    const wrapper = mountWidget()

    const input = wrapper.get('input[type="text"]')
    await input.setValue('Toggle me')

    const addTaskButton = wrapper.get('button[type=submit]')
    await addTaskButton.trigger('submit')

    const checkbox = wrapper.get('input[type=checkbox]')
    await checkbox.trigger('change')

    expect(wrapper.get('li span').classes()).toContain('line-through')
  })

  it('edits a task', async () => {
    const wrapper = mountWidget()

    const input = wrapper.get('input[type="text"]')
    await input.setValue('Original Task')

    const addTaskButton = wrapper.get('button[type=submit]')
    await addTaskButton.trigger('submit')

    expect(wrapper.get('li span').text()).toBe('Original Task')

    const editButton = wrapper.get('button:has(.pi-pencil)')
    await editButton.trigger('click')

    const editInput = wrapper.get('.list-col-grow input')
    const saveButton = wrapper.get('button:has(.pi-check)')

    await editInput.setValue('Edited Task')
    await saveButton.trigger('click')

    expect(wrapper.get('li span').text()).toBe('Edited Task')
  })
})
