import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(new Date())
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setUsers([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    return () => {
      controller.abort()
    }
  }, [refreshKey])

  const formattedTime = time.toLocaleTimeString()

  return (
    <main className="dashboard">
      <section className="dashboard__header">
        <h1>Live Data Dashboard</h1>
        <p>Current time: <strong>{formattedTime}</strong></p>
      </section>

      <section className="dashboard__controls">
        <button type="button" onClick={() => setRefreshKey((key) => key + 1)}>
          Refresh Users
        </button>
      </section>

      <section className="dashboard__content">
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="error">Error loading users: {error}</p>
        ) : (
          <div>
            <h2>Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
