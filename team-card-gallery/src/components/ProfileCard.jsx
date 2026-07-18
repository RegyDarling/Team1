function ProfileCard({
  name,
  role,
  photoUrl,
  bio,
  githubUrl,
  isExpanded,
  onToggle,
}) {
  return (
    <article className={`profile-card ${isExpanded ? 'expanded' : ''}`}>
      <button type="button" className="card-button" onClick={onToggle}>
        <img src={photoUrl} alt={name} className="avatar" />
        <div className="card-content">
          <h2>{name}</h2>
          <p className="role">{role}</p>
          <p className="toggle-hint">{isExpanded ? 'Tap to collapse' : 'Tap to expand'}</p>
        </div>
      </button>

      {isExpanded && (
        <div className="card-details">
          <p>{bio}</p>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            View GitHub
          </a>
        </div>
      )}
    </article>
  )
}

export default ProfileCard
