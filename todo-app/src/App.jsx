import './styles/app.css'
import Header from './components/Header'
import TodoForm from './components/TodoForm'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import Stats from './components/Stats'
import TodoList from './components/TodoList'
import { TodoProvider } from './context/TodoContext'
import { ThemeProvider } from './context/ThemeContext'
import { useTodos } from './hooks/useTodos'

function App() {
  const { clearCompleted } = useTodos()

  return (
    <div className="app-shell">
      <main className="app-card">
        <Header />
        <TodoForm />
        <SearchBar />
        <Filters />
        <Stats />
        <TodoList />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      </main>
    </div>
  )
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ThemeProvider>
  )
}

export default AppWrapper
