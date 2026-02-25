import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useWidgetsStore = defineStore('widgets', () => {
  let storedWidgets
  const defaultWidgets = [
    { name: 'pomodoro', label: 'Pomodoro Timer', icon: 'pi-clock', active: false, config: {} },
    {
      name: 'todo',
      label: 'To-Do List',
      icon: 'pi-list-check',
      active: false,
      config: { todos: [] },
    },
    { name: 'weather', label: 'Weather', icon: 'pi-cloud', active: false, config: {} },
  ]

  try {
    storedWidgets = JSON.parse(localStorage.getItem('widgets'))
  } catch {
    storedWidgets = null
  }

  const widgets = ref(storedWidgets || defaultWidgets)

  const activeWidgets = computed(() =>
    widgets.value.filter((widget) => widget.active).map((widget) => widget.name),
  )

  const getWidgetDetailsByName = (widgetName) => {
    return widgets.value.find((widget) => widget.name === widgetName)
  }

  const changeWidgetActiveState = (widgetName, shouldBeActive) => {
    const widget = getWidgetDetailsByName(widgetName)
    if (widget) {
      widget.active = shouldBeActive
    }
  }

  const addTodo = (todo) => {
    const newTodo = {
      id: nanoid(),
      text: todo,
      completed: false,
    }

    const todoWidget = getWidgetDetailsByName('todo')

    if (todoWidget) {
      todoWidget.config.todos.push(newTodo)
    }
  }

  const toggleTodo = (todoId) => {
    const todoWidget = getWidgetDetailsByName('todo')

    if (todoWidget) {
      const todo = todoWidget.config.todos.find((item) => item.id === todoId)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }

  const editTodo = (todoId, updatedText) => {
    const todoWidget = getWidgetDetailsByName('todo')

    if (todoWidget) {
      const todo = todoWidget.config.todos.find((item) => item.id === todoId)
      if (todo) {
        todo.text = updatedText
      }
    }
  }

  const removeTodo = (todoId) => {
    const todoWidget = getWidgetDetailsByName('todo')

    if (todoWidget) {
      todoWidget.config.todos = todoWidget.config.todos.filter((item) => item.id !== todoId)
    }
  }

  watch(
    widgets,
    (value) => {
      localStorage.setItem('widgets', JSON.stringify(value))
    },
    { deep: true },
  )

  return {
    widgets,
    activeWidgets,
    getWidgetDetailsByName,
    changeWidgetActiveState,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
  }
})
