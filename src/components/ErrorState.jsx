
function ErrorState({ message, onRetry }) {
  return (
    <div className="status-state error-state" role="alert">
      <div className="status-icon" aria-hidden="true">!</div>
      <h3>That didn't go as planned</h3>
      <p>{message}</p>
      <button
        className="retry-button"
        type="button"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorState;
