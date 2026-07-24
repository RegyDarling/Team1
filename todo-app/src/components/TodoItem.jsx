import { useState } from 'react'
import { useTodos } from '../hooks/useTodos'

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const { updateTodo, deleteTodo, toggleTodo } = useTodos()

  const saveEdit = () => {
    updateTodo(todo.id, draft)
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setDraft(todo.text)
    setIsEditing(false)
  }

  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <label className="todo-main">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="edit-input"
            onKeyDown={(event) => {
              if (event.key === 'Enter') saveEdit()
              if (event.key === 'Escape') cancelEdit()
            }}
            autoFocus
          />
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </label>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button type="button" className="action-btn" onClick={saveEdit}>
              Save
            </button>
            <button type="button" className="action-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button type="button" className="action-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              type="button"
              className="action-btn danger"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  )
}

export default TodoItem
