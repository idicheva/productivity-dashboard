<script setup>
import { usePomodoroStore } from '@/stores/pomodoroStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const pomodoroStore = usePomodoroStore()

const { mode, remainingSeconds, isRunning, completedFocusSessions } = storeToRefs(pomodoroStore)

const modeOptions = [
  { value: 'focus', label: 'Focus' },
  { value: 'shortBreak', label: 'Short Break' },
  { value: 'longBreak', label: 'Long Break' },
]

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const currentModeLabel = computed(() => {
  const option = modeOptions.find((option) => option.value === mode.value)
  return option ? option.label : 'Focus'
})

const toggleTimer = () => {
  if (isRunning.value) {
    pomodoroStore.pauseTimer()
  } else {
    pomodoroStore.startTimer()
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex self-center items-center gap-2">
      <span class="text-xs uppercase font-semibold opacity-65">Mode:</span>
      <span
        class="text-xs font-semibold badge badge-secondary badge-soft"
        data-test="pomodoro-mode"
      >
        {{ currentModeLabel }}
      </span>
    </div>

    <div class="text-center border border-base-300 rounded-lg p-5 mb-5">
      <div class="text-4xl font-bold" data-test="pomodoro-time">
        {{ formattedTime }}
      </div>
      <p class="text-xs uppercase font-semibold opacity-60 mt-2" data-test="pomodoro-sessions">
        Focus sessions completed: {{ completedFocusSessions }}
      </p>
    </div>

    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="option in modeOptions"
        :key="option.value"
        :aria-label="`Switch to ${option.label}`"
        :class="['btn btn-xs', mode === option.value ? 'btn-secondary' : 'btn-ghost']"
        @click="pomodoroStore.switchMode(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="flex justify-center gap-2 mt-1">
      <button
        class="btn btn-secondary btn-sm"
        :aria-label="isRunning ? 'Pause Timer' : 'Start Timer'"
        @click="toggleTimer"
      >
        <i :class="isRunning ? 'pi pi-pause' : 'pi pi-play'"></i>
        {{ isRunning ? 'Pause' : 'Start' }}
      </button>
      <button
        class="btn btn-ghost btn-sm"
        aria-label="Reset Timer"
        @click="pomodoroStore.resetCurrentMode"
      >
        <i class="pi pi-refresh"></i>
        Reset
      </button>
    </div>
  </div>
</template>
