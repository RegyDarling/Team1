import { useTodos } from '../hooks/useTodos'

function Stats() {
  const { todos } = useTodos()

  const completed = todos.filter((todo) => todo.completed).length
  const remaining = todos.length - completed

  return (
    <div className="stats-card">
      <div>
        <span>Total</span>
        <strong>{todos.length}</strong>
      </div>
      <div>
        <span>Completed</span>
        <strong>{completed}</strong>
      </div>
      <div>
        <span>Remaining</span>
        <strong>{remaining}</strong>
      </div>
    </div>
  )
}

export default Stats
