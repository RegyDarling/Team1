function Loading({ message = 'Getting the latest weather…' }) {
  return (
    <div className="status-message status-message--loading" role="status">
      <span className="loading-dot" aria-hidden="true" />
      {message}
    </div>
  )
}

export default Loading
