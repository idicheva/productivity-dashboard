import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTodosStore } from '../todosStore'

describe('Todos Store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('adds to-do items', () => {
    const todosStore = useTodosStore()

    expect(todosStore.todos).toHaveLength(0)

    todosStore.addTodo('Test To-Do Item')

    expect(todosStore.todos).toHaveLength(1)
    expect(todosStore.todos[0].text).toBe('Test To-Do Item')
  })

  it('does not add to-do item with empty string/undefined for text field', () => {
    const todosStore = useTodosStore()

    expect(todosStore.todos).toHaveLength(0)

    todosStore.addTodo('')

    expect(todosStore.todos).toHaveLength(0)

    todosStore.addTodo(undefined)
    expect(todosStore.todos).toHaveLength(0)
  })

  it('toggles to-do items', () => {
    const todosStore = useTodosStore()

    todosStore.addTodo('Test To-Do Item')

    const todoItem = todosStore.todos[0]

    expect(todoItem.completed).toBe(false)

    todosStore.toggleTodo(todoItem.id)

    expect(todoItem.completed).toBe(true)
  })

  it('edits to-do items', () => {
    const todosStore = useTodosStore()

    todosStore.addTodo('Test To-Do Item')

    const todoItem = todosStore.todos[0]

    todosStore.editTodo(todoItem.id, 'Updated To-Do Item')

    expect(todoItem.text).toBe('Updated To-Do Item')
  })

  it('removes to-do items', () => {
    const todosStore = useTodosStore()

    todosStore.addTodo('Test To-Do Item')

    const todoItem = todosStore.todos[0]

    todosStore.removeTodo(todoItem.id)

    expect(todosStore.todos).toHaveLength(0)
  })
})
