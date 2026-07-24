import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'

function TodoForm() {
  const [draft, setDraft] = useState('')
  const { addTodo } = useTodos()

  const handleSubmit = (event) => {
    event.preventDefault()
    addTodo(draft)
    setDraft('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="What needs to get done?"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoForm
