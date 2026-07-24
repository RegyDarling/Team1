function ErrorMessage({ message }) {
  return (
    <div className="status-message status-message--error" role="alert">
      <strong>Couldn’t load the weather.</strong>
      <span>{message}</span>
    </div>
  )
}

export default ErrorMessage
