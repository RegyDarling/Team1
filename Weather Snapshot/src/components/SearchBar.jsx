import { useState } from 'react'

function SearchBar({ onSearch, isLoading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedCity = city.trim()

    if (trimmedCity) {
      onSearch(trimmedCity)
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="city-search">Look up another city</label>
      <div className="search-bar__controls">
        <input
          id="city-search"
          type="search"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="e.g. Kumasi"
          disabled={isLoading}
          required
        />
        <button type="submit" disabled={isLoading}>
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
