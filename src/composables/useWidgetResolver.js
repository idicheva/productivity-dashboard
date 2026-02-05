import ToDoWidget from '@/components/widgets/ToDoWidget.vue'

export function useWidgetResolver() {
  const widgets = {
    todo: ToDoWidget,
  }

  const resolve = (type) => widgets[type] || null

  return { resolve }
}
