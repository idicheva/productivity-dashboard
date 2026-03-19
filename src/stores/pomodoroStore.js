import { defineStore } from 'pinia'
import { ref } from 'vue'

export const MODES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'shortBreak',
  LONG_BREAK: 'longBreak',
}

export const DEFAULT_DURATIONS = {
  [MODES.FOCUS]: 25,
  [MODES.SHORT_BREAK]: 5,
  [MODES.LONG_BREAK]: 15,
}

export const usePomodoroStore = defineStore(
  'pomodoro',
  () => {
    const mode = ref(MODES.FOCUS)
    const remainingSeconds = ref(DEFAULT_DURATIONS[mode.value] * 60)
    const isRunning = ref(false)
    const completedFocusSessions = ref(0)
    const interval = ref(null)

    const getModeDurationSeconds = (targetMode = mode.value) => DEFAULT_DURATIONS[targetMode] * 60

    const completeCurrentSession = () => {
      if (mode.value === MODES.FOCUS) {
        completedFocusSessions.value += 1
        const nextBreak =
          completedFocusSessions.value % 4 === 0 ? MODES.LONG_BREAK : MODES.SHORT_BREAK
        switchMode(nextBreak)
      } else {
        switchMode(MODES.FOCUS)
      }
      stopTicker()
    }

    const stopTicker = () => {
      if (interval.value !== null) {
        clearInterval(interval.value)
        interval.value = null
      }
    }

    const startTicker = () => {
      if (interval.value === null && isRunning.value) {
        interval.value = setInterval(() => {
          if (remainingSeconds.value > 0) {
            remainingSeconds.value -= 1
          } else {
            completeCurrentSession()
          }
        }, 1000)
      }
    }

    const startTimer = () => {
      if (!isRunning.value) {
        isRunning.value = true
        startTicker()
      }
    }

    const pauseTimer = () => {
      if (isRunning.value) {
        isRunning.value = false
        stopTicker()
      }
    }

    const resetCurrentMode = () => {
      isRunning.value = false
      remainingSeconds.value = getModeDurationSeconds()
      stopTicker()
    }

    const switchMode = (targetMode) => {
      if (Object.values(MODES).includes(targetMode)) {
        mode.value = targetMode
        resetCurrentMode()
      }
    }

    const rehydrateTicker = () => {
      if (isRunning.value) {
        startTicker()
      }
    }

    return {
      mode,
      remainingSeconds,
      isRunning,
      completedFocusSessions,
      startTimer,
      pauseTimer,
      resetCurrentMode,
      switchMode,
      rehydrateTicker,
    }
  },
  {
    persist: {
      afterHydrate: ({ store }) => {
        store.rehydrateTicker()
      },
    },
  },
)
