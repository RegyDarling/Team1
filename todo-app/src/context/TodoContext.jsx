import { createContext, useEffect, useMemo, useState } from 'react'

const TodoContext = createContext(null)
const STORAGE_KEY = 'todo-app-items'

const getStoredTodos = () => {
  if (typeof window === 'undefined') return []

  const storedTodos = window.localStorage.getItem(STORAGE_KEY)
  if (!storedTodos) return []

  try {
    const parsedTodos = JSON.parse(storedTodos)
    return Array.isArray(parsedTodos) ? parsedTodos : []
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(getStoredTodos)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
      createdAt: Date.now(),
    }

    setTodos((currentTodos) => [newTodo, ...currentTodos])
  }

  const updateTodo = (id, text) => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, text: trimmedText } : todo)),
    )
  }

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const clearCompleted = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed))
  }

  const visibleTodos = useMemo(() => {
    const query = search.toLowerCase()

    return todos.filter((todo) => {
      const matchesSearch = todo.text.toLowerCase().includes(query)
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed)

      return matchesSearch && matchesFilter
    })
  }, [filter, search, todos])

  const value = useMemo(
    () => ({
      todos,
      visibleTodos,
      filter,
      search,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodo,
      clearCompleted,
      setFilter,
      setSearch,
    }),
    [filter, search, todos, visibleTodos],
  )

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

export default TodoContext
