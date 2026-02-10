import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'

export const useWidgetsStore = defineStore('widgets', () => {
  const defaultWidgets = [
    { name: 'pomodoro', label: 'Pomodoro Timer', icon: 'pi-clock', active: false, config: {} },
    {
      name: 'todo',
      label: 'To-Do List',
      icon: 'pi-list-check',
      active: false,
      config: {},
    },
    { name: 'weather', label: 'Weather', icon: 'pi-cloud', active: false, config: {} },
  ]

  const storedWidgets = JSON.parse(localStorage.getItem('widgets'))
  const todoId = ref(0)

  const widgets = ref(storedWidgets || defaultWidgets)

  const activeWidgets = computed(() =>
    widgets.value.filter((widget) => widget.active).map((widget) => widget.name),
  )

  const getWidgetDetailsByName = (widgetName) => {
    return widgets.value.find((widget) => widget.name === widgetName)
  }

  const changeWidgetActiveState = (widgetName, shouldBeActive) => {
    const updatedWidgets = widgets.value.map((widget) => {
      if (widget.name === widgetName) {
        return { ...widget, active: shouldBeActive }
      }
      return widget
    })

    widgets.value = updatedWidgets
  }

  const addTodo = (todo) => {
    const newTodo = {
      id: todoId.value++,
      text: todo,
      completed: false,
    }

    const updatedWidgets = widgets.value.map((widget) => {
      if (widget.name === 'todo') {
        return {
          ...widget,
          config: {
            ...widget.config,
            todos: widget.config.todos ? [...widget.config.todos, newTodo] : [newTodo],
          },
        }
      }
      return widget
    })

    widgets.value = updatedWidgets
  }

  watchEffect(() => {
    localStorage.setItem(
      'widgets',
      JSON.stringify(storedWidgets === null ? defaultWidgets : widgets.value),
    )
  })

  return { widgets, activeWidgets, getWidgetDetailsByName, changeWidgetActiveState, addTodo }
})
