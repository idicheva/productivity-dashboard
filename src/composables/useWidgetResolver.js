import ToDoWidget from '@/components/widgets/ToDoWidget.vue'
import PomodoroWidget from '@/components/widgets/PomodoroWidget.vue'

export const useWidgetResolver = () => {
  const widgets = {
    todo: ToDoWidget,
    pomodoro: PomodoroWidget,
  }

  const resolve = (type) => widgets[type] || null

  return { resolve }
}
