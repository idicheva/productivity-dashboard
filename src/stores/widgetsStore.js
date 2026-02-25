import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useWidgetsStore = defineStore(
  'widgets',
  () => {
    const defaultWidgets = [
      { name: 'pomodoro', label: 'Pomodoro Timer', icon: 'pi-clock', active: false },
      {
        name: 'todo',
        label: 'To-Do List',
        icon: 'pi-list-check',
        active: false,
      },
      { name: 'weather', label: 'Weather', icon: 'pi-cloud', active: false },
    ]

    const widgets = ref(defaultWidgets)

    const activeWidgets = computed(() =>
      widgets.value.filter((widget) => widget.active).map((widget) => widget.name),
    )

    const getWidgetByName = (widgetName) => {
      return widgets.value.find((widget) => widget.name === widgetName)
    }

    const changeWidgetActiveState = (widgetName, shouldBeActive) => {
      const widget = getWidgetByName(widgetName)
      if (widget) {
        widget.active = shouldBeActive
      }
    }

    return {
      widgets,
      activeWidgets,
      changeWidgetActiveState,
      getWidgetByName,
    }
  },
  { persist: true },
)
