import ToDoWidget from '@/components/widgets/ToDoWidget.vue'
import PomodoroWidget from '@/components/widgets/PomodoroWidget.vue'
import WeatherWidget from '@/components/widgets/WeatherWidget.vue'

export const useWidgetResolver = () => {
  const widgets = {
    todo: ToDoWidget,
    pomodoro: PomodoroWidget,
    weather: WeatherWidget,
  }

  const resolve = (type) => widgets[type] || null

  return { resolve }
}
