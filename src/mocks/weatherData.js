const weatherByCity = {
  london: {
    city: 'London',
    condition: 'Cloudy',
    temperatureCelsius: 13,
    humidity: 78,
    windKph: 18,
  },
  sofia: {
    city: 'Sofia',
    condition: 'Sunny',
    temperatureCelsius: 19,
    humidity: 52,
    windKph: 11,
  },
  newyork: {
    city: 'New York',
    condition: 'Partly Cloudy',
    temperatureCelsius: 16,
    humidity: 61,
    windKph: 14,
  },
  tokyo: {
    city: 'Tokyo',
    condition: 'Rainy',
    temperatureCelsius: 21,
    humidity: 84,
    windKph: 9,
  },
  moscow: {
    city: 'Moscow',
    condition: 'Snowy',
    temperatureCelsius: -5,
    humidity: 90,
    windKph: 12,
  },
}

const normalizeLocationKey = (location) => {
  return location.replace(/\s+/g, '').toLowerCase()
}

export const getMockWeatherForLocation = (location) => {
  if (!location || location.trim() === '') {
    return null
  }

  const normalizedKey = normalizeLocationKey(location.trim())
  return weatherByCity[normalizedKey] || null
}
