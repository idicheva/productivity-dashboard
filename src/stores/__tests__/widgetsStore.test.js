import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useWidgetsStore } from '../widgetsStore'

describe('Widgets Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('gets the widget details', () => {
    const widgetsStore = useWidgetsStore()

    const result = widgetsStore.getWidgetDetailsByName('pomodoro')
    expect(result).toStrictEqual({
      name: 'pomodoro',
      label: 'Pomodoro Timer',
      icon: 'pi-clock',
      active: false,
      config: {},
    })
  })

  it('changes the active state of the widgets', () => {
    const widgetsStore = useWidgetsStore()

    expect(widgetsStore.activeWidgets).toHaveLength(0)

    widgetsStore.changeWidgetActiveState('todo', true)
    expect(widgetsStore.activeWidgets).toHaveLength(1)

    widgetsStore.changeWidgetActiveState('pomodoro', true)
    widgetsStore.changeWidgetActiveState('weather', true)
    widgetsStore.changeWidgetActiveState('todo', false)
    expect(widgetsStore.activeWidgets).toHaveLength(2)
  })

  it('adds to-do items', () => {
    const widgetsStore = useWidgetsStore()

    const todoWidget = widgetsStore.getWidgetDetailsByName('todo')

    expect(todoWidget.config.todos).toHaveLength(0)

    widgetsStore.addTodo('Test To-Do Item')

    expect(todoWidget.config.todos).toHaveLength(1)
    expect(todoWidget.config.todos[0].text).toBe('Test To-Do Item')
  })

  it('toggles to-do items', () => {
    const widgetsStore = useWidgetsStore()

    const todoWidget = widgetsStore.getWidgetDetailsByName('todo')

    const toDoItem = todoWidget.config.todos[0]

    expect(toDoItem.completed).toBe(false)

    widgetsStore.toggleTodo(toDoItem.id)

    expect(toDoItem.completed).toBe(true)
  })

  it('edits to-do items', () => {
    const widgetsStore = useWidgetsStore()

    const todoWidget = widgetsStore.getWidgetDetailsByName('todo')

    const toDoItem = todoWidget.config.todos[0]

    widgetsStore.editTodo(toDoItem.id, 'Updated To-Do Item')

    expect(toDoItem.text).toBe('Updated To-Do Item')
  })

  it('removes to-do items', () => {
    const widgetsStore = useWidgetsStore()

    const todoWidget = widgetsStore.getWidgetDetailsByName('todo')

    const toDoItem = todoWidget.config.todos[0]

    widgetsStore.removeTodo(toDoItem.id)

    expect(todoWidget.config.todos).toHaveLength(0)
  })
})
