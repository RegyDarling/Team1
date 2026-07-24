import './StudentCard.css'

function StudentCard({ student, isExpanded, onToggle }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle(student.id)
    }
  }

  return (
    <article
      className={`student-card ${isExpanded ? 'student-card--expanded' : ''}`}
      role="button"
      tabIndex="0"
      aria-expanded={isExpanded}
      aria-label={`${student.name}, ${isExpanded ? 'collapse details' : 'expand details'}`}
      onClick={() => onToggle(student.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="student-card__topline">
        <p className="student-card__cohort">{student.cohort}</p>
        <span className="student-card__badge">{student.skillLevel}</span>
      </div>
      <h2>{student.name}</h2>

      {isExpanded && (
        <div className="student-card__details">
          <p>{student.bio}</p>
          <a
            href={student.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            Visit GitHub profile
          </a>
        </div>
      )}
    </article>
  )
}

export default StudentCard
