const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

async function requestJson(url, signal) {
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error('The weather service could not complete that request.')
  }

  return response.json()
}

export async function getWeather(latitude, longitude, signal) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,wind_speed_10m,weather_code',
    timezone: 'auto',
  })
  const data = await requestJson(`${FORECAST_URL}?${params}`, signal)

  if (!data.current) {
    throw new Error('Current weather is not available for this location.')
  }

  return {
    temperature: data.current.temperature_2m,
    temperatureUnit: data.current_units?.temperature_2m ?? '°C',
    windSpeed: data.current.wind_speed_10m,
    windUnit: data.current_units?.wind_speed_10m ?? 'km/h',
    weatherCode: data.current.weather_code,
    observedAt: data.current.time,
    timezone: data.timezone,
  }
}

export async function findCity(cityName, signal) {
  const params = new URLSearchParams({
    name: cityName,
    count: '1',
    language: 'en',
    format: 'json',
  })
  const data = await requestJson(`${GEOCODING_URL}?${params}`, signal)
  const city = data.results?.[0]

  if (!city) {
    throw new Error(`We could not find “${cityName}”. Try a more specific city name.`)
  }

  return {
    name: city.name,
    country: city.country,
    admin1: city.admin1,
    latitude: city.latitude,
    longitude: city.longitude,
  }
}
