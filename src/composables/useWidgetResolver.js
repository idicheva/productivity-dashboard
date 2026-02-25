import ToDoWidget from '@/components/widgets/ToDoWidget.vue'

export const useWidgetResolver = () => {
  const widgets = {
    todo: ToDoWidget,
  }

  const resolve = (type) => widgets[type] || null

  return { resolve }
}
