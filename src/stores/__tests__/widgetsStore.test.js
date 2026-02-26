import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useWidgetsStore } from '../widgetsStore'

describe('Widgets Store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('gets the widget details', () => {
    const widgetsStore = useWidgetsStore()

    const result = widgetsStore.getWidgetByName('pomodoro')
    expect(result).toMatchObject({
      name: 'pomodoro',
      label: 'Pomodoro Timer',
      icon: 'pi-clock',
      active: false,
    })
  })

  it('changes the active state of the widgets', () => {
    const widgetsStore = useWidgetsStore()

    expect(widgetsStore.activeWidgets).toHaveLength(0)

    widgetsStore.changeWidgetActiveState('todo', true)
    expect(widgetsStore.activeWidgets).toEqual(['todo'])

    widgetsStore.changeWidgetActiveState('pomodoro', true)
    widgetsStore.changeWidgetActiveState('weather', true)
    widgetsStore.changeWidgetActiveState('todo', false)
    expect(widgetsStore.activeWidgets).toEqual(['pomodoro', 'weather'])
  })
})
