const WEATHER_CONDITIONS = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Heavy showers',
  82: 'Violent showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
}

function formatObservationTime(isoTime) {
  if (!isoTime) return 'Time unavailable'

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoTime))
}

function WeatherCard({ weather, location }) {
  const place = [location.name, location.admin1, location.country].filter(Boolean).join(', ')
  const condition = WEATHER_CONDITIONS[weather.weatherCode] ?? 'Unknown condition'

  return (
    <article className="weather-card">
      <div className="weather-card__heading">
        <div>
          <p className="weather-card__label">Right now in</p>
          <h2>{place}</h2>
        </div>
        <span className="weather-card__code">{condition}</span>
      </div>

      <p className="weather-card__temperature">
        {Math.round(weather.temperature)}<span>{weather.temperatureUnit}</span>
      </p>
      <p className="weather-card__condition">{condition}</p>

      <dl className="weather-card__details">
        <div>
          <dt>Wind speed</dt>
          <dd>{weather.windSpeed} {weather.windUnit}</dd>
        </div>
        <div>
          <dt>Observed</dt>
          <dd>{formatObservationTime(weather.observedAt)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default WeatherCard
