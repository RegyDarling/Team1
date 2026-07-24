import { useState } from 'react'
import StudentCard from './components/StudentCard'
import students from './data/students'
import './App.css'

function App() {
  const [expandedStudentIds, setExpandedStudentIds] = useState([])

  const toggleStudent = (studentId) => {
    setExpandedStudentIds((currentIds) =>
      currentIds.includes(studentId)
        ? currentIds.filter((id) => id !== studentId)
        : [...currentIds, studentId],
    )
  }

  return (
    <main className="directory">
      <header className="directory__intro">
        <p className="eyebrow">Student Spotlight</p>
        <h1>Meet the Cohort</h1>
        <p className="intro-copy">
          A small group of students learning, building, and improving together.
        </p>
        <p className="expanded-counter" aria-live="polite">
          {expandedStudentIds.length} students expanded
        </p>
      </header>

      <section className="student-grid" aria-label="Student directory">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            isExpanded={expandedStudentIds.includes(student.id)}
            onToggle={toggleStudent}
          />
        ))}
      </section>
    </main>
  )
}

export default App
