<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const weatherStore = useWeatherStore()
const { weather, error, lastUpdated, location } = storeToRefs(weatherStore)

const cityInput = ref(location.value)

const hasWeather = computed(() => weather.value !== null)

//Return the appropriate weather icon based on the condition
const weatherIcon = computed(() => {
  if (!weather.value) {
    return 'default'
  }

  const condition = weather.value.condition.toLowerCase()
  if (condition.includes('sunny')) {
    return 'sunny.svg'
  } else if (condition.includes('cloudy')) {
    return 'cloudy.svg'
  } else if (condition.includes('partly')) {
    return 'partlyCloudy.svg'
  } else if (condition.includes('rainy')) {
    return 'rainy.svg'
  } else if (condition.includes('snowy')) {
    return 'snowy.svg'
  } else {
    return ''
  }
})

const formattedLastUpdated = computed(() => {
  if (!lastUpdated.value) {
    return 'Not updated yet'
  }

  const date = new Date(lastUpdated.value)
  return date.toLocaleString()
})

const handleLoadWeather = () => {
  weatherStore.fetchWeather(cityInput.value)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <form @submit.prevent="handleLoadWeather">
      <div class="flex gap-3">
        <input
          class="input input-secondary input-sm"
          type="text"
          placeholder="Enter city (e.g. London)"
          v-model.trim="cityInput"
        />
        <button class="btn btn-secondary btn-sm" type="submit">
          <span>Load Weather</span>
        </button>
      </div>
    </form>

    <div v-if="error" class="text-center text-base-400 font-semibold mt-5">
      {{ error }}
    </div>

    <div v-if="hasWeather" class="border border-base-300 rounded-lg p-5 max-h-55 bg-white/40'">
      <div class="px-2">
        <div class="flex justify-center items-center gap-2 text-xs font-semibold">
          <span>City:</span>
          <span class="text-secondary">{{ weather.city }}</span>
          <img
            :src="`/src/assets/images/${weatherIcon}`"
            alt="Weather Icon"
            class="inline w-10 h-10"
          />
        </div>

        <div class="mt-6 grid grid-cols-2 gap-2 text-xs font-semibold">
          <span>Condition:</span>
          <span class="text-right text-secondary">
            {{ weather.condition }}
          </span>

          <span>Temperature:</span>
          <span class="text-right text-secondary">{{ weather.temperatureCelsius }} C°</span>

          <span>Humidity:</span>
          <span class="text-right text-secondary">{{ weather.humidity }}%</span>

          <span>Wind:</span>
          <span class="text-right text-secondary">{{ weather.windKph }} km/h</span>
        </div>
        <div
          class="text-xs text-center font-semibold opacity-50 mt-5"
          data-test="weather-last-updated"
        >
          Last updated: {{ formattedLastUpdated }}
          <i class="pi pi-refresh cursor-pointer" @click="weatherStore.refresh"></i>
        </div>
      </div>
    </div>
  </div>
</template>
