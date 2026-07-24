import { useCallback, useEffect, useRef, useState } from 'react'
import ErrorMessage from './components/ErrorMessage'
import Loading from './components/Loading'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import { findCity, getWeather } from './services/weatherApi'
import './App.css'

const DEFAULT_LOCATION = {
  name: 'Accra',
  country: 'Ghana',
  latitude: 5.6037,
  longitude: -0.187,
}

function App() {
  const [location, setLocation] = useState(DEFAULT_LOCATION)
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const requestNumber = useRef(0)

  // One reusable loader keeps refreshes and city searches consistent.
  const loadWeather = useCallback(async (nextLocation, signal) => {
    const activeRequest = ++requestNumber.current
    setIsLoading(true)
    setError('')

    try {
      const nextWeather = await getWeather(nextLocation.latitude, nextLocation.longitude, signal)
      if (activeRequest === requestNumber.current) {
        setLocation(nextLocation)
        setWeather(nextWeather)
      }
    } catch (requestError) {
      if (requestError.name !== 'AbortError' && activeRequest === requestNumber.current) {
        setError(requestError.message || 'Please check your connection and try again.')
      }
    } finally {
      if (activeRequest === requestNumber.current) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadWeather(DEFAULT_LOCATION, controller.signal)

    // Abort an in-flight first request if this component unmounts.
    return () => controller.abort()
  }, [loadWeather])

  const handleSearch = async (cityName) => {
    const controller = new AbortController()
    const activeRequest = ++requestNumber.current
    setIsLoading(true)
    setError('')

    try {
      const city = await findCity(cityName, controller.signal)
      const nextWeather = await getWeather(city.latitude, city.longitude, controller.signal)

      if (activeRequest === requestNumber.current) {
        setLocation(city)
        setWeather(nextWeather)
      }
    } catch (requestError) {
      if (requestError.name !== 'AbortError' && activeRequest === requestNumber.current) {
        setError(requestError.message || 'Please check your connection and try again.')
      }
    } finally {
      if (activeRequest === requestNumber.current) {
        setIsLoading(false)
      }
    }
  }

  return (
    <main className="app-shell">
      <section className="weather-app" aria-labelledby="page-title">
        <header>
          <p className="eyebrow">Open-Meteo weather check</p>
          <h1 id="page-title">Weather Snapshot</h1>
          <p className="intro">A quick look at current conditions, starting in Accra.</p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <div className="weather-result" aria-live="polite">
          {isLoading && <Loading message={weather ? 'Refreshing the latest weather…' : undefined} />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && weather && <WeatherCard weather={weather} location={location} />}
        </div>

        <button
          className="refresh-button"
          type="button"
          onClick={() => loadWeather(location)}
          disabled={isLoading}
        >
          {isLoading ? 'Updating…' : 'Refresh'}
        </button>
      </section>
    </main>
  )
}

export default App
