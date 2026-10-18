
function LoadingState() {
  return (
    <div className="status-state" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true"></div>
      <h3>Finding places to explore...</h3>
      <p>Give us a moment while we fetch destination information.</p>
    </div>
  );
}

export default LoadingState;
