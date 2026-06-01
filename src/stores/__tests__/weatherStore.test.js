import { setActivePinia, createPinia } from 'pinia'
import { useWeatherStore } from '../weatherStore'
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'

// Mock date for lastUpdated
const MOCK_DATE = '2026-05-08T12:00:00.000Z'

describe('weatherStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.setSystemTime(new Date(MOCK_DATE))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('fetches weather for a valid city', () => {
    const store = useWeatherStore()
    store.fetchWeather('London')
    expect(store.weather).toBeTruthy()
    expect(store.weather.city).toBe('London')
    expect(store.error).toBe('')
    expect(store.lastUpdated).toBe(MOCK_DATE)
  })

  it('sets error for empty city', () => {
    const store = useWeatherStore()
    store.fetchWeather('')
    expect(store.weather).toBeNull()
    expect(store.error).toBe('Enter a city to load weather data.')
  })

  it('sets error for unknown city', () => {
    const store = useWeatherStore()
    store.fetchWeather('Seoul')
    expect(store.weather).toBeNull()
    expect(store.error).toBe('No weather data found for this city.')
  })

  it('refresh re-fetches weather for current location', () => {
    const store = useWeatherStore()
    store.fetchWeather('Tokyo')
    expect(store.weather.city).toBe('Tokyo')
    store.weather = null
    store.refresh()
    expect(store.weather.city).toBe('Tokyo')
  })
})
