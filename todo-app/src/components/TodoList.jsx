import { useTodos } from '../hooks/useTodos'
import TodoItem from './TodoItem'

function TodoList() {
  const { visibleTodos } = useTodos()

  if (!visibleTodos.length) {
    return <p className="empty-state">No tasks match this view yet.</p>
  }

  return (
    <ul className="todo-list">
      {visibleTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}

export default TodoList
