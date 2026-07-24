import { useTodos } from '../hooks/useTodos'

const filters = ['all', 'active', 'completed']

function Filters() {
  const { filter, setFilter } = useTodos()

  return (
    <div className="filters" role="tablist" aria-label="Todo filters">
      {filters.map((option) => (
        <button
          key={option}
          type="button"
          className={filter === option ? 'filter-pill active' : 'filter-pill'}
          onClick={() => setFilter(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default Filters
