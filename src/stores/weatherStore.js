import { getMockWeatherForLocation } from '@/mocks/weatherData'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore(
  'weather',
  () => {
    const location = ref('')
    const weather = ref(null)
    const error = ref('')
    const lastUpdated = ref(null)

    const fetchWeather = (locationInput) => {
      location.value = locationInput.trim()
      error.value = ''

      if (!location.value || location.value === '') {
        weather.value = null
        error.value = 'Enter a city to load weather data.'
      }

      const mockResult = getMockWeatherForLocation(location.value)
      if (!mockResult) {
        weather.value = null
        error.value = 'No weather data found for this city.'
      }

      weather.value = mockResult
      lastUpdated.value = new Date().toISOString()
    }

    const refresh = () => {
      fetchWeather(location.value)
    }

    return {
      location,
      weather,
      error,
      lastUpdated,
      fetchWeather,
      refresh,
    }
  },
  { persist: true },
)
