import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePomodoroStore } from '../pomodoroStore'

describe('Pomodoro Store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with expected defaults', () => {
    const pomodoroStore = usePomodoroStore()

    expect(pomodoroStore.mode).toBe('focus')
    expect(pomodoroStore.remainingSeconds).toBe(1500)
    expect(pomodoroStore.isRunning).toBe(false)
    expect(pomodoroStore.completedFocusSessions).toBe(0)
  })

  it('starts and pauses timer correctly', () => {
    const pomodoroStore = usePomodoroStore()

    pomodoroStore.startTimer()
    expect(pomodoroStore.isRunning).toBe(true)

    vi.advanceTimersByTime(3000)

    expect(pomodoroStore.remainingSeconds).toBe(1497)

    pomodoroStore.pauseTimer()
    expect(pomodoroStore.isRunning).toBe(false)

    const frozenValue = pomodoroStore.remainingSeconds
    vi.advanceTimersByTime(3000)
    expect(pomodoroStore.remainingSeconds).toBe(frozenValue)
  })

  it('switches mode and resets to mode duration', () => {
    const pomodoroStore = usePomodoroStore()

    pomodoroStore.switchMode('shortBreak')

    expect(pomodoroStore.mode).toBe('shortBreak')
    expect(pomodoroStore.remainingSeconds).toBe(300)
    expect(pomodoroStore.isRunning).toBe(false)
  })

  it('resets current mode after timer has progressed', () => {
    const pomodoroStore = usePomodoroStore()

    pomodoroStore.startTimer()
    vi.advanceTimersByTime(2000)

    expect(pomodoroStore.remainingSeconds).toBe(1498)

    pomodoroStore.resetCurrentMode()

    expect(pomodoroStore.isRunning).toBe(false)
    expect(pomodoroStore.remainingSeconds).toBe(1500)
  })

  it('auto-switches to short break and pauses when focus session completes', () => {
    const pomodoroStore = usePomodoroStore()

    pomodoroStore.startTimer()
    vi.advanceTimersByTime(1500 * 1000)

    expect(pomodoroStore.mode).toBe('shortBreak')
    expect(pomodoroStore.remainingSeconds).toBe(300)
    expect(pomodoroStore.isRunning).toBe(false)
    expect(pomodoroStore.completedFocusSessions).toBe(1)
  })

  it('auto-switches to long break on every fourth focus session', () => {
    const pomodoroStore = usePomodoroStore()
    pomodoroStore.completedFocusSessions = 3
    pomodoroStore.startTimer()
    vi.advanceTimersByTime(1500 * 1000)

    expect(pomodoroStore.mode).toBe('longBreak')
    expect(pomodoroStore.remainingSeconds).toBe(900)
    expect(pomodoroStore.isRunning).toBe(false)
    expect(pomodoroStore.completedFocusSessions).toBe(4)
  })
})
