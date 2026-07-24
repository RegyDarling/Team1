import { useTodos } from '../hooks/useTodos'

function SearchBar() {
  const { search, setSearch } = useTodos()

  return (
    <label className="search-bar">
      <span>Search</span>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Find a task"
        aria-label="Search todos"
      />
    </label>
  )
}

export default SearchBar
