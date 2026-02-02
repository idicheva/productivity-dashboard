import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWidgetsStore = defineStore('widgets', () => {
  const widgets = ref([
    { name: 'pomodoro', label: 'Pomodoro Timer', icon: 'pi-clock', active: false },
    { name: 'todo', label: 'To-Do List', icon: 'pi-list-check', active: false },
    { name: 'weather', label: 'Weather', icon: 'pi-cloud', active: false },
  ])

  const activeWidgets = computed(() =>
    widgets.value.filter((widget) => widget.active).map((widget) => widget.name),
  )

  const changeWidgetActiveState = (widgetName, shouldBeActive) => {
    const updatedWidgets = widgets.value.map((widget) => {
      if (widget.name === widgetName) {
        return { ...widget, active: shouldBeActive }
      }
      return widget
    })

    widgets.value = updatedWidgets
  }

  return { widgets, activeWidgets, changeWidgetActiveState }
})
