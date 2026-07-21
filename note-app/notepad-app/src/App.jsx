import { useContext, useMemo, useState } from 'react'
import { ThemeContext } from './ThemeContext.jsx'
import { useLocalStorage } from './useLocalStorage.jsx'
import './App.css'

const initialNotes = [
  {
    id: crypto.randomUUID(),
    title: 'Welcome note',
    body: 'This note app uses context and localStorage for persistence.',
  },
]

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [notes, setNotes] = useLocalStorage('notes-app-notes', initialNotes)
  const [activeId, setActiveId] = useState(notes[0]?.id ?? null)
  const [draft, setDraft] = useState({ title: '', body: '' })

  const activeNote = useMemo(
    () => notes.find((note) => note.id === activeId) ?? null,
    [activeId, notes],
  )

  const saveDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  const createNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: draft.title.trim() || 'Untitled note',
      body: draft.body.trim() || 'Start writing your note...',
    }

    setNotes((current) => [newNote, ...current])
    setActiveId(newNote.id)
    setDraft({ title: '', body: '' })
  }

  const updateNote = (updated) => {
    setNotes((current) =>
      current.map((note) => (note.id === updated.id ? updated : note)),
    )
  }

  const deleteNote = (id) => {
    setNotes((current) => current.filter((note) => note.id !== id))
    if (activeId === id) {
      setActiveId(notes[0]?.id ?? null)
    }
  }

  const noteCount = notes.length

  return (
    <div className={`app app--${theme}`}>
      <header className="app__header">
        <div>
          <p className="app__eyebrow">Notes</p>
          <h1>My notebook</h1>
          <p className="app__description">
            Manage notes with Create, Read, Update, Delete, and persistent local storage.
          </p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} type="button">
          {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
        </button>
      </header>

      <div className="app__body">
        <aside className="sidebar">
          <div className="sidebar__top">
            <div>
              <strong>{noteCount}</strong>
              <p>{noteCount === 1 ? 'note' : 'notes'}</p>
            </div>
            <button className="button button--primary" onClick={createNote} type="button">
              New note
            </button>
          </div>

          <div className="note-form">
            <input
              placeholder="Note title"
              value={draft.title}
              onChange={(event) => saveDraft('title', event.target.value)}
            />
            <textarea
              placeholder="Note body"
              rows="4"
              value={draft.body}
              onChange={(event) => saveDraft('body', event.target.value)}
            />
          </div>

          <div className="note-list">
            {notes.map((note) => (
              <button
                key={note.id}
                type="button"
                className={`note-list__item ${note.id === activeId ? 'note-list__item--active' : ''}`}
                onClick={() => setActiveId(note.id)}
              >
                <strong>{note.title}</strong>
                <span>{note.body.slice(0, 40)}{note.body.length > 40 ? '…' : ''}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="editor">
          {activeNote ? (
            <div className="editor__content">
              <div className="editor__actions">
                <button className="button button--danger" onClick={() => deleteNote(activeNote.id)} type="button">
                  Delete note
                </button>
              </div>
              <input
                className="editor__title"
                value={activeNote.title}
                onChange={(event) => updateNote({ ...activeNote, title: event.target.value })}
              />
              <textarea
                className="editor__body"
                rows="12"
                value={activeNote.body}
                onChange={(event) => updateNote({ ...activeNote, body: event.target.value })}
              />
            </div>
          ) : (
            <div className="editor__empty">
              <p>No note selected.</p>
              <span>Create one to start writing.</span>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
